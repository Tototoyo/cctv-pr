import { createClient } from '@supabase/supabase-js';
import type { SavedPrompt, GeneratorOptions } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function addPrompt(
  options: GeneratorOptions,
  generatedPrompt: string
): Promise<SavedPrompt | null> {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .insert({
        scene: options.scene,
        location: options.location,
        time_of_day: options.timeOfDay,
        weather: options.weather,
        visual_artifacts: options.visualArtifacts,
        generated_prompt: generatedPrompt,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving prompt:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in addPrompt:', error);
    return null;
  }
}

export async function getRecentPrompts(limit: number = 20): Promise<SavedPrompt[]> {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching prompts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getRecentPrompts:', error);
    return [];
  }
}

export async function deletePrompt(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting prompt:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePrompt:', error);
    return false;
  }
}
