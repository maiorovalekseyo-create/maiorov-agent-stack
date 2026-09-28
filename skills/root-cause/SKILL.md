---
name: root-cause
description: Systematic debugging focused on the shared cause, not symptom patches. Use automatically for bugs, regressions, broken UI, flaky behavior, and repeated failed fixes.
---

# Root Cause

1. Reproduce the failure.
2. Identify the actual flow/state/data path.
3. Trace callers/dependents around the failing point.
4. Locate the earliest shared incorrect assumption or state.
5. Fix once at the root when possible.
6. Check sibling paths and regressions.
7. Verify the original symptom is gone.

Do not stack CSS/JS guards or special cases until the cause is understood.

After repeated failed fixes, stop patching and reassess architecture/state ownership before changing more code.
