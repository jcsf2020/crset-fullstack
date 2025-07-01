-- Inicialização da base de dados FinanceFlow
-- Este script é executado automaticamente quando o contentor PostgreSQL é criado

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Configurar timezone
SET timezone = 'UTC';

-- Criar índices adicionais para performance (serão aplicados após as migrações do Prisma)
-- Estes comandos serão executados via script separado após o Prisma criar as tabelas

