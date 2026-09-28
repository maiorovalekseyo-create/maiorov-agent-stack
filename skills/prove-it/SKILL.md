---
name: prove-it
description: Verification-before-completion. Use automatically after implementation or fixes, especially for web/UI and integration work.
---

# Prove It

Changed code is not proof of success.

Before saying done, verify the strongest practical evidence available.

For web/UI, when applicable:
- build/start command succeeds;
- actual page loads;
- requested interaction works;
- desktop behavior;
- mobile behavior;
- console has no relevant errors;
- no obvious overflow/overlap;
- result matches approved design/intent.

For logic/backend:
- run the smallest meaningful test/check;
- exercise the changed path;
- verify failure mode if material.

State what was actually verified. Never imply verification that did not happen.
