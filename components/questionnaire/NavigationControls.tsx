/**
 * NavigationControls Component
 * Previous/Next buttons for questionnaire navigation
 */

import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../contexts/ThemeContext";

interface NavigationControlsProps {
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export function NavigationControls({
  canGoNext,
  canGoPrevious,
  isLastQuestion,
  onNext,
  onPrevious,
}: NavigationControlsProps) {
  const { theme } = useTheme();

  const nextButtonOpacity = useRef(new Animated.Value(0.3)).current;
  const previousButtonOpacity = useRef(new Animated.Value(0.3)).current;

  // Animate button states
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
  }, [canGoNext, canGoPrevious]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.xxs,
      }}
    >
      {/* Previous button */}
      <Animated.View style={{ opacity: previousButtonOpacity }}>
        <Pressable
          onPress={onPrevious}
          disabled={!canGoPrevious}
          accessibilityRole="button"
          accessibilityLabel="Previous question"
          accessibilityState={{ disabled: !canGoPrevious }}
          style={({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: theme.borderRadius.xsm,
            backgroundColor: theme.colors.PRIMARY_BG,
            borderColor: theme.colors.SECONDARY_GREY,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: pressed && canGoPrevious ? 0.7 : 1,
          })}
        >
          <Svg width={24} height={24} viewBox="0 0 32 32" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.0405 7.29289C16.431 7.68342 16.431 8.31658 16.0405 8.70711L9.7476 15H24C24.5523 15 25 15.4477 25 16C25 16.5523 24.5523 17 24 17H9.7476L16.0405 23.2929C16.431 23.6834 16.431 24.3166 16.0405 24.7071C15.65 25.0976 15.0168 25.0976 14.6263 24.7071L6.6263 16.7071C6.23573 16.3166 6.23573 15.6834 6.6263 15.2929L14.6263 7.29289C15.0168 6.90237 15.65 6.90237 16.0405 7.29289Z"
              fill={theme.colors.PRIMARY_TEXT}
            />
          </Svg>
        </Pressable>
      </Animated.View>

      {/* Next button */}
      <Animated.View style={{ opacity: nextButtonOpacity }}>
        <Pressable
          onPress={onNext}
          disabled={!canGoNext}
          accessibilityRole="button"
          accessibilityLabel={
            isLastQuestion ? "Complete questionnaire" : "Next question"
          }
          accessibilityState={{ disabled: !canGoNext }}
          style={({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: theme.borderRadius.xsm,
            backgroundColor: theme.colors.PRIMARY_BG,
            borderColor: theme.colors.SECONDARY_GREY,
            borderWidth: 1,
            opacity: pressed && canGoNext ? 0.7 : 1,
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Svg width={24} height={24} viewBox="0 0 32 32" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9595 7.29289C15.569 7.68342 15.569 8.31658 15.9595 8.70711L22.2524 15H7.99996C7.44768 15 6.99996 15.4477 6.99996 16C6.99996 16.5523 7.44768 17 7.99996 17H22.2524L15.9595 23.2929C15.569 23.6834 15.569 24.3166 15.9595 24.7071C16.35 25.0976 16.9832 25.0976 17.3737 24.7071L25.3737 16.7071C25.7643 16.3166 25.7643 15.6834 25.3737 15.2929L17.3737 7.29289C16.9832 6.90237 16.35 6.90237 15.9595 7.29289Z"
              fill={theme.colors.PRIMARY_TEXT}
            />
          </Svg>
        </Pressable>
      </Animated.View>
    </View>
  );
}
