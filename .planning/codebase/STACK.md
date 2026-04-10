# Technology Stack

**Analysis Date:** 2026-04-10

## Languages

**Primary:**
- TypeScript 5.9.3 - All source files use TypeScript for type safety

**Secondary:**
- Markdown - Blog content stored as `.md` files with frontmatter

## Runtime

**Environment:**
- Node.js >= 22.12.0 (specified in `package.json` `engines` field)

**Package Manager:**
- npm (implied by `package-lock.json` presence)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Astro 6.1.5 - Static site generator with content collections
  - Content Collections API for type-safe markdown management
  - Static page generation via `getStaticPaths()`
  - Built-in component and layout system

**Type Checking:**
- @astrojs/check 0.9.8 - TypeScript checking integration for Astro

**Build:**
- Astro CLI (`astro dev`, `astro build`, `astro preview`)

## Styling

**Approach:** Hybrid - Global CSS + Astro component-scoped styles

**CSS Framework:**
- Tailwind CSS - Imported via `@import "tailwindcss"` in `src/styles/global.css`
  - Used as utility classes alongside custom CSS
  - Configuration not present (using Tailwind defaults)

**Custom CSS:**
- Global styles defined in `src/styles/global.css`
  - Body font: `system-ui, sans-serif`
  - Theme: Light (#f9f9f9 background, #222 text)
  - Article cards with box-shadow and border-radius
  - Mobile responsive with 600px breakpoint

**Component Scoped Styles:**
- Astro `<style>` blocks in components (e.g., `src/layouts/Layout.astro`, `src/components/Welcome.astro`)
- Styles are scoped to component by default in Astro

## Content System

**Framework:** Astro Content Collections (v2 API with v6)

**Collections Defined:**
- `blog` collection in `content.config.ts`
  - Type: `content` (Markdown files)
  - Schema:
    ```typescript
    {
      title: z.string(),
      date: z.string(),
      tags: z.array(z.string()).optional(),
    }
    ```

**Content Location:**
- `content/blog/` - Markdown files with YAML frontmatter
- Example entries: `example.md`, `test.md`, `test_v1.md`

**Rendering:**
- Use `getCollection('blog')` to fetch entries
- Use `entry.body` for raw Markdown content
- Use `entry.data` for frontmatter with full type safety
- Dynamic routes via `src/pages/[slug].astro`

## TypeScript Configuration

**Config File:** `tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

**Key Settings:**
- Extends Astro's strict TypeScript configuration
- Includes: `.astro/types.d.ts`, `content.config.ts`, `**/*`
- Excludes: `dist/`

**Type Generation:**
- `.astro/content.d.ts` - Auto-generated type definitions for content collections
- `.astro/types.d.ts` - Astro client type references

## Build Output

**Static Site Generation:**
- Output directory: `dist/` (implied default)
- All pages pre-rendered at build time

## Project Structure Summary

```
src/
├── assets/          # SVG assets (astro.svg, background.svg)
├── components/      # Astro components (Welcome.astro)
├── layouts/         # Page layouts (Layout.astro)
├── pages/           # Routes (index.astro, [slug].astro)
├── styles/          # Global CSS (global.css)
└── utils/           # Utilities (markdown.ts, markdown.cjs)
content/
└── blog/            # Markdown blog posts
public/
└── favicon.*        # Static favicons
```

---

*Stack analysis: 2026-04-10*
