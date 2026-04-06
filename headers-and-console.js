const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleWarnings = [];
  page.on('console', msg => {
    if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  try {
    const response = await page.goto('https://haritagalog.com', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    if (response) {
      console.log('--- RESPONSE HEADERS ---');
      console.log(JSON.stringify(response.headers(), null, 2));
    } else {
      console.log('No response received.');
    }

    console.log('\n--- CONSOLE WARNINGS ---');
    console.log(JSON.stringify(consoleWarnings, null, 2));
  } catch (error) {
    console.error('Error during execution:', error.message);
  } finally {
    await browser.close();
  }
})();
