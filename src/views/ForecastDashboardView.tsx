import React, { useState } from 'react';
import { REGIONS, DIURNAL_MAHABALESHWAR } from '../data/mockData';
import { WeatherStation, LeadTimeHorizon, LayerMode, CanvasMapMode, NavigationTab } from '../types';
import {
  LayoutDashboard,
  CloudRain,
  Radar,
  Activity,
  History,
  Settings,
  Zap,
  Clock,
  Droplets,
  Wind,
  ShieldCheck,
  Download,
  CheckCircle,
  UnfoldVertical,
  ChevronDown,
  Info,
  Maximize2,
} from 'lucide-react';
import { ExportLogModal } from '../components/ExportLogModal';

interface ForecastDashboardViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenConsole: () => void;
}

export const ForecastDashboardView: React.FC<ForecastDashboardViewProps> = ({
  onNavigateTab,
  onOpenConsole,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState('wg');
  const [leadHorizon, setLeadHorizon] = useState<LeadTimeHorizon>('48h');
  const [layerMode, setLayerMode] = useState<LayerMode>('corrected-ai');
  const [mapMode, setMapMode] = useState<CanvasMapMode>('contours');
  const [activeStationId, setActiveStationId] = useState<string>('st-1');
  const [isRunningForecast, setIsRunningForecast] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(3); // Default hover on 15 Aug (+24h)
  const [hoveredStation, setHoveredStation] = useState<WeatherStation | null>(null);

  const currentRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];
  const stations = currentRegion.stations;
  const activeStation = stations.find((s) => s.id === activeStationId) || stations[0];

  const handleRunForecast = () => {
    setIsRunningForecast(true);
    setTimeout(() => {
      setIsRunningForecast(false);
    }, 1400);
  };

  // Dynamic multiplier based on lead horizon
  const horizonMultiplier =
    leadHorizon === '24h' ? 0.65 : leadHorizon === '48h' ? 1.0 : leadHorizon === '72h' ? 1.45 : 2.1;

  const dynamicPeakIntensity = (currentRegion.peakIntensity * (horizonMultiplier > 1.2 ? 1.15 : 1)).toFixed(1);
  const dynamicBiasRecovery = (currentRegion.biasRecoveryMm * (leadHorizon === '24h' ? 0.7 : 1)).toFixed(1);

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)] bg-[#f8f9ff] text-[#0d1c2e]">
      {/* Compact Left Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white flex flex-col justify-between p-4 border-r border-[#e2e8f0] shadow-xs hidden lg:flex">
        <div className="flex flex-col gap-6">
          {/* Workspace Context */}
          <div className="flex items-center justify-between px-1 py-1 bg-[#f8f9ff] rounded-lg border border-[#e2e8f0]/60 p-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#737686] font-semibold tracking-wider uppercase">WORKSPACE</span>
              <span className="text-sm text-[#0d1c2e] truncate font-semibold">
                {currentRegion.shortName}
              </span>
            </div>
            <select
              value={selectedRegionId}
              onChange={(e) => {
                setSelectedRegionId(e.target.value);
                const reg = REGIONS.find((r) => r.id === e.target.value);
                if (reg && reg.stations.length > 0) {
                  setActiveStationId(reg.stations[0].id);
                }
              }}
              className="opacity-0 absolute w-56 h-12 cursor-pointer"
              title="Switch Workspace Domain"
            >
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <UnfoldVertical className="w-4 h-4 text-[#737686]" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 text-[13px]">
            <button
              onClick={() => onNavigateTab('home')}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#434655] hover:bg-[#eff4ff] hover:text-[#0d1c2e] transition-all text-left cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            {/* Active item */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#dce9ff] text-[#004ac6] font-semibold shadow-xs">
              <div className="flex items-center gap-3">
                <CloudRain className="w-4 h-4 text-[#004ac6]" />
                <span>Rainfall Map</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span>
            </div>

            <button
              onClick={() => onNavigateTab('regime-detection')}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#434655] hover:bg-[#eff4ff] hover:text-[#0d1c2e] transition-all text-left cursor-pointer"
            >
              <Radar className="w-4 h-4" />
              <span>Regime Monitor</span>
            </button>

            <button
              onClick={() => onNavigateTab('analytics')}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#434655] hover:bg-[#eff4ff] hover:text-[#0d1c2e] transition-all text-left cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Model Diagnostics</span>
            </button>

            <button
              onClick={() => onNavigateTab('how-it-works')}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#434655] hover:bg-[#eff4ff] hover:text-[#0d1c2e] transition-all text-left cursor-pointer"
            >
              <History className="w-4 h-4" />
              <span>Pipeline Architecture</span>
            </button>

            <button
              onClick={onOpenConsole}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#434655] hover:bg-[#eff4ff] hover:text-[#0d1c2e] transition-all text-left cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span>Engine Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: FastAPI Engine Status */}
        <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#434655] font-medium">FastAPI Engine</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#d5e3fc] text-[#004ac6] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse"></span>
              Sync
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#737686] text-[11px]">
            <Activity className="w-3.5 h-3.5 text-[#2563eb]" />
            <span className="truncate">Connected (0.38s latency)</span>
          </div>
          <div className="w-full bg-[#d5e3fc] h-1 rounded-full overflow-hidden">
            <div className="bg-[#2563eb] h-full w-[94%]"></div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 gap-6 overflow-y-auto">
        {/* Top Control & Filter Bar */}
        <section className="bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0] flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Region Selector */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#737686] uppercase font-semibold tracking-wider">
                Region Domain
              </span>
              <div className="relative">
                <select
                  value={selectedRegionId}
                  onChange={(e) => {
                    setSelectedRegionId(e.target.value);
                    const reg = REGIONS.find((r) => r.id === e.target.value);
                    if (reg && reg.stations.length > 0) {
                      setActiveStationId(reg.stations[0].id);
                    }
                  }}
                  className="appearance-none bg-[#eff4ff] text-[#0d1c2e] text-[13px] font-medium pl-3 pr-8 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 border border-transparent hover:border-[#c3c6d7]"
                >
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-[#434655] pointer-events-none" />
              </div>
            </div>

            {/* Forecast Cycle Epoch */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#737686] uppercase font-semibold tracking-wider">
                Cycle Epoch
              </span>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0d1c2e] text-[13px] font-semibold">
                <Clock className="w-4 h-4 text-[#004ac6]" />
                <span>14 Aug 2026 • 06:00 UTC</span>
              </div>
            </div>

            {/* Lead Horizon Pills */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#737686] uppercase font-semibold tracking-wider">
                Lead Horizon
              </span>
              <div className="flex items-center bg-[#eff4ff] p-1 rounded-lg gap-1">
                {(['24h', '48h', '72h', '120h'] as LeadTimeHorizon[]).map((horizon) => (
                  <button
                    key={horizon}
                    onClick={() => setLeadHorizon(horizon)}
                    className={`px-3 py-1 rounded-md text-[12px] font-medium transition-all cursor-pointer ${
                      leadHorizon === horizon
                        ? 'bg-white text-[#004ac6] shadow-xs font-semibold'
                        : 'text-[#434655] hover:text-[#0d1c2e]'
                    }`}
                  >
                    {horizon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action & Layer Toggles */}
          <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3">
            {/* Layer selection toggles */}
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg">
              {[
                { id: 'raw-nwp', label: 'Raw NWP' },
                { id: 'corrected-ai', label: 'Corrected AI' },
                { id: 'uncertainty', label: 'Uncertainty (σ)' },
                { id: 'observations', label: 'Observations' },
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setLayerMode(layer.id as LayerMode)}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-all cursor-pointer ${
                    layerMode === layer.id
                      ? 'bg-[#004ac6] text-white shadow-xs font-semibold'
                      : 'text-[#737686] hover:text-[#0d1c2e] font-medium'
                  }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            {/* Primary CTA Button */}
            <button
              onClick={handleRunForecast}
              disabled={isRunningForecast}
              className="flex items-center gap-2 px-4 py-2 bg-[#004ac6] hover:bg-[#1d4ed8] text-white rounded-lg text-[13px] font-semibold shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-75"
            >
              <Zap className={`w-4 h-4 ${isRunningForecast ? 'animate-spin' : ''}`} />
              <span>{isRunningForecast ? 'Synthesizing...' : 'Run Forecast'}</span>
            </button>
          </div>
        </section>

        {/* 3 Summary KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* KPI 1 */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e2e8f0] flex flex-col justify-between gap-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#737686] uppercase tracking-wider">
                Peak Predicted Intensity
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#e6eeff] flex items-center justify-center text-[#004ac6]">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0d1c2e] tracking-tight tabular-nums">
                  {dynamicPeakIntensity}
                </span>
                <span className="text-sm text-[#737686]">mm/24h</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#004ac6] text-[11px] font-semibold">
                  +{dynamicBiasRecovery} mm
                </span>
                <span className="text-xs text-[#434655]">recovered over raw NWP bias</span>
              </div>
            </div>
            <div className="h-1 w-full bg-[#e6eeff] rounded-full overflow-hidden">
              <div className="h-full bg-[#004ac6] w-4/5 rounded-full"></div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e2e8f0] flex flex-col justify-between gap-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#737686] uppercase tracking-wider">
                Active Synoptic Regime
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#e6eeff] flex items-center justify-center text-[#004ac6]">
                <Wind className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#0d1c2e] tracking-tight">
                  {currentRegion.activeRegime}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#004ac6] text-[11px] font-semibold">
                  {currentRegion.regimeConf}% Conf
                </span>
                <span className="text-xs text-[#434655]">Deep Tropospheric Westerly Shear</span>
              </div>
            </div>
            <div className="h-1 w-full bg-[#e6eeff] rounded-full overflow-hidden">
              <div className="h-full bg-[#4069f2] w-[94%] rounded-full"></div>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e2e8f0] flex flex-col justify-between gap-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#737686] uppercase tracking-wider">
                Model Reliability Score
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#e6eeff] flex items-center justify-center text-[#004ac6]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0d1c2e] tracking-tight tabular-nums">
                  {currentRegion.reliabilityScore}%
                </span>
                <span className="text-sm text-[#737686]">coverage</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#004ac6] text-[11px] font-semibold">
                  α = 0.05
                </span>
                <span className="text-xs text-[#434655]">Conformal Interval Satisfied</span>
              </div>
            </div>
            <div className="h-1 w-full bg-[#e6eeff] rounded-full overflow-hidden">
              <div className="h-full bg-[#004ac6] w-[98%] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Centerpiece: Interactive Rainfall Map & Synoptic Canvas */}
        <section className="bg-white rounded-xl shadow-xs border border-[#e2e8f0] p-5 flex flex-col gap-4">
          {/* Canvas Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[#0d1c2e]">
                  Orographic Precipitation Synoptic Canvas
                </h3>
                <span className="px-2 py-0.5 bg-[#e6eeff] text-[#4d556b] rounded text-[11px] font-semibold">
                  0.04° High-Res
                </span>
              </div>
              <span className="text-xs text-[#737686] hidden md:inline">
                [Demonstration Data • Synthetic NWP Ingestion Partition]
              </span>
            </div>

            {/* Map Mode Switch */}
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg">
              <button
                onClick={() => setMapMode('satellite')}
                className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                  mapMode === 'satellite'
                    ? 'bg-white text-[#004ac6] shadow-xs font-semibold'
                    : 'text-[#737686] hover:text-[#0d1c2e]'
                }`}
              >
                Satellite Base
              </button>
              <button
                onClick={() => setMapMode('contours')}
                className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                  mapMode === 'contours'
                    ? 'bg-white text-[#004ac6] shadow-xs font-semibold'
                    : 'text-[#737686] hover:text-[#0d1c2e]'
                }`}
              >
                Synoptic Contours
              </button>
              <button
                onClick={() => setMapMode('mesh')}
                className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                  mapMode === 'mesh'
                    ? 'bg-white text-[#004ac6] shadow-xs font-semibold'
                    : 'text-[#737686] hover:text-[#0d1c2e]'
                }`}
              >
                Grid Mesh (4km)
              </button>
            </div>
          </div>

          {/* Geospatial Canvas Visualization */}
          <div className="relative w-full h-[460px] rounded-xl overflow-hidden bg-[#eff4ff] select-none border border-[#e2e8f0]">
            {/* SVG Terrain & Synoptic Fields */}
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 500"
            >
              <defs>
                <linearGradient id="oceanGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#e6eeff" />
                  <stop offset="35%" stopColor="#eff4ff" />
                  <stop offset="36%" stopColor="#f8f9ff" />
                  <stop offset="100%" stopColor="#f8f9ff" />
                </linearGradient>

                <radialGradient id="stormCenter1" cx="48%" cy="45%" r="35%">
                  <stop
                    offset="0%"
                    stopColor={layerMode === 'uncertainty' ? '#737686' : '#004ac6'}
                    stopOpacity="0.85"
                  />
                  <stop
                    offset="28%"
                    stopColor={layerMode === 'uncertainty' ? '#a5a8b8' : '#2563eb'}
                    stopOpacity="0.65"
                  />
                  <stop
                    offset="55%"
                    stopColor={layerMode === 'uncertainty' ? '#c3c6d7' : '#4069f2'}
                    stopOpacity="0.4"
                  />
                  <stop offset="85%" stopColor="#dce9ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#dce9ff" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="stormCenter2" cx="38%" cy="75%" r="28%">
                  <stop offset="0%" stopColor="#0053db" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#4069f2" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#b4c5ff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#dce9ff" stopOpacity="0" />
                </radialGradient>

                <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path
                    d="M 30 0 L 0 0 0 30"
                    fill="none"
                    stroke="#c3c6d7"
                    strokeOpacity={mapMode === 'mesh' ? '0.7' : '0.25'}
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>

              {/* Base Canvas */}
              <rect width="1000" height="500" fill="url(#oceanGrad)" />
              <rect width="1000" height="500" fill="url(#gridPattern)" />

              {/* Satellite base subtle styling if active */}
              {mapMode === 'satellite' && (
                <rect width="1000" height="500" fill="#233144" fillOpacity="0.08" />
              )}

              {/* Western Ghats Coastal Ridge Line */}
              <path
                d="M 360,0 C 375,100 350,220 370,320 C 385,390 355,460 365,500"
                fill="none"
                opacity="0.6"
                stroke="#737686"
                strokeDasharray="4,4"
                strokeWidth="1.5"
              />
              <text x="375" y="40" fill="#737686" opacity="0.75" className="text-[11px] font-mono">
                1,200m OROGRAPHIC RIDGE
              </text>

              {/* Precipitation Blooms */}
              {(layerMode === 'corrected-ai' || layerMode === 'uncertainty' || layerMode === 'observations') && (
                <>
                  <path
                    d="M 320,110 Q 520,100 580,240 T 420,380 T 320,290 Z"
                    fill="url(#stormCenter1)"
                  />
                  <path
                    d="M 280,310 Q 450,280 480,430 T 320,490 T 260,390 Z"
                    fill="url(#stormCenter2)"
                  />
                </>
              )}

              {layerMode === 'raw-nwp' && (
                <path
                  d="M 320,130 Q 480,130 520,230 T 400,340 T 320,280 Z"
                  fill="#4069f2"
                  fillOpacity="0.35"
                />
              )}

              {/* Atmospheric Streamlines / Wind Vectors SW to NE */}
              <g opacity="0.55" stroke="#004ac6" strokeLinecap="round" strokeWidth="1.5">
                <path d="M 80,180 Q 220,160 330,195" fill="none" />
                <polygon fill="#004ac6" points="335,197 323,191 326,201" />

                <path d="M 110,280 Q 250,260 350,285" fill="none" />
                <polygon fill="#004ac6" points="355,286 343,280 346,290" />

                <path d="M 140,370 Q 260,350 340,365" fill="none" />
                <polygon fill="#004ac6" points="345,366 333,360 336,370" />

                <path d="M 170,450 Q 280,420 330,430" fill="none" />
                <polygon fill="#004ac6" points="335,431 323,425 326,435" />
              </g>
            </svg>

            {/* Weather Station Micro-Pins overlaid directly on coordinates */}
            {stations.map((st) => {
              const isSelected = st.id === activeStationId;
              const rainDisplay =
                layerMode === 'raw-nwp' ? st.rawRainMm : st.correctedRainMm;

              return (
                <div
                  key={st.id}
                  onClick={() => setActiveStationId(st.id)}
                  onMouseEnter={() => setHoveredStation(st)}
                  onMouseLeave={() => setHoveredStation(null)}
                  style={{ left: `${st.xPct}%`, top: `${st.yPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
                >
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-md mb-1 transition-all ${
                      isSelected
                        ? 'bg-[#0d1c2e] text-white scale-105 ring-2 ring-[#2563eb]'
                        : 'bg-white text-[#0d1c2e] hover:scale-105'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        st.rawRainMm > 80
                          ? 'bg-rose-500 animate-ping'
                          : st.rawRainMm > 40
                          ? 'bg-[#2563eb]'
                          : 'bg-[#737686]'
                      }`}
                    ></span>
                    <span className="text-xs font-semibold whitespace-nowrap">{st.name}</span>
                    <span
                      className={`text-xs font-bold ml-1 ${
                        isSelected ? 'text-blue-300' : 'text-[#004ac6]'
                      }`}
                    >
                      {rainDisplay} mm
                    </span>
                  </div>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-all ${
                      isSelected
                        ? 'bg-[#2563eb] ring-4 ring-[#2563eb]/30 scale-125'
                        : 'bg-[#004ac6]'
                    }`}
                  ></div>
                </div>
              );
            })}

            {/* Map Coordinate Floating HUD (Top Left) */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl shadow-md border border-[#e2e8f0] flex flex-col gap-0.5 text-xs">
              <span className="text-[10px] text-[#737686] font-semibold uppercase tracking-wider">
                BOUNDS BBOX
              </span>
              <span className="text-xs font-semibold text-[#0d1c2e]">
                {currentRegion.bbox}
              </span>
              <span className="text-[11px] text-[#004ac6] font-medium">
                Inference Delta: ECMWF vs ConvAI (0.04° Mesh)
              </span>
            </div>

            {/* Precipitation Color Ramp Legend (Bottom Right) */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-md border border-[#e2e8f0] flex flex-col gap-1.5 min-w-[240px]">
              <div className="flex items-center justify-between text-[#737686] text-[11px] font-semibold">
                <span>ACCUMULATED RAIN (24H)</span>
                <span className="text-[#004ac6]">mm</span>
              </div>
              <div className="h-2.5 w-full rounded-full flex overflow-hidden">
                <span className="h-full flex-1 bg-[#e6eeff]"></span>
                <span className="h-full flex-1 bg-[#bec6e0]"></span>
                <span className="h-full flex-1 bg-[#4069f2]"></span>
                <span className="h-full flex-1 bg-[#2563eb]"></span>
                <span className="h-full flex-1 bg-[#004ac6]"></span>
                <span className="h-full flex-1 bg-[#00174b]"></span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#737686]">
                <span>0</span>
                <span>15</span>
                <span>35</span>
                <span>65</span>
                <span>100</span>
                <span>120+</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Split Section: Diurnal Chart & Forecast Audit Table */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left (60% / 7 cols): 5-Day Rainfall Diurnal Time-Series Chart */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-[#e2e8f0] p-5 flex flex-col justify-between gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-col">
                <h4 className="text-base font-semibold text-[#0d1c2e]">
                  5-Day Diurnal Rainfall Curve ({activeStation.name})
                </h4>
                <p className="text-xs text-[#434655]">
                  Sharp recovery of convective peaks suppressed by coarse-mesh global model
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-b border-dashed border-[#737686]"></span>
                  <span className="text-[#737686]">Raw NWP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#004ac6] rounded-full"></span>
                  <span className="text-[#004ac6] font-semibold">Corrected AI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0d1c2e]"></span>
                  <span className="text-[#0d1c2e]">Observations</span>
                </div>
              </div>
            </div>

            {/* Time Series Inline Vector Chart */}
            <div className="w-full h-64 relative flex flex-col justify-end">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 600 200"
              >
                <defs>
                  <linearGradient id="aiCurveFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#004ac6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#004ac6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                <line x1="0" x2="600" y1="20" y2="20" stroke="#c3c6d7" strokeDasharray="2,2" strokeWidth="0.5" opacity="0.4" />
                <line x1="0" x2="600" y1="65" y2="65" stroke="#c3c6d7" strokeDasharray="2,2" strokeWidth="0.5" opacity="0.4" />
                <line x1="0" x2="600" y1="110" y2="110" stroke="#c3c6d7" strokeDasharray="2,2" strokeWidth="0.5" opacity="0.4" />
                <line x1="0" x2="600" y1="155" y2="155" stroke="#c3c6d7" strokeDasharray="2,2" strokeWidth="0.5" opacity="0.4" />
                <line x1="0" x2="600" y1="195" y2="195" stroke="#737686" strokeWidth="1" opacity="0.3" />

                {/* Y-axis Labels */}
                <text x="5" y="24" fill="#737686" opacity="0.8" className="text-[10px] font-mono">150mm</text>
                <text x="5" y="69" fill="#737686" opacity="0.8" className="text-[10px] font-mono">100mm</text>
                <text x="5" y="114" fill="#737686" opacity="0.8" className="text-[10px] font-mono">50mm</text>
                <text x="5" y="159" fill="#737686" opacity="0.8" className="text-[10px] font-mono">15mm</text>

                {/* Area Fill under Corrected AI line */}
                <path
                  d="M 40,185 C 90,175 120,80 160,50 C 200,20 230,130 280,120 C 330,110 360,35 410,25 C 460,15 490,140 540,110 L 580,130 L 580,195 L 40,195 Z"
                  fill="url(#aiCurveFill)"
                />

                {/* Raw Global NWP Line (Underpredicting Convective Peaks, Dashed Gray) */}
                <path
                  d="M 40,180 C 90,170 120,135 160,125 C 200,115 230,150 280,145 C 330,140 360,110 410,105 C 460,100 490,155 540,140 L 580,150"
                  fill="none"
                  stroke="#737686"
                  strokeDasharray="6,4"
                  strokeWidth="2"
                />

                {/* Corrected Forecast Line (High Fidelity Surge, Solid Cobalt) */}
                <path
                  d="M 40,185 C 90,175 120,80 160,50 C 200,20 230,130 280,120 C 330,110 360,35 410,25 C 460,15 490,140 540,110 L 580,130"
                  fill="none"
                  stroke="#004ac6"
                  strokeWidth="2.5"
                />

                {/* Actual Observations Points */}
                <circle cx="160" cy="48" r="4.5" fill="#0d1c2e" />
                <circle cx="280" cy="122" r="4.5" fill="#0d1c2e" />
                <circle cx="410" cy="22" r="5" fill="#004ac6" stroke="#ffffff" strokeWidth="2" />
                <circle cx="540" cy="112" r="4.5" fill="#0d1c2e" />

                {/* Vertical hover line indicator */}
                {hoveredDayIndex !== null && (
                  <g>
                    <line
                      x1={hoveredDayIndex === 0 ? 40 : hoveredDayIndex === 1 ? 160 : hoveredDayIndex === 2 ? 280 : hoveredDayIndex === 3 ? 410 : 540}
                      x2={hoveredDayIndex === 0 ? 40 : hoveredDayIndex === 1 ? 160 : hoveredDayIndex === 2 ? 280 : hoveredDayIndex === 3 ? 410 : 540}
                      y1="10"
                      y2="195"
                      stroke="#2563eb"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom Time Axis Labels */}
            <div className="flex items-center justify-between px-3 pt-2 text-[#737686] text-xs">
              {DIURNAL_MAHABALESHWAR.map((pt, idx) => {
                const isHovered = hoveredDayIndex === idx;
                return (
                  <button
                    key={pt.dateLabel}
                    onClick={() => setHoveredDayIndex(idx)}
                    className={`cursor-pointer transition-colors ${
                      pt.isToday
                        ? 'text-[#004ac6] font-semibold'
                        : isHovered
                        ? 'text-[#0d1c2e] font-semibold'
                        : 'text-[#737686]'
                    }`}
                  >
                    {pt.dateLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right (40% / 5 cols): Forecast Audit Table */}
          <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-[#e2e8f0] p-5 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between pb-1">
              <div className="flex flex-col">
                <h4 className="text-base font-semibold text-[#0d1c2e]">Telemetry Audit Stream</h4>
                <p className="text-xs text-[#434655]">Live station calibration verification</p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="text-[#004ac6] hover:text-[#1d4ed8] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Log</span>
              </button>
            </div>

            {/* Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#eff4ff] text-[#737686] text-[11px]">
                    <th className="py-2.5 px-3 rounded-l-md font-semibold">Station</th>
                    <th className="py-2.5 px-2 font-semibold">Regime</th>
                    <th className="py-2.5 px-2 text-right font-semibold">Raw</th>
                    <th className="py-2.5 px-2 text-right font-semibold">Corrected</th>
                    <th className="py-2.5 px-3 text-right rounded-r-md font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 text-xs">
                  {stations.map((st) => {
                    const isSelected = st.id === activeStationId;
                    return (
                      <tr
                        key={st.id}
                        onClick={() => setActiveStationId(st.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#dce9ff]/60' : 'hover:bg-[#f8f9ff]'
                        }`}
                      >
                        <td className="py-3 px-3 font-semibold text-[#0d1c2e] flex items-center gap-1.5">
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span>}
                          <span>{st.name}</span>
                        </td>
                        <td className="py-3 px-2 text-[#434655]">{st.regime}</td>
                        <td className="py-3 px-2 text-right text-[#737686] tabular-nums">{st.rawRainMm} mm</td>
                        <td className="py-3 px-2 text-right font-bold text-[#004ac6] tabular-nums">
                          {st.correctedRainMm} mm
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              st.status === 'Calibrated'
                                ? 'bg-[#dce9ff] text-[#004ac6]'
                                : 'bg-[#e2e8f0] text-[#434655]'
                            }`}
                          >
                            {st.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Micro Summary Status Line */}
            <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0] text-[#737686] text-xs">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#004ac6]" />
                Synoptic Ensemble: 42 Member Gaussian Mixture
              </span>
              <span className="font-mono">RMSE: 3.12 mm</span>
            </div>
          </div>
        </section>
      </main>

      {/* Export Modal */}
      <ExportLogModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        stations={stations}
        activeRegion={currentRegion.name}
      />
    </div>
  );
};
