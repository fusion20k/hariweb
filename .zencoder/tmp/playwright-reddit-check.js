const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://haritagalog.com';
const SCREENSHOT_PATH = 'C:\\Users\\david\\Desktop\\HariWeb\\.zencoder\\tmp\\reddit-pixel-check.png';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Intercept network requests
  page.on('request', request => {
    const url = request.url();
    if (url.includes('reddit') || url.includes('redditstatic')) {
      console.log(`[Request] ${url}`);
    }
  });

  page.on('response', response => {
    const url = response.url();
    if (url.includes('reddit') || url.includes('redditstatic')) {
      console.log(`[Response] ${url} | Status: ${response.status()}`);
    }
  });

  // 2. Log console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[Console Error] ${msg.text()}`);
    }
  });

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // 3. Check window.rdt
    const rdtInfo = await page.evaluate(() => {
      return {
        exists: typeof window.rdt !== 'undefined',
        type: typeof window.rdt
      };
    });
    console.log(`[rdt check] window.rdt exists: ${rdtInfo.exists}, type: ${rdtInfo.type}`);

    // 4. Check for <script> tags with src containing "redditstatic"
    const scripts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('script[src*="redditstatic"]')).map(s => s.src);
    });
    scripts.forEach(src => console.log(`[Script Src] ${src}`));

    // 5. Log inline <script> tags containing "rdt"
    const inlineScripts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('script:not([src])'))
        .filter(s => s.textContent.includes('rdt'))
        .map(s => s.textContent);
    });
    inlineScripts.forEach(content => console.log(`[Inline Script] ${content}`));

    // 6. Take screenshot
    await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
    console.log(`[Screenshot] Saved to ${SCREENSHOT_PATH}`);

  } catch (error) {
    console.error(`[Error] ${error.message}`);
  } finally {
    await browser.close();
  }
})();
