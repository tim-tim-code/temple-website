import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder_key';

// Check if using placeholder values
const isUsingPlaceholders = supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder_key_replace_with_real_key';

if (isUsingPlaceholders) {
  console.warn('⚠️  Using placeholder Supabase credentials. Please update .env.local with your real Supabase URL and API key for full functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Temporarily force mock data to show for demonstration
export const isSupabaseConfigured = false; // Changed to false to show mock data