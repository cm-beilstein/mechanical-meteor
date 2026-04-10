# Project Roadmap

## Phases

- [ ] **Phase 1: Project Setup & SSG Selection** - Establish project foundation, select and configure static site generator.
- [ ] **Phase 2: Content Model & Ingestion** - Implement markdown content pipeline and homepage listing.
- [ ] **Phase 3: Core Features & Styling** - Add individual entry pages, metadata, and basic styling.
- [ ] **Phase 4: Differentiators & Enhancements** - Implement tags/categories, RSS, theming, and prepare for future extensibility.

## Phase Details

### Phase 1: Project Setup & SSG Selection
**Goal**: Project is scaffolded with a modern SSG, ready for content and feature development.
**Depends on**: Nothing (first phase)
**Requirements**: SSG selection, repo setup, initial config
**Success Criteria** (what must be TRUE):
  1. Project repository is initialized and accessible.
  2. Static site generator (Astro, Next.js, Hugo, or Eleventy) is installed and configured.
  3. Build process runs and outputs a static site scaffold.
  4. Directory structure separates content, templates, and build logic.
**Plans**: TBD

### Phase 2: Content Model & Ingestion
**Goal**: Markdown content pipeline is established; homepage lists entries from markdown files.
**Depends on**: Phase 1
**Requirements**: Markdown parsing, content directory, homepage listing
**Success Criteria** (what must be TRUE):
  1. Markdown files in a `/content` directory are parsed at build time.
  2. Each markdown file supports frontmatter for metadata (title, date, etc.).
  3. Homepage displays a list of blog/news entries sourced from markdown.
  4. Adding a new markdown file automatically updates the homepage list.
**Plans**: TBD

### Phase 3: Core Features & Styling
**Goal**: Users can view individual entry pages with metadata and experience basic site styling.
**Depends on**: Phase 2
**Requirements**: Routing, entry templates, metadata, CSS
**Success Criteria** (what must be TRUE):
  1. Each entry on the homepage links to its own detail page.
  2. Entry pages display content and metadata (title, date, etc.).
  3. Basic site styling is applied for readability and usability.
  4. Site is responsive and visually coherent across devices.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Differentiators & Enhancements
**Goal**: Site supports advanced features and is ready for future extensibility.
**Depends on**: Phase 3
**Requirements**: Tags/categories, RSS, theming, extensibility hooks
**Success Criteria** (what must be TRUE):
  1. Entries can be tagged/categorized and filtered on the homepage.
  2. RSS feed is generated for all entries.
  3. Theming (e.g., dark mode) is available and switchable.
  4. Codebase is structured to allow easy addition of future features (e.g., search).
**Plans**: TBD
**UI hint**: yes

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup & SSG Selection | 0/4 | Not started | - |
| 2. Content Model & Ingestion | 0/4 | Not started | - |
| 3. Core Features & Styling | 0/4 | Not started | - |
| 4. Differentiators & Enhancements | 0/4 | Not started | - |
