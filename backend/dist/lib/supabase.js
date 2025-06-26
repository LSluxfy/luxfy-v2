import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://wpnlfvaqlndmrtsngwme.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwbmxmdmFxbG5kbXJ0c25nd21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mjc1MzIsImV4cCI6MjA2MDAwMzUzMn0.a-dqDg9rSXC-MNJNVcAXBT6mEIkupkJVrMbC5h6t-vE';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = () => {
    return !!supabase;
};
