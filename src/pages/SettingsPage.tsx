
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountSettings from '@/components/settings/AccountSettings';
import AgentSettings from '@/components/settings/AgentSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';

const SettingsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Configurações" />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Configurações da Conta</h2>
          <p className="text-gray-600">Gerencie suas informações pessoais, agentes e configurações de segurança</p>
        </div>

        <Tabs defaultValue="account" className="w-full space-y-6">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentSettings />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SettingsPage;
