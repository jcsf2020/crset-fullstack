import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'
import AIChat from '../components/AIChat'

const HomePage: React.FC = () => {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            CRSET Solutions
          </div>
          <div className="space-x-6">
            <Link to="/dashboard" className="text-white hover:text-blue-300 transition-colors">
              Dashboard
            </Link>
            <Link to="/payment" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Começar
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Automação Inteligente
            <span className="block text-blue-400">para o Seu Negócio</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transforme a sua empresa com soluções de IA, automação de processos e 
            integração de sistemas. A CRSET Solutions oferece tecnologia de ponta 
            para impulsionar o seu crescimento.
          </p>
          <div className="space-x-4">
            <Link 
              to="/payment" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              Começar Agora
            </Link>
            <button 
              onClick={() => setShowChat(true)}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Falar com IA
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-4">IA Avançada</h3>
            <p className="text-gray-300">
              Integração com OpenAI GPT-4 para automação inteligente e análise preditiva.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-white mb-4">Pagamentos Seguros</h3>
            <p className="text-gray-300">
              Sistema de pagamentos integrado com Stripe para transações seguras.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-white mb-4">WhatsApp Business</h3>
            <p className="text-gray-300">
              Comunicação automatizada via WhatsApp para melhor atendimento ao cliente.
            </p>
          </div>
        </div>

        {/* Lead Form Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Interessado? Vamos Conversar!
          </h2>
          <LeadForm />
        </div>
      </main>

      {/* AI Chat Modal */}
      {showChat && <AIChat onClose={() => setShowChat(false)} />}

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-400">
        <p>&copy; 2025 CRSET Solutions. Todos os direitos reservados.</p>
        <p className="mt-2">WhatsApp: +351 914 423 688</p>
      </footer>
    </div>
  )
}

export default HomePage

