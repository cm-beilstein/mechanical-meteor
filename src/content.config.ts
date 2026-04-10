import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]),
    time: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };

// Workaround: Force re-scan on each request in dev mode
if (import.meta.env.DEV) {
  // In dev mode, the glob loader should pick up new files
  // This import ensures the loader is re-evaluated
  void import('astro:content');
}
