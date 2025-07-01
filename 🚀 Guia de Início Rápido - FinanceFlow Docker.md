# 🚀 Guia de Início Rápido - FinanceFlow Docker

## Em 5 Minutos

### 1. Pré-requisitos
- Docker instalado
- 4GB RAM disponível
- Portas 3000, 5432, 6379, 80 livres

### 2. Instalação
```bash
# Descarregar projeto
cd financeflow-docker

# Configurar ambiente
cp .env.example .env

# Iniciar serviços
make up
```

### 3. Acesso
- **Aplicação**: http://localhost:3000
- **Base de dados**: localhost:5432 (financeflow/financeflow123)

### 4. Login
- Email: `demo@financeflow.com`
- Password: Criar conta ou usar Google OAuth

## Comandos Essenciais

```bash
make up        # Iniciar
make down      # Parar
make logs      # Ver logs
make restart   # Reiniciar
make clean     # Limpar tudo
```

## Configuração Mínima

Edite `.env` apenas se necessário:
```env
NEXTAUTH_SECRET=altere-esta-chave-secreta
OPENAI_API_KEY=sk-... # Opcional para IA
```

## Resolução Rápida

### Erro de porta ocupada
```bash
sudo systemctl stop apache2 nginx
make restart
```

### Base de dados não inicia
```bash
make clean
make up
```

### Aplicação não carrega
```bash
make logs
# Verificar logs para erros
```

## Funcionalidades Principais

1. **Dashboard** - Visão geral financeira
2. **Transações** - Adicionar receitas/despesas
3. **Orçamentos** - Controlar gastos por categoria
4. **Metas** - Definir objetivos financeiros
5. **IA** - Assistente financeiro (requer OpenAI API)

## Dados de Demonstração

O sistema inclui:
- Utilizador demo
- Categorias pré-definidas
- Transações de exemplo
- Orçamentos configurados
- Metas financeiras

## Próximos Passos

1. Explorar dashboard
2. Adicionar transações reais
3. Configurar orçamentos
4. Definir metas
5. Configurar OpenAI para IA (opcional)

---

**Precisa de ajuda?** Consulte o README.md completo ou verifique os logs com `make logs`.

