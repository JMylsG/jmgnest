/**
 * JMG Nest — SEO Content Agent
 * Main orchestrator: pulls from Notion, generates content, uploads to Sanity
 */

import { getReadyPosts, getRefreshPosts, getCtrRefreshPosts, getAllPublishedNotionPosts, updatePostStatus, updateSanityPostId, updateLastPublished } from './notion.js';
import { generatePost, generateCtrMeta, injectMissingInterlinks } from './generate.js';
import { uploadToSanity, refreshSanityPost, fetchSanityPostBody, ctrRefreshSanityPost, getPublishedPosts } from './sanity.js';

const REQUIRED_ENV = [
  'NOTION_TOKEN',
  'NOTION_DATABASE_ID',
  'ANTHROPIC_API_KEY',
  'SANITY_PROJECT_ID',
  'SANITY_DATASET',
  'SANITY_API_TOKEN',
  'SANITY_AUTHOR_ID',
];

// ─── Validate environment ────────────────────────────────────────────────────
function validateEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`❌ Missing environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
  console.log('✅ Environment validated');
}

// ─── Main pipeline ───────────────────────────────────────────────────────────
async function run() {
  console.log('\n🚀 JMG Nest SEO Agent starting...\n');
  validateEnv();

  // 1. Fetch all published posts from Sanity for interlinking context
  console.log('📚 Fetching existing published posts from Sanity...');
  const publishedPosts = await getPublishedPosts();
  console.log(`   Found ${publishedPosts.length} existing posts\n`);

  // 2. Fetch all published posts from Notion for cluster/pillar logic
  console.log('📋 Fetching published posts from Notion for cluster context...');
  const notionPublishedPosts = await getAllPublishedNotionPosts();
  console.log(`   Found ${notionPublishedPosts.length} published Notion posts\n`);

  // 3. Fetch posts marked "Ready" from Notion
  console.log('📋 Fetching Ready posts from Notion...');
  const readyPosts = await getReadyPosts();
  console.log(`   Found ${readyPosts.length} post(s) ready for generation\n`);

  // 4. Fetch posts marked "Refresh" from Notion
  console.log('🔄 Fetching Refresh posts from Notion...');
  const refreshPosts = await getRefreshPosts();
  console.log(`   Found ${refreshPosts.length} post(s) to refresh\n`);

  // 4b. Fetch posts marked "CTR Refresh" (needed for early-exit check; pipeline runs after summary)
  const ctrRefreshPosts = await getCtrRefreshPosts();

  if (readyPosts.length === 0 && refreshPosts.length === 0 && ctrRefreshPosts.length === 0) {
    console.log('✨ No posts to process this week. All done!');
    return;
  }

  // 5. Separate pillar posts — process pillars first
  const pillars = readyPosts.filter((p) => p.postType === 'Pillar');
  const clusters = readyPosts.filter((p) => p.postType === 'Cluster');
  const standalones = readyPosts.filter((p) => p.postType === 'Standalone');
  const ordered = [...pillars, ...standalones, ...clusters];

  const results = { success: [], held: [], failed: [] };

  // 6. Process Ready posts
  for (const post of ordered) {
    console.log(`\n📝 Processing: "${post.title}"`);
    console.log(`   Type: ${post.postType} | Cluster: ${post.clusterName || 'N/A'} | Depth: ${post.contentDepth}`);

    try {
      // Pillar hold rule: if cluster post, check pillar is live in Notion
      if (post.postType === 'Cluster' && post.clusterName) {
        const pillarLive = notionPublishedPosts.some(
          (p) =>
            p.clusterName?.trim().toLowerCase() === post.clusterName?.trim().toLowerCase() &&
            p.postType === 'Pillar' &&
            p.status === 'Published'
        );

        // Also check if pillar was just published this run
        const pillarJustPublished = results.success.some(
          (p) =>
            p.clusterName?.trim().toLowerCase() === post.clusterName?.trim().toLowerCase() &&
            p.postType === 'Pillar'
        );

        if (!pillarLive && !pillarJustPublished) {
          console.log(`   ⏸  Pillar not live yet for cluster "${post.clusterName}" — setting to On Hold`);
          await updatePostStatus(post.notionId, 'On Hold');
          results.held.push(post);
          continue;
        }
      }

      // Generate content via Claude API
      console.log('   🤖 Generating content...');
      const generated = await generatePost(post, publishedPosts);
      console.log(`   ✅ Content generated (${generated.wordCount} words)`);

      // Upload to Sanity
      console.log('   📤 Uploading to Sanity...');
      const sanityId = await uploadToSanity(generated, post);
      console.log(`   ✅ Published to Sanity (ID: ${sanityId})`);

      // Update Notion status + Sanity Post ID + dates
      await updatePostStatus(post.notionId, 'Published');
      await updateSanityPostId(post.notionId, sanityId);
      console.log('   ✅ Notion updated → Published');

      // Add to published pool so subsequent cluster posts can find it
      publishedPosts.push({
        ...post,
        sanityId,
        sanityPostId: sanityId,
        slug: generated.slug,
        url: `https://www.jmgnest.com/things-to-do/${generated.slug}`,
      });

      results.success.push(post);

    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
      results.failed.push({ post, error: err.message });
    }
  }

  // 7. Process Refresh posts
  if (refreshPosts.length > 0) {
    console.log('\n─────────────────────────────────────────');
    console.log('♻️  Processing Refresh queue...\n');

    for (const post of refreshPosts) {
      console.log(`♻️  Refreshing: "${post.title}"`);
      try {
        console.log('   🤖 Regenerating content...');
        const generated = await generatePost(post, publishedPosts);
        console.log(`   ✅ Content regenerated (${generated.wordCount} words)`);

        console.log('   📤 Patching Sanity document...');
        await refreshSanityPost(generated, post);

        // Update Last Published only — Publish Date is preserved
        await updateLastPublished(post.notionId);
        console.log('   ✅ Notion updated — Last Published refreshed, Publish Date preserved');

        results.success.push(post);
      } catch (err) {
        console.error(`   ❌ Refresh failed: ${err.message}`);
        results.failed.push({ post, error: err.message });
      }
    }
  }

  // 8. Summary
  console.log('\n─────────────────────────────────────────');
  console.log('📊 Run Summary');
  console.log(`   ✅ Published:  ${results.success.length}`);
  console.log(`   ⏸  On Hold:    ${results.held.length}`);
  console.log(`   ❌ Failed:     ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed posts:');
    results.failed.forEach(({ post, error }) => {
      console.log(`   • "${post.title}": ${error}`);
    });
    process.exit(1);
  }

  // ── CTR Refresh pipeline ──────────────────────────────────────────────────
  // Safe optimization: new meta + additive interlinks only. Body never rewritten.
  console.log('\n🎯 Checking for CTR Refresh posts...');

  if (ctrRefreshPosts.length > 0) {
    console.log(`   Found ${ctrRefreshPosts.length} post(s) for CTR Refresh\n`);

    for (const post of ctrRefreshPosts) {
      console.log(`\n🎯 CTR Refresh: "${post.title}"`);

      try {
        // 1 — Generate new meta only (no body generation)
        console.log('   🤖 Generating new meta title + description...');
        const meta = await generateCtrMeta(post);
        console.log(`   ✅ metaTitle: "${meta.metaTitle}"`);
        console.log(`   ✅ metaDesc:  "${meta.metaDescription}"`);

        // 2 — Fetch existing body from Sanity unchanged
        console.log('   📥 Fetching existing body from Sanity...');
        const existingBodyHtml = await fetchSanityPostBody(post.sanityPostId);

        // 3 — Find posts published AFTER this post (potential missing link gaps)
        const postPublishDate = new Date(post.lastPublished || post.publishDate || 0);
        const newPostsSincePublish = publishedPosts.filter((p) => {
          const pDate = new Date(p.lastPublished || p.publishDate || p.publishedAt || 0);
          return pDate > postPublishDate && p.title !== post.title;
        });
        console.log(`   🔍 ${newPostsSincePublish.length} newer posts — checking for link gaps...`);

        // 4 — Inject missing interlinks (additive only, body structure preserved)
        const { updatedBody, linksAdded } = await injectMissingInterlinks(
          existingBodyHtml,
          post,
          newPostsSincePublish
        );

        // 5 — Patch Sanity: meta always, body only if links were added
        console.log('   📤 Patching Sanity...');
        await ctrRefreshSanityPost(post, meta, updatedBody, linksAdded);

        // 6 — Update Notion: Last Published only, Publish Date never touched
        await updateLastPublished(post.notionId);
        console.log('   ✅ Notion updated — status reset to Published, Publish Date preserved');

        results.success.push(post);
      } catch (err) {
        console.error(`   ❌ CTR Refresh failed for "${post.title}": ${err.message}`);
        results.failed.push({ post, error: err.message });
      }
    }
  } else {
    console.log('   No posts queued for CTR Refresh this run');
  }

  if (results.failed.length > 0) {
    console.log('\nFailed posts:');
    results.failed.forEach(({ post, error }) => {
      console.log(`   • "${post.title}": ${error}`);
    });
    process.exit(1);
  }

  console.log('\n✨ Agent run complete!\n');
}

run().catch((err) => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});
