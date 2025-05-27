
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const responseTimeData = [
  { hour: '00h', avgTime: 0.8, queries: 12 },
  { hour: '03h', avgTime: 0.7, queries: 8 },
  { hour: '06h', avgTime: 0.9, queries: 25 },
  { hour: '09h', avgTime: 1.2, queries: 85 },
  { hour: '12h', avgTime: 1.5, queries: 120 },
  { hour: '15h', avgTime: 1.3, queries: 95 },
  { hour: '18h', avgTime: 1.1, queries: 70 },
  { hour: '21h', avgTime: 0.9, queries: 45 },
];

const responseDistribution = [
  { range: '< 0.5s', count: 145, percentage: 35 },
  { range: '0.5-1s', count: 120, percentage: 29 },
  { range: '1-2s', count: 95, percentage: 23 },
  { range: '2-3s', count: 35, percentage: 8 },
  { range: '> 3s', count: 20, percentage: 5 },
];

const chartConfig = {
  avgTime: { label: 'Tempo Médio (s)', color: '#1EAEDB' },
  queries: { label: 'Consultas', color: '#10B981' },
};

const ResponseTimeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Tempo de Resposta</CardTitle>
        <CardDescription>Performance da IA ao longo do dia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mb-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimeData}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<ChartTooltipContent />} />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#1EAEDB" 
                  fillOpacity={1} 
                  fill="url(#colorTime)"
                  name="Tempo Médio (s)"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="queries" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                  name="Consultas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Distribuição dos Tempos de Resposta</h4>
          {responseDistribution.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-sm font-medium">{item.range}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.count} respostas</span>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1.1s</div>
            <div className="text-sm text-gray-600">Tempo Médio Atual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">64%</div>
            <div className="text-sm text-gray-600">Respostas < 1s</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseTimeChart;
