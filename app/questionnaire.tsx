/**
 * Questionnaire Screen
 * Multi-question flow for burnout assessment
 *
 * Clean, focused implementation following single responsibility principle
 */

import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NavigationControls,
  ProgressIndicator,
  QuestionOption,
} from "../components/questionnaire";
import { useTheme } from "../contexts/ThemeContext";
import { QUESTIONS } from "../data/questions";
import { useQuestionnaire } from "../hooks/useQuestionnaire";
import { hexToRgba } from "../utils/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Create animated component once outside the component
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export default function Questionnaire() {
  const { theme, typography } = useTheme();
  const insets = useSafeAreaInsets();

  // Animation for sliding questions
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const previousIndexRef = useRef(-1); // Start at -1 to allow initial animation

  // Animation for background panning
  const backgroundPositionAnim = useRef(new Animated.Value(0)).current;

  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswer,
    answers,
    isLastQuestion,
    canGoNext,
    canGoPrevious,
    handleAnswerChange,
    goToNext,
    goToPrevious,
  } = useQuestionnaire(QUESTIONS);

  // Animate question transitions
  useEffect(() => {
    // Skip if this is the first render or index hasn't changed
    if (previousIndexRef.current === -1) {
      previousIndexRef.current = currentQuestionIndex;
      return;
    }

    if (currentQuestionIndex === previousIndexRef.current) {
      return;
    }

    const direction = currentQuestionIndex > previousIndexRef.current ? 1 : -1;

    // Calculate background position based on progress through questionnaire
    // 0 at start (leftmost), 1 at end (rightmost)
    const progressPercentage = currentQuestionIndex / (QUESTIONS.length - 1);

    // Start with the new question off-screen in the direction of movement
    slideAnim.setValue(direction * SCREEN_WIDTH);
    fadeAnim.setValue(0);

    // Update previous index before animation
    previousIndexRef.current = currentQuestionIndex;

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
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (!canGoNext) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isLastQuestion) {
      // Celebrate completion
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log("Questionnaire completed:", answers);
      router.back();
    } else {
      goToNext();
    }
  };

  const handlePrevious = () => {
    if (!canGoPrevious) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    goToPrevious();
  };

  // Calculate translateX for background panning
  // The image will pan from 0 (start) to negative value (showing right side of image)
  // Memoize to prevent recreation on every render
  const backgroundTranslateX = useMemo(
    () =>
      backgroundPositionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -SCREEN_WIDTH * 0.5], // Pan half a screen width to the right
      }),
    [backgroundPositionAnim],
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Animated Background */}
      <AnimatedImageBackground
        source={require("../assets/images/questionnaire_background.png")}
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 1.5, // Make image wider to allow panning
          height: "100%",
          transform: [{ translateX: backgroundTranslateX }],
        }}
        resizeMode="cover"
      >
        {/* Color Overlay */}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: hexToRgba(theme.colors.SECONDARY_BG, 0.8),
          }}
        />
      </AnimatedImageBackground>

      {/* Content Overlay */}
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Question Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: theme.spacing.lg,
            paddingTop: theme.spacing.xxl + insets.top,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            key={currentQuestion.id}
            style={{
              marginBottom: theme.spacing.xl,
              transform: [{ translateX: slideAnim }],
              opacity: fadeAnim,
            }}
          >
            {/* Explainer Text */}
            <Text
              style={[
                typography.BODY_SMALL,
                {
                  color: theme.colors.SECONDARY_TEXT,
                  marginBottom: theme.spacing.md,
                },
              ]}
            >
              {currentQuestion.explainer}
            </Text>

            {/* Question Text */}
            <Text
              style={[
                typography.H2,
                {
                  marginBottom: theme.spacing.xl,
                },
              ]}
              accessibilityRole="header"
            >
              {currentQuestion.question}
            </Text>

            {/* Answer Options */}
            <View>
              {currentQuestion.options?.map((option) => (
                <QuestionOption
                  key={option.id}
                  option={option}
                  question={currentQuestion}
                  currentAnswer={currentAnswer}
                  onAnswerChange={handleAnswerChange}
                />
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Navigation Footer */}
        <View
          style={{
            padding: theme.spacing.lg,
            paddingBottom: theme.spacing.sm + insets.bottom,
            backgroundColor: theme.colors.WHITE,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProgressIndicator
              currentIndex={currentQuestionIndex}
              total={QUESTIONS.length}
            />

            <NavigationControls
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              isLastQuestion={isLastQuestion}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
