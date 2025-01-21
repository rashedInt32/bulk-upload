import { cn } from '@/lib/utils'
import { analyzeDataByKey } from '../../utils/analyzeData'
import { CircleChart } from './circle-chart'
import { LineChart } from './line-chart'
import { ParabolicChart } from './parabolic-chart'
import { CHART_COLOR_VALUES } from './constants'

interface MetricItemProps {
  count: number
  value: string
  variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  total?: number
  color: string
}

const variantStyles = {
  primary: 'before:bg-primary',
  secondary: 'before:bg-yellow-400',
  tertiary: 'before:bg-purple-400',
  quaternary: 'before:bg-grey-300',
}

function MetricItem({
  count,
  value,
  variant,
  total = 0,
  color,
}: MetricItemProps) {
  return (
    <div
      className={cn(
        'pl-3 pr-1 flex  items-center gap-2 relative',
        'before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
        'before:w-1 before:h-4 before:rounded-[4px]',
        variantStyles[variant]
      )}
    >
      <span className="text-sm font-medium text-grey-700">{count}</span>
      <span className="text-sm text-grey-700">{value}</span>
    </div>
  )
}

interface AnalyticsSectionProps {
  title: string
  metrics: {
    count: number
    value: string
  }[]
  chartType?: 'circle' | 'parabolic' | 'line'
}

function formatValue(value: string): string {
  return value.replace(/-/g, ' ')
}

function AnalyticsSection({
  title,
  metrics,
  chartType = 'circle',
}: AnalyticsSectionProps) {
  const sortedMetrics = [...metrics].sort((a, b) => b.count - a.count)
  const highestCount = sortedMetrics[0]?.count || 0

  return (
    <div className="flex-1 flex flex-col justify-between h-full gap-4">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col justify-between h-[96px]">
            <h3 className="text-grey-400 text-sm">{title}</h3>
            <div>
              <p className="text-[36px] font-bold leading-10">{highestCount}</p>
              <p className="text-base font-semibold">
                {formatValue(sortedMetrics[0]?.value)}
              </p>
            </div>
          </div>
          {chartType === 'circle' && <CircleChart metrics={metrics} />}
          {chartType === 'parabolic' && <ParabolicChart metrics={metrics} />}
        </div>

        {chartType === 'line' && <LineChart metrics={metrics} />}
      </div>

      <div className="flex items-center flex-wrap gap-3">
        {sortedMetrics.map((metric, index) => (
          <div key={metric.value} className="pr-1">
            <MetricItem
              color={
                CHART_COLOR_VALUES[index] ||
                CHART_COLOR_VALUES[CHART_COLOR_VALUES.length - 1]
              }
              count={metric.count}
              value={formatValue(metric.value)}
              variant={
                index === 0
                  ? 'primary'
                  : index === 1
                  ? 'secondary'
                  : index === 2
                  ? 'tertiary'
                  : 'quaternary'
              }
              total={highestCount}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface AnalyticsCardProps {
  data: any[]
  analyzeKey: 'Nationality' | 'Employment Type' | 'Status'
  className?: string
  chartType?: 'circle' | 'parabolic' | 'line'
}

export function AnalyticsCard({
  data,
  analyzeKey,
  className,
  chartType = 'circle',
}: AnalyticsCardProps) {
  const getTitleByKey = (key: string) => {
    switch (key) {
      case 'Nationality':
        return 'Nationality'
      case 'Employment Type':
        return 'Employment Type'
      case 'Status':
        return 'Employee Status'
      default:
        return key
    }
  }

  const analyzedData = analyzeDataByKey(data, analyzeKey)

  return (
    <div
      className={cn(
        'bg-white border border-grey-100 rounded-2xl p-4',
        className
      )}
    >
      <AnalyticsSection
        title={getTitleByKey(analyzeKey)}
        metrics={analyzedData}
        chartType={chartType}
      />
    </div>
  )
}
