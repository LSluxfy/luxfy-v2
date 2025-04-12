
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-luxfy-purple flex items-center justify-center text-white font-bold text-xl">L</div>
            <span className="text-2xl font-bold text-luxfy-dark">Luxfy</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors">Início</Link>
            <Link to="/#features" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors">Recursos</Link>
            <Link to="/#pricing" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors">Planos</Link>
            <Link to="/#contact" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors">Contato</Link>
            <div className="flex gap-3 ml-4">
              <Link to="/login">
                <Button variant="outline" className="font-medium">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple font-medium">Registrar</Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-luxfy-dark" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors py-2">Início</Link>
              <Link to="/#features" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors py-2">Recursos</Link>
              <Link to="/#pricing" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors py-2">Planos</Link>
              <Link to="/#contact" className="text-luxfy-dark hover:text-luxfy-purple font-medium transition-colors py-2">Contato</Link>
              <div className="flex gap-3 mt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="font-medium w-full">Entrar</Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple font-medium w-full">Registrar</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;
