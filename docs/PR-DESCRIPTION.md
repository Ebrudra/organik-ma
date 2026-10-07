# Rebuild Organik French storefront and local demo sales flow

The connected repository had no source or commits. This change provides a working French storefront with Original-inspired and Luna heroes, a typed 18-reference catalog, searchable/filterable boutique, variant-aware product details, persistent shared cart, browser-only demo requests, About/gallery and six complete journal articles.

The published reference could not be inspected: HTTP returned proxy CONNECT 403 and Chromium reported ERR_CERT_AUTHORITY_INVALID. The result is documented as an approximation. Artwork/logo and article copy are reconstructed; honey names/prices and olive/amlou prices include explicit provisional data. No old backend requests, real orders, payments or deployment are included.

Validation passed: frozen npm installation, TypeScript, production build, six catalog/cart unit tests, 12 desktop/mobile Playwright checks (including native emulated touch/scroll and selected axe checks), plus functional smoke checks against dev and production servers. Production screenshots and detailed outcomes are in `docs/VALIDATION.md`; source/business gaps and launch tasks are in the rebuild and launch handovers.

`main` contains only an empty review-base commit because the repository had no branches. All application changes are on `rebuild/organik-storefront`. Automatic PR creation was attempted but GitHub GraphQL returned Forbidden; this description is ready to paste when opening the comparison in GitHub.
