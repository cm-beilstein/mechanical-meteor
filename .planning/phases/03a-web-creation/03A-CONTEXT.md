# Phase 3A: Web-Based Blog Creation - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable users to create blog posts directly from the website without needing to edit markdown files manually. Users access a form page, enter content with live preview, and posts are saved as .md files.
</domain>

<decisions>
## Implementation Decisions

### Layout
- **D-01:** Side-by-side layout — form on left, live markdown preview on right
- Rationale: Best for writing with immediate feedback

### Save Mechanism
- **D-02:** API endpoint — server-side API writes .md file to content collection
- API route at `/api/create-post` accepts JSON, returns success/error
- Frontmatter includes: title, date (auto-generated), tags (if provided)
- Requires Astro SSR adapter for file system write access

### Success Flow
- **D-03:** Redirect to new post — after successful save, navigate to the new post's page
- Post immediately appears on homepage after save

### Form Fields
- **D-04:** Title (required) — text input
- **D-05:** Content/Markdown (required) — textarea with monospace font
- **D-06:** Tags (optional) — comma-separated input

### File Naming
- **D-07:** Auto-generate slug from title — lowercase, hyphenated
- Duplicate slug handling: append number (e.g., my-post-2)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/ROADMAP.md` § Phase 3A — Phase goals and success criteria
- `src/content/blog/example.md` — Frontmatter format (title, date, tags)
- `src/content.config.ts` — Content collection schema
- `src/styles/global.css` — Tailwind styling to match

No external specs — requirements fully captured in decisions above
</canonical_refs>

<codebase_context>
## Existing Code Insights

### Reusable Assets
- Layout.astro: Base layout with container — can be reused for create page
- Tailwind CSS: Already configured — use for styling form and preview
- Article card styles: Can apply to preview component

### Established Patterns
- Astro content collections with glob loader
- Date handling: convert string to Date, use toLocaleDateString()
- Slug generation: use entry.id from Astro

### Integration Points
- /create page: New route in src/pages/create.astro
- /api/create-post: API route in src/pages/api/create-post.ts
- Homepage: Already auto-updates when content changes (build time)

### Technical Constraints
- Astro SSG can't write files at runtime — needs SSR adapter
- Content collection schema: title (string), date (string|date), tags (optional)
</codebase_context>

<specifics>
## Specific Ideas

- Form should have same styling as article-card for preview
- Title input should be prominent, like entry title styling
- Success/error messages should be styled consistently
- "Create Post" link should appear on homepage

No specific references — open to standard approaches
</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope
</deferred>

---

*Phase: 03A-web-creation*
*Context gathered: 2026-04-10*
