import React from 'react'

const App: React.FC = () => {
  const currentPath = window.location.pathname

  const getMascot = (path: string) => {
    switch (path) {
      case '/':
        return { name: 'Laya', role: 'onboarding', emoji: '🌟' }
      case '/dashboard':
        return { name: 'Irina', role: 'analysis', emoji: '📊' }
      case '/login':
        return { name: 'Boris', role: 'security', emoji: '🔒' }
      default:
        return { name: 'Laya', role: 'onboarding', emoji: '🌟' }
    }
  }

  const mascot = getMascot(currentPath)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">CRSET Solutions</h1>
          <p className="text-xl opacity-80">Stress Test - Mascotes Ativas</p>
        </header>

        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
          <div className="text-6xl mb-4">{mascot.emoji}</div>
          <h2 className="text-2xl font-bold mb-2">{mascot.name}</h2>
          <p className="text-lg opacity-80 mb-4">Função: {mascot.role}</p>
          <p className="text-sm opacity-60">Rota atual: {currentPath}</p>
          
          <div className="mt-6 space-y-2">
            <a href="/" className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
              Home (Laya)
            </a>
            <a href="/dashboard" className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors">
              Dashboard (Irina)
            </a>
            <a href="/login" className="block bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
              Login (Boris)
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm opacity-60">
            ✅ Stress Test - Etapa 3: Ativação das Mascotes
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

