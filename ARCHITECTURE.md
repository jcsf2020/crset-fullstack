# CRSET Pipeline - Arquitetura

## 🏗️ Visão Geral

O CRSET Pipeline é uma arquitetura completa de microsserviços que integra:

- **Frontend**: React/Vite com TypeScript
- **Backend**: FastAPI com Python
- **Base de Dados**: PostgreSQL (Supabase)
- **Pagamentos**: Stripe
- **IA**: OpenAI GPT-4
- **Comunicação**: WhatsApp Business API
- **Deploy**: Railway (backend) + Vercel (frontend)

## 📊 Diagrama de Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │    │   Backend       │    │   Supabase      │
│   (React/Vite)  │◄──►│   (FastAPI)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       
         │                       │                       
         ▼                       ▼                       
┌─────────────────┐    ┌─────────────────┐              
│                 │    │                 │              
│   Stripe        │    │   OpenAI        │              
│   (Pagamentos)  │    │   (IA/GPT-4)    │              
│                 │    │                 │              
└─────────────────┘    └─────────────────┘              
                                │                       
                                ▼                       
                    ┌─────────────────┐              
                    │                 │              
                    │   WhatsApp      │              
                    │   Business API  │              
                    │                 │              
                    └─────────────────┘              
```

## 🔄 Fluxo de Dados

### 1. Captura de Leads
```
Utilizador → Frontend → Backend → Supabase → WhatsApp Notification
```

### 2. Processamento de Pagamentos
```
Utilizador → Stripe.js → Stripe API → Backend → Supabase → Confirmation
```

### 3. Chat com IA
```
Utilizador → Frontend → Backend → OpenAI API → Response → Frontend
```

## 🏢 Componentes Principais

### Frontend (React/Vite)
- **Localização**: `frontend/`
- **Tecnologias**: React 18, TypeScript, Tailwind CSS, Vite
- **Responsabilidades**:
  - Interface de utilizador
  - Integração Stripe.js
  - Chat com IA
  - Formulários de leads
- **Deploy**: Vercel

### Backend (FastAPI)
- **Localização**: `backend/`
- **Tecnologias**: FastAPI, Python 3.11, Pydantic
- **Responsabilidades**:
  - API REST
  - Autenticação JWT
  - Integração Stripe
  - Integração OpenAI
  - Gestão de leads
- **Deploy**: Railway

### Base de Dados (Supabase)
- **Tecnologia**: PostgreSQL
- **Funcionalidades**:
  - Armazenamento de dados
  - Autenticação
  - Row Level Security (RLS)
  - Real-time subscriptions

## 🔐 Segurança

### Autenticação
- JWT tokens com expiração
- Row Level Security no Supabase
- HTTPS obrigatório em produção

### Variáveis de Ambiente
- Chaves secretas nunca expostas no frontend
- Separação entre desenvolvimento e produção
- Rotação regular de tokens

### CORS
- Configuração restritiva por domínio
- Headers de segurança implementados

## 🚀 Deploy e CI/CD

### GitHub Actions
- **Trigger**: Push para `main` branch
- **Passos**:
  1. Testes automatizados
  2. Build das aplicações
  3. Deploy no Railway (backend)
  4. Deploy no Vercel (frontend)
  5. Notificações de sucesso/falha

### Ambientes
- **Desenvolvimento**: Docker Compose local
- **Staging**: Branch `develop` (opcional)
- **Produção**: Branch `main`

## 📈 Monitorização

### Logs
- Structured logging com Python `structlog`
- Logs centralizados no Railway
- Monitoring de erros em tempo real

### Health Checks
- Endpoint `/health` no backend
- Verificação de dependências externas
- Alertas automáticos em caso de falha

## 🔧 Manutenção

### Backups
- Backup automático do Supabase
- Versionamento de código no Git
- Backup de variáveis de ambiente

### Atualizações
- Dependências atualizadas regularmente
- Testes de segurança automatizados
- Rollback automático em caso de falha

## 📊 Performance

### Frontend
- Code splitting automático
- Lazy loading de componentes
- CDN global via Vercel
- Compressão gzip/brotli

### Backend
- Async/await para operações I/O
- Connection pooling para base de dados
- Cache de respostas quando apropriado
- Rate limiting para APIs

## 🔄 Escalabilidade

### Horizontal
- Stateless backend permite múltiplas instâncias
- Load balancing automático no Railway
- CDN para assets estáticos

### Vertical
- Auto-scaling baseado em CPU/memória
- Monitoring de recursos em tempo real
- Alertas de capacidade

## 🧪 Testes

### Backend
- Testes unitários com pytest
- Testes de integração com base de dados
- Mocking de APIs externas

### Frontend
- Testes de componentes
- Testes end-to-end
- Testes de acessibilidade

## 📚 Documentação

### API
- Documentação automática com FastAPI/Swagger
- Exemplos de uso para cada endpoint
- Versionamento da API

### Código
- Comentários inline
- README detalhado
- Guias de setup e deploy

