# Executed validation

Validated on 7 October 2026 with Node 24.19.0, npm 11.9.0 and system Chromium in the connected cloud machine.

| Check                                                                     | Executed result                                |
| ------------------------------------------------------------------------- | ---------------------------------------------- |
| Frozen lockfile installation (`npm ci --cache /tmp/organik-npm`)          | Passed; install script rerun successfully      |
| `npm run typecheck`                                                       | Passed                                         |
| `npm test`                                                                | 6 tests passed, 0 failed/skipped               |
| `npm run build`                                                           | Passed; Vite production bundle generated       |
| `npm run test:browser`                                                    | 12 tests passed, 0 failed/skipped in final run |
| Dev-server readiness (`npm run smoke`)                                    | Passed                                         |
| Served production-bundle readiness (`ORGANIK_BASE_URL=... npm run smoke`) | Passed against Vite preview                    |
| Production screenshots / overflow at 1440×1000 and 390×844                | Passed                                         |
| `git diff --check`                                                        | Passed                                         |

The six unit tests exercise unique IDs/counts, honey sizes and price range, accent-insensitive search, combined category/origin filters, sorting, reset/empty results, all four argan identities, quantities, totals and malformed persisted carts.

Playwright ran desktop (1440×1000) and iPhone 13 Chromium-emulated mobile (390×664) projects. Each project executed six meaningful browser scenarios:

1. Direct loading of both storefronts, boutique, About, blog, all six articles and a product detail; loaded images, no console/page errors and no horizontal overflow. Recipe ingredients/instructions and related product navigation were checked.
2. Header/mobile menu navigation, both heroes' previous/next and arrow-key controls, rapid-input lock, reduced motion and keyboard focus on the skip link.
3. Horizontal gesture direction and vertical gesture preservation. The mobile project additionally used native Chromium touch input to swipe forward/back and verify actual vertical page scrolling on **both** heroes.
4. Accent-insensitive search, combined category/origin filters, empty state/reset and ascending/descending prices.
5. Product-variant changes update price and SKU; culinary/cosmetic/origin variants remain separate in cart. Quantities, removal, totals, route sharing, reload persistence, Escape/focus restoration, browser-local demo request storage and an empty cart after submission were checked. No POST request occurred during demo submission.
6. Axe WCAG A/AA checks on representative storefront, boutique, product and article routes, plus populated cart and demo form. Zero violations on checked states. Automated accessibility checks do not prove complete accessibility; no physical-phone or screen-reader session was performed.

## Review screenshots

These screenshots show the production rebuild. **No reference screenshots were accessible, so they do not establish visual parity.** Images were fully loaded and entrance animations settled before capture.

- [Original desktop](screenshots/home-desktop.png)
- [Original mobile](screenshots/home-mobile.png)
- [Luna desktop](screenshots/luna-desktop.png)
- [Luna mobile](screenshots/luna-mobile.png)
- [Boutique desktop](screenshots/boutique-desktop.png)
- [Boutique mobile](screenshots/boutique-mobile.png)

## Investigated failures

Initial checks found lazy images not loaded until scrolled into view, ambiguous select accessible names, a missing favicon and a prohibited decorative ARIA label. The image checks now scroll normally before assertions; selects have explicit accessible names; a local SVG favicon was added; decorative slide dots are hidden from the accessibility tree, while a separate live status announces slides. A footer-note contrast failure was corrected by darkening the shared muted text color. Quantity text uses ordinary accessible text rather than an unsupported label attribute. Entrance animations are allowed to settle before screenshot and contrast checks. These fixes preserve the assertions and feature behavior.

An overlapping early test invocation reused the previous run's server, which then shut down. The final suite was run sequentially with its own server. Source editing/formatting during an earlier dev-server test run also caused a transient reload; final browser verification ran against settled files.

## Unverified / external limitations

The published reference failed HTTP proxy and browser trust checks, so original design/content/assets/cart behavior remain unknown. Authoritative WHO/AAD pages also returned proxy CONNECT 403; no product health claims or purported verified citations were substituted. GitHub Git push succeeded, but API/GraphQL access returned Forbidden and prevented automatic PR creation. No deployment, real payment, merchant submission, physical-phone test or new-task snapshot restoration was performed.

## Cloudflare preview preparation

On 7 October 2026, installed/pinned Wrangler 4.148.0 and added `wrangler.jsonc` for a separate `organik-ma-preview` asset-only Worker. Production build and deployment dry run passed. Local Workers runtime started on port 8787 and `npm run smoke` passed against it, including a directly loaded article, catalog search and cart price. No application code changed in this preparation, so the existing 12-browser-test results remain applicable; runtime-specific readiness was checked separately. Cloudflare account authentication is absent (`wrangler whoami`), and no public deployment was made. Setup, local sandbox accommodations and OAuth MCP instructions are in `docs/CLOUDFLARE-PREVIEW.md`.
