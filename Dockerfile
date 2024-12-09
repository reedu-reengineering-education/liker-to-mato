#-----------------------------> Base Image
FROM node:18-alpine AS base

# ---------------------------> Dependency Installation
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Kopiere Prisma Schema zuerst
COPY prisma ./prisma/

# Dann die anderen Dateien
COPY package.json yarn.lock* package-lock.json* pnpm-lock.json* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

#-------------------------> Next.JS Build
FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

# Generiere Prisma Client
RUN npx prisma generate

RUN yarn build

#-------------------------> Start Next.JS Server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]
