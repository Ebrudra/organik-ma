# Cloudflare Workers preview

Deploy this demo to the Cloudflare Worker named **organik-ma**, as created in the user’s dashboard. No custom domain, DNS change, backend, payment or old-site replacement is involved. The cart and demo requests remain browser-only. This preview is publicly accessible by default; keep the demo labels and use synthetic contact data.

`wrangler.jsonc` serves the Vite `dist/` directory with SPA fallback. Direct routes such as `/luna`, `/boutique` and `/blog/amlou-maison` load the app instead of returning a static 404. Wrangler is pinned in the npm lockfile. No Worker code, database or application secrets are needed.

## Recommended: connect GitHub in Cloudflare

1. Sign in to your Cloudflare account. Open **Workers & Pages** and choose to create a Worker by importing/connecting a Git repository. Interface labels may vary; select the Workers Git integration rather than Pages.
2. Connect GitHub and grant access to **Ebrudra/organik-ma**. Choose this repository.
3. Set the build/production branch to **rebuild/organik-storefront**. **main is currently an empty review-base commit** and will not build. After reviewing and merging the rebuild, you can change the connected branch to main.
4. Use the repository root as the working directory. Set the Worker name to **organik-ma**, matching `wrangler.jsonc`. Use Node 24 when a Node version setting is available.
5. Set **build command** to `npm run build` and **deploy command** to `npx wrangler deploy`. Cloudflare's Git build environment installs npm dependencies using the lockfile. If your build configuration does not automatically install them, use `npm ci && npm run build` as the build command.
6. Leave custom domains, routes, databases and app secrets empty. Keep the generated **workers.dev** address enabled. Deploy.
7. Open the generated Worker URL from the dashboard. Verify navigation and load `/boutique`, `/luna`, `/blog/amlou-maison` directly. Add different argan references to the cart, reload, and submit a synthetic demo request. Its confirmation must say it stays only in this browser.
8. Later pushes to the connected branch can rebuild the preview automatically. Review Cloudflare build logs when a build fails. To remove the preview, delete only `organik-ma` in Workers & Pages.

A Cloudflare account/GitHub connection approval is done in your own browser. Do not paste account API tokens into chat. Cloudflare's build integration handles its deployment credentials.

## Alternative: deploy from your computer with Wrangler

With Node 24 and Git installed:

```sh
git clone https://github.com/Ebrudra/organik-ma.git
cd organik-ma
git checkout rebuild/organik-storefront
npm ci
npx wrangler login
npx wrangler whoami
npm run cf:check
npm run cf:deploy
```

`wrangler login` opens Cloudflare's authorization page in your browser. Select the intended account if prompted. Review the deployment target name before deploying; change it only if necessary, and keep it distinct from any production Worker. Wrangler prints the actual workers.dev URL after a successful deployment. No preview URL is known until Cloudflare creates it.

For a local Workers runtime preview:

```sh
npm run cf:dev
```

The default port is 8787. In another terminal, run:

```sh
ORGANIK_BASE_URL=http://127.0.0.1:8787 npm run smoke
```

Stop the local process with Ctrl+C. Cloudflare Access can be configured separately if you want a login-protected public preview.

## What is automated here

The repository includes the Worker asset configuration, pinned Wrangler dependency, build/dry-run/deploy commands and a local functional smoke check. See `docs/VALIDATION.md` for execution results. The existing site is untouched. Cloudflare account actions cannot be performed through MCP until a Cloudflare connector exposing the necessary tools is attached to this chat. No Cloudflare MCP tools were available when these instructions were prepared.

## Connect the official Cloudflare MCP for account automation

Cloudflare's current recommended API MCP endpoint is:

```text
https://mcp.cloudflare.com/mcp
```

In your MCP client's remote-server configuration, add this URL and use **OAuth**. Cloudflare opens its authorization page so you can select your account and the permissions needed for Workers deployment. Do not send token values in chat. After the connector is attached to this conversation, its available tools can be used to inspect the intended account, prepare the separate Worker, deploy, check the resulting URL and diagnose builds. The account tools must actually be exposed to this chat; having a connector configured elsewhere does not make them callable here.

The documentation-only MCP (`https://docs.mcp.cloudflare.com/mcp`) cannot deploy a site. For build-focused actions, Cloudflare also lists `https://builds.mcp.cloudflare.com/mcp`, but its repository recommends the API/Code Mode server for broad API operations.

These endpoints and OAuth instructions were verified from Cloudflare's public GitHub repositories:

- https://github.com/cloudflare/mcp
- https://github.com/cloudflare/mcp-server-cloudflare

No Cloudflare account connection was available during preparation: `wrangler whoami` reported unauthenticated. The user subsequently connected GitHub and reported a successful build at https://organik-ma.privatedriver.workers.dev/. No Cloudflare account MCP is attached here; Git pushes update the configured branch. HTTPS requests confirmed the restored build and its assets; remote Chromium rendering remains blocked by this environment’s certificate trust error.

## Validation in the cloud machine

Wrangler 4.148.0 accepted the configuration and completed `wrangler deploy --dry-run`. Local `wrangler dev` started successfully and the browser smoke check passed against it: hero, combined accented catalog search, cart price, blog, direct recipe route and images.

This sandbox disallows writing the default Wrangler config directory under the agent's home. Validation used a supported `XDG_CONFIG_HOME` override to the ignored `.local/cloudflare-config` directory, plus logs in `/tmp`. This is a local sandbox accommodation; it is not needed in Cloudflare's build environment or most local computers. No TLS verification was disabled. The local runtime's optional `Request.cf` network lookup was unavailable, so Wrangler used its documented placeholder; this asset-only app does not read `Request.cf`.

The dashboard screenshot supplied during setup confirms `rebuild/organik-storefront` is selected in Branch control. Earlier failed builds were labeled `main` and lacked `package.json`; they do not prove the new branch setting is wrong. A new commit on the selected branch should trigger a fresh build. The repository Worker name now matches the dashboard, avoiding the configuration-name warning.
