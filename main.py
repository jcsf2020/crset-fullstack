"""
CRSET Solutions - Backend API
FastAPI application with Stripe, Supabase, OpenAI integrations
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os
import stripe
import openai
from supabase import create_client, Client
import logging
from typing import Optional, Dict, Any
import requests # Importar requests para chamadas HTTP

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="CRSET Solutions API",
    description="Backend API para CRSET Solutions com integrações Stripe, Supabase e OpenAI",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar integrações
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")

# Supabase
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Security
security = HTTPBearer()

# Models
class HealthResponse(BaseModel):
    status: str
    message: str
    version: str

class LeadData(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str
    whatsapp_number: Optional[str] = None # Adicionar campo para número de WhatsApp

class PaymentIntent(BaseModel):
    amount: int
    currency: str = "eur"
    description: Optional[str] = None

class AIQuery(BaseModel):
    message: str
    context: Optional[str] = None

# Função para enviar notificação WhatsApp
async def send_whatsapp_notification(lead: LeadData):
    whatsapp_api_url = "https://api.whatsapp.com/send" # Exemplo, usar API oficial ou Twilio/MessageBird
    target_number = os.getenv("WHATSAPP_NUMBER") # Número de destino para notificações

    if not target_number:
        logger.warning("WHATSAPP_NUMBER não configurado. Notificação WhatsApp não enviada.")
        return

    message_text = (
        f"*Nova Lead CRSET Solutions*\n\n"\
        f"*Nome:* {lead.name}\n"\
        f"*Email:* {lead.email}\n"
    )
    if lead.company: message_text += f"*Empresa:* {lead.company}\n"
    if lead.message: message_text += f"*Mensagem:* {lead.message}\n"
    if lead.whatsapp_number: message_text += f"*WhatsApp Lead:* {lead.whatsapp_number}\n"

    # Este é um exemplo simplificado. Em produção, usar uma API de WhatsApp Business.
    # Ex: Twilio, MessageBird, ou a API oficial do WhatsApp Business.
    # A implementação real dependeria da plataforma escolhida e suas credenciais.
    try:
        # Para um teste simples, pode-se usar um link wa.me, mas não é uma notificação automática.
        # requests.get(f"https://wa.me/{target_number}?text={message_text}")
        logger.info(f"Simulando envio de notificação WhatsApp para {target_number}: {message_text}")
        # Aqui seria a chamada real à API do WhatsApp Business
        # response = requests.post(whatsapp_api_url, json={'to': target_number, 'message': message_text, ...})
        # response.raise_for_status() # Levanta exceção para erros HTTP
        logger.info("Notificação WhatsApp simulada com sucesso.")
    except Exception as e:
        logger.error(f"Erro ao enviar notificação WhatsApp: {str(e)}")

# Routes
@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint"""
    return HealthResponse(
        status="success",
        message="CRSET Solutions API is running",
        version="1.0.0"
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint para Railway"""
    return HealthResponse(
        status="healthy",
        message="All systems operational",
        version="1.0.0"
    )

@app.post("/api/leads")
async def create_lead(lead: LeadData):
    """Criar nova lead no Supabase"""
    try:
        # Inserir lead na base de dados
        result = supabase.table("leads").insert({
            "name": lead.name,
            "email": lead.email,
            "company": lead.company,
            "message": lead.message,
            "whatsapp_number": lead.whatsapp_number, # Guardar número de WhatsApp
            "created_at": "now()"
        }).execute()
        
        logger.info(f"Nova lead criada: {lead.email}")
        
        # Enviar notificação WhatsApp
        await send_whatsapp_notification(lead)
        
        return {"status": "success", "lead_id": result.data[0]["id"]}
    
    except Exception as e:
        logger.error(f"Erro ao criar lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@app.post("/api/payments/create-intent")
async def create_payment_intent(payment: PaymentIntent):
    """Criar Payment Intent do Stripe"""
    try:
        intent = stripe.PaymentIntent.create(
            amount=payment.amount,
            currency=payment.currency,
            description=payment.description,
            automatic_payment_methods={"enabled": True}
        )
        
        return {"client_secret": intent.client_secret}
    
    except stripe.error.StripeError as e:
        logger.error(f"Erro Stripe: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/ai/chat")
async def ai_chat(query: AIQuery):
    """Chat com OpenAI"""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "És o assistente IA da CRSET Solutions. Responde de forma profissional e útil."},
                {"role": "user", "content": query.message}
            ],
            max_tokens=500
        )
        
        return {"response": response.choices[0].message.content}
    
    except Exception as e:
        logger.error(f"Erro OpenAI: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro no serviço de IA")

@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Dict[Any, Any]):
    """Webhook do Stripe para eventos de pagamento"""
    try:
        # TODO: Verificar assinatura do webhook
        # TODO: Processar eventos de pagamento
        
        event_type = request.get("type")
        logger.info(f"Webhook Stripe recebido: {event_type}")
        
        return {"status": "success"}
    
    except Exception as e:
        logger.error(f"Erro webhook Stripe: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro no webhook")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



