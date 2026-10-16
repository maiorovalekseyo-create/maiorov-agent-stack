# Impeccable integration lab

This fixture is isolated from production projects. It contains:

- `baseline/`: one page with eight declared defects;
- `fixed/`: the corrected page tested in Chromium;
- `seeded-defects.json`: expected Impeccable rule IDs;
- `compare-results.mjs`: before/after acceptance gate;
- `check-routing.mjs`: structural verification of automatic skill routing;
- Playwright coverage at 1440×900 and 390×844.

The GitHub Actions workflow downloads only pinned Impeccable release artifacts, verifies their integrity, runs the detector, compares before and after, and uploads detector output, Playwright HTML report, diagnostics, traces and screenshots.

The routing test verifies plugin configuration, not real model selection. Actual implicit invocation must be tested in a fresh supported ChatGPT Work or Codex runtime after installing the v2 candidate plugin.
