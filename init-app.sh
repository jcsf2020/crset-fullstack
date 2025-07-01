#!/bin/bash

# Script de inicialização da aplicação FinanceFlow
# Este script é executado quando o contentor da aplicação inicia

set -e

echo "🚀 Iniciando FinanceFlow..."

# Aguardar que a base de dados esteja disponível
echo "⏳ Aguardando base de dados..."
until pg_isready -h db -p 5432 -U financeflow; do
  echo "Base de dados não está pronta - aguardando..."
  sleep 2
done

echo "✅ Base de dados disponível!"

# Gerar cliente Prisma
echo "🔧 Gerando cliente Prisma..."
npx prisma generate

# Executar migrações
echo "📊 Executando migrações da base de dados..."
npx prisma db push

# Executar seed (apenas se não existirem dados)
echo "🌱 Verificando se é necessário executar seed..."
USER_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"User\";" | tail -n 1 | tr -d ' ')
if [ "$USER_COUNT" = "0" ]; then
  echo "🌱 Executando seed da base de dados..."
  npm run db:seed
else
  echo "📊 Base de dados já contém dados, saltando seed..."
fi

echo "🎉 Inicialização concluída! Iniciando aplicação..."

# Iniciar aplicação
exec "$@"

