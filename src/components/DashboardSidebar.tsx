
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Users, 
  Calendar, 
  Megaphone, 
  BarChart3, 
  UserPlus, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink = ({ to, icon, label, isActive, isCollapsed }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-luxfy-purple text-white" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <div className="text-lg">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 sticky top-0 flex flex-col",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-3 border-b border-gray-200",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-luxfy-purple flex items-center justify-center text-white font-bold text-xl">L</div>
            <span className="text-xl font-bold">Luxfy</span>
          </Link>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-md bg-luxfy-purple flex items-center justify-center text-white font-bold text-xl">L</div>
        )}
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(true)}
            className="h-8 w-8"
          >
            <ChevronLeft size={18} />
          </Button>
        )}
      </div>

      {/* Toggle button when collapsed */}
      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(false)}
          className="h-8 w-8 mx-auto mt-2"
        >
          <ChevronRight size={18} />
        </Button>
      )}

      {/* Main Menu */}
      <div className="flex-1 p-3 space-y-1 overflow-y-auto">
        <SidebarLink 
          to="/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          isActive={isActive('/dashboard')}
          isCollapsed={collapsed}
        />
        <SidebarLink 
          to="/dashboard/agent" 
          icon={<MessageSquareText size={20} />} 
          label="Agente IA" 
          isActive={isActive('/dashboard/agent')}
          isCollapsed={collapsed}
        />
        <SidebarLink 
          to="/dashboard/crm" 
          icon={<Users size={20} />} 
          label="CRM Visual" 
          isActive={isActive('/dashboard/crm')}
          isCollapsed={collapsed}
        />
        <SidebarLink 
          to="/dashboard/calendar" 
          icon={<Calendar size={20} />} 
          label="Agenda" 
          isActive={isActive('/dashboard/calendar')}
          isCollapsed={collapsed}
        />
        <SidebarLink 
          to="/dashboard/campaigns" 
          icon={<Megaphone size={20} />} 
          label="Campanhas" 
          isActive={isActive('/dashboard/campaigns')}
          isCollapsed={collapsed}
        />
        <SidebarLink 
          to="/dashboard/metrics" 
          icon={<BarChart3 size={20} />} 
          label="Métricas" 
          isActive={isActive('/dashboard/metrics')}
          isCollapsed={collapsed}
        />
        <SidebarLink 
          to="/dashboard/team" 
          icon={<UserPlus size={20} />} 
          label="Equipe" 
          isActive={isActive('/dashboard/team')}
          isCollapsed={collapsed}
        />
        <SidebarLink 
          to="/dashboard/settings" 
          icon={<Settings size={20} />} 
          label="Configurações" 
          isActive={isActive('/dashboard/settings')}
          isCollapsed={collapsed}
        />
      </div>
      
      {/* Logout */}
      <div className="p-3 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-gray-600 hover:text-luxfy-purple hover:bg-gray-100",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-2">Sair</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
