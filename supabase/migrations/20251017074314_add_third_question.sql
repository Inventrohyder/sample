-- Add third question to questionnaire
-- Question 3: Frequency of emotional drainage from work

INSERT INTO public.questions (type, explainer, question, "order", required) VALUES
    ('single-select', 'Help us understand the frequency of your experience.', 'How often do you feel emotionally drained by your work?', 3, true);

-- Get the ID of the question we just inserted
DO $$
DECLARE
    frequency_question_id UUID;
BEGIN
    -- Get frequency question ID
    SELECT id INTO frequency_question_id FROM public.questions WHERE "order" = 3;

    -- Insert options for frequency question (single-select)
    INSERT INTO public.question_options (question_id, value, label, "order") VALUES
        (frequency_question_id, 'never', 'Never', 1),
        (frequency_question_id, 'rarely', 'Rarely', 2),
        (frequency_question_id, 'sometimes', 'Sometimes', 3),
        (frequency_question_id, 'often', 'Often', 4),
        (frequency_question_id, 'very-often', 'Very Often', 5),
        (frequency_question_id, 'always', 'Always', 6);
END $$;
