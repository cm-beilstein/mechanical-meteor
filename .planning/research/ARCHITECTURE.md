# Architecture Patterns

**Domain:** Static content website (blog/news)
**Researched:** 2026-04-09

## Recommended Architecture

A static site generator (SSG) ingests markdown files from a /content or /posts directory, parses frontmatter for metadata, and generates static HTML pages using templates/components. The homepage lists entries (sorted by date or other metadata), and each entry has its own route. Build step outputs static assets for deployment.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Content directory | Markdown source files | Build pipeline |
| Markdown parser | Parse content/metadata | Build pipeline |
| Templates/components | Render HTML | Build pipeline |
| Build pipeline | Orchestrate parsing/rendering | All above |
| Static assets | Final HTML/CSS/JS | Hosting/CDN |

### Data Flow

Markdown files → Markdown parser (gray-matter/remark) → Templates/components → Static HTML → Deployed to CDN

## Patterns to Follow

### Pattern 1: Content-Driven Routing
**What:** Each markdown file becomes a route/page
**When:** Always for static blogs/news
**Example:**
```js
// Astro/Next.js getStaticPaths
const posts = getAllMarkdownFiles()
return posts.map(post => ({ params: { slug: post.slug } }))
```

### Pattern 2: Frontmatter Metadata
**What:** Use YAML frontmatter for title, date, tags
**When:** Always
**Example:**
```markdown
---
title: "My Post"
date: "2026-04-09"
tags: [news, update]
---
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Mixing Content and Code
**What:** Placing markdown in code directories
**Why bad:** Hard to maintain, breaks separation
**Instead:** Use /content or /posts

### Anti-Pattern 2: No Frontmatter
**What:** No metadata in markdown
**Why bad:** Can't sort/filter, poor SEO
**Instead:** Always use frontmatter

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---------|--------------|--------------|-------------|
| Build time | Fast | Fast | May slow with 10K+ posts |
| CDN delivery | Fast | Fast | Fast |
| Content updates | Manual | Manual | Manual or automate via CI |

## Sources

- https://docs.astro.build/en/guides/content-collections/ (HIGH)
- https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths (HIGH)
- https://www.11ty.dev/docs/data/ (HIGH)
