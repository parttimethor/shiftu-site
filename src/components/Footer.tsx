import Link from "next/link";
import { site, servicesMenu, featuredService, programsMenu } from "@/lib/site";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

const company = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = 2026;
  const services = [
    ...servicesMenu.flatMap((g) => g.items),
    featuredService,
  ];

  return (
    <footer className="relative overflow-hidden bg-ink-dark text-white">
      <div className="pointer-events-none absolute inset-0 mesh-glow opacity-60" />
      <div className="container relative py-section-sm">
        {/* Top: brand + CTA */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-md">
            <Logo tone="white" className="text-2xl" />
            <p className="mt-4 text-lg font-medium text-white/90">
              {site.tagline}
            </p>
            <p className="mt-2 text-sm text-white/60">{site.oneLiner}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={site.cta.primary.href} arrow>
              {site.cta.primary.label}
            </Button>
            <Button href={site.cta.secondary.href} variant="onDark">
              {site.cta.secondary.label}
            </Button>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <FooterCol title="Services" links={services} />
          <FooterCol title="Team training" links={programsMenu} />
          <FooterCol title="Company" links={company} />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-white/40">
              Get in touch
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Icon name="Mail" size={16} /> {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsapp}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Icon name="MessageCircle" size={16} /> WhatsApp
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Icon name="MapPin" size={16} /> Canada
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {year} Shift Ü. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-white/40">
        {title}
      </p>
      <ul className="space-y-2 text-sm text-white/70">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
