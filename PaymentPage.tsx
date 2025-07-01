import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { apiService } from '../services/api'

const PaymentPage: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Criar Payment Intent
      const { client_secret } = await apiService.createPaymentIntent({
        amount: 9900, // €99.00
        currency: 'eur',
        description: 'CRSET Solutions - Plano Starter'
      })

      // Confirmar pagamento
      const { error: stripeError } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      })

      if (stripeError) {
        setError(stripeError.message || 'Erro no pagamento')
      } else {
        setSuccess(true)
      }
    } catch (err: any) {
      setError(err.message || 'Erro interno')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-white mb-4">Pagamento Confirmado!</h1>
          <p className="text-gray-300 mb-6">
            Obrigado pela sua compra. Em breve receberá um email com os detalhes de acesso.
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Ir para Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          CRSET Solutions
        </h1>
        
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Plano Starter</h2>
          <div className="text-3xl font-bold text-blue-400 mb-2">€99,00</div>
          <ul className="text-gray-300 space-y-2">
            <li>✓ Automação básica de processos</li>
            <li>✓ Integração com IA</li>
            <li>✓ WhatsApp Business</li>
            <li>✓ Suporte técnico</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Processando...' : 'Pagar €99,00'}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Pagamento seguro processado pelo Stripe
        </p>
      </div>
    </div>
  )
}

export default PaymentPage

