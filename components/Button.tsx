/**
 * Custom Button Component
 * Reusable button following the design system
 */

import React from "react";
import {
  Pressable,
  Text,
  type PressableProps,
  type ViewStyle,
} from "react-native";
import { COMPONENTS } from "../constants";

type ButtonSize = "small" | "regular" | "large";

interface ButtonProps extends Omit<PressableProps, "style"> {
  /** Button text */
  children: string;
  /** Button size variant */
  size?: ButtonSize;
  /** Additional styles to apply to the button container */
  style?: ViewStyle;
}

/**
 * Styled button component following design system
 *
 * @example
 * ```tsx
 * <Button size="large" onPress={() => console.log('pressed')}>
 *   Click Me
 * </Button>
 * ```
 */
export function Button({
  children,
  size = "regular",
  style,
  ...pressableProps
}: ButtonProps) {
  // Get styles based on size
  const containerStyle = COMPONENTS.BUTTON[size];
  const textStyle = COMPONENTS.BUTTON_TEXT[size];

  return (
    <Pressable
      style={({ pressed }) => [
        COMPONENTS.BUTTON.base,
        containerStyle,
        { opacity: pressed ? 0.7 : 1 },
        style,
      ]}
      {...pressableProps}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}
