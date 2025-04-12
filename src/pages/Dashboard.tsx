
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText, User, Calendar, Clock, ArrowUp, ArrowDown } from 'lucide-react';

// Dados de exemplo para os gráficos
const leadData = [
  { day: 'Seg', leads: 12 },
  { day: 'Ter', leads: 18 },
  { day: 'Qua', leads: 15 },
  { day: 'Qui', leads: 25 },
  { day: 'Sex', leads: 22 },
  { day: 'Sab', leads: 10 },
  { day: 'Dom', leads: 8 },
];

const messagesData = [
  { day: 'Seg', total: 40, ai: 32 },
  { day: 'Ter', total: 45, ai: 38 },
  { day: 'Qua', total: 50, ai: 40 },
  { day: 'Qui', total: 60, ai: 48 },
  { day: 'Sex', total: 65, ai: 52 },
  { day: 'Sab', total: 30, ai: 24 },
  { day: 'Dom', total: 25, ai: 20 },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Dashboard" />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Bem-vindo, Usuário!</h2>
          <p className="text-gray-600">Veja um resumo do seu desempenho recente</p>
        </div>
        
        {/* Cards estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">246</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center gap-1 inline-block">
                  <ArrowUp className="h-3 w-3" /> 12%
                </span>{' '}
                em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Respondidas</CardTitle>
              <MessageSquareText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">893</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center gap-1 inline-block">
                  <ArrowUp className="h-3 w-3" /> 18%
                </span>{' '}
                em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reuniões Agendadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center gap-1 inline-block">
                  <ArrowDown className="h-3 w-3" /> 5%
                </span>{' '}
                em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center gap-1 inline-block">
                  <ArrowUp className="h-3 w-3" /> 32%
                </span>{' '}
                mais rápido que o mês passado
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Gráficos principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Novos Leads</CardTitle>
              <CardDescription>Leads capturados nos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leadData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Mensagens Respondidas</CardTitle>
              <CardDescription>Total vs. Respondidas por IA</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={messagesData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="ai" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Campanhas ativas e atividade recente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Campanhas Ativas</CardTitle>
              <CardDescription>Status das suas campanhas atuais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Promoção de Verão</p>
                    <p className="text-sm text-gray-500">Email • 2.430 enviados</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">52%</p>
                    <p className="text-sm text-gray-500">Taxa de abertura</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '52%' }}></div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="font-medium">Lançamento de Produto</p>
                    <p className="text-sm text-gray-500">WhatsApp • 985 enviados</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-600">35%</p>
                    <p className="text-sm text-gray-500">Taxa de resposta</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="font-medium">Recuperação de Clientes</p>
                    <p className="text-sm text-gray-500">Email • 658 enviados</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">28%</p>
                    <p className="text-sm text-gray-500">Taxa de abertura</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas interações na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-luxfy-purple/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-luxfy-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Novo Lead Capturado</p>
                    <p className="text-sm text-gray-600">João Silva preencheu o formulário de contato</p>
                    <p className="text-xs text-gray-400 mt-1">Há 12 minutos</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-luxfy-purple/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquareText className="h-5 w-5 text-luxfy-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Mensagem Respondida</p>
                    <p className="text-sm text-gray-600">A IA respondeu a consulta de Maria Oliveira</p>
                    <p className="text-xs text-gray-400 mt-1">Há 27 minutos</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-luxfy-purple/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-luxfy-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Reunião Agendada</p>
                    <p className="text-sm text-gray-600">Carlos Mendes agendou uma reunião para amanhã às 15h</p>
                    <p className="text-xs text-gray-400 mt-1">Há 45 minutos</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-luxfy-purple/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-luxfy-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Lead Movido</p>
                    <p className="text-sm text-gray-600">Ana Costa foi movida para "Em Negociação"</p>
                    <p className="text-xs text-gray-400 mt-1">Há 1 hora</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
