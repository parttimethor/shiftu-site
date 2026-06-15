import { chromium } from "playwright";

const base = process.env.SHOT_URL || "http://localhost:3000";
const routes = process.argv.slice(2);
const envRoutes = process.env.SHOT_ROUTES ? process.env.SHOT_ROUTES.split(",") : [];
const targets = routes.length ? routes : envRoutes.length ? envRoutes : ["/"];

const browser = await chromium.launch();

async function triggerReveals(p) {
  await p.evaluate(
    () =>
      new Promise((res) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += 400;
          if (y < document.body.scrollHeight) setTimeout(step, 110);
          else {
            window.scrollTo(0, 0);
            setTimeout(res, 500);
          }
        };
        step();
      }),
  );
}

async function shot(route, width, height, file, isMobile = false) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    isMobile,
  });
  await ctx.addInitScript((dark) => {
    try {
      sessionStorage.setItem("introSeen", "1");
      if (dark) localStorage.setItem("theme", "dark");
    } catch (e) {}
  }, !!process.env.SHOT_DARK);
  const p = await ctx.newPage();
  const errors = [];
  p.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  p.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  await p.goto(base + route, { waitUntil: "load", timeout: 60000 });
  await triggerReveals(p);
  await p.waitForTimeout(700);
  await p.screenshot({ path: file, fullPage: true });
  await ctx.close();
  return errors;
}

for (const route of targets) {
  const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
  const sfx = process.env.SHOT_DARK ? "-dark" : "";
  const dErr = await shot(route, 1440, 900, `C:/tmp/shiftu-${slug}${sfx}-desktop.png`);
  const mErr = await shot(route, 390, 844, `C:/tmp/shiftu-${slug}${sfx}-mobile.png`, true);
  const errs = [...new Set([...dErr, ...mErr])];
  console.log(`[${route}] captured. console errors: ${errs.length}`);
  errs.forEach((e) => console.log("  ! " + e));
}

await browser.close();
console.log("done");
