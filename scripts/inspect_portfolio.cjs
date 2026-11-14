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

  // Helper to scroll section into view with navbar offset
  const scrollToSection = async (id) => {
    await page.evaluate((secId) => {
      const el = document.getElementById(secId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    }, id);
    await new Promise((r) => setTimeout(r, 1200));
  };

  // 1. Desktop Viewport (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Section 1: Hero (Desktop Dark)
  const heroPath = path.join(artifactDir, '01_hero_desktop.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved 01_hero_desktop.png');

  // Motion Verification: Hero after 1.5 seconds to verify autonomous 3D floating animation
  await new Promise((r) => setTimeout(r, 1500));
  const heroMotionPath = path.join(artifactDir, '01b_hero_motion_t1500.png');
  await page.screenshot({ path: heroMotionPath });
  console.log('Saved 01b_hero_motion_t1500.png');

  // Section 2: About (Architectural 3D forms)
  await scrollToSection('about');
  const aboutPath = path.join(artifactDir, '02_about_desktop.png');
  await page.screenshot({ path: aboutPath });
  console.log('Saved 02_about_desktop.png');

  // Section 3: Skills (Technical Symbols & Delicate Structures)
  await scrollToSection('skills');
  const skillsPath = path.join(artifactDir, '03_skills_desktop.png');
  await page.screenshot({ path: skillsPath });
  console.log('Saved 03_skills_desktop.png');

  // Section 4: GitHub (Live Telemetry & Floating Code Symbols)
  await scrollToSection('github');
  const githubPath = path.join(artifactDir, '04_github_desktop.png');
  await page.screenshot({ path: githubPath });
  console.log('Saved 04_github_desktop.png');

  // Section 5: Journey / Experience (Coaxial Timeline)
  await scrollToSection('experience');
  const journeyPath = path.join(artifactDir, '05_journey_desktop.png');
  await page.screenshot({ path: journeyPath });
  console.log('Saved 05_journey_desktop.png');

  // Section 6: Achievements (Dimensional Recognition Gallery)
  await scrollToSection('achievements');
  const achievementsPath = path.join(artifactDir, '06_achievements_desktop.png');
  await page.screenshot({ path: achievementsPath });
  console.log('Saved 06_achievements_desktop.png');

  // Section 7: Roadmap (Progress Chevrons & Milestones)
  await scrollToSection('roadmap');
  const roadmapPath = path.join(artifactDir, '07_roadmap_desktop.png');
  await page.screenshot({ path: roadmapPath });
  console.log('Saved 07_roadmap_desktop.png');

  // Section 8: Contact Section
  await scrollToSection('contact');
  const contactPath = path.join(artifactDir, '08_contact_desktop.png');
  await page.screenshot({ path: contactPath });
  console.log('Saved 08_contact_desktop.png');

  // Section 9: Light Luxury Theme Toggle
  const themeToggle = await page.$('button[aria-label*="theme" i], button[aria-label*="mode" i], button[aria-label*="Light" i], button[aria-label*="Dark" i]');
  if (themeToggle) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));
    await themeToggle.click();
    await new Promise((r) => setTimeout(r, 800));
    const lightPath = path.join(artifactDir, '09_light_theme_desktop.png');
    await page.screenshot({ path: lightPath });
    console.log('Saved 09_light_theme_desktop.png');

    // Switch back to Dark
    await themeToggle.click();
    await new Promise((r) => setTimeout(r, 500));
  }

  // Section 10: Mobile Hero (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));
  const mobilePath = path.join(artifactDir, '10_mobile_hero.png');
  await page.screenshot({ path: mobilePath });
  console.log('Saved 10_mobile_hero.png');

  console.log('\n--- Console Errors Encountered ---');
  if (consoleErrors.length === 0) {
    console.log('None! Zero console errors.');
  } else {
    consoleErrors.forEach((e) => console.log('ERROR:', e));
  }

  await browser.close();
  console.log('\nAudit complete.');
}

run().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
