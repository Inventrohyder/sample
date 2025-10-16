/**
 * Theme constants for the app
 * Color palette and design tokens
 *
 * Supports multiple color schemes (light/dark) for theming
 */

// Light theme color palette
export const COLORS = {
  // Text colors
  PRIMARY_TEXT: "#0C1605",
  SECONDARY_TEXT: "#5C5858",

  // Background colors
  PRIMARY_BG: "#F8F4F3",
  SECONDARY_BG: "#F2F3EF",
  WHITE: "#FFFFFF",
  GRADIENT_OVERLAY: "#F4F5F2", // Gradient overlay color for background images

  // Accent colors
  SECONDARY_BREEZE: "#81E4DA",
  SECONDARY_GREY: "#E8E8E8",
  SECONDARY_CLOUD: "#9F9FAD",
} as const;

// Dark theme color palette
export const DARK_COLORS = {
  // Text colors (light on dark)
  PRIMARY_TEXT: "#F8F4F3",
  SECONDARY_TEXT: "#C4C4C4",

  // Background colors (dark)
  PRIMARY_BG: "#0C1605",
  SECONDARY_BG: "#1A1F16",
  WHITE: "#121212",
  GRADIENT_OVERLAY: "#0C1605", // Dark gradient overlay color for background images

  // Accent colors (adjusted for dark mode)
  SECONDARY_BREEZE: "#4DD0C1", // Slightly darker teal for better contrast on dark backgrounds
  SECONDARY_GREY: "#2C2C2C",
  SECONDARY_CLOUD: "#6B6B7A", // Darker version for better contrast on dark backgrounds
} as const;

/**
 * Color palette type (supports both light and dark)
 */
export type ColorPalette = {
  readonly PRIMARY_TEXT: string;
  readonly SECONDARY_TEXT: string;
  readonly PRIMARY_BG: string;
  readonly SECONDARY_BG: string;
  readonly WHITE: string;
  readonly GRADIENT_OVERLAY: string;
  readonly SECONDARY_BREEZE: string;
  readonly SECONDARY_GREY: string;
  readonly SECONDARY_CLOUD: string;
};

/**
 * Creates a complete theme object from a color palette
 * @param colors - Color palette to use
 * @returns Complete theme with colors, spacing, and utilities
 */
function createTheme(colors: ColorPalette) {
  return {
    colors,

    // Text styles with theme colors
    text: {
      primary: {
        color: colors.PRIMARY_TEXT,
      },
      secondary: {
        color: colors.SECONDARY_TEXT,
      },
    },

    // Background styles
    background: {
      primary: {
        backgroundColor: colors.PRIMARY_BG,
      },
      secondary: {
        backgroundColor: colors.SECONDARY_BG,
      },
      white: {
        backgroundColor: colors.WHITE,
      },
    },

    // Common spacing (theme-independent)
    spacing: {
      xxs: 2,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },

    // Border radius (theme-independent)
    borderRadius: {
      xsm: 2,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
    },
  } as const;
}

// Light theme (default)
export const THEME = createTheme(COLORS);

// Dark theme
export const DARK_THEME = createTheme(DARK_COLORS);

// Type for theme objects
export type Theme = typeof THEME;
