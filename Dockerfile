# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for Next.js public environment variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_THEME
ARG NEXT_PUBLIC_POSTS_PER_PAGE
ARG NEXT_PUBLIC_QUERY_STALE_TIME
ARG NEXT_PUBLIC_QUERY_RETRY
ARG NEXT_PUBLIC_DEFAULT_USER_ID
ARG NEXT_PUBLIC_SNACKBAR_MAX_SNACK
ARG NEXT_PUBLIC_SNACKBAR_AUTO_HIDE_DURATION

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_DEFAULT_THEME=${NEXT_PUBLIC_DEFAULT_THEME}
ENV NEXT_PUBLIC_POSTS_PER_PAGE=${NEXT_PUBLIC_POSTS_PER_PAGE}
ENV NEXT_PUBLIC_QUERY_STALE_TIME=${NEXT_PUBLIC_QUERY_STALE_TIME}
ENV NEXT_PUBLIC_QUERY_RETRY=${NEXT_PUBLIC_QUERY_RETRY}
ENV NEXT_PUBLIC_DEFAULT_USER_ID=${NEXT_PUBLIC_DEFAULT_USER_ID}
ENV NEXT_PUBLIC_SNACKBAR_MAX_SNACK=${NEXT_PUBLIC_SNACKBAR_MAX_SNACK}
ENV NEXT_PUBLIC_SNACKBAR_AUTO_HIDE_DURATION=${NEXT_PUBLIC_SNACKBAR_AUTO_HIDE_DURATION}

# Ensure public directory exists (create empty if it doesn't)
RUN mkdir -p ./public && touch ./public/.gitkeep

# Build the application
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public directory from builder (now guaranteed to exist)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

