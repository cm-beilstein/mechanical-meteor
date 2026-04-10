---
phase: 03B
plan: "03"
type: execute
wave: 1
depends_on: []
files_modified:
  - src/pages/api/create-post.ts
  - docker-compose.yml
autonomous: true
requirements: ["FIX-05"]
gap_closure: false

must_haves:
  truths:
    - "Creating new entry from Docker returns success (not 404)"
  artifacts:
    - src/pages/api/create-post.ts
  key_links:
    - from: create.astro form
      to: /api/create-post
      via: fetch POST
---

<objective>
Fix API path issue when creating entries from Docker.

**Bug 5:** Creating new entry from Docker returns 404 (API path issue)
</objective>

<execution_context>
@$HOME/.config/opencode/get-shit-done/workflows/execute-plan.md
@$HOME/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/pages/api/create-post.ts
@src/components/PostForm.astro
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix API endpoint path for Docker</name>
  <files>src/pages/api/create-post.ts</files>
  <read_first>src/pages/api/create-post.ts</read_first>
  <action>
The issue is that Astro API routes need to be accessed at the correct path.
The file is at `src/pages/api/create-post.ts` which in Astro becomes `/api/create-post`.

During dev: http://localhost:4321/api/create-post
In Docker: The API should be at http://0.0.0.0:4321/api/create-post

The API returns a 201 with JSON but the frontend shows 404. 
This could be because:
1. The redirect URL uses the slug, not the actual filename
2. The API response doesn't properly indicate success

Looking at create-post.ts:
- It returns `{ success: true, redirectUrl: \`/${slug}\` }` 
- But the filename might be `slug-1.md` not `slug.md`

Update the API to return the actual path to redirect to:
Instead of using the slug for redirect, use the actual filename:
```javascript
// Use the actual filename for redirect
const redirectUrl = `/${filename.replace('.md', '')}`;
```

The frontend will then navigate to the correct post URL.
  </action>
  <verify>
grep "redirectUrl" src/pages/api/create-post.ts
  </verify>
  <done>Creating post returns correct redirect URL</done>
</task>

</tasks>

<verification>
- API returns correct redirect URL
- Post creation from Docker succeeds (no 404)
</verification>

<success_criteria>
- Bug 5 fixed: Post creation returns success, not 404
</success_criteria>

<output>
After completion, create `.planning/phases/03b-bug-fixes-from-phase-03a-1/03B-03-SUMMARY.md`
</output>