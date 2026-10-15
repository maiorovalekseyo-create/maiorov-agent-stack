const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');

const watchedResourceTypes = new Set(['document', 'stylesheet', 'script', 'image', 'font', 'xhr', 'fetch']);

test('fixed interface works without browser, resource, responsive, or basic accessibility failures', async ({ page }, testInfo) => {
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

  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle('Interface Quality Lab');
  await expect(page.getByRole('heading', { level: 1, name: 'Interface quality lab' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Verification state' })).toBeVisible();

  const image = page.getByRole('img', { name: 'Abstract rust and navy geometric composition' });
  await expect(image).toBeVisible();
  expect(await image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);

  const toggle = page.getByRole('button', { name: 'Show verification details' });
  await toggle.focus();
  await expect(toggle).toBeFocused();
  const focusStyle = await toggle.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(parseFloat(focusStyle.outlineWidth)).toBeGreaterThan(0);
  await toggle.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('The interaction updates state')).toBeVisible();

  const input = page.getByLabel('Test item');
  await input.fill(`Verified ${testInfo.project.name}`);
  await page.getByRole('button', { name: 'Add item' }).click();
  await expect(page.getByRole('listitem')).toHaveText(`Verified ${testInfo.project.name}`);

  const viewport = page.viewportSize();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, `horizontal overflow at ${viewport.width}x${viewport.height}`).toBe(0);

  for (const control of await page.locator('button, input').all()) {
    const box = await control.boundingBox();
    expect(box?.height || 0).toBeGreaterThanOrEqual(44);
  }

  const screenshotPath = testInfo.outputPath('screenshots', 'verified-interface.png');
  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: true });

  await testInfo.attach('runtime-resource-and-layout-diagnostics', {
    body: Buffer.from(JSON.stringify({ ...diagnostics, overflow, viewport }, null, 2)),
    contentType: 'application/json',
  });

  expect(diagnostics.javascriptErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedRequests).toEqual([]);
  expect(diagnostics.badResponses).toEqual([]);
});
