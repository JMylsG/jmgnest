/**
 * JMG Nest — Sanity.io API Module
 * Uploads generated posts and fetches existing content for interlinking
 */

import { slugify } from './generate.js';

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET;
const API_TOKEN = process.env.SANITY_API_TOKEN;
const API_VERSION = 'v2023-08-01';

function sanityUrl(path) {
  return `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/${path}`;
}

function headers(contentType = 'application/json') {
  return {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': contentType,
  };
}

// ─── Fetch all published posts from Sanity for interlinking context ──────────
export async function getPublishedPosts() {
  const query = encodeURIComponent(`
    *[_type == "post"] {
      _id,
      title,
      "slug": slug.current,
      "targetKeyword": seo.keywords[0],
      "category": categories[0]->title,
      excerpt,
      publishedAt
    }
  `);

  const url = sanityUrl(`data/query/${DATASET}?query=${query}`);

  const res = await fetch(url, { headers: headers() });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sanity query failed: ${err}`);
  }

  const data = await res.json();

  return (data.result || []).map((p) => ({
    sanityId: p._id,
    sanityPostId: p._id,
    title: p.title,
    slug: p.slug,
    targetKeyword: p.targetKeyword || '',
    category: p.category || '',
    url: `https://www.jmgnest.com/things-to-do/${p.slug}`,
    publishedAt: p.publishedAt,
  }));
}

// ─── Upload image from URL to Sanity asset pipeline ─────────────────────────
async function uploadImage(imageUrl) {
  if (!imageUrl) return null;

  try {
    // Fetch the image
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) throw new Error(`Could not fetch image from URL: ${imageUrl}`);

    const buffer = await imgRes.arrayBuffer();
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.split('/')[1]?.split(';')[0] || 'jpg';

    // Upload to Sanity
    const uploadUrl = sanityUrl(`assets/images/${DATASET}`);
    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="feature-image.${ext}"`,
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      throw new Error(`Image upload failed: ${err}`);
    }

    const asset = await uploadRes.json();
    return asset.document._id;

  } catch (err) {
    console.warn(`   ⚠️  Image upload skipped: ${err.message}`);
    return null;
  }
}

// ─── Ensure spaces around inline tags before conversion ─────────────────────
function normalizeInlineSpacing(html) {
  // Unconditionally wrap every <a...> and </a> with spaces
  html = html.replace(/(<a\s)/g, ' $1');
  html = html.replace(/(<\/a>)/g, '$1 ');
  // Unconditionally wrap every <strong>, </strong>, <b>, </b> with spaces
  html = html.replace(/(<strong>)/gi, ' $1');
  html = html.replace(/(<\/strong>)/gi, '$1 ');
  html = html.replace(/(<b>)/gi, ' $1');
  html = html.replace(/(<\/b>)/gi, '$1 ');
  // Collapse any double spaces created by the above
  html = html.replace(/  +/g, ' ');
  // Clean up spaces before punctuation (don't want "word . " or "word , ")
  html = html.replace(/ ([.,!?;:])/g, '$1');
  return html;
}

// ─── Convert HTML body to Sanity Portable Text (block content) ──────────────
function htmlToPortableText(html) {
  // Normalize spacing around links and bold tags before processing
  html = normalizeInlineSpacing(html);
  const blocks = [];

  // Split on block-level tags
  const sections = html.split(/(?=<h[23]|<p|<ul|<ol)/i).filter(Boolean);

  for (const section of sections) {
    // H2
    const h2Match = section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (h2Match) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        children: [{ _type: 'span', _key: generateKey(), text: stripTags(h2Match[1]), marks: [] }],
        markDefs: [],
      });
      continue;
    }

    // H3
    const h3Match = section.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    if (h3Match) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        children: [{ _type: 'span', _key: generateKey(), text: stripTags(h3Match[1]), marks: [] }],
        markDefs: [],
      });
      continue;
    }

    // Paragraph
    const pMatch = section.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      const { children, markDefs } = parseInlineContent(pMatch[1]);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children,
        markDefs,
      });
      continue;
    }

    // Unordered list
    const ulMatch = section.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
    if (ulMatch) {
      const items = [...ulMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      for (const item of items) {
        const { children, markDefs } = parseInlineContent(item[1]);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children,
          markDefs,
        });
      }
      continue;
    }

    // Ordered list
    const olMatch = section.match(/<ol[^>]*>([\s\S]*?)<\/ol>/i);
    if (olMatch) {
      const items = [...olMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      for (const item of items) {
        const { children, markDefs } = parseInlineContent(item[1]);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: 'number',
          level: 1,
          children,
          markDefs,
        });
      }
      continue;
    }
  }

  return blocks;
}

// ─── Parse inline HTML (links, bold) into Portable Text spans ────────────────
// Preserves surrounding whitespace so linked text doesn't merge with adjacent words
function parseInlineContent(html) {
  const markDefs = [];
  const children = [];

  const segments = [];
  const regex = /<a\s+href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>|<strong>([\s\S]*?)<\/strong>|<b>([\s\S]*?)<\/b>/gi;

  let pos = 0;
  let m;
  while ((m = regex.exec(html)) !== null) {
    if (m.index > pos) {
      // Preserve surrounding whitespace — do not trim, spaces are word boundaries
      const raw = html.slice(pos, m.index);
      const text = stripTags(raw);
      if (text) segments.push({ text, marks: [] });
    }

    if (m[0].startsWith('<a')) {
      const key = generateKey();
      markDefs.push({ _type: 'link', _key: key, href: m[1] });
      segments.push({ text: stripTags(m[2]), marks: [key] });
    } else {
      segments.push({ text: stripTags(m[3] || m[4]), marks: ['strong'] });
    }

    pos = m.index + m[0].length;
  }

  if (pos < html.length) {
    // Preserve leading space — don't trim, it may be a word boundary after a link
    const text = stripTags(html.slice(pos));
    if (text) segments.push({ text, marks: [] });
  }

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (!seg.text) continue;

    const prev = children[children.length - 1];

    // If two adjacent spans would merge words — inject a space span between them.
    // This happens when: previous span doesn't end with space AND current span
    // doesn't start with space AND current span doesn't start with punctuation.
    if (prev && prev.text && seg.text) {
      const prevEndsWithSpace = /\s$/.test(prev.text);
      const currStartsWithSpace = /^\s/.test(seg.text);
      const currStartsWithPunct = /^[.,!?;:\-—–'")]/.test(seg.text);

      if (!prevEndsWithSpace && !currStartsWithSpace && !currStartsWithPunct) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: ' ',
          marks: [],
        });
      }
    }

    children.push({
      _type: 'span',
      _key: generateKey(),
      text: seg.text,
      marks: seg.marks,
    });
  }

  if (children.length === 0) {
    children.push({ _type: 'span', _key: generateKey(), text: stripTags(html), marks: [] });
  }

  return { children, markDefs };
}

function stripTags(html) {
  // NOTE: intentionally no .trim() here — surrounding spaces must be preserved
  // so that Portable Text spans don't merge adjacent words when rendered
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function generateKey() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Resolve Sanity category ID by name or slug ─────────────────────────────
async function getCategoryId(categoryName) {
  if (!categoryName) return null;

  // Normalize: replace & with and, then slugify
  const normalized = categoryName.replace(/&/g, 'and').replace(/\s+/g, ' ').trim();
  const slug = slugify(normalized);

  // Try slug match first, then fall back to case-insensitive title match
  const query = encodeURIComponent(
    `*[_type == "category" && (slug.current == "${slug}" || lower(title) == "${normalized.toLowerCase()}")][0]._id`
  );
  const url = sanityUrl(`data/query/${DATASET}?query=${query}`);

  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    console.warn(`   ⚠️  Could not fetch category for: ${categoryName}`);
    return null;
  }

  const data = await res.json();

  if (!data.result) {
    console.warn(`   ⚠️  No Sanity category found for: "${categoryName}" (slug: ${slug})`);
  }

  return data.result || null;
}

// ─── Patch existing Sanity document (for Refresh) ───────────────────────────
export async function refreshSanityPost(generated, notionPost) {
  const existingId = notionPost.sanityPostId;
  if (!existingId) {
    throw new Error(`Cannot refresh — no Sanity Post ID found in Notion for "${notionPost.title}"`);
  }

  // Upload new feature image if URL changed
  let featuredImageAssetId = null;
  if (notionPost.featureImageUrl) {
    console.log('   🖼  Uploading feature image...');
    featuredImageAssetId = await uploadImage(notionPost.featureImageUrl);
  }

  // Convert HTML body to Portable Text
  const bodyBlocks = htmlToPortableText(generated.body);

  // Build the patch — only update content fields, preserve _id and publishedAt
  const patch = {
    set: {
      title: notionPost.title,
      excerpt: generated.excerpt,
      body: bodyBlocks,
      tags: notionPost.tags || [],
      'seo.metaTitle': generated.metaTitle,
      'seo.metaDescription': generated.metaDescription,
      'seo.keywords': generated.keywords || [],
      ...(featuredImageAssetId && {
        'featuredImage.asset._ref': featuredImageAssetId,
        'featuredImage.alt': notionPost.imageAltText || notionPost.title,
      }),
      ...(notionPost.distanceFromJmg && { distance: notionPost.distanceFromJmg }),
      ...(notionPost.travelTimeFromJmg && { travelTime: notionPost.travelTimeFromJmg }),
    },
  };

  const mutationUrl = sanityUrl(`data/mutate/${DATASET}?returnIds=true&visibility=sync`);
  const res = await fetch(mutationUrl, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      mutations: [{ patch: { id: existingId, ...patch } }],
    }),
  });

  const rawText = await res.text();
  if (!res.ok) {
    throw new Error(`Sanity patch failed (${res.status}): ${rawText}`);
  }

  console.log(`   ✅ Sanity document patched (ID: ${existingId})`);
  return existingId;
}

// ─── Minimal Portable Text → HTML converter (read-only, for CTR Refresh input) ─
// Converts existing Sanity body back to HTML so Claude can scan it for link gaps.
function portableTextToHtml(blocks) {
  return (blocks || [])
    .map((block) => {
      if (block._type !== 'block') return '';

      const tag =
        block.style === 'h2' ? 'h2'
        : block.style === 'h3' ? 'h3'
        : block.style === 'h4' ? 'h4'
        : 'p';

      const inner = (block.children || [])
        .map((span) => {
          let text = span.text || '';
          // Escape HTML entities in raw text
          text = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

          if (span.marks?.includes('strong')) text = `<strong>${text}</strong>`;
          if (span.marks?.includes('em')) text = `<em>${text}</em>`;

          const linkMark = (block.markDefs || []).find(
            (m) => span.marks?.includes(m._key) && m._type === 'link'
          );
          if (linkMark) text = `<a href="${linkMark.href}">${text}</a>`;

          return text;
        })
        .join('');

      return `<${tag}>${inner}</${tag}>`;
    })
    .filter(Boolean)
    .join('\n');
}

// ─── Fetch existing post body from Sanity (for CTR Refresh) ──────────────────
export async function fetchSanityPostBody(sanityPostId) {
  const query = encodeURIComponent(`*[_id == "${sanityPostId}"]{body}[0]`);
  const url = sanityUrl(`data/query/${DATASET}?query=${query}`);

  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sanity fetch body failed: ${err}`);
  }

  const data = await res.json();
  if (!data.result) {
    throw new Error(`Post not found in Sanity: ${sanityPostId}`);
  }

  return portableTextToHtml(data.result.body || []);
}

// ─── CTR Refresh: patch only SEO meta + body (body only if links were added) ──
// NEVER touches publishedAt, slug, title, or any other field.
export async function ctrRefreshSanityPost(post, meta, updatedBodyHtml, linksAdded) {
  const existingId = post.sanityPostId;
  if (!existingId) {
    throw new Error(`Cannot CTR refresh — no Sanity Post ID found for "${post.title}"`);
  }

  // Always update SEO meta fields
  const patchSet = {
    'seo.metaTitle': meta.metaTitle,
    'seo.metaDescription': meta.metaDescription,
  };

  // Only patch body if interlinks were actually added — never patch for zero change
  if (linksAdded > 0 && updatedBodyHtml) {
    const bodyBlocks = htmlToPortableText(updatedBodyHtml);
    patchSet.body = bodyBlocks;
    console.log(`   🔗 ${linksAdded} new interlink(s) injected into body`);
  } else {
    console.log(`   ℹ️  No new interlinks found — body left unchanged in Sanity`);
  }

  const mutationUrl = sanityUrl(`data/mutate/${DATASET}?returnIds=true&visibility=sync`);
  const res = await fetch(mutationUrl, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      mutations: [{ patch: { id: existingId, set: patchSet } }],
    }),
  });

  const rawText = await res.text();
  if (!res.ok) {
    throw new Error(`Sanity CTR patch failed (${res.status}): ${rawText}`);
  }

  console.log(`   ✅ Sanity CTR patch applied (ID: ${existingId})`);
  return existingId;
}

// ─── Main upload function ────────────────────────────────────────────────────
export async function uploadToSanity(generated, notionPost) {
  // 1. Upload feature image if URL provided
  let featuredImageAssetId = null;
  if (notionPost.featureImageUrl) {
    console.log('   🖼  Uploading feature image...');
    featuredImageAssetId = await uploadImage(notionPost.featureImageUrl);
  }

  // 2. Resolve category reference
  const categoryId = await getCategoryId(notionPost.category);

  // 3. Convert HTML body to Portable Text
  const bodyBlocks = htmlToPortableText(generated.body);

  // 4. Build the Sanity document
  // Generate a unique document ID based on slug + timestamp
  const generatedDocId = 'post-' + generated.slug.replace(/[^a-z0-9]/g, '-').slice(0, 50) + '-' + Date.now();

  const doc = {
    _type: 'post',
    _id: generatedDocId,
    title: notionPost.title,
    slug: { _type: 'slug', current: generated.slug },
    excerpt: generated.excerpt,
    publishedAt: notionPost.publishDate
      ? new Date(notionPost.publishDate).toISOString()
      : new Date().toISOString(),
    body: bodyBlocks,
    tags: notionPost.tags || [],
    featured: false,
    seo: {
      metaTitle: generated.metaTitle,
      metaDescription: generated.metaDescription,
      keywords: generated.keywords || [],
    },
    ...(featuredImageAssetId && {
      featuredImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredImageAssetId },
        alt: notionPost.imageAltText || notionPost.title,
      },
    }),
    ...(categoryId && {
      categories: [{ _type: 'reference', _ref: categoryId }],
    }),
    ...(process.env.SANITY_AUTHOR_ID && {
      author: { _type: 'reference', _ref: process.env.SANITY_AUTHOR_ID },
    }),
    ...(notionPost.distanceFromJmg && {
      distance: notionPost.distanceFromJmg,
    }),
    ...(notionPost.travelTimeFromJmg && {
      travelTime: notionPost.travelTimeFromJmg,
    }),
  };

  // 5. POST to Sanity mutations API — use createOrReplace to be safe
  const mutationUrl = sanityUrl(`data/mutate/${DATASET}?returnIds=true&returnDocuments=false&visibility=sync`);
  const res = await fetch(mutationUrl, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      mutations: [{ createOrReplace: doc }],
    }),
  });

  const rawText = await res.text();

  if (!res.ok) {
    throw new Error(`Sanity mutation failed (${res.status}): ${rawText}`);
  }

  let result;
  try {
    result = JSON.parse(rawText);
  } catch {
    throw new Error(`Sanity response not valid JSON: ${rawText.slice(0, 300)}`);
  }

  // Sanity returns document ID in different places depending on API version
  const docId =
    result.results?.[0]?.id ||
    result.results?.[0]?.document?._id ||
    result.documentId ||
    result.transactionId ||
    doc._id;

  if (!docId) {
    throw new Error(`Sanity returned no document ID. Full response: ${JSON.stringify(result).slice(0, 500)}`);
  }

  return docId;
}
