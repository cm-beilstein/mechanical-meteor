---
phase: 03B
plan: "04"
type: execute
wave: 1
depends_on: []
files_modified:
  - src/pages/api/create-post.ts
autonomous: true
requirements: ["FIX-06"]
gap_closure: false

must_haves:
  truths:
    - "Blog entries have unique auto-generated filenames"
  artifacts:
    - src/pages/api/create-post.ts
  key_links:
    - from: create-post API
      to: src/content/blog/*.md
      via: fs.writeFileSync
---

<objective>
Fix unique filename generation for blog entries.

**Bug 6:** Blog entries need unique auto-generated filenames (use timestamp or UUID)
</objective>

<execution_context>
@$HOME/.config/opencode/get-shit-done/workflows/execute-plan.md
@$HOME/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/pages/api/create-post.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Implement unique filename generation with timestamp</name>
  <files>src/pages/api/create-post.ts</files>
  <read_first>src/pages/api/create-post.ts</read_first>
  <action>
Replace the current counter-based filename generation with timestamp-based filenames.

Current logic:
```javascript
let filename = `${slug}.md`;
let counter = 1;
while (fs.existsSync(path.join(blogDir, filename))) {
  filename = `${slug}-${counter}.md`;
  counter++;
}
```

New logic using timestamp:
```javascript
const timestamp = Date.now();
const filename = `${slug}-${timestamp}.md`;
```

This guarantees uniqueness without needing to check for existing files.

Or use UUID for even better uniqueness:
```javascript
import { randomUUID } from 'crypto';
const filename = `${slug}-${randomUUID()}.md`;
```

Update the API to use timestamp-based naming.
  </action>
  <verify>
grep -n "Date.now()\|randomUUID" src/pages/api/create-post.ts
  </verify>
  <done>Each new post has a unique filename based on timestamp</done>
</task>

</tasks>

<verification>
- Timestamps or UUIDs used for filenames
- No filename collisions
</verification>

<success_criteria>
- Bug 6 fixed: Unique filenames for all blog entries
</success_criteria>

<output>
After completion, create `.planning/phases/03b-bug-fixes-from-phase-03a-1/03B-04-SUMMARY.md`
</output>