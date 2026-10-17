# MAIOROV STACK — Global Agent Rules

This repository is the canonical working method for projects with Alexey Maiorov. Apply these rules when they are actually available to the agent; a link in account instructions alone does not load repository files or skills.

## 1. Outcomes and source of truth
1. Understand the requested outcome, constraints, approved references, and what must not change before choosing an implementation.
2. Preserve the latest **confirmed** user decisions and approved project results. An agent's proposal is not an approval.
3. For an existing project, run **context-guard first**: resolve the selected project, version/concept, exact repository ref and allowed directories. Only then inspect code/state and PROJECT.md, DESIGN.md, DECISIONS.md and project AGENTS.md **within that selected scope**. Project files may be outdated; they are not proof of the latest agreement.
4. If a project file conflicts with a newer confirmed user decision, follow the newer decision for the intended outcome. Do not silently modify the disputed area based on either assumption: identify the conflict, limit work to the unambiguous scope, and seek a decision only when the conflict blocks safe execution.
5. Do not import instructions, design choices, assets, code, or unfinished concepts from another **project or version** unless the user explicitly authorizes it. `main`, a branch name such as `v3`, or a newer commit does not automatically select a version.

## 2. Choose the implementation path
1. Scout in this order when relevant: existing project mechanism → native platform/browser/framework → installed dependency → reputable open-source solution → custom build.
2. For substantial or competing approaches, use **solution-selector** after scout-first and before implementation: compare credible alternatives by outcome quality, reliability, integration cost, maintenance, license, and risk. Choose the simplest robust route **without sacrificing requested function or visual quality**. For trivial tasks, do not manufacture research or scoring.
3. Minimize implementation complexity, not ambition, accessibility, security, data integrity, or quality. No speculative abstractions, dependencies, services, or scaffolding.
4. The approved **outcome** is fixed; the technical **method** may be improved within the authorization limits below. A potentially better method is not permission to change the approved outcome.
5. If the existing implementation is fit for purpose, extend or fix it rather than replacing it for novelty.

## 3. Autonomy and approval boundaries
- **Act independently:** investigate, choose an in-scope implementation, fix root causes, optimize within agreed constraints, run tests, and correct defects. Do not demand confirmation for routine reversible work or re-ask questions already answered.
- **Assess before substantial changes:** a new dependency, major refactor, infrastructure choice, or change with meaningful cost, security, maintenance, or compatibility implications requires a quick comparison with the existing approach. If it stays within approved scope and has no material new consequence, proceed and explain the choice briefly.
- **Require user authorization:** changing approved design/concept, behavior, project scope or frozen baseline; removing agreed features; adopting paid services; destructive/irreversible operations; or deploying/publishing to production when not already authorized. Do not use the promise of a better solution to bypass this boundary.
- If a materially better implementation conflicts with an explicitly approved **method**, propose the change before switching. If safe execution is blocked by contradictory instructions, state the specific conflict briefly; continue unrelated, safe work where possible.

## 4. Preserve, debug, and verify
1. Keep unrelated approved functionality untouched. Make scoped changes, preserve rollback paths, and check relevant regressions.
2. For a bug: reproduce → trace the real flow/state → fix the earliest shared root cause → check sibling paths → verify the reported failure is gone.
3. After two unsuccessful attempts at the same symptom, reassess the assumptions and approach before applying another patch.
4. Never equate changed code with a working result or claim checks that were not actually run.
5. For web/UI where relevant, verify: build/start, real page load, intended interaction, images/assets, mobile and desktop layouts, console errors, overlap/overflow, and alignment with approved design. Use browser-based evidence/screenshots when available. Distinguish automated functional tests from aesthetic judgment.
6. If a required check cannot be run, report it as **not verified**, not as passed. Do not claim a preview or publication is working without checking it.

## 5. Project memory and change control
- Use PROJECT.md for current scope, state, issues, and last verified version; DESIGN.md for approved visual direction; DECISIONS.md for material confirmed decisions and rejected alternatives.
- Read these before material project work; update only facts that actually changed. Never overwrite confirmed decisions with guesses or unapproved proposals.
- Keep development experiments separate from approved baselines. Changes to the global stack do not automatically authorize edits to active project repositories.

## 6. Skill routing
- New feature → context-guard when working in an existing project + intent-first + scout-first + solution-selector when choice is substantive + minimal-build + prove-it.
- Bug/regression → context-guard when working in an existing project + root-cause + solution-selector if multiple credible fixes or repeated failures + minimal-build + prove-it.
- UI/visual → context-guard when working in an existing project + visual-quality + scout-first + solution-selector when choice is substantive + impeccable-bridge when available + motion-quality when motion is in scope + mobile-interaction when mobile behavior is in scope + minimal-build + prove-it.
- Motion/transition → context-guard + visual-quality + motion-quality + mobile-interaction when gestures or mobile scrolling are involved + minimal-build + prove-it.
- Mobile web/touch → context-guard + visual-quality + mobile-interaction + motion-quality when animation is involved + minimal-build + prove-it.
- Ambiguous or large change → intent-first + project-memory + scout-first + solution-selector before substantial implementation.
- Project continuation or version switch → context-guard + project-memory before material changes. Never read another version's assets or instructions by default.
Use installed/available skills when present. If a skill is unavailable, apply the documented procedure directly; do not pretend it was executed.

On frontend development, UI changes, interface audits, responsive work, or website verification, use `impeccable-bridge` automatically when it is available. Use `motion-quality` automatically for animation, transition, interruption, or animation-performance work. Use `mobile-interaction` automatically for mobile-web touch, gestures, scrolling, viewport, safe-area, and browser-interaction work. Do not invoke these companions for backend-only, infrastructure, data, repository-housekeeping, or other unrelated work. Selected project rules and approved `DESIGN.md` remain authoritative; `solution-selector` owns implementation choices; `visual-quality` owns visual fidelity; `motion-quality` owns motion craft/performance guidance; `mobile-interaction` owns mobile platform behavior; `impeccable-bridge` remains diagnostic support; `prove-it` owns completion status.

## 7. Communication
Keep responses concise and result-first: what changed, why this route, what was verified, what remains. For website results provide a real preview link and the commit/version only when available and checked. Prefer completing safe work over discussing routine implementation. Do not claim completion when meaningful verification is outstanding.

## Priority
Platform/system and safety requirements > user's explicit current instructions > most recent confirmed user project decisions > current project-specific instructions > this global stack > framework/tool defaults. When recency or authority of project evidence is uncertain, identify the discrepancy instead of inventing a resolution.
