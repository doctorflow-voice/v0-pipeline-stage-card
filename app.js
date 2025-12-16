// State management
const state = {
  paramsCollapsed: false,
  noteCollapsed: false,
  processing: false,
  currentStage: null,
  clinicalNote: "",
  temperature: 0,
  topP: 0.95,
  pipelineStatus: {
    stage1: { status: "planned", expanded: true },
    stage2: { status: "idle", expanded: false },
    stage3: { status: "idle", expanded: false },
    stage4: { status: "idle", expanded: false },
    stage5: { status: "idle", expanded: false },
    stage6: { status: "idle", expanded: false },
    stage7: { status: "idle", expanded: false },
  },
}

// DOM Elements
const elements = {
  paramsPanel: document.getElementById("params-panel"),
  notePanel: document.getElementById("note-panel"),
  pipelinePanel: document.getElementById("pipeline-panel"),
  paramsExpanded: document.getElementById("params-expanded"),
  paramsCollapsed: document.getElementById("params-collapsed"),
  noteExpanded: document.getElementById("note-expanded"),
  noteCollapsed: document.getElementById("note-collapsed"),
  pipelineEmpty: document.getElementById("pipeline-empty"),
  pipelineContent: document.getElementById("pipeline-content"),
  clinicalNote: document.getElementById("clinical-note"),
  extractBtn: document.getElementById("extract-btn"),
  charCount: document.getElementById("char-count"),
  tokenCount: document.getElementById("token-count"),
  tempSlider: document.getElementById("temp-slider"),
  tempValue: document.getElementById("temp-value"),
  toppSlider: document.getElementById("topp-slider"),
  toppValue: document.getElementById("topp-value"),
  stageIndicators: document.getElementById("stage-indicators"),
  stagesContainer: document.getElementById("stages-container"),
  currentStageEl: document.getElementById("current-stage"),
  mrsScore: document.getElementById("mrs-score"),
  totalTime: document.getElementById("total-time"),
}

// Lucide icon library initialization
const lucide = window.lucide

// Initialize
function init() {
  setupEventListeners()
  updatePanelWidths()
  renderStageIndicators()
  renderStages()
}

// Event Listeners
function setupEventListeners() {
  // Panel collapse/expand
  document.getElementById("collapse-params").addEventListener("click", () => {
    state.paramsCollapsed = true
    updatePanels()
  })

  document.getElementById("expand-params").addEventListener("click", () => {
    state.paramsCollapsed = false
    updatePanels()
  })

  document.getElementById("collapse-note").addEventListener("click", () => {
    state.noteCollapsed = true
    updatePanels()
  })

  document.getElementById("expand-note").addEventListener("click", () => {
    state.noteCollapsed = false
    updatePanels()
  })

  // Clinical note input
  elements.clinicalNote.addEventListener("input", (e) => {
    state.clinicalNote = e.target.value
    updateCounts()
    elements.extractBtn.disabled = !state.clinicalNote || state.processing
  })

  // Sliders
  elements.tempSlider.addEventListener("input", (e) => {
    state.temperature = Number.parseFloat(e.target.value)
    elements.tempValue.textContent = state.temperature.toFixed(1)
  })

  elements.toppSlider.addEventListener("input", (e) => {
    state.topP = Number.parseFloat(e.target.value)
    elements.toppValue.textContent = state.topP.toFixed(2)
  })

  // Extract button
  elements.extractBtn.addEventListener("click", handleExtract)
}

// Update panel visibility
function updatePanels() {
  if (state.paramsCollapsed) {
    elements.paramsExpanded.classList.add("hidden")
    elements.paramsCollapsed.classList.remove("hidden")
    elements.paramsCollapsed.classList.add("flex")
  } else {
    elements.paramsExpanded.classList.remove("hidden")
    elements.paramsCollapsed.classList.add("hidden")
    elements.paramsCollapsed.classList.remove("flex")
  }

  if (state.noteCollapsed) {
    elements.noteExpanded.classList.add("hidden")
    elements.noteCollapsed.classList.remove("hidden")
    elements.noteCollapsed.classList.add("flex")
  } else {
    elements.noteExpanded.classList.remove("hidden")
    elements.noteCollapsed.classList.add("hidden")
    elements.noteCollapsed.classList.remove("flex")
  }

  updatePanelWidths()
}

// Update panel widths
function updatePanelWidths() {
  const paramsWidth = state.paramsCollapsed ? "5%" : "20%"
  const noteWidth = state.noteCollapsed ? "10%" : "20%"
  const pipelineWidth = state.paramsCollapsed && state.noteCollapsed ? "85%" : "60%"

  elements.paramsPanel.style.width = paramsWidth
  elements.notePanel.style.width = noteWidth
  elements.pipelinePanel.style.width = pipelineWidth
}

// Update character and token counts
function updateCounts() {
  const charCount = state.clinicalNote.length
  const tokenCount = Math.ceil(charCount / 4)

  elements.charCount.textContent = charCount.toLocaleString()
  elements.tokenCount.textContent = tokenCount.toLocaleString()
}

// Handle extract button click
function handleExtract() {
  state.paramsCollapsed = true
  state.noteCollapsed = true
  state.processing = true
  state.currentStage = 1

  updatePanels()

  // Show pipeline content
  elements.pipelineEmpty.classList.add("hidden")
  elements.pipelineContent.classList.remove("hidden")

  elements.extractBtn.disabled = true
  elements.extractBtn.querySelector("span").textContent = "Processing..."

  // Simulate pipeline processing
  setTimeout(() => {
    state.pipelineStatus.stage1.status = "processing"
    renderStageIndicators()
    renderStages()
  }, 300)

  // Simulate stage progression (for demo purposes)
  simulateStageProgression()
}

// Simulate stage progression
function simulateStageProgression() {
  const stages = ["stage1", "stage2", "stage3", "stage4", "stage5", "stage6", "stage7"]
  let stageIndex = 0

  const interval = setInterval(() => {
    if (stageIndex > 0) {
      state.pipelineStatus[stages[stageIndex - 1]].status = "complete"
    }

    if (stageIndex < stages.length) {
      state.pipelineStatus[stages[stageIndex]].status = "processing"
      state.currentStage = stageIndex + 1
      elements.currentStageEl.textContent = state.currentStage

      renderStageIndicators()
      renderStages()

      stageIndex++
    } else {
      clearInterval(interval)
      state.processing = false
      elements.extractBtn.disabled = false
      elements.extractBtn.querySelector("span").textContent = "Extract mRS"
      elements.mrsScore.textContent = "3"
      elements.totalTime.textContent = "3.8s"
    }
  }, 1000)
}

// Render stage indicators
function renderStageIndicators() {
  const indicators = []

  for (let i = 1; i <= 7; i++) {
    const stageKey = `stage${i}`
    const status = state.pipelineStatus[stageKey].status

    let className = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold "
    let content = i

    if (status === "complete") {
      className += "bg-green-600 text-white"
      content = "✓"
    } else if (status === "processing") {
      className += "bg-blue-600 text-white animate-pulse"
    } else {
      className += "bg-gray-200 text-gray-500"
    }

    indicators.push(`
      <div class="flex items-center">
        <div class="${className}">${content}</div>
        ${i < 7 ? '<div class="w-4 h-0.5 bg-gray-200"></div>' : ""}
      </div>
    `)
  }

  elements.stageIndicators.innerHTML = indicators.join("")
}

// Render pipeline stages
function renderStages() {
  const stagesHTML = `
    ${renderStage1()}
    <div class="flex flex-col items-center my-2">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
      <span class="text-xs text-gray-500 mt-1">De-identified text</span>
    </div>
    ${renderStage2()}
    <div class="flex flex-col items-center my-2">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
      <span class="text-xs text-gray-500 mt-1">Cleaned text</span>
    </div>
    ${renderStage3()}
  `

  elements.stagesContainer.innerHTML = stagesHTML

  // Re-attach event listeners for stage toggles
  document.querySelectorAll("[data-stage-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const stageKey = btn.dataset.stageToggle
      state.pipelineStatus[stageKey].expanded = !state.pipelineStatus[stageKey].expanded
      renderStages()
    })
  })

  // Reinitialize Lucide icons
  if (lucide) {
    lucide.createIcons()
  }
}

// Render Stage 1: De-Identification
function renderStage1() {
  const stage = state.pipelineStatus.stage1
  const statusBadge = getStatusBadge(stage.status)
  const chevronClass = stage.expanded ? "rotate-180" : ""
  const contentClass = stage.expanded ? "expanded" : ""

  return `
    <div class="stage-card">
      <div class="stage-header bg-gradient-yellow" data-stage-toggle="stage1">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-yellow-50 rounded-full">
            <i data-lucide="shield" class="w-6 h-6 text-gray-700"></i>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Stage 1: De-Identification</h2>
            <p class="text-sm text-gray-600">Protect PHI before processing</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <span class="badge ${statusBadge}">${stage.status.toUpperCase()}</span>
          <span class="text-sm text-gray-600 font-medium">80KB → 82KB</span>
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray-400 transition-transform duration-300 ${chevronClass}"></i>
        </div>
      </div>
      
      <div class="stage-content ${contentClass}">
        <div class="stage-content-inner">
          <div class="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <i data-lucide="alert-circle" class="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5"></i>
            <p class="text-sm text-gray-700">Required for external API usage. Optional for local models.</p>
          </div>
          
          <div class="mb-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="p-3 bg-gray-50 rounded border border-gray-200">
                <p class="text-xs text-gray-500 mb-2">Before</p>
                <p class="text-sm font-mono text-gray-700">Patient John Smith, DOB 01/15/1965...</p>
              </div>
              <div class="p-3 bg-yellow-50 rounded border border-yellow-200">
                <p class="text-xs text-yellow-700 mb-2">After</p>
                <p class="text-sm font-mono text-gray-700">Patient [NAME], DOB [DATE]...</p>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-4 gap-3">
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Input</p>
              <p class="text-lg font-bold text-gray-900">80KB</p>
            </div>
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Output</p>
              <p class="text-lg font-bold text-gray-900">82KB</p>
            </div>
            <div class="p-2 bg-red-50 rounded border border-red-200 text-center">
              <p class="text-xs" style="color: #991b1b;">Change</p>
              <p class="text-lg font-bold" style="color: #dc2626;">+2%</p>
            </div>
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Time</p>
              <p class="text-lg font-bold text-gray-900">0.3s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Render Stage 2: Preprocessing
function renderStage2() {
  const stage = state.pipelineStatus.stage2
  const statusBadge = getStatusBadge(stage.status)
  const chevronClass = stage.expanded ? "rotate-180" : ""
  const contentClass = stage.expanded ? "expanded" : ""

  return `
    <div class="stage-card">
      <div class="stage-header bg-gradient-blue" data-stage-toggle="stage2">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-blue-100 rounded-full">
            <i data-lucide="wrench" class="w-6 h-6 text-blue-700"></i>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Stage 2: Preprocessing</h2>
            <p class="text-sm text-gray-600">Normalize text for optimal extraction</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <span class="badge ${statusBadge}">${stage.status.toUpperCase()}</span>
          <span class="text-sm text-gray-600 font-medium">82KB → 78KB</span>
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray-400 transition-transform duration-300 ${chevronClass}"></i>
        </div>
      </div>
      
      <div class="stage-content ${contentClass}">
        <div class="stage-content-inner">
          <div class="mb-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="p-3 bg-gray-50 rounded border border-gray-200">
                <p class="text-xs text-gray-500 mb-2">Before</p>
                <p class="text-sm font-mono text-gray-700">Multiple   spaces and\\n\\n\\n\\nbreaks</p>
              </div>
              <div class="p-3 bg-blue-50 rounded border border-blue-200">
                <p class="text-xs text-blue-700 mb-2">After</p>
                <p class="text-sm font-mono text-gray-700">Multiple spaces and\\n\\nbreaks</p>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-5 gap-4">
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Input</p>
              <p class="text-lg font-bold text-gray-900">82KB</p>
            </div>
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Output</p>
              <p class="text-lg font-bold text-gray-900">78KB</p>
            </div>
            <div class="p-2" style="background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 0.375rem; text-align: center;">
              <p class="text-xs" style="color: #166534;">Change</p>
              <p class="text-lg font-bold" style="color: #059669;">-5%</p>
            </div>
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Tokens</p>
              <p class="text-sm font-bold text-gray-900">20.5K→19.5K</p>
            </div>
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Time</p>
              <p class="text-lg font-bold text-gray-900">0.1s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Render Stage 3: Snippet Extraction
function renderStage3() {
  const stage = state.pipelineStatus.stage3
  const statusBadge = getStatusBadge(stage.status)
  const chevronClass = stage.expanded ? "rotate-180" : ""
  const contentClass = stage.expanded ? "expanded" : ""

  return `
    <div class="stage-card">
      <div class="stage-header bg-gradient-purple" data-stage-toggle="stage3">
        <div class="flex items-center space-x-3">
          <div class="p-2" style="background: #ede9fe; border-radius: 9999px;">
            <i data-lucide="scissors" class="w-6 h-6" style="color: #9333ea;"></i>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Stage 3: Snippet Extraction</h2>
            <p class="text-sm text-gray-600">Extract relevant context using keywords</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <span class="badge" style="background: #dcfce7; color: #166534;">85% REDUCTION</span>
          <span class="badge ${statusBadge}">${stage.status.toUpperCase()}</span>
          <span class="text-sm text-gray-600 font-medium">78KB → 12KB</span>
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray-400 transition-transform duration-300 ${chevronClass}"></i>
        </div>
      </div>
      
      <div class="stage-content ${contentClass}">
        <div class="stage-content-inner">
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Keywords Found</h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge" style="background: #ede9fe; color: #6b21a8;">weakness <span style="background: #9333ea; color: white; padding: 0.125rem 0.5rem; border-radius: 9999px; margin-left: 0.25rem;">42</span></span>
              <span class="badge" style="background: #ede9fe; color: #6b21a8;">stroke <span style="background: #9333ea; color: white; padding: 0.125rem 0.5rem; border-radius: 9999px; margin-left: 0.25rem;">28</span></span>
              <span class="badge" style="background: #ede9fe; color: #6b21a8;">paralysis <span style="background: #9333ea; color: white; padding: 0.125rem 0.5rem; border-radius: 9999px; margin-left: 0.25rem;">15</span></span>
              <span class="badge" style="background: #ede9fe; color: #6b21a8;">aphasia <span style="background: #9333ea; color: white; padding: 0.125rem 0.5rem; border-radius: 9999px; margin-left: 0.25rem;">12</span></span>
            </div>
          </div>
          
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Reduction Progress</h3>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 85%;"></div>
            </div>
            <p class="text-xs text-gray-600 mt-1 text-right">85% reduction achieved</p>
          </div>
          
          <div class="grid grid-cols-4 gap-3">
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Input</p>
              <p class="text-lg font-bold text-gray-900">78KB</p>
            </div>
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Output</p>
              <p class="text-lg font-bold text-gray-900">12KB</p>
            </div>
            <div class="p-2" style="background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 0.375rem; text-align: center;">
              <p class="text-xs" style="color: #166534;">Change</p>
              <p class="text-lg font-bold" style="color: #059669;">-85%</p>
            </div>
            <div class="p-2 bg-white rounded border border-gray-200 text-center">
              <p class="text-xs text-gray-500">Time</p>
              <p class="text-lg font-bold text-gray-900">0.5s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Helper function to get status badge class
function getStatusBadge(status) {
  switch (status) {
    case "planned":
      return "badge-planned"
    case "active":
      return "badge-active"
    case "processing":
      return "badge-processing"
    case "complete":
      return "badge-complete"
    default:
      return "badge-idle"
  }
}

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
