# MAIOROV STACK 2.0 — Impeccable integration

- Repository: `maiorovalekseyo-create/maiorov-agent-stack`
- Working branch: `develop/maiorov-stack-v2`
- Promoted from: `experiment/impeccable-v4.5.2` at `f4a6c3ad25788a977d4b3fc2b9180c7da898351b`.
- Goal: keep MAIOROV STACK as the controlling method and use Impeccable only as an optional UI diagnostic companion.
- Protected branch: `main`.
- Protected projects: all production and client repositories.
- Pinned upstream: skill/CLI `4.5.2`, engine `0.1.14`.
- Skill set: the original nine MAIOROV STACK skills plus the auxiliary `impeccable-bridge`.
- Verification: the accepted experiment passed detector integrity, before/after comparison, and Playwright desktop/mobile checks; every promotion commit must pass `.github/workflows/impeccable-lab.yml` on this branch.
- Current status: **PARTIAL**. Repository integration and CI can be verified; actual implicit model selection still requires a fresh supported runtime with this candidate plugin installed.
