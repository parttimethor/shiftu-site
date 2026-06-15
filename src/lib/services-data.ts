// RSC-safe service content. String icon names only (resolved by <Icon/>).
// No prices and no guarantees here on purpose: service pages lead with
// value and outcomes. Pricing ranges live only on /pricing, framed as
// starting guidance. Mirrors the six-category service menu.

export type MockKind = "dashboard" | "chat" | "system" | "automation" | "voice";

export type ServiceData = {
  slug: string;
  label: string;
  eyebrow: string;
  icon: string;
  metaDesc: string;
  serviceType: string;
  mock: MockKind;
  heroTitle: string;
  heroSub: string;
  problemEyebrow: string;
  problemTitle: string;
  problemSub: string;
  problems: { icon: string; title: string; body: string }[];
  buildTitle: string;
  buildSub: string;
  builds: { icon: string; title: string; body: string }[];
  steps: { title: string; body: string }[];
  outcomeTitle: string;
  outcomeSub: string;
  outcomes: string[];
  faq: { q: string; a: string }[];
};

export const servicesData: Record<string, ServiceData> = {
  "lead-generation": {
    slug: "lead-generation",
    label: "Lead Generation Systems",
    eyebrow: "Lead Generation",
    icon: "Magnet",
    serviceType: "Lead generation system build and management",
    metaDesc:
      "A landing page, a lead form, and instant follow-up routing so every inquiry gets caught, qualified, and contacted while it is still warm.",
    mock: "dashboard",
    heroTitle: "Stop paying for leads you never call back",
    heroSub:
      "A landing page, a lead form, and instant follow-up routing, so every inquiry gets caught and contacted while it is still warm. Ad spend stays on your account. Our job is to make it convert.",
    problemEyebrow: "Where it leaks",
    problemTitle: "Most leads are lost in the first few minutes",
    problemSub:
      "The first business to reply usually wins the job. These are the gaps that quietly hand your leads to a competitor.",
    problems: [
      { icon: "Inbox", title: "Leads sit in an inbox", body: "Inquiries land somewhere no one checks until tomorrow." },
      { icon: "Timer", title: "Slow first reply", body: "By the time someone follows up, they already booked elsewhere." },
      { icon: "Eye", title: "No tracking", body: "You cannot tell which leads closed, so you cannot tell what is working." },
      { icon: "Target", title: "Spend with no funnel", body: "Ads send traffic to a page that was never built to capture it." },
    ],
    buildTitle: "What we build",
    buildSub: "One simple system that catches the lead and gets it to a human fast.",
    builds: [
      { icon: "Layout", title: "Landing page and form", body: "A focused page with one offer and a capture form that works." },
      { icon: "Send", title: "Instant follow-up routing", body: "New leads routed to the right person the moment they come in." },
      { icon: "LineChart", title: "Tracking and a shared tracker", body: "Every lead logged in one place from first touch to closed." },
      { icon: "Target", title: "Paid traffic setup", body: "Google or Meta campaigns built on your own ad account." },
    ],
    steps: [
      { title: "Find the leak", body: "We map where leads come in and where they fall through." },
      { title: "Build capture", body: "Page, form, and offer built to turn a click into a contact." },
      { title: "Wire follow-up", body: "Routing and tracking so nothing waits and nothing is lost." },
      { title: "Watch and tune", body: "We read the tracker weekly and tighten what underperforms." },
    ],
    outcomeTitle: "What changes",
    outcomeSub: "Proof, not promises. We track every lead so the result is visible, not assumed.",
    outcomes: ["Every lead caught and routed", "Reply in minutes, not hours", "One tracker, full visibility"],
    faq: [
      { q: "Do I pay for ads on top of your fee?", a: "Yes. Ad spend stays on your own account and goes to Google or Meta directly. Our fee is for building and managing the work. The two are always quoted on separate lines so you see exactly where the money goes." },
      { q: "What if I already get plenty of traffic?", a: "Then the leak is usually capture or follow-up, not traffic. We start where you actually lose leads, which is often the first reply, not the first click." },
      { q: "Who owns the ad account and the leads?", a: "You do. Every account, asset, and lead stays in your name. We work through delegated access, never raw passwords." },
    ],
  },

  websites: {
    slug: "websites",
    label: "Websites & Landing Pages",
    eyebrow: "Websites",
    icon: "LayoutGrid",
    serviceType: "Conversion-focused website and landing page design",
    metaDesc:
      "A fast, conversion-first website or landing page built on researched copy, with tracking and lead routing wired in from day one.",
    mock: "dashboard",
    heroTitle: "A site that turns visitors into booked calls",
    heroSub:
      "Not a brochure. A fast, conversion-first site built on researched copy, with tracking and lead routing wired in from day one. One page or a full website, one-time or on a monthly plan.",
    problemEyebrow: "The cost of a quiet site",
    problemTitle: "A pretty site that does not convert is a cost",
    problemSub:
      "If visitors land and leave, the problem is rarely the traffic. It is what the page asks them to do.",
    problems: [
      { icon: "Clock", title: "Slow to load", body: "People bounce before the page even finishes rendering." },
      { icon: "Layers", title: "Too many choices", body: "A menu of options means visitors choose nothing." },
      { icon: "Eye", title: "No tracking", body: "No way to see where attention drops or leads leak." },
      { icon: "Inbox", title: "Scattered forms", body: "Submissions land in places no one follows up from." },
    ],
    buildTitle: "What you get",
    buildSub: "A site engineered for the click, not just the look.",
    builds: [
      { icon: "PenTool", title: "Researched copy", body: "Headlines built from real customer language, approved by you." },
      { icon: "MousePointerClick", title: "One clear path", body: "Every section has one job: move the visitor to act." },
      { icon: "Gauge", title: "Sub-2 second load", body: "Custom build, compressed assets, no template bloat." },
      { icon: "LineChart", title: "Tracking and routing", body: "Lead capture wired to your inbox and your tracker." },
      { icon: "Search", title: "SEO and schema", body: "Meta tags and JSON-LD baked into every page." },
      { icon: "Repeat", title: "Monthly option", body: "Website-as-a-Service spreads the cost into a low monthly fee." },
    ],
    steps: [
      { title: "Research", body: "We learn your offer, your buyer, and your market." },
      { title: "Copy and design", body: "Section map and design locked, approved before build." },
      { title: "Build", body: "Mobile-first, fast, with tracking wired in." },
      { title: "Launch and measure", body: "We ship it, then watch how it converts." },
    ],
    outcomeTitle: "What changes",
    outcomeSub: "A site that earns its keep, measured from the first click.",
    outcomes: ["Loads in under two seconds", "One clear path to action", "Tracked from click to lead"],
    faq: [
      { q: "Do you write the copy or do I?", a: "We write it. Every section is researched and drafted for you, then approved before we build. You can bring your own copy if you prefer." },
      { q: "What do you build on?", a: "Custom code, not WordPress, Wix, or Squarespace. That is why pages load in under two seconds and never carry template bloat." },
      { q: "Can I spread the cost?", a: "Yes. Website-as-a-Service turns the build into a low monthly fee with ongoing support, instead of one large upfront payment." },
    ],
  },

  "ai-agents": {
    slug: "ai-agents",
    label: "AI Chat & Voice Agents",
    eyebrow: "AI Agents",
    icon: "MessagesSquare",
    serviceType: "AI chat and voice agent build",
    metaDesc:
      "A chat or voice agent trained on your business that answers, qualifies, and books around the clock, with a human in the loop for anything sensitive.",
    mock: "chat",
    heroTitle: "Answer every customer the minute they reach out",
    heroSub:
      "A chat or voice agent trained on your business. It answers questions, qualifies leads, and books appointments day and night, and hands off to a person for anything sensitive.",
    problemEyebrow: "The after-hours gap",
    problemTitle: "The questions never stop at 5pm",
    problemSub:
      "Most inbound happens when no one is free to answer. Every slow reply is a customer deciding you are not available.",
    problems: [
      { icon: "Clock", title: "After-hours questions", body: "Inquiries arrive at night and wait until morning." },
      { icon: "Repeat", title: "The same answers, daily", body: "Your team retypes the same replies all day long." },
      { icon: "Timer", title: "Slow qualification", body: "Good leads cool off before anyone gets to them." },
      { icon: "PhoneCall", title: "Missed inbound", body: "Calls and messages go unanswered and rarely come back." },
    ],
    buildTitle: "What it does",
    buildSub: "A controlled agent that does the repetitive work and knows when to bring in a human.",
    builds: [
      { icon: "MessagesSquare", title: "Website chat agent", body: "Trained on your business, answering on your site instantly." },
      { icon: "Filter", title: "Lead qualification", body: "Asks the right questions and sorts serious from casual." },
      { icon: "Calendar", title: "Booking handoff", body: "Books the appointment and drops it on the calendar." },
      { icon: "BadgeCheck", title: "Human in the loop", body: "Anything sensitive pauses for a person to approve." },
      { icon: "MessageCircle", title: "WhatsApp and voice", body: "Same agent on chat, WhatsApp, or as a voice line when scoped." },
      { icon: "ClipboardCheck", title: "Logs and tuning", body: "Every conversation logged, reviewed, and improved." },
    ],
    steps: [
      { title: "Name the task", body: "We pick one clear, repetitive job worth automating." },
      { title: "Write the rules", body: "We turn how you handle it into rules the agent follows." },
      { title: "Train and test", body: "We run real cases end to end before it goes live." },
      { title: "Launch with oversight", body: "It goes live with logging and human approval points." },
    ],
    outcomeTitle: "What changes",
    outcomeSub: "Controlled workflows with rules, logs, and human approval. No magic, no autonomous claims.",
    outcomes: ["First reply in seconds", "Booked while you sleep", "Nothing sensitive without a human"],
    faq: [
      { q: "Will it make things up?", a: "No. It runs on rules you approve, answers only what it is trained on, hands off to a person when unsure, and logs every conversation so you can see exactly what it said." },
      { q: "Can it take phone calls?", a: "Voice agents are available, but only when the workflow is clearly scoped and approved. We start with chat, prove it, then add voice if it fits." },
      { q: "Where does it work?", a: "On your website, on WhatsApp, or as a voice line. The same trained agent can cover more than one channel." },
    ],
  },

  automation: {
    slug: "automation",
    label: "Business Automation & Reporting",
    eyebrow: "Automation",
    icon: "Workflow",
    serviceType: "Business automation, workflow, and reporting system",
    metaDesc:
      "Structured workflows, approvals, tracking, and clean reporting so data stops getting lost and you stop being the bottleneck.",
    mock: "system",
    heroTitle: "Get your business out of your head and into a system",
    heroSub:
      "Structured workflows, approvals, tracking, and clean reporting. Data stops getting lost, follow-ups stop slipping, and you stop being the bottleneck for every report and decision.",
    problemEyebrow: "The owner bottleneck",
    problemTitle: "When everything routes through you, growth stalls",
    problemSub:
      "Most bottlenecks are not too much work. They are work with no system around it.",
    problems: [
      { icon: "Database", title: "Scattered data", body: "The truth lives in five tools and three people's heads." },
      { icon: "Repeat", title: "Missed follow-ups", body: "Things slip the moment the team gets busy." },
      { icon: "BarChart3", title: "Manual reporting", body: "Every report is built by hand, late, and out of date." },
      { icon: "AlertTriangle", title: "No audit trail", body: "No one can say who did what, or when, or why." },
    ],
    buildTitle: "What we build",
    buildSub: "A system with rules, approvals, and a clear record of everything.",
    builds: [
      { icon: "Database", title: "CRM cleanup", body: "One clean source of truth your team can trust." },
      { icon: "LineChart", title: "Dashboards", body: "Live numbers, no more building reports by hand." },
      { icon: "Send", title: "Follow-up systems", body: "Automated nudges so nothing waits on memory." },
      { icon: "BadgeCheck", title: "Approval workflows", body: "A human sign-off on anything that matters." },
      { icon: "ClipboardCheck", title: "Audit logs", body: "A full record of every action, end to end." },
      { icon: "Network", title: "Internal hub", body: "One place the whole team works from." },
    ],
    steps: [
      { title: "Map the workflow", body: "We trace one broken process from start to finish." },
      { title: "Design the system", body: "Rules, approvals, and tracking built around how you work." },
      { title: "Automate with approvals", body: "The repetitive parts run, the decisions stay human." },
      { title: "Report on what matters", body: "Live dashboards replace the manual scramble." },
    ],
    outcomeTitle: "What changes",
    outcomeSub: "We won't just add AI. We build structured systems with oversight so nothing falls through the cracks.",
    outcomes: ["Hours of manual work removed", "One source of truth", "Approvals and a full audit trail"],
    faq: [
      { q: "Will the AI run on its own?", a: "No. Every workflow has rules, a human approval point on anything that matters, and a full log. The goal is control and oversight, not autonomy." },
      { q: "Do I have to switch tools?", a: "Usually not. We work with the stack you already have and connect it, rather than forcing a rebuild you do not need." },
      { q: "Who owns and runs it after?", a: "You do. We build it, document it, and can help run it, but the system and its data are yours." },
    ],
  },

  ecommerce: {
    slug: "ecommerce",
    label: "Ecommerce & Shopify",
    eyebrow: "Ecommerce",
    icon: "ShoppingBag",
    serviceType: "Ecommerce and Shopify optimization",
    metaDesc:
      "For Shopify and DTC brands losing margin to a messy store: cleaner product pages, fixed SEO, consistent product data, and a theme that converts.",
    mock: "dashboard",
    heroTitle: "Keep more of every sale your store already makes",
    heroSub:
      "For Shopify and direct-to-consumer brands losing margin to a messy store. Cleaner product pages, fixed SEO, consistent product data, and a theme built to convert the traffic you already have.",
    problemEyebrow: "Where the margin leaks",
    problemTitle: "You are paying for traffic the store cannot keep",
    problemSub:
      "When a store is doing real revenue but feels stuck, the leak is usually inside the store, not in the ad account.",
    problems: [
      { icon: "ShoppingCart", title: "Weak product pages", body: "Pages that describe the product but never sell it." },
      { icon: "Search", title: "Thin SEO", body: "Listings that never surface when buyers search." },
      { icon: "Database", title: "Messy product data", body: "Inconsistent titles, tags, and specs across the catalog." },
      { icon: "AlertTriangle", title: "Broken theme", body: "A theme that breaks on mobile or buries the buy button." },
    ],
    buildTitle: "What we tune",
    buildSub: "A store audit and cleanup that turns more of every visit into a sale.",
    builds: [
      { icon: "ClipboardCheck", title: "Shopify audit", body: "A full review of where the store loses sales." },
      { icon: "ShoppingBag", title: "Product page optimization", body: "Pages rebuilt to convert, not just to display." },
      { icon: "Search", title: "SEO cleanup", body: "Listings and structure fixed so buyers find you." },
      { icon: "Database", title: "Product data cleanup", body: "A consistent, searchable, trustworthy catalog." },
      { icon: "Store", title: "Theme QA", body: "Fast, clean, and clear on every device." },
      { icon: "LineChart", title: "Ecommerce dashboard", body: "The numbers that matter, in one place." },
    ],
    steps: [
      { title: "Audit the store", body: "We find exactly where visits stop turning into orders." },
      { title: "Fix pages and data", body: "Product pages and catalog rebuilt to convert." },
      { title: "Tune SEO and theme", body: "Findability and speed fixed across the store." },
      { title: "Track and iterate", body: "A dashboard plus ongoing support to keep gaining." },
    ],
    outcomeTitle: "What changes",
    outcomeSub: "Less margin lost between the click and the checkout.",
    outcomes: ["More of every visit converted", "A clean, searchable catalog", "A dashboard you trust"],
    faq: [
      { q: "Do you only work on Shopify?", a: "Shopify is our focus because it is where most growing DTC brands run. If you are on another platform, we will tell you honestly whether we are the right fit." },
      { q: "My store is brand new, can you help?", a: "If there is no traffic and no products live yet, fixing the store is premature. We would point you to lead generation or a build first." },
      { q: "Is there ongoing support?", a: "Yes. Most brands keep a monthly support workflow for product launches, testing, and continued cleanup." },
    ],
  },

  "custom-systems": {
    slug: "custom-systems",
    label: "Custom Managed Systems",
    eyebrow: "Custom Systems",
    icon: "Boxes",
    serviceType: "Custom managed operating system",
    metaDesc:
      "A custom system with an integration layer, governed automation, and role-based views, designed in a paid discovery phase and run with you.",
    mock: "system",
    heroTitle: "One operating system, built and run around your business",
    heroSub:
      "For teams that off-the-shelf tools do not fit. A custom system with an integration layer, governed automation, and role-based views, designed in a paid discovery phase and run with you, not handed over and forgotten.",
    problemEyebrow: "When tools stop fitting",
    problemTitle: "Disconnected tools become their own bottleneck",
    problemSub:
      "Past a certain size, stitched-together tools cost more in lost time and bad handoffs than a real system would.",
    problems: [
      { icon: "Boxes", title: "No central system", body: "Work lives in a dozen disconnected places." },
      { icon: "Network", title: "Bad handoffs", body: "Things break every time work moves between teams." },
      { icon: "AlertTriangle", title: "No governance", body: "No rules, roles, or record for who can do what." },
      { icon: "Database", title: "No source of truth", body: "Every team trusts a different version of the data." },
    ],
    buildTitle: "What we build",
    buildSub: "A governed system designed for your business, not bent to fit a template.",
    builds: [
      { icon: "Boxes", title: "Custom app", body: "Built for your exact workflow, not a generic tool." },
      { icon: "Network", title: "Integration layer", body: "Your existing tools connected into one flow." },
      { icon: "Database", title: "Control ledger", body: "A single trusted record at the center of it all." },
      { icon: "Workflow", title: "Governed automation", body: "Automation with rules, limits, and approvals." },
      { icon: "Users", title: "Role-based views", body: "Each person sees and does exactly what they should." },
      { icon: "Eye", title: "Run and govern", body: "We help operate it and keep it healthy as you grow." },
    ],
    steps: [
      { title: "Paid discovery", body: "We map scope, cost, and architecture before any build." },
      { title: "Architecture", body: "A clear plan you approve, phased and priced." },
      { title: "Phased build", body: "We ship in stages so value lands early." },
      { title: "Run and govern", body: "We operate it with you, with no unsafe live changes." },
    ],
    outcomeTitle: "What changes",
    outcomeSub: "A system that scales with you, with governance and an owner for every part.",
    outcomes: ["Tools connected, handoffs clean", "Governed, role-based access", "A system that scales with you"],
    faq: [
      { q: "Where do we start?", a: "With a paid discovery phase. We map scope, cost, and architecture before any build, so you are never paying for open-ended work that never closes." },
      { q: "How long does it take?", a: "It is phased on purpose. We scope the first stage to deliver real value early, then build the rest in steps you approve." },
      { q: "Who runs it after launch?", a: "We can run and govern it with you. No unsafe live changes happen without approval, and access is delegated, never raw passwords." },
    ],
  },
};

export const serviceSlugs = Object.keys(servicesData);
