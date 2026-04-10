# Testing Patterns

**Analysis Date:** 2026-04-10

## Current Testing Status

**No testing framework is currently installed.**

This is a minimalist Astro project focused on content rendering. Testing patterns and tooling have not yet been established.

## Test Framework

### Installed

**None** - The project has no test dependencies or configurations.

### package.json Dependencies

```json
{
  "dependencies": {
    "@astrojs/check": "^0.9.8",
    "astro": "^6.1.5",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "@types/node": "^25.5.2",
    "typescript": "^5.9.3"
  }
}
```

### Type Checking

**Primary Validation Tool:**
- `npm run astro -- check` - Run Astro's built-in type checking
- Uses TypeScript strict mode: `"extends": "astro/tsconfigs/strict"`

**Type Safety Features:**
- No implicit `any`
- Strict null checks
- Strict function types
- No unchecked indexed access

## Test File Organization

### Current State

**No test files exist** in the codebase.

```
src/
├── assets/          # Static assets (no tests)
├── components/      # Astro components (no tests)
├── layouts/         # Layout templates (no tests)
├── pages/           # Page routes (no tests)
├── styles/          # CSS files (no tests)
└── utils/           # TypeScript utilities (no tests)
```

### Recommended Organization

If tests are added in the future:

```
src/
├── components/
│   ├── Component.astro
│   └── Component.test.ts      # Co-located unit tests
├── utils/
│   ├── markdown.ts
│   └── markdown.test.ts        # Co-located unit tests
tests/
├── e2e/                        # End-to-end tests
├── fixtures/                   # Test data
└── integration/               # Integration tests
```

## Test Types

### Unit Tests

**Status:** Not implemented

**Scope:**
- TypeScript utility functions in `src/utils/`
- Content processing logic
- Data transformation functions

**Example function to test:**
```typescript
// src/utils/markdown.ts
export function getAllEntries(): Entry[] { ... }
export interface Entry { ... }
export interface EntryMeta { ... }
```

### Integration Tests

**Status:** Not implemented

**Scope:**
- Content collection schemas
- Page generation with dynamic routes
- Layout composition

**Files to test:**
- `content.config.ts` - Schema validation
- `src/pages/[slug].astro` - Dynamic route generation
- `src/pages/index.astro` - Static page generation

### E2E Tests

**Status:** Not implemented

**Scope:**
- Full page rendering
- Navigation flows
- Static site generation output

**Manual Validation:**
```bash
npm run build              # Build site to ./dist/
npm run preview             # Preview production build
```

## Coverage

### Current Enforcement

**None** - No coverage requirements or tools configured.

### Recommended Targets

If testing is added:
- **Utilities:** 80%+ line coverage
- **Components:** Focus on render output and props handling
- **Critical paths:** Content loading, error handling

## CI/CD Testing Integration

### Current Pipeline

**None** - No CI/CD configuration present.

### Build Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
npm run astro -- check  # Type checking
```

### Recommended CI Pipeline

```yaml
# .github/workflows/test.yml (example)
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm ci
      - run: npm run build
      - run: npm run astro -- check
      # Add test commands here when testing is implemented
```

## Testing Recommendations

### For This Astro Project

#### 1. Vitest for Unit Testing

**Installation:**
```bash
npm install -D vitest
```

**Configuration:** `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

**Usage:**
```typescript
// src/utils/markdown.test.ts
import { describe, it, expect } from 'vitest';
import { getAllEntries } from './markdown';

describe('getAllEntries', () => {
  it('should return an array of entries', () => {
    const entries = getAllEntries();
    expect(Array.isArray(entries)).toBe(true);
  });
});
```

#### 2. Playwright for E2E Testing

**Installation:**
```bash
npm install -D @playwright/test
npx playwright install
```

**Configuration:** `playwright.config.ts`
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:4321',
  },
});
```

**Usage:**
```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Markdown Blog');
});
```

#### 3. Astro Component Testing

**Using @astrojs/test:**
```bash
npm install -D @astrojs/test
```

**Example:**
```typescript
// src/components/Welcome.test.ts
import { describe, it, expect } from 'vitest';
import { render } from 'test:astro';
import Welcome from '../components/Welcome.astro';

describe('Welcome', () => {
  it('renders correctly', async () => {
    const { document } = await render(Welcome);
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
  });
});
```

### What to Test

#### High Priority

1. **`src/utils/markdown.ts`:**
   - `getAllEntries()` returns correct structure
   - Handles empty content directory
   - Correctly parses frontmatter

2. **`content.config.ts`:**
   - Schema validation works
   - Required fields enforced

3. **Page generation:**
   - All blog entries have valid pages
   - 404 handling works

#### Medium Priority

1. **Component rendering:**
   - Layout renders slot content
   - Welcome component renders with assets

2. **Navigation:**
   - Links between pages work
   - Home link returns to index

### Test Fixtures

**Content fixtures location:** `tests/fixtures/content/`

**Example fixture:**
```markdown
---
title: "Test Post"
date: 2026-04-10
tags: [test]
---

Test content
```

**TypeScript test utilities:** `tests/utils/`

```typescript
// tests/utils/setup.ts
export function createMockEntry(overrides = {}) {
  return {
    meta: {
      title: 'Test Entry',
      date: '2026-04-10',
      tags: [],
      slug: 'test-entry',
      ...overrides.meta,
    },
    content: '# Test',
    ...overrides,
  };
}
```

## Development Workflow

### Manual Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:4321`

2. **Build and preview:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Type checking:**
   ```bash
   npm run astro -- check
   ```

### Adding Tests to Workflow

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage  # With coverage report
```

## Testing Patterns Reference

### Test File Naming

| Test Type | Pattern | Example |
|-----------|---------|---------|
| Unit | `.test.ts` | `markdown.test.ts` |
| Unit | `.spec.ts` | `markdown.spec.ts` |
| E2E | `.spec.ts` | `homepage.spec.ts` |
| Component | `.test.astro` | `Welcome.test.astro` |

### Test Structure

```typescript
describe('Module/Component Name', () => {
  describe('when condition', () => {
    it('should do something', () => {
      // Arrange
      const input = 'value';
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toBe(expected);
    });
  });
});
```

### Mocking Patterns

**Node modules:**
```typescript
import { vi } from 'vitest';
import fs from 'fs';

vi.mock('fs', () => ({
  readdirSync: vi.fn().mockReturnValue(['test.md']),
  readFileSync: vi.fn().mockReturnValue('---\ntitle: Test\n---\nContent'),
}));
```

**Astro modules:**
```typescript
vi.mock('astro:content', () => ({
  getCollection: vi.fn().mockResolvedValue([]),
  getEntryBySlug: vi.fn(),
}));
```

---

*Testing analysis: 2026-04-10*
