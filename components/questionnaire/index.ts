/**
 * Questionnaire Components
 * Barrel export for all questionnaire-related components
 *
 * Architecture:
 * - QuestionOption: Factory component (delegates to SingleSelectOption or MultiSelectOption)
 * - ProgressIndicator: Progress bar with animation
 * - NavigationControls: Previous/Next navigation buttons
 *
 * Design Patterns:
 * - Factory Pattern: QuestionOption creates appropriate component based on type
 * - Strategy Pattern: SingleSelectOption & MultiSelectOption implement different selection strategies
 * - Composition Pattern: Both option types compose OptionContainer for shared behavior
 */

export { QuestionOption } from "./QuestionOption";
export { ProgressIndicator } from "./ProgressIndicator";
export { NavigationControls } from "./NavigationControls";
