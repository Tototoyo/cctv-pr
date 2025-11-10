-- CCTV Prompt Generator Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create prompts table
CREATE TABLE IF NOT EXISTS public.prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scene TEXT NOT NULL,
    location TEXT,
    time_of_day TEXT,
    weather TEXT,
    visual_artifacts TEXT[],
    generated_prompt TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON public.prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prompts_location ON public.prompts(location);
CREATE INDEX IF NOT EXISTS idx_prompts_time_of_day ON public.prompts(time_of_day);

-- Enable Row Level Security (RLS)
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (public read/write)
-- For production, you may want to restrict this based on auth
CREATE POLICY "Allow public read access" ON public.prompts
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.prompts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.prompts
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON public.prompts
    FOR DELETE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
DROP TRIGGER IF EXISTS update_prompts_updated_at ON public.prompts;
CREATE TRIGGER update_prompts_updated_at
    BEFORE UPDATE ON public.prompts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a view for recent prompts
CREATE OR REPLACE VIEW public.recent_prompts AS
SELECT 
    id,
    scene,
    location,
    time_of_day,
    weather,
    visual_artifacts,
    generated_prompt,
    created_at
FROM public.prompts
ORDER BY created_at DESC
LIMIT 100;

-- Grant access to the view
GRANT SELECT ON public.recent_prompts TO anon, authenticated;
