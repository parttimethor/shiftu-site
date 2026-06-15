"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  site,
  primaryNav,
  servicesMenu,
  featuredService,
  programsMenu,
} from "@/lib/site";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { IconChip } from "./ui/IconChip";
import { ThemeToggle } from "./ui/ThemeToggle";
import { cn } from "@/lib/cn";

const EASE = [0, 0, 0.58, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<null | "services" | "programs">(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <motion.header
      initial={{ y: -110, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="flex justify-center px-3">
        <nav
          className={cn(
            "mx-auto flex w-full items-center justify-between gap-4 transition-all duration-300 ease-out",
            scrolled
              ? "mt-3 h-14 max-w-[1080px] rounded-full border border-hair bg-base/70 px-3 pl-5 shadow-pill backdrop-blur-md supports-[backdrop-filter]:bg-base/60"
              : "mt-0 h-20 max-w-content rounded-none border border-transparent bg-transparent px-5 lg:px-10",
          )}
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <li
                key={item.href}
                onMouseEnter={() =>
                  setOpen(item.hasMenu ? (item.hasMenu as "services" | "programs") : null)
                }
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:text-ink",
                    open === item.hasMenu && "text-ink",
                  )}
                >
                  {item.label}
                  {item.hasMenu && (
                    <Icon
                      name="ChevronDown"
                      size={15}
                      className={cn(
                        "mt-0.5 text-muted-soft transition-transform duration-200",
                        open === item.hasMenu && "rotate-180",
                      )}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button href={site.cta.primary.href} size="sm" arrow>
              {site.cta.primary.label}
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle className="h-9 w-9" />
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
              onClick={() => setMobile((v) => !v)}
              aria-label="Toggle menu"
            >
              <Icon name={mobile ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mega menus (desktop) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full hidden justify-center px-3 md:flex"
            onMouseEnter={() => setOpen(open)}
          >
            <div className="mt-2 w-full max-w-[1080px] overflow-hidden rounded-panel border border-hair bg-base/90 p-6 shadow-s4 backdrop-blur-xl">
              {open === "services" ? <MegaServices /> : <MegaPrograms />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobile && <MobileMenu onClose={() => setMobile(false)} />}
      </AnimatePresence>
    </motion.header>
  );
}

function MegaServices() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-1">
        {servicesMenu.map((group) => (
          <div key={group.heading}>
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-soft">
              {group.heading}
            </p>
            <ul className="mb-2">
              {group.items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="group flex items-start gap-3 rounded-tile p-2 transition-colors hover:bg-surface"
                  >
                    <IconChip name={it.icon} />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold text-ink">
                          {it.label}
                        </span>
                        {it.price && (
                          <span className="font-mono text-[11px] text-blue">
                            {it.price}
                          </span>
                        )}
                      </span>
                      <span className="block text-[13px] leading-snug text-muted">
                        {it.desc}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link
        href={featuredService.href}
        className="mt-2 flex items-center justify-between gap-4 rounded-tile border border-hair bg-gradient-to-r from-blue/[0.06] to-blue/[0.02] p-4 transition-colors hover:from-blue/10"
      >
        <span className="flex items-center gap-3">
          <IconChip name={featuredService.icon} size="lg" />
          <span>
            <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              {featuredService.label}
              <span className="rounded-full bg-blue px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Flagship
              </span>
            </span>
            <span className="block text-[13px] text-muted">
              {featuredService.desc}
            </span>
          </span>
        </span>
        <Icon name="ArrowRight" className="text-blue" />
      </Link>
    </div>
  );
}

function MegaPrograms() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {programsMenu.map((p) => (
        <Link
          key={p.href}
          href={p.href}
          className="group flex flex-col gap-3 rounded-tile border border-hair p-4 transition-colors hover:bg-surface"
        >
          <IconChip name={p.icon} size="lg" />
          <div>
            <span className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-ink">{p.label}</span>
            </span>
            <span className="mt-1 block text-[13px] leading-snug text-muted">
              {p.desc}
            </span>
          </div>
          <span className="mt-auto font-mono text-sm font-medium text-blue">
            {p.price}
          </span>
        </Link>
      ))}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 top-0 z-40 h-[100dvh] overflow-y-auto bg-base px-5 pb-10 pt-24 md:hidden"
    >
      <div className="space-y-8">
        <MobileGroup title="Services">
          {servicesMenu.flatMap((g) => g.items).concat(featuredService).map((it) => (
            <MobileLink key={it.href} href={it.href} label={it.label} desc={it.desc} icon={it.icon} onClose={onClose} />
          ))}
        </MobileGroup>
        <ul className="space-y-1 border-t border-hair pt-6">
          {[
            { label: "Work", href: "/work" },
            { label: "About", href: "/about" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onClose}
                className="block rounded-tile px-2 py-3 text-lg font-semibold text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button href={site.cta.primary.href} size="lg" arrow className="w-full" magnetic={false}>
          {site.cta.primary.label}
        </Button>
      </div>
    </motion.div>
  );
}

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-soft">
        {title}
      </p>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function MobileLink({
  href,
  label,
  desc,
  icon,
  onClose,
}: {
  href: string;
  label: string;
  desc: string;
  icon: string;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className="flex items-center gap-3 rounded-tile px-2 py-2.5"
      >
        <IconChip name={icon} />
        <span>
          <span className="block text-[15px] font-semibold text-ink">{label}</span>
          <span className="block text-[13px] text-muted">{desc}</span>
        </span>
      </Link>
    </li>
  );
}
