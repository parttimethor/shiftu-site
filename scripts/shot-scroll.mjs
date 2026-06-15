import { chromium } from "playwright";

const base = process.env.SHOT_URL || "http://localhost:4455";
const route = process.env.SHOT_ROUTE || "/";
const dark = !!process.env.SHOT_DARK;
const steps = Number(process.env.SHOT_STEPS || 7);
const browser = await chromium.launch();

async function run(width, height, isMobile, tag) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile });
  await ctx.addInitScript((d) => {
    try {
      sessionStorage.setItem("introSeen", "1");
      if (d) localStorage.setItem("theme", "dark");
    } catch (e) {}
  }, dark);
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  p.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  await p.goto(base + route, { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(800);
  const h = await p.evaluate(() => document.body.scrollHeight);
  const sfx = dark ? "dark" : "light";
  for (let i = 0; i < steps; i++) {
    const y = Math.round((i / (steps - 1)) * Math.max(0, h - height));
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(650);
    await p.screenshot({ path: `C:/tmp/beat-${sfx}-${tag}-${i}.png`, fullPage: false });
  }
  await ctx.close();
  return errs;
}

const d = await run(1440, 900, false, "desktop");
const m = await run(390, 844, true, "mobile");
const all = [...new Set([...d, ...m])];
console.log(`captured ${steps} steps each (desktop+mobile). console errors: ${all.length}`);
all.forEach((e) => console.log("  ! " + e));
await browser.close();
console.log("done");
