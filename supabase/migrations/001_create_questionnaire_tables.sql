-- Create Questionnaire Tables
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/szvmbgmxqwygickaqmvs/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create questions table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('single-select', 'multi-select')),
    explainer TEXT NOT NULL,
    question TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    required BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create question_options table
CREATE TABLE IF NOT EXISTS public.question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_order ON public.questions("order");
CREATE INDEX IF NOT EXISTS idx_question_options_question_id ON public.question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_question_options_order ON public.question_options("order");

-- Enable Row Level Security (RLS)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can read questions)
CREATE POLICY "Questions are viewable by everyone"
    ON public.questions FOR SELECT
    USING (true);

CREATE POLICY "Question options are viewable by everyone"
    ON public.question_options FOR SELECT
    USING (true);

-- Insert sample data (based on your current questions.ts)
INSERT INTO public.questions (type, explainer, question, "order", required) VALUES
    ('single-select', 'Understanding your current state helps us provide better support.', 'How would you describe your current stress level?', 1, true),
    ('multi-select', 'Select all that apply to your current experience.', 'Which of the following symptoms have you been experiencing?', 2, true);

-- Get the IDs of the questions we just inserted
DO $$
DECLARE
    stress_question_id UUID;
    symptoms_question_id UUID;
BEGIN
    -- Get stress level question ID
    SELECT id INTO stress_question_id FROM public.questions WHERE "order" = 1;

    -- Get symptoms question ID
    SELECT id INTO symptoms_question_id FROM public.questions WHERE "order" = 2;

    -- Insert options for stress level question (single-select)
    INSERT INTO public.question_options (question_id, value, label, "order") VALUES
        (stress_question_id, 'very-low', 'Very Low', 1),
        (stress_question_id, 'low', 'Low', 2),
        (stress_question_id, 'moderate', 'Moderate', 3),
        (stress_question_id, 'high', 'High', 4),
        (stress_question_id, 'very-high', 'Very High', 5),
        (stress_question_id, 'extreme', 'Extreme', 6);

    -- Insert options for symptoms question (multi-select)
    INSERT INTO public.question_options (question_id, value, label, "order") VALUES
        (symptoms_question_id, 'fatigue', 'Chronic Fatigue', 1),
        (symptoms_question_id, 'anxiety', 'Anxiety', 2),
        (symptoms_question_id, 'difficulty-concentrating', 'Difficulty Concentrating', 3),
        (symptoms_question_id, 'irritability', 'Irritability', 4),
        (symptoms_question_id, 'sleep-issues', 'Sleep Issues', 5),
        (symptoms_question_id, 'physical-symptoms', 'Physical Symptoms (headaches, muscle tension)', 6);
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for questions table
CREATE TRIGGER set_questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Add helpful comment
COMMENT ON TABLE public.questions IS 'Stores questionnaire questions for the burnout assessment';
COMMENT ON TABLE public.question_options IS 'Stores answer options for each question';
