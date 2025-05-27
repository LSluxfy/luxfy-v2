
import React from 'react';
import ProfileCard from '@/components/ProfileCard';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import StatsCards from '@/components/dashboard/StatsCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share, Users, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
          <Share className="mr-2 h-4 w-4" />
          Programa de Afiliados
        </Button>
      </div>
      
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <DollarSign className="h-5 w-5" />
            Programa de Afiliados Luxfy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">30%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Comissão Recorrente</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ 0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Ganhos Este Mês</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Indicações</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button className="bg-green-500 hover:bg-green-600">
              <Users className="mr-2 h-4 w-4" />
              Começar a Indicar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard />
        </div>
        <div className="md:col-span-2">
          <DashboardMetrics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
