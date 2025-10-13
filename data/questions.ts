/**
 * Questionnaire data
 * Contains all questions for the burnout assessment
 */

export type QuestionType = "single-select" | "multi-select";

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  explainer: string;
  question: string;
  options?: QuestionOption[];
  required?: boolean;
}

export const QUESTIONS: Question[] = [
  {
    id: "stress-level",
    type: "single-select",
    explainer: "Understanding your support needs",
    question: "I would rate my stress in the past week as",
    options: [
      { id: "very-low", label: "Very low", value: "very-low" },
      { id: "low", label: "Low", value: "low" },
      { id: "moderate", label: "Moderate", value: "moderate" },
      { id: "high", label: "High", value: "high" },
      { id: "very-high", label: "Very high", value: "very-high" },
      { id: "unbearable", label: "Unbearable", value: "unbearable" },
    ],
    required: true,
  },
  {
    id: "symptoms-experienced",
    type: "multi-select",
    explainer: "Understanding your support needs",
    question: "In the past week, I've experienced...",
    options: [
      { id: "exhaustion", label: "Exhaustion", value: "exhaustion" },
      {
        id: "difficulty-focusing",
        label: "Difficulty focusing",
        value: "difficulty-focusing",
      },
      {
        id: "emotionally-overwhelmed",
        label: "Being emotionally overwhelmed",
        value: "emotionally-overwhelmed",
      },
      { id: "brain-fog", label: "Brain fog/memory issues", value: "brain-fog" },
      {
        id: "depressive-symptoms",
        label: "Depressive symptoms",
        value: "depressive-symptoms",
      },
      {
        id: "mechanical-work",
        label: "Doing my job mechanically",
        value: "mechanical-work",
      },
    ],
    required: true,
  },
];
