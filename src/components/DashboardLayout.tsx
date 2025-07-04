
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './ui/button';
import { LogOut, User, Moon, Sun } from 'lucide-react';

const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <DashboardSidebar />
      <div className="flex-1">
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="dark:text-white"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-luxfy-blue/20 flex items-center justify-center">
                <User className="h-4 w-4 text-luxfy-blue" />
              </div>
              <span className="text-sm font-medium dark:text-white">{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="flex items-center gap-1 dark:text-white dark:border-gray-600">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>
        <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} min-h-screen`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
