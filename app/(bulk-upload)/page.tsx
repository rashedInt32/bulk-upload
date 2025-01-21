'use client'
import BulkUpload from './bulk-upload'
import { AnalyticsCard } from './_components/analytics-card'
import { useStore } from './_hooks/useStore'

export default function BulkUploadPage() {
  const fileData = useStore((state) => state.fileData)

  return (
    <div className="min-h-screen w-full flex flex-col p-8 bg-surface2 max-w-[1220px] mx-auto">
      {fileData && (
        <div className="flex gap-4 pb-8">
          <AnalyticsCard
            data={fileData}
            analyzeKey="Nationality"
            className="w-[275px]"
            chartType="circle"
          />
          <AnalyticsCard
            data={fileData}
            analyzeKey="Employment Type"
            className="w-2/5"
            chartType="line"
          />
          <AnalyticsCard
            data={fileData}
            analyzeKey="Status"
            className="flex-1"
            chartType="parabolic"
          />
        </div>
      )}
      <BulkUpload />
    </div>
  )
}
