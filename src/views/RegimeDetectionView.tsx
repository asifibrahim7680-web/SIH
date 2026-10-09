import React, { useState } from 'react';
import {
  REGIME_CLASSES,
  ATTRIBUTION_FEATURES,
  RADAR_AXES,
  TIMELINE_14_DAYS,
} from '../data/mockData';
import {
  RotateCw,
  Wind,
  Droplets,
  Mountain,
  Layers,
  Info,
  Maximize2,
  ChevronDown,
  CheckCircle,
  Activity,
  Radio,
} from 'lucide-react';

export const RegimeDetectionView: React.FC = () => {
  const [selectedSpatialDomain, setSelectedSpatialDomain] = useState('sw');
  const [activeSensorOverlay, setActiveSensorOverlay] = useState<'insat' | 'doppler' | 'terrain'>('insat');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(13); // Default Today
  const [inspectedImage, setInspectedImage] = useState<{ title: string; url: string; meta: string } | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full text-[#0d1c2e]">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#004ac6] text-xs font-semibold uppercase tracking-wider">
                Operational Telemetry
              </span>
              <span className="text-xs text-[#737686]">
                [Demonstration Telemetry • Real-time Simulation Partition]
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0d1c2e] tracking-tight">
              Synoptic Regime Detection &amp; Gating Telemetry
            </h1>
            <p className="text-sm text-[#434655] max-w-2xl">
              Real-time atmospheric regime classification driving neural mixture-of-experts routing across heterogeneous terrain domains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Region Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#737686] font-semibold">Spatial Domain</label>
              <div className="relative bg-white shadow-2xs rounded-lg border border-[#e2e8f0]">
                <select
                  value={selectedSpatialDomain}
                  onChange={(e) => setSelectedSpatialDomain(e.target.value)}
                  className="appearance-none bg-transparent pl-3 pr-8 py-1.5 text-xs font-medium text-[#0d1c2e] focus:outline-none cursor-pointer"
                >
                  <option value="sw">Southwest Coast &amp; Western Ghats (0.04°)</option>
                  <option value="ne">Bay of Bengal &amp; Gangetic Basin (0.04°)</option>
                  <option value="nw">Thar Depressions &amp; Himalayan Foothills (0.08°)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-2 text-[#737686] pointer-events-none" />
              </div>
            </div>

            {/* Synoptic Cycle */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#737686] font-semibold">Synoptic Cycle</label>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-2xs border border-[#e2e8f0] text-xs">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
                <span className="font-semibold text-[#0d1c2e]">06:00 UTC</span>
                <span className="text-[#737686]">| Step +00</span>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="self-end inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#eff4ff] text-[#0d1c2e] text-xs font-semibold rounded-lg border border-[#e2e8f0] shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#004ac6]' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </section>

        {/* Top Bento: Current Regime Hero Card & Gating Status */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Dominant Regime Primary Hero (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#dce9ff]/30 blur-3xl pointer-events-none"></div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#e6eeff] text-xs text-[#004ac6] font-bold tracking-wide">
                    Primary Assigned State
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-xs text-[#737686] font-mono">
                    Cycle: t-0
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-2xs border border-[#e2e8f0]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="text-xs font-bold text-[#0d1c2e]">High Confidence: 94.2%</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#737686] uppercase font-bold tracking-wider">
                  Dominant Regime
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0d1c2e] tracking-tight">
                  Active Monsoon Surge
                </h2>
                <p className="text-xs sm:text-sm text-[#434655] max-w-xl leading-relaxed mt-1">
                  Deep tropospheric convergence zone driven by low-level offshore vorticity coupled with saturated maritime boundary layer transport.
                </p>
              </div>

              {/* Neural Specialist Target */}
              <div className="bg-[#eff4ff] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#dce9ff]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#004ac6] shrink-0 border border-[#e2e8f0]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#737686] uppercase font-bold tracking-wider">
                      Routing Gated Specialist
                    </span>
                    <span className="text-sm font-bold text-[#0d1c2e]">
                      Expert #02: Orographic &amp; Synoptic Convection Net
                    </span>
                    <span className="text-xs text-[#434655]">
                      DenseNet-4K Architecture • High-Density Spatial Residual Layer
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  <span className="px-2.5 py-1 rounded bg-white shadow-2xs text-xs text-[#004ac6] font-mono font-bold border border-[#e2e8f0]">
                    Kernel: W-850-DG
                  </span>
                </div>
              </div>
            </div>

            {/* Atmospheric Drivers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-4 relative z-10 border-t border-[#e2e8f0]">
              <div className="flex flex-col p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737686] font-semibold">U850 Low-Level Jet</span>
                  <Wind className="w-4 h-4 text-[#004ac6]" />
                </div>
                <span className="text-2xl font-bold text-[#0d1c2e] tracking-tight mt-1 font-mono">
                  18.4 <span className="text-xs font-normal text-[#737686]">m/s</span>
                </span>
                <span className="text-xs text-[#434655] mt-0.5">Westerly core vector +2.8σ</span>
              </div>

              <div className="flex flex-col p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737686] font-semibold">Column Water (TCWV)</span>
                  <Droplets className="w-4 h-4 text-[#004ac6]" />
                </div>
                <span className="text-2xl font-bold text-[#0d1c2e] tracking-tight mt-1 font-mono">
                  62.1 <span className="text-xs font-normal text-[#737686]">kg/m²</span>
                </span>
                <span className="text-xs text-[#434655] mt-0.5">99th percentile saturation</span>
              </div>

              <div className="flex flex-col p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737686] font-semibold">Orographic Gradient</span>
                  <Mountain className="w-4 h-4 text-[#004ac6]" />
                </div>
                <span className="text-2xl font-bold text-[#0d1c2e] tracking-tight mt-1">
                  Sharp <span className="text-xs font-normal text-[#737686]">Lift</span>
                </span>
                <span className="text-xs text-[#434655] mt-0.5">Western Ghats windward trigger</span>
              </div>
            </div>
          </div>

          {/* Regime Probability Distribution (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0d1c2e]">Classification Vector</h3>
                  <p className="text-xs text-[#737686]">Softmax routing activations (P &gt; 0.00)</p>
                </div>
                <Activity className="w-5 h-5 text-[#004ac6]" />
              </div>

              {/* Progress Bars Stack */}
              <div className="flex flex-col gap-3.5 mt-1">
                {/* Item 1 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#0d1c2e] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
                      Active Monsoon Surge
                    </span>
                    <span className="font-mono text-[#004ac6]">94.2%</span>
                  </div>
                  <div className="w-full bg-[#e6eeff] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#737686]">
                    <span>Primary Target</span>
                    <span>Active Routing</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#0d1c2e] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
                      Orographic Surge (W. Ghats)
                    </span>
                    <span className="font-mono text-[#2563eb]">78.5%</span>
                  </div>
                  <div className="w-full bg-[#e6eeff] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#2563eb] h-full rounded-full" style={{ width: '78.5%' }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#737686]">
                    <span>Secondary Gate</span>
                    <span>Co-activated</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#434655]">Coastal Convective Boundary</span>
                    <span className="font-mono text-[#434655]">14.1%</span>
                  </div>
                  <div className="w-full bg-[#eff4ff] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#4069f2] h-full rounded-full" style={{ width: '14.1%' }}></div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#434655]">Monsoon Depression / Low</span>
                    <span className="font-mono text-[#434655]">6.2%</span>
                  </div>
                  <div className="w-full bg-[#eff4ff] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#737686] h-full rounded-full" style={{ width: '6.2%' }}></div>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#434655]">Break Monsoon Phase</span>
                    <span className="font-mono text-[#434655]">1.8%</span>
                  </div>
                  <div className="w-full bg-[#eff4ff] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#c3c6d7] h-full rounded-full" style={{ width: '1.8%' }}></div>
                  </div>
                </div>

                {/* Item 6 */}
                <div className="flex justify-between items-center pt-1 text-xs text-[#737686]">
                  <span>Western Disturbance</span>
                  <span className="font-mono">0.4%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 bg-[#eff4ff] rounded-xl p-3 flex items-center justify-between border border-[#dce9ff]">
              <span className="text-xs text-[#737686] font-semibold">Entropy (H-Score)</span>
              <span className="text-xs text-[#0d1c2e] font-mono font-bold">0.312 nats (Low ambiguity)</span>
            </div>
          </div>
        </section>

        {/* 14-Day Synoptic Regime Transitions (Gantt Blocks & Trend) */}
        <section className="flex flex-col bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#0d1c2e]">14-Day Synoptic Regime Transitions</h3>
              <p className="text-xs text-[#434655]">
                Historical classification track and specialist model handover points along the synoptic timeline.
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#004ac6]"></span>
                <span className="text-[#434655]">Active Monsoon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#2563eb]"></span>
                <span className="text-[#434655]">Orographic Surge</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#dce9ff]"></span>
                <span className="text-[#434655]">Coastal Convection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#e6eeff]"></span>
                <span className="text-[#434655]">Break Phase</span>
              </div>
            </div>
          </div>

          {/* Timeline Block Visualizer */}
          <div className="flex flex-col gap-2 overflow-x-auto pb-2">
            {/* Day Headers */}
            <div className="grid grid-cols-14 min-w-[760px] gap-1.5 text-center text-[11px] text-[#737686] font-mono">
              {TIMELINE_14_DAYS.map((d, idx) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`cursor-pointer transition-colors ${
                    selectedDayIndex === idx ? 'text-[#004ac6] font-bold' : ''
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>

            {/* Regime Blocks Stream */}
            <div className="grid grid-cols-14 min-w-[760px] gap-1.5 h-16 items-stretch">
              {/* Jul 5-6 Break */}
              <div
                onClick={() => setSelectedDayIndex(0)}
                className={`col-span-2 rounded-xl p-2.5 flex flex-col justify-between transition-all cursor-pointer ${
                  selectedDayIndex === 0 || selectedDayIndex === 1
                    ? 'bg-[#e6eeff] ring-2 ring-[#004ac6]'
                    : 'bg-[#eff4ff] hover:bg-[#e6eeff]'
                }`}
              >
                <span className="text-xs font-semibold text-[#737686] truncate">Break Phase</span>
                <span className="text-[10px] text-[#737686] font-mono">Exp #05</span>
              </div>

              {/* Jul 7-9 Coastal Convective */}
              <div
                onClick={() => setSelectedDayIndex(2)}
                className={`col-span-3 rounded-xl p-2.5 flex flex-col justify-between transition-all cursor-pointer ${
                  selectedDayIndex && selectedDayIndex >= 2 && selectedDayIndex <= 4
                    ? 'bg-[#dce9ff] ring-2 ring-[#004ac6]'
                    : 'bg-[#e6eeff] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="text-xs font-semibold text-[#004ac6] truncate">Coastal Convective</span>
                <span className="text-[10px] text-[#004ac6] font-mono">Exp #03</span>
              </div>

              {/* Jul 10-12 Monsoon Low */}
              <div
                onClick={() => setSelectedDayIndex(5)}
                className={`col-span-3 rounded-xl p-2.5 flex flex-col justify-between transition-all cursor-pointer ${
                  selectedDayIndex && selectedDayIndex >= 5 && selectedDayIndex <= 7
                    ? 'bg-[#d5e3fc] ring-2 ring-[#004ac6]'
                    : 'bg-[#eff4ff] hover:bg-[#d5e3fc]'
                }`}
              >
                <span className="text-xs font-semibold text-[#1d4ed8] truncate">Monsoon Low</span>
                <span className="text-[10px] text-[#1d4ed8] font-mono">Exp #01</span>
              </div>

              {/* Jul 13-18 Active Surge (Current Window) */}
              <div
                onClick={() => setSelectedDayIndex(13)}
                className={`col-span-6 bg-[#004ac6] text-white rounded-xl p-2.5 flex flex-col justify-between shadow-xs relative overflow-hidden cursor-pointer ${
                  selectedDayIndex && selectedDayIndex >= 8 ? 'ring-2 ring-[#2563eb]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate">Active Monsoon Surge (Current Window)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                </div>
                <div className="flex items-center justify-between text-blue-100 text-[11px] font-mono">
                  <span>Expert #02 Deployed</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">P: 0.94</span>
                </div>
              </div>
            </div>

            {/* Metric Trace Indicator (U850 Mean Speed) */}
            <div className="min-w-[760px] flex flex-col gap-1 pt-2">
              <div className="flex justify-between items-center text-[11px] text-[#737686] font-mono">
                <span>U850 Vector Speed Trend (m/s)</span>
                <span>Mean: 14.8 m/s • Peak: 19.1 m/s</span>
              </div>
              <div className="h-6 w-full flex items-end gap-1.5">
                {TIMELINE_14_DAYS.map((d, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-xs transition-all ${
                      idx === selectedDayIndex ? 'ring-2 ring-[#004ac6]' : ''
                    }`}
                    style={{
                      height: `${(d.u850 / 20) * 100}%`,
                      backgroundColor: d.u850 > 17 ? '#004ac6' : d.u850 > 13 ? '#2563eb' : '#dce9ff',
                    }}
                    title={`${d.day}: ${d.u850} m/s`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Attribution & Explainability Panel (Integrated Gradients & Radar) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Feature Attributions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-[#0d1c2e]">Tensor Attribution &amp; Explainability</h3>
                  <p className="text-xs text-[#434655]">
                    Integrated Gradients attribution score mapping tensor sensitivity to the current regime classification.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#eff4ff] text-xs text-[#737686] font-mono font-bold">
                  IG-Steps: 50
                </span>
              </div>

              {/* Feature Bars */}
              <div className="flex flex-col gap-3.5 mt-4">
                {ATTRIBUTION_FEATURES.map((feat) => (
                  <div key={feat.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-[#0d1c2e]">{feat.feature}</span>
                      <span className="font-mono text-[#004ac6]">+{feat.scorePct}%</span>
                    </div>
                    <div className="w-full bg-[#eff4ff] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${feat.scorePct}%`, backgroundColor: feat.levelColor }}
                      ></div>
                    </div>
                    <span className="text-[11px] text-[#737686]">{feat.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between text-[#737686] text-xs border border-[#dce9ff]">
              <span>Attribution Model: Integrated Gradients w/ Baseline=Climatology</span>
              <span className="font-mono font-semibold">Convergence Delta: ε &lt; 0.002</span>
            </div>
          </div>

          {/* Atmospheric Synoptic Vector Radar Representation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] gap-4">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0d1c2e]">Tensor Space Projection</h3>
                  <p className="text-xs text-[#434655]">
                    Normalized atmospheric state vs. historical regime centroid.
                  </p>
                </div>
              </div>

              {/* Radar Chart SVG */}
              <div className="flex items-center justify-center py-4">
                <svg className="w-64 h-64 overflow-visible" viewBox="0 0 240 240">
                  {/* Web Polygons */}
                  <polygon points="120,30 205,80 173,178 67,178 35,80" fill="none" stroke="#c3c6d7" strokeWidth="1" opacity="0.4" />
                  <polygon points="120,60 177,93 155,159 85,159 63,93" fill="none" stroke="#c3c6d7" strokeWidth="1" opacity="0.5" />
                  <polygon points="120,90 148,107 137,139 103,139 92,107" fill="none" stroke="#c3c6d7" strokeWidth="1" opacity="0.6" />

                  {/* Axes */}
                  <line x1="120" y1="120" x2="120" y2="30" stroke="#c3c6d7" strokeWidth="1" opacity="0.4" />
                  <line x1="120" y1="120" x2="205" y2="80" stroke="#c3c6d7" strokeWidth="1" opacity="0.4" />
                  <line x1="120" y1="120" x2="173" y2="178" stroke="#c3c6d7" strokeWidth="1" opacity="0.4" />
                  <line x1="120" y1="120" x2="67" y2="178" stroke="#c3c6d7" strokeWidth="1" opacity="0.4" />
                  <line x1="120" y1="120" x2="35" y2="80" stroke="#c3c6d7" strokeWidth="1" opacity="0.4" />

                  {/* Historical Baseline Polygon */}
                  <polygon
                    points="120,70 170,95 145,150 95,150 70,95"
                    fill="none"
                    stroke="#737686"
                    strokeDasharray="3,3"
                    strokeWidth="1.5"
                  />

                  {/* Current Observed Polygon */}
                  <polygon
                    points="120,38 200,84 165,168 72,165 42,85"
                    fill="#004ac6"
                    fillOpacity="0.2"
                    stroke="#004ac6"
                    strokeWidth="2.5"
                  />

                  {/* Data Points */}
                  <circle cx="120" cy="38" r="4" fill="#004ac6" />
                  <circle cx="200" cy="84" r="4" fill="#004ac6" />
                  <circle cx="165" cy="168" r="4" fill="#004ac6" />
                  <circle cx="72" cy="165" r="4" fill="#004ac6" />
                  <circle cx="42" cy="85" r="4" fill="#004ac6" />

                  {/* Axis Labels */}
                  <text x="120" y="20" fill="#0d1c2e" textAnchor="middle" className="text-[10px] font-bold">TCWV</text>
                  <text x="216" y="82" fill="#0d1c2e" textAnchor="start" className="text-[10px] font-bold">U850</text>
                  <text x="180" y="196" fill="#0d1c2e" textAnchor="middle" className="text-[10px] font-bold">Z500 Shear</text>
                  <text x="56" y="196" fill="#0d1c2e" textAnchor="middle" className="text-[10px] font-bold">Orographic Slope</text>
                  <text x="24" y="82" fill="#0d1c2e" textAnchor="end" className="text-[10px] font-bold">SSTa</text>
                </svg>
              </div>

              {/* Radar Legend */}
              <div className="flex items-center justify-center gap-6 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-[#004ac6] rounded-full"></span>
                  <span className="font-semibold text-[#0d1c2e]">Observed Synoptic Tensor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 border-b border-dashed border-[#737686]"></span>
                  <span className="text-[#737686]">Climatological Norm</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-[#eff4ff] p-3 rounded-xl flex items-start gap-2.5 border border-[#dce9ff]">
              <Info className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
              <p className="text-xs text-[#434655] leading-normal">
                Gating network weights have routed <strong className="text-[#0d1c2e]">91.4% of total synoptic flux</strong> to Expert #02 with negligible gradient leakage to non-convective branches.
              </p>
            </div>
          </div>
        </section>

        {/* Spatial Validation & Sensor Overlays */}
        <section className="bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#0d1c2e]">Spatial Validation &amp; Sensor Overlays</h3>
              <p className="text-xs text-[#434655]">
                Coincident satellite infrared radiance confirming the deep convective cloud shield supporting regime assignment.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSensorOverlay('insat')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSensorOverlay === 'insat'
                    ? 'bg-[#dce9ff] text-[#004ac6]'
                    : 'bg-[#eff4ff] text-[#434655] hover:text-[#0d1c2e]'
                }`}
              >
                INSAT-3D 10.8µm
              </button>
              <button
                onClick={() => setActiveSensorOverlay('doppler')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSensorOverlay === 'doppler'
                    ? 'bg-[#dce9ff] text-[#004ac6]'
                    : 'bg-[#eff4ff] text-[#434655] hover:text-[#0d1c2e]'
                }`}
              >
                Radar Doppler Reflectivity
              </button>
              <button
                onClick={() => setActiveSensorOverlay('terrain')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeSensorOverlay === 'terrain'
                    ? 'bg-[#dce9ff] text-[#004ac6]'
                    : 'bg-[#eff4ff] text-[#434655] hover:text-[#0d1c2e]'
                }`}
              >
                ERA5 Reanalysis Streamlines
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Sensor Tile 1 */}
            <div
              onClick={() =>
                setInspectedImage({
                  title: 'INSAT-3D TIR-1 Deep Convective Core',
                  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl-6ewSC0vrmlhXAq2ppK1PScgr07ZbPTF6-j41peoZSyH8s8eZgKrOUh3FRqQsafCH4JxKVFxS4NJKIZiNBAXSh5eMYv58JTPi31y5IeApXcZ92lD8NEg_fPdrQoAEFBp2BaJgGrj-ADmJBaz7Fey7EJ0COeu6vFfbfceyaruF521K4J2NXkQQy_PpBBHlPVeSBTeQchKfO4WLrdtH41vHciuVKUmiNo04xqI-ZqkpLNQdvYs72rO',
                  meta: 'Min BT: -78.4°C • Lat 14.2°N, Lon 74.8°E',
                })
              }
              className="flex flex-col bg-[#eff4ff] rounded-xl overflow-hidden border border-[#e2e8f0] group cursor-pointer"
            >
              <div
                className="relative h-48 bg-cover bg-center transition-transform group-hover:scale-102 duration-300"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAl-6ewSC0vrmlhXAq2ppK1PScgr07ZbPTF6-j41peoZSyH8s8eZgKrOUh3FRqQsafCH4JxKVFxS4NJKIZiNBAXSh5eMYv58JTPi31y5IeApXcZ92lD8NEg_fPdrQoAEFBp2BaJgGrj-ADmJBaz7Fey7EJ0COeu6vFfbfceyaruF521K4J2NXkQQy_PpBBHlPVeSBTeQchKfO4WLrdtH41vHciuVKUmiNo04xqI-ZqkpLNQdvYs72rO')",
                }}
              >
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0d1c2e]/80 text-white text-[11px] font-semibold">
                  TIR-1 Brightness Temp
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-white text-[#004ac6] font-mono text-[11px] font-bold shadow-2xs">
                  Min BT: -78.4°C
                </span>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0d1c2e]" />
                </div>
              </div>
              <div className="p-3 flex justify-between items-center bg-white border-t border-[#e2e8f0]">
                <span className="text-xs font-semibold text-[#0d1c2e]">Deep Convective Core</span>
                <span className="text-[11px] text-[#737686] font-mono">Lat 14.2°N, Lon 74.8°E</span>
              </div>
            </div>

            {/* Sensor Tile 2 */}
            <div
              onClick={() =>
                setInspectedImage({
                  title: 'Goa Coastal Doppler Weather Radar (Max dBZ)',
                  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHXVmdhTR3D8riBVyNO1FmtmyUWDRgrxFbjd8kGNPiJu9pBFA1zgKEaalluF6d_BhA79zXcJ9AVsL1ndjpoqTITp8u5CU-GII9TD___HYRP0bIKqAcijmHeM3EQeI_jtMPRsqKpT-w4QcLRToJrmbFzyff3tICITHBpQjCb712ZUlTt4RfHgwEhOAjxRASR2vRqgQ0M9zyOQgp99tPUWzUn6altKMv6Hs0DCOXjm_dMXem7sCtRB2E',
                  meta: 'Peak: 54.2 dBZ • Sweep Elev: 0.5°',
                })
              }
              className="flex flex-col bg-[#eff4ff] rounded-xl overflow-hidden border border-[#e2e8f0] group cursor-pointer"
            >
              <div
                className="relative h-48 bg-cover bg-center transition-transform group-hover:scale-102 duration-300"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHXVmdhTR3D8riBVyNO1FmtmyUWDRgrxFbjd8kGNPiJu9pBFA1zgKEaalluF6d_BhA79zXcJ9AVsL1ndjpoqTITp8u5CU-GII9TD___HYRP0bIKqAcijmHeM3EQeI_jtMPRsqKpT-w4QcLRToJrmbFzyff3tICITHBpQjCb712ZUlTt4RfHgwEhOAjxRASR2vRqgQ0M9zyOQgp99tPUWzUn6altKMv6Hs0DCOXjm_dMXem7sCtRB2E')",
                }}
              >
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0d1c2e]/80 text-white text-[11px] font-semibold">
                  S-Band Doppler Max dBZ
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-white text-[#004ac6] font-mono text-[11px] font-bold shadow-2xs">
                  Peak: 54.2 dBZ
                </span>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0d1c2e]" />
                </div>
              </div>
              <div className="p-3 flex justify-between items-center bg-white border-t border-[#e2e8f0]">
                <span className="text-xs font-semibold text-[#0d1c2e]">Goa / Coastal Doppler Array</span>
                <span className="text-[11px] text-[#737686] font-mono">Sweep Elev: 0.5°</span>
              </div>
            </div>

            {/* Sensor Tile 3 */}
            <div
              onClick={() =>
                setInspectedImage({
                  title: 'Western Ghats Orographic Barrier Digital Elevation Mask',
                  url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
                  meta: 'Peak: 1,892m MSL • SRTM 30m Res',
                })
              }
              className="flex flex-col bg-[#eff4ff] rounded-xl overflow-hidden border border-[#e2e8f0] group cursor-pointer"
            >
              <div
                className="relative h-48 bg-cover bg-center transition-transform group-hover:scale-102 duration-300"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
                }}
              >
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0d1c2e]/80 text-white text-[11px] font-semibold">
                  Terrain &amp; Elevation Mask
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-white text-[#004ac6] font-mono text-[11px] font-bold shadow-2xs">
                  Peak: 1,892m MSL
                </span>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0d1c2e]" />
                </div>
              </div>
              <div className="p-3 flex justify-between items-center bg-white border-t border-[#e2e8f0]">
                <span className="text-xs font-semibold text-[#0d1c2e]">Western Ghats Orographic Barrier</span>
                <span className="text-[11px] text-[#737686] font-mono">SRTM 30m Res</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Image Inspection Lightbox Modal */}
      {inspectedImage && (
        <div
          onClick={() => setInspectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/80 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-[#e2e8f0]"
          >
            <div className="p-4 bg-[#f8f9ff] border-b border-[#e2e8f0] flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#0d1c2e]">{inspectedImage.title}</h4>
                <p className="text-xs text-[#737686] font-mono">{inspectedImage.meta}</p>
              </div>
              <button
                onClick={() => setInspectedImage(null)}
                className="p-1 rounded text-[#737686] hover:bg-[#e2e8f0] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <img
              src={inspectedImage.url}
              alt={inspectedImage.title}
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};
