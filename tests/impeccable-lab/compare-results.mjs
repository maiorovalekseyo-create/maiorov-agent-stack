import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [beforePath, afterPath, seededPath, outputDirectory] = process.argv.slice(2);
const [before, after, seeded] = await Promise.all([
  readFile(beforePath, 'utf8').then(JSON.parse),
  readFile(afterPath, 'utf8').then(JSON.parse),
  readFile(seededPath, 'utf8').then(JSON.parse),
]);

const beforeIds = new Set(before.map((finding) => finding.antipattern));
const afterIds = new Set(after.map((finding) => finding.antipattern));
const missingBefore = seeded.filter(({ id }) => !beforeIds.has(id)).map(({ id }) => id);
const remainingAfter = seeded.filter(({ id }) => afterIds.has(id)).map(({ id }) => id);
const afterPrimary = after.filter((finding) => finding.severity !== 'advisory');

const summary = {
  seededDefects: seeded.length,
  detectedSeededBefore: seeded.length - missingBefore.length,
  totalFindingsBefore: before.length,
  totalFindingsAfter: after.length,
  primaryFindingsAfter: afterPrimary.length,
  missingBefore,
  remainingAfter,
  beforeIds: [...beforeIds].sort(),
  afterIds: [...afterIds].sort(),
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, 'comparison.json'), `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(path.join(outputDirectory, 'comparison.md'), [
  '# Impeccable before/after comparison',
  '',
  `- Seeded defects: ${summary.seededDefects}`,
  `- Seeded defects detected before: ${summary.detectedSeededBefore}`,
  `- Total findings before: ${summary.totalFindingsBefore}`,
  `- Total findings after: ${summary.totalFindingsAfter}`,
  `- Primary findings after: ${summary.primaryFindingsAfter}`,
  `- Missing seeded rules before: ${missingBefore.join(', ') || 'none'}`,
  `- Remaining seeded rules after: ${remainingAfter.join(', ') || 'none'}`,
  '',
].join('\n'));

process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);

if (missingBefore.length > 0) process.exitCode = 1;
if (remainingAfter.length > 0 || afterPrimary.length > 0) process.exitCode = 1;
