# Phase 03B: Bug Fixes from Phase 03A.1

**Goal**: Fix critical bugs discovered during Phase 03A.1 development.

**Depends on**: Phase 03A.1

**Requirements**: Fix 4 critical bugs

**Success Criteria** (what must be TRUE):
1. Homepage displays new posts immediately after creation via web form.
2. Docker container binds to 0.0.0.0 to avoid "Connection reset by peer" errors.
3. Docker permission issues with .astro directory are resolved.
4. TypeScript errors on index.astro and [slug].astro are resolved (getCollection returns never type).

**Plans**: 4 plans

## Plans

- [ ] 03B-01-PLAN.md — Fix homepage not showing new posts immediately
- [ ] 03B-02-PLAN.md — Fix Docker connection reset by binding to 0.0.0.0
- [ ] 03B-03-PLAN.md — Fix Docker permission errors with .astro directory
- [ ] 03B-04-PLAN.md — Fix TypeScript errors (getCollection never type)