
export interface Agent {
  id: string;
  name: string;
  description: string | null;
  training_data: string | null;
  personality: string | null;
  voice_enabled: boolean | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface UserPlan {
  id: string;
  user_id: string;
  plan_type: 'básico' | 'pro' | 'premium';
  max_agents: number;
  created_at: string;
  updated_at: string;
}
