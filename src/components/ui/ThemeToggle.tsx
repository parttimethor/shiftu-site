"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-hair text-ink transition-colors hover:bg-surface",
        className,
      )}
    >
      {/* Avoid hydration mismatch flicker by only swapping icon after mount */}
      <Icon name={mounted && dark ? "Sun" : "Moon"} size={18} />
    </button>
  );
}
