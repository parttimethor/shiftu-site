# Shift Ü — Marketing Site

Standalone marketing site for Shift Ü. Plain HTML/CSS/JS, **no build step**, deploys as static files (GitHub Pages / Vercel / any static host).

```
shiftu-site/
├── index.html          # homepage — playable product console + animated mascot
├── product.html        # how it works + live demo + platform
├── industries.html     # the 5 verticals
├── company.html        # mission, values, team
├── contact.html        # mailto-based demo request form
├── css/styles.css      # dark theme; brand tokens at the top of the file
├── js/main.js          # all interactions, vanilla JS (no framework, no deps)
└── assets/             # logo, favicon, mascot (Thomas)
```

## Run locally

```bash
cd shiftu-site
python3 -m http.server 8000     # or: npx live-server --port=8000
# open http://localhost:8000
```

(Also opens directly via `file://` — no server strictly required.)

## Highlights

- **Playable hero console** — visitors message Shift Ü like a customer (type or tap a preset) and watch the 5-stage pipeline light up, a reply type in, and status chips resolve.
- **Animated mascot (Thomas)** — floats + breathes in the hero, follows the cursor, bounces on click; also the face of the "Ask Shift Ü" assistant on every page.
- Space Grotesk (display) + DM Sans (body) + Poppins (wordmark) via Google Fonts.
- Respects `prefers-reduced-motion`; responsive; no third-party JS.

## Deploy

**GitHub Pages:** push to the default branch, then Settings → Pages → deploy from branch root. Served at `https://<user>.github.io/<repo>/`.

**Custom domain (`shiftu.io`):** add a `CNAME` file with the domain and point DNS at GitHub Pages (or use Vercel: framework = Other, no build command).

## Editing

Brand colors + type live in the `:root` block at the top of `css/styles.css`. The hero console scenarios and the assistant FAQ both live in `js/main.js`.
