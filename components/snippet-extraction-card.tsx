"use client"

import { useState } from "react"
import { Scissors, ChevronDown } from "lucide-react"

export default function SnippetExtractionCard() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [isExpanded, setIsExpanded] = useState(true)

  const keywords = [
    { term: "patient history", count: 12 },
    { term: "symptoms", count: 8 },
    { term: "diagnosis", count: 5 },
    { term: "treatment plan", count: 7 },
    { term: "medications", count: 9 },
  ]

  const beforeSize = 80
  const afterSize = 12
  const reductionPercent = Math.round(((beforeSize - afterSize) / beforeSize) * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-6 bg-gradient-to-r from-[#eff6ff] to-[#eef2ff] border-b border-[#e5e7eb] cursor-pointer hover:from-[#dbeafe] hover:to-[#e0e7ff] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#dbeafe] rounded-lg">
            <Scissors className="w-6 h-6 text-[#2563eb]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Snippet Extraction</h2>
            <p className="text-sm text-[#6b7280]">Extract relevant text segments</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
              isEnabled ? "bg-[#dcfce7] text-[#166534]" : "bg-[#f3f4f6] text-[#374151]"
            }`}
          >
            {isEnabled ? "ENABLED" : "DISABLED"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[#9ca3af] transform transition-transform duration-500 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[2000px]" : "max-h-0"
        } overflow-hidden`}
      >
        <div className="p-6 space-y-6">
          {/* Before/After Metrics */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">Size Reduction</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] mb-1">Before</p>
                <p className="text-2xl font-semibold text-[#111827]">{beforeSize}KB</p>
              </div>
              <div className="p-4 bg-[#eff6ff] rounded-lg border border-[#c3ddfd]">
                <p className="text-xs text-[#2563eb] mb-1">After</p>
                <p className="text-2xl font-semibold text-[#1e40af]">{afterSize}KB</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6b7280]">Reduction Progress</span>
                <span className="text-sm font-semibold text-[#2563eb]">{reductionPercent}%</span>
              </div>
              <div className="w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2563eb] to-[#4f46e5] rounded-full transition-all duration-500"
                  style={{ width: `${reductionPercent}%` }}
                />
              </div>
              <p className="text-xs text-[#6b7280] text-center">{reductionPercent}% size reduction achieved</p>
            </div>
          </div>

          {/* Keywords Found */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">Keywords Found</h3>
              <span className="px-3 py-1 bg-[#dbeafe] text-[#1e40af] text-xs font-medium rounded-full">
                {keywords.length} types
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] hover:border-[#2563eb] hover:shadow-md transition-all duration-200"
                >
                  <span className="text-sm text-[#111827] font-medium">{keyword.term}</span>
                  <span className="px-2 py-1 bg-[#dbeafe] text-[#1e40af] rounded-full text-xs font-semibold">
                    {keyword.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle Control */}
          <div className="pt-4 border-t border-[#e5e7eb]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#111827]">Enable Snippet Extraction</p>
                <p className="text-xs text-[#6b7280] mt-1">Toggle to enable or disable this pipeline stage</p>
              </div>

              {/* Toggle Switch */}
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => setIsEnabled(!isEnabled)}
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute inset-0 bg-[#d1d5db] rounded-full transition-colors peer-checked:bg-[#2563eb]">
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      isEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </label>
            </div>
          </div>

          {/* Statistics Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-[#eff6ff] rounded-lg border border-[#c3ddfd]">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1e40af]">{beforeSize - afterSize}KB</p>
              <p className="text-xs text-[#2563eb] mt-1">Saved</p>
            </div>
            <div className="text-center border-x border-[#c3ddfd]">
              <p className="text-2xl font-bold text-[#1e40af]">{keywords.reduce((sum, k) => sum + k.count, 0)}</p>
              <p className="text-xs text-[#2563eb] mt-1">Total Matches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1e40af]">{reductionPercent}%</p>
              <p className="text-xs text-[#2563eb] mt-1">Efficiency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
