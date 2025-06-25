
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareText, Users, CheckCircle, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: number;
}

const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-luxfy-blue/10 flex items-center justify-center text-luxfy-blue">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== undefined && (
          <div className={`flex items-center text-xs mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp size={14} className="mr-1" />
            <span>{trend}% em relação à semana anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Conversas Iniciadas"
        value="99"
        description="Total da semana atual"
        icon={<MessageSquareText size={18} />}
        trend={99}
      />
      <StatsCard
        title="Clientes Atendidos"
        value="99"
        description="Total da semana atual"
        icon={<Users size={18} />}
        trend={99}
      />
      <StatsCard
        title="Conversas Finalizadas"
        value="99"
        description="Total da semana atual"
        icon={<CheckCircle size={18} />}
        trend={-99}
      />
      <StatsCard
        title="Taxa de Conversão"
        value="99%"
        description="Média da semana atual"
        icon={<TrendingUp size={18} />}
        trend={99}
      />
    </div>
  );
};

export default StatsCards;
