# Phase 4: Differentiators & Enhancements - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement tags/categories with filtering on homepage and RSS feed generation. Dark mode and extensibility hooks removed from phase scope.
</domain>

<decisions>
## Implementation Decisions

### Tag Filtering
- **D-01:** Filter pills UI — clickable tag buttons above entry list (like GitHub tags)
- **D-02:** Multi-tag filter — can select multiple tags, shows entries matching ANY selected tag
- **D-03:** Only show tags with entries — prevents empty filter results
- **D-04:** No clear filter button — click active tag to deselect

### RSS Feed
- **D-05:** Runtime endpoint — `/rss.xml` generates feed on request (not build-time static file)
- **D-06:** Route: `/rss.xml`
- **D-07:** Format: RSS 2.0 only (no Atom)

### Removed from Phase 4
- Dark mode theming — NOT in scope
- Extensibility hooks — NOT in scope

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/ROADMAP.md` § Phase 4 — Phase goals and success criteria
- `src/content.config.ts` — Content collection schema (tags already defined)
- `src/pages/index.astro` — Homepage with tag parsing (reuse existing logic)
- `src/styles/global.css` — Tailwind styling to match

No external specs — requirements fully captured in decisions above
</canonical_refs>

<codebase_context>
## Existing Code Insights

### Reusable Assets
- Tags already in content schema: `tags: z.array(z.string()).optional()`
- Tags already parsed in index.astro (lines 22, 29, 34-36)
- Tailwind CSS already configured
- Astro server mode with node adapter

### Established Patterns
- Frontmatter parsing already done in index.astro
- Entry sorting logic can be reused
- CSS custom properties for colors (extendable for dark mode later)

### Integration Points
- `/rss.xml` new route: src/pages/rss.xml.ts
- Filter UI: add to src/pages/index.astro above entry list
- Tags available from existing frontmatter parsing

### Technical Constraints
- Tags are optional array in schema
- Some entries may not have tags (handle gracefully)
</specifics>

<specifics>
## Specific Ideas

- Filter pills should match existing tag styling (if any)
- RSS feed should include: title, link, description, pubDate
- Entries without tags should appear in "Uncategorized" or show in "All"
- Filter state can be client-side only (no URL params needed for v1)

No specific references — open to standard approaches
</specifics>

<deferred>
## Deferred Ideas

- Dark mode theming — revisit in future phase
- Extensibility hooks for search — decide when implementing search
- Extensibility for other future features

</deferred>
---

*Phase: 04-differentiators-enhancements*
*Context gathered: 2026-04-10*