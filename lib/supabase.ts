import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing!');
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getPowerless(name: string): Promise<number | null> {
  if (!supabase) return null;
  const normalized = name.toLowerCase().trim();
  
  try {
    const { data, error } = await supabase
      .from('powerless_results')
      .select('percentage')
      .eq('name', normalized)
      .maybeSingle();

    if (error) {
      console.error('Supabase Fetch Error:', error.message);
      return null;
    }
    return data?.percentage ?? null;
  } catch (err) {
    console.error('Unexpected Supabase Error:', err);
    return null;
  }
}

export async function savePowerless(name: string, percentage: number): Promise<void> {
  if (!supabase) return;
  const normalized = name.toLowerCase().trim();
  
  try {
    const { error } = await supabase
      .from('powerless_results')
      .upsert({ name: normalized, percentage }, { onConflict: 'name' });

    if (error) {
      console.error('Supabase Save Error:', error.message);
    }
  } catch (err) {
    console.error('Unexpected Supabase Save Error:', err);
  }
}
