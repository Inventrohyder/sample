/**
 * Theme Context
 * Provides theme values (colors, typography, spacing) throughout the app
 * Automatically detects and follows system color scheme (light/dark)
 */

import React, { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";
import { DARK_THEME, THEME, type Theme } from "../constants/theme";
import {
  DARK_TYPOGRAPHY,
  LIGHT_TYPOGRAPHY,
  type ThemedTypography,
} from "../constants/typography";

/**
 * Theme context value
 */
interface ThemeContextValue {
  /** Current theme object (colors, spacing, borders, utilities) */
  theme: Theme;
  /** Current typography with theme colors */
  typography: ThemedTypography;
  /** Current color scheme ('light' or 'dark') */
  colorScheme: "light" | "dark";
  /** Whether dark mode is active */
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme Provider
 * Wraps the app and provides theme values based on system color scheme
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Automatically detect system color scheme
  const systemColorScheme = useColorScheme();
  const isDark = systemColorScheme === "dark";

  // Select theme based on color scheme
  const theme = isDark ? DARK_THEME : THEME;
  const typography = isDark ? DARK_TYPOGRAPHY : LIGHT_TYPOGRAPHY;

  const value: ThemeContextValue = {
    theme,
    typography,
    colorScheme: isDark ? "dark" : "light",
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme values
 * @returns Current theme context value
 * @throws Error if used outside ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, typography, isDark } = useTheme();
 *
 *   return (
 *     <View style={theme.background.primary}>
 *       <Text style={typography.H1}>Hello</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
