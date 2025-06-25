
import React, { useState } from 'react';
import { useAgents } from '@/hooks/use-agent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, UserPlus, Trash2 } from 'lucide-react';
import { Agent } from '@/types/agent';
import { NavLink, useNavigate } from 'react-router-dom';

const AgentsPage = () => {
  const { agents, userPlan, loading, createAgent, deleteAgent, chatWithAgent, canCreateAgent } = useAgents();
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentDescription, setNewAgentDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    if (newAgentName.trim()) {
      await createAgent(newAgentName.trim(), newAgentDescription.trim());
      setNewAgentName('');
      setNewAgentDescription('');
      setOpenDialog(false);
    }
    
    setIsCreating(false);
  };

  const handleDeleteAgent = async (agent: Agent) => {
    if (window.confirm(`Tem certeza que deseja excluir o agente ${agent.name}?`)) {
      await deleteAgent(agent.id);
    }
  };
  
  const handleConfigureAgent = (agent: Agent) => {
    setSelectedAgentId(agent.id);   // guarda o id do agente selecionado
    navigate(`/dashboard/agent?id=${agent.id}`);            // redireciona para a página de agents
  };


  if (loading) {
    return <div className="py-10 text-center">Carregando agentes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agentes de IA</h1>
          <p className="text-muted-foreground">
            {userPlan && (
              <>
                Plano atual: <span className="font-semibold capitalize">{userPlan.plan_type}</span> •
                {" "}Agentes: <span className="font-semibold">{agents.length}/{userPlan.max_agents}</span>
              </>
            )}
          </p>
        </div>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button disabled={!canCreateAgent} className="flex items-center gap-2">
              <UserPlus size={18} />
              <span>Novo Agente</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateAgent}>
              <DialogHeader>
                <DialogTitle>Criar Novo Agente</DialogTitle>
                <DialogDescription>
                  Crie um novo agente de IA para atender suas necessidades específicas.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome do Agente</Label>
                  <Input
                    id="name"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="Ex: Assistente de Vendas"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    value={newAgentDescription}
                    onChange={(e) => setNewAgentDescription(e.target.value)}
                    placeholder="Descreva a função deste agente..."
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isCreating || !newAgentName.trim()}>
                  {isCreating ? 'Criando...' : 'Criar Agente'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {agents.length === 0 ? (
        <Card className="border-dashed bg-background">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-2 py-8">
              <div className="rounded-full bg-luxfy-blue/20 p-3">
                <UserPlus className="h-8 w-8 text-luxfy-blue" />
              </div>
              <h3 className="text-xl font-semibold">Nenhum Agente Criado</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Crie seu primeiro agente de IA para começar a otimizar seu atendimento e aumentar suas conversões.
              </p>
              <Button 
                className="mt-2 flex items-center gap-1"
                onClick={() => setOpenDialog(true)}
                disabled={!canCreateAgent}
              >
                <Plus size={16} />
                <span>Criar Primeiro Agente</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden">
              <CardHeader className="bg-luxfy-blue/5 pb-2">
                <CardTitle className="flex justify-between items-start">
                  <span>{agent.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteAgent(agent)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {agent.description || "Sem descrição."}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleConfigureAgent(agent)}  // adiciona aqui
                >
                  Configurar Agente
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      )}
      
      {!canCreateAgent && agents.length > 0 && (
        <Card className="border-dashed bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Limite de agentes atingido</h3>
                <p className="text-sm text-muted-foreground">
                  Faça upgrade do seu plano para criar mais agentes de IA.
                </p>
              </div>
              <NavLink to='/dashboard/financeiro'>
                <Button variant="outline">Upgrade para Pro</Button>
              </NavLink>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentsPage;
