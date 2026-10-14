---
name: context-guard
description: Lock the exact project, version, branch, and allowed sources before continuing or changing a project; detect stale or conflicting instructions without mixing independent versions. Use automatically for project continuation, multi-version repositories, handoffs, and material changes.
---

# Context Guard — Version & Source Isolation

**Purpose:** Continue the user's *selected version*, not the newest, default, most developed, or easiest-to-find variant. Different versions or concepts in one repository are separate work contexts until the user authorizes sharing.

## 1. Identify the selected version before loading its code

Resolve the work target in this order:
1. User's explicit selection in the current request (project, concept, version, branch, directory).
2. Version and scope already confirmed in the *current conversation*; a continuation inherits this unless the user switches it.
3. Previously confirmed branch/directory mapping for that version, verified against current repository metadata.
4. If none identifies a unique safe target, ask **one short targeted question before modifying files**. Read-only branch metadata inspection is fine; do not guess from `main`, names like `v3`, or most recent commit.

A later explicit user switch overrides the earlier chat's version. Do not make a newer concept invalidate an older one. A chat about an older concept may legitimately continue it.

## 2. Lock the scope (internal checklist, no unnecessary user-facing ritual)

Determine:
- exact repository;
- selected version/concept;
- exact Git ref or folder within the selected ref;
- approved/current baseline or last verified commit, if known;
- allowed source assets and reference documents **for this version**;
- excluded branches, directories, archives, and concepts;
- approved outcomes, frozen elements, and changes authorized by this task.

If a branch, version directory, or baseline is unclear, do **not** start writes on the repository's default branch as a fallback.

## 3. Inspect only the selected work context

- Read the project AGENTS.md, PROJECT.md, DESIGN.md, DECISIONS.md, code, and agreed client assets **from the selected ref/scope**. Always pass an explicit ref when reading version-specific files through an API.
- Check checked-out branch, working tree, and uncommitted changes before edits when operating locally; never silently overwrite or switch away from uncommitted work.
- Do not explore, copy, merge, or draw instructions from other versions, archived concepts, or sibling directories just because they exist in the same repository.
- An explicit, authorized *comparison/migration* task is the exception: identify which sources may be read, what may be reused, and which destination may be changed. Reading for a comparison does not authorize importing.
- Project files may be stale. Compare their assertions with **confirmed** user decisions for that same version. Never treat an unapproved assistant suggestion as project policy.

## 4. Conflicts and authorization

- If written instructions refer to a different version, treat that as **scope mismatch**, not an invitation to follow them. Stop before changes in the affected area; identify the selected context and the conflict.
- If the user has clearly selected a version and its mapped ref has matching rules, continue autonomously without asking again.
- If two plausible refs correspond to the selected version and safe destination cannot be established, ask which ref to modify; do not choose `main` by default.
- If confirmed user decisions contradict a file inside the selected ref, preserve the confirmed outcome; do not silently rewrite a disputed area. Ask only if the contradiction prevents safe execution.
- Keep approved designs, functionality, and work in other versions untouched. Never propagate a global instruction update into project repos automatically.

## 5. Before writes, commits, and previews

Reconfirm repo + exact target ref/path; restrict edits to that scope. Verify tests and previews **against the same ref/commit**; a deployed `main` preview is not evidence for a feature branch. Report verified ref, commit, and deployment only when actually confirmed.

## 6. BOGEMIS regression examples (version mapping is project-specific)

| User intent | Allowed scope | Forbidden cross-contamination |
| --- | --- | --- |
| "Continue BOGEMIS Claude version" | `bogemis-website`, `claude-version`, its approved `website/` and `client-materials/` per that branch's rules | Do not use 3D-table, archived code, old design/mechanics without explicit permission. |
| "Continue the BOGEMIS 3D table" | The explicitly selected 3D version and verified matching ref/files | Do not open/import Claude-version layouts, text, mechanics, or design as defaults. |
| "Compare Claude and 3D" | Read the two authorized contexts for **comparison only** | Do not change or merge either unless the user separately authorizes a target. |
| "Continue BOGEMIS" with no established version | Examine existing conversation context and branch metadata; if still ambiguous, ask | Do not guess `main`, `v3`, or Claude based on development progress. |

The repository may carry legacy or misleading branch names and common directories; never infer the version solely from those labels. Do not hard-code a permanent mapping for the 3D concept without verification.

## 7. Minimal handoff record

When recording project context, include `selected version / repository / ref / permitted work directory / last verified commit` in PROJECT.md **inside that version** (when the project owner authorizes documentation updates). Keep cross-version history out of per-version working instructions.

**Pass condition:** The agent can say exactly *which* version and ref it will change, and which other versions it will leave untouched. If it cannot, it must not write.
