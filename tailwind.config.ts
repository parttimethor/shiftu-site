import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2.5rem", xl: "4rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        base: "rgb(var(--bg) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          soft: "rgb(var(--fg-soft) / <alpha-value>)",
          dark: "rgb(var(--ink-dark) / <alpha-value>)",
        },
        blue: {
          DEFAULT: "#003EFD",
          bright: "#2B5BFF",
          press: "#0029C7",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          soft: "rgb(var(--muted-soft) / <alpha-value>)",
        },
        hair: "var(--hair)",
      },
      fontFamily: {
        display: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        chip: "11px",
        tile: "12px",
        card: "16px",
        panel: "24px",
      },
      boxShadow: {
        s1: "0 1px 3px rgba(16,16,63,0.04)",
        s2: "0 4px 8px -2px rgba(16,16,63,0.06), 0 2px 4px -2px rgba(16,16,63,0.04)",
        s3: "0 12px 16px -4px rgba(16,16,63,0.08), 0 4px 6px -2px rgba(16,16,63,0.03)",
        s4: "0 24px 48px -12px rgba(16,16,63,0.18)",
        ring: "0 0 0 1px rgba(16,16,63,0.08)",
        pill: "0 4px 8px -2px rgba(16,16,63,0.06), 0 2px 4px -2px rgba(16,16,63,0.04)",
      },
      maxWidth: {
        prose: "70ch",
        content: "1200px",
      },
      spacing: {
        section: "120px",
        "section-sm": "96px",
        "section-xs": "64px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0,0,0.58,1)",
        pop: "cubic-bezier(0.34,1.56,0.64,1)",
        soft: "cubic-bezier(0.35,0.17,0.3,0.86)",
      },
      keyframes: {
        "drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -2%, 0) scale(1.05)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
