export const CHART_COLORS = {
  primary: '#02B9B0', // Teal
  secondary: '#FAC905', // Yellow
  tertiary: '#B774FC', // Purple
  quaternary: '#B3BEBE', // Gray
} as const

// For ordered usage (like in arrays)
export const CHART_COLOR_VALUES = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.tertiary,
  CHART_COLORS.quaternary,
] as const
