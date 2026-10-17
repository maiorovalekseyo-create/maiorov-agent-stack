---
name: motion-quality
description: Automatically design, review, and optimize web animation and transitions when a task involves motion, state changes, gestures, or animation performance. Do not use for static visual work or unrelated backend/data tasks. MAIOROV STACK context, approved DESIGN.md, visual-quality, solution-selector, mobile-interaction, and prove-it remain authoritative.
metadata:
  upstream: emilkowalski/skills@2d228630ba1446365f614a108cb8252f1feda202
  upstream-author: Emil Kowalski
  upstream-license: MIT
---

# Motion Quality

Use motion as a supporting interaction layer, never as permission to change an approved design or mechanic.

This skill is a focused adaptation of Emil Kowalski's `animate`, `review-animations`, `animation-performance`, and `find-animation-opportunities` guidance at the pinned commit recorded above. Attribution and the upstream MIT license are preserved under `integrations/emilkowalski/`.

## Required order

1. Run `context-guard`; lock the repository, ref, approved design, and allowed files.
2. Read the selected project's `DESIGN.md` and current motion tokens/implementation.
3. Use `solution-selector` before introducing a library or changing an established motion architecture.
4. Use `visual-quality` as the authority for visual intent and product character.
5. Apply this skill to animation purpose, timing, interruption, and performance.
6. Defer touch, scroll, safe-area, and mobile-browser mechanics to `mobile-interaction`.
7. Use `impeccable-bridge` only as a supporting static/design diagnostic where relevant.
8. Use `prove-it` for the final browser and regression gate.

## Motion gate

Before writing animation code, name its purpose: feedback, spatial continuity, state legibility, preventing a jarring change, explanation, or rare delight. If no purpose applies, do not animate.

- Keyboard-triggered or extremely frequent actions: instant state change.
- Frequent controls: subtle 100–160 ms feedback, or no motion.
- Occasional overlays, drawers, and state changes: normally 150–300 ms.
- Long explanatory motion is allowed only when the approved experience requires it.

Do not add motion merely because an opportunity exists. Preserve readable content and approved mechanics.

## Implementation ladder

Choose the first sufficient option:

1. CSS transition for hover, press, and class/attribute state changes.
2. CSS animation or `@starting-style` for predetermined entry motion.
3. Web Animations API for programmatic, interruptible control without a dependency.
4. An existing approved project library when springs, layout animation, or momentum are genuinely required.
5. A new dependency only after `solution-selector` shows a material benefit and the user has authorized it.

Never add a motion library for a fade, press state, or ordinary disclosure.

## Craft rules

- Prefer `transform` and `opacity`; justify any layout or paint property.
- Never use `transition: all`.
- Do not enter from `scale(0)`; use approximately `scale(.95)` plus opacity when scaling is appropriate.
- Use strong ease-out for entry/exit: `cubic-bezier(.23, 1, .32, 1)`.
- Use strong ease-in-out for movement already on screen: `cubic-bezier(.77, 0, .175, 1)`.
- Do not use `ease-in` for UI feedback.
- Keep normal UI motion below 300 ms unless the approved concept explicitly needs more.
- Anchor popovers and tooltips to their trigger; centered modals are exempt.
- Use transitions or an interruptible WAAPI animation for rapidly reversible state. Do not queue or lock out the user's next intent.
- Exit through the same spatial path used for entry unless the approved interaction says otherwise.
- Gate hover motion with `(hover: hover) and (pointer: fine)`.
- Provide `prefers-reduced-motion`; retain useful state feedback while removing positional travel and long duration.

## Performance diagnosis

Name the likely cause before changing code:

1. Layout properties animated each frame.
2. Paint-heavy shadows, large blur, or oversized layers.
3. Main-thread JavaScript competing with navigation, loading, or rendering.
4. React/state updates on every frame.
5. An inherited CSS variable causing descendant style recalculation.
6. Too many elements moving simultaneously.

Prefer compositor-safe CSS/WAAPI where equivalent. Write gesture values directly to the animated element rather than rerendering a component tree. Add `will-change` only after evidence of a promotion artifact or measured benefit; remove it when it is no longer needed.

## Verification contract

For each changed motion path, record:

- purpose and expected frequency;
- driver, properties, easing, duration, and reduced-motion behavior;
- rapid reversal or interruption result;
- representative desktop and mobile browser result;
- console/resource/overflow/accessibility regressions;
- performance evidence and its limits.

Automated functional tests can prove final state, cancellation, and media-query behavior. A short CI timing sample cannot prove sustained 60 FPS, real-device touch feel, or visual elegance. Those require DevTools frame analysis and representative physical devices.

**Pass condition:** the approved design and mechanics are preserved; motion has a clear purpose; rapid user intent is not ignored; reduced motion works; obvious layout/paint risks are removed; and `prove-it` verifies the relevant rendered behavior without overstating performance.
