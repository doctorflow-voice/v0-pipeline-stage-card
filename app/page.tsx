import MRSPipelineComplete from "@/components/mrs-pipeline-complete"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Complete MRS Extraction Pipeline</h1>
          <p className="text-[#6b7280]">Monitor all 7 stages from de-identification to final mRS score calculation</p>
        </div>
        <MRSPipelineComplete />
      </div>
    </div>
  )
}
