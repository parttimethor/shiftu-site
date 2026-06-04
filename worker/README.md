# Shift Ü console brain (optional backend)

This makes the homepage console *actually intelligent*. Without it, the console
runs fully scripted (keyword routing) and the site works fine. With it, anything
a visitor types gets a real, bounded model reply. The pipeline animation and
status chips stay local, so the visual stays deterministic; only the reply text
becomes smart.

It is a single Cloudflare Worker that proxies to the Anthropic API so your API
key never touches the browser.

## What you need
- A Cloudflare account (free tier is plenty).
- An Anthropic API key (console.anthropic.com).
- ~2 minutes.

## Setup (wrangler, recommended)

```bash
cd worker
npm install -g wrangler         # if you don't have it
wrangler login                  # opens the browser once
wrangler secret put ANTHROPIC_API_KEY   # paste your key when prompted
wrangler deploy                 # prints your URL, e.g. https://shiftu-console.<acct>.workers.dev
```

`wrangler.toml` already sets `ALLOWED_ORIGIN` to the live site origin
(`https://parttimethor.github.io`). Change it if you move to `shiftu.io`.

### Or via the dashboard (no CLI)
1. Workers & Pages -> Create -> Worker -> name it `shiftu-console` -> Deploy.
2. Edit code -> paste the contents of `shiftu-console.js` -> Save & Deploy.
3. Settings -> Variables -> add **secret** `ANTHROPIC_API_KEY` = your key.
4. Settings -> Variables -> add **plaintext** `ALLOWED_ORIGIN` = `https://parttimethor.github.io`.

## Turn it on for the site
Add this one line to each page's `<head>` **before** `js/main.js`
(swap in your Worker URL):

```html
<script>window.SHIFTU_CONSOLE_API = "https://shiftu-console.<acct>.workers.dev";</script>
```

That's it. If the endpoint is unset, errors, or times out (9s), the console
silently falls back to the scripted reply, so the site never breaks.

## Test it
```bash
curl -X POST https://shiftu-console.<acct>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"message":"do you have a 2023 RAV4 and whats the price"}'
# -> {"reply":"..."}
```

## Cost + abuse
- Model is `claude-haiku-4-5` with `max_tokens: 160`, so each message costs a
  fraction of a cent. Message input is capped at 500 chars server-side.
- Recommended: add a Cloudflare **Rate limiting** rule on the Worker route
  (e.g. 20 requests / minute / IP) so a bored visitor can't run up a bill.
- `ALLOWED_ORIGIN` restricts the browser to your site; for harder locking,
  also check the `Origin` header inside the Worker.
