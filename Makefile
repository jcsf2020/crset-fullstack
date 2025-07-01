# FinanceFlow Docker - Makefile
# Comandos para gestão do projeto

.PHONY: help build up down restart logs clean install dev prod backup restore

# Mostrar ajuda
help:
	@echo "FinanceFlow Docker - Comandos disponíveis:"
	@echo ""
	@echo "  make build     - Construir todas as imagens"
	@echo "  make up        - Iniciar todos os serviços"
	@echo "  make down      - Parar todos os serviços"
	@echo "  make restart   - Reiniciar todos os serviços"
	@echo "  make logs      - Mostrar logs de todos os serviços"
	@echo "  make clean     - Limpar volumes e imagens não utilizadas"
	@echo "  make install   - Instalar dependências da aplicação"
	@echo "  make dev       - Iniciar em modo desenvolvimento"
	@echo "  make prod      - Iniciar em modo produção"
	@echo "  make backup    - Fazer backup da base de dados"
	@echo "  make restore   - Restaurar backup da base de dados"
	@echo ""

# Construir imagens
build:
	@echo "🔨 Construindo imagens Docker..."
	docker-compose build --no-cache

# Iniciar serviços
up:
	@echo "🚀 Iniciando serviços..."
	docker-compose up -d
	@echo "✅ Serviços iniciados!"
	@echo "🌐 Aplicação disponível em: http://localhost:3000"
	@echo "🗄️  Base de dados disponível em: localhost:5432"

# Parar serviços
down:
	@echo "🛑 Parando serviços..."
	docker-compose down

# Reiniciar serviços
restart: down up

# Mostrar logs
logs:
	docker-compose logs -f

# Limpar sistema
clean:
	@echo "🧹 Limpando sistema..."
	docker-compose down -v
	docker system prune -f
	docker volume prune -f

# Instalar dependências
install:
	@echo "📦 Instalando dependências..."
	docker-compose run --rm app npm install

# Modo desenvolvimento
dev:
	@echo "🔧 Iniciando em modo desenvolvimento..."
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Modo produção
prod:
	@echo "🚀 Iniciando em modo produção..."
	docker-compose up -d

# Backup da base de dados
backup:
	@echo "💾 Fazendo backup da base de dados..."
	docker-compose exec db pg_dump -U financeflow financeflow > backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup criado!"

# Restaurar backup
restore:
	@echo "📥 Para restaurar um backup, execute:"
	@echo "docker-compose exec -T db psql -U financeflow financeflow < backup_YYYYMMDD_HHMMSS.sql"

# Status dos serviços
status:
	@echo "📊 Status dos serviços:"
	docker-compose ps

