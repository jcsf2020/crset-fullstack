import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const publicNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Serviços', href: '/#services' },
    { name: 'Sobre', href: '/#about' },
    { name: 'Contacto', href: '/#contact' },
  ];

  const authenticatedNavLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Upgrade', href: '/checkout' },
  ];

  const navLinks = user ? authenticatedNavLinks : publicNavLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-neon-green">CRSET</span>
            <span className="text-xl font-light text-white ml-2">Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-300 hover:text-neon-green transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-gray-300">
                  <User size={18} />
                  <span className="text-sm">{user.full_name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-neon-green transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-neon-green text-black px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors"
                >
                  Registar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-neon-green transition-colors font-medium px-4"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-300 px-4 py-2 border-t border-gray-800">
                    <User size={18} />
                    <span className="text-sm">{user.full_name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors px-4"
                  >
                    <LogOut size={18} />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-800">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-neon-green transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-neon-green text-black px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Registar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
