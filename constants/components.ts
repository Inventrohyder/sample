/**
 * Component-specific styles
 * Separated from typography to avoid coupling
 *
 * Note: For theme-aware components, use the theme from ThemeContext
 * These are base styles that don't change with theme
 */

import { FONTS, FONT_WEIGHTS } from "./fonts";
import { COLORS } from "./theme";

export const COMPONENTS = {
  // Button styles
  BUTTON: {
    base: {
      backgroundColor: COLORS.SECONDARY_BREEZE,
      borderRadius: 64,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      width: "100%" as const,
    },
    large: {
      paddingVertical: 24,
      paddingHorizontal: 40,
    },
    regular: {
      paddingVertical: 20,
      paddingHorizontal: 32,
    },
    small: {
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
  },

  // Button text styles
  BUTTON_TEXT: {
    large: {
      fontFamily: FONTS.COMMISSIONER.SEMI_BOLD,
      fontSize: 18,
      lineHeight: 27, // 150% of 18
      fontWeight: FONT_WEIGHTS.SEMI_BOLD,
      color: COLORS.PRIMARY_TEXT,
      textTransform: "uppercase" as const,
    },
    regular: {
      fontFamily: FONTS.COMMISSIONER.MEDIUM,
      fontSize: 16,
      lineHeight: 24, // 150% of 16
      fontWeight: FONT_WEIGHTS.MEDIUM,
      color: COLORS.PRIMARY_TEXT,
      textTransform: "uppercase" as const,
    },
    small: {
      fontFamily: FONTS.COMMISSIONER.MEDIUM,
      fontSize: 14,
      lineHeight: 21, // 150% of 14
      fontWeight: FONT_WEIGHTS.MEDIUM,
      color: COLORS.PRIMARY_TEXT,
      textTransform: "uppercase" as const,
    },
  },
} as const;
