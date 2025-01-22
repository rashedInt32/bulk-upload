import { CHART_COLOR_VALUES } from './constants'

interface CircleChartProps {
  metrics: {
    count: number
    value: string
  }[]
  size?: number
}

export function CircleChart({ metrics, size = 96 }: CircleChartProps) {
  const colors = CHART_COLOR_VALUES
  const radius = size / 2
  const strokeWidth = 6
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const gapSize = 12

  // Calculate total for percentages
  const total = metrics.reduce((acc, curr) => acc + curr.count, 0)

  // Sort metrics by count in descending order
  const sortedMetrics = [...metrics].sort((a, b) => b.count - a.count)

  // Calculate stroke dasharray and offset for each segment
  let currentOffset = 0
  const segments = sortedMetrics.map((metric, index) => {
    const percentage = metric.count / total
    const strokeLength =
      circumference * percentage - circumference * (gapSize / 360)
    const segment = {
      color: colors[index] || colors[colors.length - 1],
      strokeDasharray: `${strokeLength} ${circumference}`,
      strokeDashoffset: -currentOffset,
    }
    currentOffset += strokeLength + circumference * (gapSize / 360)
    return segment
  })

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform rotate-90"
      >
        {segments.map((segment, index) => (
          <circle
            key={index}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={segment.strokeDasharray}
            strokeDashoffset={segment.strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        ))}
      </svg>
    </div>
  )
}
