
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareText, Users, CheckCircle, TrendingUp, Clock, Bot, Target, Zap } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
}

const MetricCard = ({ title, value, description, icon, trend, trendLabel }: MetricCardProps) => {
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
            <span>{trend > 0 ? '+' : ''}{trend}% {trendLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OverviewMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total de Conversas"
        value="1,234"
        description="Este mês"
        icon={<MessageSquareText size={18} />}
        trend={12.5}
        trendLabel="vs mês anterior"
      />
      <MetricCard
        title="Clientes Atendidos"
        value="856"
        description="Este mês"
        icon={<Users size={18} />}
        trend={8.2}
        trendLabel="vs mês anterior"
      />
      <MetricCard
        title="Taxa de Conversão"
        value="68.4%"
        description="Conversas → Clientes"
        icon={<Target size={18} />}
        trend={5.1}
        trendLabel="vs mês anterior"
      />
      <MetricCard
        title="Tempo Médio de Resposta"
        value="1.2s"
        description="Resposta da IA"
        icon={<Zap size={18} />}
        trend={-15.3}
        trendLabel="melhoria"
      />
      <MetricCard
        title="Conversas Finalizadas"
        value="967"
        description="Este mês"
        icon={<CheckCircle size={18} />}
        trend={-2.1}
        trendLabel="vs mês anterior"
      />
      <MetricCard
        title="Agentes Ativos"
        value="3"
        description="IA funcionando"
        icon={<Bot size={18} />}
      />
      <MetricCard
        title="Uptime da IA"
        value="99.8%"
        description="Disponibilidade"
        icon={<Clock size={18} />}
        trend={0.2}
        trendLabel="vs mês anterior"
      />
      <MetricCard
        title="Satisfação"
        value="4.8/5"
        description="Avaliação média"
        icon={<TrendingUp size={18} />}
        trend={3.2}
        trendLabel="vs mês anterior"
      />
    </div>
  );
};

export default OverviewMetrics;
