export const CHART_COLORS = {
  primary: '#00A3B1', // Teal
  secondary: '#FFB800', // Yellow
  tertiary: '#9747FF', // Purple
  quaternary: '#94A3B8', // Gray
} as const

// For ordered usage (like in arrays)
export const CHART_COLOR_VALUES = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.tertiary,
  CHART_COLORS.quaternary,
] as const
