/**
 * JMG Nest — Notion API Module
 * Reads posts from Notion database and updates their status
 */

const NOTION_VERSION = '2022-06-28';
const BASE_URL = 'https://api.notion.com/v1';

function headers() {
  return {
    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };
}

// ─── Helper: extract plain text from Notion rich text ───────────────────────
function richText(prop) {
  return prop?.rich_text?.map((t) => t.plain_text).join('') || '';
}

function selectValue(prop) {
  return prop?.select?.name || '';
}

function multiSelectValues(prop) {
  return prop?.multi_select?.map((s) => s.name) || [];
}

function urlValue(prop) {
  return prop?.url || '';
}

function dateValue(prop) {
  return prop?.date?.start || '';
}

function titleValue(prop) {
  return prop?.title?.map((t) => t.plain_text).join('') || '';
}

// ─── Map Notion page to clean post object ───────────────────────────────────
function mapPage(page) {
  const p = page.properties;
  return {
    notionId: page.id,
    title: titleValue(p['Title']),
    targetKeyword: richText(p['Target Keyword']),
    secondaryKeywords: richText(p['Secondary Keywords']),
    category: selectValue(p['Category']),
    briefNotes: richText(p['Brief / Notes']),
    featureImageUrl: urlValue(p['Feature Image URL']),
    imageAltText: richText(p['Image Alt Text']),
    status: selectValue(p['Status']),
    postType: selectValue(p['Post Type']),
    clusterName: richText(p['Cluster Name']),
    contentDepth: selectValue(p['Content Depth']) || 'Standard',
    tags: multiSelectValues(p['Tags']),
    publishDate: dateValue(p['Publish Date']),
    lastPublished: dateValue(p['Last Published']),
    distanceFromJmg: richText(p['Distance from JMG']),
    travelTimeFromJmg: richText(p['Travel Time from JMG']),
    sanityPostId: richText(p['Sanity Post ID']),
  };
}

// ─── Fetch all posts with Status = "Refresh" ────────────────────────────────
export async function getRefreshPosts() {
  const dbId = process.env.NOTION_DATABASE_ID;
  const url = `${BASE_URL}/databases/${dbId}/query`;

  const body = {
    filter: {
      property: 'Status',
      select: { equals: 'Refresh' },
    },
    sorts: [{ property: 'Publish Date', direction: 'ascending' }],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion query failed: ${err}`);
  }

  const data = await res.json();
  return data.results.map(mapPage);
}

// ─── Fetch posts with Status = "CTR Refresh" ─────────────────────────────────
export async function getCtrRefreshPosts() {
  const dbId = process.env.NOTION_DATABASE_ID;
  const url = `${BASE_URL}/databases/${dbId}/query`;

  const body = {
    filter: {
      property: 'Status',
      select: { equals: 'CTR Refresh' },
    },
    sorts: [{ property: 'Last Published', direction: 'ascending' }],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion CTR Refresh query failed: ${err}`);
  }

  const data = await res.json();
  return data.results.map(mapPage);
}

// ─── Update Last Published only (for Refresh — preserves original Publish Date) ──
export async function updateLastPublished(notionId) {
  const url = `${BASE_URL}/pages/${notionId}`;
  const now = new Date().toISOString();

  const res = await fetch(url, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({
      properties: {
        Status: { select: { name: 'Published' } },
        'Last Published': { date: { start: now } },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update Last Published in Notion: ${err}`);
  }
}

// ─── Fetch all posts with Status = "Ready" ──────────────────────────────────
export async function getReadyPosts() {
  const dbId = process.env.NOTION_DATABASE_ID;
  const url = `${BASE_URL}/databases/${dbId}/query`;

  const body = {
    filter: {
      property: 'Status',
      select: { equals: 'Ready' },
    },
    sorts: [
      {
        property: 'Publish Date',
        direction: 'ascending',
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion query failed: ${err}`);
  }

  const data = await res.json();
  return data.results.map(mapPage);
}

// ─── Fetch all published posts (for cluster context) ────────────────────────
export async function getAllPublishedNotionPosts() {
  const dbId = process.env.NOTION_DATABASE_ID;
  const url = `${BASE_URL}/databases/${dbId}/query`;

  const body = {
    filter: {
      property: 'Status',
      select: { equals: 'Published' },
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion query failed: ${err}`);
  }

  const data = await res.json();
  return data.results.map(mapPage);
}

// ─── Update post status ──────────────────────────────────────────────────────
export async function updatePostStatus(notionId, status) {
  const url = `${BASE_URL}/pages/${notionId}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({
      properties: {
        Status: {
          select: { name: status },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update Notion status: ${err}`);
  }
}

// ─── Write Sanity Post ID + dates back to Notion ────────────────────────────
export async function updateSanityPostId(notionId, sanityId) {
  const url = `${BASE_URL}/pages/${notionId}`;
  const now = new Date().toISOString();

  const res = await fetch(url, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({
      properties: {
        'Sanity Post ID': {
          rich_text: [{ type: 'text', text: { content: sanityId } }],
        },
        'Publish Date': {
          date: { start: now },
        },
        'Last Published': {
          date: { start: now },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update Sanity Post ID in Notion: ${err}`);
  }
}
