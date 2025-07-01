# FinanceFlow Docker

Uma aplicação completa de gestão financeira pessoal construída com Next.js, PostgreSQL e executada em contentores Docker.

## 🚀 Características

- **Frontend**: Next.js 14 com TypeScript e Tailwind CSS
- **Backend**: API Routes do Next.js com Prisma ORM
- **Base de dados**: PostgreSQL 15
- **Autenticação**: NextAuth.js com suporte para Google OAuth
- **IA**: Integração com OpenAI GPT-4 para assistente financeiro
- **Cache**: Redis para sessões e cache
- **Proxy**: Nginx como reverse proxy com rate limiting
- **Containerização**: Docker e Docker Compose

## 📋 Funcionalidades

- Dashboard financeiro com visão geral
- Gestão de transações (receitas e despesas)
- Categorização automática de transações
- Orçamentos e acompanhamento de gastos
- Metas financeiras com progresso
- Assistente IA para conselhos financeiros
- Autenticação segura com NextAuth.js
- Interface responsiva para desktop e mobile

## 🛠️ Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- 4GB RAM disponível
- 10GB espaço em disco

## ⚡ Instalação Rápida

1. **Clonar ou descarregar o projeto**
   ```bash
   # Se tiver git
   git clone <url-do-repositorio>
   cd financeflow-docker
   
   # Ou descarregar e extrair o ZIP
   ```

2. **Configurar variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Editar .env com as suas configurações
   ```

3. **Iniciar os serviços**
   ```bash
   make up
   # ou
   docker compose up -d
   ```

4. **Aceder à aplicação**
   - Aplicação: http://localhost:3000
   - Base de dados: localhost:5432
   - Adminer (dev): http://localhost:8080

## 🔧 Configuração Detalhada

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
# Base de dados
DATABASE_URL=postgresql://financeflow:financeflow123@db:5432/financeflow

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# OpenAI API (opcional)
OPENAI_API_KEY=your-openai-api-key-here

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Comandos Make

O projeto inclui um Makefile para facilitar a gestão:

```bash
make help      # Mostrar todos os comandos disponíveis
make build     # Construir todas as imagens
make up        # Iniciar todos os serviços
make down      # Parar todos os serviços
make restart   # Reiniciar todos os serviços
make logs      # Mostrar logs de todos os serviços
make clean     # Limpar volumes e imagens não utilizadas
make dev       # Iniciar em modo desenvolvimento
make backup    # Fazer backup da base de dados
make status    # Mostrar status dos serviços
```

## 🏗️ Arquitetura

### Serviços

1. **app**: Aplicação Next.js
   - Porta: 3000
   - Dependências: PostgreSQL
   - Volumes: logs da aplicação

2. **db**: PostgreSQL 15
   - Porta: 5432
   - Volumes: dados persistentes
   - Health checks configurados

3. **redis**: Cache e sessões
   - Porta: 6379
   - Volumes: dados persistentes

4. **nginx**: Reverse proxy
   - Portas: 80, 443
   - Rate limiting configurado
   - Headers de segurança

### Volumes

- `postgres-data`: Dados da base de dados
- `redis-data`: Cache do Redis
- `app-logs`: Logs da aplicação

### Redes

- `financeflow-network`: Rede interna para comunicação entre serviços

## 🔒 Segurança

- Headers de segurança configurados no Nginx
- Rate limiting para APIs e login
- Variáveis de ambiente para credenciais
- Isolamento de rede entre contentores
- Health checks para todos os serviços

## 🚀 Desenvolvimento

Para desenvolvimento local:

```bash
# Iniciar em modo desenvolvimento
make dev

# Ou manualmente
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Funcionalidades do modo desenvolvimento:
- Hot reload automático
- Adminer para gestão da base de dados
- Volumes montados para edição em tempo real
- Porta de debug exposta (9229)

## 📊 Monitorização

### Logs

```bash
# Ver logs de todos os serviços
make logs

# Ver logs de um serviço específico
docker compose logs -f app
docker compose logs -f db
```

### Health Checks

Todos os serviços têm health checks configurados:
- PostgreSQL: `pg_isready`
- Redis: `redis-cli ping`
- Nginx: endpoint `/health`

### Status dos Serviços

```bash
make status
# ou
docker compose ps
```

## 💾 Backup e Restauro

### Backup

```bash
# Backup automático com timestamp
make backup

# Backup manual
docker compose exec db pg_dump -U financeflow financeflow > backup.sql
```

### Restauro

```bash
# Restaurar backup
docker compose exec -T db psql -U financeflow financeflow < backup.sql
```

## 🔧 Resolução de Problemas

### Problemas Comuns

1. **Porta já em uso**
   ```bash
   # Verificar portas em uso
   sudo netstat -tulpn | grep :3000
   
   # Parar serviços conflituosos
   sudo systemctl stop apache2
   sudo systemctl stop nginx
   ```

2. **Problemas de permissões**
   ```bash
   # Adicionar utilizador ao grupo docker
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Base de dados não inicia**
   ```bash
   # Verificar logs
   docker compose logs db
   
   # Limpar volumes se necessário
   make clean
   ```

4. **Aplicação não conecta à base de dados**
   ```bash
   # Verificar health check da base de dados
   docker compose ps
   
   # Verificar variáveis de ambiente
   docker compose config
   ```

### Logs Detalhados

```bash
# Logs com timestamps
docker compose logs -f -t

# Logs de um serviço específico
docker compose logs -f app

# Últimas 100 linhas
docker compose logs --tail=100
```

## 📈 Performance

### Otimizações Incluídas

- Multi-stage build para imagens otimizadas
- Nginx com compressão gzip
- Cache do Redis para sessões
- Health checks para disponibilidade
- Volumes persistentes para dados

### Monitorização de Recursos

```bash
# Uso de recursos dos contentores
docker stats

# Espaço usado pelos volumes
docker system df
```

## 🌐 Produção

### Configurações de Produção

1. **Alterar credenciais padrão**
   - Passwords da base de dados
   - NEXTAUTH_SECRET
   - Chaves API

2. **Configurar SSL**
   - Adicionar certificados em `nginx/ssl/`
   - Descomentar configuração HTTPS no nginx.conf

3. **Configurar domínio**
   - Alterar NEXTAUTH_URL
   - Configurar DNS

4. **Backup automático**
   - Configurar cron jobs para backups
   - Armazenamento externo para backups

### Deploy

```bash
# Construir para produção
make build

# Iniciar em produção
make prod
```

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

## 🤝 Contribuição

1. Fork o projeto
2. Criar branch para feature (`git checkout -b feature/AmazingFeature`)
3. Commit das alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📞 Suporte

Para suporte e questões:
- Criar issue no repositório
- Verificar logs com `make logs`
- Consultar documentação do Docker

---

**FinanceFlow Docker** - Gestão financeira pessoal simplificada com Docker 🐳

