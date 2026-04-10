---
phase: 03B
plan: "03"
subsystem: api
tags:
  - bug-fix
  - api
  - redirect
dependency_graph:
  requires: []
  provides:
    - Creating post returns correct redirect URL
  affects:
    - src/pages/api/create-post.ts
tech_stack:
  added: []
  patterns:
    - Use actual filename for redirect URL
key_files:
  created: []
  modified:
    - src/pages/api/create-post.ts
decisions: []
metrics:
  duration: 1m
  completed: "2026-04-10T13:28:00Z"
---

# Phase 03B Plan 03: API 404 Fix Summary

## Objective
Fix API endpoint to return correct redirect URL after post creation.

## Bug Fixed

### Bug 5: Creating new entry from Docker returns 404
- **Root cause:** Redirect URL used input slug, not actual generated filename
- **Solution:** Use `filename.replace('.md', '')` for redirect URL
- **Impact:** New posts now navigate to correct URL

## Changes Made

| File | Change |
|------|--------|
| src/pages/api/create-post.ts | Redirect uses actual filename |

## Verification

```bash
grep "redirectUrl" src/pages/api/create-post.ts
# Uses filename.replace('.md', '') for correct path
```

## Deviation
None.

## Auth Gates
None.