# Reconstruction evidence and assumptions

## Evidence inspected — 7 October 2026

The connected `Ebrudra/organik-ma` checkout was a valid unborn Git repository with no source files, commits or agent instructions. A read-only `git ls-remote origin` succeeded but returned no advertised refs. There was no existing implementation to preserve. The user's reconstruction brief authorizes creating application source, tests and dependency files (unlike the preceding onboarding-only task).

Attempted public reference:

- `https://organik-ma.benhaddouch-elmehdi.chatgpt.site/` — curl failed before an HTTP response from the site: `CONNECT tunnel failed, response 403`, from the environment's network proxy.
- The same URL in system Chromium through Playwright failed with `net::ERR_CERT_AUTHORITY_INVALID`. Certificate verification was not bypassed. A command-line Chromium attempt also failed to produce page content and was stopped.
- No page layout, navigation URLs, public original assets, fonts, exact copy or catalog was recovered. No comparable reference screenshot is available. Subpage URLs could not be discovered from navigation.

The reference domain was added to the environment configuration draft for review. Draft saving does not apply runtime policy. If permitted access is supplied later, inspect the rendered reference and public assets before claiming visual parity. No inaccessible project ID, private infrastructure, old backend or deployment was accessed.

Inspiration repository `https://github.com/HoanghoDev/slider_soda`: the normally accessible `raw.githubusercontent.com/HoanghoDev/slider_soda/main/LICENSE` returned 404. No code or assets were reused; no license rights were assumed. The heroes are original React/CSS implementations based on the handover's animation requirements, not reproductions established from observation.

## Visual status

**Approximation from the confirmed brief.** Earthy cream/green/honey tones, serif headlines, local reconstructed wordmark, vector glass jars and illustrative Moroccan landscape scenes. System Georgia/Arial fonts keep the site self-contained. Exact colors, typefaces, proportions, imagery, spacing and animation timing cannot be verified.

Original uses large background product lettering, lateral jar entrances and coordinated category colors. Luna uses scaling/rotation, staggered text entrances and background color transitions. Both have next/previous, arrow keys and horizontal swipes (left advances); `touch-action: pan-y` preserves vertical gestures. A transition lock rejects overlapping input. Neither implementation autoplays; there is no autoplay to pause. Reduced motion shortens animation to effectively immediate. No Blend, Wrap, 3D library or retired navigation is included.

The header/footer logo and logo on jars are the **same newly reconstructed wordmark**, not the original authentic logo. All SVGs, including recipe illustrations, in `public/assets` were created for this task. No original product photographs or logo could be downloaded. The gallery is labeled as illustration, not documentary supplier/team photography. Jar labels use generic descriptions to avoid contradicting the selected SKU. They illustrate categories rather than claiming exact packaging.

## Catalog provenance

18-reference breakdown is the brief's inference: ten honeys + four argan type/origin combinations + two olive oils + two amlous. It remains unverified against the reference.

| Data                                                           | Status                                                                                                         |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Ten honey entries, 250 g each, prices 30–200 MAD               | Required range/size; nine names and most specific prices invented as explicit provisional working data         |
| Fleurs, 30 MAD / 250 g                                         | Historical page evidence supplied in the brief; current availability unconfirmed                               |
| Honey names                                                    | Fleurs, Oranger, Eucalyptus, Thym, Romarin, Lavande, Caroubier, Jujubier, Euphorbe, Montagne; provisional list |
| Honey origin                                                   | `Origine à confirmer`; no origin invented                                                                      |
| Argan cosmetic, 170 MAD; culinary, 180 MAD                     | Prices supplied in the brief, not independently verified                                                       |
| Argan Agadir / Essaouira                                       | Supplied origins, combined with both types as inferred references                                              |
| Olive Haut Atlas / Agadir; Moyen Atlas / Beni Mellal           | Preserved supplied associations; regional geography and labels require business confirmation                   |
| Olive prices 100 / 90 MAD                                      | Provisional placeholders, not recovered prices                                                                 |
| Amlou Agadir / Essaouira, 120 MAD each                         | Supplied origins; price provisional                                                                            |
| Non-honey sizes, composition, stock, allergens, certifications | Unknown; omitted or explicitly marked for confirmation                                                         |

Stable reference IDs distinguish type and origin; all catalog consumers use the same typed source. No certification, producer relationship, business history, team names, supplier names, clinical benefit or stock level has been fabricated. Cosmetic argan is explicitly non-food and has a distinct description. Article recipe ingredients describe proposed recipes, not verified commercial product composition.

## Pages, articles and order flow

Fallback routes `/boutique`, `/esprit-organik` and descriptive `/blog/:slug` follow the brief. Product detail route `/produit/:id` provides variant selection and stable links. Original and Luna share storefront sections, header, footer and cart. Footer retains the requested `Made by SET & GHO`; the brand spelling needs confirmation.

All six article texts are complete replacement French content, not recovered copy. Topics: amlou maison, chickpea salad, honey pears, culinary argan guide, everyday nutrition/use, cosmetic argan care. The three recipe articles contain ingredients and ordered instructions. Every article has catalog-backed related product cards.

Attempts to consult authoritative health references failed with proxy CONNECT 403:

- WHO: `https://www.who.int/news-room/fact-sheets/detail/healthy-diet`
- AAD: `https://www.aad.org/public/everyday-care/skin-care-basics/dry/moisturizers`

These are explicitly labeled reading pointers, not verified citations supporting claims. Instead of inventing sourced benefits, the everyday article states that product nutrition/composition are unknown and makes no product-specific health claims. Cosmetic guidance distinguishes usage and defers to manufacturer instructions/professional advice; it asserts no argan efficacy or disease treatment. No nutritional analysis, dosage, smoke point, shelf-life guarantee or treatment claims are provided. Authoritative content verification remains a launch task.

Original cart behavior could not be observed. The reconstructed cart supports SKU-specific lines, quantity updates/removal, totals, route sharing, browser persistence and cross-tab cart updates. Native modal dialog traps focus, Escape closes it, and focus returns to the opener. Local-storage failures are explicit. Local demo requests save a contact name/email, cart lines and indicative total only in the browser. No old endpoint is used; no order is claimed to be sent. Storage is a demo convenience, not an order system.

## Validation

See `docs/VALIDATION.md` for final executed results and review images. Early browser failures were investigated rather than counted as passes: unloaded lazy images required scrolling before image assertions; select accessible names were made explicit; overlapping test invocations caused a reused server to stop, so the suite was rerun sequentially. No assertions were removed to obtain a pass.

## References needed for closer fidelity

Accessible reference pages or desktop/mobile screenshots, authentic logo files, original jar/gallery/article images, exact catalog export and full article text would enable a closer match. These are not prerequisites for using the current independently maintainable demo. They are prerequisites for claiming faithful reproduction.

## Git delivery and environment

`main` was initialized with an empty commit because the repository had no base branch. All application code is on the pushed `rebuild/organik-storefront` branch. Git HTTPS reads and pushes succeeded using the existing platform authentication. The GitHub API read returned `Forbidden`, and `gh pr create` failed at `POST https://api.github.com/graphql` with `Forbidden`; no PR was created. This is a scoped API limitation, not evidence that a new Git token is needed. Use the [GitHub comparison](https://github.com/Ebrudra/organik-ma/compare/main...rebuild/organik-storefront) to review and open a PR.

Reusable install/startup instructions and required network domains are saved in the cloud environment draft for review. The reference, WHO, AAD and ANSES domains were preserved, and `api.github.com` was added for PR access. Saving is not runtime application or publication. No app secrets are required. The current checkout and dependencies are prepared; later tasks still need to restart the dev server. Restoration in a new task has not been independently tested.
