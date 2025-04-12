import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, MessageSquareText, Users, Calendar, BarChart3, Bot, Shield } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Automatize seu atendimento com <span className="gradient-text">Inteligência Artificial</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                A plataforma completa para automação de atendimento com IA, CRM visual e campanhas de marketing que ajudam a escalar seus negócios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-luxfy-purple hover:bg-luxfy-darkPurple text-white font-semibold">
                    Começar Grátis <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="font-semibold">
                    Fazer Login
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">JD</div>
                  <div className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">AM</div>
                  <div className="h-8 w-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs">RL</div>
                </div>
                <span className="text-sm text-gray-600">+500 empresas usam a Luxfy</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 h-full w-full rounded-xl bg-luxfy-purple/20"></div>
                <div className="glassmorphism rounded-xl shadow-lg p-6 relative z-10 backdrop-blur-lg overflow-hidden">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Bot className="text-luxfy-purple" size={20} />
                    <span>Agente de IA</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-3 ml-auto max-w-[80%]">
                      <p className="text-sm">Olá! Gostaria de saber mais sobre os planos disponíveis.</p>
                    </div>
                    <div className="bg-luxfy-purple/10 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Olá! Claro, temos 3 planos: Starter, Pro e Premium. Qual funcionalidade específica você está buscando?</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 ml-auto max-w-[80%]">
                      <p className="text-sm">Quero automatizar o atendimento no WhatsApp para minha loja.</p>
                    </div>
                    <div className="bg-luxfy-purple/10 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Perfeito! Nosso plano Pro é ideal para isso. Oferece automação completa de WhatsApp com IA treinável e até 5 atendentes virtuais.</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 right-0 h-16 w-16 rounded-full bg-luxfy-darkPurple/20 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo o que você precisa em uma única plataforma
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A Luxfy reúne as principais ferramentas para automação, atendimento e vendas em uma interface simples e intuitiva.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card transition-all border-gray-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-luxfy-purple/10 flex items-center justify-center mb-4">
                  <MessageSquareText className="text-luxfy-purple" size={24} />
                </div>
                <CardTitle>Agente de IA Avançado</CardTitle>
                <CardDescription>Automatize seu atendimento com IA treinável que responde como você</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Treinamento personalizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Integração com WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Palavras-chave personalizáveis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="feature-card transition-all border-gray-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-luxfy-purple/10 flex items-center justify-center mb-4">
                  <Users className="text-luxfy-purple" size={24} />
                </div>
                <CardTitle>CRM Visual Estilo Kanban</CardTitle>
                <CardDescription>Gerencie seus leads com um CRM visual e intuitivo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Drag and drop entre estágios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Anotações por cliente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Resposta direta pelo CRM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="feature-card transition-all border-gray-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-luxfy-purple/10 flex items-center justify-center mb-4">
                  <Calendar className="text-luxfy-purple" size={24} />
                </div>
                <CardTitle>Agenda Inteligente</CardTitle>
                <CardDescription>Automatize agendamentos e envios de lembretes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Integração com Google Calendar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Lembretes automáticos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Disponibilidade personalizada</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="feature-card transition-all border-gray-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-luxfy-purple/10 flex items-center justify-center mb-4">
                  <BarChart3 className="text-luxfy-purple" size={24} />
                </div>
                <CardTitle>Métricas e Análises</CardTitle>
                <CardDescription>Monitore o desempenho com métricas detalhadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Dashboard interativo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Relatórios exportáveis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">KPIs de conversão</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="feature-card transition-all border-gray-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-luxfy-purple/10 flex items-center justify-center mb-4">
                  <Users className="text-luxfy-purple" size={24} />
                </div>
                <CardTitle>Gestão de Equipe</CardTitle>
                <CardDescription>Gerencie sua equipe com controle de acesso</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Múltiplos usuários</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Permissões personalizáveis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Histórico de atividades</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="feature-card transition-all border-gray-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-luxfy-purple/10 flex items-center justify-center mb-4">
                  <Shield className="text-luxfy-purple" size={24} />
                </div>
                <CardTitle>Segurança e Privacidade</CardTitle>
                <CardDescription>Seus dados protegidos com criptografia</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Proteção de dados LGPD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Backups automáticos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm">Autenticação segura</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos para cada estágio do seu negócio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades e comece a automatizar hoje mesmo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border-gray-200 relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Starter</span>
                  <span className="text-lg font-normal text-luxfy-purple">R$97/mês</span>
                </CardTitle>
                <CardDescription>Para profissionais autônomos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">1 agente de IA treinável</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">CRM visual (até 100 leads)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Agenda básica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Campanhas limitadas (500 mensagens/mês)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">1 usuário</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Começar Grátis
                </Button>
              </CardFooter>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-luxfy-purple relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-luxfy-purple text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                MAIS POPULAR
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Pro</span>
                  <span className="text-lg font-normal text-luxfy-purple">R$197/mês</span>
                </CardTitle>
                <CardDescription>Para pequenas empresas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">3 agentes de IA treináveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">CRM visual (até 1.000 leads)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Agenda completa com integrações</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Campanhas ilimitadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Até 5 usuários</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  Começar Grátis
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className="border-gray-200 relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Premium</span>
                  <span className="text-lg font-normal text-luxfy-purple">R$497/mês</span>
                </CardTitle>
                <CardDescription>Para empresas em crescimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">10 agentes de IA treináveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">CRM visual (leads ilimitados)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Agenda premium com API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Campanhas ilimitadas com prioridade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Usuários ilimitados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">Suporte dedicado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm">White-label (futuro)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Falar com Vendas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Fale Conosco</h2>
              <p className="text-gray-600 mb-6">
                Tem alguma dúvida? Entre em contato conosco e nossa equipe terá o prazer de ajudar.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-luxfy-purple/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxfy-purple">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-gray-600">(11) 9999-9999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-luxfy-purple/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxfy-purple">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contato@luxfy.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-luxfy-purple/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxfy-purple">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-gray-600">Av. Paulista, 1000 - São Paulo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Envie-nos uma mensagem</CardTitle>
                  <CardDescription>Preencha o formulário abaixo e retornaremos em breve.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Nome</label>
                        <Input id="name" placeholder="Seu nome" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                      <Input id="subject" placeholder="Assunto da mensagem" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                      <Textarea 
                        id="message" 
                        rows={4} 
                        placeholder="Sua mensagem..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-luxfy-purple focus:border-transparent"
                      />
                    </div>
                    <Button className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all z-50 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
      
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
