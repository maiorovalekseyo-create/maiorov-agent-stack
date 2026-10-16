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

const [skill, metadata, agents, marketplaceText, pluginText, skillEntries] = await Promise.all([
  readFile('../../skills/impeccable-bridge/SKILL.md', 'utf8'),
  readFile('../../skills/impeccable-bridge/agents/openai.yaml', 'utf8'),
  readFile('../../AGENTS.md', 'utf8'),
  readFile('../../.agents/plugins/marketplace.json', 'utf8'),
  readFile('../../plugin.json', 'utf8'),
  readdir('../../skills', { withFileTypes: true }),
]);

const marketplace = JSON.parse(marketplaceText);
const plugin = JSON.parse(pluginText);
const foundSkills = skillEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const requiredSorted = [...requiredSkills].sort();
const skillFiles = await Promise.all(requiredSkills.map((name) => readFile(`../../skills/${name}/SKILL.md`, 'utf8')));

const checks = {
  exactSkillSet: JSON.stringify(foundSkills) === JSON.stringify(requiredSorted),
  allSkillFrontMatterNamesMatch: skillFiles.every((content, index) =>
    new RegExp(`^name:\\s*${requiredSkills[index]}\\s*$`, 'm').test(content)),
  allSkillDescriptionsPresent: skillFiles.every((content) => /^description:\s*\S.+$/m.test(content)),
  uiAutomaticScope: /Automatically use[\s\S]+websites and frontend interfaces/i.test(skill),
  nonUiExclusion: /Do not use for backend-only/i.test(skill),
  contextGuardPrecedence: /Run `context-guard`/i.test(skill),
  solutionSelectorPrecedence: /Use `solution-selector`/i.test(skill),
  visualQualityPrecedence: /`visual-quality` as the authority/i.test(skill),
  proveItGate: /Use `prove-it` for the final/i.test(skill),
  implicitInvocationEnabled: /allow_implicit_invocation:\s*true/i.test(metadata),
  globalRoutingRegistered: /impeccable-bridge/i.test(agents),
  marketplaceTargetsDevelop: marketplace.plugins?.[0]?.source?.ref === 'develop/maiorov-stack-v2',
  promotedCandidateVersion: plugin.version === '2.0.0-rc.3',
};

process.stdout.write(`${JSON.stringify({ requiredSkills, foundSkills, checks }, null, 2)}\n`);
if (Object.values(checks).some((value) => !value)) process.exitCode = 1;
