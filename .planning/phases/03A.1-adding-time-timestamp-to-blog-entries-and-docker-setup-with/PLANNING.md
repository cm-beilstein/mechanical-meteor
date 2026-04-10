# Phase 03A.1 Planning: Adding time/timestamp to blog entries and Docker setup

## Phase Goal
Add time/timestamp display to blog entries and containerize the application with Docker.

## Task Breakdown

### Task 1: Add time/timestamp to blog entries
**What it NEEDS:**
- Current implementation uses `date` frontmatter field (string/Date)
- Need to extend to include time component
- Need to update display on index.astro and [slug].astro

**What it CREATES:**
- Updated content schema with datetime (date + time)
- Updated UI to display time in addition to date
- Possibly time display format options

**Can run independently:** YES - no dependencies on other features

### Task 2: Docker setup with docker-compose
**What it NEEDS:**
- Dockerfile for Astro app
- docker-compose.yml with service definitions
- Understand Node version requirements (package.json says >=22.12.0)

**What it CREATES:**
- Dockerfile
- docker-compose.yml
- .dockerignore (best practice)

**Can run independently:** YES - no dependencies on other features

## Dependency Graph

```
Task 1 (timestamp): needs nothing, creates timestamp display
Task 2 (docker): needs nothing, creates docker files
```

Both can run in parallel - Wave 1.

## Discovery Level
- Task 1: Level 0 (modifying existing features, established patterns)
- Task 2: Level 1 (standard Docker setup, quick verification of syntax)