# Build stage
FROM node:22-bookworm AS builder

WORKDIR /app

# Copy dependency files first for caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .
RUN npm run build

# Production stage
FROM node:22-bookworm-slim AS runner

WORKDIR /app

# Create non-root user for security (ignore if exists)
RUN (groupadd --gid 1000 nodejs 2>/dev/null || groupadd --gid 1001 nodejs) && \
    (useradd --uid 1000 --gid nodejs --shell /bin/bash --create-home nodejs 2>/dev/null || useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nodejs)

# Create .astro directory for dev mode cache (world writable for volume mount)
RUN mkdir -p /app/.astro && chmod 777 /app/.astro

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/astro.config.mjs ./

USER nodejs

# Expose port 4321 (Astro default)
EXPOSE 4321

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4321/ || exit 1

# Start the production server with explicit host/port
CMD ["node", "dist/server/entry.mjs", "--host", "0.0.0.0", "--port", "4321"]