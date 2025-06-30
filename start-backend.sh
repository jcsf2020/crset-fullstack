#!/bin/bash

# Script para iniciar o backend CRSET
echo "Iniciando backend CRSET..."

# Navegar para o diretório do backend
cd /home/ubuntu/crset-project/backend

# Verificar se as dependências estão instaladas
if ! python -c "import fastapi" 2>/dev/null; then
    echo "Instalando dependências..."
    pip install -r requirements.txt
fi

# Parar qualquer processo uvicorn existente na porta 8000
echo "Parando processos existentes na porta 8000..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true

# Aguardar um momento
sleep 2

# Iniciar o servidor
echo "Iniciando servidor FastAPI na porta 8000..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &

# Aguardar o servidor iniciar
sleep 3

# Verificar se está funcionando
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend iniciado com sucesso!"
    echo "📖 Documentação disponível em: http://localhost:8000/docs"
    echo "🔗 API root: http://localhost:8000/"
    echo "❤️ Health check: http://localhost:8000/health"
else
    echo "❌ Erro ao iniciar o backend"
    exit 1
fi
