#!/bin/bash

# Script de verificação do sistema FinanceFlow Docker
# Verifica se todos os requisitos estão atendidos

echo "🔍 FinanceFlow Docker - Verificação do Sistema"
echo "=============================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar comando
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✅ $1 está instalado${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 não está instalado${NC}"
        return 1
    fi
}

# Função para verificar porta
check_port() {
    if netstat -tuln 2>/dev/null | grep -q ":$1 "; then
        echo -e "${YELLOW}⚠️  Porta $1 está em uso${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Porta $1 está livre${NC}"
        return 0
    fi
}

# Verificar Docker
echo -e "\n📦 Verificando Docker..."
if check_command docker; then
    DOCKER_VERSION=$(docker --version)
    echo "   Versão: $DOCKER_VERSION"
    
    # Verificar se Docker está a correr
    if docker info &> /dev/null; then
        echo -e "${GREEN}✅ Docker daemon está a correr${NC}"
    else
        echo -e "${RED}❌ Docker daemon não está a correr${NC}"
        echo "   Execute: sudo systemctl start docker"
    fi
else
    echo "   Instale Docker: curl -fsSL https://get.docker.com | sh"
fi

# Verificar Docker Compose
echo -e "\n🐙 Verificando Docker Compose..."
if check_command "docker compose" || check_command "docker-compose"; then
    if command -v "docker compose" &> /dev/null; then
        COMPOSE_VERSION=$(docker compose version)
    else
        COMPOSE_VERSION=$(docker-compose --version)
    fi
    echo "   Versão: $COMPOSE_VERSION"
fi

# Verificar portas
echo -e "\n🔌 Verificando portas..."
PORTS=(3000 5432 6379 80 443)
ALL_PORTS_FREE=true

for port in "${PORTS[@]}"; do
    if ! check_port $port; then
        ALL_PORTS_FREE=false
    fi
done

if [ "$ALL_PORTS_FREE" = true ]; then
    echo -e "${GREEN}✅ Todas as portas necessárias estão livres${NC}"
fi

# Verificar recursos do sistema
echo -e "\n💾 Verificando recursos do sistema..."

# RAM
TOTAL_RAM=$(free -m | awk 'NR==2{printf "%.1f", $2/1024}')
AVAILABLE_RAM=$(free -m | awk 'NR==2{printf "%.1f", $7/1024}')
echo "   RAM Total: ${TOTAL_RAM}GB"
echo "   RAM Disponível: ${AVAILABLE_RAM}GB"

if (( $(echo "$AVAILABLE_RAM >= 4.0" | bc -l) )); then
    echo -e "${GREEN}✅ RAM suficiente${NC}"
else
    echo -e "${YELLOW}⚠️  RAM pode ser insuficiente (recomendado: 4GB)${NC}"
fi

# Espaço em disco
DISK_SPACE=$(df -h . | awk 'NR==2 {print $4}')
echo "   Espaço disponível: $DISK_SPACE"

# Verificar ficheiros do projeto
echo -e "\n📁 Verificando ficheiros do projeto..."
REQUIRED_FILES=(
    "docker-compose.yml"
    "app/Dockerfile"
    "app/package.json"
    ".env.example"
    "Makefile"
)

ALL_FILES_PRESENT=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file não encontrado${NC}"
        ALL_FILES_PRESENT=false
    fi
done

# Verificar configuração do Docker Compose
echo -e "\n⚙️  Verificando configuração Docker Compose..."
if docker compose config &> /dev/null; then
    echo -e "${GREEN}✅ Configuração Docker Compose válida${NC}"
else
    echo -e "${RED}❌ Erro na configuração Docker Compose${NC}"
    echo "   Execute: docker compose config"
fi

# Resumo final
echo -e "\n📋 Resumo da Verificação"
echo "========================"

if check_command docker && check_command "docker compose" && [ "$ALL_FILES_PRESENT" = true ]; then
    echo -e "${GREEN}🎉 Sistema pronto para executar FinanceFlow!${NC}"
    echo ""
    echo "Próximos passos:"
    echo "1. cp .env.example .env"
    echo "2. make up"
    echo "3. Aceder http://localhost:3000"
else
    echo -e "${RED}❌ Sistema não está pronto${NC}"
    echo ""
    echo "Resolva os problemas indicados acima antes de continuar."
fi

echo ""
echo "Para mais ajuda, consulte README.md ou execute 'make help'"

