# Motion laboratory visual contract

## Purpose

An isolated interaction and motion verification surface, not a product redesign or a reusable brand direction.

## Locked visual system

- identical visible content, hierarchy, palette, typography, and composition in baseline and fixed versions;
- editorial navy, rust, paper, and white palette;
- Georgia display typography with Arial body text;
- one main laboratory surface with line-based divisions;
- desktop 1440×900 and deliberate mobile 390×844 composition;
- minimum 44 px actionable targets and visible keyboard focus;
- no remote assets, gradients, continuous decorative animation, or production/client content.

Only motion implementation, interruption behavior, touch/scroll ownership, mobile viewport behavior, and accessibility adaptations may differ between the two pages.

## Motion acceptance

- normal UI transitions at or below 300 ms;
- transform/opacity for the corrected state transition;
- rapid reversal follows the latest command;
- hover effects gated by input capability;
- reduced motion removes travel and long duration without hiding state;
- carousel retains vertical page scrolling and has button/keyboard alternatives.

The CI timing sample is diagnostic only. Smoothness and real-device touch feel require DevTools recording and representative physical hardware.
