# Domain Pitfalls

**Domain:** Static content website (blog/news)
**Researched:** 2026-04-09

## Critical Pitfalls

### Pitfall 1: Mixing Content and Code
**What goes wrong:** Markdown files scattered in src/
**Why it happens:** No clear content directory
**Consequences:** Hard to maintain, migration pain
**Prevention:** Use /content or /posts
**Detection:** Content files outside content dir

### Pitfall 2: No Frontmatter
**What goes wrong:** No metadata for posts
**Why it happens:** Skipped for speed
**Consequences:** Can't sort/filter, poor SEO
**Prevention:** Enforce frontmatter in all posts
**Detection:** Lint for missing frontmatter

## Moderate Pitfalls

### Pitfall 1: Ad-hoc Markdown Parsing
**What goes wrong:** Inconsistent parsing, bugs
**Prevention:** Use mature libraries (remark, gray-matter)

### Pitfall 2: Manual Routing
**What goes wrong:** Hardcoded HTML per post
**Prevention:** Use SSG routing features

## Minor Pitfalls

### Pitfall 1: No Build Automation
**What goes wrong:** Forget to rebuild after adding content
**Prevention:** Use CI/CD or pre-commit hooks

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| SSG setup | Wrong SSG for needs | Validate requirements |
| Content ingestion | Missing frontmatter | Lint/check on build |
| Extensibility | Hardcoded logic | Use plugins/hooks |

## Sources

- https://docs.astro.build/en/guides/content-collections/ (HIGH)
- https://jamstack.org/best-practices/ (HIGH)
