# Emil Kowalski skills integration lock

The experimental `motion-quality` and `mobile-interaction` skills are focused adaptations, not a repository copy.

- Upstream: https://github.com/emilkowalski/skills
- Pinned commit: `2d228630ba1446365f614a108cb8252f1feda202`
- Author: Emil Kowalski
- License: MIT
- License copy: [`LICENSE`](LICENSE)

Adapted sources:

- `skills/animate/SKILL.md`
- `skills/review-animations/SKILL.md`
- `skills/review-animations/STANDARDS.md`
- `skills/animation-performance/SKILL.md`
- `skills/find-animation-opportunities/SKILL.md`
- `skills/mobile-native/SKILL.md`
- `performance-cheatsheet.md`

The upstream files are not bundled into the plugin. CI downloads these text files from the exact commit and verifies their Git blob SHA-1 values recorded in `versions.json`. No upstream runtime code or dependency is installed.

MAIOROV STACK remains the controlling layer. Project rules and approved `DESIGN.md` define intent; `solution-selector` owns implementation choices; `visual-quality` owns visual fidelity; `motion-quality` owns motion craft/performance guidance; `mobile-interaction` owns mobile platform behavior; `impeccable-bridge` is supporting diagnostics; and `prove-it` owns completion status.
