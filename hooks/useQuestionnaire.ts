/**
 * useQuestionnaire Hook
 * Manages questionnaire state and navigation logic
 */

import { useState } from "react";
import type { Question } from "../data/questions";

interface UseQuestionnaireReturn {
  currentQuestion: Question;
  currentQuestionIndex: number;
  currentAnswer: string | string[] | undefined;
  answers: Record<string, string | string[]>;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  handleAnswerChange: (questionId: string, answer: string | string[]) => void;
  goToNext: () => void;
  goToPrevious: () => void;
}

export function useQuestionnaire(
  questions: Question[],
): UseQuestionnaireReturn {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];
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
    if (!currentQuestion.required) return true;

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
    currentAnswer,
    answers,
    isLastQuestion,
    isFirstQuestion,
    canGoNext: isAnswerValid(),
    canGoPrevious: !isFirstQuestion,
    handleAnswerChange,
    goToNext,
    goToPrevious,
  };
}
