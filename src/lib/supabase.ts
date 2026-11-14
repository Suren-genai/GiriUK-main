import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pyjqoqwzclayudefrwjm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5anFvcXd6Y2xheXVkZWZyd2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NTc1MjcsImV4cCI6MjExMDEzMzUyN30.fzazuawkoBvGfIvdlyehwm20QiKu-qXp1zS4ThMfx0Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
