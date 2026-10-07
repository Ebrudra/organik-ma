# Restored storefront validation — 7 October 2026

Validated with Node 24.19.0, npm 11.9.0 and system Chromium.

| Check                                                                      | Result                              |
| -------------------------------------------------------------------------- | ----------------------------------- |
| TypeScript (`npm run typecheck`)                                           | Passed                              |
| Catalog/cart unit tests (`npm test`)                                       | 7 passed                            |
| Production build (`npm run build`)                                         | Passed                              |
| Desktop/mobile Playwright (`npm run test:browser`)                         | 16 passed, 0 failed/skipped         |
| Functional smoke against development and served production bundle          | Passed                              |
| Cloudflare build and Wrangler deployment dry run (`npm run cf:check`)      | Passed                              |
| Production/reference screenshots; decoded images, page errors and overflow | Passed at 1440 × 1000 and 390 × 664 |
| Whitespace/diff check                                                      | Passed                              |

The original reference was rendered locally from the user-supplied saved HTML, original CSS and recovered PNGs. Platform scripts, challenge code and the original order endpoint were excluded. No certificate restrictions were bypassed. Comparable screenshots:

| Page             | Desktop                                        | Mobile                                        |
| ---------------- | ---------------------------------------------- | --------------------------------------------- |
| Saved reference  | [Reference](screenshots/reference-desktop.png) | [Reference](screenshots/reference-mobile.png) |
| Rebuilt homepage | [Original](screenshots/home-desktop.png)       | [Original](screenshots/home-mobile.png)       |
| Luna             | [Luna](screenshots/luna-desktop.png)           | [Luna](screenshots/luna-mobile.png)           |
| Boutique         | [Boutique](screenshots/boutique-desktop.png)   | [Boutique](screenshots/boutique-mobile.png)   |

`docs/screenshots/reference-geometry.json` records measured rectangles. Header logo, hero, hero jar, collection and story block rectangles are identical between the sanitized saved homepage and the rebuilt production homepage at both sizes. This is evidence of matching layout geometry, not a pixel-identical claim: native select controls, accessible text contrast, icon details and demo interactions differ. No independently rendered current remote reference or remote Workers preview could be validated because of access restrictions.

Browser scenarios cover direct navigation across every page/article and product details; image decoding; console/page errors; horizontal overflow; links; focus; keyboard arrows; previous/next; rapid input lock; reduced motion; synthetic and native Chromium-emulated horizontal/vertical touch gestures; accent-insensitive search; combined category/origin filters; numeric sorting; empty/reset states; selected variant/price propagation from homepage to hero/dialog; distinct argan usage/origin cart lines; quantities, removal, totals and persistence; local demo saving with zero POST requests; six-second autoplay and manual pause; and selected axe WCAG checks including populated cart/form.

The emulated mobile checks do not substitute for a physical phone. Screenshots of Luna use reduced motion to capture its settled layout; separate interaction tests exercise normal timing. Gallery and blog artwork/body recovery remains incomplete and documented in REBUILD-NOTES. Stock, ingredients, geographic origin labels and commercial specifications remain unverified, as in the recovered site's provisional catalog warning.

The user’s Cloudflare build previously succeeded. This machine checks the production bundle locally and the Wrangler configuration by dry run; the dashboard must confirm the next GitHub-triggered build. No deployment to the original ChatGPT Sites site or DNS change occurs.
