/** Light-only design tokens — use these hex values directly in inline styles */
export const colors = {
  bg: "#f8f6f2",
  bgSubtle: "#f3efe8",
  surface: "#ffffff",
  surfaceHover: "#faf8f5",
  surfaceMuted: "#f5f2ec",
  border: "#e7e2da",
  text: "#1c1917",
  textSecondary: "#44403c",
  muted: "#78716c",
  amber: "#d97706",
  amberLight: "#f59e0b",
  white: "#ffffff",
} as const;

export const shadows = {
  sm: "0 1px 3px rgba(28, 25, 23, 0.06), 0 1px 2px rgba(28, 25, 23, 0.04)",
  md: "0 4px 16px rgba(28, 25, 23, 0.08)",
  lg: "0 12px 40px rgba(28, 25, 23, 0.1)",
} as const;
