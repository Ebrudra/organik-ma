# Rebuild Organik French storefront and local demo sales flow

The connected repository had no source or commits. This change provides a working French storefront with recovered Original and Luna heroes, a typed 18-reference catalog, searchable/filterable boutique, variant-aware product details, persistent shared cart, browser-only demo requests, About/gallery and six complete journal articles.

The user supplied a saved homepage, stylesheet, authentic logo/four jar images and application bundle. These restore the original homepage layout, hero behavior, displayed catalog and About copy. Local desktop/mobile screenshots compare the rebuilt homepage with the sanitized saved reference. Gallery/blog images and article bodies remain documented replacements. All commercial data still needs confirmation. Demo requests remain browser-only; the original order endpoint is never called. The user has configured a separate GitHub-connected Cloudflare Workers preview.

Validation passed: frozen npm installation, TypeScript, production build, seven catalog/cart unit tests, 16 desktop/mobile Playwright checks (including native emulated touch/scroll and selected axe checks), plus functional smoke checks against dev and production servers. Production screenshots and detailed outcomes are in `docs/VALIDATION.md`; source/business gaps and launch tasks are in the rebuild and launch handovers.

`main` contains only an empty review-base commit because the repository had no branches. All application changes are on `rebuild/organik-storefront`. The separate preview Worker watches this branch. Review the saved-reference and rebuilt production screenshots in `docs/screenshots/`; remaining gallery/blog recovery and launch gaps are documented.
