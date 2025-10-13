/**
 * QuestionOption Component
 * Renders a single selectable option for questionnaire questions
 * Supports both single-select and multi-select types
 */

import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../contexts/ThemeContext";
import type {
  Question,
  QuestionOption as OptionType,
} from "../../data/questions";

interface QuestionOptionProps {
  option: OptionType;
  question: Question;
  currentAnswer: string | string[] | undefined;
  onAnswerChange: (questionId: string, answer: string | string[]) => void;
}

export function QuestionOption({
  option,
  question,
  currentAnswer,
  onAnswerChange,
}: QuestionOptionProps) {
  const { theme, typography } = useTheme();

  // Animation values for border
  const borderWidth = useRef(new Animated.Value(1)).current;
  const borderColor = useRef(new Animated.Value(0)).current;

  const isSelected = () => {
    if (question.type === "single-select") {
      return currentAnswer === option.value;
    } else if (question.type === "multi-select") {
      return (
        Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
      );
    }
    return false;
  };

  const handlePress = () => {
    if (question.type === "single-select") {
      onAnswerChange(question.id, option.value);
    } else if (question.type === "multi-select") {
      const currentValues = Array.isArray(currentAnswer) ? currentAnswer : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];
      onAnswerChange(question.id, newValues);
    }
  };

  const selected = isSelected();

  // Animate border when selection changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(borderWidth, {
        toValue: selected ? 2 : 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(borderColor, {
        toValue: selected ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [selected]);

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.SECONDARY_GREY, theme.colors.SECONDARY_BREEZE],
  });

  const borderRadiusValue =
    question.type === "multi-select" ? theme.borderRadius.md : 120;

  return (
    <Animated.View
      style={{
        borderWidth,
        borderColor: animatedBorderColor,
        borderRadius: borderRadiusValue,
        marginBottom: theme.spacing.sm,
      }}
    >
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={option.label}
        accessibilityState={{ selected }}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: borderRadiusValue,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          backgroundColor: theme.colors.WHITE,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text
          style={[
            typography.BODY,
            {
              color: selected
                ? theme.colors.PRIMARY_TEXT
                : theme.colors.SECONDARY_TEXT,
              flex: 1,
            },
          ]}
        >
          {option.label}
        </Text>

        {question.type === "multi-select" && (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: theme.borderRadius.sm,
              borderWidth: 2,
              borderColor: selected
                ? theme.colors.SECONDARY_BREEZE
                : theme.colors.SECONDARY_CLOUD,
              backgroundColor: selected
                ? theme.colors.SECONDARY_BREEZE
                : "transparent",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: theme.spacing.sm,
            }}
          >
            {selected && (
              <Svg width={12} height={12} viewBox="0 0 24 24">
                <Path
                  d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                  fill={theme.colors.WHITE}
                />
              </Svg>
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
