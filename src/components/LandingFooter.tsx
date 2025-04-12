
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const LandingFooter = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-luxfy-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-luxfy-purple flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="text-2xl font-bold text-white">Luxfy</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Automação de atendimento com inteligência artificial, CRM visual e campanhas inteligentes para alavancar seus negócios.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com" className="text-gray-300 hover:text-luxfy-purple transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-luxfy-purple transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-luxfy-purple transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-luxfy-purple transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><Link to="/#features" className="text-gray-300 hover:text-luxfy-purple transition-colors">Recursos</Link></li>
              <li><Link to="/#pricing" className="text-gray-300 hover:text-luxfy-purple transition-colors">Planos</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Demo</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Sobre nós</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Carreiras</Link></li>
              <li><Link to="/#contact" className="text-gray-300 hover:text-luxfy-purple transition-colors">Contato</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Termos de Serviço</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Cookies</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-luxfy-purple transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {year} Luxfy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
