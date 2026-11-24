/* Forge browser persistence smoke test, no real API requests or credits. */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const pageURL = 'http://127.0.0.1:8877/asset-studio/';
const browser = await chromium.launch({headless:true, channel:'chrome'});
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', err => errors.push(err.stack || String(err)));

try {
  await page.goto(pageURL, {waitUntil:'load'});
  assert.match(await page.locator('.footer-note').textContent(), /v5.0/);

  // Drafts should not be reset to Boulder defaults on reload.
  await page.locator('#prompt').fill('Save this hill climb terrain boulder prompt across tabs.');
  await page.locator('#asset-name').fill('Offroad Boulder One');
  await page.reload();
  assert.equal(await page.locator('#asset-name').inputValue(), 'Offroad Boulder One');
  assert.match(await page.locator('#prompt').inputValue(), /Save this hill climb/);

  // Different game projects retain independent prompts and settings.
  await page.locator('#project').selectOption('pearl-and-powder');
  await page.locator('#asset-name').fill('Ice Pearl Test');
  await page.locator('#project').selectOption('motorcycle-hill-climb-racing');
  assert.equal(await page.locator('#asset-name').inputValue(), 'Offroad Boulder One');
  await page.locator('#project').selectOption('pearl-and-powder');
  assert.equal(await page.locator('#asset-name').inputValue(), 'Ice Pearl Test');
  await page.locator('#project').selectOption('motorcycle-hill-climb-racing');

  // Personal reference photos survive a page reload via IndexedDB blobs.
  await page.locator('#reference-files').setInputFiles({
    name:'test.png', mimeType:'image/png',
    buffer:readFileSync('/tmp/forge-reference.png')
  });
  await page.waitForFunction(() => document.querySelector('#ref-counter')?.textContent?.includes('1 / 2'));
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#ref-counter')?.textContent?.includes('1 / 2'));

  // Approved draft, its PNG, cost and notes survive a closed-tab-like reload.
  await page.locator('[data-tab="review"]').click();
  await page.locator('#zip-file').setInputFiles('/tmp/forge-review-test.zip');
  await page.waitForFunction(() => document.querySelector('#review-status')?.textContent?.includes('forge-persistence-test'));
  await page.locator('.asset-card').getByRole('button', {name:/Approve/}).click();
  await page.locator('.asset-card textarea').fill('Approved rock for the level builder.');
  assert.equal(await page.locator('.asset-card.approved').count(), 1);
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#review-status')?.textContent?.includes('saved asset'));
  assert.equal(await page.locator('.asset-card.approved').count(), 1);
  assert.equal(await page.locator('.asset-card textarea').inputValue(), 'Approved rock for the level builder.');
  assert.match(await page.locator('#api-cost-report').textContent(), /0.1325/);
  assert.equal(await page.locator('#restore-last-review').isDisabled(), false);

  // Mock GitHub authentication; never transmit/store a real API credential.
  await page.route('https://api.github.com/repos/**', async route => {
    const hdrs = {
      'access-control-allow-origin':'*',
      'access-control-allow-methods':'GET,POST,OPTIONS',
      'access-control-allow-headers':'authorization,accept,x-github-api-version,content-type'
    };
    if(route.request().method() === 'OPTIONS'){
      await route.fulfill({status:204, headers:hdrs}); return;
    }
    await route.fulfill({status:200, headers:hdrs, contentType:'application/json',
      body:JSON.stringify({full_name:'brockyourworld420/Motorcycle-hill-climb-racing'})});
  });
  await page.locator('[data-tab="connect"]').click();
  await page.locator('#remember-connection').check();
  await page.locator('#token').fill('github_pat_offline_mock_not_real');
  await page.locator('#connect').click();
  await page.waitForFunction(() => document.querySelector('#connection-pill')?.textContent?.includes('CONNECTED'));
  await page.waitForFunction(() => document.querySelector('#browser-save-status')?.textContent?.includes('Encrypted connection'));
  const leaked = await page.evaluate(() =>
    Object.entries(localStorage).some(([key,value]) => String(value).includes('github_pat_offline_mock_not_real'))
  );
  assert.equal(leaked,false, 'Raw PAT must never be in localStorage');

  // The encrypted credential auto-reconnects on the next browser visit.
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#connection-status')?.textContent?.includes('Automatically reconnected'));
  assert.equal(await page.locator('#remember-connection').isChecked(), true);
  await page.locator('#disconnect').click();
  await page.reload();
  await page.waitForTimeout(350);
  assert.equal((await page.locator('#connection-pill').textContent()).trim(), 'OFFLINE');
  assert.equal(await page.locator('#remember-connection').isChecked(), false);

  assert.equal(errors.length,0,errors.join('\n'));
  console.log('PASS Forge browser workspace: prompts, projects, photos, images, approvals, notes, costs and encrypted GitHub reconnect.');
} finally {
  await browser.close();
}
