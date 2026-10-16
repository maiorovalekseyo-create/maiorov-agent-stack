const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');

const watchedResourceTypes = new Set(['document', 'stylesheet', 'script', 'image', 'font', 'xhr', 'fetch']);

function collectDiagnostics(page) {
  const diagnostics = { javascriptErrors: [], consoleErrors: [], failedRequests: [], badResponses: [] };
  page.on('pageerror', (error) => diagnostics.javascriptErrors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') diagnostics.consoleErrors.push(message.text()); });
  page.on('requestfailed', (request) => diagnostics.failedRequests.push({
    url: request.url(), resourceType: request.resourceType(), error: request.failure()?.errorText || 'unknown request failure',
  }));
  page.on('response', (response) => {
    if (response.status() >= 400 && watchedResourceTypes.has(response.request().resourceType())) {
      diagnostics.badResponses.push({ url: response.url(), status: response.status(), resourceType: response.request().resourceType() });
    }
  });
  return diagnostics;
}

async function transitionMilliseconds(locator) {
  return locator.evaluate((element) => Math.max(...getComputedStyle(element).transitionDuration
    .split(',').map((value) => value.trim().endsWith('ms') ? Number.parseFloat(value) : Number.parseFloat(value) * 1000)));
}

async function sampleFrames(page, variant) {
  await page.goto(`/${variant}/`, { waitUntil: 'networkidle' });
  const sample = await page.evaluate(async () => {
    const samples = [];
    const start = performance.now();
    let previous = start;
    document.querySelector('[data-panel-toggle]').click();
    await new Promise((resolve) => {
      function frame(now) {
        samples.push(now - previous);
        previous = now;
        if (now - start >= 850) resolve(); else requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
    const sorted = [...samples].sort((a, b) => a - b);
    const percentile = (ratio) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * ratio))];
    return {
      frames: samples.length,
      averageIntervalMs: Number((samples.reduce((sum, value) => sum + value, 0) / samples.length).toFixed(2)),
      p95IntervalMs: Number(percentile(.95).toFixed(2)),
      intervalsOver16_7ms: samples.filter((value) => value > 16.7).length,
      intervalsOver33_4ms: samples.filter((value) => value > 33.4).length,
      note: 'CI rAF timing sample only; not a 60 FPS acceptance measurement.',
    };
  });
  return sample;
}

test('baseline defects are reproduced and the fixed interface passes motion, touch, and browser checks', async ({ page }, testInfo) => {
  const diagnostics = collectDiagnostics(page);
  const viewport = page.viewportSize();
  const browserEvidence = {};

  for (const variant of ['baseline', 'fixed']) {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(`/${variant}/`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('Motion and Touch Laboratory');
    await expect(page.getByRole('heading', { level: 1, name: 'Interfaces that keep pace with intent.' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'A state change should follow the latest command.' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Three offset motion paths' })).toBeVisible();

    const toggle = page.getByRole('button', { name: 'Show delivery details' });
    await toggle.focus();
    await expect(toggle).toBeFocused();
    const focus = await toggle.evaluate((element) => ({
      outlineStyle: getComputedStyle(element).outlineStyle,
      outlineWidth: Number.parseFloat(getComputedStyle(element).outlineWidth),
    }));
    expect(focus.outlineStyle).not.toBe('none');
    expect(focus.outlineWidth).toBeGreaterThan(0);

    await page.getByRole('button', { name: 'Save preference' }).click();
    await expect(page.getByRole('status')).toHaveText('Preference saved locally.');

    const email = page.getByLabel('Send a test signal');
    await email.fill('motion@example.com');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByRole('status')).toHaveText('Test signal accepted locally.');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${variant} horizontal overflow at ${viewport.width}x${viewport.height}`).toBe(0);

    for (const control of await page.locator('button, input, .action').all()) {
      if (!(await control.isVisible())) continue;
      const box = await control.boundingBox();
      expect(box?.height || 0).toBeGreaterThanOrEqual(44);
    }

    const screenshotDirectory = path.resolve('artifacts', 'screenshots');
    fs.mkdirSync(screenshotDirectory, { recursive: true });
    await page.screenshot({ path: path.join(screenshotDirectory, `${testInfo.project.name}-${variant}.png`), fullPage: true });

    const carousel = page.locator('[data-carousel]');
    const box = await carousel.boundingBox();
    await carousel.dispatchEvent('pointerdown', { pointerId: 9, pointerType: 'touch', clientX: box.x + box.width * .8, clientY: box.y + 80, buttons: 1 });
    await carousel.dispatchEvent('pointermove', { pointerId: 9, pointerType: 'touch', clientX: box.x + box.width * .25, clientY: box.y + 82, buttons: 1 });
    await carousel.dispatchEvent('pointerup', { pointerId: 9, pointerType: 'touch', clientX: box.x + box.width * .25, clientY: box.y + 82, buttons: 0 });
    await page.waitForTimeout(280);

    const gesture = await page.locator('[data-carousel]').evaluate((element) => ({
      touchAction: getComputedStyle(element).touchAction,
      scrollLeft: Math.round(element.scrollLeft),
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      trackLeft: getComputedStyle(element.firstElementChild).left,
    }));
    browserEvidence[variant] = {
      overflow,
      inputFontSize: await email.evaluate((element) => getComputedStyle(element).fontSize),
      gesture,
    };
  }

  expect(browserEvidence.baseline.gesture.touchAction).toBe('none');
  expect(browserEvidence.fixed.gesture.touchAction).toBe('pan-y');
  if (browserEvidence.fixed.gesture.scrollWidth > browserEvidence.fixed.gesture.clientWidth) {
    const maximumScroll = browserEvidence.fixed.gesture.scrollWidth - browserEvidence.fixed.gesture.clientWidth;
    expect(browserEvidence.fixed.gesture.scrollLeft).toBeGreaterThan(0);
    expect(browserEvidence.fixed.gesture.scrollLeft).toBeLessThanOrEqual(maximumScroll);
  } else {
    expect(browserEvidence.fixed.gesture.scrollLeft).toBe(0);
  }
  expect(Number.parseFloat(browserEvidence.baseline.inputFontSize)).toBeLessThan(16);
  expect(Number.parseFloat(browserEvidence.fixed.inputFontSize)).toBeGreaterThanOrEqual(16);

  await page.goto('/baseline/', { waitUntil: 'networkidle' });
  const baselineToggle = page.locator('[data-panel-toggle]');
  await baselineToggle.evaluate((element) => element.click());
  await page.waitForTimeout(60);
  await baselineToggle.evaluate((element) => element.click());
  await page.waitForTimeout(700);
  expect(await baselineToggle.getAttribute('aria-expanded')).toBe('true');

  await page.goto('/fixed/', { waitUntil: 'networkidle' });
  const fixedToggle = page.locator('[data-panel-toggle]');
  await fixedToggle.evaluate((element) => element.click());
  await page.waitForTimeout(60);
  await fixedToggle.evaluate((element) => element.click());
  await page.waitForTimeout(260);
  expect(await fixedToggle.getAttribute('aria-expanded')).toBe('false');
  await fixedToggle.click();
  await expect(fixedToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#delivery-details')).toHaveAttribute('aria-hidden', 'false');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/baseline/', { waitUntil: 'networkidle' });
  const baselineReducedDuration = await transitionMilliseconds(page.locator('#delivery-details'));
  await page.goto('/fixed/', { waitUntil: 'networkidle' });
  const fixedReducedDuration = await transitionMilliseconds(page.locator('#delivery-details'));
  expect(baselineReducedDuration).toBeGreaterThanOrEqual(600);
  expect(fixedReducedDuration).toBeLessThanOrEqual(1);
  await page.getByRole('button', { name: 'Show delivery details' }).click();
  await expect(page.getByRole('button', { name: 'Hide delivery details' })).toHaveAttribute('aria-expanded', 'true');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const performance = {
    baseline: await sampleFrames(page, 'baseline'),
    fixed: await sampleFrames(page, 'fixed'),
  };
  expect(performance.baseline.frames).toBeGreaterThan(10);
  expect(performance.fixed.frames).toBeGreaterThan(10);

  fs.mkdirSync(path.resolve('artifacts', 'performance'), { recursive: true });
  fs.writeFileSync(path.resolve('artifacts', 'performance', `${testInfo.project.name}.json`), `${JSON.stringify(performance, null, 2)}\n`);
  console.log(`MOTION_PERFORMANCE_SAMPLE ${testInfo.project.name} ${JSON.stringify(performance)}`);

  await testInfo.attach('motion-mobile-browser-evidence', {
    body: Buffer.from(JSON.stringify({ viewport, browserEvidence, baselineReducedDuration, fixedReducedDuration, performance, diagnostics }, null, 2)),
    contentType: 'application/json',
  });

  expect(diagnostics.javascriptErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedRequests).toEqual([]);
  expect(diagnostics.badResponses).toEqual([]);
});
