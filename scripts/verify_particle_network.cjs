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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader'],
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

  // Helper to scroll section into view
  const scrollToSection = async (id) => {
    await page.evaluate((secId) => {
      const el = document.getElementById(secId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    }, id);
    await new Promise((r) => setTimeout(r, 1000));
  };

  // 1. Desktop Viewport (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // Baseline Hero (0.6s)
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'seq_01_normal_network.png') });
  console.log('Saved seq_01_normal_network.png');

  // Milestone 2: Threat Detection & Solid Red Warning Node (at ~3.2s)
  await new Promise((r) => setTimeout(r, 2600));
  await page.screenshot({ path: path.join(artifactDir, 'seq_02_threat_red_warning.png') });
  await page.screenshot({ path: path.join(artifactDir, '01_particle_network_hero.png') });
  console.log('Saved seq_02_threat_red_warning.png & 01_particle_network_hero.png');

  // Milestone 3: Protection Scan (at ~6.2s)
  await new Promise((r) => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(artifactDir, 'seq_03_protection_scan.png') });
  console.log('Saved seq_03_protection_scan.png');

  // Milestone 4: Smooth Red-to-Green Transition (at ~8.2s)
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(artifactDir, 'seq_04_red_to_green_transition.png') });
  console.log('Saved seq_04_red_to_green_transition.png');

  // Milestone 5: Network Recovery & Green Wave Pulse (at ~10.4s)
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: path.join(artifactDir, 'seq_05_network_recovery_pulse.png') });
  console.log('Saved seq_05_network_recovery_pulse.png');

  // Section 2: About
  await scrollToSection('about');
  await page.screenshot({ path: path.join(artifactDir, '02_particle_network_about.png') });
  console.log('Saved 02_particle_network_about.png');

  // Section 3: Skills
  await scrollToSection('skills');
  await page.screenshot({ path: path.join(artifactDir, '03_particle_network_skills.png') });
  console.log('Saved 03_particle_network_skills.png');

  // Section 4: GitHub
  await scrollToSection('github');
  await page.screenshot({ path: path.join(artifactDir, '04_particle_network_github.png') });
  console.log('Saved 04_particle_network_github.png');

  // Section 5: Achievements
  await scrollToSection('achievements');
  await page.screenshot({ path: path.join(artifactDir, '05_particle_network_achievements.png') });
  console.log('Saved 05_particle_network_achievements.png');

  // Section 6: Contact
  await scrollToSection('contact');
  await page.screenshot({ path: path.join(artifactDir, '06_particle_network_contact.png') });
  console.log('Saved 06_particle_network_contact.png');

  // Section 9: Light Luxury Theme
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const btn = document.querySelector('button[aria-label*="theme" i], button[aria-label*="light" i], button[aria-label*="dark" i]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, '09_particle_network_light.png') });
  console.log('Saved 09_particle_network_light.png');

  // Section 10: Mobile Responsive (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    // Switch back to dark theme
    const btn = document.querySelector('button[aria-label*="theme" i], button[aria-label*="light" i], button[aria-label*="dark" i]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, '10_particle_network_mobile.png') });
  console.log('Saved 10_particle_network_mobile.png');

  console.log('\n--- Console Errors Encountered ---');
  if (consoleErrors.length === 0) {
    console.log('None! Zero console errors.');
  } else {
    consoleErrors.forEach((e) => console.error('Console Error:', e));
  }

  await browser.close();
  console.log('\nAudit complete.');
}

run().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
