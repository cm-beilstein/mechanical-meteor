# Codebase Structure

**Analysis Date:** 2026-04-10

## Directory Layout

```
mechanical-meteor/
├── .astro/              # Astro internal files (generated)
│   ├── types.d.ts       # Generated TypeScript types
│   └── content.d.ts      # Content collection types
├── .planning/           # GSD planning artifacts
│   ├── codebase/        # Codebase intelligence
│   ├── phases/          # Phase directories
│   └── intel/           # Project intelligence
├── .vscode/             # VS Code settings
├── content/             # Markdown content
│   └── blog/            # Blog post markdown files
├── dist/                # Build output (generated)
├── node_modules/        # Dependencies (generated)
├── public/              # Static public assets
├── src/                 # Source code
│   ├── assets/          # Imported assets (SVG, images)
│   ├── components/       # Reusable Astro components
│   ├── layouts/         # Page layout components
│   ├── pages/           # File-based routing
│   ├── styles/          # Global CSS
│   └── utils/           # Utility functions
├── astro.config.mjs     # Astro configuration
├── content.config.ts    # Content collections config
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## Directory Purposes

### `src/`

**Purpose:** Primary source code directory

**Contains:** All application source code

**Key characteristics:**
- Astro components (`.astro`)
- TypeScript modules (`.ts`)
- Assets and styles

### `src/pages/`

**Purpose:** File-based routing and page components

**Contains:**
- `index.astro` - Homepage/list page
- `[slug].astro` - Dynamic blog post page

**Routing behavior:**
- File name = URL path
- `index.astro` → `/`
- `[slug].astro` → `/{slug}`

**Key files:**
- `src/pages/index.astro`: Blog listing page using `getCollection('blog')`
- `src/pages/[slug].astro`: Dynamic post page with `getStaticPaths()`

**Pattern for adding pages:**
1. Create `.astro` file in `src/pages/`
2. Export frontmatter with imports and data fetching
3. Write HTML template with component syntax

### `src/layouts/`

**Purpose:** Shared page structure and base HTML

**Contains:**
- `Layout.astro` - Base HTML wrapper

**Pattern:** Layouts provide `<!doctype html>`, `<head>`, `<body>` with `<slot />`

**Usage pattern:**
```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
  <main>
    <!-- Page content here -->
  </main>
</Layout>
```

**Note:** Pages currently have inline HTML instead of using layout (see `index.astro`, `[slug].astro`)

### `src/components/`

**Purpose:** Reusable UI components

**Contains:**
- `Welcome.astro` - Example/placeholder component

**Pattern:**
- `.astro` files with scoped styles
- Props defined in frontmatter
- Imports assets from `src/assets/`

**Usage pattern:**
```astro
---
import Welcome from '../components/Welcome.astro';
---
<Welcome />
```

### `src/utils/`

**Purpose:** Pure TypeScript utility functions

**Contains:**
- `markdown.ts` - Alternative markdown processing (not using Content Collections)

**Pattern:**
```typescript
import fs from 'fs';
import matter from 'gray-matter';

export interface EntryMeta {
  title: string;
  date: string;
  tags?: string[];
  slug: string;
}
```

**Usage:** Import functions in `.astro` frontmatter or other utilities

### `src/styles/`

**Purpose:** Global CSS and styling

**Contains:**
- `global.css` - Global styles with Tailwind import

**Pattern:**
```css
@import "tailwindcss";

body {
  font-family: system-ui, sans-serif;
}
```

**Integration:** Imported in pages or layouts for global styles

### `src/assets/`

**Purpose:** Assets imported into components (Vite-managed)

**Contains:**
- `astro.svg` - Astro logo
- `background.svg` - Background graphic

**Behavior:**
- Vite processes these files
- `import logo from '../assets/astro.svg'`
- Results in optimized URL reference

**Not for public access:** Use `public/` for direct-access assets

### `content/`

**Purpose:** Markdown-based content managed by Content Collections

**Contains:**
- `blog/` - Blog post markdown files

**Structure:**
```
content/
└── blog/
    ├── example.md
    ├── test.md
    └── test_v1.md
```

**Content format:**
```markdown
---
title: "Post Title"
date: 2026-04-09
tags: [intro, welcome]
---

Post content here...
```

### `public/`

**Purpose:** Static assets served directly

**Contains:**
- `favicon.ico` - Favicon for older browsers
- `favicon.svg` - Favicon for modern browsers

**Behavior:**
- Copied as-is to `dist/`
- Accessible at root URL (`/favicon.svg`)

**Pattern:** Use for logos, fonts, static JSON, robots.txt

## Key File Locations

### Entry Points

**Development:**
- `npm run dev` → Astro dev server
- `astro.config.mjs` is the entry configuration

**Build:**
- `npm run build` → Generates `dist/`
- `package.json` scripts define commands

### Configuration

- `astro.config.mjs`: Astro framework config
- `content.config.ts`: Content Collections schema
- `tsconfig.json`: TypeScript settings (extends `astro/tsconfigs/strict`)
- `package.json`: Dependencies and scripts

### Core Logic

- `src/pages/index.astro`: Blog listing
- `src/pages/[slug].astro`: Blog post renderer
- `src/layouts/Layout.astro`: Base HTML layout
- `src/components/Welcome.astro`: Example component
- `src/utils/markdown.ts`: Alternative content parsing

### Testing

- **No test files detected** in current codebase
- **No testing framework** in dependencies

## Naming Conventions

### Files

- **Astro components:** `PascalCase.astro` (e.g., `Layout.astro`, `Welcome.astro`)
- **TypeScript files:** `camelCase.ts` (e.g., `markdown.ts`)
- **Config files:** `camelCase.ext` (e.g., `content.config.ts`, `astro.config.mjs`)
- **Content files:** `kebab-case.md` (e.g., `example.md`, `test-post.md`)

### Directories

- **Source directories:** `lowercase/` (e.g., `src/`, `components/`, `utils/`)
- **Content directories:** `lowercase/` (e.g., `content/`, `blog/`)

### Variables and Functions

- **Component props:** `camelCase` (e.g., `entry`, `slug`)
- **Imports:** `PascalCase` for components, `camelCase` for utilities
- **Exports:** Named exports for collections, default for utilities

### CSS Classes

- **No specific convention detected**
- **Scoped styles:** Component-specific classes
- **Global styles:** Simple, semantic class names

## Where to Add New Code

### New Blog Post

**Primary code:** `content/blog/new-post.md`
- Create new `.md` file
- Add frontmatter with title, date, tags
- Write content in Markdown

**No additional code needed:** Content Collections auto-discovers new files

### New Page

**Primary code:** `src/pages/new-page.astro`
```astro
---
// Frontmatter: imports and data fetching
import Layout from '../layouts/Layout.astro';
---

<Layout>
  <main>
    <!-- Page content -->
  </main>
</Layout>
```

**Dynamic route:** `src/pages/[category]/[slug].astro`
- Use `getStaticPaths()` to generate paths
- Access params via `Astro.params`

### New Component

**Primary code:** `src/components/NewComponent.astro`
```astro
---
// Frontmatter: imports, props, logic
const { title = 'Default' } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  <slot />
</div>

<style>
  .component {
    /* Scoped styles */
  }
</style>
```

**Tests:** Create `src/components/NewComponent.test.ts` (if testing added)

### New Utility

**Primary code:** `src/utils/newUtility.ts`
```typescript
export interface UtilityResult {
  data: string;
}

export function processUtility(input: string): UtilityResult {
  return { data: input.toUpperCase() };
}
```

### New Layout

**Primary code:** `src/layouts/BaseLayout.astro`
```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Special Directories

### `.astro/`

**Purpose:** Astro-generated type definitions and cache

**Contains:**
- `types.d.ts` - Base Astro types
- `content.d.ts` - Content Collection types

**Generated:** Yes (regenerated on build/dev)

**Committed:** Yes (in git)

### `dist/`

**Purpose:** Production build output

**Contains:** Static HTML, CSS, JS, assets

**Generated:** Yes (created on `npm run build`)

**Committed:** No (should be in `.gitignore`)

### `node_modules/`

**Purpose:** Installed npm dependencies

**Generated:** Yes (via `npm install`)

**Committed:** No (should be in `.gitignore`)

### `.planning/`

**Purpose:** GSD workflow planning artifacts

**Contains:** Phase directories, codebase docs, roadmap

**Generated:** By GSD commands

**Committed:** Yes (project documentation)

## Asset Management

### Imported Assets (`src/assets/`)

**Pattern:** Import into components for Vite processing

```astro
---
import logo from '../assets/astro.svg';
---
<img src={logo.src} alt="Logo" />
```

**Benefits:**
- Vite optimization
- Hash-based caching
- Type checking

### Public Assets (`public/`)

**Pattern:** Direct reference in HTML

```html
<link rel="icon" href="/favicon.svg" />
```

**Use cases:**
- Favicons
- Static JSON files
- Files that shouldn't be processed

### CSS Assets

**Pattern:** Import in stylesheets

```css
@import "tailwindcss";
```

**Note:** Global CSS in `src/styles/global.css`

## Bootstrap Flow

### Development Startup

1. `npm run dev` executes `astro dev`
2. Astro reads `astro.config.mjs`
3. TypeScript checking via `@astrojs/check`
4. Dev server starts on port 4321
5. Content Collections types loaded from `content.config.ts`
6. File watcher starts for hot reload

### Build Process

1. `npm run build` executes `astro build`
2. Astro reads configuration
3. TypeScript compiled via `tsconfig.json`
4. `getStaticPaths()` generates all dynamic routes
5. Content Collections parsed
6. Pages rendered to HTML
7. Assets optimized and copied
8. Output written to `dist/`

### Content Loading

1. `getCollection('blog')` queries all entries
2. Frontmatter validated against schema
3. Entries available with `entry.data` and `entry.body`
4. `getEntryBySlug()` fetches single entry for dynamic routes

---

*Structure analysis: 2026-04-10*
