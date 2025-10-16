/**
 * Theme-aware typography styles
 * Combines pure typography with theme colors
 *
 * This module provides a factory function to create themed typography
 * from base typography styles and a color palette, enabling support
 * for multiple themes (light, dark, etc.)
 */

import { TYPOGRAPHY } from "./fonts";
import { COLORS, DARK_COLORS } from "./theme";

import type { ColorPalette } from "./theme";

/**
 * Creates a complete typography system with theme colors
 * @param colors - Color palette to use for text colors
 * @returns Typography object with colors applied
 */
function createThemedTypography(colors: ColorPalette) {
  return {
    // Heading styles with theme colors
    H1: {
      ...TYPOGRAPHY.H1,
      color: colors.PRIMARY_TEXT,
    },
    H2: {
      ...TYPOGRAPHY.H2,
      color: colors.PRIMARY_TEXT,
    },
    H3: {
      ...TYPOGRAPHY.H3,
      color: colors.PRIMARY_TEXT,
    },
    H4: {
      ...TYPOGRAPHY.H4,
      color: colors.PRIMARY_TEXT,
    },
    H5: {
      ...TYPOGRAPHY.H5,
      color: colors.PRIMARY_TEXT,
    },
    H6: {
      ...TYPOGRAPHY.H6,
      color: colors.PRIMARY_TEXT,
    },

    // Body text styles with theme colors
    BODY_LARGE: {
      ...TYPOGRAPHY.BODY_LARGE,
      color: colors.SECONDARY_TEXT,
    },
    BODY: {
      ...TYPOGRAPHY.BODY,
      color: colors.SECONDARY_TEXT,
    },
    BODY_SMALL: {
      ...TYPOGRAPHY.BODY_SMALL,
      color: colors.SECONDARY_TEXT,
    },

    // Caption and label styles with theme colors
    CAPTION: {
      ...TYPOGRAPHY.CAPTION,
      color: colors.SECONDARY_TEXT,
    },
    LABEL: {
      ...TYPOGRAPHY.LABEL,
      color: colors.SECONDARY_TEXT,
    },

    // Text styles with theme colors
    TEXT_LARGE: {
      ...TYPOGRAPHY.TEXT_LARGE,
      color: colors.SECONDARY_TEXT,
    },
    TEXT_MEDIUM: {
      ...TYPOGRAPHY.TEXT_MEDIUM,
      color: colors.SECONDARY_TEXT,
    },
    TEXT_SMALL: {
      ...TYPOGRAPHY.TEXT_SMALL,
      color: colors.SECONDARY_TEXT,
    },
  } as const;
}

// Light theme typography (default)
export const LIGHT_TYPOGRAPHY = createThemedTypography(COLORS);

// Dark theme typography
export const DARK_TYPOGRAPHY = createThemedTypography(DARK_COLORS);

// Export light theme as default THEMED_TYPOGRAPHY for backwards compatibility
export const THEMED_TYPOGRAPHY = LIGHT_TYPOGRAPHY;

// Type for themed typography (useful for theme context)
export type ThemedTypography = typeof LIGHT_TYPOGRAPHY;
