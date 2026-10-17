---
name: visual-quality
description: Preserve and verify project-specific visual quality for website/UI work. Use before UI changes and during rendered visual review; assess hierarchy, typography, imagery, layout, responsive behavior and motion without overriding approved design or mixing versions.
---

# Visual Quality — Project Identity, Not Agent Taste

**Visual quality is judged against the user's approved direction and the actual rendered result, not against a generic AI/SaaS template or an agent's personal aesthetic.**

First use `context-guard` to lock the project/version/ref. Read DESIGN.md, relevant approved screenshots/references, and existing approved implementation **only within that selected scope**. If a document contradicts newer confirmed decisions, do not treat it as authority. Do not pull visual elements, assets, mechanics, or text from sibling versions by default.

## 1. Capture the visual contract before editing

Identify, insofar as available:
- the approved visual character and intended user impression;
- typography (families, hierarchy, weights, sizes, line height and wrapping);
- palette, contrast, surfaces, spacing and compositional rhythm;
- actual project imagery (asset provenance, framing/crops, resolution and aspect ratio);
- components, states, navigation and interactions already approved;
- desktop and mobile compositions, breakpoint behavior and touch targets;
- animation purpose, timing, continuity and reduced-motion requirements;
- protected sections/flows, forbidden references and changes **outside scope**.

For **new visual direction**, use the user's brief and references; propose decisions only where truly missing. Do not invent approval. For **small fixes**, preserve the existing visual system and focus on the changed area.

## 2. Design/implementation rules

1. **Approved reference > agent taste.** Optimize clarity and polish *within* the direction. Do not switch to generic card grids, gradients, decorative 3D, excessive motion, or fashionable patterns by default.
2. **Coherent hierarchy.** Clear primary action, readable section flow, intentional focal points, consistent alignment and spacing. Avoid decorative content that obscures meaning.
3. **Typographic discipline.** Use the project's font and typographic scale consistently across states and transitions; avoid abrupt font/weight/size shifts, awkward line wrapping, clipped labels or unreadable overlays.
4. **Imagery discipline.** Prefer authorized project assets; check actual load, quality, compression, correct crop and coherent art direction. Never hide a missing asset with an unrelated image. Do not invent company/product facts from decorative imagery. Respect user approval requirements for generated assets.
5. **Responsive by design.** Mobile is a deliberate composition, not desktop squeezed narrower. Preserve information priority, navigation, readable text, usable controls, and scroll flow.
6. **Interaction and motion with purpose.** Correct trigger/feedback, stable state and focus, smooth transitions, no unexpected jumps or disappearing elements; respect reduced-motion settings. Preserve consistent object placement/scale between animation states when continuity matters.
7. **Accessible and functional.** Maintain meaningful labels, sufficient contrast, keyboard/focus use, visible interactive states, and accessible alternatives where applicable. Visual polish never excuses a broken action.
8. **Scoped changes and low overhead.** Refine existing components rather than redesigning unrelated approved areas. A design tool (Impeccable, Emil Kowalski, Taste, etc.) is a **review aid**, never authority to override the project's DESIGN.md or confirmed user decisions. Do not install a design tool unless it materially improves the task.

## 3. Rendered visual review — acceptance gate

Code inspection is not visual proof. If real browser or screenshot inspection is available, compare the selected branch's **rendered output** against its own approved reference(s), not against an unrelated branch or new generated inspiration.

| Area | Look for | Fail examples |
| --- | --- | --- |
| Composition/hierarchy | Focal point, content density, CTA placement, consistent grid and spacing | Unexpected competing focal points; unrelated sections moved |
| Typography | Font loading, scale, line breaks, readable overlays, state-to-state consistency | Text clipped, shifted or changing font during transitions |
| Images | Correct authorized imagery, sharpness at display size, intentional crop, loading state | Broken/blurred product image; misleading substitution |
| Mobile & desktop | Header/menu, key components, breakpoints, overflow, touch and scroll | Hidden CTA, horizontal scroll, colliding elements |
| Interaction/motion | Hover/touch/focus states, transition continuity, optional reduced motion | Flicker, snapping, missing object between frames, motion blocking use |
| Brand/fidelity | Overall character and specifics of approved design | Generic redesign or transfer of another version's mechanics |

Check both changed components **and adjacent approved areas** most likely to regress. Use side-by-side screenshots with comparable viewport/state when available. For a user-selected, approved snapshot, deviations are defects unless specifically requested. Screenshot pixel differences are signals for human/visual inspection, **not automatic evidence of beauty or correctness**.

Use project-specific viewport standards where defined; otherwise inspect at least a representative mobile and desktop size when such tools are available. Do not report visual testing if only CSS/source was reviewed. More viewports/devices are justified for changes touching breakpoints or unusual interactions.

## 4. Severity and acceptance

- **Blocking:** approved visual identity or primary flow broken; missing critical assets/CTA; major mobile collision; serious accessibility issue; unintended cross-version concept.
- **Significant:** clear visual mismatch, typographic inconsistency, poor crop, unstable animation, layout regression affecting experience.
- **Minor:** local polish that does not impair understanding/use and is not required by the user's task.

Fix blocking/significant **in-scope** findings and inspect again before calling the work verified. Keep minor improvements proportional to scope and avoid redesign by accumulation of tiny fixes.

Functional success is checked through `prove-it`; visual fidelity is assessed here. Passing automated checks does **not** establish artistic approval. If a new concept or significant deviation needs user sign-off, deliver a verified candidate for review, **not** a claim that the user approved it.

## 5. Communication and project memory

Report briefly:
- **Visual direction preserved / changed:** only actual changes.
- **Visual verification:** rendered pages/screens/viewports checked and comparison reference; or explicitly **not verified** if browser/screenshot review was unavailable.
- **Remaining issues:** substantive visual gaps and whether user approval is needed.

For a new project, create or update the selected version's DESIGN.md with the **confirmed** palette, typography, layout, imagery, motion, desktop/mobile rules, approved references and forbidden drift. For existing projects, update only decisions actually confirmed; never modify another version's DESIGN.md.

**Pass condition:** A concrete rendered review shows the requested UI change, relevant approved visual character and critical flows are preserved for the correct version; when rendered evidence is unavailable, mark the visual portion unverified.
