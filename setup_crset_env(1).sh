#!/bin/bash

echo "🔧 Inicialização do ambiente CRSET Solutions..."

# ================================
# 🌐 FRONTEND ENV VARIABLES
# ================================
export VITE_API_URL="https://crset-backend-prod.railway.app"
export VITE_STRIPE_PUBLISHABLE_KEY="pk_live_xxxxxxxxxxxxxxxxx"
export FRONTEND_URL="https://crsetsolutions.com"

# ================================
# 🔐 BACKEND ENV VARIABLES
# ================================
export STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxxxxxxx"
export JWT_SECRET="crset-super-secret-key"

export SUPABASE_URL="https://xxxxxxxx.supabase.co"
export SUPABASE_ANON_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

export OPENAI_API_KEY="sk-crset-agent-mikexxxxxxxxxxxxxxxxxxxxx"

export WHATSAPP_NUMBER="+351914423688"

# ================================
# 📦 Execução Docker (exemplo)
# ================================
echo "🚀 A correr container Docker de frontend..."
docker build -t crset-frontend ./frontend
docker run -d -p 5173:5173 --env-file=.env crset-frontend

# ================================
# ✅ Confirmação
# ================================
echo "✅ Ambiente CRSET carregado com sucesso."