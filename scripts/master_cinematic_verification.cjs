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
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // Helper to scroll section into view smoothly
  const scrollToSection = async (id) => {
    await page.evaluate((secId) => {
      const el = document.getElementById(secId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    }, id);
    await new Promise((r) => setTimeout(r, 700));
  };

  console.log('1. Testing Desktop Dark Luxury Theme (1440x900)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for preloader to complete and hero to render
  await new Promise((r) => setTimeout(r, 1200));

  // Section 1: Hero Desktop
  await page.screenshot({ path: path.join(artifactDir, '01_hero_cinematic_desktop.png') });
  console.log('Saved 01_hero_cinematic_desktop.png');

  // Capture Threat Event (solid red warning node at ~3.2s)
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: path.join(artifactDir, '01_hero_threat_detection.png') });
  console.log('Saved 01_hero_threat_detection.png');

  // Section 2: About Desktop
  await scrollToSection('about');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, '02_about_editorial_desktop.png') });
  console.log('Saved 02_about_editorial_desktop.png');

  // Section 3: Skills Desktop
  await scrollToSection('skills');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, '03_skills_luxury_desktop.png') });
  console.log('Saved 03_skills_luxury_desktop.png');

  // Test Skills Category Filter: Switch to "Programming"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#skills button'));
    const progBtn = btns.find((b) => b.textContent && b.textContent.includes('Programming'));
    if (progBtn) progBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artifactDir, '03_skills_filter_programming.png') });
  console.log('Saved 03_skills_filter_programming.png');

  // Reset skills filter to "All"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#skills button'));
    const allBtn = btns.find((b) => b.textContent && b.textContent.trim() === 'All');
    if (allBtn) allBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Section 4: GitHub Ecosystem Desktop
  await scrollToSection('github');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, '04_github_telemetry_desktop.png') });
  console.log('Saved 04_github_telemetry_desktop.png');

  // Test GitHub Search Interaction
  await page.type('#github input[type="text"]', 'safora', { delay: 50 });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, '04_github_search_interaction.png') });
  console.log('Saved 04_github_search_interaction.png');

  // Clear GitHub Search
  await page.evaluate(() => {
    const input = document.querySelector('#github input[type="text"]');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 400));

  // Section 5: Achievements & Hackathons Desktop
  await scrollToSection('achievements');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, '05_achievements_credentials_desktop.png') });
  console.log('Saved 05_achievements_credentials_desktop.png');

  // Test Certificate Modal Lightbox Preview
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('#achievements button')).find(
      (b) => b.textContent && b.textContent.includes('View Full Certificate')
    );
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, '05_certificate_lightbox_modal.png') });
  console.log('Saved 05_certificate_lightbox_modal.png');

  // Close modal via Escape
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // Section 6: Contact Finale Desktop
  await scrollToSection('contact');
  await new Promise((r) => setTimeout(r, 600));

  // Test Email Copy Button
  await page.evaluate(() => {
    const copyBtn = Array.from(document.querySelectorAll('#contact button')).find(
      (b) => b.textContent && b.textContent.includes('Copy Address')
    );
    if (copyBtn) copyBtn.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(artifactDir, '08_contact_finale_desktop.png') });
  console.log('Saved 08_contact_finale_desktop.png');

  // 2. Light Luxury Theme (1440x900)
  console.log('2. Testing Light Luxury Theme...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const themeBtn = document.querySelector('button[aria-label*="theme" i], button[aria-label*="light" i], button[aria-label*="dark" i]');
    if (themeBtn) themeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(artifactDir, '09_light_theme_hero_desktop.png') });
  console.log('Saved 09_light_theme_hero_desktop.png');

  await scrollToSection('skills');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, '09_light_theme_skills_desktop.png') });
  console.log('Saved 09_light_theme_skills_desktop.png');

  await scrollToSection('github');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, '09_light_theme_github_desktop.png') });
  console.log('Saved 09_light_theme_github_desktop.png');

  // Switch back to Dark Theme
  await page.evaluate(() => {
    const themeBtn = document.querySelector('button[aria-label*="theme" i], button[aria-label*="light" i], button[aria-label*="dark" i]');
    if (themeBtn) themeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // 3. Tablet Viewport (768x1024)
  console.log('3. Testing Tablet Viewport (768x1024)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, '10_tablet_hero.png') });
  console.log('Saved 10_tablet_hero.png');

  // 4. Mobile Viewport (390x844 - iPhone / Modern Mobile)
  console.log('4. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, '11_mobile_hero_portrait.png') });
  console.log('Saved 11_mobile_hero_portrait.png');

  // Test Mobile Navigation Drawer
  await page.evaluate(() => {
    const menuBtn = document.querySelector('button[aria-label*="navigation" i], button[aria-label*="menu" i]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, '12_mobile_navigation_drawer.png') });
  console.log('Saved 12_mobile_navigation_drawer.png');

  // Close Mobile Menu
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label*="navigation" i], button[aria-label*="menu" i]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Check for horizontal overflow on mobile
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Mobile Horizontal Overflow Check:', hasHorizontalScroll ? 'FAILED (overflow detected)' : 'PASSED (0 overflow)');

  // 5. Animation Frames Recording Sequence (Fluidity & Particle Network Verification)
  console.log('5. Capturing Animation Sequence Frames...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 600));

  for (let f = 1; f <= 5; f++) {
    await new Promise((r) => setTimeout(r, 350));
    await page.screenshot({ path: path.join(artifactDir, `anim_frame_0${f}.png`) });
  }
  console.log('Captured 5 animation sequence frames (anim_frame_01.png to anim_frame_05.png).');

  console.log('\n--- Console Errors Encountered ---');
  if (consoleErrors.length === 0) {
    console.log('None! Zero console errors.');
  } else {
    consoleErrors.forEach((e) => console.error('Console Error:', e));
  }

  await browser.close();
  console.log('\nMaster Cinematic Verification Complete.');
}

run().catch((err) => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
