
import { createClient } from '@supabase/supabase-js';

// Get environment variables or use placeholders for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  // Check if the values are different from the placeholders
  return supabaseUrl !== 'https://your-project.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key';
};
