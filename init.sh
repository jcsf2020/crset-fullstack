#!/bin/bash

# CRSET Pipeline - Script de Inicialização
# Este script configura o ambiente completo do projeto

set -e

echo "🚀 CRSET Pipeline - Inicialização"
echo "=================================="

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+ primeiro."
    exit 1
fi

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python não encontrado. Por favor, instale o Python 3.11+ primeiro."
    exit 1
fi

echo "✅ Pré-requisitos verificados"

# Criar ficheiro .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando ficheiro .env..."
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Edite o ficheiro .env com as suas credenciais antes de continuar!"
    echo "   Variáveis obrigatórias:"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_ANON_KEY"
    echo "   - OPENAI_API_KEY"
    echo ""
    read -p "Pressione Enter após configurar o .env para continuar..."
fi

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd backend
python3 -m pip install -r requirements.txt
cd ..

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install
cd ..

# Inicializar Git se não existir
if [ ! -d .git ]; then
    echo "📝 Inicializando repositório Git..."
    git init
    git add .
    git commit -m "Initial commit: CRSET Pipeline setup"
    echo "✅ Repositório Git inicializado"
fi

# Testar build do backend
echo "🧪 Testando backend..."
cd backend
python3 -c "import app.main; print('✅ Backend OK')"
cd ..

# Testar build do frontend
echo "🧪 Testando frontend..."
cd frontend
npm run build
echo "✅ Frontend OK"
cd ..

echo ""
echo "🎉 Inicialização completa!"
echo ""
echo "Próximos passos:"
echo "1. Verificar variáveis de ambiente no .env"
echo "2. Executar: make dev"
echo "3. Aceder a http://localhost:3000"
echo ""
echo "Comandos úteis:"
echo "- make help          # Ver todos os comandos"
echo "- make dev           # Iniciar ambiente de desenvolvimento"
echo "- make logs          # Ver logs dos serviços"
echo "- make stop          # Parar serviços"
echo ""

