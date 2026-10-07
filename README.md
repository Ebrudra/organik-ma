# Organik.ma

French-language Moroccan storefront reconstruction. React, TypeScript, Vite and React Router; local SVG artwork; no CMS or backend. Prices are in MAD. **This is a demo and an approximation, not a verified copy of the published site.** See [rebuild notes](docs/REBUILD-NOTES.md) for evidence and [launch handover](docs/LAUNCH-HANDOVER.md) before launch.

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

The production bundle is in `dist/`. Static hosting must serve `index.html` for unknown paths so direct article/product routes work. No production deployment is part of this rebuild.

## Browser verification

```sh
npx playwright install chromium
npm run test:browser
```

The tests use `/usr/bin/chromium` when present, otherwise Playwright's installed Chromium. Set `CHROMIUM_PATH` to choose another executable. The test runner starts its own Vite server on port 4173. Desktop (1440 × 1000) and mobile (390 × 664) projects verify routes, images, overflow, heroes, reduced motion, gesture handlers, filtering, variant identity, cart persistence, demo requests, keyboard focus and selected axe accessibility checks. Gesture checks dispatch browser TouchEvents; they do not replace testing on a physical phone. Screenshots and failure traces go in ignored `test-results/`.

## Routes and editing

- `/` — Original-inspired storefront; `/luna` — alternative hero.
- `/boutique` — searchable/filterable 18-reference catalog.
- `/produit/:id` — variant-aware product detail.
- `/esprit-organik` — about and illustrative gallery.
- `/blog` and `/blog/:slug` — six full French articles.

Edit products in `src/catalog.ts`, articles in `src/articles.ts`, layouts in `src/main.tsx`, and styles in `src/style.css`. The catalog supplies hero references, cards, details, filters, cart prices and related article products. SKU IDs must stay stable, or existing carts need a migration. Replacement art is in `public/assets/`; regenerate it with `python3 scripts/generate-assets.py`. The same reconstructed wordmark appears in header, footer and jar labels. It is **not** the recovered original logo.

## Cart and demo requests

Cart state is shared across routes and saved under `organik.cart.v1`. Malformed/unknown stored lines are rejected. Quantities are limited to 99 per SKU. Storage failures are displayed. Demo requests are saved under `organik.requests.v1` only in the current browser; nothing is transmitted. The cart clears after successful local save. There are no payments, emails, merchant notifications, delivery calculations or fulfillment. Do not enter sensitive data. Clear browser site data to erase local requests/cart.

## Formatting

```sh
npx prettier --write src tests *.ts *.json index.html docs README.md
```
