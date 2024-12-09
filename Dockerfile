#-----------------------------> Base Image
FROM node:18-alpine AS base

# ---------------------------> Dependency Installation
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.json* ./
COPY prisma ./prisma/

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

#-------------------------> Next.JS Build
FROM base as builder
WORKDIR /app

# Build-Zeit Umgebungsvariablen
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV NEXTAUTH_URL="http://localhost:3000"
ENV NEXTAUTH_SECRET="dummy-secret"
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="dummy-key"
ENV STRIPE_SECRET_KEY="dummy-key"
ENV STRIPE_WEBHOOK_SECRET="dummy-secret"

# Kopiere node_modules und andere Dateien
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generiere Prisma Client
RUN npx prisma generate

# Build
RUN yarn build

#-------------------------> Start Next.JS Server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

# Kopiere notwendige Build-Ausgaben
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nextjs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nextjs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Diese Variablen müssen zur Laufzeit gesetzt werden
ENV DATABASE_URL=""
ENV NEXTAUTH_URL=""
ENV NEXTAUTH_SECRET=""
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
ENV STRIPE_SECRET_KEY=""
ENV STRIPE_WEBHOOK_SECRET=""

CMD ["node", "server.js"]
