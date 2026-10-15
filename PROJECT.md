# MAIOROV STACK 2.0 — Impeccable experiment

- Repository: `maiorovalekseyo-create/maiorov-agent-stack`
- Base: `develop/maiorov-stack-v2`
- Working branch: `experiment/impeccable-v4.5.2`
- Goal: test Impeccable as an optional UI diagnostic companion without replacing MAIOROV STACK skills.
- Protected branches: `main`, `develop/maiorov-stack-v2`
- Protected projects: all production and client repositories.
- Pinned upstream: skill/CLI `4.5.2`, engine `0.1.14`.
- Current task: prove detector before/after results, Playwright desktop/mobile behavior, artifact integrity, and routing configuration in GitHub Actions.
- Known limitation: actual implicit model selection requires a fresh supported runtime with this experimental plugin installed; configuration checks alone do not prove invocation.
