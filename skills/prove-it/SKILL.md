---
name: prove-it
description: Evidence-based verification and release gate. Use after implementation, debugging, UI changes, or integrations; distinguish actual tests from assumptions, check regressions, and never report a site as working without appropriate evidence.
---

# Prove It — Evidence Before Completion

**Changed code, a successful build, and a plausible screenshot are three different things. None alone proves a working result.**

Apply only to the project/version/ref locked by `context-guard`. Do not inspect another version to fill evidence gaps or test a different deployment and attribute its success to the selected ref.

## 1. Define the acceptance contract before implementation

Use the user's requested outcome and existing approved behavior to identify:
- **Changed path:** the user-visible behavior, output, or defect to verify;
- **Must not regress:** adjacent routes, shared components, data flows, mobile behavior, and approved design;
- **Checks possible here:** automated tests, local browser, preview deployment, real device/user approval;
- **Authorized side effects:** do not submit live forms, create real transactions, publish to production, or alter user data merely to test without permission.

For small changes keep this internal and short. For major changes record durable acceptance criteria in the selected project's files when appropriate.

## 2. Web/UI verification gate (apply relevant checks)

| Dimension | Practical evidence | Common failure |
| --- | --- | --- |
| Build/start | Build, typecheck, or serve command actually succeeds, if applicable | Code exists but cannot run |
| Target version | Exact repository, ref, commit and preview/build provenance match | Testing another branch or stale deployment |
| Page and assets | Target page loads; affected images, fonts, scripts and styles return and render correctly | Blank hero, broken images, missing font |
| Interaction | Exercise changed buttons, navigation, forms, filters, dialogs, transitions; check expected state/route | Click without useful result |
| Mobile/desktop | Open representative viewport sizes and affected breakpoints; inspect fit, touch targets, scroll and clipping | Off-screen content, overlaps, inaccessible buttons |
| Browser/runtime | Check relevant console errors, failed requests, unexpected exceptions | Silent runtime failure |
| Accessibility | Check keyboard/focus, meaningful labels, contrast, reduced-motion behavior when relevant | Visible but unusable UI |
| Visual fidelity | Inspect rendered screenshots against *selected version's* approved references and visual-quality criteria | Generic redesign or accidental layout regression |
| Regression | Revisit impacted sibling paths and accepted flows, including add-to-inquiry/cart/navigation where applicable | Local fix breaks a shared component |

A check is **not passed** because source code appears correct. Use the strongest evidence available: real browser/Playwright when accessible; scripts/unit tests where appropriate; screenshots for visual review. Static inspection is **inspection**, not browser verification.

Use project-defined breakpoints and tested viewports when available. If none exist, choose a representative mobile and desktop size and state what was actually exercised; do not claim all devices were checked. Do not run broad test suites when a focused test plus targeted regressions provides sufficient evidence, unless the change's risk warrants them.

## 3. Separate functional truth from visual judgment

- **Functional checks:** interactions, routes, network/assets, console, accessibility, overflow; some can be asserted automatically.
- **Visual checks:** hierarchy, typography, imagery, spacing, layout coherence, identity and motion; require inspecting actual rendered output. Automated screenshot differences detect change, not whether the change is *good*.
- **User acceptance:** new aesthetic direction or a change to already approved visuals requires approval per the autonomy rules. Neither Playwright nor a design skill can substitute for the user's approval.

Use the `visual-quality` skill for the visual checklist. A passing build or passing Playwright script does not imply visual acceptance.

## 4. Defects, correction loop, and stop rules

1. Reproduce and classify issues: **blocker** (target fails, core flow/asset broken, serious regression or safety issue); **significant** (visible/functionality impairment); **minor** (non-blocking polish).
2. Fix in-scope defects at the shared root; rerun the failed check and relevant regression checks.
3. After **two unsuccessful fixes of the same symptom**, pause patching and reevaluate state, assumptions, and implementation route with `root-cause` / `solution-selector`. Do not stack speculative CSS/JS patches.
4. Do not change approved concepts or broaden scope merely to make a test pass. Escalate changes requiring user authorization.
5. If tooling is missing, access is blocked, or the issue requires a real external system, mark the relevant verification **not run / blocked**. Never fabricate screenshots, test logs, successful deployments, or measured performance.

Do not let a failed required gate become green by silently deleting or weakening a test.

## 5. Completion states and evidence report

- **VERIFIED:** All checks needed for the changed scope were actually performed and passed; no known blockers. Claims are limited to that scope.
- **PARTIALLY VERIFIED:** Some relevant checks passed, but important checks were not run or coverage is limited. Specify exactly what is unverified; do **not** call the full result ready.
- **BLOCKED / FAILED:** A required check failed, a blocker persists, or validation cannot proceed safely. Report the concrete blocker and preserve a rollback path.

For a deployed website, share a **checked preview URL and matching Git commit/version** only if both are known and confirmed. State separately whether deployment, interaction, desktop/mobile and visual review were verified. An unverified URL may be shared as a candidate for review but must never be described as checked or working.

### Minimal user-facing report (compact, no ceremonial checklist)

**Changed:** what the user requested.  
**Verified:** specific checks actually run and their result.  
**Not verified / blocked:** only remaining material gaps.  
**Reference:** target ref/commit and verified preview where applicable.

If no changes were made, do not imply that the task was implemented. Prioritize finishing and rechecking safe repairs over explanations.

**Pass condition:** Every completion claim is backed by checks on the *correct version*; failures or missing evidence remain visible rather than being treated as success.
