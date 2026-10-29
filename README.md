# Reframing Infidelity — static site

Landing page for **reframinginfidelity.love**, a program from [The Magical Story of Us](https://themagicalstoryofus.com/) (Britton & Carolee Beckham). Plain HTML, CSS, and vanilla JS, hosted on GitHub Pages.

## Origin

- First built as a static export of the MailerLite landing page (account `994210`), with images pulled from `storage.mlcdn.com` / `assets.mlcdn.com` into `assets/img/`.
- The page uses the shared **program template** (`assets/css/program.css`, `assets/js/program.js`). Program sites belong to The Magical Story of Us family, and each one has its own identity:
  - A slim black parent strip at the top: "A program from [sigil] The Magical Story of Us", linking to themagicalstoryofus.com.
  - The program's own header, with the program name as the wordmark, in-page section links, and an Apply button.
  - A white, editorial hero: a large serif title, a one-line promise, two buttons, and a photo set on an offset block in the program's accent color.
  - An "at a glance" bar (format, length, structure, who it's for, investment).
  - A sticky section bar that appears after the hero and highlights the section in view.
  - A block timeline: three steps across on desktop and down on phones, joined by an accent line.
  - One dark section (the letters) in a very deep shade of the accent.
  - The Magical Story of Us footer.
- Fonts are Cormorant Garamond (headings) and Manrope (body), from Google Fonts. The sigil logo is in `assets/brand/`.

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

`assets/js/program.js` sends each form into a hidden frame so the visitor stays on the page and sees a thank-you message. With JavaScript off, the form does a normal full-page POST to the same URL.

**After leaving MailerLite**, those posts will break. Rewire them to your own subscribe / discovery / contact handlers (or a form service). The Apply buttons point at the Google Form and do not depend on MailerLite.

Old MailerLite section anchors (`#Pricing-4`, `#FAQ-4`, `#Side-by-side-image-content-2`, `#People-5`, `#Listed-items-on-side-2`) still land on the matching sections.

## Social links

- Carolee: Facebook profile `61553743413386`, Instagram `instagram.com/caroleebeckham`
- Britton: Facebook `brittonleebeckham`, Instagram `veritas.sounds`, X `BrittonBeckham`
- The Magical Story of Us: Instagram, TikTok, Spotify podcast, and email in the footer

## Reusing this for another program

To start a new program site (for example, Reframing the Mind for Co-creation):

1. **Copy** `assets/css/program.css`, `assets/js/program.js`, `assets/brand/`, and `index.html` into the new repo. Add that program's photos to `assets/img/`.
2. **Set the accent.** Change the four `--program-*` variables at the top of `program.css`:
   - `--program-accent`: buttons, title emphasis, rules, and the timeline.
   - `--program-accent-deep`: the one dark section and button hover.
   - `--program-accent-tint`: small blocks and one thin band only. It is never a page background.
   - `--program-accent-soft`: emphasis text on the dark section.

   For Reframing the Mind, the suggested values are `#2b3a67` (indigo), `#121a30`, `#eceff7`, and `#c5cdea`.
3. **Change the content blocks in `index.html`:**
   - `<title>`, meta description, and social tags.
   - Wordmark in the program header and in the sticky bar (`.wordmark-name`, `.bar-mark`).
   - Hero: eyebrow, title, promise line, note, Apply link, photo, and caption.
   - At-a-glance items: Format, Length, Structure, For, Investment.
   - Section links in both navs. Each `href` must match a section `id`.
   - Overview, the timeline stages (one `.stage` per block or week, with its modules), facilitators, story, letters (or remove that dark section), pricing plans, FAQ, and forms.
4. **Forms.** Point each `action` at that program's form endpoint. Keep `data-form` on the form so it posts in the background and shows its `.form-success` message.
5. **Keep shared.** Leave the parent strip, the footer, the fonts, the 20px button radius, and the 8px input radius unchanged across programs.

## Layout

```
index.html
CNAME
README.md
.nojekyll
assets/
  css/program.css   (shared program template; per-program variables at the top)
  js/program.js     (sticky section bar, forms, reveal on scroll)
  brand/            (sigil logo, also used as the favicon)
  img/              (page images + OG image; not every image is used on the page)
  icons/, css/universal.css   (from the MailerLite export, unused)
```
