# External Integrations

**Analysis Date:** 2026-04-10

## Dependencies

### Production Dependencies

**Core Framework:**
- `astro@^6.1.5` - Static site generator
- `@astrojs/check@^0.9.8` - TypeScript type checking for Astro

**Content Processing:**
- `gray-matter@^4.0.3` - Markdown frontmatter parser
  - Used in `src/utils/markdown.ts` and `src/utils/markdown.cjs`
  - Parses YAML frontmatter from Markdown files
  - Provides `data` (frontmatter) and `content` (body) separation

### Development Dependencies

**Type System:**
- `typescript@^5.9.3` - TypeScript compiler
- `@types/node@^25.5.2` - Node.js type definitions

## Content Sources

### Markdown Files (Local)

**Source:** `content/blog/` directory

**Files:**
- `example.md` - Example blog post with title, date, tags frontmatter
- `test.md` - Test blog post
- `test_v1.md` - Version 1 test post

**Processing:**
- Frontmatter parsed by `gray-matter`
- Content accessed via Astro Content Collections API
- Schema validation via Zod in `content.config.ts`

## No External API Integrations

**This project does NOT currently use:**
- No CMS integration (Contentful, Sanity, Prismic)
- No database connections
- No authentication providers
- No external fetch/API clients
- No email services
- No analytics/tracking services

## Utility Functions

### Markdown Utilities (`src/utils/`)

**`src/utils/markdown.ts`** - ESM utility
- Imports `gray-matter` for frontmatter parsing
- Reads `content/` directory directly with `fs.readdirSync`
- Provides `getAllEntries()` function
- Returns typed `Entry` objects with metadata and content

**`src/utils/markdown.cjs`** - CommonJS version
- Compiled from TypeScript
- Same functionality as markdown.ts
- Uses `require()` syntax for Node compatibility

### Dual Utility Pattern

The codebase maintains both ESM and CJS versions of the markdown utility. The CJS version (`markdown.cjs`) appears to be a compiled output, while the TypeScript source (`markdown.ts`) is the canonical version.

## External Links (Hardcoded)

### Astro Branding
- `https://astro.build` - Framework homepage
- `https://docs.astro.build` - Documentation
- `https://astro.build/chat` - Discord community
- `https://astro.build/blog/astro-6-beta/` - Astro 6 release announcement

### Assets
- Astro logo SVG imported from `src/assets/astro.svg`
- Background pattern from `src/assets/background.svg`

## Static Assets

**Location:** `public/` directory

**Files:**
- `favicon.ico` - Browser tab icon (legacy)
- `favicon.svg` - Scalable favicon

**Build Behavior:**
- All files in `public/` copied to `dist/` as-is
- No image processing or optimization configured

## Build Configuration

**Config File:** `astro.config.mjs`

Current configuration is minimal:
```javascript
export default defineConfig({});
```

No integrations enabled (no React, Vue, Tailwind integration, image optimization, etc.).

## Environment Configuration

**No `.env` files detected.**

The project uses Astro's defaults without environment-specific configuration.

## Potential Future Integrations

Based on current codebase patterns, these integrations could be considered:

1. **Tailwind Integration** - Add via `@astrojs/tailwind` for enhanced CSS
2. **Image Optimization** - Add `@astrojs/image` for responsive images
3. **CMS Content** - Replace markdown files with Contentful/Sanity/Prismic
4. **Search** - Add Algolia or Fuse.js for content search
5. **Comments** - Add Giscus or Disqus for blog comments

---

*Integration audit: 2026-04-10*
