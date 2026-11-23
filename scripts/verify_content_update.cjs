const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = path.resolve('C:/Users/ADMIN/.gemini/antigravity/brain/6b49e59a-2418-4bf4-94d2-2827bcd728b6');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('🚀 Starting Content Update Visual & Text Verification...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--window-size=1440,900',
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(1500);

  // Extract entire visible and DOM text
  const pageText = await page.evaluate(() => document.body.innerText);

  // Test 1: Journey began with Python
  const hasJourneySentence = pageText.includes('My programming journey began with Python');
  console.log('Test 1 (My programming journey began with Python):', hasJourneySentence ? 'PASSED' : 'FAILED');

  // Test 2: No memory concepts anywhere
  const hasMemory = /memory/i.test(pageText);
  console.log('Test 2 (Zero memory concepts in rendered text):', !hasMemory ? 'PASSED' : 'FAILED: Found memory in text');

  // Test 3: No algorithmic thinking anywhere
  const hasAlgorithm = /algorithm/i.test(pageText);
  console.log('Test 3 (Zero algorithm / algorithmic in rendered text):', !hasAlgorithm ? 'PASSED' : 'FAILED: Found algorithm in text');

  // Test 4: No started/began with C
  const hasStartedC = /(started|began).*(with|in)\s+C\b/i.test(pageText);
  console.log('Test 4 (Zero started/began with C):', !hasStartedC ? 'PASSED' : 'FAILED: Found started with C in text');

  // Capture Desktop Screenshots
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant' }));
  await sleep(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'updated_content_01_about.png') });
  console.log('📸 Captured updated_content_01_about.png');

  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'instant' }));
  await sleep(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'updated_content_02_skills.png') });
  console.log('📸 Captured updated_content_02_skills.png');

  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'instant' }));
  await sleep(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'updated_content_03_journey.png') });
  console.log('📸 Captured updated_content_03_journey.png');

  await page.evaluate(() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'instant' }));
  await sleep(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'updated_content_04_roadmap.png') });
  console.log('📸 Captured updated_content_04_roadmap.png');

  // Check Mobile Viewport (390 x 844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant' }));
  await sleep(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'updated_content_05_mobile_about.png') });
  console.log('📸 Captured updated_content_05_mobile_about.png');

  console.log('Console Errors:', errors.length === 0 ? '0 errors (PASSED)' : errors);

  await browser.close();

  if (!hasJourneySentence || hasMemory || hasAlgorithm || hasStartedC || errors.length > 0) {
    console.error('❌ Verification failed on some assertions.');
    process.exit(1);
  } else {
    console.log('✅ ALL VERIFICATIONS PASSED PERFECTLY!');
  }
}

run().catch(err => {
  console.error('Script error:', err);
  process.exit(1);
});
