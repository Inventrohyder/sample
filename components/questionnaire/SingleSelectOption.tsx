/**
 * SingleSelectOption Component (Strategy Pattern)
 * Renders a single-select (radio button style) option
 *
 * Features:
 * - Pill-shaped border (borderRadius: 120)
 * - Circular checkmark indicator
 * - Single value selection (mutual exclusion handled by parent)
 * - Spring animation on selection
 */

import React from "react";
import { Animated, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../contexts/ThemeContext";
import { useCheckmarkAnimation } from "../../hooks/useCheckmarkAnimation";
import type { QuestionOption } from "../../data/questions";
import { OptionContainer } from "./shared/OptionContainer";

interface SingleSelectOptionProps {
  option: QuestionOption;
  currentAnswer: string | undefined;
  onAnswerChange: (value: string) => void;
}

/**
 * Single-select option component implementing Strategy Pattern
 * Handles radio button behavior with circular checkmark
 */
export function SingleSelectOption({
  option,
  currentAnswer,
  onAnswerChange,
}: SingleSelectOptionProps) {
  const { theme, typography } = useTheme();

  const isSelected = currentAnswer === option.value;

  const handlePress = () => {
    onAnswerChange(option.value);
  };

  // Animate checkmark appearance with spring
  const checkmarkScale = useCheckmarkAnimation(isSelected);

  return (
    <OptionContainer
      isSelected={isSelected}
      borderRadius={120} // Pill shape
      onPress={handlePress}
      accessibilityLabel={option.label}
    >
      {/* Option Label */}
      <Text
        style={[
          typography.BODY,
          {
            color: isSelected
              ? theme.colors.PRIMARY_TEXT
              : theme.colors.SECONDARY_TEXT,
            flex: 1,
          },
        ]}
      >
        {option.label}
      </Text>

      {/* Circular Checkmark Indicator */}
      <Animated.View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10, // Circular
          borderWidth: 2,
          borderColor: isSelected
            ? theme.colors.SECONDARY_BREEZE
            : theme.colors.SECONDARY_CLOUD,
          backgroundColor: isSelected
            ? theme.colors.SECONDARY_BREEZE
            : "transparent",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: theme.spacing.sm,
          transform: [{ scale: checkmarkScale }],
        }}
      >
        {isSelected && (
          <Svg width={12} height={12} viewBox="0 0 24 24">
            <Path
              d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
              fill={theme.colors.WHITE}
            />
          </Svg>
        )}
      </Animated.View>
    </OptionContainer>
  );
}
