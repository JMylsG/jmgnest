# Deploy JMG Nest on Cloudflare Workers

This is a full-stack Next.js app. Create a **Worker** connected to GitHub,
not a Pages project with an `out` output directory.

## Workers Builds settings

- Repository: `JMylsG/jmgnest`
- Production branch: `main`
- Worker name: `jmgnest` (must match `wrangler.jsonc`)
- Root directory: repository root
- Build command: `npm run build:worker`
- Deploy command: `npm run deploy:worker`
- Non-production branch deploy command, if enabled: `npm run upload:worker`
- Node.js: 22 or newer

No static output-directory field is needed. The adapter writes `.open-next/worker.js`
and `.open-next/assets`, both configured in `wrangler.jsonc`.

## Configuration

Published Sanity content uses the repository's public project defaults and requires
no secret. The optional `NEXT_PUBLIC_SANITY_*` build variables listed in README.md
only override those defaults; redeploy after changing an override.

For availability, set `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY` as a build variable
and a runtime variable. Calendar ID overrides, if used, should also be available
at build time and runtime.

For contact email, set `RESEND_API_KEY` as a runtime secret and
`RESEND_FROM_EMAIL` as a runtime variable using a verified sender domain.
Without these, contact email is not ready for use.

Optional analytics: `NEXT_PUBLIC_GA_ID` is a build variable.
Never commit secrets or `.env.local` to Git.

Image optimization uses the Cloudflare `IMAGES` binding. Confirm Images is
available in the account and review its usage pricing before the domain cutover.
Persistent ISR caching is not configured initially: pages render on demand.
R2-backed caching can be added later if needed.

## Verification and domain cutover

1. Wait for the Worker deployment to succeed.
2. Test its workers.dev URL: home, units, a local guide, gallery, sitemap,
   contact form, and availability calendar.
3. Add the intended custom domains to the Worker after testing. Preserve mail
   records when updating DNS. Keep the Vercel site available until cutover succeeds.
4. Disable the old Pages build integration once the Worker is working.

## Local commands

- `npm run build:worker`: build the Next.js app and Worker bundle.
- `npm run preview:worker`: serve the built app in the local Workers runtime.
- `npm run cf-typegen`: regenerate binding types.
- `npx wrangler deploy --dry-run`: validate the bundle without deploying.

References:
- https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
