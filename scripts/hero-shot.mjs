import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
await ctx.addInitScript(()=>{ try{ sessionStorage.setItem("introSeen","1"); }catch(e){} });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil:"networkidle" });
await p.waitForTimeout(1800);
await p.screenshot({ path:"C:/tmp/shiftu-hero.png" });
// dark hero too
const ctx2 = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
await ctx2.addInitScript(()=>{ try{ sessionStorage.setItem("introSeen","1"); localStorage.setItem("theme","dark"); }catch(e){} });
const p2 = await ctx2.newPage();
await p2.goto("http://localhost:3000/", { waitUntil:"networkidle" });
await p2.waitForTimeout(1800);
await p2.screenshot({ path:"C:/tmp/shiftu-hero-dark.png" });
await b.close(); console.log("hero captured");
