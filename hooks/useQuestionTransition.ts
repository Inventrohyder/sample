/**
 * useQuestionTransition Hook
 * Manages slide, fade, and background pan animations for questionnaire transitions
 *
 * Encapsulates animation logic to satisfy ESLint exhaustive-deps rule
 * and separate animation concerns from component rendering logic.
 */

import { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface QuestionTransitionAnimations {
  slideAnim: Animated.Value;
  fadeAnim: Animated.Value;
  backgroundPositionAnim: Animated.Value;
  backgroundTranslateX: Animated.AnimatedInterpolation<string | number>;
}

/**
 * Custom hook for managing question transition animations
 *
 * @param currentIndex - Current question index
 * @param totalQuestions - Total number of questions
 * @returns Animation values for slide, fade, and background pan
 */
export function useQuestionTransition(
  currentIndex: number,
  totalQuestions: number,
): QuestionTransitionAnimations {
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const backgroundPositionAnim = useRef(new Animated.Value(0)).current;
  const previousIndexRef = useRef(-1); // Start at -1 to allow initial animation

  // Animate question transitions
  useEffect(() => {
    // Skip if this is the first render or index hasn't changed
    if (previousIndexRef.current === -1) {
      previousIndexRef.current = currentIndex;
      return;
    }

    if (currentIndex === previousIndexRef.current) {
      return;
    }

    const direction = currentIndex > previousIndexRef.current ? 1 : -1;

    // Calculate background position based on progress through questionnaire
    // 0 at start (leftmost), 1 at end (rightmost)
    const progressPercentage = currentIndex / (totalQuestions - 1);

    // Start with the new question off-screen in the direction of movement
    slideAnim.setValue(direction * SCREEN_WIDTH);
    fadeAnim.setValue(0);

    // Update previous index before animation
    previousIndexRef.current = currentIndex;

    // Animate in question and background together
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(backgroundPositionAnim, {
        toValue: progressPercentage,
        useNativeDriver: true,
        tension: 50,
        friction: 10,
      }),
    ]).start();
  }, [
    currentIndex,
    totalQuestions,
    slideAnim,
    fadeAnim,
    backgroundPositionAnim,
  ]);

  // Calculate translateX for background panning
  // The image will pan from 0 (start) to negative value (showing right side of image)
  const backgroundTranslateX = backgroundPositionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH * 0.5], // Pan half a screen width to the right
  });

  return {
    slideAnim,
    fadeAnim,
    backgroundPositionAnim,
    backgroundTranslateX,
  };
}
