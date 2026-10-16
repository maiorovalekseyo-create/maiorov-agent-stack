# MAIOROV STACK 2.0 — motion and mobile interaction experiment

- Repository: `maiorovalekseyo-create/maiorov-agent-stack`
- Base: `develop/maiorov-stack-v2` at `3327f6ecf10e06444d21ccbe4b9ddfcb4f61cfad`
- Working branch: `experiment/motion-mobile-v1`
- Plugin version: `2.0.0-rc.2` (unchanged during the experiment)
- Goal: test two focused companion skills, `motion-quality` and `mobile-interaction`, without replacing MAIOROV STACK ownership or existing skills.
- Protected branches: `main`, `develop/maiorov-stack-v2`.
- Protected projects: all production and client repositories.
- Pinned upstream: `emilkowalski/skills@2d228630ba1446365f614a108cb8252f1feda202`, MIT, Emil Kowalski.
- Implementation: no runtime animation dependency; native CSS, WAAPI guidance, Pointer Events, and browser primitives first.
- Test scope: isolated baseline/fixed interface, Playwright at 1440×900 and 390×844, source audit, routing checks, screenshots, reports, and diagnostic timing samples.
- Known limitation: structural implicit-routing metadata does not prove automatic skill selection by a fresh model session. Emulated touch and CI timing do not prove real-device feel or sustained 60 FPS.
