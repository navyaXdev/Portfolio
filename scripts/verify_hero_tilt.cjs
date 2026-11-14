const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const artifactDir = path.resolve('C:/Users/ADMIN/.gemini/antigravity/brain/6b49e59a-2418-4bf4-94d2-2827bcd728b6');
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  console.log('Launching Chrome from:', chromePath);

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
    ],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  await page.setViewport({ width: 1440, height: 900 });
  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for preloader to complete
  await new Promise((r) => setTimeout(r, 1200));

  // Find the desktop portrait card
  const cardHandle = await page.$('.hidden.lg\\:flex img[alt*="Dinesh Patra"]');
  if (!cardHandle) {
    throw new Error('Desktop portrait card not found!');
  }

  // Get bounding box of the portrait container
  const box = await page.evaluate(() => {
    const card = document.querySelector('#hero-portrait-card');
    if (!card) return null;
    const r = card.getBoundingClientRect();
    return { x: r.left, y: r.top, width: r.width, height: r.height };
  });

  console.log('Portrait card bounding box:', box);

  // Helper to read transform
  const getTransform = async () => {
    return await page.evaluate(() => {
      const el = document.querySelector('#hero-portrait-card');
      return el ? window.getComputedStyle(el).transform : 'none';
    });
  };

  const transformNeutral = await getTransform();
  console.log('Transform (neutral):', transformNeutral);

  // 2. Hover Top-Right Quadrant
  const trX = box.x + box.width * 0.85;
  const trY = box.y + box.height * 0.15;
  console.log(`Moving mouse to Top-Right (${trX}, ${trY})...`);
  await page.mouse.move(trX, trY, { steps: 15 });
  await new Promise((r) => setTimeout(r, 400));
  const transformTR = await getTransform();
  console.log('Transform (Top-Right):', transformTR);
  await page.screenshot({ path: path.join(artifactDir, 'tilt_02_top_right.png') });
  console.log('Saved tilt_02_top_right.png');

  // 3. Hover Bottom-Left Quadrant
  const blX = box.x + box.width * 0.15;
  const blY = box.y + box.height * 0.85;
  console.log(`Moving mouse to Bottom-Left (${blX}, ${blY})...`);
  await page.mouse.move(blX, blY, { steps: 15 });
  await new Promise((r) => setTimeout(r, 400));
  const transformBL = await getTransform();
  console.log('Transform (Bottom-Left):', transformBL);
  await page.screenshot({ path: path.join(artifactDir, 'tilt_03_bottom_left.png') });
  console.log('Saved tilt_03_bottom_left.png');

  // 4. Mouse Leaves Card (Smoothly returns to equilibrium)
  console.log('Moving mouse outside card (100, 100)...');
  await page.mouse.move(100, 100, { steps: 15 });
  await new Promise((r) => setTimeout(r, 600));
  const transformReturned = await getTransform();
  console.log('Transform (returned):', transformReturned);
  await page.screenshot({ path: path.join(artifactDir, 'tilt_04_returned_equilibrium.png') });
  console.log('Saved tilt_04_returned_equilibrium.png');

  console.log('\n--- Console Errors Encountered ---');
  if (consoleErrors.length === 0) {
    console.log('None! Zero console errors.');
  } else {
    consoleErrors.forEach((e) => console.error('Console Error:', e));
  }

  await browser.close();
  console.log('\nTilt verification complete.');
}

run().catch((err) => {
  console.error('Tilt verification failed:', err);
  process.exit(1);
});
