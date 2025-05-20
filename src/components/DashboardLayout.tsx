
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';

const DashboardLayout = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-luxfy-blue/20 flex items-center justify-center">
                <User className="h-4 w-4 text-luxfy-blue" />
              </div>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
