
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { date: '01/06', accuracy: 85, responseTime: 1.5, satisfaction: 4.2 },
  { date: '08/06', accuracy: 87, responseTime: 1.3, satisfaction: 4.3 },
  { date: '15/06', accuracy: 92, responseTime: 1.2, satisfaction: 4.5 },
  { date: '22/06', accuracy: 89, responseTime: 1.1, satisfaction: 4.4 },
  { date: '29/06', accuracy: 94, responseTime: 1.0, satisfaction: 4.6 },
  { date: '06/07', accuracy: 96, responseTime: 0.9, satisfaction: 4.8 },
];

const chartConfig = {
  accuracy: { label: 'Precisão (%)', color: '#10B981' },
  satisfaction: { label: 'Satisfação', color: '#8B5CF6' },
};

const PerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance do Agente IA</CardTitle>
        <CardDescription>Evolução da precisão e satisfação ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<ChartTooltipContent />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#10B981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#10B981" }}
                  name="Precisão (%)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="#8B5CF6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#8B5CF6" }}
                  name="Satisfação (0-5)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">96%</div>
            <div className="text-sm text-gray-600">Precisão Atual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">0.9s</div>
            <div className="text-sm text-gray-600">Tempo de Resposta</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4.8/5</div>
            <div className="text-sm text-gray-600">Satisfação</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
