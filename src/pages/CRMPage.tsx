
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Plus, MoreHorizontal, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  lastContact: string;
  status: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'closed' | 'lost';
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99988-7766',
    interest: 'Plano Pro',
    lastContact: '2 horas atrás',
    status: 'new'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@oliveira.com',
    phone: '(11) 98765-4321',
    interest: 'Plano Premium',
    lastContact: '5 horas atrás',
    status: 'new'
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    email: 'carlos@empresa.com',
    phone: '(21) 99876-5432',
    interest: 'Plano Starter',
    lastContact: '1 dia atrás',
    status: 'contacted'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(11) 97654-3210',
    interest: 'Plano Pro',
    lastContact: '2 dias atrás',
    status: 'contacted'
  },
  {
    id: '5',
    name: 'Roberto Alves',
    email: 'roberto@alves.com',
    phone: '(21) 98765-0987',
    interest: 'Plano Premium',
    lastContact: '1 semana atrás',
    status: 'qualified'
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    email: 'fernanda@lima.com',
    phone: '(11) 91234-5678',
    interest: 'Plano Pro',
    lastContact: '3 dias atrás',
    status: 'negotiation'
  },
  {
    id: '7',
    name: 'Ricardo Santos',
    email: 'ricardo@empresa.com',
    phone: '(11) 99876-5432',
    interest: 'Plano Premium',
    lastContact: '1 dia atrás',
    status: 'closed'
  },
  {
    id: '8',
    name: 'Patricia Melo',
    email: 'patricia@melo.com',
    phone: '(21) 99888-7777',
    interest: 'Plano Starter',
    lastContact: '4 dias atrás',
    status: 'lost'
  }
];

const statusLabels = {
  new: 'Novos',
  contacted: 'Contatados',
  qualified: 'Qualificados',
  negotiation: 'Em Negociação',
  closed: 'Fechados',
  lost: 'Perdidos'
};

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  qualified: 'bg-amber-100 text-amber-800',
  negotiation: 'bg-orange-100 text-orange-800',
  closed: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

const CRMPage = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtra os leads baseado no termo de busca
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupa os leads por status
  const groupedLeads = filteredLeads.reduce((acc, lead) => {
    acc[lead.status] = [...(acc[lead.status] || []), lead];
    return acc;
  }, {} as Record<string, Lead[]>);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="CRM Visual" />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">CRM Visual</h2>
            <p className="text-gray-600">Gerencie seus leads e oportunidades no formato Kanban</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar leads..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple">
              <Plus className="mr-2" size={16} /> Novo Lead
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto pb-6">
          <div className="flex gap-4" style={{ minWidth: '1200px' }}>
            {/* Colunas do Kanban */}
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="kanban-column">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusColors[status as keyof typeof statusLabels].split(' ')[0]}`}></span>
                    {label}
                    <span className="ml-2 text-sm text-gray-500">
                      ({groupedLeads[status]?.length || 0})
                    </span>
                  </h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus size={16} />
                  </Button>
                </div>
                
                <div>
                  {groupedLeads[status]?.map(lead => (
                    <div key={lead.id} className="kanban-card">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{lead.name}</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {lead.email}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        {lead.phone}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                          {lead.interest}
                        </span>
                        <div className="flex items-center gap-1">
                          <MessageSquare size={14} className="text-luxfy-purple" />
                          <span className="text-xs text-gray-500">{lead.lastContact}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {(!groupedLeads[status] || groupedLeads[status].length === 0) && (
                    <div className="text-center py-8 text-sm text-gray-500">
                      Nenhum lead nesta coluna
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CRMPage;
