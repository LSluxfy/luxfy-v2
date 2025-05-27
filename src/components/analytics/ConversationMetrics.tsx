
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const conversationData = [
  { name: 'Jan', iniciadas: 320, finalizadas: 280, transferidas: 40 },
  { name: 'Fev', iniciadas: 420, finalizadas: 380, transferidas: 35 },
  { name: 'Mar', iniciadas: 380, finalizadas: 340, transferidas: 30 },
  { name: 'Abr', iniciadas: 520, finalizadas: 480, transferidas: 25 },
  { name: 'Mai', iniciadas: 480, finalizadas: 450, transferidas: 20 },
  { name: 'Jun', iniciadas: 590, finalizadas: 560, transferidas: 18 },
];

const hourlyData = [
  { hour: '00h', conversas: 5 },
  { hour: '06h', conversas: 15 },
  { hour: '09h', conversas: 45 },
  { hour: '12h', conversas: 65 },
  { hour: '15h', conversas: 55 },
  { hour: '18h', conversas: 40 },
  { hour: '21h', conversas: 25 },
];

const statusData = [
  { name: 'Resolvidas pela IA', value: 75, color: '#10B981' },
  { name: 'Transferidas', value: 15, color: '#F59E0B' },
  { name: 'Pendentes', value: 10, color: '#EF4444' },
];

const chartConfig = {
  iniciadas: { label: 'Iniciadas', color: '#1EAEDB' },
  finalizadas: { label: 'Finalizadas', color: '#10B981' },
  transferidas: { label: 'Transferidas', color: '#F59E0B' },
};

const ConversationMetrics = () => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversas por Mês</CardTitle>
            <CardDescription>Evolução das conversas ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={conversationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="iniciadas" stackId="1" stroke="#1EAEDB" fill="#1EAEDB" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="finalizadas" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="transferidas" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status das Conversas</CardTitle>
            <CardDescription>Distribuição do status atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversas por Horário</CardTitle>
          <CardDescription>Distribuição das conversas ao longo do dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversas" fill="#1EAEDB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationMetrics;
