/**
 * useProgressAnimation Hook
 * Manages progress bar width animation
 *
 * Encapsulates animation logic to satisfy ESLint exhaustive-deps rule
 * and separate animation concerns from component rendering logic.
 */

import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ProgressAnimation {
  animatedProgress: Animated.Value;
  animatedWidth: Animated.AnimatedInterpolation<string | number>;
}

/**
 * Custom hook for managing progress bar animation
 *
 * @param currentIndex - Current question index
 * @param total - Total number of questions
 * @returns Animated progress value and interpolated width
 */
export function useProgressAnimation(
  currentIndex: number,
  total: number,
): ProgressAnimation {
  const progressPercentage = ((currentIndex + 1) / total) * 100;

  // Animated value for progress bar width
  const animatedProgress = useRef(
    new Animated.Value(progressPercentage),
  ).current;

  // Animate progress bar when currentIndex changes
  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progressPercentage,
      duration: 300,
      useNativeDriver: false, // width animation requires useNativeDriver: false
    }).start();
  }, [currentIndex, progressPercentage, animatedProgress]);

  // Interpolate to percentage string for width
  const animatedWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return {
    animatedProgress,
    animatedWidth,
  };
}
