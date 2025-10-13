/**
 * ProgressIndicator Component
 * Shows current question progress with a visual progress bar
 */

import React from "react";
import { Animated, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useProgressAnimation } from "../../hooks/useProgressAnimation";

interface ProgressIndicatorProps {
  currentIndex: number;
  total: number;
}

export function ProgressIndicator({
  currentIndex,
  total,
}: ProgressIndicatorProps) {
  const { theme, typography } = useTheme();

  // Animate progress bar width
  const { animatedWidth } = useProgressAnimation(currentIndex, total);

  return (
    <View style={{ marginRight: theme.spacing.lg, minWidth: 120 }}>
      <Text
        style={[
          typography.BODY_SMALL,
          {
            color: theme.colors.SECONDARY_TEXT,
            marginBottom: theme.spacing.sm,
          },
        ]}
        accessibilityLabel={`Question ${currentIndex + 1} of ${total}`}
      >
        Question {currentIndex + 1} / {total}
      </Text>
      <View
        style={{
          height: 12,
          backgroundColor: theme.colors.SECONDARY_GREY,
          borderRadius: theme.borderRadius.lg,
          overflow: "hidden",
        }}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: total,
          now: currentIndex + 1,
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: animatedWidth,
            backgroundColor: theme.colors.SECONDARY_BREEZE,
            borderRadius: theme.borderRadius.lg,
          }}
        />
      </View>
    </View>
  );
}
