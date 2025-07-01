import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api'

interface DashboardStats {
  totalLeads: number
  activeProjects: number
  revenue: number
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    activeProjects: 0,
    revenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setStats({
        totalLeads: 47,
        activeProjects: 12,
        revenue: 2340
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Dashboard CRSET</h1>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-white hover:text-blue-300 transition-colors"
          >
            ← Voltar ao Início
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <main className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total de Leads</p>
                <p className="text-3xl font-bold text-white">{stats.totalLeads}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Projetos Ativos</p>
                <p className="text-3xl font-bold text-white">{stats.activeProjects}</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Receita (€)</p>
                <p className="text-3xl font-bold text-white">€{stats.revenue.toLocaleString()}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">Relatórios</div>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">➕</div>
              <div className="font-semibold">Novo Projeto</div>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold">AGI Commander</div>
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold">Configurações</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Atividade Recente</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white">Nova lead recebida via formulário</span>
              </div>
              <span className="text-gray-400 text-sm">há 2 horas</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white">Pagamento processado com sucesso</span>
              </div>
              <span className="text-gray-400 text-sm">há 4 horas</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white">Automação IA executada</span>
              </div>
              <span className="text-gray-400 text-sm">há 6 horas</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage

