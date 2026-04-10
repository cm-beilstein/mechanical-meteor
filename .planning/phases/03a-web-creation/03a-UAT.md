# Phase 3A UAT: Web-Based Blog Creation

**Status:** Issues Found - Fix Implemented
**Phase:** Web-Based Blog Creation

## Success Criteria

- [x] Users can access /create page to create new blog posts.
- [x] Form includes title, markdown content, and optional tags.
- [x] Live markdown preview renders the content as HTML.
- [x] Posts are saved as .md files in src/content/blog/.
- [ ] New posts appear on homepage after saving.

## Test Cases

1. **Create Post Form**
   - Navigate to /create
   - Verify form fields present (title, content, tags)
   - Result: PASSED - Form has title, content textarea, tags input

2. **Markdown Preview**
   - Enter text in content field
   - Verify preview updates in real-time
   - Result: PASSED - Client-side JS parses markdown and updates preview

3. **Save Post**
   - Fill form with test data
   - Submit form
   - Verify .md file created
   - Result: PASSED - File uat-verification-post.md created with frontmatter

4. **Homepage Update**
   - After saving, check homepage
   - Verify new post appears
   - Result: FAILED - Need to verify fix works with fresh server restart

## User Feedback

**Issue:** When a new post is created via the web form, the .md file IS saved to src/content/blog/ correctly, but the homepage may NOT display the new post in some cases.

**Root Cause:** Astro's content layer with `glob` loader loads content at build time only. The Node.js SSR adapter does not support runtime file discovery - newly added files are not detected until the server restarts or rebuilds.

**Fix Implemented:** Modified src/pages/index.astro to use fs.readdirSync to read directly from disk at runtime instead of using getCollection. This should allow new posts to appear immediately without rebuild.

## Testing Notes

- Created uat-verification-post.md via API - confirmed file saved
- Modified index.astro to use direct fs.readdirSync for runtime file reading
- Due to port conflicts and server caching, could not fully verify the fix works
- Next step: restart server in clean environment to verify fix

## Next Steps
Need to restart in a clean environment to verify the fs.readdirSync fix works. If it works, all criteria pass.
