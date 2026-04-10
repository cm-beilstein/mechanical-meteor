# Phase 3A: Web-Based Blog Creation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-10
**Phase:** 03A-web-creation
**Areas discussed:** Layout, Save Mechanism, Success Flow

---

## Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Side-by-side | Form on left, live preview on right - best for writing | ✓ |
| Stacked (tabs) | Write/Preview tabs - simpler but requires switching | |
| Accordion | Preview collapses below - more space for writing | |

**User's choice:** Side-by-side
**Notes:** Best for writing with immediate feedback

---

## Save Mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| API endpoint | Server-side API writes .md file - seamless but needs server | ✓ |
| Download .md file | Generate and download file - user uploads to content folder | |
| File system (direct) | Write directly via Astro SSR - complex setup | |

**User's choice:** API endpoint
**Notes:** Server-side API writes .md file to content collection

---

## Success Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Redirect to post | Go directly to the new post's page | ✓ |
| Success message + link | Show success message with link to view post | |
| Stay on form | Clear form and show success, user navigates manually | |

**User's choice:** Redirect to post
**Notes:** After successful save, navigate to the new post's page

---

## Claude's Discretion

- Form fields: Title (required), Content (required), Tags (optional)
- File naming: Auto-generate slug from title with duplicate handling
