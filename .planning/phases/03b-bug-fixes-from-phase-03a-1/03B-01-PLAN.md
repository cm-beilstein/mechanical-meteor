---
phase: 03B
plan: "01"
type: execute
wave: 1
depends_on: []
files_modified:
  - src/pages/index.astro
  - src/pages/[slug].astro
  - src/content.config.ts
autonomous: true
requirements: ["FIX-01", "FIX-04"]
gap_closure: false

must_haves:
  truths:
    - "Homepage displays new posts immediately after creation via web form"
    - "TypeScript compilation succeeds without errors on all Astro pages"
  artifacts:
    - src/pages/index.astro
    - src/pages/[slug].astro
  key_links:
    - from: src/pages/index.astro
      to: src/content/blog/*.md
      via: fs.readdirSync + readFileSync
      pattern: "fs.readdirSync\\(blogDir\\)"
---

<objective>
Fix homepage post display and TypeScript errors.

**Bug 1:** Homepage doesn't show new posts immediately after web form creation (fs.readdirSync caching issue)

**Bug 4:** TypeScript errors on index.astro and [slug].astro - getCollection returns `never` type
</objective>

<execution_context>
@$HOME/.config/opencode/get-shit-done/workflows/execute-plan.md
@$HOME/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/pages/index.astro
@src/pages/[slug].astro
@src/content.config.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix homepage post display (immediate)</name>
  <files>src/pages/index.astro</files>
  <read_first>src/pages/index.astro</read_first>
  <action>
Add cache-busting query parameter to trigger fresh read on each page load.
Currently the file reads happen at build/render time but may not refresh after new posts are created.

Replace the current file reading logic with explicit cache-busting:
```javascript
// Add timestamp to defeat any caching
const cacheBuster = '?t=' + Date.now();
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
```

This ensures each request reads the directory fresh.
  </action>
  <verify>
grep -n "Date.now()" src/pages/index.astro
  </verify>
  <done>Homepage reads blog directory on each request, new posts appear immediately after creation</done>
</task>

<task type="auto">
  <name>Task 2: Fix TypeScript getCollection return type</name>
  <files>src/pages/[slug].astro</files>
  <read_first>src/pages/[slug].astro</read_first>
  <action>
The [slug].astro uses `getCollection('blog')` which returns a typed array.
The issue is that Astro's content collections require proper type inference.

Update [slug].astro to handle the collection properly:
1. Ensure the collection is properly awaited
2. Add type assertion for the entry if needed
3. Fix the `entry.data.date` access pattern

Current code:
```
const entries = await getCollection('blog');
const entry = entries.find(e => e.id === slug);
```

Should work. The issue may be that the collection schema isn't being inferred.
Add explicit type import and schema reference:
```typescript
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { blog } from '../content.config.ts';

const entries = await getCollection('blog');
```

Or use inline type fix if schema isn't loading properly.
  </action>
  <verify>
npx astro check --no-progress 2>&1 | grep -E "(error|Error)" | head -20
  </verify>
  <done>TypeScript compiles without collection-related errors</done>
</task>

</tasks>

<verification>
- Homepage shows new posts immediately after creation via web form
- TypeScript: `npx astro check` passes without collection errors
</verification>

<success_criteria>
- Bug 1 fixed: New posts appear on homepage without restart
- Bug 4 fixed: No TypeScript errors on index.astro or [slug].astro
</success_criteria>

<output>
After completion, create `.planning/phases/03b-bug-fixes-from-phase-03a-1/03B-01-SUMMARY.md`
</output>