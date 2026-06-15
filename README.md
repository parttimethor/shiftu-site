# Shift Ü — Website

Marketing site for **Shift Ü** ("Find the bottleneck. Build the system. Run it for you."). Next.js 14 (App Router) + TypeScript + Tailwind, with a serverless backend that funnels every contact request and call booking into a **Google Sheet tracker** in your Workspace (plus an optional email ping). Built to deploy on **Vercel** at **shiftu.ca**.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you want to test; all keys are optional
npm run dev                  # http://localhost:3000
```

`npm run build && npm run start` runs the production build locally.

## How leads work

Both forms — "Book a call" (`/api/book`) and "Send the details" (`/api/contact`) — post to the backend, which runs `recordLead()` (`src/lib/leads.ts`). Every lead fans out to two independent, best-effort channels:

1. **Google Sheet tracker** (the system of record) via a Google Apps Script Web App — `LEADS_WEBHOOK_URL`. No Google Cloud project or service account; the script runs as you and appends a row. Setup lives in **`scripts/leads-tracker.gs`**.
2. **Email notification** (optional) via Resend — `RESEND_API_KEY` + `CONTACT_TO`.

If nothing is configured the forms still succeed for the visitor and the lead is logged server-side (visible in Vercel logs), so a lead is never lost to a UI error. Validation + a honeypot run before anything is recorded.

### Environment variables

See `.env.example`. All are server-side only (no `NEXT_PUBLIC_`).

| Variable | Purpose | Required for |
| --- | --- | --- |
| `LEADS_WEBHOOK_URL` | Apps Script `/exec` URL — appends leads to your Sheet | Capturing leads |
| `LEADS_WEBHOOK_TOKEN` | Shared secret guarding the webhook | Capturing leads |
| `RESEND_API_KEY` | Resend API key for the email ping | Email notification |
| `CONTACT_TO` | Inbox that receives lead emails (your Gmail) | Email notification |
| `CONTACT_FROM` | Sender; defaults to `onboarding@resend.dev` | — |
| `ANTHROPIC_API_KEY` | Powers the on-site chat widget (Claude Haiku) | Chat replies |

## Deploy to Vercel (shiftu.ca)

1. **Connect the repo** — Vercel ▸ Add New ▸ Project ▸ import `parttimethor/shiftu-site`. Framework auto-detects as Next.js (config in `vercel.json`). No build settings to change.
2. **Set the leads tracker** — follow `scripts/leads-tracker.gs` (≈3 min) to create the Sheet + deploy the Apps Script, then add `LEADS_WEBHOOK_URL` and `LEADS_WEBHOOK_TOKEN` in Vercel ▸ Settings ▸ Environment Variables.
3. **(Optional) Email ping** — add `RESEND_API_KEY` + `CONTACT_TO` (your Gmail). To send from `noreply@shiftu.ca`, verify the domain in Resend and set `CONTACT_FROM`.
4. **(Optional) Chat** — add `ANTHROPIC_API_KEY`.
5. **Add the domain** — Vercel ▸ Settings ▸ Domains ▸ add `shiftu.ca` (and `www.shiftu.ca`), then point DNS at Vercel per its instructions.
6. **Display email** — the site shows `hello@shiftu.ca`. Set up a forward from that address to your Gmail at your domain/registrar, or change `site.contact.email` in `src/lib/site.ts`.
7. **Deploy** — push to the production branch (or promote a deployment). Submit the contact form once to confirm a row lands in the Sheet.

## Project structure

```
src/app/            # routes (App Router): home, services, programs, work, pricing, contact, legal
src/app/api/        # contact, book (lead intake), chat (assistant)
src/components/     # UI + section components
src/lib/            # site config, leads pipeline, services data
scripts/            # leads-tracker.gs (Apps Script) + Playwright screenshot helpers
public/             # brand assets, OG image
```

Brand/site config (name, domain, contact, nav, services menu) lives in `src/lib/site.ts`.
