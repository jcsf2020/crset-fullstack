# CRSET Backend API

## Status
✅ **Backend operacional e funcionando!**

## Endpoints Disponíveis

- **API Root**: http://localhost:8000/
- **Documentação Swagger**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Teste API**: http://localhost:8000/api/test

## Como Iniciar

### Método 1: Script Automático (Recomendado)
```bash
cd /home/ubuntu/crset-project
./start-backend.sh
```

### Método 2: Manual
```bash
cd /home/ubuntu/crset-project/backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Estrutura do Backend

```
backend/
├── app/
│   └── main.py          # Aplicação FastAPI principal
├── Dockerfile           # Configuração Docker
├── requirements.txt     # Dependências Python
└── README.md           # Este arquivo
```

## Funcionalidades

- ✅ FastAPI com documentação automática
- ✅ CORS configurado para frontend (localhost:5173, localhost:3000)
- ✅ Endpoints de health check
- ✅ Endpoint de teste
- ✅ Hot reload durante desenvolvimento

## Testes de Conectividade

```bash
# Testar endpoint root
curl http://localhost:8000/

# Testar health check
curl http://localhost:8000/health

# Testar endpoint de API
curl http://localhost:8000/api/test
```

## Logs e Debugging

O servidor roda com `--reload` ativado, então mudanças no código são aplicadas automaticamente.

Para ver logs em tempo real:
```bash
tail -f /var/log/uvicorn.log  # se configurado
```

## Próximos Passos

1. ✅ Backend funcionando na porta 8000
2. ✅ Documentação acessível em /docs
3. ✅ CORS configurado para frontend
4. 🔄 Docker (opcional - backend já funciona sem Docker)
5. 🔄 Integração com frontend React

## Problemas Conhecidos

- Docker daemon tem problemas de permissão no ambiente atual
- Solução: Backend funciona perfeitamente sem Docker usando uvicorn diretamente

## Contato

Backend desenvolvido para o projeto CRSET Solutions.
