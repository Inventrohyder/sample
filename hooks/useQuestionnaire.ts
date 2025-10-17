/**
 * useQuestionnaire Hook
 * Manages questionnaire state and navigation logic
 */

import { useState, useEffect } from "react";
import {
  fetchQuestions,
  type Question,
} from "@/repositories/QuestionRepository";

interface UseQuestionnaireReturn {
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentAnswer: string | string[] | undefined;
  answers: Record<string, string | string[]>;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLoading: boolean;
  error: string | null;
  handleAnswerChange: (questionId: string, answer: string | string[]) => void;
  goToNext: () => void;
  goToPrevious: () => void;
}

export function useQuestionnaire(): UseQuestionnaireReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  // Load questions from Supabase on mount
  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load questions",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex] || null;
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerChange = (
    questionId: string,
    answer: string | string[],
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const isAnswerValid = (): boolean => {
    if (!currentQuestion || !currentQuestion.required) return true;

    if (currentQuestion.type === "single-select") {
      return Boolean(
        currentAnswer &&
          typeof currentAnswer === "string" &&
          currentAnswer.length > 0,
      );
    } else if (currentQuestion.type === "multi-select") {
      return Boolean(
        currentAnswer &&
          Array.isArray(currentAnswer) &&
          currentAnswer.length > 0,
      );
    }

    return false;
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: questions.length,
    currentAnswer,
    answers,
    isLastQuestion,
    isFirstQuestion,
    canGoNext: isAnswerValid(),
    canGoPrevious: !isFirstQuestion,
    isLoading,
    error,
    handleAnswerChange,
    goToNext,
    goToPrevious,
  };
}
