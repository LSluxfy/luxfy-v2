
import React from 'react';
import ProfileCard from '@/components/ProfileCard';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard />
        </div>
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Luxfy</h2>
            <p className="text-gray-600">
              Este é seu painel de controle personalizado. Aqui você pode gerenciar suas configurações,
              visualizar estatísticas e muito mais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
