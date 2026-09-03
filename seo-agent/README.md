# JMG Nest — SEO Content Agent

Automated weekly pipeline: Notion → Claude API → Sanity.io → jmgnest.com

## How it works

1. Every Monday at 8AM PH time, GitHub Actions triggers the agent
2. Agent reads all posts marked **Ready** from your Notion database
3. Claude generates SEO-optimised content with internal linking
4. Content is uploaded directly to Sanity and published live
5. Notion status is updated to **Published** with the Sanity post ID written back

## File structure

```
seo-agent/
├── agent.js        # Main orchestrator
├── notion.js       # Notion API — read posts, update status
├── generate.js     # Claude API — content generation
├── sanity.js       # Sanity API — upload posts + images
└── package.json

.github/
└── workflows/
    └── seo-agent.yml   # GitHub Actions cron job
```

## Setup

### 1. Add GitHub Secrets

Go to your repo → Settings → Secrets and variables → Actions → New repository secret

| Secret name | Value |
|---|---|
| `NOTION_TOKEN` | Your Notion integration token |
| `NOTION_DATABASE_ID` | `32442e5be5bb801280f8f2e6ffe9bbf2` |
| `ANTHROPIC_API_KEY` | Your Claude API key |
| `SANITY_PROJECT_ID` | `6hp1010s` |
| `SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Your Sanity write token |
| `SANITY_AUTHOR_ID` | Your Sanity author document ID |

### 2. Get your Sanity Author ID

Run this GROQ query in your Sanity Vision tool:
```
*[_type == "author"][0]._id
```
Copy the result and add it as `SANITY_AUTHOR_ID` secret.

### 3. Place files in your repo

```
your-repo/
├── seo-agent/          ← place agent files here
│   ├── agent.js
│   ├── notion.js
│   ├── generate.js
│   ├── sanity.js
│   └── package.json
└── .github/
    └── workflows/
        └── seo-agent.yml   ← place workflow file here
```

### 4. Test manually

Go to GitHub → Actions → SEO Content Agent → Run workflow

## Notion database workflow

| Status | Meaning |
|---|---|
| `Ready` | Agent will pick this up next run |
| `On Hold` | Cluster post waiting for its pillar to be published |
| `Generated` | Content generated (intermediate state) |
| `Published` | Live on jmgnest.com |

## Cluster + pillar rules

- Always mark your **Pillar** post as `Ready` before its cluster posts
- If a **Cluster** post is `Ready` but its pillar isn't live yet, it's automatically set to `On Hold`
- The agent re-checks `On Hold` posts each run — they publish automatically once the pillar is live
- **Standalone** posts publish independently with no dependencies

## Content depth targets

| Setting | Target word count |
|---|---|
| Short | ~1,000 words |
| Standard | ~1,800 words |
| Long | ~3,500 words |

## Estimated cost

~$0.50–$1.00/month for 4 posts/week using Claude Sonnet.
