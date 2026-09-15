import { defineCloudflareConfig } from "@opennextjs/cloudflare"

// Start without persistent ISR storage; pages render on demand.
export default defineCloudflareConfig()
