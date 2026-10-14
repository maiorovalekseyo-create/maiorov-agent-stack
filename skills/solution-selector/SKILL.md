---
name: solution-selector
description: Choose the most effective implementation path before substantial new work or a major change of approach. Use after context-guard/intent-first and scout-first, before building, especially when there are competing options, nontrivial integration, dependencies, or repeated rework.
---

# Solution Selector — Best Route, Not First Working Route

**Goal:** Deliver the user's approved outcome with strong quality, low avoidable rework, and the lowest reasonable total effort and risk. Do not optimize for merely getting code to run, novelty, or the fewest lines.

## Responsibilities and ordering

- **context-guard** determines *which project/version/ref* is in scope. Never scout or borrow from excluded project versions.
- **intent-first** establishes the outcome, constraints, approved experience and non-regression criteria.
- **scout-first** finds viable implementations: existing mechanism -> native/platform/framework -> installed dependency -> credible open-source -> custom code.
- **solution-selector** chooses between *viable* paths and states how success will be verified.
- **minimal-build** keeps the chosen implementation lean; **prove-it** verifies it after implementation.

This skill does **not** duplicate scouting, authorize cross-version imports, or replace the project's approved design.

## Decision procedure

1. **Define success first.** Write a short internal target: desired user-visible/functioning result, project/version, non-negotiable requirements, locked design/flows, performance/device needs, and unacceptable regressions.
2. **Filter out disallowed options.** Reject paths that violate approved scope or design, platform/security/privacy/accessibility/data-integrity constraints, required license, available budget, or an explicitly agreed implementation method. A method change needing approval is a **proposal**, not an automatic substitution.
3. **Consider credible alternatives.** For substantial choices, compare the most promising 2–3 options found by scout-first, including the existing approach when viable. Check the actual integration surface instead of assuming a library is plug-and-play. If one clearly sufficient low-risk native/existing solution is evident, select it without a ceremonial comparison or more searching.
4. **Compare total cost of ownership, not just first-build time.** Evaluate:
   - fidelity to the requested behavior, visual quality, and user experience;
   - reliability, relevant tests, compatibility and regression risk;
   - implementation and integration time, ongoing maintenance, reversibility;
   - performance, bundle/operational weight, security and data handling;
   - licensing/usage rights, ongoing fees, dependency health and vendor lock-in.
   Use qualitative judgments grounded in evidence, not invented numeric scores or false precision. Unknowns that change the decision must be tested or clearly marked as assumptions.
5. **Choose the smallest robust option meeting all hard requirements.** Reuse when truly fit; prefer platform/native where comparable; use a well-maintained library when it materially improves fidelity, time, or risk. Write custom code when reuse is worse after integration and maintenance costs. Simplicity cannot excuse weaker outcomes.
6. **Specify a proof before implementing.** Identify the smallest meaningful check(s) that will reveal whether the selected approach meets the objective, including regression checks for approved behavior. For UI: real desktop/mobile rendering and interactions, not only static code review.
7. **Act within authorization.** Implement reversible, scoped decisions independently. Ask first when changing an approved concept/design/method, adding significant cost or permissions, undertaking destructive/irreversible work, or making an unauthorized production deployment. Do not reopen decisions the user already made.
8. **Reassess on evidence.** If real testing shows the selected path fails a hard requirement or two attempts cannot solve the same defect, revisit assumptions and alternatives. Do not keep layering patches to defend the original choice.

## Effort proportional to risk

| Case | Selection depth |
| --- | --- |
| Trivial, reversible fix with obvious cause | Use existing mechanism; no research or option table. |
| New feature with one strong in-project/native solution | Sanity-check fit and regressions; proceed. |
| Competing libraries/architectures, meaningful cost, or fragile UI | Compare 2–3 realistic alternatives and choose one before writing substantial code. |
| Proposed departure from approved concept/method or material paid/destructive change | Explain the gain and tradeoff briefly; obtain user authorization before switching. |

Stop searching once an option demonstrably satisfies the requirements and additional searches are unlikely to change the choice. Do not build an elaborate framework, orchestration layer, or scoring spreadsheet just to choose a small implementation.

## Minimal decision record (internal by default)

- **Target:** approved outcome, scope/version, do-not-break conditions.
- **Candidates considered:** only plausible approaches, including existing code if relevant.
- **Choice:** one recommended route and why it wins on user value, risk and total effort.
- **Risks / unknowns:** actionable checks or constraints.
- **Proof:** practical verification and rollback plan where material.
- **Approval:** needed or not needed, and why.

Do **not** routinely dump this analysis on the user. In normal replies: say briefly **what was chosen, why, what was tested, and where the result is**. When a decision materially affects architecture, expenses, or long-term support, record the accepted decision and rejected alternatives in the selected project's DECISIONS.md after it is approved/implemented.

## Regression examples

- **Product card needs simplification:** first inspect the selected branch's working component, preserve the add-to-inquiry/where-to-buy flows, then prefer a scoped layout adjustment over rebuilding the whole catalog.
- **Animation feels rough:** check existing implementation and browser capabilities before installing a heavy animation framework; compare visual fidelity and maintainability, not just coding speed.
- **Images fail after deployment:** find the shared asset/URL/deployment cause before trying image substitutions or unrelated redesigns.
- **A polished design reference is approved:** reject simpler templates that fail the reference, even if they are quicker to implement.

**Pass condition:** Before substantial implementation the agent can explain why the selected route is more suitable than obvious alternatives and how it will verify the user's actual outcome. If it cannot, improve the selection first.
