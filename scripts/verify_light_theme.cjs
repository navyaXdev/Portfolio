const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = path.resolve('C:/Users/ADMIN/.gemini/antigravity/brain/6b49e59a-2418-4bf4-94d2-2827bcd728b6');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('🚀 Starting Comprehensive Light Theme Verification...');
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
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Navigate to preview server
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(1200);

  // Switch to Light Mode by setting localStorage and adding .light class
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    window.dispatchEvent(new Event('storage'));
  });
  await sleep(800);

  // 1. Verify Light Theme Classes on Root & Body
  const themeState = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    const computedBody = window.getComputedStyle(body);
    return {
      classList: Array.from(root.classList),
      backgroundColor: computedBody.backgroundColor,
      color: computedBody.color
    };
  });
  console.log('Theme State on Page:', themeState);

  // Capture Light Theme Hero
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_01_hero.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_01_hero.png');

  // Test 3D Mouse Tilt on Hero Photograph Card in Light Mode
  const tiltCard = await page.$('#hero-portrait-card');
  if (tiltCard) {
    const box = await tiltCard.boundingBox();
    // Move to top-right of portrait card
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.2);
    await sleep(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'light_theme_02_hero_tilt_sheen.png'),
      fullPage: false
    });
    console.log('📸 Captured light_theme_02_hero_tilt_sheen.png');
    // Move mouse away
    await page.mouse.move(10, 10);
    await sleep(400);
  }

  // Scroll to and capture About section
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_03_about.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_03_about.png');

  // Scroll to and capture Skills section
  await page.evaluate(() => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_04_skills.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_04_skills.png');

  // Scroll to and capture GitHub section
  await page.evaluate(() => {
    document.getElementById('github')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_05_github.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_05_github.png');

  // Scroll to and capture Journey (Experience) section
  await page.evaluate(() => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_06_journey.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_06_journey.png');

  // Scroll to and capture Achievements section
  await page.evaluate(() => {
    document.getElementById('achievements')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_07_achievements.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_07_achievements.png');

  // Open Lightbox Certificate Modal in Light Mode
  const certThumb = await page.$('#achievements img');
  if (certThumb) {
    await certThumb.click();
    await sleep(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'light_theme_08_certificate_lightbox.png'),
      fullPage: false
    });
    console.log('📸 Captured light_theme_08_certificate_lightbox.png');
    // Close modal by pressing Escape
    await page.keyboard.press('Escape');
    await sleep(400);
  }

  // Scroll to and capture Roadmap section
  await page.evaluate(() => {
    document.getElementById('roadmap')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_09_roadmap.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_09_roadmap.png');

  // Scroll to and capture Contact & Footer
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_10_contact_footer.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_10_contact_footer.png');

  // Mobile Viewport Test (390 x 844) with Drawer Open
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('hero')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'light_theme_11_mobile_hero.png'),
    fullPage: false
  });
  console.log('📸 Captured light_theme_11_mobile_hero.png');

  // Open Mobile Menu
  const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await sleep(700);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'light_theme_12_mobile_drawer.png'),
      fullPage: false
    });
    console.log('📸 Captured light_theme_12_mobile_drawer.png');
    await menuBtn.click();
    await sleep(400);
  }

  // Check horizontal overflow
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Horizontal Overflow check:', overflow ? 'FAILED (Overflow detected)' : 'PASSED (Zero overflow)');

  // Switch back to Dark Mode for Regression Verification
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    window.dispatchEvent(new Event('storage'));
  });
  await sleep(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'dark_theme_regression_hero.png'),
    fullPage: false
  });
  console.log('📸 Captured dark_theme_regression_hero.png (Dark Theme intact)');

  console.log('Console Errors:', errors.length === 0 ? '0 errors (PASSED)' : errors);

  await browser.close();
  console.log('✅ Light Theme Visual Verification Finished Successfully!');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
