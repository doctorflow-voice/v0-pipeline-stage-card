"use client"

import { useState } from "react"
import {
  Shield,
  Wrench,
  Scissors,
  Brain,
  CheckCircle,
  Database,
  Target,
  ChevronDown,
  AlertCircle,
  Clock,
} from "lucide-react"

interface PipelineData {
  noteId: string
  noteText: string
  stages: StageStatus[]
  mrsScore?: number
}

interface StageStatus {
  id: number
  status: "planned" | "active" | "processing" | "ready" | "complete" | "waiting"
}

export default function MRSPipelineComplete() {
  const [stages, setStages] = useState({
    stage1: {
      expanded: true,
      enabled: true,
      method: "placeholder",
    },
    stage2: {
      expanded: false,
      stripWhitespace: true,
      normalizeSpacing: true,
      removeSpecialChars: false,
    },
    stage3: {
      expanded: false,
      viewSnippets: false,
    },
    stage4: {
      expanded: false,
      routingStrategy: "auto",
      viewPrompt: false,
    },
    stage5: {
      expanded: false,
      expandedFields: {} as Record<string, boolean>,
    },
    stage6: {
      expanded: false,
      showVersions: false,
    },
    stage7: {
      expanded: false,
      viewEvidence: false,
    },
  })

  const toggleStage = (stage: keyof typeof stages) => {
    setStages((prev) => ({
      ...prev,
      [stage]: { ...prev[stage], expanded: !prev[stage].expanded },
    }))
  }

  return (
    <div className="space-y-4">
      {/* Pipeline Summary Bar */}
      <div className="sticky top-0 z-10 bg-white rounded-xl shadow-md border border-[#e5e7eb] p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            {[
              { num: 1, status: "complete" },
              { num: 2, status: "complete" },
              { num: 3, status: "complete" },
              { num: 4, status: "processing" },
              { num: 5, status: "waiting" },
              { num: 6, status: "waiting" },
              { num: 7, status: "waiting" },
            ].map((stage, idx) => (
              <div key={stage.num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    stage.status === "complete"
                      ? "bg-[#059669] text-white"
                      : stage.status === "processing"
                        ? "bg-[#2563eb] text-white animate-pulse"
                        : "bg-[#e5e7eb] text-[#9ca3af]"
                  }`}
                >
                  {stage.status === "complete" ? "✓" : stage.num}
                </div>
                {idx < 6 && <div className="w-6 h-0.5 bg-[#e5e7eb]" />}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-[#6b7280]">
              Total Time: <span className="font-semibold text-[#111827]">3.8s</span>
            </span>
            <span className="text-[#6b7280]">
              Status: <span className="font-semibold text-[#2563eb]">Processing Stage 4</span>
            </span>
            <span className="text-[#6b7280]">
              mRS: <span className="font-semibold text-[#9ca3af]">Pending</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stage 1: De-Identification */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#fef3c7] to-[#fef3c7] border-b border-[#e5e7eb] cursor-pointer hover:from-[#fde68a] hover:to-[#fde68a] transition-colors"
          onClick={() => toggleStage("stage1")}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#fef3c7] rounded-full">
              <Shield className="w-6 h-6 text-[#92400e]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Stage 1: De-Identification</h2>
              <p className="text-sm text-[#6b7280]">Protect PHI before processing</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-[#f3f4f6] text-[#6b7280]">Can Skip</span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#fef3c7] text-[#92400e]">
              PLANNED
            </span>
            <span className="text-sm text-[#6b7280] font-medium">80KB → 82KB</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transition-transform duration-300 ${stages.stage1.expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${stages.stage1.expanded ? "max-h-[2000px]" : "max-h-0"} overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Alert Box */}
            <div className="flex items-start space-x-3 p-4 bg-[#fef3c7] border border-[#fde68a] rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#92400e] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#78350f]">Required for external API usage. Optional for local models.</p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <span className="text-sm font-medium text-[#111827]">Enable De-Identification</span>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stages.stage1.enabled}
                  onChange={() =>
                    setStages((prev) => ({ ...prev, stage1: { ...prev.stage1, enabled: !prev.stage1.enabled } }))
                  }
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute inset-0 bg-[#d1d5db] rounded-full transition-colors peer-checked:bg-[#2563eb]">
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${stages.stage1.enabled ? "translate-x-5" : "translate-x-0"}`}
                  />
                </span>
              </label>
            </div>

            {/* Radio Group */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#111827]">De-ID Method</h3>
              <div className="space-y-3">
                {[
                  { value: "asterisk", label: "Asterisk Masking", example: "Patient *****, DOB **********" },
                  { value: "placeholder", label: "Placeholder", example: "Patient [NAME], DOB [DATE]" },
                  { value: "philter", label: "Philter Pipeline", example: "Patient Alex Johnson, DOB 03/22/1970" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-[#f9fafb] transition-colors"
                  >
                    <input
                      type="radio"
                      name="deIdMethod"
                      value={option.value}
                      checked={stages.stage1.method === option.value}
                      onChange={() =>
                        setStages((prev) => ({ ...prev, stage1: { ...prev.stage1, method: option.value } }))
                      }
                      className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb] focus:ring-2 mt-0.5"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#111827]">{option.label}</span>
                      <p className="text-xs text-[#6b7280] font-mono mt-1">→ {option.example}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Before/After Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#111827]">Before/After Preview</h3>
              <div className="grid md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
                <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                  <p className="text-xs text-[#6b7280] mb-2 font-semibold">Before</p>
                  <p className="text-sm text-[#374151] font-mono leading-relaxed">
                    Patient John Smith, DOB 01/15/1965, MRN 123456
                  </p>
                </div>
                <div className="flex justify-center">
                  <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="p-4 bg-[#fef3c7] rounded-lg border border-[#fde68a]">
                  <p className="text-xs text-[#92400e] mb-2 font-semibold">After</p>
                  <p className="text-sm text-[#78350f] font-mono leading-relaxed">
                    Patient [NAME], DOB [DATE], MRN [MRN]
                  </p>
                </div>
              </div>
            </div>

            {/* Routing Impact */}
            <div className="space-y-2 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <h3 className="text-sm font-medium text-[#111827] mb-3">Routing Impact</h3>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#059669]" />
                <span className="text-sm text-[#374151]">With De-ID: External API allowed</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-[#d97706]" />
                <span className="text-sm text-[#374151]">Without De-ID: Local only (HIPAA)</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Input</p>
                <p className="text-lg font-semibold text-[#111827]">80KB</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Output</p>
                <p className="text-lg font-semibold text-[#111827]">82KB</p>
              </div>
              <div className="p-3 bg-[#fee2e2] rounded-lg border border-[#fecaca]">
                <p className="text-xs text-[#991b1b] mb-1">Change</p>
                <p className="text-lg font-semibold text-[#dc2626]">+2%</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Time</p>
                <p className="text-lg font-semibold text-[#111827]">0.3s</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex flex-col items-center my-2">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-xs text-[#9ca3af] mt-1">De-identified text</span>
      </div>

      {/* Stage 2: Preprocessing */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] border-b border-[#e5e7eb] cursor-pointer hover:from-[#dbeafe] hover:to-[#bfdbfe] transition-colors"
          onClick={() => toggleStage("stage2")}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#dbeafe] rounded-full">
              <Wrench className="w-6 h-6 text-[#2563eb]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Stage 2: Preprocessing</h2>
              <p className="text-sm text-[#6b7280]">Normalize text for optimal extraction</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#dcfce7] text-[#166534]">
              ACTIVE
            </span>
            <span className="text-sm text-[#6b7280] font-medium">82KB → 78KB</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transition-transform duration-300 ${stages.stage2.expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${stages.stage2.expanded ? "max-h-[2000px]" : "max-h-0"} overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Checkbox Group with preview */}
            <div className="space-y-3">
              {[
                { key: "stripWhitespace", label: "Strip Whitespace", demo: '"Multiple   spaces" → "Multiple spaces"' },
                {
                  key: "normalizeSpacing",
                  label: "Normalize Spacing",
                  demo: '"Line\\n\\n\\n\\nbreaks" → "Line\\n\\nbreaks"',
                },
                {
                  key: "removeSpecialChars",
                  label: "Remove Special Chars",
                  demo: '"Dose: 100mg/day" → "Dose 100mgday"',
                },
              ].map((option) => (
                <label
                  key={option.key}
                  className="flex items-start space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-[#f9fafb] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={stages.stage2[option.key as keyof typeof stages.stage2] as boolean}
                    onChange={() =>
                      setStages((prev) => ({
                        ...prev,
                        stage2: { ...prev.stage2, [option.key]: !prev.stage2[option.key as keyof typeof prev.stage2] },
                      }))
                    }
                    className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb] focus:ring-2 rounded mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-[#111827]">{option.label}</span>
                    <p className="text-xs text-[#6b7280] font-mono mt-1">→ {option.demo}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Real-time Preview */}
            <div className="space-y-2 p-4 bg-[#eff6ff] rounded-lg border border-[#dbeafe]">
              <h3 className="text-sm font-medium text-[#111827]">Real-time Preview</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-[#6b7280]">Before:</span>
                  <p className="text-sm text-[#4b5563] font-mono">"Patient presents with\n\n\n\nweakness"</p>
                </div>
                <div>
                  <span className="text-xs text-[#2563eb]">After:</span>
                  <p className="text-sm text-[#1e40af] font-mono">"Patient presents with\n\nweakness"</p>
                </div>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Characters removed</p>
                <p className="text-lg font-semibold text-[#111827]">4,000</p>
              </div>
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Lines normalized</p>
                <p className="text-lg font-semibold text-[#111827]">342</p>
              </div>
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Token reduction</p>
                <p className="text-lg font-semibold text-[#059669]">5%</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Input</p>
                <p className="text-lg font-semibold text-[#111827]">82KB</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Output</p>
                <p className="text-lg font-semibold text-[#111827]">78KB</p>
              </div>
              <div className="p-3 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                <p className="text-xs text-[#166534] mb-1">Change</p>
                <p className="text-lg font-semibold text-[#059669]">-5%</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Tokens</p>
                <p className="text-sm font-semibold text-[#111827]">20.5K→19.5K</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Time</p>
                <p className="text-lg font-semibold text-[#111827]">0.1s</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex flex-col items-center my-2">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-xs text-[#9ca3af] mt-1">Cleaned text</span>
      </div>

      {/* Stage 3: Snippet Extraction */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#faf5ff] to-[#ede9fe] border-b border-[#e5e7eb] cursor-pointer hover:from-[#ede9fe] hover:to-[#ddd6fe] transition-colors"
          onClick={() => toggleStage("stage3")}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#ede9fe] rounded-full">
              <Scissors className="w-6 h-6 text-[#9333ea]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Stage 3: Snippet Extraction</h2>
              <p className="text-sm text-[#6b7280]">Extract relevant context using keywords</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-[#dcfce7] text-[#166534]">85% reduction</span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#dcfce7] text-[#166534]">
              ACTIVE
            </span>
            <span className="text-sm text-[#6b7280] font-medium">78KB → 12KB</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transition-transform duration-300 ${stages.stage3.expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${stages.stage3.expanded ? "max-h-[3000px]" : "max-h-0"} overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Keywords Found */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#111827]">Keywords Found</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { term: "walking", count: 3 },
                  { term: "gait", count: 2 },
                  { term: "ADL", count: 4 },
                  { term: "wheelchair", count: 1 },
                  { term: "bathing", count: 2 },
                  { term: "dressing", count: 3 },
                  { term: "ambulatory", count: 1 },
                  { term: "assist", count: 5 },
                ].map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-[#ede9fe] text-[#6b21a8] text-sm rounded-full font-medium"
                  >
                    {keyword.term} ({keyword.count})
                  </span>
                ))}
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#111827]">Token Reduction</h3>
                <span className="text-sm font-semibold text-[#9333ea]">85% reduction (66KB saved)</span>
              </div>
              <div className="w-full h-4 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#9333ea] to-[#6b21a8] rounded-full animate-[fillProgress_0.5s_ease-out_forwards]"
                  style={{ width: "85%" }}
                />
              </div>
            </div>

            {/* Extraction Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Total matches</p>
                <p className="text-lg font-semibold text-[#111827]">15</p>
              </div>
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Windows extracted</p>
                <p className="text-lg font-semibold text-[#111827]">12</p>
              </div>
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Overlaps merged</p>
                <p className="text-lg font-semibold text-[#111827]">3</p>
              </div>
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Avg context</p>
                <p className="text-lg font-semibold text-[#111827]">±500</p>
              </div>
            </div>

            {/* Expandable Snippets */}
            <div className="space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setStages((prev) => ({
                    ...prev,
                    stage3: { ...prev.stage3, viewSnippets: !prev.stage3.viewSnippets },
                  }))
                }}
                className="flex items-center justify-between w-full p-4 bg-[#faf5ff] rounded-lg border border-[#ede9fe] hover:border-[#9333ea] transition-colors"
              >
                <span className="text-sm font-medium text-[#111827]">View Extracted Snippets</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#9ca3af] transition-transform duration-300 ${stages.stage3.viewSnippets ? "rotate-180" : ""}`}
                />
              </button>

              {stages.stage3.viewSnippets && (
                <div className="space-y-3">
                  {[
                    {
                      lines: "45-52",
                      text: "...patient ambulates with walker independently around the house. Requires minimal assistance for outdoor activities...",
                    },
                    {
                      lines: "134-140",
                      text: "...ADLs: bathing and dressing require minimal assist. Can perform toileting independently...",
                    },
                    {
                      lines: "203-208",
                      text: "...gait is steady with assistive device. Patient demonstrates good balance with walker support...",
                    },
                  ].map((snippet, index) => (
                    <div key={index} className="p-4 bg-[#faf5ff] rounded-lg border border-[#ede9fe]">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-semibold text-[#9333ea]">Snippet {index + 1}</span>
                        <span className="text-xs text-[#6b7280]">lines {snippet.lines}</span>
                      </div>
                      <p className="text-sm text-[#4b5563] font-mono leading-relaxed">{snippet.text}</p>
                    </div>
                  ))}
                  <p className="text-xs text-[#6b7280] text-center pt-2">[+ 10 more snippets]</p>
                </div>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Input</p>
                <p className="text-lg font-semibold text-[#111827]">78KB</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Output</p>
                <p className="text-lg font-semibold text-[#111827]">12KB</p>
              </div>
              <div className="p-3 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                <p className="text-xs text-[#166534] mb-1">Change</p>
                <p className="text-lg font-semibold text-[#059669]">-85%</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Time</p>
                <p className="text-lg font-semibold text-[#111827]">0.2s</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex flex-col items-center my-2">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-xs text-[#9ca3af] mt-1">Relevant context</span>
      </div>

      {/* Stage 4: LLM Inference */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#e0f2fe] to-[#bae6fd] border-b border-[#e5e7eb] cursor-pointer hover:from-[#bae6fd] hover:to-[#7dd3fc] transition-colors"
          onClick={() => toggleStage("stage4")}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#bae6fd] rounded-full">
              <Brain className="w-6 h-6 text-[#0891b2]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Stage 4: LLM Inference</h2>
              <p className="text-sm text-[#6b7280]">Generate field extractions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#dbeafe] text-[#1e40af]">
              READY
            </span>
            <span className="text-sm text-[#6b7280] font-medium">12KB input</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transition-transform duration-300 ${stages.stage4.expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${stages.stage4.expanded ? "max-h-[3000px]" : "max-h-0"} overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Model Comparison Panel */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#f9fafb] rounded-lg border-2 border-[#e5e7eb]">
                <h3 className="text-sm font-semibold text-[#111827] mb-3">Local: Gemma 7B</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6b7280]">Cost</span>
                    <span className="text-sm font-semibold text-[#059669]">$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6b7280]">Speed</span>
                    <span className="text-sm font-semibold text-[#111827]">2.5s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6b7280]">Quality</span>
                    <span className="text-sm font-semibold text-[#111827]">85%</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <CheckCircle className="w-4 h-4 text-[#059669]" />
                    <span className="text-xs text-[#059669] font-medium">Ready</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#e0f2fe] rounded-lg border-2 border-[#0891b2]">
                <h3 className="text-sm font-semibold text-[#111827] mb-3">External: Gemini</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6b7280]">Cost</span>
                    <span className="text-sm font-semibold text-[#dc2626]">$0.03</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6b7280]">Speed</span>
                    <span className="text-sm font-semibold text-[#059669]">0.8s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6b7280]">Quality</span>
                    <span className="text-sm font-semibold text-[#059669]">92%</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <AlertCircle className="w-4 h-4 text-[#d97706]" />
                    <span className="text-xs text-[#d97706] font-medium">Need De-ID</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Routing Strategy */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#111827]">Routing Strategy</h3>
              <div className="space-y-2">
                {[
                  { value: "auto", label: "Auto-route (recommended)", desc: "Chooses best based on note type" },
                  { value: "local", label: "Force Local", desc: "Always use Gemma 7B" },
                  { value: "external", label: "Force External", desc: "Always use Gemini (requires de-ID)" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-[#f9fafb] transition-colors"
                  >
                    <input
                      type="radio"
                      name="routingStrategy"
                      value={option.value}
                      checked={stages.stage4.routingStrategy === option.value}
                      onChange={() =>
                        setStages((prev) => ({ ...prev, stage4: { ...prev.stage4, routingStrategy: option.value } }))
                      }
                      className="w-4 h-4 text-[#0891b2] focus:ring-[#0891b2] focus:ring-2 mt-0.5"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#111827]">{option.label}</span>
                      <p className="text-xs text-[#6b7280] mt-1">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Live Generation Display */}
            <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <h3 className="text-sm font-medium text-[#111827] mb-3">Extracting: walking_ability</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded border border-[#e5e7eb]">
                  <p className="text-sm text-[#374151] font-mono">
                    Streaming: "With he<span className="animate-pulse">|</span>"
                  </p>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0891b2] to-[#0e7490]" style={{ width: "31%" }} />
                </div>
                <div className="flex justify-between text-xs text-[#6b7280]">
                  <span>Token: 47/150</span>
                  <span>Elapsed: 1.2s</span>
                </div>
              </div>
            </div>

            {/* Batch Progress */}
            <div className="space-y-3 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <h3 className="text-sm font-medium text-[#111827] mb-2">Fields processed: 4/5</h3>
              <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#059669] to-[#047857]" style={{ width: "80%" }} />
              </div>
              <div className="space-y-2 mt-3">
                {[
                  { field: "walking_ability", status: "complete", time: "0.8s" },
                  { field: "self_care_adls", status: "complete", time: "0.9s" },
                  { field: "usual_activities", status: "complete", time: "0.7s" },
                  { field: "residual_symptoms", status: "complete", time: "0.6s" },
                  { field: "vital_status", status: "processing", time: "-" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-[#6b7280] font-mono">{item.field}</span>
                    <div className="flex items-center space-x-2">
                      {item.status === "complete" ? (
                        <CheckCircle className="w-3 h-3 text-[#059669]" />
                      ) : (
                        <Clock className="w-3 h-3 text-[#2563eb] animate-spin" />
                      )}
                      <span className="text-[#6b7280]">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View Prompt */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setStages((prev) => ({ ...prev, stage4: { ...prev.stage4, viewPrompt: !prev.stage4.viewPrompt } }))
              }}
              className="flex items-center justify-between w-full p-4 bg-[#e0f2fe] rounded-lg border border-[#0891b2] hover:bg-[#bae6fd] transition-colors"
            >
              <span className="text-sm font-medium text-[#111827]">View Full Prompt</span>
              <ChevronDown
                className={`w-4 h-4 text-[#0891b2] transition-transform duration-300 ${stages.stage4.viewPrompt ? "rotate-180" : ""}`}
              />
            </button>

            {stages.stage4.viewPrompt && (
              <div className="p-4 bg-[#1f2937] rounded-lg text-sm font-mono text-[#e5e7eb] overflow-x-auto">
                <pre className="whitespace-pre-wrap">{`{
  "model": "gemma-7b",
  "prompt": "Extract walking ability from:\\n[SNIPPET TEXT]...",
  "temperature": 0.1,
  "max_tokens": 150
}`}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex flex-col items-center my-2">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-xs text-[#9ca3af] mt-1">Raw LLM outputs</span>
      </div>

      {/* Stage 5: Validation & Retry */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#dcfce7] via-[#f9fafb] to-[#fee2e2] border-b border-[#e5e7eb] cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => toggleStage("stage5")}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#dcfce7] rounded-full">
              <CheckCircle className="w-6 h-6 text-[#059669]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Stage 5: Validation & Retry</h2>
              <p className="text-sm text-[#6b7280]">Verify and fix invalid responses</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#dbeafe] text-[#1e40af]">
              PROCESSING
            </span>
            <span className="text-sm text-[#6b7280] font-medium">4/5 passed</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transition-transform duration-300 ${stages.stage5.expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${stages.stage5.expanded ? "max-h-[3000px]" : "max-h-0"} overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Validation Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e5e7eb]">
                    <th className="text-left p-3 text-[#6b7280] font-medium">Field</th>
                    <th className="text-center p-3 text-[#6b7280] font-medium">Try 1</th>
                    <th className="text-center p-3 text-[#6b7280] font-medium">Try 2</th>
                    <th className="text-center p-3 text-[#6b7280] font-medium">Try 3</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { field: "walking_ability", try1: "pass", try2: null, try3: null },
                    { field: "self_care_adls", try1: "fail", try2: "pass", try3: null },
                    { field: "usual_activities", try1: "pass", try2: null, try3: null },
                    { field: "residual_symptoms", try1: "fail", try2: "fail", try3: "queue" },
                    { field: "vital_status", try1: "pass", try2: null, try3: null },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-3 font-mono text-[#374151]">{row.field}</td>
                      <td className="p-3 text-center">
                        {row.try1 === "pass" && <span className="text-lg">✅</span>}
                        {row.try1 === "fail" && <span className="text-lg">❌</span>}
                      </td>
                      <td className="p-3 text-center">
                        {row.try2 === "pass" && <span className="text-lg">✅</span>}
                        {row.try2 === "fail" && <span className="text-lg">❌</span>}
                      </td>
                      <td className="p-3 text-center">{row.try3 === "queue" && <span className="text-lg">🔄</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center space-x-6 text-xs text-[#6b7280] p-3 bg-[#f9fafb] rounded-lg">
              <span className="flex items-center space-x-1">
                <span className="text-lg">✅</span>
                <span>Valid</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-lg">❌</span>
                <span>Invalid</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-lg">🔄</span>
                <span>Retry Queue</span>
              </span>
            </div>

            {/* Failed Field Detail - residual_symptoms */}
            <div className="space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setStages((prev) => ({
                    ...prev,
                    stage5: {
                      ...prev.stage5,
                      expandedFields: {
                        ...prev.stage5.expandedFields,
                        residual_symptoms: !prev.stage5.expandedFields.residual_symptoms,
                      },
                    },
                  }))
                }}
                className="flex items-center justify-between w-full p-4 bg-[#fee2e2] rounded-lg border border-[#fecaca] hover:bg-[#fecaca] transition-colors"
              >
                <span className="text-sm font-medium text-[#991b1b]">residual_symptoms - View Failures</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#dc2626] transition-transform duration-300 ${stages.stage5.expandedFields?.residual_symptoms ? "rotate-180" : ""}`}
                />
              </button>

              {stages.stage5.expandedFields?.residual_symptoms && (
                <div className="space-y-3 pl-4">
                  <div className="p-4 bg-[#fef3c7] rounded-lg border border-[#fde68a]">
                    <h4 className="text-xs font-semibold text-[#92400e] mb-2">Attempt 1:</h4>
                    <p className="text-xs text-[#78350f] mb-1">
                      <strong>Response:</strong> "Yes probably"
                    </p>
                    <p className="text-xs text-[#78350f] mb-1">
                      <strong>Expected:</strong> ^(Yes|No|Unknown)$
                    </p>
                    <p className="text-xs text-[#dc2626] font-semibold">❌ Failed: Pattern mismatch</p>
                  </div>
                  <div className="p-4 bg-[#fef3c7] rounded-lg border border-[#fde68a]">
                    <h4 className="text-xs font-semibold text-[#92400e] mb-2">Attempt 2 (with nudge):</h4>
                    <p className="text-xs text-[#78350f] mb-1">
                      <strong>Prompt:</strong> "IMPORTANT: Answer ONLY: Yes, No, or Unknown"
                    </p>
                    <p className="text-xs text-[#78350f] mb-1">
                      <strong>Response:</strong> "Unknown based on note"
                    </p>
                    <p className="text-xs text-[#dc2626] font-semibold">❌ Failed: Extra text after answer</p>
                  </div>
                  <div className="p-4 bg-[#dbeafe] rounded-lg border border-[#bfdbfe]">
                    <h4 className="text-xs font-semibold text-[#1e40af] mb-2">Attempt 3:</h4>
                    <p className="text-xs text-[#2563eb]">⏳ Queued for manual review (Position #3)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Success Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">First-try success</p>
                <p className="text-2xl font-bold text-[#111827]">60%</p>
                <p className="text-xs text-[#6b7280]">3/5 fields</p>
              </div>
              <div className="p-4 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                <p className="text-xs text-[#166534] mb-1">After retries</p>
                <p className="text-2xl font-bold text-[#059669]">80%</p>
                <p className="text-xs text-[#166534]">4/5 fields</p>
              </div>
              <div className="p-4 bg-[#fee2e2] rounded-lg border border-[#fecaca]">
                <p className="text-xs text-[#991b1b] mb-1">Manual review</p>
                <p className="text-2xl font-bold text-[#dc2626]">1</p>
                <p className="text-xs text-[#991b1b]">field queued</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex flex-col items-center my-2">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-xs text-[#9ca3af] mt-1">Validated responses</span>
      </div>

      {/* Stage 6: Cache Storage */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] border-b border-[#e5e7eb] cursor-pointer hover:from-[#f3f4f6] hover:to-[#e5e7eb] transition-colors"
          onClick={() => toggleStage("stage6")}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#e5e7eb] rounded-full">
              <Database className="w-6 h-6 text-[#4b5563]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Stage 6: Cache Storage</h2>
              <p className="text-sm text-[#6b7280]">Save results to disk</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#dcfce7] text-[#166534]">
              COMPLETE
            </span>
            <span className="text-sm text-[#6b7280] font-medium">2 files saved</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transition-transform duration-300 ${stages.stage6.expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${stages.stage6.expanded ? "max-h-[2000px]" : "max-h-0"} overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* File Operations Log */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#111827]">File Operations Log</h3>
              <div className="space-y-2">
                <div className="p-4 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#166534]">[2025-12-16 04:12:17] JSON saved</span>
                      </div>
                      <p className="text-xs text-[#047857] font-mono">Path: /mrs_cache/118477832_b16a1a4961...json</p>
                      <p className="text-xs text-[#047857]">Size: 3.2 KB | Fields: 5</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#166534]">[2025-12-16 04:12:17] CSV saved</span>
                      </div>
                      <p className="text-xs text-[#047857] font-mono">Path: /mrs_cache/b16a1a4961...csv</p>
                      <p className="text-xs text-[#047857]">Size: 2.8 KB | Format: HIPAA-compliant (no patient ID)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Storage Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Cache directory</p>
                <p className="text-lg font-semibold text-[#111827]">247 files</p>
              </div>
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Total size</p>
                <p className="text-lg font-semibold text-[#111827]">1.2 GB</p>
              </div>
              <div>
                <p className="text-xs text-[#6b7280] mb-1">This session</p>
                <p className="text-lg font-semibold text-[#059669]">+6 KB</p>
              </div>
            </div>

            {/* Version History */}
            <div className="space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setStages((prev) => ({
                    ...prev,
                    stage6: { ...prev.stage6, showVersions: !prev.stage6.showVersions },
                  }))
                }}
                className="flex items-center justify-between w-full p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] hover:border-[#4b5563] transition-colors"
              >
                <span className="text-sm font-medium text-[#111827]">Version History</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#9ca3af] transition-transform duration-300 ${stages.stage6.showVersions ? "rotate-180" : ""}`}
                />
              </button>

              {stages.stage6.showVersions && (
                <div className="space-y-2 pl-4">
                  <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                    <p className="text-xs text-[#6b7280]">Run 1: 2025-12-15 14:23:11 - 4/5 fields</p>
                  </div>
                  <div className="p-3 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                    <p className="text-xs text-[#166534] font-semibold">
                      Run 2: 2025-12-16 04:12:17 - 5/5 fields ← Current
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex flex-col items-center my-2">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-xs text-[#9ca3af] mt-1">Cached data</span>
      </div>

      {/* Stage 7: mRS Calculation */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border-b border-[#e5e7eb] cursor-pointer hover:from-[#e0e7ff] hover:to-[#ddd6fe] transition-colors"
          onClick={() => toggleStage("stage7")}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#e0e7ff] rounded-full">
              <Target className="w-6 h-6 text-[#4f46e5]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Stage 7: mRS Score Calculation</h2>
              <p className="text-sm text-[#6b7280]">Deterministic scoring from components</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-4 py-2 text-lg font-bold rounded-lg bg-[#4f46e5] text-white shadow-md">mRS 3</span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#dcfce7] text-[#166534]">
              COMPLETE
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transition-transform duration-300 ${stages.stage7.expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${stages.stage7.expanded ? "max-h-[3000px]" : "max-h-0"} overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Decision Tree */}
            <div className="p-6 bg-[#f9fafb] rounded-lg border-2 border-[#e5e7eb]">
              <h3 className="text-sm font-semibold text-[#111827] mb-4">Decision Tree</h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b7280]">Death?</span>
                  <span className="text-[#9ca3af]">──Yes──&gt;</span>
                  <span className="text-[#9ca3af]">mRS 6</span>
                </div>
                <div className="pl-6 flex items-start space-x-2">
                  <span className="text-[#059669]">✅ No</span>
                  <span className="text-[#6b7280]">(vital_status = No)</span>
                </div>
                <div className="pl-6 text-[#9ca3af]">↓</div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b7280]">Can Walk?</span>
                  <span className="text-[#9ca3af]">──No──&gt;</span>
                  <span className="text-[#9ca3af]">mRS 5</span>
                </div>
                <div className="pl-6 flex items-start space-x-2">
                  <span className="text-[#d97706]">⚠️ With help</span>
                  <span className="text-[#6b7280]">(walking_ability = With help)</span>
                </div>
                <div className="pl-6 text-[#9ca3af]">↓</div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#6b7280]">ADLs?</span>
                  <span className="text-[#9ca3af]">──────────┐</span>
                </div>
                <div className="pl-6 flex items-start space-x-2">
                  <span className="text-[#4f46e5] font-bold">⭐ Partially</span>
                  <span className="text-[#9ca3af]">│</span>
                </div>
                <div className="pl-6 text-[#9ca3af]">↓ Full</div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#4f46e5] font-bold text-lg">mRS 3 ◄────────┘</span>
                </div>
                <div className="pl-6 text-[#4f46e5] font-bold">[YOU ARE HERE]</div>
              </div>
            </div>

            {/* Component Fields */}
            <div className="overflow-x-auto">
              <h3 className="text-sm font-semibold text-[#111827] mb-3">Component Fields Contributing</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e5e7eb]">
                    <th className="text-left p-3 text-[#6b7280] font-medium">Field</th>
                    <th className="text-left p-3 text-[#6b7280] font-medium">Answer</th>
                    <th className="text-left p-3 text-[#6b7280] font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { field: "vital_status_death", answer: "No", conf: 0.95, status: "high" },
                    { field: "walking_ability", answer: "With help", conf: 0.92, status: "high" },
                    { field: "self_care_adls", answer: "Partially", conf: 0.88, status: "med" },
                    { field: "usual_activities_iadls", answer: "Partially", conf: 0.85, status: "med" },
                    { field: "residual_symptoms", answer: "Yes", conf: 0.9, status: "high" },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-[#f3f4f6]">
                      <td className="p-3 font-mono text-[#374151]">{row.field}</td>
                      <td className="p-3 text-[#111827] font-medium">{row.answer}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span className={row.status === "high" ? "text-[#059669]" : "text-[#d97706]"}>
                            {row.conf}
                          </span>
                          <span className="text-lg">{row.status === "high" ? "✅" : "⚠️"}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-[#6b7280] mt-3">
                Overall Confidence: <span className="font-semibold">0.85</span> (lowest field)
              </p>
            </div>

            {/* Score Explanation */}
            <div className="p-6 bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] rounded-lg border-2 border-[#4f46e5]">
              <h3 className="text-lg font-bold text-[#4f46e5] mb-3">📊 mRS 3: Moderate Disability</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-[#111827] mb-2">Why this score?</p>
                  <ul className="space-y-1 pl-4">
                    <li className="text-[#374151]">✓ Patient is alive (not mRS 6)</li>
                    <li className="text-[#374151]">✓ Can walk but needs human assistance</li>
                    <li className="text-[#4f46e5] font-semibold">⭐ Needs help with SOME ADLs (bathing, dressing)</li>
                    <li className="text-[#374151]">✓ This combination = mRS 3</li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#c7d2fe]">
                  <p className="font-semibold text-[#111827] mb-2">Clinical Interpretation:</p>
                  <p className="text-[#4b5563] italic">
                    "Patient requires some assistance but can walk with help. Dependent for some activities of daily
                    living."
                  </p>
                </div>
              </div>
            </div>

            {/* Evidence Summary */}
            <div className="space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setStages((prev) => ({
                    ...prev,
                    stage7: { ...prev.stage7, viewEvidence: !prev.stage7.viewEvidence },
                  }))
                }}
                className="flex items-center justify-between w-full p-4 bg-[#eef2ff] rounded-lg border border-[#c7d2fe] hover:border-[#4f46e5] transition-colors"
              >
                <span className="text-sm font-medium text-[#111827]">View Supporting Evidence</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#4f46e5] transition-transform duration-300 ${stages.stage7.viewEvidence ? "rotate-180" : ""}`}
                />
              </button>

              {stages.stage7.viewEvidence && (
                <div className="space-y-3 pl-4">
                  <div className="p-4 bg-[#faf5ff] rounded-lg border border-[#e9d5ff]">
                    <h4 className="text-xs font-semibold text-[#6b21a8] mb-2">Walking Ability:</h4>
                    <p className="text-sm text-[#4b5563] italic">"Patient ambulates with max assist x2"</p>
                  </div>
                  <div className="p-4 bg-[#faf5ff] rounded-lg border border-[#e9d5ff]">
                    <h4 className="text-xs font-semibold text-[#6b21a8] mb-2">Self-Care ADLs:</h4>
                    <p className="text-sm text-[#4b5563] italic">"Needs help with bathing and dressing"</p>
                  </div>
                  <div className="p-4 bg-[#faf5ff] rounded-lg border border-[#e9d5ff]">
                    <h4 className="text-xs font-semibold text-[#6b21a8] mb-2">Usual Activities:</h4>
                    <p className="text-sm text-[#4b5563] italic">"Cannot perform all previous duties"</p>
                  </div>
                </div>
              )}
            </div>

            {/* Alternative Scenarios */}
            <div className="p-4 bg-[#e0f2fe] rounded-lg border border-[#0891b2]">
              <h3 className="text-sm font-semibold text-[#111827] mb-3 flex items-center space-x-2">
                <span>💡</span>
                <span>What would change the score?</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-white rounded border border-[#bae6fd]">
                  <p className="text-[#0e7490]">
                    <strong>If walking_ability = "Yes":</strong>
                  </p>
                  <p className="text-[#374151]">
                    → mRS would be <strong>2</strong> (Slight Disability)
                  </p>
                </div>
                <div className="p-3 bg-white rounded border border-[#bae6fd]">
                  <p className="text-[#0e7490]">
                    <strong>If self_care_adls = "No":</strong>
                  </p>
                  <p className="text-[#374151]">
                    → mRS would be <strong>4</strong> (Moderately Severe)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
