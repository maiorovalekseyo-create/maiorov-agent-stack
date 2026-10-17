import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [css, js, baselineHtml, fixedHtml, seeded] = await Promise.all([
  readFile('shared/styles.css', 'utf8'),
  readFile('shared/app.js', 'utf8'),
  readFile('baseline/index.html', 'utf8'),
  readFile('fixed/index.html', 'utf8'),
  readFile('seeded-defects.json', 'utf8').then(JSON.parse),
]);

const fixedReducedBlock = css.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/)?.[0] || '';
const fixedHoverBlock = css.match(/@media \(hover: hover\) and \(pointer: fine\) \{[\s\S]*?\n\}/)?.[0] || '';

const checks = {
  'transition-all': {
    beforeDetected: /\[data-variant="baseline"\] \.action \{[\s\S]*?transition:\s*all/i.test(css),
    fixedResolved: !/\[data-variant="fixed"\][^{]*\{[^}]*transition:\s*all/i.test(css),
  },
  'ease-in-ui': {
    beforeDetected: /\[data-variant="baseline"\][\s\S]*?650ms ease-in/i.test(css),
    fixedResolved: /\[data-variant="fixed"\][\s\S]*?var\(--ease-out\)/i.test(css) && !/\[data-variant="fixed"\][^{]*\{[^}]*ease-in(?:[;\s]|$)/i.test(css),
  },
  'long-ui-duration': {
    beforeDetected: /\[data-variant="baseline"\][\s\S]*?650ms/i.test(css),
    fixedResolved: /\[data-variant="fixed"\] \.details-panel[\s\S]*?220ms/i.test(css),
  },
  'scale-zero': {
    beforeDetected: /\[data-variant="baseline"\] \.details-panel[\s\S]*?scale\(0\)/i.test(css),
    fixedResolved: /\[data-variant="fixed"\] \.details-panel[\s\S]*?scale\(\.96\)/i.test(css),
  },
  'layout-animation': {
    beforeDetected: /transition:\s*width 650ms/i.test(css) && /transition:\s*left 650ms/i.test(css),
    fixedResolved: /\[data-variant="fixed"\] \.meter-fill[\s\S]*?transition:\s*transform/i.test(css) && /scroll-snap-type:\s*x mandatory/i.test(css),
  },
  'locked-transition': {
    beforeDetected: /variant === 'baseline' && motionLocked/.test(js),
    fixedResolved: /isOpen = !isOpen;\s*renderPanel\(\)/.test(js) && !/variant === 'fixed' && motionLocked/.test(js),
  },
  'ungated-hover': {
    beforeDetected: /\[data-variant="baseline"\] \.action:hover/.test(css),
    fixedResolved: fixedHoverBlock.includes('[data-variant="fixed"] .action:hover'),
  },
  'touch-scroll-block': {
    beforeDetected: /\[data-variant="baseline"\] \.sequence-viewport \{ touch-action:\s*none/.test(css),
    fixedResolved: /\[data-variant="fixed"\] \.sequence-viewport[\s\S]*?touch-action:\s*pan-y/.test(css),
  },
  'mobile-viewport': {
    beforeDetected: /min-height:\s*100vh/.test(css) && !/viewport-fit=cover/.test(baselineHtml),
    fixedResolved: /min-height:\s*100svh/.test(css) && /min-height:\s*100dvh/.test(css) && /viewport-fit=cover/.test(fixedHtml),
  },
  'small-mobile-input': {
    beforeDetected: /\[data-variant="baseline"\] \.signal-form input \{ font-size:\s*13px/.test(css),
    fixedResolved: /\[data-variant="fixed"\] \.signal-form input \{ font-size:\s*16px/.test(css),
  },
  'missing-reduced-motion': {
    beforeDetected: !fixedReducedBlock.includes('[data-variant="baseline"]'),
    fixedResolved: fixedReducedBlock.includes('[data-variant="fixed"] .details-panel'),
  },
};

const beforeFindings = seeded.filter(({ id }) => checks[id]?.beforeDetected).map(({ id }) => id);
const afterFindings = seeded.filter(({ id }) => !checks[id]?.fixedResolved).map(({ id }) => id);
const summary = {
  seededDefects: seeded.length,
  detectedBefore: beforeFindings.length,
  remainingAfter: afterFindings.length,
  beforeFindings,
  afterFindings,
  checks,
};

await mkdir('artifacts', { recursive: true });
await writeFile(path.join('artifacts', 'motion-audit.json'), `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(path.join('artifacts', 'motion-audit.md'), [
  '# Motion and mobile source audit',
  '',
  `- Seeded defects: ${summary.seededDefects}`,
  `- Detected before: ${summary.detectedBefore}`,
  `- Remaining after: ${summary.remainingAfter}`,
  `- Before IDs: ${beforeFindings.join(', ') || 'none'}`,
  `- After IDs: ${afterFindings.join(', ') || 'none'}`,
  '',
  'This is a deterministic source-risk audit. It does not measure frame rate or replace browser and visual review.',
  '',
].join('\n'));

process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
if (beforeFindings.length !== seeded.length || afterFindings.length > 0) process.exitCode = 1;
