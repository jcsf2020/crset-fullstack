"""
CRSET Solutions - Backend API (Simplified for Testing)
FastAPI application without external integrations for stress test
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from typing import Optional

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="CRSET Solutions API (Test)",
    description="Backend API simplificado para stress test",
    version="1.0.0-test"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class HealthResponse(BaseModel):
    status: str
    message: str
    version: str
    timestamp: str

class LeadData(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str
    whatsapp_number: Optional[str] = None

# Routes
@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint"""
    import datetime
    return HealthResponse(
        status="success",
        message="CRSET Solutions API (Test Mode) is running",
        version="1.0.0-test",
        timestamp=datetime.datetime.now().isoformat()
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    import datetime
    return HealthResponse(
        status="healthy",
        message="All systems operational (test mode)",
        version="1.0.0-test",
        timestamp=datetime.datetime.now().isoformat()
    )

@app.post("/api/leads")
async def create_lead(lead: LeadData):
    """Simular criação de lead (sem base de dados)"""
    try:
        logger.info(f"Lead simulada recebida: {lead.email}")
        
        # Simular processamento
        lead_id = f"test_{hash(lead.email) % 10000}"
        
        return {
            "status": "success", 
            "lead_id": lead_id,
            "message": "Lead processada em modo de teste",
            "data": lead.dict()
        }
    
    except Exception as e:
        logger.error(f"Erro ao processar lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@app.get("/api/test/mascots")
async def test_mascots():
    """Endpoint de teste para mascotes"""
    return {
        "mascots": {
            "laya": {"route": "/", "role": "onboarding", "active": True},
            "irina": {"route": "/dashboard", "role": "analysis", "active": True},
            "boris": {"route": "/login", "role": "security", "active": True}
        },
        "status": "test_mode"
    }

@app.get("/api/test/integrations")
async def test_integrations():
    """Endpoint de teste para integrações"""
    return {
        "integrations": {
            "stripe": "simulated",
            "openai": "simulated", 
            "supabase": "simulated",
            "whatsapp": "simulated"
        },
        "status": "test_mode",
        "note": "Todas as integrações estão em modo simulado para stress test"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

