const { chromium } = require("playwright");

const url = "https://6ac39884-5a61-40fc-993f-a06e480f235d-00-1zzkz5xjyx8m.sisko.replit.dev/__mockup/preview/hero-animation/HeroAnimation";

(async () => {
  const width = 1920;
  const height = 1080;

  const browser = await chromium.launch({
    headless: true,
    args: [
      `--window-size=${width},${height}`,
      "--hide-scrollbars"
    ]
  });

  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: "videos",
      size: { width, height }
    }
  });

  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  // Optional: remove margins/scrollbars if the page has them
  await page.addStyleTag({
    content: `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        width: 100%;
        height: 100%;
      }
    `
  });

  // Record duration
  await page.waitForTimeout(10000);

  await context.close();
  await browser.close();
})();