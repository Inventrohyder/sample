/**
 * useCheckmarkAnimation Hook
 * Manages checkmark scale animation for option selection indicators
 *
 * Provides a spring animation for checkmark appearance/disappearance
 * Used by both SingleSelectOption and MultiSelectOption components
 */

import { useEffect, useRef } from "react";
import { Animated } from "react-native";

/**
 * Custom hook for managing checkmark scale animation
 *
 * @param isSelected - Whether the option is currently selected
 * @returns Animated scale value for transform
 */
export function useCheckmarkAnimation(isSelected: boolean): Animated.Value {
  const checkmarkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(checkmarkScale, {
      toValue: isSelected ? 1 : 0,
      useNativeDriver: true,
      tension: 80,
      friction: 7,
    }).start();
  }, [isSelected, checkmarkScale]);

  return checkmarkScale;
}
