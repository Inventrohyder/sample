/**
 * useBorderAnimation Hook
 * Manages border width and color animations for option selection states
 *
 * Encapsulates animation logic to satisfy ESLint exhaustive-deps rule
 * and separate animation concerns from component rendering logic.
 */

import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface BorderAnimation {
  borderWidth: Animated.Value;
  borderColor: Animated.Value;
}

/**
 * Custom hook for managing border animation on selection
 *
 * @param isSelected - Whether the option is currently selected
 * @returns Animated border width and color values
 */
export function useBorderAnimation(isSelected: boolean): BorderAnimation {
  // Animation values for border
  const borderWidth = useRef(new Animated.Value(1)).current;
  const borderColor = useRef(new Animated.Value(0)).current;

  // Animate border when selection changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(borderWidth, {
        toValue: isSelected ? 2 : 1,
        duration: 200,
        useNativeDriver: false, // border properties require useNativeDriver: false
      }),
      Animated.timing(borderColor, {
        toValue: isSelected ? 1 : 0,
        duration: 200,
        useNativeDriver: false, // color interpolation requires useNativeDriver: false
      }),
    ]).start();
  }, [isSelected, borderWidth, borderColor]);

  return {
    borderWidth,
    borderColor,
  };
}
