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

## Promote the accepted Impeccable integration to develop

- Date: 2026-10-16.
- Decision: fast-forward `develop/maiorov-stack-v2` from the accepted experiment and add only promotion metadata, documentation, target-branch CI routing, and full skill-set compatibility checks.
- Source: `experiment/impeccable-v4.5.2` at `f4a6c3ad25788a977d4b3fc2b9180c7da898351b`.
- Preserved: all nine original skill files remain byte-identical to the pre-promotion develop commit.
- Boundary: `main`, active sites, global installations, global hooks, and ChatGPT settings remain unchanged.
- Release status: repository and CI evidence may pass, but automatic invocation in a fresh supported runtime remains explicitly unverified.

## Consolidate Emil Kowalski guidance into two companion skills

- Date: 2026-10-16.
- Decision: adapt only the relevant pinned guidance into `motion-quality` and `mobile-interaction`; preserve attribution and MIT license; do not copy or install the upstream repository.
- Reason: the two skills create a clear ownership boundary—motion craft/performance versus touch/scroll/mobile-browser behavior—without duplicating `visual-quality`, `impeccable-bridge`, `solution-selector`, or `prove-it`.
- Selected implementation: native CSS and browser APIs first; no animation runtime dependency.
- Rejected: installing all upstream skills; adding a motion library for the lab; merging animation review, mobile behavior, and visual direction into one oversized skill.
- Authority: project rules and approved `DESIGN.md` remain first; MAIOROV STACK controls routing and decisions; the new skills are specialized companions.
- Proof boundary: Playwright proves defined browser behavior; source audit identifies known risk patterns; CI rAF timing is diagnostic and cannot establish real-device 60 FPS or automatic model invocation.
- Revisit when: a real project requires springs/layout animation that native primitives cannot provide, the upstream commit changes, or physical-device evidence contradicts the guidance.

## Promote the accepted motion and mobile integration to develop

- Date: 2026-10-16.
- Decision: promote the accepted `experiment/motion-mobile-v1` commit `835eccf2aaf4def1416382098f915dd52cc7dde3` to `develop/maiorov-stack-v2`, then release it as candidate `2.0.0-rc.3`.
- Preserved: the ten pre-existing `SKILL.md` blobs are byte-identical to the pre-promotion develop commit `3327f6ecf10e06444d21ccbe4b9ddfcb4f61cfad`; the isolated test site is unchanged.
- Added: `motion-quality`, `mobile-interaction`, pinned Emil Kowalski attribution/license/integrity records, routing rules, and the accepted motion/mobile test workflow.
- Compatibility fix: both routing gates now expect the complete twelve-skill set and candidate version `2.0.0-rc.3`.
- Boundary: MAIOROV STACK remains authoritative; `main`, active sites, global installations, ChatGPT settings, and the approved fixture design remain unchanged.
- Proof boundary: GitHub Actions can prove repository integrity and defined browser behavior, but not automatic fresh-session invocation, real-device feel, Safari coverage, or sustained 60 FPS.
