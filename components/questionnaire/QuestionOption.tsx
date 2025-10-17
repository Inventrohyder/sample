/**
 * QuestionOption Factory Component (Factory Pattern)
 * Creates the appropriate option component based on question type
 *
 * Design Patterns:
 * - Factory Pattern: Selects SingleSelectOption or MultiSelectOption
 * - Strategy Pattern: Each option type has its own selection strategy
 * - Composition Pattern: Both use shared OptionContainer base
 *
 * This is the public API - parent components only need to import this one component
 */

import React from "react";
import type {
  Question,
  QuestionOption as OptionType,
} from "../../data/questions";
import { SingleSelectOption } from "./SingleSelectOption";
import { MultiSelectOption } from "./MultiSelectOption";

interface QuestionOptionProps {
  option: OptionType;
  question: Question;
  currentAnswer: string | string[] | undefined;
  onAnswerChange: (questionId: string, answer: string | string[]) => void;
}

/**
 * Factory component that delegates to the appropriate option component
 * based on question type (single-select vs multi-select)
 *
 * @example
 * ```tsx
 * <QuestionOption
 *   option={option}
 *   question={currentQuestion}
 *   currentAnswer={currentAnswer}
 *   onAnswerChange={handleAnswerChange}
 * />
 * ```
 */
export function QuestionOption({
  option,
  question,
  currentAnswer,
  onAnswerChange,
}: QuestionOptionProps) {
  // Factory Method: Create appropriate component based on type
  if (question.type === "single-select") {
    return (
      <SingleSelectOption
        option={option}
        currentAnswer={currentAnswer as string | undefined}
        onAnswerChange={(value) => onAnswerChange(question.id, value)}
      />
    );
  }

  if (question.type === "multi-select") {
    return (
      <MultiSelectOption
        option={option}
        currentAnswer={currentAnswer as string[] | undefined}
        onAnswerChange={(values) => onAnswerChange(question.id, values)}
      />
    );
  }

  // Fallback for unknown types (should never happen with proper typing)
  return null;
}
