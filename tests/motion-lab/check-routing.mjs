import { readdir, readFile } from 'node:fs/promises';

const requiredSkills = [
  'context-guard',
  'intent-first',
  'scout-first',
  'solution-selector',
  'minimal-build',
  'root-cause',
  'visual-quality',
  'prove-it',
  'project-memory',
  'impeccable-bridge',
  'motion-quality',
  'mobile-interaction',
];

const [motion, motionMetadata, mobile, mobileMetadata, agents, marketplaceText, pluginText, versionsText, skillEntries] = await Promise.all([
  readFile('../../skills/motion-quality/SKILL.md', 'utf8'),
  readFile('../../skills/motion-quality/agents/openai.yaml', 'utf8'),
  readFile('../../skills/mobile-interaction/SKILL.md', 'utf8'),
  readFile('../../skills/mobile-interaction/agents/openai.yaml', 'utf8'),
  readFile('../../AGENTS.md', 'utf8'),
  readFile('../../.agents/plugins/marketplace.json', 'utf8'),
  readFile('../../plugin.json', 'utf8'),
  readFile('../../integrations/emilkowalski/versions.json', 'utf8'),
  readdir('../../skills', { withFileTypes: true }),
]);

const marketplace = JSON.parse(marketplaceText);
const plugin = JSON.parse(pluginText);
const versions = JSON.parse(versionsText);
const foundSkills = skillEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const requiredSorted = [...requiredSkills].sort();
const skillFiles = await Promise.all(requiredSkills.map((name) => readFile(`../../skills/${name}/SKILL.md`, 'utf8')));

const checks = {
  exactSkillSet: JSON.stringify(foundSkills) === JSON.stringify(requiredSorted),
  allSkillFrontMatterNamesMatch: skillFiles.every((content, index) =>
    new RegExp(`^name:\\s*${requiredSkills[index]}\\s*$`, 'm').test(content)),
  allSkillDescriptionsPresent: skillFiles.every((content) => /^description:\s*\S.+$/m.test(content)),
  pinnedUpstreamCommit: versions.commit === '2d228630ba1446365f614a108cb8252f1feda202',
  upstreamLicenseAndAuthor: versions.license === 'MIT' && versions.author === 'Emil Kowalski',
  motionImplicitInvocation: /allow_implicit_invocation:\s*true/i.test(motionMetadata),
  mobileImplicitInvocation: /allow_implicit_invocation:\s*true/i.test(mobileMetadata),
  motionNonUiExclusion: /Do not use for static visual work or unrelated backend\/data tasks/i.test(motion),
  mobileNonUiExclusion: /not for backend\/data work or React Native/i.test(mobile),
  contextGuardPrecedence: /Run `context-guard`/i.test(motion) && /Run `context-guard`/i.test(mobile),
  solutionSelectorPrecedence: /Use `solution-selector`/i.test(motion) && /Use `solution-selector`/i.test(mobile),
  visualQualityPrecedence: /`visual-quality` as the authority/i.test(motion) && /Use `visual-quality`/i.test(mobile),
  proveItGate: /Use `prove-it`/i.test(motion) && /Use `prove-it`/i.test(mobile),
  crossSkillBoundary: /Defer touch, scroll, safe-area[\s\S]*`mobile-interaction`/i.test(motion) && /`motion-quality` for timing\/easing/i.test(mobile),
  globalRoutingRegistered: /motion-quality/i.test(agents) && /mobile-interaction/i.test(agents),
  marketplaceTargetsDevelop: marketplace.plugins?.[0]?.source?.ref === 'develop/maiorov-stack-v2',
  promotedCandidateVersion: plugin.version === '2.0.0-rc.3',
};

process.stdout.write(`${JSON.stringify({ requiredSkills, foundSkills, checks }, null, 2)}\n`);
if (Object.values(checks).some((value) => !value)) process.exitCode = 1;
