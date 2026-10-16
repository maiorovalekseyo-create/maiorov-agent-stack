# MAIOROV STACK — Installation, Activation and Smoke Tests

Canonical repository: https://github.com/maiorovalekseyo-create/maiorov-agent-stack

## Critical distinction: repository access is NOT skill installation

- A repository URL in Memory, Custom Instructions, or another `AGENTS.md` **does not automatically fetch/install or execute** the repository's `skills/*/SKILL.md` files.
- A GitHub connector enables reading repository files; it does **not** register those skills as installed.
- In a normal chat without the installed MAIOROV plugin, an agent can explicitly **read the selected branch** through its accessible GitHub connector and apply the instructions manually in that session. It must not claim automatic skill invocation.
- Codex loads applicable on-disk `AGENTS.md` guidance at session start; this differs from skill discovery and plugin installation.
- An installed plugin or skill may become usable automatically when relevant, but this must be **tested on the specific product surface**; installations and enabled states do not necessarily sync between chat, desktop, Codex and Work.

## Source versions: keep development isolated

- **Stable:** `main` / `v1.0-baseline` — v1.0, unchanged during v2 testing.
- **Candidate:** `develop/maiorov-stack-v2` — current v2 skills-only candidate plugin package.
- In the candidate branch, `plugin.json` uses `2.0.0-rc.3`, and the branch-local `.agents/plugins/marketplace.json` points at **that candidate branch**. Do not retarget the stable marketplace during experiments.
- Before shipping v2 as stable, review and explicitly update the candidate source ref and version, then merge by the agreed release procedure; a development marketplace must not silently begin installing production code.

## ChatGPT (normal chat/web/mobile)

1. Open the Plugins Directory. Review **Installed** and **Personal** for an installed `maiorov-agent-stack` plugin and its included skills.
2. If it is absent, the global GitHub URL is insufficient. An eligible account can create/import/install a skills-only plugin through the supported Plugins/Plugin Creator flow; this requires the user's UI action, and available options depend on plan and surface.
3. The plugin content is the candidate branch's portable `plugin.json` and `skills/<skill-name>/SKILL.md`. Do not assume a repo Git URL alone makes it available in ChatGPT.
4. Restart/open a **new chat** after installation where the product requires it; check that the plugin is installed and invoke a harmless read-only scenario below.
5. Until the plugin appears as installed and usable, agents should read the GitHub skill instructions explicitly per task and describe this as **manual application**, not automatic activation.

## ChatGPT Work / Codex desktop plugin marketplace

Official reference: https://developers.openai.com/plugins/build/plugins

1. Use a trusted local checkout of **the candidate branch**, not another BOGEMIS/Hustle/Ordinary Genius project.
2. The package root already contains `plugin.json` and `skills/`, the portable skills-only layout. The repo contains a marketplace descriptor at `.agents/plugins/marketplace.json`.
3. Open this checkout in the supported ChatGPT desktop Work/Codex environment, refresh/restart as needed, and select the repo marketplace named `MAIOROV STACK`. Install the `maiorov-agent-stack` plugin from the **candidate branch**, if this surface offers it.
4. In the same product, verify the installed plugin lists the **twelve** skills and that the model actually consults `context-guard` and `solution-selector` in the read-only smoke tests.
5. Do not install/enable it globally or promote to `main` until the candidate passes both Impeccable and motion/mobile workflows. No edits to existing project repositories are required for this test.

For a remote installer or managed workspace, different import/approval options may apply. If the marketplace is not visible, check supported surface, plugin policy, permissions, and whether the selected workspace recognizes local/Git-backed marketplaces before creating another framework.

## Codex CLI / development agents

- Codex may discover `AGENTS.md` from the current project's directory hierarchy; it **does not** automatically follow a GitHub URL to import another repository's skills.
- Install the v2 candidate as a **plugin from the marketplace** where supported, or explicitly add trusted skill directories to Codex's documented skill discovery locations. Merely checking out `skills/` in an unrelated repository is not a global installation.
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

Keep account Memory/Custom Instructions limited to short durable preferences and a bootstrap pointer. Detailed decisions belong in version-specific project files; detailed global methods belong in this repository. Never automatically copy new candidate rules into active customer projects or treat a link in Memory as guaranteed execution.
