import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
// scroll fully to trigger reveals
await p.evaluate(() => new Promise((res) => {
  let y = 0; const step = () => { window.scrollTo(0, y); y += 350;
    if (y < document.body.scrollHeight) setTimeout(step, 90); else setTimeout(res, 400); }; step();
}));
const targets = ["The Conversion System", "Train your team to run it", "The results speak first", "Four steps, no guesswork", "Clear pricing, no surprises"];
let i = 0;
for (const t of targets) {
  const el = p.getByText(t, { exact: false }).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  await p.screenshot({ path: `C:/tmp/shiftu-crop-${i}.png` });
  console.log(`crop ${i}: ${t}`);
  i++;
}
await browser.close();
console.log("done");
