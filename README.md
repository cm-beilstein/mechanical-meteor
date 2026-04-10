# Markdown Blog

A web-based blog application built with Astro that allows you to create and manage blog posts directly from the browser.

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
docker compose up -d
```

The application will be available at **http://localhost:4321**

### Option 2: Local Development

```bash
npm install
npm run dev
```

The application will be available at **http://localhost:4321**

## 📖 Features

- **Web-based post creation** — Create blog posts directly from the browser at `/create`
- **Live markdown preview** — See your content rendered in real-time as you type
- **Auto-generated filenames** — Posts are saved with unique timestamp-based filenames
- **Tag filtering** — Filter blog posts by tags on the homepage
- **RSS feed** — Subscribe to blog updates at `/rss.xml`
- **Docker support** — Run the entire application in a container

## 🧞 Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `docker compose up -d` | Start application in Docker |
| `docker compose down` | Stop Docker container |
| `docker compose build` | Rebuild Docker image |

## 📖 Usage

- **Homepage** — View all blog posts at `/`
- **Create post** — Add new posts at `/create`
- **Filter by tag** — Click filter pills on homepage to filter posts
- **RSS feed** — Subscribe at `/rss.xml`

## 📁 Project Structure

```
/
├── src/
│   ├── pages/          # Astro pages and API routes
│   ├── components/     # Reusable components
│   ├── content/blog/   # Blog post markdown files
│   └── layouts/        # Page layouts
├── public/             # Static assets
├── Dockerfile          # Docker build configuration
└── docker-compose.yml  # Docker orchestration
```

## 🔧 Configuration

- **Port:** 4321 (default)
- **Node adapter:** `@astrojs/node` (SSR mode)
- **Content:** Markdown files in `src/content/blog/`

## 👀 Want to learn more?

Check the [Astro documentation](https://docs.astro.build).