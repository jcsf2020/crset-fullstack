# Multi-stage build para otimização
FROM node:18-alpine AS base

# Instalar dependências apenas quando necessário
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar ficheiros de dependências
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild do código fonte apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gerar Prisma client
RUN npx prisma generate

# Construir aplicação
RUN yarn build

# Imagem de produção, copiar todos os ficheiros e executar next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Desabilitar telemetria durante runtime
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar ficheiros necessários
COPY --from=builder /app/public ./public

# Definir permissões corretas para prebuilt cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar automaticamente ficheiros de output baseado no trace
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar schema do Prisma e node_modules necessários
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Criar diretório para logs
RUN mkdir -p /app/logs && chown nextjs:nodejs /app/logs

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando de inicialização
CMD ["node", "server.js"]

