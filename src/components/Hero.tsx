import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="hero">
      {/* Background overlay */}
      <div className="hero-overlay"></div>
      
      {/* Grid pattern background */}
      <div className="hero-grid"></div>
      
      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Transformando Ideias em
          <br />
          <span className="hero-highlight">
            Soluções Digitais
            <span className="hero-underline"></span>
          </span>
          <br />
          <span className="neon-green">com IA</span>
        </h1>
        
        <p className="hero-subtitle">
          Criamos ferramentas de automação e inteligência artificial para otimizar processos, 
          aumentar eficiência e escalar o seu negócio no mundo digital.
        </p>
        
        <div className="hero-buttons">
          {user ? (
            <>
              <Link to="/dashboard" className="btn-primary">
                Ir para Dashboard
              </Link>
              
              <Link to="/checkout" className="btn-secondary">
                Fazer Upgrade
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-primary">
                Começar Agora
              </Link>
              
              <Link to="/login" className="btn-secondary">
                Já tenho conta
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
    </section>
  );
};

export default Hero;
