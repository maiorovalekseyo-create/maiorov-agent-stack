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

## Core stack
1. context-guard — lock the selected project/version/ref; prevent cross-version contamination
2. intent-first — define the outcome, boundaries and non-regression criteria
3. scout-first — discover existing/native/open-source paths
4. solution-selector — select the best viable implementation path before substantial building
5. minimal-build — implement without needless complexity
6. root-cause — debug shared causes rather than symptoms
7. visual-quality — preserve approved visual direction
8. prove-it — verify real results before completion
9. project-memory — maintain durable confirmed context


## V2 activation (candidate branch only)
- Plugin candidate: `2.0.0-rc.1` in `develop/maiorov-stack-v2`.
- Install and read-only smoke tests: [docs/USAGE.md](docs/USAGE.md).
- Actual installation / invocation status: [docs/ACTIVATION_STATUS.md](docs/ACTIVATION_STATUS.md).
- A GitHub link in account memory does **not** install skills. Do not merge or propagate to active project repos before verifying on the target runtime.

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
