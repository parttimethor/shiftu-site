import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { IntroOverlay } from "@/components/IntroOverlay";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shiftu.ca"),
  title: {
    default: "Shift Ü — Find the bottleneck. Build the system. Run it for you.",
    template: "%s | Shift Ü",
  },
  description:
    "Managed, done-for-you AI ops and digital systems. We find the bottleneck in your business, build the system that removes it, and help run it until it works.",
  openGraph: {
    type: "website",
    title: "Shift Ü — Find the bottleneck. Build the system. Run it for you.",
    description:
      "Managed AI ops and digital systems. We find the bottleneck, build the system that removes it, and help run it.",
    url: "https://shiftu.ca",
    siteName: "Shift Ü",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Shift Ü" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift Ü — Find the bottleneck. Build the system. Run it for you.",
    description: "Managed AI ops and digital systems, done for you and run with you.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shift Ü",
    url: "https://shiftu.ca",
    description:
      "Managed, done-for-you AI ops and digital systems company. We find the bottleneck, build the system that removes it, and help run it.",
    areaServed: ["Canada"],
    sameAs: [],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <MotionConfig reducedMotion="user">
          <IntroOverlay />
          <SmoothScroll>
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <ChatWidget />
        </MotionConfig>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
