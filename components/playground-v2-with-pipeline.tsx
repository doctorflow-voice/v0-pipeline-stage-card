"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, Settings, Target, BarChart3, FileText } from "lucide-react"

type StageStatus = "planned" | "idle" | "processing" | "complete" | "error"

interface StageState {
  status: StageStatus
  expanded: boolean
}

interface PipelineState {
  stage1: StageState
  stage2: StageState
  stage3: StageState
  stage4: StageState
  stage5: StageState
  stage6: StageState
  stage7: StageState
}

export default function PlaygroundV2WithPipeline() {
  const [paramsCollapsed, setParamsCollapsed] = useState(false)
  const [noteCollapsed, setNoteCollapsed] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [currentStage, setCurrentStage] = useState<number | null>(null)
  const [clinicalNote, setClinicalNote] = useState("")

  const [pipelineStatus, setPipelineStatus] = useState<PipelineState>({
    stage1: { status: "planned", expanded: true },
    stage2: { status: "idle", expanded: false },
    stage3: { status: "idle", expanded: false },
    stage4: { status: "idle", expanded: false },
    stage5: { status: "idle", expanded: false },
    stage6: { status: "idle", expanded: false },
    stage7: { status: "idle", expanded: false },
  })

  const handleExtract = () => {
    setParamsCollapsed(true)
    setNoteCollapsed(true)
    setProcessing(true)
    setCurrentStage(1)

    // Simulate pipeline processing
    setTimeout(() => {
      setPipelineStatus((prev) => ({
        ...prev,
        stage1: { ...prev.stage1, status: "processing" },
      }))
    }, 300)
  }

  const toggleStage = (stageNum: keyof PipelineState) => {
    setPipelineStatus((prev) => ({
      ...prev,
      [stageNum]: { ...prev[stageNum], expanded: !prev[stageNum].expanded },
    }))
  }

  const paramsWidth = paramsCollapsed ? "5%" : "20%"
  const noteWidth = noteCollapsed ? "10%" : "20%"
  const pipelineWidth = paramsCollapsed && noteCollapsed ? "85%" : "60%"

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel 1: Parameters Sidebar */}
        <div
          className="border-r border-gray-200 bg-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
          style={{ width: paramsWidth }}
        >
          {!paramsCollapsed ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Parameters</h2>
                <button
                  onClick={() => setParamsCollapsed(true)}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="Collapse parameters"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Model Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Model</label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Gemma 7B (Local)</option>
                    <option>Gemini 2.0 (External)</option>
                    <option>GPT-4</option>
                  </select>
                </div>

                {/* Temperature */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex justify-between">
                    <span>Temperature</span>
                    <span className="text-xs text-gray-500">0.0</span>
                  </label>
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0" className="w-full mt-1" />
                </div>

                {/* Top-p */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex justify-between">
                    <span>Top-p</span>
                    <span className="text-xs text-gray-500">0.95</span>
                  </label>
                  <input type="range" min="0" max="1" step="0.05" defaultValue="0.95" className="w-full mt-1" />
                </div>

                {/* Max Tokens */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Max Tokens</label>
                  <input
                    type="number"
                    defaultValue="4000"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Strategy Queue */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Strategy Queue</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                      <span className="text-sm text-gray-700">Direct Extraction</span>
                      <span className="text-xs text-blue-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4 p-2 pt-4">
              <button
                onClick={() => setParamsCollapsed(false)}
                className="p-2 rounded hover:bg-gray-100"
                title="Expand parameters"
              >
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
              <button title="Parameters" className="p-2 rounded hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
              <button title="Strategy" className="p-2 rounded hover:bg-gray-100">
                <Target className="w-5 h-5 text-gray-500" />
              </button>
              <button title="Stats" className="p-2 rounded hover:bg-gray-100">
                <BarChart3 className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        {/* Panel 2: Clinical Note */}
        <div
          className="border-r border-gray-200 bg-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
          style={{ width: noteWidth }}
        >
          {!noteCollapsed ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Clinical Note</h2>
                <button
                  onClick={() => setNoteCollapsed(true)}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="Collapse clinical note"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 p-4 flex flex-col">
                <textarea
                  className="flex-1 w-full p-3 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Paste clinical note here..."
                  value={clinicalNote}
                  onChange={(e) => setClinicalNote(e.target.value)}
                />

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Characters: {clinicalNote.length.toLocaleString()}</span>
                  <span>Tokens: ~{Math.ceil(clinicalNote.length / 4).toLocaleString()}</span>
                </div>

                <button
                  onClick={handleExtract}
                  disabled={!clinicalNote || processing}
                  className="mt-4 w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>{processing ? "Processing..." : "Extract mRS"}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center p-2 pt-4">
              <button
                onClick={() => setNoteCollapsed(false)}
                className="p-2 rounded hover:bg-gray-100"
                title="Expand note"
              >
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
              <FileText className="w-5 h-5 text-gray-500 mt-4 transform rotate-0" />
              <span className="text-xs mt-2 transform -rotate-0 writing-mode-vertical text-gray-500">Note</span>
            </div>
          )}
        </div>

        {/* Panel 3: Pipeline */}
        <div
          className="bg-gray-50 transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
          style={{ width: pipelineWidth }}
        >
          {!processing ? (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Run extraction to see pipeline stages</h3>
                <p className="text-sm text-gray-500">Enter a clinical note and click Extract to begin</p>
              </div>
            </div>
          ) : (
            <>
              {/* Pipeline Summary Bar */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  {/* Stage Icons */}
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
                      <div key={num} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            pipelineStatus[`stage${num}` as keyof PipelineState].status === "complete"
                              ? "bg-green-600 text-white"
                              : pipelineStatus[`stage${num}` as keyof PipelineState].status === "processing"
                                ? "bg-blue-600 text-white animate-pulse"
                                : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {pipelineStatus[`stage${num}` as keyof PipelineState].status === "complete" ? "✓" : num}
                        </div>
                        {idx < 6 && <div className="w-4 h-0.5 bg-gray-200" />}
                      </div>
                    ))}
                  </div>

                  {/* Status Text */}
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Total: 3.8s</span>
                    <span className="text-gray-500 ml-4">Processing Stage {currentStage}</span>
                    <span className="ml-4 text-blue-600 font-medium">mRS: Pending</span>
                  </div>
                </div>
              </div>

              {/* Pipeline Stages - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Stage 1: De-Identification */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 rounded-lg shadow-sm overflow-hidden">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-yellow-50/50"
                    onClick={() => toggleStage("stage1")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-lg">
                        🛡️
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Stage 1: De-Identification</h3>
                        <p className="text-sm text-gray-600">Protect PHI before processing</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          pipelineStatus.stage1.status === "complete"
                            ? "bg-green-100 text-green-800"
                            : pipelineStatus.stage1.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {pipelineStatus.stage1.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">80KB → 82KB</span>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform ${pipelineStatus.stage1.expanded ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>

                  {pipelineStatus.stage1.expanded && (
                    <div className="p-4 border-t border-yellow-200 bg-white/50">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-700">Enable De-Identification</span>
                        <input type="checkbox" className="toggle w-10 h-5" defaultChecked />
                      </div>

                      <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">De-ID Method</label>
                        <div className="space-y-2">
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name="deid" value="asterisk" className="mr-2" />
                            <span className="text-sm text-gray-700">Asterisk Masking</span>
                          </label>
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name="deid" value="placeholder" defaultChecked className="mr-2" />
                            <span className="text-sm text-gray-700">Placeholder</span>
                          </label>
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name="deid" value="philter" className="mr-2" />
                            <span className="text-sm text-gray-700">Philter Pipeline</span>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Before</p>
                          <p className="text-sm font-mono text-gray-700">Patient John Smith, DOB 01/15/1965...</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                          <p className="text-xs text-yellow-700 mb-2">After</p>
                          <p className="text-sm font-mono text-gray-700">Patient [NAME], DOB [DATE]...</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Input</p>
                          <p className="text-lg font-bold text-gray-900">80KB</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Output</p>
                          <p className="text-lg font-bold text-gray-900">82KB</p>
                        </div>
                        <div className="p-2 bg-red-50 rounded border border-red-200 text-center">
                          <p className="text-xs text-red-600">Change</p>
                          <p className="text-lg font-bold text-red-600">+2%</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="text-lg font-bold text-gray-900">0.3s</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stage 2: Preprocessing */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg shadow-sm overflow-hidden">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-50/50"
                    onClick={() => toggleStage("stage2")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                        🔧
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Stage 2: Preprocessing</h3>
                        <p className="text-sm text-gray-600">Normalize text for optimal extraction</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">IDLE</span>
                      <span className="text-sm text-gray-600">82KB → 78KB</span>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform ${pipelineStatus.stage2.expanded ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>

                  {pipelineStatus.stage2.expanded && (
                    <div className="p-4 border-t border-blue-200 bg-white/50">
                      <div className="space-y-2 mb-4">
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm text-gray-700">Strip Whitespace</span>
                        </label>
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm text-gray-700">Normalize Spacing</span>
                        </label>
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-700">Remove Special Characters</span>
                        </label>
                      </div>

                      <div className="p-3 bg-blue-50 rounded border border-blue-200 mb-4">
                        <p className="text-xs text-blue-600 font-medium mb-2">Preview</p>
                        <div className="space-y-2 text-sm font-mono">
                          <div className="text-gray-600">
                            <span className="text-gray-500">Before:</span> "Patient presents with\n\n\n\nweakness"
                          </div>
                          <div className="text-blue-700">
                            <span className="text-blue-600">After:</span> "Patient presents with\n\nweakness"
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Input</p>
                          <p className="font-bold text-gray-900">82KB</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Output</p>
                          <p className="font-bold text-gray-900">78KB</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded border border-green-200 text-center">
                          <p className="text-xs text-green-600">Change</p>
                          <p className="font-bold text-green-600">-5%</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Tokens</p>
                          <p className="font-bold text-gray-900 text-xs">20.5K→19.5K</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="font-bold text-gray-900">0.1s</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stage 3: Snippet Extraction */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 rounded-lg shadow-sm overflow-hidden">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-purple-50/50"
                    onClick={() => toggleStage("stage3")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                        ✂️
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Stage 3: Snippet Extraction</h3>
                        <p className="text-sm text-gray-600">Extract relevant context using keywords</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">IDLE</span>
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">
                        85% reduction
                      </span>
                      <span className="text-sm text-gray-600">78KB → 12KB</span>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform ${pipelineStatus.stage3.expanded ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>

                  {pipelineStatus.stage3.expanded && (
                    <div className="p-4 border-t border-purple-200 bg-white/50">
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Keywords Found</p>
                        <div className="flex flex-wrap gap-2">
                          {["walking (3)", "gait (2)", "ADL (4)", "wheelchair (1)", "bathing (2)", "dressing (3)"].map(
                            (kw) => (
                              <span key={kw} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                                {kw}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">Token Reduction</span>
                          <span className="font-bold text-purple-600">85% reduction</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: "85%" }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">66KB saved</p>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Input</p>
                          <p className="font-bold text-gray-900">78KB</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Output</p>
                          <p className="font-bold text-gray-900">12KB</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded border border-green-200 text-center">
                          <p className="text-xs text-green-600">Change</p>
                          <p className="font-bold text-green-600">-85%</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200 text-center">
                          <p className="text-xs text-gray-500">Matches</p>
                          <p className="font-bold text-gray-900">15</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stages 4-7 placeholder cards */}
                {[4, 5, 6, 7].map((num) => (
                  <div key={num} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                          {num === 4 ? "🤖" : num === 5 ? "✅" : num === 6 ? "💾" : "🎯"}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Stage {num}:{" "}
                            {num === 4
                              ? "LLM Inference"
                              : num === 5
                                ? "Validation & Retry"
                                : num === 6
                                  ? "Cache Storage"
                                  : "mRS Calculation"}
                          </h3>
                          <p className="text-sm text-gray-500">Coming next...</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">IDLE</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
