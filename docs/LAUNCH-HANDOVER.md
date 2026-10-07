# Launch handover

This branch is an independently maintainable demo replacement. It has not been publicly deployed, and the old site and its DNS remain untouched.

Before sales or production launch:

1. Confirm all 18 references, the exact honey names and prices, origin associations, pack sizes, ingredients, allergens and availability. Replace provisional values and add real inventory handling where needed. Confirm cosmetic vs food-grade labeling.
2. Supply the authentic Organik logo, product/package photographs and any permissions needed to use them. Compare accessible desktop/mobile reference pages with this rebuild before requesting visual parity. Replace illustrative gallery scenes with approved real team/producer images and verified profiles.
3. Confirm `SET & GHO` footer spelling, legal business/contact information, privacy notices, terms, returns and food/cosmetics labeling requirements. Have business/legal specialists review production copy and product information.
4. Confirm delivery zones, carriers, delivery prices/times, address collection and customer support. Nothing calculates shipping in the demo.
5. Choose payment and order infrastructure separately. Implement a secure backend, server-side validated prices, order identifiers, payment confirmation, inventory, merchant notifications and a reviewable operations workflow. Never turn browser-only requests into apparently confirmed orders. Keep the demo warning until the real flow is working and verified.
6. Review nutrition/cosmetic article content against accessible authoritative sources and actual supplier instructions. Keep food-grade/cosmetic uses separate; avoid unsupported health or treatment claims. The listed WHO/AAD pointers were inaccessible during this task and are not verified evidence.
7. Choose hosting and domain configuration in a separate deployment task. Configure SPA fallback to `index.html` for direct routes. Verify HTTPS, caching, robots/indexing, page metadata and accessibility on the chosen host. No DNS or public deployment has been performed here.
8. Decide whether an editable CMS is needed. The initial catalog/articles are typed local modules and can be edited without an external subscription or database.
9. Decide on data retention/security for genuine requests. Demo names/emails currently remain in localStorage only. Clear demo browser data; do not treat this as production order storage. Real payments, notifications and customer data need an appropriate backend and policies.

## Development restart

Use the existing checkout, not a new Git worktree. `npm ci`, then `npm run dev`. Run `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:browser` before release. Browser instructions and setup options are in the README. Files/dependencies can persist in a cloud snapshot; the server process must be restarted in new tasks.
