
# CRSET Solutions - MVP Full Stack

Sistema completo de autenticação, dashboard e checkout com Stripe.

## 🚀 Tecnologias

- **Backend**: FastAPI + SQLAlchemy + JWT + Stripe
- **Frontend**: React + TypeScript + Vite
- **Banco**: SQLite (desenvolvimento)
- **Autenticação**: JWT tokens
- **Pagamentos**: Stripe integration

## 📋 Pré-requisitos

- Node.js 18+
- Python 3.8+
- Docker (opcional)

## 🔧 Configuração

### 1. Variáveis de Ambiente

Copie os arquivos de exemplo:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Configure suas chaves do Stripe nos arquivos `.env`:
- `VITE_STRIPE_PUBLISHABLE_KEY`: Chave pública do Stripe
- `STRIPE_SECRET_KEY`: Chave secreta do Stripe (backend)

### 2. Backend (FastAPI)

#### Opção A: Docker
```bash
docker-compose up backend
```

#### Opção B: Manual
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

### 3. Frontend (React/Vite)

```bash
npm install
npm run dev
```

## 🌐 Endpoints

### Backend (http://localhost:8001)
- `GET /health` - Status da API
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login
- `GET /dashboard/stats` - Dados do dashboard (autenticado)
- `POST /checkout/create-session` - Criar sessão Stripe (autenticado)

### Frontend (http://localhost:5175)
- `/` - Página inicial/login
- `/register` - Registro
- `/dashboard` - Dashboard (autenticado)

## 🔐 Autenticação JWT

### Formato do Token
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "exp": 1640995200
}
```

### Headers de Autenticação
```
Authorization: Bearer <jwt_token>
```

### Storage
- Frontend: `localStorage.getItem('token')`
- Expiração: 24 horas

## 💳 Stripe Integration

### Fluxo de Checkout
1. Usuário clica em "Checkout"
2. Frontend chama `/checkout/create-session`
3. Redirecionamento para Stripe Checkout
4. Retorno para success/cancel URLs

### URLs de Retorno
- Success: `http://localhost:5175/success`
- Cancel: `http://localhost:5175/cancel`

## 🧪 Testes

### Teste Manual Completo
1. Acesse http://localhost:5175
2. Registre novo usuário
3. Faça login
4. Verifique token no localStorage
5. Acesse dashboard
6. Teste botão de checkout
7. Faça logout

### Dados de Teste Stripe
- Cartão: `4242 4242 4242 4242`
- Expiração: Qualquer data futura
- CVC: Qualquer 3 dígitos

## 📁 Estrutura do Projeto

```
crset-project/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── main.py         # Aplicação principal
│   │   ├── auth/           # Autenticação
│   │   ├── dashboard/      # Dashboard endpoints
│   │   └── checkout/       # Stripe integration
│   ├── .env                # Variáveis backend
│   └── requirements.txt
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── context/           # Context API
│   └── utils/             # Utilitários
├── .env                   # Variáveis frontend
└── package.json
```

## 🚀 Deploy

### Preparação para Commit
```bash
git add .
git commit -m "checkpoint: MVP validado com auth, dashboard, checkout e docs"
```

### Variáveis de Produção
- Configure `VITE_API_URL` para URL do backend em produção
- Use chaves reais do Stripe
- Configure `DATABASE_URL` para PostgreSQL em produção

## 📞 Suporte

Para dúvidas sobre implementação, consulte a documentação dos endpoints ou verifique os logs do backend.
