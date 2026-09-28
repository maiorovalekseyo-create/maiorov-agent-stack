---
name: scout-first
description: Search for the best existing path before substantial custom implementation. Use automatically for new functionality, integrations, mechanics, UI effects, libraries, architecture choices, and whenever open-source or platform reuse could reduce effort.
---

# Scout First

Before substantial custom work, check in this order:
1. Existing code/pattern in the current project.
2. Native browser/OS/database/platform capability.
3. Current framework capability.
4. Already-installed dependency.
5. Reputable open-source implementation or reference.
6. Only then write custom code.

Evaluate candidates for:
- fit to requested outcome;
- maintenance burden;
- license;
- activity/health;
- dependency weight;
- integration cost;
- deployment/region constraints;
- whether adaptation is cheaper than local implementation.

Do not search for the sake of searching. If the current project already has the right mechanism, reuse it.

Output the chosen path, not a long catalog, unless alternatives materially differ.
