---
phase: 03B
plan: "02"
type: execute
wave: 1
depends_on: []
files_modified:
  - docker-compose.yml
  - Dockerfile
autonomous: true
requirements: ["FIX-02", "FIX-03"]
gap_closure: false

must_haves:
  truths:
    - "Docker container binds to 0.0.0.0 to avoid connection reset errors"
    - "Docker permission allows writing to .astro directory"
  artifacts:
    - docker-compose.yml
    - Dockerfile
  key_links:
    - from: docker-compose.yml
      to: Astro server
      via: HOST environment
---

<objective>
Fix Docker connection and permission issues.

**Bug 2:** Docker connection reset - need to bind to 0.0.0.0

**Bug 3:** Docker permission errors with .astro directory
</objective>

<execution_context>
@$HOME/.config/opencode/get-shit-done/workflows/execute-plan.md
@$HOME/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@docker-compose.yml
@Dockerfile
</context>

<tasks>

<task type="auto">
  <name>Task 1: Ensure Docker binds to 0.0.0.0</name>
  <files>docker-compose.yml, Dockerfile</files>
  <read_first>docker-compose.yml, Dockerfile</read_first>
  <action>
Check and verify that both docker-compose.yml and Dockerfile have the correct host binding.

Current docker-compose.yml already has:
```
environment:
  - HOST=0.0.0.0
```

Current Dockerfile already has:
```
CMD ["node", "dist/server/entry.mjs", "--host", "0.0.0.0", "--port", "4321"]
```

If already correct, document that it's fixed. If not, update:
1. docker-compose.yml: Add `HOST=0.0.0.0` to environment
2. Dockerfile: Add `--host 0.0.0.0` to CMD
  </action>
  <verify>
grep -E "0\.0\.0\.0" docker-compose.yml Dockerfile
  </verify>
  <done>Docker binds to 0.0.0.0 for external connections</done>
</task>

<task type="auto">
  <name>Task 2: Fix Docker .astro directory permissions</name>
  <files>Dockerfile</files>
  <read_first>Dockerfile</read_first>
  <action>
The Dockerfile already has a workaround:
```
RUN mkdir -p /app/.astro && chmod 777 /app/.astro
```

But running as non-root user (nodejs) means the mounted volume from host may still have permission issues.

Add proper volume mount configuration in docker-compose.yml:
```yaml
volumes:
  - ./.astro:/app/.astro
```

And ensure the Dockerfile user can write to it by adding the directory with proper ownership:
```
RUN mkdir -p /app/.astro && chown nodejs:nodejs /app/.astro
```

But wait - the volume mount from host will override ownership. The solution is to ensure the host directory permissions allow the nodejs user (uid 1000/1001) to write.

Alternative: Run the container with root user for development, or use named volume.
The current docker-compose.yml already has `user: root` which should work.

Verify: The current setup has user: root, so permissions should work.
If issues persist, ensure the .astro directory on host has correct permissions:
```
chmod -R 777 .astro
```
  </action>
  <verify>
ls -la .astro 2>/dev/null || echo "Directory does not exist yet"
grep -E "user:" docker-compose.yml
  </verify>
  <done>No permission errors when accessing .astro directory in Docker</done>
</task>

</tasks>

<verification>
- Docker binds to 0.0.0.0
- No permission errors with .astro directory
</verification>

<success_criteria>
- Bug 2 fixed: No connection reset errors
- Bug 3 fixed: .astro directory accessible in Docker
</success_criteria>

<output>
After completion, create `.planning/phases/03b-bug-fixes-from-phase-03a-1/03B-02-SUMMARY.md`
</output>