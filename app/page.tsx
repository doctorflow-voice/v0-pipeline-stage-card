import PipelineStages from "@/components/pipeline-stages"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9fafb] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">MRS Extraction Pipeline</h1>
          <p className="text-[#6b7280]">Monitor and configure the three-stage extraction process</p>
        </div>
        <PipelineStages />
      </div>
    </div>
  )
}
