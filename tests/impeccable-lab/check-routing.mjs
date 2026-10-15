import { readFile } from 'node:fs/promises';

const skill = await readFile('../../skills/impeccable-bridge/SKILL.md', 'utf8');
const metadata = await readFile('../../skills/impeccable-bridge/agents/openai.yaml', 'utf8');
const agents = await readFile('../../AGENTS.md', 'utf8');

const checks = {
  uiAutomaticScope: /Automatically use[\s\S]+websites and frontend interfaces/i.test(skill),
  nonUiExclusion: /Do not use for backend-only/i.test(skill),
  contextGuardPrecedence: /Run `context-guard`/i.test(skill),
  visualQualityPrecedence: /`visual-quality` as the authority/i.test(skill),
  proveItGate: /Use `prove-it` for the final/i.test(skill),
  implicitInvocationEnabled: /allow_implicit_invocation:\s*true/i.test(metadata),
  globalRoutingRegistered: /impeccable-bridge/i.test(agents),
};

process.stdout.write(`${JSON.stringify(checks, null, 2)}\n`);
if (Object.values(checks).some((value) => !value)) process.exitCode = 1;
