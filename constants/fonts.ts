/**
 * Font constants for the app
 * Cardo is used for headings and titles
 * Commissioner is used for body text and other content
 */

// Font weight constants
export const FONT_WEIGHTS = {
  THIN: "100",
  EXTRA_LIGHT: "200",
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "500",
  SEMI_BOLD: "600",
  BOLD: "700",
  EXTRA_BOLD: "800",
  BLACK: "900",
} as const;

export const FONTS = {
  // Cardo fonts for headings and titles
  CARDO: {
    REGULAR: "Cardo-Regular", // 400 weight
    BOLD: "Cardo-Bold", // 700 weight
    ITALIC: "Cardo-Italic", // 400 weight, italic
  },

  // Commissioner fonts for body text
  COMMISSIONER: {
    THIN: "Commissioner-Thin", // 100 weight
    EXTRA_LIGHT: "Commissioner-ExtraLight", // 200 weight
    LIGHT: "Commissioner-Light", // 300 weight
    REGULAR: "Commissioner-Regular", // 400 weight
    MEDIUM: "Commissioner-Medium", // 500 weight
    SEMI_BOLD: "Commissioner-SemiBold", // 600 weight
    BOLD: "Commissioner-Bold", // 700 weight
    EXTRA_BOLD: "Commissioner-ExtraBold", // 800 weight
    BLACK: "Commissioner-Black", // 900 weight
  },
} as const;

// Typography styles for common use cases (pure typography, no colors)
export const TYPOGRAPHY = {
  // Heading styles using Cardo
  DISPLAY_LARGE: {
    fontFamily: FONTS.CARDO.REGULAR,
    fontSize: 44,
    lineHeight: 52.8, // 120% of 44
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  H1: {
    fontFamily: FONTS.CARDO.BOLD,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  H2: {
    fontFamily: FONTS.CARDO.BOLD,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  H3: {
    fontFamily: FONTS.CARDO.BOLD,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  H4: {
    fontFamily: FONTS.CARDO.REGULAR,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  H5: {
    fontFamily: FONTS.CARDO.REGULAR,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  H6: {
    fontFamily: FONTS.CARDO.REGULAR,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },

  // Body text styles using Commissioner
  BODY_LARGE: {
    fontFamily: FONTS.COMMISSIONER.REGULAR,
    fontSize: 20,
    lineHeight: 30, // 150% of 20
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  BODY: {
    fontFamily: FONTS.COMMISSIONER.REGULAR,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  BODY_SMALL: {
    fontFamily: FONTS.COMMISSIONER.REGULAR,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },

  // Caption and label styles
  CAPTION: {
    fontFamily: FONTS.COMMISSIONER.MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
  LABEL: {
    fontFamily: FONTS.COMMISSIONER.MEDIUM,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },

  // Text styles for different purposes
  TEXT_LARGE: {
    fontFamily: FONTS.COMMISSIONER.REGULAR,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  TEXT_MEDIUM: {
    fontFamily: FONTS.COMMISSIONER.REGULAR,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  TEXT_SMALL: {
    fontFamily: FONTS.COMMISSIONER.REGULAR,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
} as const;
