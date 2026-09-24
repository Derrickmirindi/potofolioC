# Dr. Ziah Colon

A complete, responsive academic and consulting website reconstructed from the supplied PDF. The design uses warm ivory, burgundy, editorial typography, and an animated open-book line motif.

## Open the website

- **Standalone HTML:** Open `Dr-Ziah-Colon-Complete.html` in a modern browser. Images, fonts, styles, and JavaScript are embedded. No internet connection or build step is needed to read the page and use its local interactions.
- **Editable version:** Open `site/index.html`, keeping its sibling files and `assets` directory together. For hosting, upload the contents of `site` to any static web host. The entry point is `index.html`.
- **Contact links:** Email links open the visitor’s email application. Phone links depend on device support. The website does not send messages, process payments, or collect visitor data.

## Package contents

| File or directory | Purpose |
| --- | --- |
| `Dr-Ziah-Colon-Complete.html` | Self-contained, offline-capable website |
| `site/index.html` | Editable semantic page content |
| `site/style.css` | Layout, design tokens, themes, responsive styles |
| `site/base.css` | Browser reset, focus styles, reduced-motion support |
| `site/fonts.css` | Local font definitions |
| `site/app.js` | Background motion, themes, menu, image enlargement, email copying |
| `site/assets/` | All 20 original PDF images, local fonts, favicon |
| `site/assets/original-document.pdf` | Supplied PDF, unchanged |
| `site/assets/source-text.txt` | Text extracted directly from the source PDF |
| `site/assets/image-manifest.json` | Complete image inventory with PDF object IDs and original dimensions |
| `QA.md` | Verification scope and results |

## Content preservation

The full biography, all three service descriptions, all three testimonials, contact details, payment details, both signatures, portraits, consulting image, testimonial photographs, and positive-affirmation artwork are retained. The affirmation artwork also has a readable text transcription. Decorative headings from the PDF are retained in the expandable “Signature & original visual collection” near the footer, rather than forcing the original neon typography into the redesigned editorial layout.

Repeated PDF heading layers and print line breaks have been consolidated. Testimonials use sentence case without changing their wording. The isolated duplicate period after the first testimonial has been removed. Added section labels and introductory copy organize the existing material; no academic appointments, awards, publications, or qualifications were invented.

## Details to confirm before public launch

- The source lists **443-226-7201** as the contact phone number and **443-266-7201** for Zelle. Both have been retained exactly. Confirm them with Dr. Colon before accepting payments.
- The source alternates “Dr. Colon” and “Dr. Owens-Colon.” This has been retained in the biography.
- The request’s Harvard reference informed the desired level of professional presentation, not an institutional affiliation. No Harvard appointment, logo, seal, or endorsement has been added.
- Biography, roles, testimonials, payment brands, and image permissions are supplied content, not independently verified claims. Confirm them with the site owner before a public launch.
- Payment logos are original visual content only. There is no checkout or payment integration.

## Edit the design

Update colors, spacing, and typography tokens at the beginning of `style.css`. Edit page copy directly in `index.html`. Replace images in `assets/` and preserve their filenames or update their references. Change contact links in all four places: the service links, contact section, and email-copy handler.

The separate single-file HTML is a built snapshot. If you edit the modular version, regenerate the standalone version with `node site/build-standalone.mjs` from the package root (Node.js 18 or later), or apply the same changes to it. The build script uses only Node.js built-in modules and requires no installation or internet access.

## Accessibility and motion

The page includes a skip link, visible focus indicators, semantic headings, image alternatives, responsive navigation, light/dark themes, and a pause/play control for background motion. Operating-system reduced-motion preferences pause the canvas animation by default. Animation also stops when the hero is out of view or the tab is hidden.

The artwork viewer closes with its Close control, Escape, or a click outside the panel. Email copying falls back to selecting the address if clipboard access is unavailable, including some local-file and embedded-preview environments.

## Fonts and assets

Boska and Satoshi are distributed through [Fontshare](https://www.fontshare.com/). Local WOFF2 files are included for offline rendering. Review the applicable [Fontshare licensing terms](https://www.fontshare.com/licenses) before redistributing these fonts independently. Original photographs and artwork came exclusively from the user-supplied PDF.

No analytics, trackers, external JavaScript dependencies, API keys, or paid services are required.
