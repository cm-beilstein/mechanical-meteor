# Coding Conventions

**Analysis Date:** 2026-04-10

## Naming Patterns

### Files

**Astro Components:**
- Use PascalCase: `Welcome.astro`, `Layout.astro`
- One component per file
- File name matches component name exactly

**Pages:**
- Use kebab-case: `index.astro`, `[slug].astro`
- Dynamic routes use brackets: `[slug].astro`
- Rest parameters use ellipsis: `[...slug].astro`

**Utilities/Modules:**
- Use kebab-case or camelCase: `markdown.ts`
- One utility per file with related functions
- Clear, descriptive names: `markdown.ts` for markdown utilities

**Configuration Files:**
- Use dot-prefix pattern: `.gitignore`, `.env`
- Astro config: `astro.config.mjs`
- Content config: `content.config.ts`
- TypeScript: `tsconfig.json`

**Assets:**
- Use lowercase with descriptive names: `astro.svg`, `background.svg`
- Follow established naming within subdirectories

### Types and Interfaces

**TypeScript Interfaces:**
```typescript
// src/utils/markdown.ts
export interface EntryMeta {
  title: string;
  date: string;
  tags?: string[];
  slug: string;
}
```

- Use PascalCase for type names
- Suffix with descriptive category: `EntryMeta`, not just `Entry`
- Use `interface` for object shapes
- Optional properties marked with `?`

**TypeScript Types:**
```typescript
export type CollectionName = 'blog';
```

- Use `type` for unions, intersections, and aliases
- Suffix related types with category: `Entry` (data), `EntryMeta` (metadata)

### Variables and Functions

**Variables:**
- Use camelCase: `slug`, `filePath`, `fileContent`
- Be descriptive: `filePath` not `fp`
- Boolean prefixes: `isLoading`, `hasError`

**Functions:**
- Use camelCase: `getAllEntries()`, `getStaticPaths()`
- Verb prefixes for actions: `get`, `set`, `handle`, `render`
- Async functions keep `async` prefix: `async function getEntries()`

**Constants:**
- Use camelCase or SCREAMING_SNAKE_CASE contextually
- For module-level constants: `SCREAMING_SNAKE_CASE`
- For runtime values: `camelCase`

### HTML/CSS Selectors

**Element IDs:**
- Use camelCase: `#container`, `#background`, `#hero`, `#links`, `#news`
- Reflect component structure hierarchy
- IDs should be unique across the page

**CSS Classes:**
- No explicit classes used (ID-based styling in current codebase)
- If used, follow kebab-case: `.hero-section`

**CSS Custom Properties:**
- Use kebab-case: `--primary-color`
- Semantic naming: `--text-color`, `--background-color`

## Code Style

### Formatting

**Tool:** Not configured (Astro project)

**Indentation:**
- Use tabs (observed in `.astro` files)
- Tab size: 2 spaces equivalent

**Line Length:**
- No enforced limit
- Break long lines for readability

**Whitespace:**
- Blank lines between logical blocks
- Consistent spacing around operators and braces

### Linting

**Tool:** Not configured

**TypeScript:**
- Strict mode enabled via `"extends": "astro/tsconfigs/strict"` in `tsconfig.json`
- This enforces:
  - No implicit `any`
  - Strict null checks
  - Strict function types
  - No unchecked indexed access

**Astro Built-in Rules:**
- Astro's strict tsconfig applies automatically
- Run `npm run astro -- check` for type validation

### Semicolons

**JavaScript/TypeScript:**
- No strict requirement, but observed usage suggests standard JS behavior
- Prefer consistency within files

## Import Organization

### Import Order

1. **Astro built-ins:**
```typescript
import { getCollection } from 'astro:content';
import { getEntryBySlug } from 'astro:content';
```

2. **External packages:**
```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z, defineCollection } from 'astro:content';
```

3. **Relative imports (components):**
```typescript
import Welcome from '../components/Welcome.astro';
```

4. **Relative imports (assets):**
```typescript
import astroLogo from '../assets/astro.svg';
import background from '../assets/background.svg';
```

### Path Aliases

- No path aliases configured
- All imports use relative paths
- Standard patterns:
  - `../` - parent directory
  - `../../` - grandparent directory
  - `./` - same directory

### Import Style

- Use named imports for utilities: `import { getAllEntries } from '../utils/markdown'`
- Use default imports for components: `import Welcome from '../components/Welcome.astro'`
- Use destructured imports for assets: `import astroLogo from '../assets/astro.svg'`
- Quote style: single quotes (`'path'`)

## TypeScript Conventions

### Type Annotations

**Explicit Types:**
- Required for function parameters and return types
- Optional for local variables where type is obvious

**Example from `src/utils/markdown.ts`:**
```typescript
export function getAllEntries(): Entry[] {
  // Return type explicitly annotated
}
```

### Zod Schemas

**Content Collections:**
```typescript
// content.config.ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});
```

- Use Zod for content schema validation
- Inline schema in `defineCollection()`
- Export collections from `content.config.ts`

### Type Safety

**Strict Mode:**
```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict"
}
```

- All strict checks enabled
- Avoid `any` types
- Use type assertions sparingly and with `as`

## Component Design

### Astro Component Structure

**Standard Pattern:**
```astro
---
// 1. Frontmatter: server-side logic
import Component from '../components/Component.astro';
import asset from '../assets/asset.svg';

const data = await getData();
const title = 'Page Title';
---

<!-- 2. Template: HTML with expressions -->
<div>
  <Component />
  <h1>{title}</h1>
</div>

<!-- 3. Styles: scoped CSS -->
<style>
  div {
    padding: 1rem;
  }
</style>
```

### Frontmatter Guidelines

**What Goes in Frontmatter:**
- Imports (components, utilities, assets)
- Data fetching and async operations
- Variable declarations for template use
- Type definitions (if needed)
- Helper functions (when not worth a separate file)

**Frontmatter is Server-Side:**
- Runs at build time for static pages
- Runs on each request for SSR
- No browser APIs available (unless using client directives)

### Component Props

**Defining Props:**
```astro
---
interface Props {
  title: string;
  count?: number;
}

const { title, count = 0 } = Astro.props;
---
```

**Using Props:**
```astro
<Component title="Hello" count={5} />
```

### Slot Usage

**Named Slots:**
```astro
<!-- In Layout.astro -->
<slot name="header" />
<slot />
<slot name="footer" />
```

**Using Slots:**
```astro
<Layout>
  <h1 slot="header">Title</h1>
  <p>Default content</p>
  <p slot="footer">Footer</p>
</Layout>
```

## Styling Conventions

### CSS Organization

**Scoped Styles:**
```astro
<style>
  /* Only affects this component */
  .container {
    padding: 1rem;
  }
</style>
```

- Styles in `<style>` blocks are scoped by default
- No class name mangling needed
- Parent styles don't leak in

**Global Styles:**
```css
/* src/styles/global.css */
@import "tailwindcss";

body {
  font-family: system-ui, sans-serif;
}
```

- Import via `src/styles/global.css`
- Tailwind imported via `@import "tailwindcss"`
- Global reset and base styles here

### CSS Patterns

**Flexbox Layout:**
```css
#hero {
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;
}
```

**Responsive Design:**
```css
@media (max-width: 768px) {
  #container {
    display: flex;
    flex-direction: column;
  }
}
```

**CSS Custom Properties:**
```css
:root {
  --text-color: #222;
  --background-color: #f9f9f9;
}
```

### Style Guidelines

- Prefer CSS custom properties for theme values
- Use semantic color names: `--primary-color` not `--blue-500`
- Responsive breakpoints: `600px` (mobile), `768px` (tablet), common values
- Use flexbox for alignment, grid for complex layouts

## Error Handling

### Astro Error Patterns

**404/Not Found:**
```astro
// src/pages/[slug].astro
const entry = await getEntryBySlug('blog', slug);

if (!entry) {
  throw new Error(`Entry not found: ${slug}`);
}
```

- Throw descriptive errors
- Include relevant context (slugs, IDs)
- Let Astro handle error page display

**Async/Await:**
```typescript
// Frontmatter async handling
const data = await fetchData().catch(err => {
  console.error('Failed to fetch:', err);
  return null;
});
```

### Validation

**Content Collection Validation:**
- Zod schemas validate frontmatter at build time
- Invalid content causes build failure with clear errors

**Runtime Validation:**
- Use TypeScript for type safety
- Validate external data before use

## Comments

### When to Comment

**Good Practices:**
- Complex logic explanations
- "Why" not "what"
- TODO/FIXME with context

**Examples:**
```typescript
// Parse markdown files from content directory
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
```

### JSDoc/TSDoc

**Not Extensively Used:**
- No formal documentation blocks in current codebase
- TypeScript types serve as documentation
- For new utilities, consider JSDoc for complex functions

**Example (if added):**
```typescript
/**
 * Retrieves all blog entries from the content directory.
 * @returns Array of Entry objects with metadata and content
 */
export function getAllEntries(): Entry[] { ... }
```

## File Structure Conventions

### Directory Purposes

```
src/
├── assets/        # Images, SVGs, static assets
├── components/   # Reusable Astro components
├── layouts/      # Page layout templates
├── pages/        # Routes (file-based routing)
├── styles/       # Global CSS
└── utils/        # TypeScript utility functions
```

### Adding New Files

**New Component:** `src/components/ComponentName.astro`
**New Layout:** `src/layouts/LayoutName.astro`
**New Page:** `src/pages/page-name.astro` (creates `/page-name` route)
**New Utility:** `src/utils/utility-name.ts`
**New Style:** `src/styles/filename.css`

---

*Convention analysis: 2026-04-10*
