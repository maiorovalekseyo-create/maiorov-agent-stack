# MAIOROV STACK 2.0 — stable release preparation

- Repository: `maiorovalekseyo-create/maiorov-agent-stack`
- Working branch: `release/maiorov-stack-2.0`
- Release source: `develop/maiorov-stack-v2` at `c16b4399c35cfb760d839baf970124d5feb958e3`
- Plugin version: `2.0.0`
- Intended release target: `main`; merge and publication require explicit user approval.
- Previous stable rollback point: version `1.0.0`, branch `v1.0-baseline`, commit `1700c1c81663585600fd34158321bac6a08b57bd`.
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

## Develop verification evidence

- Verified implementation commit: `c3be685e1374e7c8f30d2486a457654e8e84ca14`.
- Motion/mobile workflow: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38880015055 — PASS; Playwright 2/2.
- Motion/mobile artifact: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38880015055/artifacts/12036479221
- Impeccable workflow: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38880015099 — PASS; Playwright 2/2.
- Impeccable artifact: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38880015099/artifacts/12036344805
- Both routing gates accepted the exact twelve-skill set and MAIOROV STACK authority order; all ten pre-existing `SKILL.md` blobs remained byte-identical to the previous develop baseline.
- Automatic skill invocation by a fresh ChatGPT Work/Codex session, physical-device/Safari behavior, and sustained 60 FPS remain unverified.

## Stage 11 — form reliability finalization

- Accepted source: `experiment/motion-form-reliability-v1` at `a7b216800c9fa663431d8b190c9270aed41e5e67`.
- Promoted implementation commit: `42f05271b349ba1f045abe5631a065b439d35122`.
- Scope: compact mobile email geometry, local form confirmation, immediate visibility of that confirmation, and focused desktop/mobile Playwright coverage.
- Preserved: the intentional `tests/motion-lab/baseline/index.html` fixture, the twelve-skill set, plugin version `2.0.0-rc.3`, the `develop/maiorov-stack-v2` workflow trigger, and all active projects.
- Not promoted: the temporary `experiment/motion-form-reliability-v1` workflow trigger.
- Develop verification commit: `891043c0f913d8d82c35dfc21c3dd9c391c850e7`.
- Impeccable workflow: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38949577050 — PASS; pinned engine 0.1.14, zero findings after the fixed fixture, exact twelve-skill routing, Playwright 2/2.
- Motion/mobile workflow: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38949577059 — PASS; 11/11 seeded risks detected with zero remaining in fixed, exact twelve-skill routing, desktop/mobile Playwright 4/4.
- Impeccable artifact: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38949577050/artifacts/12067399212
- Motion/mobile artifact: https://github.com/maiorovalekseyo-create/maiorov-agent-stack/actions/runs/38949577059/artifacts/12067489609

### Capabilities not verified by the automated laboratories

- Automatic skill invocation in a fresh ChatGPT Work or Codex session.
- Safari/WebKit and physical iOS/Android device behavior.
- iOS input zoom, software-keyboard resizing, safe-area feel, browser-chrome changes, rubber-banding, sticky hover, tap delay, and physical gesture quality.
- Sustained 60 FPS under representative real-device load; CI frame timing remains diagnostic only.

## Stage 12 — stable release preparation

- Preserve all twelve skills and their accepted authority order without modifying any `SKILL.md` file.
- Preserve marketplace identity `maiorov-stack-marketplace`, plugin identity `maiorov-agent-stack`, repository URL, and stable source ref `main` so 1.0.0 installations can discover 2.0.0 as the same plugin.
- Run Impeccable and motion/mobile workflows on the release branch and again on `main` after an explicitly approved merge.
- Release instructions: `docs/RELEASE_2.0.md`; installation and smoke tests: `docs/USAGE.md`; machine-readable rollback identity: `release/manifest.json`.
- No release tag, GitHub Release, marketplace publication, `main` mutation, active-project edit, or installed ChatGPT setting change is authorized at this stage.

