/** Light-only design tokens — use with CSS variables or inline styles */
export const colors = {
  bg: "#f7f8fa",
  bgSubtle: "#eef0f4",
  surface: "#ffffff",
  surfaceHover: "#fafbfc",
  surfaceMuted: "#f3f4f6",
  border: "rgba(15, 23, 42, 0.06)",
  text: "#0f172a",
  textSecondary: "#475569",
  muted: "#94a3b8",
  amber: "#ea580c",
  amberLight: "#f97316",
  white: "#ffffff",
} as const;

export const shadows = {
  xs: "0 1px 2px rgba(15, 23, 42, 0.04)",
  sm: "0 2px 8px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.04)",
  md: "0 4px 20px rgba(15, 23, 42, 0.07), 0 2px 6px rgba(15, 23, 42, 0.04)",
  lg: "0 12px 40px rgba(15, 23, 42, 0.09), 0 4px 12px rgba(15, 23, 42, 0.04)",
  glow: "0 8px 28px rgba(249, 115, 22, 0.28)",
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 20,
  pill: 999,
} as const;

export const sidebarWidth = 260;
