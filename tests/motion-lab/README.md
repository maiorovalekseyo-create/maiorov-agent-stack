# Motion and mobile interaction lab

This fixture is isolated from production projects and compares two pages with the same visible design and content.

- `baseline/`: eleven intentional motion/mobile interaction defects.
- `fixed/`: the same interface with native CSS, Pointer Events, scroll snap, interruption handling, and reduced-motion support.
- `shared/`: common visual system and interaction code, split by the page's `data-variant`.
- `audit-motion.mjs`: deterministic before/after source-risk audit.
- `check-routing.mjs`: structural verification of the twelve-skill experimental plugin and authority boundaries.
- Playwright: desktop 1440×900 and mobile 390×844 browser checks, screenshots, gesture/event routing, rapid reversal, controls, scrolling, resources, errors, overflow, and reduced motion.

The browser test records a short `requestAnimationFrame` interval sample separately for baseline and fixed pages. It is not a pass/fail threshold and does not prove 60 FPS. CI runners do not represent a mid-range phone, a 120 Hz display, a weak GPU, Safari rubber-banding, software-keyboard behavior, safe-area feel, or physical touch quality.

No animation or gesture library is used. The only test dependency is exact-pinned `@playwright/test` `1.64.1`, installed with `npm ci` from the committed lockfile.
