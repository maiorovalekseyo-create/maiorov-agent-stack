---
name: minimal-build
description: Enforce the smallest maintainable implementation that preserves the requested outcome and visual quality. Use automatically on coding and architecture tasks.
---

# Minimal Build

Minimize the path, not the ambition.

Ladder:
1. Does this need to exist?
2. Is it already in the project?
3. Can native/platform/framework functionality do it?
4. Can an installed dependency do it?
5. Can a small local implementation do it?
6. Only then add new infrastructure/dependency.

Rules:
- no speculative abstraction;
- no wrapper with one caller unless it earns its keep;
- no config for values that never vary;
- no dependency for a few stable lines;
- deletion over duplication;
- boring and maintainable over clever;
- fewest files consistent with clarity;
- never simplify away validation, security, accessibility, data-loss protection, or explicit requirements.

If a deliberate shortcut has a real ceiling, record the trigger for revisiting it in DECISIONS.md or a local `maiorov:` comment.
