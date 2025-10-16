/**
 * MultiSelectOption Component (Strategy Pattern)
 * Renders a multi-select (checkbox style) option
 *
 * Features:
 * - Rounded rectangle border
 * - Square checkbox indicator
 * - Array value selection (toggle behavior)
 * - Fade animation on selection
 */

import React from "react";
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../contexts/ThemeContext";
import type { QuestionOption } from "../../data/questions";
import { OptionContainer } from "./shared/OptionContainer";

interface MultiSelectOptionProps {
  option: QuestionOption;
  currentAnswer: string[] | undefined;
  onAnswerChange: (values: string[]) => void;
}

/**
 * Multi-select option component implementing Strategy Pattern
 * Handles checkbox behavior with square indicator
 */
export function MultiSelectOption({
  option,
  currentAnswer,
  onAnswerChange,
}: MultiSelectOptionProps) {
  const { theme, typography } = useTheme();

  const isSelected =
    Array.isArray(currentAnswer) && currentAnswer.includes(option.value);

  const handlePress = () => {
    const currentValues = Array.isArray(currentAnswer) ? currentAnswer : [];
    const newValues = currentValues.includes(option.value)
      ? currentValues.filter((v) => v !== option.value) // Remove
      : [...currentValues, option.value]; // Add

    onAnswerChange(newValues);
  };

  return (
    <OptionContainer
      isSelected={isSelected}
      borderRadius={theme.borderRadius.md} // Rounded rectangle
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

      {/* Square Checkbox Indicator */}
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: theme.borderRadius.sm, // Square with slight rounding
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
      </View>
    </OptionContainer>
  );
}
