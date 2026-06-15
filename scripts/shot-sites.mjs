import { chromium } from "playwright";

const sites = [
  { name: "crown", url: "https://crownsigns.ca/" },
  { name: "magnetica", url: "https://shopmagnetica.com/" },
];

const outDir = "c:/Users/juand/OneDrive/LANDING PAGES AGENT/clients/shift-u-premium/public/img/work";
const browser = await chromium.launch();

for (const s of sites) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  const p = await ctx.newPage();
  try {
    await p.goto(s.url, { waitUntil: "load", timeout: 45000 });
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${outDir}/${s.name}.png`, fullPage: false });
    console.log(`✓ ${s.name} ${s.url}`);
  } catch (e) {
    console.log(`✗ ${s.name}: ${e.message}`);
  }
  await ctx.close();
}
await browser.close();
console.log("done");
