// Rule-based chat responder for the Shift Ü widget. No LLM, no API key, no
// external calls — a deterministic keyword matcher, so a malicious rate attack
// hits a function that only returns canned text. Every answer is grounded in
// real site content (src/lib/services-data.ts, pricing page, site.ts, the work
// page). Hard guardrails, mirrored from the old AI KB: never guarantee
// leads/sales/ROI/results, never invent results/client names/exact quotes,
// never mention grants/funding, keep it to 2-3 short sentences, route anything
// specific or unknown to a call.

type Intent = {
  id: string;
  patterns: string[]; // normalized substrings; multi-word weigh more
  answer: string;
  priority?: number; // 0 low (smalltalk) · 1 default · 2 objection · 3 escalation
};

const BOOK = "book a call at shiftu.ca/contact";
const EMAIL = "hello@shiftu.ca";

// --- normalization ---------------------------------------------------------

// Common misspellings + texting forms mapped to canonical (deterministic, safe).
const REWRITES: [RegExp, string][] = [
  [/\bu\b/g, "you"],
  [/\bur\b/g, "your"],
  [/\br\b/g, "are"],
  [/\bwut\b|\bwat\b|\bwot\b/g, "what"],
  [/\bdo u\b/g, "do you"],
  [/\bty\b|\bthx\b|\btysm\b|\btnx\b/g, "thanks"],
  [/\bpls\b|\bplz\b/g, "please"],
  [/\bgonna\b/g, "going to"],
  [/\bwanna\b/g, "want to"],
  [/\bcuz\b|\bcus\b/g, "because"],
  [/\bappt\b/g, "appointment"],
  [/\bwebsite?s?\b/g, "website"], // websit, websites -> website
  [/\bwebsight\b|\bwebsite\b|\bweb site\b/g, "website"],
  [/\bwebsights\b/g, "website"],
  [/\becommerse\b|\be commerce\b|\be-commerce\b/g, "ecommerce"],
  [/\bshopfy\b|\bshopifyy\b/g, "shopify"],
  [/\bchatbpt\b|\bchat bot\b|\bchatbots\b/g, "chatbot"],
  [/\bquoet\b|\bqoute\b|\bquotes\b/g, "quote"],
  [/\bbuisness\b|\bbusiness's\b|\bbusinesses\b/g, "business"],
  [/\bpricing\b|\bprices\b/g, "price"],
  [/\bcosts\b/g, "cost"],
  [/\bautomations\b|\bautomaton\b/g, "automation"],
  [/\bappointmnet\b|\bappointments\b/g, "appointment"],
  [/\brecieve\b/g, "receive"],
];

function normalize(s: string): string {
  let t = (s || "").toLowerCase();
  t = t.replace(/['`’]/g, "'");
  t = t.replace(/[^a-z0-9$?'\s]/g, " "); // keep letters, digits, $, ?, apostrophe
  t = t.replace(/(.)\1{2,}/g, "$1$1"); // heyyyy -> heyy (substring "hey" still hits)
  t = t.replace(/\s+/g, " ").trim();
  for (const [re, rep] of REWRITES) t = t.replace(re, rep);
  return t.replace(/\s+/g, " ").trim();
}

function matches(text: string, pattern: string): boolean {
  if (pattern.includes(" ")) return text.includes(pattern);
  if (pattern.length <= 3) return new RegExp(`(^|\\s)${pattern}(\\s|\\?|$)`).test(text);
  return text.includes(pattern);
}

function weight(pattern: string): number {
  const n = pattern.trim().split(/\s+/).length;
  return n >= 3 ? 4 : n === 2 ? 2.5 : 1;
}

// --- intent library --------------------------------------------------------

const SMALLTALK = new Set(["greeting", "how-are-you"]);

const INTENTS: Intent[] = [
  // ============ ESCALATION (tier 3) ============
  {
    id: "talk-to-human",
    priority: 3,
    patterns: ["talk to a human", "talk to a person", "speak to a person", "speak to someone", "real person", "real human", "actual person", "get me a human", "human please", "someone real", "transfer me", "talk to someone", "dont want a bot", "want a human"],
    answer: `Of course. ${cap(BOOK)} or email ${EMAIL}, and a real person, not a bot, replies within one business day. What's the best way to reach you?`,
  },
  {
    id: "frustration",
    priority: 3,
    patterns: ["not helping", "isnt helping", "youre not helping", "useless", "frustrating", "waste of time", "not what i asked", "forget it", "this sucks", "annoying", "terrible"],
    answer: `Sorry about that, let me get you to a person. Email ${EMAIL} or ${BOOK} and a real human replies within one business day.`,
  },
  {
    id: "existing-customer",
    priority: 3,
    patterns: ["already a client", "already a customer", "existing customer", "current project", "my site is down", "isnt working", "stopped working", "cant log in", "my project with you", "my account", "support on my", "already working with you"],
    answer: `If you're already working with us, the fastest path is to email ${EMAIL} and a real person jumps on it within one business day.`,
  },

  // ============ TRUST / OBJECTIONS (tier 2) ============
  {
    id: "scam",
    priority: 2,
    patterns: ["scam", "scammy", "scamming", "fake", "ripoff", "rip off", "fraud", "get scammed", "is this real", "too good to be true"],
    answer: `Not a scam. We're a small Canadian team, you own every account and asset we build, we never take your raw passwords, and scope and price are agreed in writing before anything starts. See real work at shiftu.ca/work or ${BOOK} to talk to a person.`,
  },
  {
    id: "legit",
    priority: 2,
    patterns: ["are you legit", "is this legit", "legit", "are you real", "real company", "trust you", "trustworthy", "actual business", "registered", "are you guys real"],
    answer: `We're a real Canadian team of five operators who build and run the systems ourselves, no account managers. You can see our actual work, Ridgeline Roast, Crown Signs and Magnética, at shiftu.ca/work. Happy to ${BOOK} with a real person.`,
  },
  {
    id: "guarantee-results",
    priority: 2,
    patterns: ["guarantee results", "guarantee it works", "guarantee", "guaranteed", "promise results", "guarantee leads", "guarantee more sales", "what if it doesnt work", "money back", "what results can i expect", "will it work", "does it actually work", "roi", "return on investment"],
    answer: `We don't guarantee leads, sales, or specific numbers, because anyone who does is guessing. What we commit to is scoping the work and price in writing first, building it properly, and running it with you until it works. Want to ${BOOK} to talk through what's realistic?`,
  },
  {
    id: "who-owns",
    priority: 2,
    patterns: ["who owns", "do i own", "ownership", "own the code", "source code", "source files", "own the work", "is it mine", "own my account", "take it elsewhere", "own the website", "own the domain", "own it", "locked in", "lock in", "vendor lock"],
    answer: `You own everything: your site, accounts, data, and the systems we build, all in your name with no lock-in. We work through delegated access, never your raw passwords. Anything specific you want to confirm on a call?`,
  },
  {
    id: "tried-before",
    priority: 2,
    patterns: ["tried before", "tried an agency", "last agency", "last guy", "last web guy", "web guy", "last time", "been burned", "got burned", "burned", "ripped me off", "ghosted", "got nothing", "wasted money", "how is this different", "why are you different", "burned before"],
    answer: `Heard that a lot. The difference is we scope and price in writing first, start with one small fix that proves a return, and run it with you instead of handing it over and vanishing. ${cap(BOOK)} and we'll show you the smallest version that would work.`,
  },

  {
    id: "contract-cancel-refund",
    priority: 2,
    patterns: ["contract", "long contract", "no contract", "do i sign", "cancel anytime", "can i cancel", "cancellation", "cancel", "commitment", "lock me in", "refund", "refunds", "get my money back", "any commitment"],
    answer: `Most builds are one-time by scope with no ongoing contract; any monthly plans (like a website plan or managed ads) have no lock-in and you can cancel anytime. On one-time builds a deposit secures your slot, and we agree scope and price in writing first. Want to ${BOOK}?`,
  },

  // ============ SERVICES (tier 1) ============
  // Note: the broad "service-websites" intent (matches bare "website") lives at
  // the END of the services block so a more specific service wins ties, e.g.
  // "chatbot for my website" -> ai-agents, "ecommerce website" -> ecommerce.
  {
    id: "website-redesign",
    patterns: ["redesign", "redo my", "rebuild", "fix my site", "fix my website", "fix mine", "fix my current", "current site", "current website", "my old site", "my site is outdated", "update my site", "revamp", "my website is broken", "improve my site"],
    answer: `Yes, we redesign and fix existing sites, not just new builds, especially when a site gets traffic but doesn't convert. ${cap(BOOK)} and we'll take a look at what to change.`,
  },
  {
    id: "website-speed",
    patterns: ["how fast will it load", "page speed", "site is slow", "loads slow", "speed it up", "core web vitals", "load time", "make it faster", "site speed"],
    answer: `Speed is the point: every page is built to load in under two seconds (LCP under 2.5s). If your current site is slow, that's exactly the kind of thing we fix. Want to ${BOOK}?`,
  },
  {
    id: "website-mobile",
    patterns: ["mobile friendly", "responsive", "work on phones", "look good on mobile", "mobile optimized", "works on tablet"],
    answer: `Yes, every build is fully responsive and tuned for mobile, since that's where most of your traffic is. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "website-seo",
    patterns: ["do you do seo", "seo", "rank on google", "show up on google", "found on google", "search engine", "seo included", "google ranking"],
    answer: `Yes, SEO and schema (structured data) are built in from day one so you're set up to get found, though we don't promise specific rankings. Want to ${BOOK} to scope it?`,
  },
  {
    id: "website-copy",
    patterns: ["write the copy", "who writes", "the copy", "writes the content", "do the writing", "copywriting", "provide content", "write the text", "dont have content"],
    answer: `We can write the conversion copy for you; our builds start from researched copy, not lorem ipsum. If you already have content, we'll shape it. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "website-hosting",
    patterns: ["do you host", "hosting", "where is it hosted", "host it myself", "hosting included"],
    answer: `We handle hosting and setup as part of the build, and because you own everything, you can host it yourself if you'd rather, with no lock-in. Want to ${BOOK}?`,
  },
  {
    id: "website-maintenance",
    patterns: ["maintenance", "ongoing support", "updates after", "maintain it", "after launch", "monthly fee", "upkeep", "support after"],
    answer: `We can keep it maintained on a low monthly plan, or hand it over fully if you'd rather run it yourself, no lock-in either way. We also reply within one business day when something shifts. Want to ${BOOK}?`,
  },
  {
    id: "website-edit-self",
    patterns: ["edit it myself", "update myself", "change text myself", "can i edit", "cms", "self edit", "make changes myself"],
    answer: `Yes, we can set it up so you can edit content yourself, and we're around for the bigger changes. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "service-leadgen",
    patterns: ["lead generation", "lead gen", "get me leads", "more leads", "more customers", "more clients", "get clients", "generate leads", "get inquiries", "more sales", "run ads", "run my ads", "ad management", "google ads", "facebook ads", "meta ads", "paid ads", "marketing", "digital marketing", "promote my business", "get the word out"],
    answer: `Yes. We set up a landing page, a lead form, and instant follow-up so every inquiry gets caught while it's warm, plus ad setup on Google or Meta. Builds start around $350; ads managed around $300/mo, with ad spend on your own account. ${cap(BOOK)} and we'll map it.`,
  },
  {
    id: "leadgen-ad-spend",
    patterns: ["who pays for ad spend", "ad spend", "ad budget", "pay for the ads", "is ad spend included", "ad spend separate", "pay google directly", "media spend"],
    answer: `Ad spend always stays on your own account, billed directly by Google or Meta with no markup; our fee is for building and managing the system. Managed ads run around $300/mo plus your spend. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "leadgen-how-many",
    patterns: ["how many leads", "lead volume", "leads per month", "number of leads", "how many leads will i get"],
    answer: `We don't promise a lead count, because that depends on your offer, market, and budget. What we do guarantee is that every lead that comes in gets caught and followed up instantly. ${cap(BOOK)} for a realistic picture.`,
  },
  {
    id: "leadgen-google-meta",
    patterns: ["google or facebook", "google or meta", "google vs facebook", "which platform", "meta or google", "instagram ads", "tiktok ads"],
    answer: `Depends on your business: Google for people already searching for you, Meta for putting your offer in front of the right audience. On a quick call we'll tell you which fits, and we can set up either. Want to ${BOOK}?`,
  },
  {
    id: "leadgen-followup",
    patterns: ["instant follow up", "follow up with leads", "speed to lead", "auto reply to leads", "text leads back", "missed call text", "respond to leads"],
    answer: `Yes, instant follow-up is the core of it: new leads get routed and contacted while they're still warm, so none slip through. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "service-ai-agents",
    patterns: ["chatbot", "ai agent", "ai chat", "voice agent", "voice ai", "ai assistant", "ai receptionist", "answer calls", "answer my phone", "answer messages", "ai bot", "ai that answers", "bot for my site", "bot to answer"],
    answer: `Yes. We build chat and voice agents trained on your business that answer, qualify leads, and book appointments around the clock, and hand off to a person for anything sensitive. They run on rules you approve and log every conversation, so no made-up answers. Agents start around $500 per workflow. Want to ${BOOK}?`,
  },
  {
    id: "ai-human-sounding",
    patterns: ["sound human", "sound robotic", "sound like a robot", "sound real", "sound fake", "natural", "human-like", "can people tell"],
    answer: `They're built to sound natural and on-brand, not robotic, and they hand off to a person the moment something needs a human. Want to ${BOOK} to try the idea on your use case?`,
  },
  {
    id: "ai-booking",
    patterns: ["book appointments", "can it book", "does it schedule", "set appointments", "take bookings", "sync with my calendar", "into my calendar", "book into"],
    answer: `Yes, booking is one of the main jobs: the agent can qualify a lead and set the appointment, then route it to your team. ${cap(BOOK)} and we'll scope it to your calendar.`,
  },
  {
    id: "ai-hallucinate",
    patterns: ["wrong answer", "makes things up", "make stuff up", "made up", "hallucinate", "hallucination", "is it accurate", "give bad info", "says something wrong", "what if it lies", "answers incorrectly"],
    answer: `No. The agent answers only what it's trained on, runs on rules you approve, hands off to a person when unsure, and logs every conversation. No made-up answers. Want to ${BOOK}?`,
  },
  {
    id: "ai-languages",
    patterns: ["what languages", "speak spanish", "speak french", "bilingual", "multilingual", "multiple languages", "other languages"],
    answer: `We work English-first. If you need other languages, mention it on a call and we'll give you an honest answer on what's in scope. ${cap(BOOK)}?`,
  },
  {
    id: "ai-handoff",
    patterns: ["hand off to a human", "handoff", "transfer to a person", "escalate to a human", "real person take over", "human handoff"],
    answer: `Yes, human handoff is built in: anything sensitive or outside its rules gets routed to a person with the full context attached. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "ai-trained",
    patterns: ["trained on my business", "know my business", "train it on my", "use my pricing", "learn my services", "customized to me", "answer about my company", "feed it my"],
    answer: `Yes, the agent is trained on your business, your services, and your FAQs, so it answers like your team would, within rules you approve. Want to ${BOOK}?`,
  },
  {
    id: "ai-channels",
    patterns: ["work on whatsapp", "on my website and whatsapp", "instagram dms", "facebook messenger", "where can i put the bot", "multi channel", "work on sms", "works on whatsapp"],
    answer: `We start on your website chat and can extend to WhatsApp or voice when the workflow is clearly scoped. We prove it on chat first, then add channels. ${cap(BOOK)} to map it.`,
  },
  {
    id: "ai-replace-staff",
    patterns: ["replace my staff", "replace my employees", "replace my team", "replace my receptionist", "replace my front desk", "fire my", "take jobs", "lay off", "layoffs", "still need staff", "instead of hiring", "replace people"],
    answer: `It's meant to free your team, not replace them: routine questions and bookings get handled automatically, and anything that needs judgment is routed to a person with full context. Want to ${BOOK} to see where it'd help most?`,
  },
  {
    id: "service-automation",
    patterns: ["automate", "automation", "workflow", "dashboard", "reporting", "manual work", "manual stuff", "stop doing things manually", "save time", "zapier", "automate follow ups", "automate my business"],
    answer: `Yes. We build workflows, approvals, dashboards, and clean reporting so data stops getting lost and you stop being the bottleneck. Every workflow has rules, a human approval point on anything that matters, and a full log. Automation starts around $2,000. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "automation-what",
    patterns: ["what can you automate", "what should i automate", "worth automating", "where do i start with automation", "automate repetitive"],
    answer: `Usually the repetitive stuff first: follow-ups, reminders, onboarding, reporting, approvals. We find the one that frees you up most and start there. ${cap(BOOK)} and we'll point to it.`,
  },
  {
    id: "automation-dashboard",
    patterns: ["build a dashboard", "reporting dashboard", "kpi dashboard", "one place", "consolidate my reports", "see all my numbers", "analytics dashboard", "source of truth"],
    answer: `Yes, we build dashboards that pull your numbers into one place so you're not stitching reports together. Want to ${BOOK} to scope it?`,
  },
  {
    id: "service-ecommerce",
    patterns: ["shopify", "ecommerce", "online store", "online shop", "sell online", "web store", "storefront", "sell products", "abandoned cart"],
    answer: `Yes, Shopify is our focus: cleaner product pages, fixed SEO, consistent product data, and a theme tuned to convert the traffic you already have. It starts around $3,000 plus optional support. ${cap(BOOK)} to scope it.`,
  },
  {
    id: "ecommerce-migration",
    patterns: ["migrate from", "migrate my store", "migrate my", "woocommerce", "move from wix", "switch from squarespace", "migrate from woocommerce", "move my products", "replatform", "transfer my store"],
    answer: `Yes, we can migrate your store to Shopify and keep your SEO intact with proper redirects. Tell me where you're moving from, or ${BOOK}.`,
  },
  {
    id: "ecommerce-conversion",
    patterns: ["improve conversions", "increase sales", "conversion rate", "traffic but no sales", "more sales from same traffic", "cro"],
    answer: `That's exactly our angle: keep more of every sale by tuning product pages, speed, and the path to checkout on the traffic you already have. Want to ${BOOK}?`,
  },
  {
    id: "service-custom",
    patterns: ["custom system", "custom software", "custom app", "build an app", "build apps", "make an app", "develop an app", "app development", "software development", "build software", "internal tool", "bespoke", "tailored", "managed system", "custom build", "build a tool", "operating system", "custom platform", "web app", "mobile app"],
    answer: `Yes. For teams off-the-shelf tools don't fit, we build a custom system with an integration layer, governed automation, and role-based views, designed in a paid discovery phase and run with you. It starts around $15,000 and is phased. A discovery call is the place to start, ${BOOK}.`,
  },
  {
    id: "custom-discovery",
    patterns: ["discovery phase", "discovery", "scope it first", "paid discovery", "scoping phase", "proof of concept", "mvp", "prototype", "start small"],
    answer: `Custom systems start with a paid discovery phase where we map scope, cost, and architecture before any build, so you're never paying for open-ended work. We can also start with a small first phase and grow it. ${cap(BOOK)} to start there.`,
  },
  {
    id: "service-training",
    patterns: ["train my team", "train my staff", "ai training", "teach my team", "teach my staff", "learn ai", "ai workshop", "ai coaching", "train us", "onboard my staff", "upskill", "operator", "champion"],
    answer: `We offer team training as a support to the systems we build, scoped to your team and your real tools rather than sold as a fixed package. It covers hands-on sessions, simple SOPs, and follow-up support. ${cap(BOOK)} and we'll scope it.`,
  },
  {
    id: "services-overview",
    patterns: ["what do you do", "what do you offer", "what services", "what is shift", "what can you help", "what kind of work", "tell me what you do", "what is this company", "about this company", "so what is this", "what you guys do", "what do you guys", "do you guys do", "you guys do"],
    answer: `Shift Ü is a done-for-you team in Canada: we find the bottleneck slowing your business, build the system that removes it, and run it with you. That spans websites, lead generation, AI chat and voice agents, automation, ecommerce, and custom systems. What are you trying to fix, or want to ${BOOK}?`,
  },
  {
    id: "service-websites",
    patterns: ["website", "web design", "web dev", "landing page", "build a site", "make a site", "build me a site", "new site", "web page"],
    answer: `Yes. We build fast, conversion-first sites and landing pages in custom code, not WordPress or Wix, with tracking and lead routing wired in, and they load in under two seconds. Builds start around $800, one-time by scope or a low monthly plan. Want to ${BOOK} to scope it?`,
  },

  // ============ PRICING (tier 1) ============
  {
    id: "pricing-general",
    patterns: ["how much", "price", "cost", "how much do you charge", "rates", "charge", "expensive", "budget", "how much does it cost", "whats the cost", "ballpark", "how much for", "$"],
    answer: `Rough starting points: lead generation from $350, websites from $800, AI agents from $500 per workflow, automation from $2,000, ecommerce from $3,000, and custom systems from $15,000. We price the problem, so the final number depends on scope and is agreed in writing first. Tell me which one you're after, or ${BOOK} for a real quote.`,
  },
  {
    id: "pricing-included",
    patterns: ["whats included", "what do i get", "in the package", "hidden fees", "extra cost", "extra fees", "comes with", "included in the price", "any other costs", "is support included"],
    answer: `No surprises: we agree the scope and the price in writing before any build, so there are no hidden fees. Ad spend is the only thing that stays separate, on your own account, billed directly by Google or Meta with no markup. Want to ${BOOK} for a scoped number?`,
  },
  {
    id: "pricing-payment",
    patterns: ["payment plan", "pay monthly", "installment", "financing", "deposit", "upfront", "split the payment", "pay in parts", "pay over time", "half now", "how do i pay", "pay you", "how do you take payment", "payment methods", "how does payment work"],
    answer: `Most builds are one-time by scope, and several services (like websites and ads) can run on a low monthly plan with no lock-in. A deposit secures your slot and the balance is due at launch. ${cap(BOOK)} and we'll lay out the options.`,
  },
  {
    id: "pricing-cheap",
    patterns: ["why so cheap", "whats the catch", "too good to be true", "so affordable", "so low", "what am i missing", "sounds cheap", "whats the downside"],
    answer: `Fair question. The starting prices are real because we scope tightly and start small: a focused fix that proves a return, not a bloated package. You agree the scope and price in writing first, and you own everything we build. Want to ${BOOK} to see what your project would involve?`,
  },
  {
    id: "pricing-expensive",
    patterns: ["thats expensive", "too expensive", "why so expensive", "cant afford", "out of my budget", "too pricey", "do it cheaper", "discount", "lower the price", "thats a lot", "too much money", "thats steep"],
    answer: `Totally fair. We price the problem, so we can usually start smaller than you'd expect: one working fix earns the right to build more later. Tell me your budget and what you're trying to fix, or ${BOOK}, and we'll find the smallest version that moves the needle.`,
  },

  // ============ PROCESS / TIMELINE (tier 1) ============
  {
    id: "timeline",
    patterns: ["how long does it take", "how long", "how fast can you", "how soon", "turnaround", "timeline", "timeframe", "how many weeks", "when can it be ready", "when would it be done", "deadline"],
    answer: `It depends on scope, so the honest answer is we confirm the timeline in writing once we've scoped it on a quick call. We deliberately start small, so a focused first build moves fast. Want to ${BOOK} for a real date?`,
  },
  {
    id: "process",
    patterns: ["how does it work", "the process", "what happens after", "the steps", "how do you work", "whats involved", "walk me through", "next step", "how does this work"],
    answer: `Three steps: we find the bottleneck and put the scope and price in writing, build the system wired into the tools you already use, then run it with you and keep tuning it. Launch is the start, not the finish. ${cap(BOOK)}, 15 to 20 minutes, and we'll map your first step.`,
  },
  {
    id: "revisions",
    patterns: ["how many revisions", "revisions", "make changes", "rounds of edits", "request changes", "what if i dont like it", "do changes cost", "edits later", "tweak it"],
    answer: `Every build includes three rounds of revisions, and anything beyond that is quoted separately so there are no surprises. We'd rather get it right with you than hand something over and disappear. Want to ${BOOK}?`,
  },
  {
    id: "what-need-from-me",
    patterns: ["what do you need from me", "how much of my time", "do i have to write", "do you need access", "what do i provide", "how involved", "required from me", "from my side", "how hands on"],
    answer: `Not much: a short call to map the goal, access to the accounts involved (delegated, never your raw passwords), and your sign-off at the approval points. We do the building and running; you stay in control. ${cap(BOOK)} and we'll tell you exactly what we'd need.`,
  },

  // ============ BOOKING / GETTING STARTED (tier 1) ============
  {
    id: "booking",
    patterns: ["book a call", "get on a call", "hop on a call", "schedule a meeting", "set up a call", "phone call", "book a time", "call me", "jump on a call", "lets do a call", "id like to discuss", "can we chat"],
    answer: `Happy to. ${cap(BOOK)} and you'll leave with a plan and a price, even if you never hire us. Or email ${EMAIL} and a real person replies within one business day.`,
  },
  {
    id: "consultation",
    patterns: ["free consultation", "free consult", "consultation", "consult", "free quote", "free estimate", "free assessment", "discovery call", "strategy session", "is the first call free", "free audit", "no obligation", "get a proposal"],
    answer: `Yes, the first call is free and there's no pressure: 15 to 20 minutes, and you leave with a clear plan and a price even if you never hire us. ${cap(BOOK)}, or email ${EMAIL}.`,
  },
  {
    id: "get-started",
    patterns: ["ready to start", "how do i sign up", "lets do this", "get started", "want to hire you", "sign me up", "become a client", "lets go", "move forward", "where do i begin", "how do i proceed", "im ready"],
    answer: `Love it. ${cap(BOOK)}, share a preferred time, and a real person confirms within one business day. You'll leave the call with a clear plan and price.`,
  },

  // ============ LOGISTICS (tier 1) ============
  {
    id: "contact-email",
    patterns: ["whats your email", "email", "how do i contact", "can i email", "reach you", "contact info", "get in touch", "your details", "email address"],
    answer: `You can reach us at ${EMAIL} and a real person replies within one business day. Or ${BOOK}.`,
  },
  {
    id: "contact-phone",
    patterns: ["phone number", "your number", "can i call you", "phone", "contact number", "ring you", "by phone"],
    answer: `We don't list a phone line; the fastest way to a real person is to ${BOOK} or email ${EMAIL}. We reply within one business day.`,
  },
  {
    id: "location",
    patterns: ["where are you based", "where are you located", "in canada", "your location", "are you local", "where are you from", "are you canadian", "your office", "what city", "what country"],
    answer: `We're based in Canada and work with businesses across the country. Everything runs remote and async-friendly, so location is rarely a blocker. Want to ${BOOK}?`,
  },
  {
    id: "remote",
    patterns: ["work remotely", "remote work", "international clients", "outside canada", "in the us", "in person", "different province", "everything online", "do we need to meet"],
    answer: `Yes, we work remotely with businesses across Canada, async-friendly. If you're outside Canada, ${BOOK} and we'll give you an honest answer on fit.`,
  },
  {
    id: "availability",
    patterns: ["are you available", "taking new clients", "accepting projects", "have capacity", "are you booked", "free to take", "can you start soon", "your availability", "your hours"],
    answer: `Best way to check is to ${BOOK}; we'll tell you honestly if we can take it on and when we could start. We reply within one business day.`,
  },

  // ============ COMPARISONS / AI SKEPTICISM (tier 1) ============
  {
    id: "just-a-chatbot",
    patterns: ["just a chatbot", "basic bot", "dumb chatbot", "canned responses", "scripted", "faq bot", "decision tree", "normal chatbot", "actually understand", "just buttons"],
    answer: `Not a basic FAQ bot. We build agents trained on your business that qualify leads and book appointments, run on rules you approve, and hand off to a person when unsure, with every conversation logged. Want to ${BOOK} to see what one would do for you?`,
  },
  {
    id: "is-template",
    patterns: ["is this a template", "template website", "custom or a template", "use templates", "cookie cutter", "look like everyone", "prebuilt", "from scratch", "wordpress template", "drag and drop"],
    answer: `No templates: we build in custom code, so your site isn't a theme everyone else is using. It's designed around your offer, with tracking and routing wired in. Want to ${BOOK} to scope it?`,
  },
  {
    id: "real-ai-or-hype",
    patterns: ["actually use ai", "real ai", "just hype", "buzzword", "gimmick", "genuinely ai", "really use ai", "ai or just marketing", "ai actually doing", "just automation"],
    answer: `Fair to ask. We treat AI as one tool inside a system, not the whole pitch: controlled workflows with rules, logs, and human approval, no autonomous-magic claims. ${cap(BOOK)} and we'll show you exactly what the AI would and wouldn't do.`,
  },
  {
    id: "vs-diy",
    patterns: ["why not just use wix", "build it myself", "use chatgpt", "doing it myself", "website builder", "diy", "do it myself", "fiverr", "freelancer", "why hire you", "why pay you", "why do i need you", "squarespace", "wix"],
    answer: `You can absolutely DIY with Wix or ChatGPT; the difference is we do it for you and run it, in custom code that loads fast and converts, so you get the outcome instead of another tool to manage. If you'd rather learn it yourself, we also do team training. ${cap(BOOK)} for an honest take.`,
  },
  {
    id: "vs-agencies",
    patterns: ["why you over", "whats different about you", "why should i pick you", "different from other agencies", "what makes you better", "sets you apart", "your advantage", "why choose", "compare to others", "vs other agencies"],
    answer: `Two things set us apart: we're operators who build and run the systems ourselves (no account managers), and we scope and price in writing first, then run it with you. You also own everything, with no lock-in. Want to ${BOOK}?`,
  },

  // ============ CROSS-CUTTING (tier 1) ============
  {
    id: "integrations",
    patterns: ["do you work with", "integrate with", "connect to", "connect my tools", "connect my apps", "connect everything", "connect my crm", "connect my", "do you support", "compatible with", "hubspot", "salesforce", "pipedrive", "gohighlevel", "go high level", "zapier", "make.com", "n8n", "quickbooks", "xero", "stripe", "paypal", "calendly", "acuity", "twilio", "slack", "notion", "airtable", "google sheets", "mailchimp", "klaviyo", "whatsapp", "monday", "google calendar", "zoho"],
    answer: `Most likely yes. We build around the tools you already use (CRMs, Shopify, calendars, Google and Meta, payment and automation tools) rather than making you switch. Tell me which tool, or ${BOOK} and we'll confirm the integration.`,
  },
  {
    id: "industries",
    patterns: ["do you work with", "work with my industry", "real estate", "realtor", "dental", "dentist", "medical", "clinic", "chiropractor", "contractor", "construction", "hvac", "plumber", "plumbing", "electrician", "roofing", "landscaping", "restaurant", "cafe", "law firm", "lawyer", "attorney", "fitness", "gym", "salon", "spa", "barber", "accounting", "accountant", "bookkeeping", "insurance", "mortgage", "automotive", "auto repair", "dealership", "coaching", "consultant", "nonprofit", "my industry", "my niche", "my trade"],
    answer: `Very likely. We're industry-agnostic and work with small and growing teams across Canada; our work spans coffee wholesale, signage, and ecommerce, and the systems adapt to your trade. Tell me your industry, or ${BOOK} for an honest fit answer.`,
  },
  {
    id: "bundling",
    patterns: ["all of it", "do you do everything", "whole thing", "one system that does everything", "where do i start", "where to begin", "multiple things", "one stop shop", "full package", "turnkey", "done for me", "all in one", "under one roof", "the whole system", "everything done for me", "package deal"],
    answer: `We can do all of it, but we never lead with complexity: most clients start with leads or a site, prove a return, then add agents, automation, or a full system as revenue earns it. ${cap(BOOK)} and we'll map the one fix to start with.`,
  },
  {
    id: "do-you-do-x",
    priority: 0, // catch-all: only wins when no specific service/detail intent matched
    patterns: ["do you do", "do you offer", "can you do", "do you build", "do you make", "do you handle", "is that something you do", "do you also", "can you help with"],
    answer: `Quite possibly. Our core is websites, lead generation, AI chat and voice agents, automation, ecommerce, and custom systems. Tell me exactly what you need, or ${BOOK} and we'll give you a straight answer on fit.`,
  },
  {
    id: "examples",
    patterns: ["see examples", "portfolio", "your work", "past projects", "case studies", "case study", "samples", "references", "testimonials", "reviews", "sites youve built", "proof", "what youve done"],
    answer: `Yes, see our work at shiftu.ca/work: a custom B2B portal and inventory system for Ridgeline Roast, a conversion site and quote flow for Crown Signs, and a Shopify-style store for Magnética. Want to ${BOOK} to talk about yours?`,
  },

  // ============ SMALLTALK / META (tier 0) ============
  {
    id: "are-you-a-bot",
    priority: 0,
    patterns: ["are you a bot", "is this a bot", "are you ai", "robot", "automated", "bot or human", "are you a machine", "you a person"],
    answer: `I'm Shift Ü's assistant, so yes, a simple bot. For anything specific I'll point you to a real person, who replies within one business day. Want to ${BOOK}?`,
  },
  {
    id: "thanks",
    priority: 0,
    patterns: ["thanks", "thank you", "appreciate", "cheers", "much appreciated"],
    answer: `Anytime! If you want to take it further, ${BOOK} or email ${EMAIL}.`,
  },
  {
    id: "bye",
    priority: 0,
    patterns: ["bye", "goodbye", "cya", "see ya", "see you", "gtg", "talk later", "im done", "thats all", "take care", "have a good one"],
    answer: `Thanks for stopping by. When you're ready, ${BOOK} or email ${EMAIL}. Talk soon.`,
  },
  {
    id: "help",
    priority: 0,
    patterns: ["help", "need help", "can you help", "assist", "have a question", "got a question", "not sure where to start", "i need advice", "help me out"],
    answer: `Happy to help. I can explain what we do, give rough pricing, or get you booked with a real person. What are you trying to fix?`,
  },
  {
    id: "how-are-you",
    priority: 0,
    patterns: ["how are you", "hows it going", "you good", "whats up", "how are things", "hows your day", "anyone there", "you there"],
    answer: `Doing well, thanks! What can I help with, services, pricing, or booking a call?`,
  },
  {
    id: "greeting",
    priority: 0,
    patterns: ["hi", "hey", "hello", "yo", "hiya", "sup", "howdy", "good morning", "good afternoon", "good evening", "hola", "gm"],
    answer: `Hey! I can tell you what we do, rough pricing, or how to get started. What are you trying to fix, or want to ${BOOK}?`,
  },

  // ============ OFF-TOPIC (tier 0) ============
  {
    id: "job-seeker",
    priority: 0,
    patterns: ["are you hiring", "any jobs", "work for you", "looking for a job", "openings", "join your team", "vacancies", "internship", "how do i apply", "recruiting", "careers"],
    answer: `Thanks for the interest! We don't have a formal careers page; the best move is to email ${EMAIL} and tell us about yourself. For project inquiries, ${BOOK}.`,
  },
  {
    id: "spam-outreach",
    priority: 0,
    patterns: ["backlinks", "rank your website", "business proposal", "partner up", "guest post", "sell you leads", "advertising with you", "improve your seo", "mutually beneficial", "i represent", "collaborate"],
    answer: `Thanks, but we're not taking partnership or outreach pitches through chat. If it's a genuine project for your business, ${BOOK} or email ${EMAIL}.`,
  },
];

const FALLBACK =
  `I might not have caught that. I can tell you what we do (websites, lead generation, AI agents, automation, ecommerce, custom systems), give rough pricing, or get you booked with a real person. What are you trying to fix? You can always ${BOOK}.`;

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function respond(raw: string): string {
  const text = normalize(raw);
  if (!text || text.length < 1) return FALLBACK;

  let best: { intent: Intent; score: number } | null = null;
  for (const intent of INTENTS) {
    let score = 0;
    for (const p of intent.patterns) if (matches(text, p)) score += weight(p);
    if (score <= 0) continue;
    const tier = intent.priority ?? 1;
    const bestTier = best ? (best.intent.priority ?? 1) : -1;
    if (!best || tier > bestTier || (tier === bestTier && score > best.score)) {
      best = { intent, score };
    }
  }

  if (!best) return FALLBACK;
  // A bare greeting/pleasantry inside a long message usually means a real
  // question we didn't catch — prefer the fallback over a chirpy "hey!".
  if (SMALLTALK.has(best.intent.id) && text.split(" ").length > 6) return FALLBACK;
  return best.intent.answer;
}
