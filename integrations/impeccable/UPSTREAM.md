# Impeccable integration lock

This experiment uses Impeccable as an optional diagnostic companion to MAIOROV STACK.

- Upstream: https://github.com/pbakaus/impeccable
- Skill: `skill-v4.5.2`
- CLI: `4.5.2`
- Engine: `engine-v0.1.14`
- License: Apache License 2.0
- Upstream license: https://github.com/pbakaus/impeccable/blob/skill-v4.5.2/LICENSE
- Upstream notice: https://github.com/pbakaus/impeccable/blob/skill-v4.5.2/NOTICE.md

The upstream source is not copied into MAIOROV STACK. CI downloads only the pinned release artifacts. The skill bundle is checked for size, SHA-256, and Ed25519 signature using the public key committed in `versions.json`. The engine binary is checked against the pinned release's SHA-256 sidecar before execution.

These checks establish release-artifact integrity. They do not constitute an independent security audit of Impeccable.

Impeccable never overrides `context-guard`, approved project memory, `solution-selector`, `visual-quality`, or `prove-it`.
