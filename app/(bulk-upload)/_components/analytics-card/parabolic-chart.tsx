interface ParabolicChartProps {
  metrics: {
    count: number
    value: string
  }[]
  size?: number
}

export function ParabolicChart({ metrics, size = 134 }: ParabolicChartProps) {
  const colors = ['#00A3B1', '#FFB800', '#9747FF', '#94A3B8']
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const gapSize = 12

  // Calculate total for the visible 53%
  const total = metrics.reduce((acc, curr) => acc + curr.count, 0)
  const sortedMetrics = [...metrics].sort((a, b) => b.count - a.count)

  // Calculate lengths for 47% and 53% portions
  const transparentPortion = circumference * 0.47
  const visiblePortion = circumference * 0.53

  let currentOffset = 0
  const segments = sortedMetrics.map((metric, index) => {
    const percentage = metric.count / total
    const segmentLength = visiblePortion * percentage - gapSize

    const segment = {
      offset: currentOffset,
      length: segmentLength,
      color: colors[index] || colors[colors.length - 1],
    }

    currentOffset += segmentLength + gapSize
    return segment
  })

  return (
    <div className="relative mb-[-6px]" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 47% transparent portion */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${transparentPortion} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(180, ${size / 2}, ${size / 2})`}
        />
        {/* 53% visible portions */}
        {segments.map((segment, index) => (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segment.length} ${circumference}`}
            strokeDashoffset={-segment.offset}
            strokeLinecap="round"
            className="transition-all duration-500"
            transform={`rotate(180, ${size / 2}, ${size / 2})`}
          />
        ))}
      </svg>
    </div>
  )
}

// Helper function to convert polar coordinates to cartesian
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}
