# Technology Stack

**Project:** Static Blog/News Site
**Researched:** 2026-04-09

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | latest | Static site generation | Fast, markdown-first, easy extensibility |
| (Alt: Next.js static export) | latest | SSG | Popular, React-based, good ecosystem |
| (Alt: Hugo) | latest | SSG | Fast, Go-based, mature |
| (Alt: Eleventy) | latest | SSG | Simple, flexible, JS-based |

### Database
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| None | n/a | Static content only | Markdown files as source of truth |

### Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel/Netlify | latest | Hosting/deployment | Optimized for static sites, CI/CD built-in |
| GitHub Actions | latest | CI/CD | Automate build/deploy |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gray-matter | latest | Markdown frontmatter parsing | Always |
| remark/rehype | latest | Markdown to HTML | Always |
| shiki/prism | latest | Syntax highlighting | If code blocks needed |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| SSG | Astro | Next.js/Hugo/Eleventy | All viable, Astro is markdown-first |
| Markdown parser | remark | markdown-it | remark is more extensible |
| Hosting | Vercel | Netlify | Both are excellent |

## Installation

```bash
# Core
npm create astro@latest
# or
npx create-next-app@latest
# or
brew install hugo

# Dev dependencies
npm install gray-matter remark rehype
```

## Sources

- https://docs.astro.build (HIGH)
- https://nextjs.org/docs/pages/building-your-application/deploying/static-exports (HIGH)
- https://gohugo.io/documentation/ (HIGH)
- https://www.11ty.dev/docs/ (HIGH)
