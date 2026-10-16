# MAIOROV STACK 2.0 — develop candidate state

- Repository: `maiorovalekseyo-create/maiorov-agent-stack`
- Working branch: `develop/maiorov-stack-v2`
- Plugin version: `2.0.0-rc.3`
- Promotion source: `experiment/motion-mobile-v1` at `835eccf2aaf4def1416382098f915dd52cc7dde3`
- Previous develop baseline: `3327f6ecf10e06444d21ccbe4b9ddfcb4f61cfad`
- Goal: maintain twelve compatible skills under MAIOROV STACK authority, including the accepted `motion-quality` and `mobile-interaction` companions.
- Protected branch: `main`; protected projects: all production and client repositories.
- Pinned motion upstream: `emilkowalski/skills@2d228630ba1446365f614a108cb8252f1feda202`, MIT, Emil Kowalski.
- Pinned Impeccable upstream: skill/CLI `4.5.2`, engine `0.1.14`; telemetry disabled.
- Implementation: native CSS, WAAPI guidance, Pointer Events, and browser primitives first; no added runtime animation dependency.
- Test scope: unchanged isolated baseline/fixed fixtures, integrity checks, twelve-skill routing checks, Impeccable, Playwright at 1440×900 and 390×844, screenshots, and diagnostic timing samples.

## Accepted Stage 10 evidence

- Accepted experiment commit: `835eccf2aaf4def1416382098f915dd52cc7dde3`.
- Successful experiment workflow: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38867327465
- Deterministic motion audit: 11/11 seeded baseline risks detected; 0 remained in the fixed version.
- Playwright: 2/2 projects passed for the accepted experiment.

## Current verification state

- The promotion commit must pass both the existing Impeccable workflow and the motion/mobile workflow on `develop/maiorov-stack-v2` before the develop integration is reported as verified.
- Automatic skill invocation by a fresh ChatGPT Work/Codex session, physical-device/Safari behavior, and sustained 60 FPS remain unverified.
