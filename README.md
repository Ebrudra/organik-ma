# Organik.ma

French-language Moroccan storefront reconstruction. React, TypeScript, Vite and React Router; recovered local PNG product imagery and logo; no CMS or backend. Prices are in MAD. **Demo storefront restored from the user’s saved homepage, stylesheet and storefront bundle. Blog artwork/content and gallery imagery still include documented replacements.** See [rebuild notes](docs/REBUILD-NOTES.md) for evidence and [launch handover](docs/LAUNCH-HANDOVER.md) before launch.

## Install and run

Use Node.js 22 or 24 (validated with Node 24.19.0) and npm.

```sh
npm ci
npm run dev
```

Vite listens on port 5173. Open the address it prints in your local development environment. No environment variables or credentials are required by the application.

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

With a development server running, `npm run smoke` performs a short functional browser readiness check. Set `ORGANIK_BASE_URL` to a running preview server to check the production bundle.

The production bundle is in `dist/`. Static hosting must serve `index.html` for unknown paths so direct article/product routes work. The user has deployed a separate Cloudflare Workers preview; the original published site is untouched.

## Browser verification

```sh
npx playwright install chromium
npm run test:browser
```

The tests use `/usr/bin/chromium` when present, otherwise Playwright's installed Chromium. Set `CHROMIUM_PATH` to choose another executable. The test runner starts its own Vite server on port 4173. Desktop (1440 × 1000) and mobile (390 × 664) projects verify routes, images, overflow, heroes, reduced motion, gesture handlers, filtering, variant identity, cart persistence, demo requests, keyboard focus and selected axe accessibility checks. Gesture checks cover browser TouchEvents and native Chromium-emulated touch input, including vertical scrolling on both heroes. They do not replace testing on a physical phone. Screenshots and failure traces go in ignored `test-results/`.

## Routes and editing

- `/` — Recovered Original storefront; `/luna` — alternative hero.
- `/boutique` — searchable/filterable 18-reference catalog.
- `/produit/:id` — variant-aware product detail.
- `/esprit-organik` — about and illustrative gallery.
- `/blog` and `/blog/:slug` — six full French articles.

Edit products in `src/catalog.ts`, articles in `src/articles.ts`, shared routes in `src/main.tsx`, storefront/heroes in `src/Storefront.tsx`, and styles in `src/reference.css` / `src/style.css`. The catalog supplies hero references, cards, details, filters, cart prices and related article products. SKU IDs must stay stable, or existing carts need a migration. Authentic recovered logo and four jar PNGs are in `public/assets/original/`. Remaining replacement SVG gallery/blog art is in `public/assets/`; `scripts/generate-assets.py` regenerates only those SVGs, never the recovered PNGs. Header, footer and jar overlays use the authentic recovered logo.

## Cart and demo requests

Cart state is shared across routes and saved under `organik.cart.v1`. Malformed/unknown stored lines are rejected. Quantities are limited to 99 per SKU. Storage failures are displayed. Demo requests are saved under `organik.requests.v1` only in the current browser; nothing is transmitted. The cart clears after successful local save. There are no payments, emails, merchant notifications, delivery calculations or fulfillment. Do not enter sensitive data. Clear browser site data to erase local requests/cart.

## Formatting

```sh
npx prettier --write src tests *.ts *.json index.html docs README.md
```

## Cloudflare Workers preview

The separate preview Worker is configured in `wrangler.jsonc`. Run `npm run cf:check` for a build and deployment dry run, `npm run cf:dev` for the local Workers runtime, or `npm run cf:deploy` after authorizing your Cloudflare account. The asset configuration supports SPA routes. For GitHub-connected deployment and official MCP connection instructions, follow [Cloudflare preview guide](docs/CLOUDFLARE-PREVIEW.md). Select **rebuild/organik-storefront**, not the empty main branch, until the rebuild is merged. The user’s preview is https://organik-ma.privatedriver.workers.dev/; GitHub pushes to the selected branch trigger its build.
