import { CHART_COLOR_VALUES } from './constants'

interface LineChartProps {
  metrics: {
    count: number
    value: string
  }[]
}

export function LineChart({ metrics }: LineChartProps) {
  const colors = CHART_COLOR_VALUES
  const sortedMetrics = [...metrics].sort((a, b) => b.count - a.count)
  const height = 10

  return (
    <div className="relative w-full mt-2 ml-[-2px]" style={{ height }}>
      <svg width="100%" height={height} preserveAspectRatio="none">
        {sortedMetrics.map((metric, index) => {
          const totalCount = sortedMetrics.reduce(
            (acc, curr) => acc + curr.count,
            0
          )
          const previousSum = sortedMetrics
            .slice(0, index)
            .reduce((acc, curr) => acc + curr.count, 0)
          const percentage = (metric.count / totalCount) * 100
          const startPosition = (previousSum / totalCount) * 100

          return (
            <rect
              key={index}
              x={`${startPosition}%`}
              y="0"
              width={`${percentage}%`}
              height={height}
              fill={colors[index] || colors[colors.length - 1]}
              rx={height / 2}
              ry={height / 2}
              style={{
                transform: `scaleX(0.95)`,
                transformOrigin: `${startPosition + percentage / 2}% 50%`,
              }}
              className="transition-all duration-500"
            />
          )
        })}
      </svg>
    </div>
  )
}
