import { chromium } from "playwright";
const b = await chromium.launch();
async function cap(w,h,t,file){
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/", { waitUntil:"domcontentloaded" });
  await p.waitForTimeout(t);
  await p.screenshot({ path:file });
  await ctx.close();
}
await cap(1440,900,1100,"C:/tmp/shiftu-intro-desktop.png");
await cap(390,844,1100,"C:/tmp/shiftu-intro-mobile.png");
await b.close();
console.log("intro captured");
