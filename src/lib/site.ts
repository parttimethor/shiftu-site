// RSC-safe config. No "use client". Icons are STRING names resolved by <Icon/>.
// Never store live icon components here (avoids server->client function props).

export type NavLeaf = {
  label: string;
  href: string;
  desc: string;
  icon: string;
  price?: string;
};

export type NavGroup = {
  heading: string;
  items: NavLeaf[];
};

export const site = {
  name: "Shift Ü",
  domain: "https://shiftu.ca",
  tagline: "Find the bottleneck. Build the system. Run it for you.",
  oneLiner:
    "We find what is slowing your business down, build the system that removes it, and help run it until it works.",
  cta: {
    primary: { label: "Book a call", href: "/contact#book" },
    secondary: { label: "See our work", href: "/work" },
  },
  contact: {
    email: "hello@shiftu.ca",
    whatsapp: "https://wa.me/0000000000", // [PLACEHOLDER: WhatsApp number — or remove the WhatsApp CTAs]
    bookingNote: "We reply within one business day.",
  },
  social: {
    instagram: "#", // [PLACEHOLDER]
    linkedin: "#", // [PLACEHOLDER]
  },
} as const;

// The menu. Six service categories, grouped by the offer ladder.
// No prices here on purpose: the site leads with value, not numbers.
export const servicesMenu: NavGroup[] = [
  {
    heading: "Get found, get leads",
    items: [
      {
        label: "Lead Generation Systems",
        href: "/services/lead-generation",
        desc: "A page, a form, and follow-up that catches every lead.",
        icon: "Magnet",
      },
      {
        label: "Websites & Landing Pages",
        href: "/services/websites",
        desc: "A fast site that turns visitors into booked calls.",
        icon: "LayoutGrid",
      },
    ],
  },
  {
    heading: "Automate the busywork",
    items: [
      {
        label: "AI Chat & Voice Agents",
        href: "/services/ai-agents",
        desc: "Answers, qualifies, and books, day and night.",
        icon: "MessagesSquare",
      },
      {
        label: "Business Automation & Reporting",
        href: "/services/automation",
        desc: "Workflows, approvals, tracking, and clean reporting.",
        icon: "Workflow",
      },
    ],
  },
  {
    heading: "Grow and scale",
    items: [
      {
        label: "Ecommerce & Shopify",
        href: "/services/ecommerce",
        desc: "A store tuned to keep more of every sale.",
        icon: "ShoppingBag",
      },
      {
        label: "Custom Managed Systems",
        href: "/services/custom-systems",
        desc: "One operating system built and run around your business.",
        icon: "Boxes",
      },
    ],
  },
];

// Flagship banner in the menu + footer. Routes to the discovery call,
// because every engagement starts by finding the real bottleneck.
export const featuredService: NavLeaf = {
  label: "Find your bottleneck",
  href: "/contact",
  desc: "A short call to map the one system that frees you up first.",
  icon: "Search",
};

// Team training is a support to the work, available on request.
// Not a sold, fixed-price SKU. No pricing shown.
export const programsMenu: NavLeaf[] = [
  {
    label: "Team AI Training",
    href: "/programs/private-team-training",
    desc: "Get your people confident running the systems we build.",
    icon: "Users",
  },
  {
    label: "Operator Onboarding",
    href: "/programs/ai-operator-certification",
    desc: "Hands-on onboarding for the person who owns the system.",
    icon: "GraduationCap",
  },
  {
    label: "Adoption & Rollout",
    href: "/programs/workforce-transformation",
    desc: "Help the whole team adopt new workflows without friction.",
    icon: "Building2",
  },
];

// Value-first nav: no price in the top bar. Pricing + training live
// deeper, after the visitor sees what we actually do.
export const primaryNav = [
  { label: "Services", href: "/services", hasMenu: "services" as const },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];
