
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const tagData = [
  { tag: 'premium', count: 45, conversions: 38, conversionRate: 84.4, color: '#10B981' },
  { tag: 'interessado', count: 67, conversions: 23, conversionRate: 34.3, color: '#1EAEDB' },
  { tag: 'suporte', count: 23, conversions: 2, conversionRate: 8.7, color: '#F59E0B' },
  { tag: 'prospect', count: 89, conversions: 31, conversionRate: 34.8, color: '#8B5CF6' },
  { tag: 'cliente', count: 34, conversions: 34, conversionRate: 100, color: '#10B981' },
  { tag: 'reclamação', count: 12, conversions: 0, conversionRate: 0, color: '#EF4444' },
];

const tagTrendData = [
  { month: 'Jan', premium: 35, interessado: 42, suporte: 18, prospect: 65 },
  { month: 'Fev', premium: 38, interessado: 48, suporte: 22, prospect: 71 },
  { month: 'Mar', premium: 42, interessado: 55, suporte: 19, prospect: 78 },
  { month: 'Abr', premium: 40, interessado: 61, suporte: 25, prospect: 82 },
  { month: 'Mai', premium: 43, interessado: 58, suporte: 21, prospect: 85 },
  { month: 'Jun', premium: 45, interessado: 67, suporte: 23, prospect: 89 },
];

const topTagsData = tagData
  .sort((a, b) => b.count - a.count)
  .slice(0, 5)
  .map(tag => ({ name: tag.tag, value: tag.count, color: tag.color }));

const TagAnalytics = () => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Tags</CardTitle>
            <CardDescription>Clientes categorizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {tagData.reduce((sum, tag) => sum + tag.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Distribuídos em {tagData.length} categorias</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tag Mais Convertida</CardTitle>
            <CardDescription>Maior taxa de conversão</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                cliente
              </Badge>
              <span className="text-xl font-bold text-green-600">100%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">34 conversões de 34 clientes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tag Mais Ativa</CardTitle>
            <CardDescription>Maior volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                prospect
              </Badge>
              <span className="text-xl font-bold text-purple-600">89</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">clientes com esta tag</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Tags</CardTitle>
            <CardDescription>Volume de clientes por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topTagsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {topTagsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {topTagsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <Badge variant="outline">{item.name}</Badge>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução das Tags</CardTitle>
            <CardDescription>Crescimento por categoria ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tagTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="prospect" stackId="a" fill="#8B5CF6" />
                  <Bar dataKey="interessado" stackId="a" fill="#1EAEDB" />
                  <Bar dataKey="premium" stackId="a" fill="#10B981" />
                  <Bar dataKey="suporte" stackId="a" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance por Tag</CardTitle>
          <CardDescription>Análise detalhada de conversão por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tagData.map((tag, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" style={{ borderColor: tag.color, color: tag.color }}>
                      {tag.tag}
                    </Badge>
                    <span className="text-sm text-gray-600">{tag.count} clientes</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: tag.color }}>
                      {tag.conversionRate}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {tag.conversions}/{tag.count} conversões
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${tag.conversionRate}%`,
                      backgroundColor: tag.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TagAnalytics;
