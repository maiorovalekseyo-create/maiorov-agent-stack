# MAIOROV AGENT STACK

Canonical operating system for Alexey Maiorov's ChatGPT/Codex project workflow.

**Canonical URL:** https://github.com/maiorovalekseyo-create/maiorov-agent-stack

## Purpose
Make the working method persistent across projects and agent sessions:
- understand intent before implementation;
- scout existing/native/open-source solutions before writing custom code;
- minimize technical complexity without reducing requested quality or WOW;
- fix root causes instead of symptoms;
- preserve approved work;
- verify real results before saying "done";
- keep project memory in durable files.

## Skill set (12)
1. context-guard — lock the selected project/version/ref; prevent cross-version contamination
2. intent-first — define the outcome, boundaries and non-regression criteria
3. scout-first — discover existing/native/open-source paths
4. solution-selector — select the best viable implementation path before substantial building
5. minimal-build — implement without needless complexity
6. root-cause — debug shared causes rather than symptoms
7. visual-quality — preserve approved visual direction
8. prove-it — verify real results before completion
9. project-memory — maintain durable confirmed context
10. impeccable-bridge — run pinned Impeccable diagnostics as a subordinate UI guard
11. motion-quality — improve purposeful, interruptible and performance-conscious motion
12. mobile-interaction — handle touch, gestures, scrolling, viewports and mobile-browser behavior


## Stable 2.0 release preparation
- Prepared version: `2.0.0` in `release/maiorov-stack-2.0`, based on verified commit `c16b4399c35cfb760d839baf970124d5feb958e3`.
- Intended stable source after an approved merge: `main`.
- The marketplace identity remains `maiorov-stack-marketplace`; the plugin identity remains `maiorov-agent-stack`. Keeping both identifiers and the repository URL stable allows an installed 1.0.0 plugin to discover 2.0.0 as an update instead of a different plugin.
- Installation, update, smoke-test and rollback instructions: [docs/USAGE.md](docs/USAGE.md) and [docs/RELEASE_2.0.md](docs/RELEASE_2.0.md).
- Actual installation / invocation status: [docs/ACTIVATION_STATUS.md](docs/ACTIVATION_STATUS.md).
- A GitHub link in account memory does **not** install skills. Version 2.0.0 is not published until the release pull request is explicitly approved and merged.

## Impeccable companion in 2.0

The 2.0 package includes one auxiliary `impeccable-bridge` skill promoted from the accepted experiment. It pins upstream skill/CLI `4.5.2` and engine `0.1.14`, preserves MAIOROV STACK as the authority, and keeps detector plus Playwright evidence in an isolated fixture. Actual implicit invocation still requires a fresh supported runtime and is not proven by configuration checks alone.

## Motion and mobile companions in 2.0

Version 2.0.0 includes the two focused companion skills promoted from the accepted `experiment/motion-mobile-v1` commit `835eccf2aaf4def1416382098f915dd52cc7dde3`:

- `motion-quality` — purposeful, interruptible, reduced-motion-aware, performance-conscious web motion;
- `mobile-interaction` — touch, gesture, scrolling, viewport, safe-area, and mobile-browser behavior.

They adapt selected MIT-licensed guidance from `emilkowalski/skills@2d228630ba1446365f614a108cb8252f1feda202`; attribution, license, and source-integrity records live in `integrations/emilkowalski/`. No upstream runtime package or animation library is installed. Automatic routing is configured but remains unproven until a fresh supported runtime selects the skills without direct mention.

## Project bootstrap
Each project should include:
- `AGENTS.md`
- `PROJECT.md`
- `DESIGN.md`
- `DECISIONS.md`

The project `AGENTS.md` should declare this repository as the canonical global rule source and add only project-specific constraints.

## Rule priority
1. User's explicit current request
2. Project-specific AGENTS.md / PROJECT.md / DESIGN.md / DECISIONS.md
3. This MAIOROV STACK
4. Framework/library defaults

## Philosophy
**Minimize the path, not the ambition.**
