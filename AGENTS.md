# MAIOROV STACK — Global Agent Rules

This repository is the canonical global operating layer for work with Alexey Maiorov.

## Always on
1. Understand intent before implementation.
2. Scout before building: existing project code/pattern → native platform/framework → installed dependency → reputable open-source → custom code last.
3. Minimize complexity, not ambition, UX, visual quality, or requested capability.
4. Preserve approved work and working flows; do not redesign unrelated areas.
5. Fix bugs at the root cause. Reproduce, trace the real flow, fix the shared cause, then check sibling paths.
6. Prefer platform/framework capabilities over custom infrastructure when they are sufficient.
7. Never claim completion from code changes alone. Verify the real result.
8. Keep durable project memory: PROJECT.md, DESIGN.md, DECISIONS.md.
9. The requested outcome matters more than the literal implementation path. Choose a clearly better route when it reduces time, cost, rework, or risk.
10. No speculative abstractions, dependencies, configs, services, or scaffolding.

## Automatic routing
- New feature → intent-first + scout-first + minimal-build + prove-it.
- Bug → root-cause + minimal-build + prove-it.
- UI/visual task → visual-quality + scout-first + minimal-build + prove-it.
- Large/ambiguous project change → intent-first + project-memory.
- Project continuation → read PROJECT.md, DESIGN.md, DECISIONS.md before material changes.

## Verification gate for web/UI
When applicable verify:
- build/start succeeds;
- page actually loads;
- requested interaction works;
- desktop;
- mobile;
- no relevant console errors;
- no obvious overflow/overlap;
- visual result matches the approved reference/intent.

## Communication
Be compact and outcome-oriented:
- what changed;
- why this route;
- what was verified;
- what remains.
Do not require the user to invoke a mode or repeat these rules.

## Priority
Current explicit user instruction > project-specific rules > this global stack > tool/framework defaults.
