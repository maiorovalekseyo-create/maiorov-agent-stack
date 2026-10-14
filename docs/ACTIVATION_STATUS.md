# Activation status — 2026-10-14

**Overall status: PARTIAL (packaging verified, runtime installation not yet verified).**

This file is a checkpoint for stage 07 of the MAIOROV STACK 2.0 rollout. It does not claim the agent skills are active in ChatGPT or Codex.

## Verified with live read-only checks

- GitHub repository `maiorovalekseyo-create/maiorov-agent-stack` has candidate branch `develop/maiorov-stack-v2`; `main` and `v1.0-baseline` remain on `1700c1c81663585600fd34158321bac6a08b57bd`.
- The candidate portable manifest `plugin.json` is valid JSON, named `maiorov-agent-stack` and versioned `2.0.0-rc.1`.
- Candidate `.agents/plugins/marketplace.json` is valid JSON; its Git-backed plugin source selects `develop/maiorov-stack-v2`.
- The candidate tree has exactly **nine** `skills/<name>/SKILL.md` files. All nine contain front matter with `name` matching the directory and a nonempty `description`.
- Candidate `AGENTS.md` references `context-guard` and `solution-selector`; `docs/USAGE.md` includes activation tests A–D.
- This chat's exposed `skills__list` returned **26 available installed skill entries**, none belonging to MAIOROV STACK.
- GitHub access allowed explicit reading of the MAIOROV STACK files. This proves *manual retrieval*, **not** an installed skill.
- Searching the available public plugin directory for the MAIOROV stack did not find an installable matching plugin. This does not disprove an account-specific personal/local plugin that may be visible elsewhere.

## Not verified / requires an actual supported runtime

- Installing or enabling the v2 skills-only plugin on the user's ChatGPT account.
- MAIOROV STACK visibility in the user's ChatGPT Plugins > Installed / Personal screen.
- Plugin activation in ChatGPT Work, Codex desktop, or Codex CLI on the user's device.
- Actual automatic invocation on a fresh chat/task, and tool/trace evidence for activation tests A–D.

## Next safe action

On the **intended product surface**, open the candidate repo/plugin marketplace (or create/import the skill-only plugin using the supported Plugins UI) and perform the installation with the user's explicit action. Then run tests A–D from `docs/USAGE.md` in a fresh session and record which skills were actually loaded. Avoid changing active project repositories or merging this candidate into `main` until tests pass.

**Release gate:** stage 07 is fully passed only after the plugin is installed/discoverable and the read-only smoke tests pass on the intended environment. Structural GitHub checks alone cannot satisfy this gate.
