/**
 * useButtonOpacityAnimation Hook
 * Manages opacity animations for navigation button enabled/disabled states
 *
 * Encapsulates animation logic to satisfy ESLint exhaustive-deps rule
 * and separate animation concerns from component rendering logic.
 */

import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ButtonOpacityAnimations {
  nextButtonOpacity: Animated.Value;
  previousButtonOpacity: Animated.Value;
}

/**
 * Custom hook for managing navigation button opacity animations
 *
 * @param canGoNext - Whether the next button is enabled
 * @param canGoPrevious - Whether the previous button is enabled
 * @returns Animated opacity values for next and previous buttons
 */
export function useButtonOpacityAnimation(
  canGoNext: boolean,
  canGoPrevious: boolean,
): ButtonOpacityAnimations {
  const nextButtonOpacity = useRef(new Animated.Value(0.3)).current;
  const previousButtonOpacity = useRef(new Animated.Value(0.3)).current;

  // Animate button states when enabled/disabled state changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(nextButtonOpacity, {
        toValue: canGoNext ? 1 : 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(previousButtonOpacity, {
        toValue: canGoPrevious ? 1 : 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [canGoNext, canGoPrevious, nextButtonOpacity, previousButtonOpacity]);

  return {
    nextButtonOpacity,
    previousButtonOpacity,
  };
}
