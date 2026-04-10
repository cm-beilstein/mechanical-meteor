# Research Summary: Static Blog/News Site

**Domain:** Static content website (blog/news)
**Researched:** 2026-04-09
**Overall confidence:** HIGH

## Executive Summary

This research investigates the technical and architectural decisions for building a static website that displays blog/news entries on the homepage, allows viewing individual entries, and supports adding new entries by placing markdown files in a directory. The modern best practice is to use a static site generator (SSG) such as Next.js (with static export), Astro, Hugo, or Eleventy, which provides robust markdown parsing, content organization, and extensibility. Markdown files should be organized in a dedicated content directory, with frontmatter for metadata. Parsing is typically handled by libraries like gray-matter and remark. Extensibility is achieved via plugins or custom build steps. The architecture should separate content, templates, and build logic, enabling easy addition of new features (e.g., tags, search, RSS) without major rewrites.

## Key Findings

**Stack:** Use a modern SSG (Astro, Next.js static export, Hugo, or Eleventy) with markdown parsing via gray-matter/remark.
**Architecture:** Content in /content as markdown, templates/components for rendering, build step generates static HTML.
**Critical pitfall:** Mixing content and code, or not using frontmatter for metadata, leads to maintainability issues.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Project scaffolding & SSG setup** - Establishes foundation, ensures best practices from start.
   - Addresses: SSG selection, markdown parsing, file organization
   - Avoids: Ad-hoc build scripts, future migration pain

2. **Content ingestion & homepage listing** - Core feature, validates content pipeline.
   - Addresses: Markdown parsing, homepage rendering
   - Avoids: Manual content updates

3. **Individual entry pages** - Enables deep linking and SEO.
   - Addresses: Routing, template rendering
   - Avoids: Flat HTML files per post

4. **Extensibility hooks** - Prepares for future features (tags, search, RSS).
   - Addresses: Plugin system, modular build
   - Avoids: Hardcoded logic

**Phase ordering rationale:**
- Foundation first (SSG, structure), then core features (listing, detail), then extensibility.

**Research flags for phases:**
- Phase 1: SSG choice impacts all downstream work—validate requirements.
- Phase 4: Extensibility needs may require deeper research if advanced features are planned.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | SSGs and markdown parsing are mature, well-documented |
| Features | HIGH | Table stakes for static blogs are well-known |
| Architecture | HIGH | Clear separation of content, templates, build |
| Pitfalls | HIGH | Common mistakes are well-documented in SSG communities |

## Gaps to Address

- If advanced features (e.g., search, comments) are needed, further research on extensibility and static/dynamic tradeoffs is required.
- SSG selection should be validated against team familiarity and deployment targets.
