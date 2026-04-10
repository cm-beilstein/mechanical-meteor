# Feature Landscape

**Domain:** Static content website (blog/news)
**Researched:** 2026-04-09

## Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Homepage lists entries | Core blog/news UX | Low | List from markdown |
| Individual entry pages | Deep linking, SEO | Low | Route per file |
| Add entry via markdown | Easy content updates | Low | No code changes needed |
| Metadata/frontmatter | Sorting, SEO, display | Low | Use gray-matter |
| Basic styling | Readability | Low | CSS or framework |

## Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Tags/categories | Content discovery | Med | Needs metadata, filtering |
| RSS feed | Syndication | Med | SSG plugin or custom |
| Search (static) | UX | High | Requires indexing at build |
| Theming/dark mode | Personalization | Med | CSS/JS |
| Author profiles | Credibility | Med | More metadata |

## Anti-Features

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Dynamic comments | Static site = no backend | Use 3rd-party (e.g., Disqus) if needed |
| Inline editing | Breaks static model | Edit markdown in repo |

## Feature Dependencies

Homepage → Individual entry pages (listing links to detail)
Tags/categories → Metadata in markdown
Search → All content available at build

## MVP Recommendation

Prioritize:
1. Homepage listing
2. Individual entry pages
3. Add entry via markdown

Defer: Search, tags, RSS (add after core is stable)

## Sources

- https://jamstack.org/generators/ (HIGH)
- https://docs.astro.build/en/guides/content-collections/ (HIGH)
- https://www.11ty.dev/docs/data/ (HIGH)
