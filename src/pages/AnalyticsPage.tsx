
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewMetrics from '@/components/analytics/OverviewMetrics';
import ConversationMetrics from '@/components/analytics/ConversationMetrics';
import ClientMetrics from '@/components/analytics/ClientMetrics';
import TagAnalytics from '@/components/analytics/TagAnalytics';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import ResponseTimeChart from '@/components/analytics/ResponseTimeChart';

const AnalyticsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Análises e Métricas" />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard de Análises</h2>
          <p className="text-gray-600">Acompanhe o desempenho dos seus agentes de IA e métricas de atendimento</p>
        </div>

        <Tabs defaultValue="overview" className="w-full space-y-6">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="conversations">Conversas</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart />
              <ResponseTimeChart />
            </div>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-6">
            <ConversationMetrics />
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <ClientMetrics />
          </TabsContent>

          <TabsContent value="tags" className="space-y-6">
            <TagAnalytics />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <PerformanceChart />
              <ResponseTimeChart />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AnalyticsPage;
