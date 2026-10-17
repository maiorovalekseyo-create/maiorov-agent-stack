---
name: impeccable-bridge
description: Automatically use the pinned Impeccable design detector and review workflow when developing, changing, auditing, or verifying websites and frontend interfaces. Do not use for backend-only, infrastructure, data, or non-UI tasks. MAIOROV STACK context, approved DESIGN.md, visual-quality, solution-selector, and prove-it remain authoritative.
metadata:
  upstream-skill: skill-v4.5.2
  upstream-engine: engine-v0.1.14
---

# Impeccable Bridge

Use Impeccable as an additional UI diagnostic tool, never as the controlling project method.

## Required order

1. Run `context-guard` and lock the exact repository, ref, project version, and allowed files.
2. Read the selected project's approved `DESIGN.md`, visual references, and current implementation.
3. Use `solution-selector` for architecture, dependencies, or a change of implementation method.
4. Use `visual-quality` as the authority for visual intent and preservation.
5. Use the pinned Impeccable detector or relevant Impeccable review workflow as supporting evidence.
6. Use `prove-it` for the final functional and visual release gate.

## Authority and conflict rules

- Approved project decisions and `DESIGN.md` override Impeccable's aesthetic defaults.
- Never turn a repair, audit, or polish request into an unsolicited redesign.
- Do not copy visual language, assets, or rules from another branch or project.
- Detector findings are evidence to review, not permission to edit unrelated UI.
- A clean detector result does not prove correct interactions, resources, browser runtime, responsive behavior, visual fidelity, or user approval.
- Do not create a second `PRODUCT.md` or `DESIGN.md` when MAIOROV project memory already provides the confirmed facts.

## Automatic routing

Apply this skill implicitly for frontend implementation, layout, typography, responsive work, UI accessibility, interface audits, and pre-release website verification.

Do not apply it for backend-only code, databases, CI maintenance unrelated to UI, repository housekeeping, prose-only work, or other tasks with no rendered interface.

## Runtime boundaries

- Versions are locked by `integrations/impeccable/versions.json`.
- Prefer CI or an already-approved project-local runtime. Never install a global binary or global hook as a side effect.
- A project-local Codex hook may be enabled only after the exact hook definition is reviewed and trusted. Cloud-orchestrated ChatGPT Work does not execute local command hooks.
- Keep telemetry disabled. New-design features that require the Impeccable roll API need separate approval and are outside the default bridge.
- Never send client materials to Impeccable or another service.

## Evidence contract

Record the detector version, target ref, command, exit status, finding IDs, before/after result files, and any ignored finding with a reason. Report actual browser checks separately from detector results.

**Pass condition:** the correct project/ref was protected, relevant Impeccable findings were reviewed, the approved design was preserved, and `prove-it` independently verified the rendered UI and critical behavior.
