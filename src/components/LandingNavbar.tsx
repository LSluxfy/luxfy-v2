
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Luxfy
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">{t('nav.home')}</Link>
            <Link to="/#features" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">{t('nav.features')}</Link>
            <Link to="/#pricing" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">{t('nav.pricing')}</Link>
            <Link to="/#contact" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">{t('nav.contact')}</Link>
            <LanguageSelector />
            <div className="flex gap-3 ml-4">
              <Link to="/login">
                <Button variant="outline" className="font-medium border-gray-700 text-gray-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium shadow-lg shadow-blue-500/25">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in border-t border-gray-800 mt-3">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-gray-300 hover:text-blue-400 font-medium transition-colors py-2">{t('nav.home')}</Link>
              <Link to="/#features" className="text-gray-300 hover:text-blue-400 font-medium transition-colors py-2">{t('nav.features')}</Link>
              <Link to="/#pricing" className="text-gray-300 hover:text-blue-400 font-medium transition-colors py-2">{t('nav.pricing')}</Link>
              <Link to="/#contact" className="text-gray-300 hover:text-blue-400 font-medium transition-colors py-2">{t('nav.contact')}</Link>
              <div className="py-2">
                <LanguageSelector />
              </div>
              <div className="flex gap-3 mt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="font-medium w-full border-gray-700 text-gray-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium w-full shadow-lg shadow-blue-500/25">
                    {t('nav.register')}
                  </Button>
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
