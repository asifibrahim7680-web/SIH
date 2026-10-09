import React, { useState } from 'react';
import { NavigationTab } from '../types';
import {
  ArrowRight,
  Sliders,
  Database,
  Grid,
  Zap,
  Radio,
  Scale,
  GitBranch,
  Shield,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

interface HomeViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateTab }) => {
  const [activeHorizon, setActiveHorizon] = useState<'00h' | '12h' | '24h' | '48h' | '72h'>('24h');

  // Horizon multipliers for sensor pins
  const multiplier =
    activeHorizon === '00h'
      ? 0.3
      : activeHorizon === '12h'
      ? 0.7
      : activeHorizon === '24h'
      ? 1.0
      : activeHorizon === '48h'
      ? 1.4
      : 1.85;

  const bomRain = (54.2 * multiplier).toFixed(1);
  const punRain = (31.8 * multiplier).toFixed(1);
  const nagRain = (4.6 * multiplier).toFixed(1);

  return (
    <div className="flex flex-col w-full text-[#0d1c2e]">
      {/* Top Ambient Glow & Hero */}
      <div className="relative w-full overflow-hidden bg-white">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#dbe1ff]/40 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-10 pb-8 flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Operational Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#e2e8f0] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
            <span className="text-[11px] text-[#434655] font-semibold uppercase tracking-wider">
              Operational AI Post-Processing for Numerical Weather Models
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1c2e] tracking-tight mt-5 max-w-4xl leading-[1.15]">
            High-precision rainfall forecasting, corrected by regime-aware intelligence.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#4d556b] mt-4 max-w-2xl leading-relaxed">
            Eliminate systematic orographic and convective bias from global weather prediction grids with neural
            Mixture-of-Experts and physical conservation constraints.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => onNavigateTab('forecast-dashboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <span>Explore Forecast Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('how-it-works')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#eff4ff] text-[#0d1c2e] text-sm font-semibold rounded-lg border border-[#e2e8f0] shadow-2xs transition-all cursor-pointer"
            >
              <span>View How It Works</span>
              <Sliders className="w-4 h-4 text-[#737686]" />
            </button>
          </div>

          {/* Trust & Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 pt-4 px-6 rounded-lg bg-white border border-[#e2e8f0] text-[#737686] text-xs font-medium shadow-2xs">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#2563eb]" />
              Trained on 40-year atmospheric reanalysis data
            </span>
            <span className="text-[#c3c6d7] hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-[#2563eb]" />
              Sub-grid 4km resolution
            </span>
            <span className="text-[#c3c6d7] hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#2563eb]" />
              Real-time inference &lt;0.5s
            </span>
          </div>
        </section>

        {/* Synoptic Preview Workspace */}
        <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl bg-white shadow-md border border-[#e2e8f0] overflow-hidden p-4 sm:p-5">
            {/* Top Toolbar of Map Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-2 bg-white">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#2563eb]" />
                  <h2 className="text-base font-semibold text-[#0d1c2e]">
                    South Asia Synoptic Moisture & Precipitation Grid
                  </h2>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#e6eeff] text-[#434655] text-[11px] font-semibold uppercase tracking-tight">
                  [Demonstration Dataset • Synthetic Benchmark Run]
                </span>
              </div>

              {/* Live Diagnostic Readouts */}
              <div className="flex items-center flex-wrap gap-2 text-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#eff4ff]">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-ping"></span>
                  <span className="text-[#0d1c2e]">Current Regime:</span>
                  <span className="font-semibold text-[#004ac6]">Active Monsoon Surge (92.4%)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#eff4ff]">
                  <Scale className="w-3.5 h-3.5 text-[#737686]" />
                  <span className="text-[#0d1c2e]">Bias Offset:</span>
                  <span className="font-semibold text-[#2563eb]">-18.2 mm/24h calibrated</span>
                </div>
              </div>
            </div>

            {/* Geospatial Canvas Preview */}
            <div className="relative w-full h-[460px] rounded-xl bg-[#eff4ff] overflow-hidden flex items-center justify-center border border-[#e2e8f0]">
              {/* Synthetic Overlays SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 1000 500"
              >
                <defs>
                  <pattern id="home-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#2563EB"
                      strokeOpacity="0.2"
                      strokeWidth="0.35"
                    />
                  </pattern>
                  <linearGradient id="homeRainGrad" x1="0%" x2="100%" y1="0%" y2="80%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.0" />
                    <stop offset="45%" stopColor="#4069f2" stopOpacity="0.35" />
                    <stop offset="70%" stopColor="#1d4ed8" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#001551" stopOpacity="0.75" />
                  </linearGradient>
                </defs>

                <rect width="1000" height="500" fill="url(#home-grid)" />

                {/* Frontal Boundary / Orographic Rain Mass */}
                <path
                  d="M 120,480 Q 240,320 380,240 T 640,140 T 920,80"
                  fill="none"
                  opacity="0.6"
                  stroke="#2563eb"
                  strokeDasharray="6,4"
                  strokeWidth="1.5"
                />

                {/* Isobar Contours */}
                <path d="M 180,500 C 290,360 410,310 520,280 C 650,240 760,180 890,90" fill="none" opacity="0.4" stroke="#737686" strokeWidth="0.8" />
                <path d="M 230,500 C 340,380 460,330 580,300 C 700,260 820,200 950,110" fill="none" opacity="0.3" stroke="#737686" strokeWidth="0.8" />
                <path d="M 280,500 C 380,410 510,360 630,330 C 740,300 870,230 1000,140" fill="none" opacity="0.25" stroke="#737686" strokeWidth="0.8" />

                {/* High Intensity Convective Plume Area (Western Ghats & Konkan) */}
                <path
                  d="M 320,430 C 340,330 380,260 450,210 C 520,160 590,200 580,290 C 570,360 440,450 320,430 Z"
                  fill="url(#homeRainGrad)"
                />

                {/* Sub-Grid Cells */}
                <polygon points="410,240 435,230 460,250 435,260" fill="#2563eb" fillOpacity="0.5" stroke="#ffffff" strokeWidth="0.7" />
                <polygon points="435,230 470,210 495,230 460,250" fill="#1d4ed8" fillOpacity="0.7" stroke="#ffffff" strokeWidth="0.7" />
                <polygon points="460,250 495,230 515,260 480,280" fill="#001551" fillOpacity="0.8" stroke="#ffffff" strokeWidth="0.7" />

                {/* Streamline Wind Vectors SW to NE */}
                <g opacity="0.6" stroke="#2563eb" strokeWidth="1.2">
                  <path d="M 210,410 L 235,395" />
                  <path d="M 270,360 L 295,345" />
                  <path d="M 350,300 L 380,285" />
                  <path d="M 450,240 L 480,225" />
                  <path d="M 520,200 L 550,185" />
                </g>
              </svg>

              {/* Interactive Sensor Station Pins */}
              {/* Station BOM-09 */}
              <div
                onClick={() => onNavigateTab('forecast-dashboard')}
                className="absolute left-[38%] top-[45%] flex flex-col items-center group cursor-pointer z-10"
              >
                <div className="px-2.5 py-1 rounded-md bg-white text-[#0d1c2e] text-xs font-semibold shadow-md whitespace-nowrap mb-1 group-hover:scale-105 transition-transform">
                  Station BOM-09 • <strong className="text-[#004ac6]">{bomRain} mm/h</strong>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#2563eb] ring-4 ring-[#b4c5ff]/60 animate-bounce"></div>
              </div>

              {/* Station PUN-04 */}
              <div
                onClick={() => onNavigateTab('forecast-dashboard')}
                className="absolute left-[54%] top-[34%] flex flex-col items-center group cursor-pointer z-10"
              >
                <div className="px-2.5 py-1 rounded-md bg-white text-[#0d1c2e] text-xs font-medium shadow-md whitespace-nowrap mb-1 group-hover:scale-105 transition-transform">
                  Station PUN-04 • <strong className="text-[#1d4ed8]">{punRain} mm/h</strong>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#1d4ed8] ring-2 ring-[#b4c5ff]/40"></div>
              </div>

              {/* Station NAG-12 */}
              <div
                onClick={() => onNavigateTab('forecast-dashboard')}
                className="absolute left-[68%] top-[22%] flex flex-col items-center group cursor-pointer z-10"
              >
                <div className="px-2.5 py-1 rounded-md bg-white text-[#0d1c2e] text-xs font-medium shadow-md whitespace-nowrap mb-1 group-hover:scale-105 transition-transform">
                  Station NAG-12 • <strong>{nagRain} mm/h</strong>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#4d556b]"></div>
              </div>

              {/* Bottom Control Bar & Precipitation Legend */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-white/95 backdrop-blur-xs shadow-md border border-[#e2e8f0]">
                {/* Timeline scrub snapshot */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#737686] font-semibold uppercase">Horizon:</span>
                  <div className="flex items-center gap-1">
                    {(['00h', '12h', '24h', '48h', '72h'] as const).map((hz) => (
                      <button
                        key={hz}
                        onClick={() => setActiveHorizon(hz)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                          activeHorizon === hz
                            ? 'bg-[#2563eb] text-white font-semibold shadow-2xs'
                            : 'bg-[#f8f9ff] text-[#434655] hover:bg-[#e6eeff]'
                        }`}
                      >
                        {hz === '24h' ? '24h (Live)' : hz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Precipitation Color Scale Bar */}
                <div className="flex items-center gap-3 text-xs text-[#737686]">
                  <span>Rainfall Intensity</span>
                  <div className="flex items-center">
                    <span className="mr-1.5 font-mono">0 mm</span>
                    <div className="w-32 h-2 rounded-full bg-gradient-to-r from-[#d5e3fc] via-[#2563eb] to-[#001551]"></div>
                    <span className="ml-1.5 font-mono">&gt;65 mm/h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Summary Micro-Grid under map */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e2e8f0] flex flex-col">
                <span className="text-[11px] text-[#737686] font-semibold uppercase">Orographic Correction</span>
                <span className="text-base font-semibold text-[#0d1c2e] mt-0.5">+34.8% Skill</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e2e8f0] flex flex-col">
                <span className="text-[11px] text-[#737686] font-semibold uppercase">Root Mean Square Error</span>
                <span className="text-base font-semibold text-[#0d1c2e] mt-0.5">
                  3.12 mm/h <span className="text-[#1d4ed8] text-xs font-normal">(-41%)</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e2e8f0] flex flex-col">
                <span className="text-[11px] text-[#737686] font-semibold uppercase">Convective Trigger Index</span>
                <span className="text-base font-semibold text-[#0d1c2e] mt-0.5">0.88 High CAPE</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e2e8f0] flex flex-col">
                <span className="text-[11px] text-[#737686] font-semibold uppercase">Conservation Drift</span>
                <span className="text-base font-semibold text-[#0d1c2e] mt-0.5">0.0012% Mass Valid</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Core Technological Capabilities (3-Column White Cards) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-start max-w-2xl mb-8">
          <span className="text-xs text-[#004ac6] font-semibold uppercase tracking-wider">
            Algorithmic Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] mt-1.5">
            Physics-informed post-processing designed for meteorological precision.
          </h2>
          <p className="text-sm text-[#4d556b] mt-2">
            Addressing numerical model deficiencies through domain-specific machine learning architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: MoE */}
          <div className="flex flex-col p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#004ac6] mb-4">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#0d1c2e]">
              Mixture-of-Experts Architecture
            </h3>
            <p className="text-sm text-[#4d556b] mt-2 leading-relaxed">
              Specialized neural sub-networks activate dynamically based on prevailing atmospheric dynamics—partitioning compute between active monsoonal surges, synoptic depressions, and localized dry spells.
            </p>
            <div className="mt-auto pt-6 flex items-center gap-1.5 text-xs text-[#004ac6] font-semibold">
              <span>Gating parameter dynamic routing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Physical Conservation Bounds */}
          <div className="flex flex-col p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#004ac6] mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#0d1c2e]">
              Physical Conservation Bounds
            </h3>
            <p className="text-sm text-[#4d556b] mt-2 leading-relaxed">
              Hard mathematical guarantees enforcing non-negative precipitation and column water vapor flux continuity. Prevents unphysical hallucinations and energy drift common in standard unconstrained neural models.
            </p>
            <div className="mt-auto pt-6 flex items-center gap-1.5 text-xs text-[#004ac6] font-semibold">
              <span>Strict divergence-free operators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Quantified Uncertainty */}
          <div className="flex flex-col p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#004ac6] mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#0d1c2e]">
              Quantified Uncertainty
            </h3>
            <p className="text-sm text-[#4d556b] mt-2 leading-relaxed">
              Conformal P10, P50, and P90 prediction envelopes giving reliable risk boundaries for decision makers. Calibrated confidence measures adapt to steep topography and fast-moving severe storm fronts.
            </p>
            <div className="mt-auto pt-6 flex items-center gap-1.5 text-xs text-[#004ac6] font-semibold">
              <span>Conformalized probabilistic intervals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Snapshot & Key Performance Indicators */}
      <section className="w-full bg-[#eff4ff] py-12 border-t border-[#e2e8f0]">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Metric Band */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#737686] font-semibold uppercase tracking-wider">
                Sub-Grid Resolution
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-bold text-[#0d1c2e]">4km</span>
                <span className="text-xs text-[#1d4ed8] font-semibold">downscaled</span>
              </div>
              <span className="text-xs text-[#737686] mt-1">
                From standard 25km raw GFS/ECMWF numerical meshes
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#737686] font-semibold uppercase tracking-wider">
                Pipeline Latency
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-bold text-[#0d1c2e]">0.42s</span>
                <span className="text-xs text-[#004ac6] font-semibold">real-time</span>
              </div>
              <span className="text-xs text-[#737686] mt-1">
                Full synoptic tile inference across 2.4M grid coordinates
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#737686] font-semibold uppercase tracking-wider">
                Conservation Invariance
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-bold text-[#0d1c2e]">99.8%</span>
                <span className="text-xs text-[#1d4ed8] font-semibold">adherence</span>
              </div>
              <span className="text-xs text-[#737686] mt-1">
                Mathematical satisfaction of precipitable water constraints
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#737686] font-semibold uppercase tracking-wider">
                Forecast Horizons
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-bold text-[#0d1c2e]">48h–120h</span>
                <span className="text-xs text-[#737686] font-semibold">synoptic</span>
              </div>
              <span className="text-xs text-[#737686] mt-1">
                Continuous hourly multi-step rollouts without error compounding
              </span>
            </div>
          </div>

          {/* Call To Action Panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col max-w-xl">
              <div className="flex items-center gap-1.5 text-[#004ac6] mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Operational Ready Deployment
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0d1c2e]">
                Evaluate synoptic regimes with live atmospheric telemetry.
              </h3>
              <p className="text-sm text-[#4d556b] mt-1.5">
                Inspect model skill metrics, compare raw NWP baselines with AI post-processed fields, and track uncertainty intervals in real time.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => onNavigateTab('forecast-dashboard')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer active:scale-98"
              >
                <span>Launch Forecast Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
