const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file:///C:/Users/david/Desktop/HariWeb/index.html');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/david/Desktop/HariWeb/screenshot-desktop.png', fullPage: true });

  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/david/Desktop/HariWeb/screenshot-mobile.png', fullPage: true });

  console.log('Screenshots saved');
  await browser.close();
})();
