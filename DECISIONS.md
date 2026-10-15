# Decisions

## Impeccable is a subordinate companion

- Decision: add an `impeccable-bridge` skill and pinned CI detector, not a replacement for `visual-quality`, `solution-selector`, or `prove-it`.
- Reason: reuse upstream deterministic checks while preserving version isolation, approved design authority, and independent release verification.
- Rejected: copying the entire upstream repository; global installation; global hooks; allowing Impeccable to redesign approved projects automatically.
- Revisit when: the experimental branch passes detector, browser, artifact-integrity, and runtime activation tests and the user approves promotion.

## Automatic application has two separate mechanisms

- Decision: use implicit skill routing for UI tasks and optional reviewed project-local hooks for local Codex. Do not claim command hooks in cloud-orchestrated Work.
- Reason: skill selection and lifecycle hooks have different platform support and trust boundaries.
- Revisit when: official Work hook support changes or a managed remote hook is explicitly authorized.
