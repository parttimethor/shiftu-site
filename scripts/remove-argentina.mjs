import fs from "fs";
import path from "path";

const root = "src";
const exts = new Set([".ts", ".tsx"]);

// Order matters: specific phrases before the general "Argentina and Canada".
const specials = [
  ['"Argentina and Canada, two languages, one team"', '"Canada-wide delivery, one dedicated team"'],
  ['"Argentina: local builds for growing teams"', '"Local builds for growing Canadian teams"'],
  ['"Canada: same standard, same delivery speed"', '"Same standard, same delivery speed nationwide"'],
  ["Two countries, one standard", "Built for Canadian businesses"],
];
const generals = [
  ['["Argentina", "Canada"]', '["Canada"]'],
  ["Argentina and Canada", "Canada"],
  ["Argentina &amp; Canada", "Canada"],
  ["Argentina & Canada", "Canada"],
];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (exts.has(path.extname(e.name))) {
      let s = fs.readFileSync(p, "utf8");
      if (!s.includes("Argentina")) continue;
      let before = s;
      for (const [a, b] of [...specials, ...generals]) s = s.split(a).join(b);
      if (s !== before) {
        fs.writeFileSync(p, s);
        console.log("updated", p);
      }
    }
  }
}

walk(root);
console.log("done");
