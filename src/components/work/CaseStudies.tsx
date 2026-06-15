import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Case = {
  name: string;
  meta: string;
  url: string;
  image: string;
  oneLiner: string;
  built: string[];
  tags: string[];
};

const cases: Case[] = [
  {
    name: "Ridgeline Roast",
    meta: "Specialty coffee roaster · Alberta, Canada",
    url: "https://ridgelineroast.com",
    image: "/img/work/ridgeline.png",
    oneLiner: "A connected operating system across the whole roastery, not just a website.",
    built: [
      "A custom B2B wholesale portal: cafes and offices log in, reorder, manage delivery addresses, and pull PDF order documents.",
      "An internal inventory and sales app: live stock by product and location, low-stock alerts, transfers, and revenue dashboards.",
      "One system that ties a wholesale order back to live roasting inventory, end to end.",
    ],
    tags: ["Custom Systems", "Ecommerce", "Automation"],
  },
  {
    name: "Crown Signs",
    meta: "Commercial signage · Edmonton, Canada",
    url: "https://crownsigns.ca",
    image: "/img/work/crown.png",
    oneLiner: "A signage company's site that turns a storefront idea into a booked quote.",
    built: [
      "A fast, conversion-focused website that shows the work and the process.",
      "A quote-request flow built around how signs get scoped: type, size, install, timeline.",
      "Lead capture and routing so every request lands in one place, fast.",
      "Design, fabrication, permits, and install told as one clear story.",
    ],
    tags: ["Websites", "Lead Generation"],
  },
  {
    name: "Magnética",
    meta: "Activewear ecommerce brand · DTC",
    url: "https://shopmagnetica.com",
    image: "/img/work/magnetica.png",
    oneLiner: "A clean, conversion-first store that lets the product carry the page.",
    built: [
      "A conversion-focused ecommerce store built around the collection.",
      "Product and collection pages tuned to convert, fast on mobile.",
      "A brand-led design with the look the activewear line deserves.",
      "Set up to scale as new drops launch.",
    ],
    tags: ["Ecommerce", "Websites", "Branding"],
  },
];

export function CaseStudies() {
  return (
    <div className="space-y-20 lg:space-y-28">
      {cases.map((c, i) => (
        <div
          key={c.name}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Screenshot */}
          <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-panel border border-hair shadow-s4"
            >
              <div className="relative aspect-[16/10] w-full bg-surface">
                <Image
                  src={c.image}
                  alt={`${c.name} website`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </a>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.1} className={cn(i % 2 === 1 && "lg:order-1")}>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-soft">
              {c.meta}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{c.name}</h3>
            <p className="mt-3 max-w-prose text-lg text-ink/80">{c.oneLiner}</p>

            <p className="mt-6 text-sm font-semibold text-ink">What we built</p>
            <ul className="mt-3 space-y-2.5">
              {c.built.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                    <Icon name="Check" size={13} />
                  </span>
                  <span className="text-[15px] text-muted">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-hair bg-card px-3 py-1 text-xs font-medium text-ink/70"
                >
                  {t}
                </span>
              ))}
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-bright"
              >
                Visit site
                <Icon name="ArrowUpRight" size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
