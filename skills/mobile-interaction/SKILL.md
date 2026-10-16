---
name: mobile-interaction
description: Automatically review and implement mobile-web touch, gesture, scrolling, viewport, safe-area, and browser interaction behavior. Use for mobile interfaces, drawers, carousels, forms, touch targets, or mobile-browser regressions; not for backend/data work or React Native. MAIOROV STACK and approved project rules remain authoritative.
metadata:
  upstream: emilkowalski/skills@2d228630ba1446365f614a108cb8252f1feda202
  upstream-author: Emil Kowalski
  upstream-license: MIT
---

# Mobile Interaction

Make the selected web interface behave correctly on touch and in mobile browsers without changing its approved design or product mechanics.

This skill is a focused adaptation of Emil Kowalski's `mobile-native` guidance at the pinned commit recorded above. Attribution and the upstream MIT license are preserved under `integrations/emilkowalski/`.

## Required order

1. Run `context-guard`; lock the exact project/ref, mobile scope, and approved mechanics.
2. Read `DESIGN.md`, supported browsers, current viewport setup, and existing interaction code.
3. Use `solution-selector` before adopting gesture libraries or replacing native scrolling.
4. Use `visual-quality` for the mobile composition and `motion-quality` for timing/easing/per-frame animation cost.
5. Apply this skill to touch, gestures, scroll ownership, viewport units, safe areas, keyboards, and browser chrome.
6. Use `prove-it` for desktop/mobile browser checks and state real-device limitations explicitly.

## Native-first rules

- Prefer capability queries over device or user-agent detection.
- Touch and mouse may coexist; do not classify a device from screen width alone.
- Prefer native scroll plus CSS scroll snap to a hand-built carousel.
- Prefer Pointer Events to separate mouse/touch handlers when a custom gesture is necessary.
- Do not globally cancel `touchmove`; declare scroll ownership with `touch-action` and `overscroll-behavior`.
- Never disable zoom. Fix input sizing and layout instead.
- Do not disable text selection on content; limit it to controls and drag handles.

## Mobile baseline

- Use `width=device-width, initial-scale=1, viewport-fit=cover`; use `interactive-widget=resizes-content` when a keyboard-aware app shell needs it.
- Use `100svh` for stable first-screen/hero composition and `100dvh` for app shells that must track browser chrome. Keep `100vh` only as an intentional legacy fallback.
- Apply safe-area insets only to edge-attached headers, bars, sheets, and controls.
- Keep inputs at least 16 px on coarse pointers to prevent iOS focus zoom.
- Give actionable controls at least a 44 × 44 CSS-pixel target unless the project's stricter standard applies.
- Use `touch-action: manipulation` for ordinary buttons/links.
- Gate hover-only behavior with `(hover: hover) and (pointer: fine)` and retain a visible `:active` state.
- Remove tap highlight only when the interface supplies its own clear press feedback.
- Match light/dark `theme-color` to the actual top surface when the project controls browser chrome.

## Gesture contract

For each gesture, define before coding:

- owning surface and axis;
- activation threshold and cancellation rule;
- pointer capture behavior;
- final state after interruption;
- keyboard/button alternative;
- effect on page scrolling and text selection.

For a horizontal custom gesture, `touch-action: pan-y` normally leaves vertical page scrolling with the browser. Use `touch-action: none` only on a surface that genuinely owns both axes. Release pointer capture and settle state on `pointerup` and `pointercancel`.

## Scroll and browser behavior

- Use `overscroll-behavior: contain` for nested scroll regions when scroll chaining is harmful.
- Use root `overscroll-behavior: none` only for app-like experiences where pull-to-refresh/rubber-banding is intentionally disabled; do not apply it automatically to documents.
- Keep focus visible and ensure fixed/bottom controls remain usable when the software keyboard changes the viewport.
- Confirm no horizontal document overflow at the project mobile viewport.
- Provide non-gesture controls for carousel, drawer, and reorder behavior.

## Verification contract

Test in a real browser at the project desktop/mobile viewports:

- taps, buttons, focus, form input, and keyboard alternatives;
- gesture direction, cancellation, rapid reversal, and final state;
- vertical and nested scrolling, horizontal document overflow;
- viewport and safe-area declarations;
- reduced motion through `motion-quality` when gestures animate;
- JavaScript errors and failed resources.

Playwright touch emulation can verify event routing, attributes, scroll state, and final UI state. It cannot prove iOS input zoom, sticky hover, tap delay, rubber-banding, safe-area feel, software-keyboard behavior, or physical gesture quality. Mark those as requiring representative iOS/Android hardware.

**Pass condition:** mobile input does not block intended scrolling; gestures are cancellable and have accessible alternatives; controls and forms remain usable; desktop behavior does not regress; and any real-device gap is reported rather than inferred from emulation.
