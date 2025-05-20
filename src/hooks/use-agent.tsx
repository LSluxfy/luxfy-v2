
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Agent, UserPlan } from '@/types/agent';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch user's agents
  const fetchAgents = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data: agents, error } = await supabase
        .from('ai_agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setAgents(agents as Agent[]);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar agentes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's plan
  const fetchUserPlan = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_plans')
        .select('*')
        .single();

      if (error) {
        // If no plan exists, create a default one
        if (error.code === 'PGRST116') {
          const { data: newPlan, error: createError } = await supabase
            .from('user_plans')
            .insert({ 
              user_id: user.id,
              plan_type: 'básico',
              max_agents: 1
            })
            .select()
            .single();

          if (createError) throw createError;
          setUserPlan(newPlan as UserPlan);
          return;
        }
        throw error;
      }
      
      setUserPlan(data as UserPlan);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar plano",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Create a new agent
  const createAgent = async (name: string, description: string = '') => {
    if (!user || !userPlan) return null;
    
    // Check if user has reached their agent limit
    if (agents.length >= userPlan.max_agents) {
      toast({
        title: "Limite de agentes atingido",
        description: `Seu plano ${userPlan.plan_type} permite apenas ${userPlan.max_agents} agente(s). Faça upgrade para adicionar mais.`,
        variant: "destructive",
      });
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .insert({
          name,
          description,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Agente criado",
        description: `Seu agente ${name} foi criado com sucesso!`,
      });
      
      // Refresh the agents list
      await fetchAgents();
      return data as Agent;
    } catch (error: any) {
      toast({
        title: "Erro ao criar agente",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Delete an agent
  const deleteAgent = async (agentId: string) => {
    try {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', agentId);

      if (error) throw error;
      
      toast({
        title: "Agente removido",
        description: "O agente foi removido com sucesso.",
      });
      
      // Refresh the agents list
      await fetchAgents();
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao remover agente",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Update an agent
  const updateAgent = async (agentId: string, updates: Partial<Agent>) => {
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .update(updates)
        .eq('id', agentId)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Agente atualizado",
        description: "As informações do agente foram atualizadas com sucesso.",
      });
      
      // Refresh the agents list
      await fetchAgents();
      return data as Agent;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar agente",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Load data when component mounts
  useEffect(() => {
    if (user) {
      fetchUserPlan().then(() => fetchAgents());
    }
  }, [user]);

  return {
    agents,
    userPlan,
    loading,
    createAgent,
    deleteAgent,
    updateAgent,
    fetchAgents,
    canCreateAgent: userPlan ? agents.length < userPlan.max_agents : false
  };
}
