---
phase: 03a-web-creation
plan: 01
type: execute
wave: 1
depends_on:
  - 03-01
files_modified:
  - src/pages/create.astro
  - src/components/
  - src/styles/global.css
  - src/content.config.ts
autonomous: true
requirements:
  # Phase 3A introduces new functionality beyond v1 requirements
  # Mapping to existing REQUIREMENTS.md IDs:
  # - CONTENT-01: Markdown files parsed at build time (new .md files created via form)
  # - CONTENT-03: Adding new markdown auto-updates homepage
  # - ENTRY-01: Entry pages display content (new posts become entry pages)
  # These v1 requirements cover the backend; Phase 3A adds the web form UI
  - CONTENT-01
  - CONTENT-03
  - ENTRY-01
must_haves:
  truths:
    - "Users can access /create page to create new blog posts."
    - "Form includes title, markdown content, and optional tags."
    - "Live markdown preview renders the content as HTML."
    - "Posts are saved as .md files in src/content/blog/."
    - "New posts appear on homepage after saving."
  artifacts:
    - path: "src/pages/create.astro"
      provides: "Create post form page"
    - path: "src/components/MarkdownPreview.astro"
      provides: "Live markdown preview component"
    - path: "src/components/PostForm.astro"
      provides: "Blog post creation form"
  key_links:
    - from: "src/pages/create.astro"
      to: "src/content/blog/"
      via: "File system write for .md files"
      pattern: "write file"
    - from: "src/pages/index.astro"
      to: "src/pages/create.astro"
      via: "Create link"
      pattern: "Create Post"
---

<objective>
Implement web-based blog post creation allowing users to create posts directly from the website without editing markdown files.

Purpose: Enable non-technical users to create blog content through a user-friendly interface with live preview.
Output: Create page with form, live preview, and save functionality.
</objective>

<execution_context>
@~/.copilot/get-shit-done/workflows/execute-plan.md
@~/.copilot/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
</context>

<tasks>
<task type="auto">
  <name>Task 1: Create blog post form component</name>
  <files>src/components/PostForm.astro</files>
  <action>
    Create a form component for blog post creation:
    - Title input field (required)
    - Markdown content textarea (required)  
    - Tags input field (optional, comma-separated)
    - Client-side validation
    - Submit handler that POSTs JSON to /api/create-post API endpoint
    - Handle success (redirect to new post) and error responses
  </action>
  <read_first>
    - src/pages/[slug].astro
    - src/styles/global.css
  </read_first>
  <acceptance_criteria>
    - Form has title, content, and tags fields
    - Form validates required fields
    - Submit button triggers save action
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Create markdown preview component</name>
  <files>src/components/MarkdownPreview.astro</files>
  <action>
    Create a live markdown preview component:
    - Accepts markdown content as prop
    - Renders markdown as HTML
    - Updates in real-time as user types
    - Styled consistently with article-card
  </action>
  <read_first>
    - src/styles/global.css
  </read_first>
  <acceptance_criteria>
    - Preview updates as user types in textarea
    - Preview matches final rendered output
    - Preview styled consistently with entry pages
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Create /create page</name>
  <files>src/pages/create.astro</files>
  <action>
    Create the create post page at /create:
    - Include PostForm and MarkdownPreview components
    - Side-by-side layout (form left, preview right)
    - "Create Post" link in navigation/homepage
    - Handle form submission
  </action>
  <read_first>
    - src/components/PostForm.astro
    - src/components/MarkdownPreview.astro
    - src/layouts/Layout.astro
  </read_first>
  <acceptance_criteria>
    - /create page renders form and preview
    - Preview updates in real-time
    - Form submission creates .md file
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Implement file save functionality</name>
  <files>src/pages/create.astro</files>
  <action>
    Implement server-side file saving:
    - Convert form data to markdown format with frontmatter
    - Generate unique filename from title
    - Write .md file to src/content/blog/
    - Return success/error response
    - Redirect to new post or homepage after save
  </action>
  <read_first>
    - src/content/blog/example.md
  </read_first>
  <acceptance_criteria>
    - New .md file created in src/content/blog/
    - File has valid frontmatter (title, date, tags)
    - File contains user-provided markdown content
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 5: Add link to create page</name>
  <files>src/pages/index.astro, src/layouts/Layout.astro</files>
  <action>
    Add navigation to create page:
    - Link on homepage to /create
    - Link in Layout header (if applicable)
  </action>
  <read_first>
    - src/pages/index.astro
    - src/layouts/Layout.astro
  </read_first>
  <acceptance_criteria>
    - Homepage has "Create Post" link
    - Link navigates to /create
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 6: Verify full workflow</name>
  <files>src/content/blog/</files>
  <action>
    Test the complete workflow:
    - Navigate to /create
    - Fill out form with test content
    - Submit form
    - Verify .md file created
    - Verify post appears on homepage
  </action>
  <read_first>
    - src/pages/index.astro
  </read_first>
  <acceptance_criteria>
    - New post created and saved
    - Post appears on homepage
    - Post renders correctly on detail page
  </acceptance_criteria>
</task>
</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| User Input → File System | Form data written to content directory |
| Markdown → HTML | User content rendered on page |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-3A-01 | Tampering | File system write | mitigate | Validate file paths, sanitize filename |
| T-3A-02 | XSS | Markdown preview | mitigate | Astro sanitizes markdown output |
| T-3A-03 | Denial of Service | Large content | mitigate | Limit content size on form |

<verification>
- Navigate to /create page
- Fill form with test data
- Submit and verify file created
- Check homepage for new post
- Verify post renders correctly
</verification>

<success_criteria>
- Users can create blog posts from website
- Live markdown preview works
- Posts saved correctly to content directory
- New posts appear on homepage
</success_criteria>

<output>
After completion, create `.planning/phases/03a-web-creation/03a-01-SUMMARY.md`
