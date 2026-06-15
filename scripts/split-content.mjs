import fs from "fs";

const ex = JSON.parse(fs.readFileSync("docs/extract-source.json", "utf8")).result.pages;
const co = JSON.parse(fs.readFileSync("docs/copy-source.json", "utf8")).result.pages;
const find = (arr, r) => arr.find((p) => p.route === r) || null;

const targets = [
  { slug: "services/landing-pages", ex: "/services/landing-pages", co: "/services/websites" },
  { slug: "services/full-website", ex: "/services/full-website", co: "/services/websites" },
  { slug: "services/web-chat-agent", ex: "/services/ai-chat-agent", co: "/services/whatsapp-agents" },
  { slug: "services/voice-agent", ex: "/services/voice-agent", co: null },
  { slug: "services/google-meta-ads", ex: "/services/google-meta-ads", co: "/services/paid-ads" },
  { slug: "services/automations", ex: "/services/conversion-system", co: "/services/automations" },
  { slug: "services/branding", ex: null, co: "/services/branding" },
  { slug: "services/conversion-system", ex: "/services/conversion-system", co: null },
  { slug: "services", ex: "/services", co: "/services" },
  { slug: "programs", ex: "/programs", co: null },
  { slug: "programs/ai-operator-certification", ex: "/programs/ai-certification", co: null },
  { slug: "programs/private-team-training", ex: "/programs/private-training", co: null },
  { slug: "programs/workforce-transformation", ex: "/programs/workforce-transformation", co: null },
  { slug: "pricing", ex: "/pricing", co: "/pricing" },
  { slug: "about", ex: "/about", co: "/about" },
  { slug: "contact", ex: "/contact", co: "/contact" },
  { slug: "work", ex: null, co: "/work" },
  { slug: "work-case", ex: null, co: "/work/[slug]" },
];

fs.mkdirSync("docs/content", { recursive: true });
for (const t of targets) {
  const out = {
    target: t.slug,
    extract: t.ex ? find(ex, t.ex) : null,
    copy: t.co ? find(co, t.co) : null,
  };
  const file = "docs/content/" + t.slug.replace(/\//g, "__") + ".json";
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  console.log(
    `${t.slug} -> extract:${out.extract ? "Y" : "-"} copy:${out.copy ? "Y" : "-"}`,
  );
}
console.log("split done");
