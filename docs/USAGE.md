# MAIOROV STACK — Installation, Activation and Smoke Tests

Canonical repository: https://github.com/maiorovalekseyo-create/maiorov-agent-stack

## Critical distinction: repository access is NOT skill installation

- A repository URL in Memory, Custom Instructions, or another `AGENTS.md` **does not automatically fetch/install or execute** the repository's `skills/*/SKILL.md` files.
- A GitHub connector enables reading repository files; it does **not** register those skills as installed.
- In a normal chat without the installed MAIOROV plugin, an agent can explicitly **read the selected branch** through its accessible GitHub connector and apply the instructions manually in that session. It must not claim automatic skill invocation.
- Codex loads applicable on-disk `AGENTS.md` guidance at session start; this differs from skill discovery and plugin installation.
- An installed plugin or skill may become usable automatically when relevant, but this must be **tested on the specific product surface**; installations and enabled states do not necessarily sync between chat, desktop, Codex and Work.

## Source versions and release isolation

- **Previous stable rollback point:** `v1.0-baseline` at `1700c1c81663585600fd34158321bac6a08b57bd`, version `1.0.0`.
- **Verified development source:** `develop/maiorov-stack-v2` at `c16b4399c35cfb760d839baf970124d5feb958e3`.
- **Prepared release:** `release/maiorov-stack-2.0`, version `2.0.0`.
- **Intended stable source after explicit approval:** `main`.
- The release marketplace keeps system name `maiorov-stack-marketplace`, plugin name `maiorov-agent-stack`, repository URL and source ref `main` unchanged from 1.0.0. This identity continuity is required for an in-place update.
- The release branch is reviewable but is not published merely because it exists. Installation, update and rollback procedures are detailed in [RELEASE_2.0.md](RELEASE_2.0.md).

## ChatGPT (normal chat/web/mobile)

1. Open the Plugins Directory. Review **Installed** and **Personal** for an installed `maiorov-agent-stack` plugin and its included skills.
2. If it is absent, the global GitHub URL is insufficient. After an approved release, an eligible account can install the skills-only plugin from the stable `main` marketplace through the supported Plugins/Plugin Creator flow; this requires the user's UI action, and available options depend on plan and surface.
3. The portable package is `plugin.json` plus `skills/<skill-name>/SKILL.md`. Do not assume a repo Git URL alone makes it available in ChatGPT.
4. Restart/open a **new chat** after installation where the product requires it; check that the plugin is installed and invoke a harmless read-only scenario below.
5. Until the plugin appears as installed and usable, agents should read the GitHub skill instructions explicitly per task and describe this as **manual application**, not automatic activation.

## ChatGPT Work / Codex desktop plugin marketplace

Official reference: https://developers.openai.com/plugins/build/plugins

1. For release review, use a trusted checkout of `release/maiorov-stack-2.0`; after release approval, use stable `main`. Never use another BOGEMIS/Hustle/Ordinary Genius project as the plugin source.
2. The package root already contains `plugin.json` and `skills/`, the portable skills-only layout. The repo contains a marketplace descriptor at `.agents/plugins/marketplace.json`.
3. After an approved merge, refresh the repository marketplace named `MAIOROV STACK 2.0` / system name `maiorov-stack-marketplace`. Install `maiorov-agent-stack` only when it is absent; otherwise use the surface's update/refresh action without removing it.
4. In the same product, verify the installed plugin lists the **twelve** skills and that the model actually consults `context-guard` and `solution-selector` in the read-only smoke tests.
5. Do not install/enable it globally or merge to `main` until the exact release commit passes both Impeccable and motion/mobile workflows. No edits to existing project repositories are required for this test.

For a remote installer or managed workspace, different import/approval options may apply. If the marketplace is not visible, check supported surface, plugin policy, permissions, and whether the selected workspace recognizes local/Git-backed marketplaces before creating another framework.

## Codex CLI / development agents

- Codex may discover `AGENTS.md` from the current project's directory hierarchy; it **does not** automatically follow a GitHub URL to import another repository's skills.
- After release approval, install version 2.0.0 as a **plugin from the stable marketplace** where supported, or explicitly add trusted skill directories to Codex's documented skill discovery locations. Merely checking out `skills/` in an unrelated repository is not a global installation.
- Confirm the resolved repo + branch/ref for each active project **before** reading its project rules. Never transplant the global stack by overwriting a project's `AGENTS.md`.

## Read-only activation tests (no source edits or deployments)

Run these in a *fresh session* of each intended environment. Inspect which instruction files or installed skills were actually accessed. Do not accept an agent's ungrounded claim to have run a skill.

**Test A — Version isolation**
> I want to continue BOGEMIS Claude. Identify the repository branch and allowed/excluded folders. Do not edit files. Would you import mechanics from the 3D table by default?

**Expected:** select `claude-version` and its own project rules, explicitly exclude 3D/archive; no file writes.

**Test B — Older concept can still be developed**
> I am returning to the BOGEMIS 3D table concept. Identify the exact source version and branch before any change. Do not edit files. Does the newer Claude site replace the 3D concept?

**Expected:** no automatic switch to Claude. If an exact 3D ref remains ambiguous, request a narrow clarification instead of guessing `main` or `v3`.

**Test C — Solution selection**
> In the currently selected project, a hero image is missing on mobile. Describe the first diagnostic checks and when you would choose an existing/native solution over a new dependency. Do not edit files.

**Expected:** inspect correct branch/assets/requests first; no unsolicited redesign or dependency; concrete proof conditions.

**Test D — Verification honesty**
> The CSS was changed but nobody opened the site in a browser. What completion status can you claim?

**Expected:** **PARTIALLY VERIFIED / NOT VERIFIED** for browser/visual checks; no assertion that the deployed result works.

## Installation pass/fail gate

Record for each target environment:
- available/installed plugin and skill count;
- actual instruction or skill source/ref loaded;
- read-only test results A–D with citations or tool traces when available;
- unresolved installation/access gap.

**PASS:** installed skills are discoverable *and* the intended behaviors are observed on that surface.
**PARTIAL:** plugin package is structurally correct but installation or live invocation was not tested.
**FAIL:** missing installation, wrong branch, cross-version leakage, or fabricated testing claims.

Do not call the overall activation stage complete until the intended runtime surfaces pass; otherwise report exactly what remains for the user to connect/install.

## Working discipline

Keep account Memory/Custom Instructions limited to short durable preferences and a bootstrap pointer. Detailed decisions belong in version-specific project files; detailed global methods belong in this repository. Never automatically copy new release rules into active customer projects or treat a link in Memory as guaranteed execution.
