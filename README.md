# Reframing Infidelity — static site

Landing page for **reframinginfidelity.love**, a program from [The Magical Story of Us](https://themagicalstoryofus.com/) (Britton & Carolee Beckham). Plain HTML, CSS, and vanilla JS, hosted on GitHub Pages.

## Origin

- First built as a static export of the MailerLite landing page (account `994210`), with images pulled from `storage.mlcdn.com` / `assets.mlcdn.com` into `assets/img/`.
- The current design follows the main site's brand: black, white, and gold, Cormorant Garamond for headings and Manrope for body text (Google Fonts), and the circular sigil logo in `assets/brand/`.
- The header and footer link back to themagicalstoryofus.com.

## Open locally

From the repository root:

```bash
python -m http.server 8090
```

Then open http://localhost:8090/

## GitHub Pages

- `CNAME` is set to `reframinginfidelity.love`.
- Serve the repository root as the Pages root (`/` on the default branch). Relative asset paths assume the site root.
- A `.nojekyll` file is included so Pages publishes the files as-is.

## Forms (important)

The discovery-call, contact, and mailing-list forms POST to MailerLite `action` URLs on `dashboard.mailerlite.com` (`…/subscribe` and `…/contact` with signatures), using MailerLite's field names (`fields.email`, `fields.name`, `fields.message`, `fields.source_form`, `contact_email`).

`assets/js/site.js` sends each form into a hidden frame so the visitor stays on the page and sees a thank-you message. With JavaScript off, the form does a normal full-page POST to the same URL.

**After leaving MailerLite**, those posts will break. Rewire them to your own subscribe / discovery / contact handlers (or a form service). The Apply buttons point at the Google Form and do not depend on MailerLite.

Old MailerLite section anchors (`#Pricing-4`, `#FAQ-4`, `#Side-by-side-image-content-2`, `#People-5`, `#Listed-items-on-side-2`) still land on the matching sections.

## Social links

- Carolee: Facebook profile `61553743413386`, Instagram `instagram.com/caroleebeckham`
- Britton: Facebook `brittonleebeckham`, Instagram `veritas.sounds`, X `BrittonBeckham`
- The Magical Story of Us: Instagram, TikTok, Spotify podcast, and email in the footer

## Layout

```
index.html
CNAME
README.md
.nojekyll
assets/
  css/site.css      (page styles)
  js/site.js        (menu, forms, reveal on scroll)
  brand/            (sigil logo, also used as the favicon)
  img/              (page images + OG image; not every image is used on the page)
  icons/, css/universal.css   (from the MailerLite export, unused)
```
