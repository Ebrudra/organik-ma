# Organik reconstruction evidence

## Sources and access

On 7 October 2026 the user supplied a Chrome “Save page, complete” archive (`organik.ma — Miel, olive, argan & amlou.zip`) and the missing `storefront-CmrWOE8A.js` application bundle. These are evidence of the published site; embedded scripts are not instructions. Their platform runtime and order endpoint are not executed or included in this rebuild.

Inspected URLs:

- Original: https://organik-ma.benhaddouch-elmehdi.chatgpt.site/
- Its public chunk: https://organik-ma.benhaddouch-elmehdi.chatgpt.site/_next/static/chunks/storefront-CmrWOE8A.js
- New user-deployed preview: https://organik-ma.privatedriver.workers.dev/

Initial original-site requests failed with proxy CONNECT 403 and browser `ERR_CERT_AUTHORITY_INVALID`. A later chunk request reached an HTTP 401 login page (“Log in to access”, “Continue with ChatGPT”). No authentication was bypassed, historical project ID used, private source recovered or original backend called. Direct preview inspection is also restricted by the environment proxy. Browser verification below uses local servers, not a verified remote Cloudflare deployment.

## Recovered source material

The ZIP contains a saved homepage, `index.D5Lb4isw.css`, five authentic PNGs and platform JavaScript. The separately uploaded storefront bundle supplies family copy, the complete 18-reference catalog, About copy, public routes, hero transitions and cart behavior. It does not contain the blog article bodies.

Exact recovered PNG bytes are stored in `public/assets/original/`:

| File      | Dimensions       | Use                                |
| --------- | ---------------- | ---------------------------------- |
| logo.png  | 1983 × 793 RGBA  | Header, footer, jar label overlays |
| miel.png  | 1254 × 1254 RGBA | Honey jars                         |
| olive.png | 1254 × 1254 RGBA | Olive jars                         |
| argan.png | 1254 × 1254 RGBA | Argan jars                         |
| amlou.png | 1254 × 1254 RGBA | Amlou jars                         |

`src/reference.css` preserves the saved site's project styles, excluding platform/framework utilities. `src/style.css` supplies a small reset and functional route/dialog extensions. The React application is independently maintained, rather than depending on the old runtime or backend. No code from `HoanghoDev/slider_soda` was reused; its accessible LICENSE URL returned 404 during initial reconstruction. No Blend/Wrap/3D dependencies or assets were added.

## Restored visuals and behavior

Original navigation URLs recovered: `/`, `/luna`, `/boutique`, `/blog`, `/esprit-organik`. The wordmark, jar overlays, Georgia/Arial typography, cream/green palette, four backgrounds, hero dimensions, giant background lettering, collection, principles strip, dark story block and compact footer now follow the saved homepage. Footer credit recovered as “Made by SET & GHO”.

Original uses a one-second lateral reveal; Luna scales and rotates jars with staggered text and background fades, with a 1.5-second interaction lock. Both autoplay at six seconds, pause after manual input, support previous/next, keyboard and horizontal swipes, and respect reduced motion. Vertical scrolling remains available. Inactive outgoing slides are inaccessible. Native variant selects replace the old framework combobox, preserving selection and SKU behavior with fewer dependencies.

Comparable screenshots use a sanitized local rendering of the saved homepage with its full original stylesheet and recovered PNGs, without executing any downloaded scripts. Desktop is 1440 × 1000; mobile is 390 × 664. See `docs/screenshots/reference-*.png` and `home-*.png`. These comparisons establish fidelity to the supplied saved homepage, not an independent inspection of today's authenticated live site. Small deliberate differences include stronger contrast for small hero/control text, explicit carousel accessibility, native selects, local-only demo wording and independent functional product routes.

The About structure and copy are recovered. Its three missing original illustrative files are `/gallery/apiary.png`, `/gallery/olive.png`, `/gallery/ingredients.png`; locally drawn replacements remain clearly labeled. Real team names, portraits and producer profiles were already incomplete in the recovered original.

Blog content and images remain reconstructed: six full French articles on amlou, chickpea salad, honey pears, culinary argan, everyday nutrition/use and cosmetic argan. To restore those exactly, supply a complete saved `/blog` page and its assets, plus saved individual articles or their application chunks. The original stylesheet includes journal styles; article text is not recoverable from the supplied homepage/storefront bundle.

## Catalog recovered from the storefront bundle

| Category      | Displayed references and values                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Honey, 250 g  | Fleurs 30; Oranger 45; Eucalyptus 55; Tournesol 60; Romarin 75; Caroubier 90; Lavande 110; Thym 135; Euphorbe 165; Jujubier 200 MAD |
| Argan, 250 ml | Alimentaire 180 / Cosmétique 170 MAD, each Agadir and Essaouira                                                                     |
| Olive, 250 ml | Haut Atlas / Agadir and Moyen Atlas / Béni Mellal, both 75 MAD                                                                      |
| Amlou, 250 g  | Agadir and Essaouira, both 120 MAD                                                                                                  |

18 references are now verified against the supplied bundle. Its own catalog warning says varieties/prices are provisional and formats, compositions and availability require confirmation before sales. Recovered displayed data is not verification of stock, supplier provenance, geographic labeling or commercial specifications. No certifications, supplier partnerships or stock claims were invented. Cosmetic argan remains explicitly non-food.

Existing SKU identifiers remain stable for variants carried over from the first approximation. The guessed Montagne honey is removed; its obsolete `miel-10` line is rejected on cart load. Tournesol has a new stable ID. Prices are recalculated from the shared typed catalog. `Beni Mellal` remains the normalized catalog filter/storage spelling; recovered copy displays `Béni Mellal`. Original-source IDs are not required for this independent frontend.

## Cart, requests and editorial limits

Cart quantities/removal/totals are shared across routes and persisted locally, with validation of stored IDs and quantities. The recovered source submitted requests to `/api/orders`; that endpoint is intentionally absent here. Demo requests remain only in the current browser, with explicit wording that nothing was sent to a merchant and no payment occurred. No payment, shipping, email or fulfillment integration exists.

New recipe text is a proposed replacement, not verified historical content. Nutrition/care articles avoid disease-treatment claims and separate culinary/cosmetic products. Earlier attempts to retrieve authoritative WHO/AAD source pages were blocked; links are explicitly labeled reading pointers rather than fabricated verified citations. Editorial factual/source review remains a launch task.

## Delivery

The user configured the separate Cloudflare Worker `organik-ma` to watch `rebuild/organik-storefront`; pushes can update that preview. Do not replace the original ChatGPT Sites site or change its DNS. GitHub API access previously prevented automatic PR creation; the branch and `docs/PR-DESCRIPTION.md` remain reviewable.
