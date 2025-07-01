# CRSET Pipeline - Docker + GitHub + Railway

Este projeto configura um pipeline completo de CI/CD para a CRSET Solutions, permitindo deploy automático na Railway sempre que houver push para o repositório GitHub.

## Arquitetura

- **Frontend**: React/Vite (deploy na Vercel/Netlify)
- **Backend**: FastAPI + PostgreSQL (deploy na Railway)
- **Containerização**: Docker multi-stage
- **CI/CD**: GitHub Actions + Railway auto-deploy

## Estrutura do Projeto

```
crset-pipeline/
├── backend/                 # API FastAPI
│   ├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── railway.json
├── frontend/               # React/Vite app
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Desenvolvimento local
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
└── docs/                   # Documentação
```

## Variáveis de Ambiente

Baseado no CRSET MASTER PROMPT:

```env
# Backend (Railway)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxx
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-crset-agent-mike...
JWT_SECRET=crset-super-secret-key
WHATSAPP_NUMBER=+351914423688

# Frontend (Vercel/Netlify)
VITE_API_URL=https://crset-backend-prod.railway.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxx
FRONTEND_URL=https://crsetsolutions.com
```

## Deploy

1. **Desenvolvimento**: `docker-compose up`
2. **Produção**: Push para GitHub → Auto-deploy na Railway
3. **Frontend**: Deploy automático na Vercel/Netlify

## Próximos Passos

1. ✅ Estrutura base do pipeline
2. 🔄 Configurar backend FastAPI
3. 🔄 Configurar frontend React/Vite
4. 🔄 Setup GitHub Actions
5. 🔄 Configurar Railway deploy
6. 🔄 Testes e validação

