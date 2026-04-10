# Architecture

**Analysis Date:** 2026-04-10

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Astro Islands Architecture

**Key Characteristics:**
- Static-first approach: All pages pre-rendered at build time
- Zero JavaScript by default: HTML generated at build, hydrated only when needed
- Content-driven: Markdown files as primary content source
- Island architecture readiness: Components can opt into client-side interactivity

## Rendering Approach

### Static Site Generation (SSG)

**Mode:** Full static generation via `astro build`

**Configuration:**
- `astro.config.mjs` uses `defineConfig({})` with no adapter
- No server-side rendering (SSR) configured
- All routes pre-rendered to HTML at build time

**Build Output:**
- Generated to `dist/` directory
- Static HTML, CSS, and JS assets
- Deployable to any static host (Netlify, Vercel, GitHub Pages, etc.)

### Astro Islands Architecture

**Pattern:** Component-level hydration

- **Default behavior:** All components render as static HTML
- **Interactive islands:** Add `client:*` directives to enable JS hydration
- **Current state:** Minimal interactivity; blog is primarily read-only content

**Hydration directives available:**
- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when browser is idle
- `client:visible` - Hydrate when component enters viewport
- `client:media` - Hydrate when media query matches

## Layers

### Content Layer

- **Purpose:** Store and manage markdown-based blog posts
- **Location:** `content/blog/`
- **Contains:** Markdown files with YAML frontmatter
- **Managed by:** Astro Content Collections API
- **Accessed via:** `getCollection()`, `getEntryBySlug()` in `src/pages/`

### Routing Layer

- **Purpose:** Map URLs to page components
- **Location:** `src/pages/`
- **Contains:** `.astro` files and directories
- **Pattern:** File-based routing
  - `index.astro` → `/`
  - `[slug].astro` → `/blog-post-slug`
- **Generated paths:** `getStaticPaths()` in dynamic routes

### Layout Layer

- **Purpose:** Provide consistent page structure and styling
- **Location:** `src/layouts/`
- **Contains:** `Layout.astro` - base HTML template with `<slot />`
- **Pattern:** Pages import and wrap content with layout
- **Styles:** Global CSS imported, scoped component styles

### Component Layer

- **Purpose:** Reusable UI pieces
- **Location:** `src/components/`
- **Contains:** `.astro` components (Welcome.astro)
- **Patterns:**
  - Component imports assets via `src/assets/`
  - Scoped styles with `<style>` blocks
  - Props passed via frontmatter exports

### Utility Layer

- **Purpose:** Shared helper functions
- **Location:** `src/utils/`
- **Contains:** TypeScript modules (markdown.ts)
- **Pattern:** Pure functions, no Astro-specific code
- **Note:** Alternative to Content Collections - direct file reading with `gray-matter`

## Data Flow

### Blog Listing Flow (`/`)

```
1. User requests /
2. Astro matches src/pages/index.astro
3. getCollection('blog') fetches all entries
4. Entries mapped to links with slugs
5. HTML generated with entry list
6. Static HTML served
```

**Code path:** `src/pages/index.astro`
```astro
import { getCollection } from 'astro:content';
const entries = await getCollection('blog');
// → entries.map(entry => <li><a href={`/${entry.slug}`}>)
```

### Blog Post Flow (`/[slug]`)

```
1. User requests /example
2. Astro matches src/pages/[slug].astro
3. getStaticPaths() generates paths from all entries
4. For matching slug:
   a. getEntryBySlug('blog', slug) fetches entry
   b. entry.body contains rendered markdown
   c. entry.data contains frontmatter (title, date, tags)
5. HTML generated with article content
6. Static HTML served
```

**Code path:** `src/pages/[slug].astro`
```astro
export async function getStaticPaths() {
  const entries = await getCollection('blog');
  return entries.map(entry => ({ params: { slug: entry.slug } }));
}
// → <h1>{entry.data.title}</h1>
// → <div innerHTML={entry.body} />
```

## State Management Approach

### Server State (Build-time)

- **Content state:** Loaded via `getCollection()` at build time
- **No runtime state:** Static site has no server-side state
- **URL-driven navigation:** State encoded in URLs

### Client State

- **Minimal/none:** Blog is primarily static content
- **URL parameters:** Could use `?search=...` for filtering (not implemented)
- **localStorage/sessionStorage:** Not used
- **Component state:** Not applicable (no interactive components)

### Future State Options

If interactivity is needed:
- **Nano Stores:** Lightweight reactive state (`nanostores`)
- **Preact Signals:** Fine-grained reactivity
- **Vanilla JS:** Simple `useState` equivalent patterns

## Key Abstractions

### Content Collections

**Purpose:** Type-safe access to content with schema validation

**Definition:** `content.config.ts`
```typescript
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});
```

**Access:**
- `getCollection('blog')` - All entries
- `getEntryBySlug('blog', slug)` - Single entry by slug

### Layout Component

**Purpose:** Wrap pages with consistent HTML structure

**Pattern:** `src/layouts/Layout.astro`
- Provides `<!doctype html>`, `<head>`, `<body>`
- Uses `<slot />` for page content injection
- Scoped styles for base layout

### Markdown Frontmatter

**Purpose:** Metadata for blog posts

**Schema:**
```yaml
---
title: "Post Title"
date: 2026-04-09
tags: [intro, welcome]
---
```

## Entry Points

### Development Server

**Entry:** `npm run dev`
- Starts Astro dev server
- Source: `astro.config.mjs`
- Default port: 4321

### Build Process

**Entry:** `npm run build`
- Generates static site to `dist/`
- Uses `tsconfig.json` for TypeScript compilation
- Runs Astro's build pipeline

### Preview

**Entry:** `npm run preview`
- Serves built `dist/` directory locally
- For testing production build

## Error Handling

### Build-time Errors

- **Missing content:** `throw new Error()` in `[slug].astro` if entry not found
- **Type errors:** TypeScript strict mode enabled
- **Content schema:** Zod validation via `defineCollection()`

### Runtime Errors

- **N/A:** Static site has no server runtime
- **404:** Handled by static hosting (no custom 404 page found)

## Cross-Cutting Concerns

### Styling

**Approach:** Scoped component styles + global CSS

- **Global styles:** `src/styles/global.css` with Tailwind import
- **Component styles:** `<style>` blocks in `.astro` files
- **Scoped by default:** Astro scopes styles to component
- **No CSS-in-JS:** Pure CSS with Tailwind utility classes

### Asset Handling

**Approach:** Vite-powered asset pipeline

- **Local assets:** Stored in `src/assets/`
- **Imported in components:** `import logo from '../assets/logo.svg'`
- **Public assets:** Placed in `public/` for direct access
- **Optimization:** Vite handles minification and hashing

### TypeScript

**Configuration:** Strict mode via `astro/tsconfigs/strict`

- **Checking:** Via `@astrojs/check`
- **Content types:** Generated in `.astro/types.d.ts`
- **Collections types:** `content.config.ts` defines collection schemas

---

*Architecture analysis: 2026-04-10*
