/**
 * Color utility functions
 * Helper functions for color manipulation and conversion
 */

/**
 * Converts hex color to rgba format
 *
 * @param hex - Hex color code (e.g., "#F4F5F2" or "#fff")
 * @param alpha - Alpha value between 0 and 1
 * @returns rgba color string (e.g., "rgba(244, 245, 242, 0.5)")
 *
 * @example
 * ```ts
 * hexToRgba("#F4F5F2", 0.5) // "rgba(244, 245, 242, 0.5)"
 * hexToRgba("#000", 1) // "rgba(0, 0, 0, 1)"
 * ```
 */
export function hexToRgba(hex: string, alpha: number): string {
  // Remove # if present
  const cleanHex = hex.replace("#", "");

  // Handle shorthand hex (e.g., #fff)
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
