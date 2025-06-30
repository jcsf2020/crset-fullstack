
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Mascot from './Mascot';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await register(email, password, fullName);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Erro ao criar conta. Tente novamente.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center">
            <span className="text-3xl font-bold text-neon-green">CRSET</span>
            <span className="text-3xl font-light text-white ml-2">Solutions</span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-white">
            Criar nova conta
          </h2>
          <p className="mt-2 text-gray-400">
            Bem-vindo! Laya vai guiá-lo no seu onboarding.
          </p>
        </div>

        {/* Mascot */}
        <div className="flex justify-center">
          <Mascot type="laya" size="medium" />
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Nome completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent"
                placeholder="Nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent"
                placeholder="Endereço de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent"
                placeholder="Palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-neon-green hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'A criar conta...' : 'Criar conta'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Já tem conta?{' '}
              <Link to="/login" className="text-neon-green hover:text-white transition-colors">
                Fazer login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
