
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Mascot from './Mascot';

const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here');

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [amount] = useState(29.99); // Default price

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create payment intent
      const { client_secret } = await api.post('/payments/create-payment-intent', {
        amount: amount,
        currency: 'eur'
      }, token);

      // Confirm payment
      const { error: stripeError } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: user?.full_name,
            email: user?.email,
          },
        }
      });

      if (stripeError) {
        setError(stripeError.message || 'Erro no pagamento');
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err: any) {
      setError('Erro ao processar pagamento. Tente novamente.');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl">✓</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Pagamento Realizado!</h2>
          <p className="text-gray-400">Obrigado pela sua compra. A redirecioná-lo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-gray-400">
            Faça upgrade da sua conta CRSET Solutions
          </p>
        </div>

        {/* Mascot */}
        <div className="flex justify-center mb-8">
          <Mascot type="boris" size="medium" />
        </div>

        {/* Pricing Card */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Plano Premium</h3>
            <div className="text-3xl font-bold text-neon-green mb-4">
              €{amount}
              <span className="text-lg text-gray-400">/mês</span>
            </div>
            <ul className="text-left space-y-2 mb-6">
              <li className="text-gray-300 flex items-center">
                <span className="text-neon-green mr-2">✓</span>
                Acesso a todas as ferramentas IA
              </li>
              <li className="text-gray-300 flex items-center">
                <span className="text-neon-green mr-2">✓</span>
                Suporte prioritário 24/7
              </li>
              <li className="text-gray-300 flex items-center">
                <span className="text-neon-green mr-2">✓</span>
                Relatórios avançados
              </li>
              <li className="text-gray-300 flex items-center">
                <span className="text-neon-green mr-2">✓</span>
                API access
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Informações do Cartão
            </label>
            <div className="p-3 border border-gray-700 rounded-lg bg-gray-800">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      '::placeholder': {
                        color: '#6b7280',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-neon-green text-black py-3 px-4 rounded-lg font-medium hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'A processar...' : `Pagar €${amount}`}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Pagamento seguro processado pela Stripe
          </p>
        </form>
      </div>
    </div>
  );
};

const Checkout: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
