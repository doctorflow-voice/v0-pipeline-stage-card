"use client"

import { useState } from "react"
import { Shield, Wrench, Scissors, ChevronDown } from "lucide-react"

export default function PipelineStages() {
  const [stages, setStages] = useState({
    deId: {
      expanded: false,
      enabled: true,
      method: "placeholder",
    },
    preprocessing: {
      expanded: true,
      stripWhitespace: true,
      normalizeSpacing: true,
      removeSpecialChars: false,
    },
    snippets: {
      expanded: true,
      viewSnippets: false,
    },
  })

  return (
    <div className="space-y-4">
      {/* Stage 1: De-Identification */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#fef3c7] to-[#fef3c7] border-b border-[#e5e7eb] cursor-pointer hover:from-[#fde68a] hover:to-[#fde68a] transition-colors"
          onClick={() =>
            setStages((prev) => ({
              ...prev,
              deId: { ...prev.deId, expanded: !prev.deId.expanded },
            }))
          }
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
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#fef3c7] text-[#92400e]">
              PLANNED
            </span>
            <span className="text-sm text-[#6b7280] font-medium">80KB → 82KB</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transform transition-transform duration-500 ${
                stages.deId.expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            stages.deId.expanded ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Toggle Switch */}
            <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <span className="text-sm font-medium text-[#111827]">Enable De-Identification</span>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stages.deId.enabled}
                  onChange={() =>
                    setStages((prev) => ({
                      ...prev,
                      deId: { ...prev.deId, enabled: !prev.deId.enabled },
                    }))
                  }
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute inset-0 bg-[#d1d5db] rounded-full transition-colors peer-checked:bg-[#2563eb]">
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      stages.deId.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </label>
            </div>

            {/* Radio Group */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#111827]">De-ID Method</h3>
              <div className="space-y-2">
                {[
                  { value: "asterisk", label: "Asterisk Masking" },
                  { value: "placeholder", label: "Placeholder" },
                  { value: "philter", label: "Philter Pipeline" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="deIdMethod"
                      value={option.value}
                      checked={stages.deId.method === option.value}
                      onChange={() =>
                        setStages((prev) => ({
                          ...prev,
                          deId: { ...prev.deId, method: option.value },
                        }))
                      }
                      className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb] focus:ring-2"
                    />
                    <span className="text-sm text-[#4b5563] group-hover:text-[#111827]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Before/After Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-[#111827]">Preview</h3>
              <div className="grid md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
                <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                  <p className="text-xs text-[#6b7280] mb-2">Before</p>
                  <p className="text-sm text-[#374151] font-mono leading-relaxed">
                    Patient John Smith, DOB 01/15/1965, MRN 123456...
                  </p>
                </div>
                <div className="flex justify-center">
                  <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="p-4 bg-[#fef3c7] rounded-lg border border-[#fde68a]">
                  <p className="text-xs text-[#92400e] mb-2">After</p>
                  <p className="text-sm text-[#78350f] font-mono leading-relaxed">
                    Patient [NAME], DOB [DATE], MRN [MRN]...
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Input Size</p>
                <p className="text-lg font-semibold text-[#111827]">80,000</p>
                <p className="text-xs text-[#9ca3af]">chars</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Output Size</p>
                <p className="text-lg font-semibold text-[#111827]">82,000</p>
                <p className="text-xs text-[#9ca3af]">chars</p>
              </div>
              <div className="p-3 bg-[#fee2e2] rounded-lg border border-[#fecaca]">
                <p className="text-xs text-[#991b1b] mb-1">Change</p>
                <p className="text-lg font-semibold text-[#dc2626]">+2%</p>
                <p className="text-xs text-[#dc2626]">(+2KB)</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Processing</p>
                <p className="text-lg font-semibold text-[#111827]">0.3s</p>
                <p className="text-xs text-[#9ca3af]">time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex justify-center my-4">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Stage 2: Preprocessing */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] border-b border-[#e5e7eb] cursor-pointer hover:from-[#dbeafe] hover:to-[#bfdbfe] transition-colors"
          onClick={() =>
            setStages((prev) => ({
              ...prev,
              preprocessing: { ...prev.preprocessing, expanded: !prev.preprocessing.expanded },
            }))
          }
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
              className={`w-5 h-5 text-[#9ca3af] transform transition-transform duration-500 ${
                stages.preprocessing.expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            stages.preprocessing.expanded ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="p-6 space-y-6">
            {/* Checkbox Group */}
            <div className="space-y-3">
              {[
                { key: "stripWhitespace", label: "Strip Whitespace" },
                { key: "normalizeSpacing", label: "Normalize Spacing" },
                { key: "removeSpecialChars", label: "Remove Special Characters" },
              ].map((option) => (
                <label key={option.key} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={stages.preprocessing[option.key as keyof typeof stages.preprocessing] as boolean}
                    onChange={() =>
                      setStages((prev) => ({
                        ...prev,
                        preprocessing: {
                          ...prev.preprocessing,
                          [option.key]: !prev.preprocessing[option.key as keyof typeof prev.preprocessing],
                        },
                      }))
                    }
                    className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb] focus:ring-2 rounded"
                  />
                  <span className="text-sm text-[#4b5563] group-hover:text-[#111827]">{option.label}</span>
                </label>
              ))}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Input Size</p>
                <p className="text-lg font-semibold text-[#111827]">82,000</p>
                <p className="text-xs text-[#9ca3af]">chars</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Output Size</p>
                <p className="text-lg font-semibold text-[#111827]">78,000</p>
                <p className="text-xs text-[#9ca3af]">chars</p>
              </div>
              <div className="p-3 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                <p className="text-xs text-[#166534] mb-1">Change</p>
                <p className="text-lg font-semibold text-[#059669]">-5%</p>
                <p className="text-xs text-[#059669]">(-4KB)</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Tokens</p>
                <p className="text-lg font-semibold text-[#111827]">20.5K</p>
                <p className="text-xs text-[#9ca3af]">→ 19.5K</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Processing</p>
                <p className="text-lg font-semibold text-[#111827]">0.1s</p>
                <p className="text-xs text-[#9ca3af]">time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="flex justify-center my-4">
        <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Stage 3: Snippet Extraction */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-[#faf5ff] to-[#ede9fe] border-b border-[#e5e7eb] cursor-pointer hover:from-[#ede9fe] hover:to-[#ddd6fe] transition-colors"
          onClick={() =>
            setStages((prev) => ({
              ...prev,
              snippets: { ...prev.snippets, expanded: !prev.snippets.expanded },
            }))
          }
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
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#dcfce7] text-[#166534]">
              ACTIVE
            </span>
            <span className="text-sm text-[#6b7280] font-medium">78KB → 12KB</span>
            <ChevronDown
              className={`w-5 h-5 text-[#9ca3af] transform transition-transform duration-500 ${
                stages.snippets.expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            stages.snippets.expanded ? "max-h-[2000px]" : "max-h-0"
          } overflow-hidden`}
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
                ].map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-[#ede9fe] text-[#6b21a8] text-sm rounded-full font-medium">
                    {keyword.term} ({keyword.count})
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#111827]">Token Reduction</h3>
                <span className="text-sm font-semibold text-[#9333ea]">85% reduction</span>
              </div>
              <div className="w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#9333ea] to-[#6b21a8] rounded-full"
                  style={{ width: "85%", animation: "fillProgress 0.5s ease-out forwards" }}
                />
              </div>
              <p className="text-xs text-[#6b7280]">66KB saved</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Input Size</p>
                <p className="text-lg font-semibold text-[#111827]">78,000</p>
                <p className="text-xs text-[#9ca3af]">chars</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Output Size</p>
                <p className="text-lg font-semibold text-[#111827]">12,000</p>
                <p className="text-xs text-[#9ca3af]">chars</p>
              </div>
              <div className="p-3 bg-[#dcfce7] rounded-lg border border-[#bbf7d0]">
                <p className="text-xs text-[#166534] mb-1">Change</p>
                <p className="text-lg font-semibold text-[#059669]">-85%</p>
                <p className="text-xs text-[#059669]">(-66KB)</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Matches</p>
                <p className="text-lg font-semibold text-[#111827]">15</p>
                <p className="text-xs text-[#9ca3af]">found</p>
              </div>
            </div>

            {/* Expandable Snippets */}
            <div className="space-y-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setStages((prev) => ({
                    ...prev,
                    snippets: { ...prev.snippets, viewSnippets: !prev.snippets.viewSnippets },
                  }))
                }}
                className="flex items-center justify-between w-full p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] hover:border-[#9333ea] transition-colors"
              >
                <span className="text-sm font-medium text-[#111827]">View Extracted Snippets</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#9ca3af] transform transition-transform duration-300 ${
                    stages.snippets.viewSnippets ? "rotate-180" : ""
                  }`}
                />
              </button>

              {stages.snippets.viewSnippets && (
                <div className="space-y-2">
                  {[
                    "...patient ambulates with walker independently...",
                    "...ADLs: bathing and dressing require minimal assist...",
                    "...gait is steady with assistive device...",
                  ].map((snippet, index) => (
                    <div key={index} className="p-3 bg-[#faf5ff] rounded-lg border border-[#ede9fe]">
                      <div className="flex items-start space-x-2">
                        <span className="text-xs font-semibold text-[#9333ea]">{index + 1}.</span>
                        <p className="text-sm text-[#4b5563] font-mono leading-relaxed">{snippet}</p>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-[#6b7280] text-center pt-2">(3 more snippets)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
