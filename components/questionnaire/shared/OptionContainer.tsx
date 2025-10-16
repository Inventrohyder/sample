/**
 * OptionContainer Component (Composition Pattern)
 * Shared base container for all question option types
 *
 * Provides consistent border animation and pressable wrapper
 * Used by SingleSelectOption and MultiSelectOption
 */

import React from "react";
import { Animated, Pressable } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useBorderAnimation } from "../../../hooks/useBorderAnimation";

interface OptionContainerProps {
  isSelected: boolean;
  borderRadius: number;
  onPress: () => void;
  children: React.ReactNode;
  accessibilityLabel: string;
}

/**
 * Base container component providing border animation and press handling
 * Implements Composition Pattern for shared UI behavior
 */
export function OptionContainer({
  isSelected,
  borderRadius,
  onPress,
  children,
  accessibilityLabel,
}: OptionContainerProps) {
  const { theme } = useTheme();

  // Animate border when selection changes
  const { borderWidth, borderColor } = useBorderAnimation(isSelected);

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.SECONDARY_GREY, theme.colors.SECONDARY_BREEZE],
  });

  return (
    <Animated.View
      style={{
        borderWidth,
        borderColor: animatedBorderColor,
        borderRadius,
        marginBottom: theme.spacing.sm,
      }}
    >
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ selected: isSelected }}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          backgroundColor: theme.colors.WHITE,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
