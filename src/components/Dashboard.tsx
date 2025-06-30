
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Mascot from './Mascot';

interface DashboardStats {
  user_since: string;
  payment_count: number;
  total_spent: number;
  last_login: string;
}

const Dashboard: React.FC = () => {
  const { user, logout, token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (token) {
          const data = await api.get('/dashboard/stats', token);
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-neon-green">CRSET</span>
              <span className="text-xl font-light text-white ml-2">Solutions</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Olá, {user?.full_name}</span>
              <Link
                to="/checkout"
                className="bg-neon-green text-black px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors"
              >
                Upgrade
              </Link>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-400">
                Bem-vindo ao seu painel de controlo. Irina está aqui para mostrar os seus dados.
              </p>
            </div>
            <Mascot type="irina" size="large" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* User Info Card */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Informações do Utilizador</h3>
              <div className="space-y-2">
                <p className="text-white font-medium">{user?.full_name}</p>
                <p className="text-gray-300 text-sm">{user?.email}</p>
                <p className="text-gray-400 text-xs">
                  Membro desde {stats ? formatDate(stats.user_since) : 'N/A'}
                </p>
              </div>
            </div>

            {/* Payment Count */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Pagamentos</h3>
              <p className="text-3xl font-bold text-neon-green">{stats?.payment_count || 0}</p>
              <p className="text-gray-400 text-sm">Total de transações</p>
            </div>

            {/* Total Spent */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Total Gasto</h3>
              <p className="text-3xl font-bold text-neon-green">€{stats?.total_spent?.toFixed(2) || '0.00'}</p>
              <p className="text-gray-400 text-sm">Em todos os serviços</p>
            </div>

            {/* Account Status */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Estado da Conta</h3>
              <p className="text-3xl font-bold text-green-500">Ativa</p>
              <p className="text-gray-400 text-sm">Últimas atividade hoje</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/checkout"
              className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-neon-green rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">€</span>
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">Fazer Upgrade</p>
                <p className="text-gray-400 text-sm">Aceder a mais funcionalidades</p>
              </div>
            </Link>

            <div className="flex items-center p-4 bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">📈</span>
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">Relatórios</p>
                <p className="text-gray-400 text-sm">Ver análises detalhadas</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚙️</span>
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">Configurações</p>
                <p className="text-gray-400 text-sm">Personalizar conta</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
