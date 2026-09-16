import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

// Serve build-time pages from Cloudflare Static Assets. This keeps the site on
// the free plan and avoids rendering Sanity guides inside the 10 ms Worker CPU
// limit. Publishing CMS changes requires a new Cloudflare build.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
})
