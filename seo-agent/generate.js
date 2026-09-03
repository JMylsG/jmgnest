/**
 * JMG Nest — Content Generation Module
 * Uses Claude API to generate SEO blog posts with interlinking
 */

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

// ─── Word count targets by content depth ────────────────────────────────────
const WORD_COUNTS = {
  Short: 1000,
  Standard: 1800,
  Long: 3500,
};

// ─── Slugify title ───────────────────────────────────────────────────────────
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ─── Build interlinking context from published posts ─────────────────────────
// Uses actual Sanity slugs from live posts — never re-slugifies titles
function buildLinkContext(post, publishedPosts) {
  if (!publishedPosts || publishedPosts.length === 0) return '';

  // Helper: build URL from post using its actual live slug
  const url = (p) => `https://www.jmgnest.com/things-to-do/${p.slug || slugify(p.title)}`;

  // Normalize cluster name for comparison
  const clusterMatch = (a, b) =>
    a?.trim().toLowerCase() === b?.trim().toLowerCase();

  // Find pillar for this cluster
  const pillar = publishedPosts.find(
    (p) => clusterMatch(p.clusterName, post.clusterName) && p.postType === 'Pillar'
  );

  // Find sibling cluster posts (same cluster, not this post)
  const siblings = publishedPosts.filter(
    (p) =>
      clusterMatch(p.clusterName, post.clusterName) &&
      p.postType === 'Cluster' &&
      p.title !== post.title &&
      p.slug // only include posts with a confirmed live slug
  );

  // Find ALL other published posts not in this cluster — scored by relevance
  const keywords = [
    post.targetKeyword,
    ...(post.secondaryKeywords || '').split(',').map((k) => k.trim()),
  ].filter(Boolean);

  const otherPosts = publishedPosts.filter((p) => {
    if (!p.slug) return false; // skip posts without confirmed slug
    if (clusterMatch(p.clusterName, post.clusterName)) return false;
    return true;
  });

  // Score by keyword overlap — more matches = higher score
  const scored = otherPosts.map((p) => {
    const score = keywords.reduce((acc, kw) => {
      const kwRoot = kw.split(' ')[0].toLowerCase();
      if (p.title?.toLowerCase().includes(kwRoot)) return acc + 2;
      if (p.targetKeyword?.toLowerCase().includes(kwRoot)) return acc + 1;
      return acc;
    }, 0);
    return { ...p, score };
  }).sort((a, b) => b.score - a.score).slice(0, 5);

  let context = '\n## Available posts for internal linking (use EXACT URLs below — do not modify them):\n';

  if (pillar) {
    context += `\n### Pillar page (MUST link back to this for cluster posts):\n`;
    context += `- "${pillar.title}" → ${url(pillar)}\n`;
  }

  if (siblings.length > 0) {
    context += `\n### Sibling cluster posts (link to 2-3 of these where natural):\n`;
    siblings.forEach((s) => {
      context += `- "${s.title}" → ${url(s)}\n`;
    });
  }

  if (scored.length > 0) {
    context += `\n### Other relevant published posts (link contextually where natural):\n`;
    scored.forEach((r) => {
      context += `- "${r.title}" → ${url(r)}\n`;
    });
  }

  context += `\n### Always include these money page links:\n`;
  context += `- JMG Nest homepage → https://www.jmgnest.com\n`;
  context += `- JMG Nest booking → https://www.jmgnest.com/booking\n`;

  return context;
}

// ─── Build system prompt ─────────────────────────────────────────────────────
function buildSystemPrompt() {
  return `You are writing blog content for JMG Nest, a premium vacation rental in La Trinidad Valley, Benguet, Philippines — 15 minutes from Baguio City.

## Author Voice — The Returning Native

Every post is written from the perspective of Jason, the owner of JMG Nest. Here is his background — internalize it and write from this point of view:

- Born and raised in Baguio City / Benguet. This is home, not a destination.
- Grew up knowing the city before it was on every travel blog — the old Session Road haunts, the fog that rolls in every afternoon, the cold that hits differently at 5AM.
- Now based in the United States. Has been living abroad for several years.
- Returns to Baguio occasionally — not frequently enough to know every new opening, but enough to feel the city change between visits.
- Owns JMG Nest in La Trinidad Valley — built it as a way to stay connected to the place he grew up.
- His perspective is specific: he is not a tourist discovering Baguio for the first time, and he is not a full-time local anymore. He is someone who knows this place in his bones but sees it now with the slight distance of someone who has been away. That combination — deep familiarity plus fresh eyes — is the voice.

How this voice shows up in writing:
- Specific over generic. Not "Baguio is known for its cool climate" — but observations that only someone who grew up there would make.
- Occasional first-person grounding. Phrases like "When I was growing up here...", "On my last visit...", "One thing people who didn't grow up here often miss..." used sparingly but deliberately.
- Warm and practical. Like advice from a knowledgeable friend who wants you to have a good trip, not a listicle from a content farm.
- Honest about what has changed. Baguio has changed enormously — acknowledge it naturally rather than pretending it's frozen in time.
- Balikbayan awareness. A significant portion of readers are Filipinos abroad planning to bring their families back, or Filipino-Americans visiting for the first time. Write with that reader in mind too.

What to avoid:
- Generic travel blog phrases: "nestled in the mountains", "a must-visit destination", "perfect for all types of travelers"
- Over-promising or exaggerating — specific and honest beats enthusiastic and vague
- Sounding like a press release for Baguio City tourism
- Injecting personal voice into every sentence — use it as seasoning, not the whole dish

## Writing Style Rules (STRICT)

Punctuation:
- NEVER use em dashes (—) or en dashes (–) to break ideas mid-sentence. Use a period and start a new sentence instead, or use a comma if the break is minor.
- BAD: "The market opens at 9PM — it's the best time to go"
- GOOD: "The market opens at 9PM. It's the best time to go."
- BAD: "You'll find fresh produce — strawberries, lettuce, tomatoes — at every stall"
- GOOD: "You'll find fresh produce at every stall: strawberries, lettuce, and tomatoes."
- ONE em dash maximum per entire post, only if truly necessary for emphasis with no better alternative

Sentence structure:
- Keep sentences clear and direct. One idea per sentence.
- Vary sentence length — mix short punchy sentences with longer explanatory ones.
- Avoid filler transitions like "Moreover", "Furthermore", "In conclusion", "It is worth noting"
- Use plain connectors: "Also", "But", "And", "So", "This means", "That said"

HTML formatting:
- ALWAYS put a space before and after every <a href> link tag
- CORRECT: "visit <a href='...'>Burnham Park</a> for a swim"
- WRONG: "visit<a href='...'>Burnham Park</a>for a swim"
- This is a hard requirement — never skip the spaces around links

If the Brief/Notes field contains a specific personal memory or detail from Jason, weave it naturally into the post. That detail is the most valuable input in the entire brief — prioritize it.

## Writing Goals
- Help JMG Nest rank on Google for Baguio/La Trinidad travel searches
- Attract tourists who need accommodation — and make JMG Nest the obvious choice
- Be genuinely useful, not just keyword-optimized
- Sound like a real person who knows this place wrote it

## Audience
Primary: Filipino domestic tourists planning a Baguio trip
Secondary: Balikbayans and Filipino diaspora revisiting or exploring for the first time
Tertiary: International travelers looking for an authentic mountain destination

## JMG Nest Context
- Homepage: https://www.jmgnest.com
- Booking: https://www.jmgnest.com/booking
- Blog: https://www.jmgnest.com/things-to-do
- Location: La Trinidad Valley, Benguet (15 mins from Baguio City center)
- USPs: mountain views, cozy atmosphere, walking distance to strawberry farms, premium vacation rental feel

## Linking Rules (MANDATORY)
1. HOMEPAGE: Link to https://www.jmgnest.com naturally within the first 3 paragraphs. Anchor text: "JMG Nest", "our place in La Trinidad", or similar natural phrasing.
2. BOOKING CTA: One clear CTA to https://www.jmgnest.com/booking near the end, before the FAQ. Keep it helpful not pushy.
3. INTERNAL BLOG LINKS: Use exact URLs provided — never invent URLs. Pillar posts link out to all cluster posts. Cluster posts link back to pillar + 2-3 siblings. Standalone posts link contextually to 2-3 relevant posts. Always use descriptive anchor text.

## Output Format
Return ONLY a valid JSON object. No markdown fences. No preamble. No explanation.`;
}

// ─── Build user prompt ───────────────────────────────────────────────────────
function buildUserPrompt(post, publishedPosts) {
  const wordCount = WORD_COUNTS[post.contentDepth] || 1800;
  const linkContext = buildLinkContext(post, publishedPosts);

  return `Generate a complete SEO blog post for JMG Nest with the following brief:

## Post Details
- Title: ${post.title}
- Target keyword: ${post.targetKeyword}
- Secondary keywords: ${post.secondaryKeywords || 'none'}
- Category: ${post.category}
- Post type: ${post.postType}
- Cluster: ${post.clusterName || 'N/A'}
- Target word count: ~${wordCount} words
- Brief / notes: ${post.briefNotes || 'No specific brief provided'}
${post.distanceFromJmg ? `- Distance from JMG Nest: ${post.distanceFromJmg}` : ''}
${post.travelTimeFromJmg ? `- Travel time from JMG Nest: ${post.travelTimeFromJmg}` : ''}
${linkContext}

## Requirements
1. Write a compelling, SEO-optimized blog post of ~${wordCount} words
2. Use proper heading hierarchy (H2, H3) — do NOT include an H1 (the title is the H1)
3. Naturally include the target keyword in: first 100 words, at least 2 H2s, throughout body
4. Weave in secondary keywords naturally — never force them
5. MANDATORY: Link to https://www.jmgnest.com naturally within the first 3 paragraphs
6. MANDATORY: Include a booking CTA linking to https://www.jmgnest.com/booking near the end
7. Add all internal blog links from the provided list where relevant and natural — ALWAYS put a space before and after every <a> tag so words don't merge (e.g. "visit <a href=\'...\'>Burnham Park</a> for a swim" not "visit<a href=\'...\'>Burnham Park</a>for a swim")
8. Write a meta description under 160 characters
9. Write a meta title under 60 characters
10. End with a brief FAQ section (3-4 questions) using the target keyword

## Output JSON structure
Return ONLY this JSON object:
{
  "slug": "url-friendly-slug-here",
  "metaTitle": "Meta title under 60 chars",
  "metaDescription": "Meta description under 160 chars",
  "excerpt": "2-3 sentence excerpt for blog listing page (under 160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "body": "FULL HTML body content here — use <h2>, <h3>, <p>, <ul>, <ol>, <strong>, <a href='...'> tags. No <h1>. No <html>/<body> wrapper. CRITICAL: Always include a space before and after every <a> tag — e.g. 'visit <a href=\'...\'>Burnham Park</a> for' never 'visit<a href=\'...\'>Burnham Park</a>for'.",
  "wordCount": 1800
}`;
}

// ─── Main generation function ────────────────────────────────────────────────
export async function generatePost(post, publishedPosts) {
  // Long posts need more tokens — 3,500 words of HTML can exceed 8k tokens
  const maxTokens = post.contentDepth === 'Long' ? 16000 : 8000;

  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: buildSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: buildUserPrompt(post, publishedPosts),
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error: ${err}`);
  }

  const data = await response.json();
  const raw = data.content[0].text;

  // Parse JSON response — robust extraction handles edge cases
  let generated;
  try {
    generated = JSON.parse(raw);
  } catch {
    // Try 1: extract from markdown code fences
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      try {
        generated = JSON.parse(fenceMatch[1].trim());
      } catch { /* fall through */ }
    }

    // Try 2: find the first { and last } and extract everything between
    if (!generated) {
      const start = raw.indexOf('{');
      const end = raw.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        try {
          generated = JSON.parse(raw.slice(start, end + 1));
        } catch { /* fall through */ }
      }
    }

    // Try 3: strip any leading/trailing non-JSON characters
    if (!generated) {
      const cleaned = raw.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      try {
        generated = JSON.parse(cleaned);
      } catch { /* fall through */ }
    }

    // Try 4: response may be truncated — find last complete field and close the JSON
    if (!generated) {
      const start = raw.indexOf('{');
      if (start !== -1) {
        let partial = raw.slice(start);
        // Find the last complete string value (ends with ") before truncation
        const lastQuote = partial.lastIndexOf('"');
        if (lastQuote !== -1) {
          partial = partial.slice(0, lastQuote + 1) + '}}';
          try {
            generated = JSON.parse(partial);
          } catch { /* fall through */ }
        }
      }
    }

    if (!generated) {
      throw new Error(`Failed to parse Claude response as JSON: ${raw.slice(0, 300)}`);
    }
  }

  // Validate required fields
  const required = ['slug', 'metaTitle', 'metaDescription', 'excerpt', 'body'];
  for (const field of required) {
    if (!generated[field]) {
      throw new Error(`Generated content missing required field: ${field}`);
    }
  }

  return {
    ...generated,
    slug: post.title ? slugify(post.title) : generated.slug,
  };
}

// ─── CTR Refresh: generate new meta title + description only ─────────────────
// Does NOT generate or touch the post body. Safe for ranked posts.
export async function generateCtrMeta(post) {
  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: `You are an SEO specialist optimizing meta titles and descriptions for a travel blog about Baguio City and La Trinidad, Philippines. Your only job is to write click-worthy, accurate meta copy that improves CTR from Google search results. Return ONLY a valid JSON object. No markdown, no preamble.`,
      messages: [
        {
          role: 'user',
          content: `Write an improved meta title and meta description for this blog post.

Post title: ${post.title}
Target keyword: ${post.targetKeyword}
Secondary keywords: ${post.secondaryKeywords || 'none'}
Current avg search position: ~6-8 (page 1, needs CTR improvement)
Current year: 2026

Rules:
- metaTitle: under 60 characters, include target keyword, add year or a power word if it fits naturally
- metaDescription: 140-155 characters exactly, include target keyword, clear value prop, subtle CTA
- Do NOT fabricate specific facts (prices, hours) not already implied by the post title
- Tone: warm, helpful, specific — not clickbait

Return ONLY this JSON:
{
  "metaTitle": "...",
  "metaDescription": "..."
}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error (CTR meta): ${err}`);
  }

  const data = await response.json();
  const raw = data.content[0].text.trim();

  let result;
  try {
    result = JSON.parse(raw);
  } catch {
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) result = JSON.parse(match[1]);
    else throw new Error(`Failed to parse CTR meta JSON: ${raw.slice(0, 200)}`);
  }

  if (!result.metaTitle || !result.metaDescription) {
    throw new Error('CTR meta response missing required fields');
  }

  return result;
}

// ─── CTR Refresh: inject missing interlinks into existing HTML body ───────────
// ADDITIVE ONLY. Never rewrites sentences. Never removes existing content.
// Returns unchanged HTML if no natural anchors found for new posts.
export async function injectMissingInterlinks(existingBodyHtml, post, newPostsSincePublish) {
  if (!newPostsSincePublish || newPostsSincePublish.length === 0) {
    return { updatedBody: existingBodyHtml, linksAdded: 0 };
  }

  const postList = newPostsSincePublish
    .map((p) => {
      const slug = p.sanityPostId
        ? p.sanityPostId.replace('post-', '').replace(/-\d+$/, '')
        : p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `- "${p.title}" → https://www.jmgnest.com/things-to-do/${slug}`;
    })
    .join('\n');

  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: `You are an SEO specialist adding internal links to existing blog post HTML.
CRITICAL RULES — follow all without exception:
1. Return the COMPLETE original HTML with only link tag additions
2. NEVER rewrite, rephrase, or restructure any existing sentence or paragraph
3. NEVER remove existing content or existing links
4. ONLY wrap existing text in <a href="..."> tags where a clear natural match exists
5. Add at most ONE link per new post — pick the single best anchor in the entire body
6. If no natural anchor exists for a post, skip it — do NOT force a link
7. Use the exact URL provided — never invent or modify URLs
8. Return ONLY the updated HTML body string. No JSON, no markdown fences, no commentary.`,
      messages: [
        {
          role: 'user',
          content: `Add internal links to this existing blog post HTML only where natural anchor text already exists for the new posts below.

EXISTING POST: "${post.title}"
TARGET KEYWORD: "${post.targetKeyword}"

NEW POSTS TO LINK (only link where naturally mentioned in the body):
${postList}

EXISTING HTML BODY:
${existingBodyHtml}

Return the complete HTML body with only the new <a> tag additions. Nothing else.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error (interlink injection): ${err}`);
  }

  const data = await response.json();
  const updatedBody = data.content[0].text.trim();

  const originalLinks = (existingBodyHtml.match(/href=/g) || []).length;
  const updatedLinks = (updatedBody.match(/href=/g) || []).length;
  const linksAdded = updatedLinks - originalLinks;

  return { updatedBody, linksAdded };
}
