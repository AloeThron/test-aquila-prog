FROM node:20-alpine AS base

# Configure pnpm global
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
COPY . .
RUN pnpm install turbo@latest --global
RUN turbo prune api --docker

CMD turbo --version

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=api...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/api/next.config.js .
COPY --from=installer /app/apps/api/package.json .

# Automatically leverage output traces to reduce image size
COPY --from=installer --chown=nextjs:nodejs /app/apps/api/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/api/.next/static ./apps/api/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/api/public ./apps/api/public

EXPOSE 3200

CMD node apps/api/server.js