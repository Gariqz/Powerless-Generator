import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getPowerless(name: string): Promise<number | null> {
  const normalized = name.toLowerCase().trim();
  
  const { data, error } = await supabase
    .from('powerless_results')
    .select('percentage')
    .eq('name', normalized)
    .single();

  if (error || !data) return null;
  return data.percentage;
}

export async function savePowerless(name: string, percentage: number): Promise<void> {
  const normalized = name.toLowerCase().trim();
  
  const { error } = await supabase
    .from('powerless_results')
    .upsert({ name: normalized, percentage }, { onConflict: 'name' });

  if (error) {
    console.error('Error saving to Supabase:', error.message);
  }
}
