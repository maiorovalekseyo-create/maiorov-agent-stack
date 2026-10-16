# Decisions

## Impeccable is a subordinate companion

- Decision: add an `impeccable-bridge` skill and pinned CI detector, not a replacement for `visual-quality`, `solution-selector`, or `prove-it`.
- Reason: reuse upstream deterministic checks while preserving version isolation, approved design authority, and independent release verification.
- Rejected: copying the entire upstream repository; global installation; global hooks; allowing Impeccable to redesign approved projects automatically.
- Revisit when: upstream versions change, the authority order needs revision, or verified runtime behavior differs from the documented routing.

## Automatic application has two separate mechanisms

- Decision: use implicit skill routing for UI tasks and optional reviewed project-local hooks for local Codex. Do not claim command hooks in cloud-orchestrated Work.
- Reason: skill selection and lifecycle hooks have different platform support and trust boundaries.
- Revisit when: official Work hook support changes or a managed remote hook is explicitly authorized.

## Promote the accepted integration to develop

- Date: 2026-10-16.
- Decision: fast-forward `develop/maiorov-stack-v2` from the accepted experiment and add only promotion metadata, documentation, target-branch CI routing, and full skill-set compatibility checks.
- Source: `experiment/impeccable-v4.5.2` at `f4a6c3ad25788a977d4b3fc2b9180c7da898351b`.
- Preserved: all nine original skill files remain byte-identical to the pre-promotion develop commit.
- Boundary: `main`, active sites, global installations, global hooks, and ChatGPT settings remain unchanged.
- Release status: repository and CI evidence may pass, but automatic invocation in a fresh supported runtime remains explicitly unverified.
