# Reframing Infidelity — static site

Self-contained static export of the MailerLite landing page for **reframinginfidelity.love**, intended for GitHub Pages (or any static host) without depending on MailerLite’s page runtime.

## Origin

- Source: published MailerLite page HTML captured from the live/rendered page for site/page IDs under account `994210` (editor: Nebula / MailerLite Sites).
- Images were pulled from `storage.mlcdn.com` / `assets.mlcdn.com` and rewritten to local `assets/img/` and `assets/icons/`.
- MailerLite tracking, personalization (`universal.js` / JSONP), heatmap, and reCAPTCHA scripts were removed so the page works offline/static.
- Brand CSS (inline utility + design tokens) and layout markup were preserved; no new marketing copy was added.
- Fonts: **Inter** and **Merriweather** via Google Fonts CDN (replacing `fonts.mailerlite.com`).

## Open locally

From the repository root:

```bash
python3 -m http.server 8080
```

Then open http://127.0.0.1:8080/

Or open `index.html` directly in a browser (some browsers restrict font CDN/`file://`; the local server is preferred).

## GitHub Pages

- `CNAME` is set to `reframinginfidelity.love`.
- Serve the repository root as the Pages root (`/` on the default branch). Relative asset paths assume the site root.
- A `.nojekyll` file is included so Pages publishes the files as-is.

## Forms (important)

Subscribe / discovery / contact forms still use MailerLite `action` URLs on `dashboard.mailerlite.com` (`…/subscribe` and `…/contact` with signatures). That can keep working while DNS still points at MailerLite or while those endpoints accept public POSTs.

**After leaving MailerLite**, those posts will break. Rewire later to your own subscribe / discovery / contact handlers (or a form service). Apply buttons that point at the Google Form are unchanged and do not depend on MailerLite.

reCAPTCHA UI was stripped for static hosting; native browser form POST is used instead of MailerLite’s XHR + reCAPTCHA flow.

## Social links (preserved)

- Carolee: Facebook profile `61553743413386`, Instagram `instagram.com/caroleebeckham`
- Britton: as in the original HTML (Facebook, Instagram/veritas.sounds, X)

## Layout

```
index.html
CNAME
README.md
.nojekyll
assets/
  css/universal.css
  icons/   (favicon + social icons)
  img/     (page images + OG image)
```
