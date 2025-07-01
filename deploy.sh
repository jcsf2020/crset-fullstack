#!/bin/bash

# CRSET Pipeline - Script de Deploy para Produção
# Este script prepara e executa o deploy em produção

set -e

echo "🚀 CRSET Pipeline - Deploy para Produção"
echo "========================================"

# Verificar se estamos na branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Aviso: Não está na branch main (atual: $CURRENT_BRANCH)"
    read -p "Continuar mesmo assim? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deploy cancelado"
        exit 1
    fi
fi

# Verificar se há alterações não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Há alterações não commitadas:"
    git status --short
    read -p "Fazer commit automático? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    else
        echo "❌ Deploy cancelado. Faça commit das alterações primeiro."
        exit 1
    fi
fi

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Ficheiro .env não encontrado!"
    echo "   Copie .env.example para .env e configure as variáveis."
    exit 1
fi

# Verificar variáveis críticas
echo "🔍 Verificando variáveis de ambiente..."
source .env

REQUIRED_VARS=(
    "STRIPE_SECRET_KEY"
    "SUPABASE_URL"
    "SUPABASE_ANON_KEY"
    "OPENAI_API_KEY"
    "VITE_API_URL"
    "VITE_STRIPE_PUBLISHABLE_KEY"
)

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Variável $var não está definida!"
        exit 1
    fi
done

echo "✅ Variáveis de ambiente OK"

# Executar testes
echo "🧪 Executando testes..."
make test-backend || echo "⚠️  Testes do backend falharam"
make test-frontend || echo "⚠️  Testes do frontend falharam"

# Verificar build
echo "🔨 Verificando builds..."
make deploy-check

# Confirmar deploy
echo ""
echo "📋 Resumo do Deploy:"
echo "   Branch: $CURRENT_BRANCH"
echo "   Commit: $(git log -1 --pretty=format:'%h - %s')"
echo "   Backend: Railway"
echo "   Frontend: Vercel"
echo ""
read -p "Confirmar deploy para produção? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deploy cancelado"
    exit 1
fi

# Executar deploy
echo "🚀 Iniciando deploy..."
git push origin $CURRENT_BRANCH

echo ""
echo "✅ Deploy iniciado com sucesso!"
echo ""
echo "🔗 Links úteis:"
echo "   GitHub Actions: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
echo "   Railway Dashboard: https://railway.app/dashboard"
echo "   Vercel Dashboard: https://vercel.com/dashboard"
echo ""
echo "📱 Aplicação:"
echo "   Backend: https://crset-backend-prod.railway.app"
echo "   Frontend: https://crsetsolutions.com"
echo ""
echo "⏱️  O deploy pode demorar alguns minutos. Verifique os dashboards para acompanhar o progresso."

