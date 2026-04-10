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

# Create non-root user for security
RUN groupadd --gid 1000 nodejs && \
    useradd --uid 1000 --gid nodejs --shell /bin/bash --create-home nodejs

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

# Start the production server
CMD ["node", "dist/server/entry.mjs"]