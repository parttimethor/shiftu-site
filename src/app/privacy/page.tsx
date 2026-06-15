import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Shift Ü collects, uses, and protects the information you share through our contact form. We do not sell your data.",
};

const lastUpdated = "June 15, 2026";
const contactEmail = site.contact.email;

export default function PrivacyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "How Shift Ü collects, uses, and protects the information you share through our contact form.",
    publisher: { "@type": "Organization", name: "Shift Ü" },
  };

  return (
    <>
      <PageHero
        align="center"
        eyebrow="Legal"
        title="Privacy Policy"
        subhead="Plain English on what we collect, why we collect it, and the choices you have. We do not sell your data."
      />

      <Section tone="white">
        <Container size="narrow">
          <Reveal>
            <article className="max-w-prose space-y-12">
              <p className="text-sm font-mono text-muted-soft">
                Last updated: {lastUpdated}
              </p>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">Who we are</h2>
                <p className="text-muted">
                  Shift Ü builds websites and AI tools for businesses in
                  Canada. This policy covers the information you
                  share with us through this website, mainly our contact form.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">Data we collect</h2>
                <p className="text-muted">
                  When you submit our contact form, we collect only what you
                  type into it:
                </p>
                <ul className="space-y-2 text-muted">
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Your name
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Your business name
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Your email address
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    The message you write to us
                  </li>
                </ul>
                <p className="text-muted">
                  We do not ask for sensitive information, and you should not
                  send any through the form.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">
                  How we use your data
                </h2>
                <p className="text-muted">
                  We use the information you send for a single purpose: to read
                  your message and reply to you. We may use your email to follow
                  up about your enquiry or a project you start with us. We do not
                  send marketing emails unless you ask us to.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">
                  Third-party processors
                </h2>
                <p className="text-muted">
                  A few trusted services help us run this website and deliver
                  your messages. They process data on our behalf:
                </p>
                <ul className="space-y-2 text-muted">
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    FormSubmit, which delivers your contact form submission to
                    our inbox.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Vercel, our hosting provider, which serves this website and
                    keeps standard server logs.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Analytics, if enabled, to count visits in aggregate. It does
                    not identify you personally. [REVIEW: confirm if analytics is
                    used]
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">
                  We do not sell your data
                </h2>
                <p className="text-muted">
                  We never sell, rent, or trade your personal information. We
                  share it only with the processors above, and only so we can
                  reply to you and run the site.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">
                  Cookies and local storage
                </h2>
                <p className="text-muted">
                  This site uses only the essential cookies and local storage
                  needed to function, such as remembering your language choice.
                  We do not use advertising or cross-site tracking cookies. You
                  can clear these at any time in your browser settings.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">Retention</h2>
                <p className="text-muted">
                  We keep your message and contact details only as long as we
                  need them to reply and to manage any work that follows. When
                  they are no longer needed, we delete them. You can ask us to
                  delete them sooner at any time.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">Your rights</h2>
                <p className="text-muted">
                  You can ask us to:
                </p>
                <ul className="space-y-2 text-muted">
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Access the personal information we hold about you.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Correct anything that is wrong or out of date.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue">·</span>
                    Delete your information from our records.
                  </li>
                </ul>
                <p className="text-muted">
                  To make a request, email us and we will respond promptly.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">Contact</h2>
                <p className="text-muted">
                  Questions about this policy or your data? Reach us at{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-blue underline-offset-4 hover:underline"
                  >
                    {contactEmail}
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-ink">
                  Changes to this policy
                </h2>
                <p className="text-muted">
                  We may update this policy as our services change. When we do,
                  we will revise the date at the top of this page.
                </p>
              </section>
            </article>
          </Reveal>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
