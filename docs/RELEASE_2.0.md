# MAIOROV STACK 2.0.0 release guide

This guide describes the prepared release. It does not authorize merging, tagging, publishing, or changing an installed ChatGPT configuration.

## Release identity

- Release branch: `release/maiorov-stack-2.0`.
- Verified source commit: `c16b4399c35cfb760d839baf970124d5feb958e3`.
- Intended target after approval: `main`.
- Version: `2.0.0`.
- Marketplace name: `maiorov-stack-marketplace` — unchanged from 1.0.0.
- Plugin name: `maiorov-agent-stack` — unchanged from 1.0.0.
- Marketplace repository and source ref: `https://github.com/maiorovalekseyo-create/maiorov-agent-stack` at `main` — unchanged from 1.0.0.
- Previous stable return point: `v1.0-baseline` at `1700c1c81663585600fd34158321bac6a08b57bd`, version `1.0.0`.

The stable names, repository URL and `main` ref are the continuity contract. Only the semantic version and package contents change. Automated routing gates validate this contract in both test laboratories.

## Installation after an approved release

1. Confirm that the approved release pull request was merged and both workflows passed on the resulting `main` commit.
2. In a supported ChatGPT Work/Codex plugin marketplace, refresh the marketplace named `MAIOROV STACK 2.0` / system name `maiorov-stack-marketplace`.
3. Install `maiorov-agent-stack` only if it is not already installed.
4. Confirm that the installed version is `2.0.0` and that exactly twelve skills are listed.
5. Open a fresh session and run the read-only smoke tests in `docs/USAGE.md`. Record actual skill selection rather than relying on configuration alone.

Exact buttons vary by product surface and policy. A repository URL or GitHub connector alone is not an installation.

## Update from 1.0.0

1. Do not remove the existing plugin.
2. Refresh or check for updates in the same marketplace entry.
3. Verify that the marketplace is still `maiorov-stack-marketplace` and the plugin is still `maiorov-agent-stack`.
4. Apply the offered update and verify version `2.0.0`, twelve skills, and the read-only smoke tests.
5. If the product surface does not expose an update action, stop and record that surface as unverified; do not delete and reinstall merely to force a pass.

The repository proves identity and semantic-version continuity. The actual in-place update control cannot be exercised before `main` contains 2.0.0 without changing an installed environment, which is outside this preparation stage.

## Rollback to 1.0.0

Prefer a normal reviewed revert; do not force-push or rewrite `main`.

1. Stop further rollout and record the failing 2.0.0 commit, workflow and observed product surface.
2. Create a rollback branch from the current `main`.
3. Revert the release merge commit. For a merge commit use `git revert -m 1 <merge-commit>`; for a squash commit revert that single commit.
4. Compare the rollback result with stable commit `1700c1c81663585600fd34158321bac6a08b57bd` and the `v1.0-baseline` branch. Confirm `plugin.json` reports `1.0.0` and both stable identifiers remain unchanged.
5. Open a rollback pull request into `main`, run all required checks, and merge only after approval.
6. Refresh the installed marketplace and verify the resolved version. Product-surface downgrade behavior is not proven by repository tests; record whether the surface accepts the rollback without reinstallation.

For investigation without changing `main`, inspect or manually test the exact `v1.0-baseline` ref in an isolated environment. Do not repoint the shared stable marketplace or active projects as a diagnostic shortcut.

## Release approval gate

- Both GitHub Actions workflows pass on the exact release commit.
- Pull request into `main` has no conflicts or unrelated changes.
- `plugin.json` is `2.0.0`; marketplace source ref is `main`.
- Exact twelve-skill set and all routing checks pass.
- Baseline fixtures remain unchanged.
- Unverified product-surface and real-device capabilities remain explicitly listed.
- The user explicitly authorizes the merge and publication steps.
