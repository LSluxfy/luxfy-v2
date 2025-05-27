
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, ArrowUpRight, Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FinanceiroPage = () => {
  const [currentPlan] = useState({
    name: 'Plano Básico',
    price: 'R$ 97,00',
    period: 'mensal',
    features: ['1 Agente', 'Suporte por Email', 'Dashboard Básico']
  });

  const [invoices] = useState([
    { id: 1, date: '2024-01-15', amount: 'R$ 97,00', status: 'Pago', plan: 'Básico' },
    { id: 2, date: '2023-12-15', amount: 'R$ 97,00', status: 'Pago', plan: 'Básico' },
    { id: 3, date: '2023-11-15', amount: 'R$ 97,00', status: 'Pago', plan: 'Básico' },
    { id: 4, date: '2024-02-15', amount: 'R$ 197,00', status: 'Pendente', plan: 'Pro' },
  ]);

  const [availablePlans] = useState([
    {
      name: 'Básico',
      price: 'R$ 97',
      period: '/mês',
      current: true,
      features: ['1 Agente', 'Suporte por Email', 'Dashboard Básico', '1.000 mensagens/mês']
    },
    {
      name: 'Pro',
      price: 'R$ 197',
      period: '/mês',
      current: false,
      popular: true,
      features: ['5 Agentes', 'Suporte Prioritário', 'Analytics Avançado', '10.000 mensagens/mês', 'WhatsApp API']
    },
    {
      name: 'Premium',
      price: 'R$ 497',
      period: '/mês',
      current: false,
      features: ['Agentes Ilimitados', 'Suporte 24/7', 'White Label', 'Mensagens Ilimitadas', 'Integração Completa']
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pendente':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Vencido':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Financeiro" />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Gerenciamento Financeiro</h2>
          <p className="text-gray-600">Gerencie seu plano, faturas e faça upgrades</p>
        </div>

        <Tabs defaultValue="plan" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="plan">Plano Atual</TabsTrigger>
            <TabsTrigger value="upgrade">Fazer Upgrade</TabsTrigger>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Plano Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                        <p className="text-gray-600">Renovação automática ativa</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-luxfy-purple">{currentPlan.price}</div>
                        <div className="text-sm text-gray-500">por mês</div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Recursos Inclusos:</h4>
                      <ul className="space-y-1">
                        {currentPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Cancelar Plano</Button>
                      <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Fazer Upgrade
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próxima Cobrança</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">15 dias</div>
                      <div className="text-sm text-gray-500">para renovação</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Data:</span>
                        <span>15/02/2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valor:</span>
                        <span className="font-medium">R$ 97,00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Método:</span>
                        <span>Cartão •••• 1234</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Alterar Método
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upgrade" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.current ? 'border-luxfy-purple' : ''} ${plan.popular ? 'border-2 border-yellow-400' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900">
                      Mais Popular
                    </Badge>
                  )}
                  {plan.current && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-luxfy-purple">
                      Plano Atual
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-500">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.current ? 'bg-gray-400' : 'bg-luxfy-purple hover:bg-luxfy-darkPurple'}`}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Plano Atual' : 'Fazer Upgrade'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Faturas</CardTitle>
                <CardDescription>Visualize e baixe suas faturas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(invoice.status)}
                        <div>
                          <div className="font-medium">Fatura #{invoice.id}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(invoice.date).toLocaleDateString('pt-BR')} • {invoice.plan}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                        <div className="font-medium">{invoice.amount}</div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinanceiroPage;
