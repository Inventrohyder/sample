/**
 * Questionnaire Screen
 * Multi-question flow for burnout assessment
 *
 * Clean, focused implementation following single responsibility principle
 */

import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
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
import { useQuestionTransition } from "../hooks/useQuestionTransition";
import { hexToRgba } from "../utils/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Create animated component once outside the component
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export default function Questionnaire() {
  const { theme, typography } = useTheme();
  const insets = useSafeAreaInsets();

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

  // Animation for question transitions (slide, fade, background pan)
  const { slideAnim, fadeAnim, backgroundTranslateX } = useQuestionTransition(
    currentQuestionIndex,
    QUESTIONS.length,
  );

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
