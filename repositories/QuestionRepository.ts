/**
 * Question Repository
 * Data access layer for fetching questions from Supabase
 */

import { supabase } from "@/lib/supabase";

// Application domain types
export interface Question {
  id: string;
  type: "single-select" | "multi-select";
  explainer: string;
  question: string;
  order: number;
  required: boolean;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  value: string;
  label: string;
  order: number;
}

/**
 * Fetches all questions with their options from Supabase
 * @returns Array of questions sorted by order
 */
export async function fetchQuestions(): Promise<Question[]> {
  // Fetch all questions ordered by order field
  const { data: questionsData, error: questionsError } = await supabase
    .from("questions")
    .select("*")
    .order("order", { ascending: true });

  if (questionsError) {
    throw new Error(`Failed to fetch questions: ${questionsError.message}`);
  }

  if (!questionsData || questionsData.length === 0) {
    return [];
  }

  // Fetch all options for all questions
  const { data: optionsData, error: optionsError } = await supabase
    .from("question_options")
    .select("*")
    .order("order", { ascending: true });

  if (optionsError) {
    throw new Error(
      `Failed to fetch question options: ${optionsError.message}`,
    );
  }

  // Group options by question_id
  const optionsByQuestionId = new Map<string, QuestionOption[]>();
  optionsData?.forEach((option) => {
    const existing = optionsByQuestionId.get(option.question_id) || [];
    existing.push({
      id: option.id,
      value: option.value,
      label: option.label,
      order: option.order,
    });
    optionsByQuestionId.set(option.question_id, existing);
  });

  // Combine questions with their options
  return questionsData.map((question) => ({
    id: question.id,
    type: question.type as "single-select" | "multi-select",
    explainer: question.explainer,
    question: question.question,
    order: question.order,
    required: question.required,
    options: optionsByQuestionId.get(question.id) || [],
  }));
}

/**
 * Fetches a single question by ID
 * @param questionId - The question ID
 * @returns The question with its options, or null if not found
 */
export async function fetchQuestionById(
  questionId: string,
): Promise<Question | null> {
  const { data: questionData, error: questionError } = await supabase
    .from("questions")
    .select("*")
    .eq("id", questionId)
    .single();

  if (questionError || !questionData) {
    return null;
  }

  const { data: optionsData, error: optionsError } = await supabase
    .from("question_options")
    .select("*")
    .eq("question_id", questionId)
    .order("order", { ascending: true });

  if (optionsError) {
    throw new Error(
      `Failed to fetch question options: ${optionsError.message}`,
    );
  }

  return {
    id: questionData.id,
    type: questionData.type as "single-select" | "multi-select",
    explainer: questionData.explainer,
    question: questionData.question,
    order: questionData.order,
    required: questionData.required,
    options:
      optionsData?.map((option) => ({
        id: option.id,
        value: option.value,
        label: option.label,
        order: option.order,
      })) || [],
  };
}
