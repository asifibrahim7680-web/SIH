import React, { useState } from 'react';
import { NavigationTab } from '../types';
import {
  FileText,
  Terminal,
  ArrowRight,
  CloudRain,
  History,
  Radio,
  CheckCircle,
  ShieldCheck,
  Cpu,
  Server,
  Monitor,
  Sprout,
  Waves,
  Zap,
  AlertTriangle,
  Flame,
} from 'lucide-react';

interface AboutViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenConsole: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateTab, onOpenConsole }) => {
  const [showBibtex, setShowBibtex] = useState(false);

  return (
    <div className="flex flex-col w-full text-[#0d1c2e]">
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-10 pb-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#004ac6] font-semibold uppercase tracking-wider">
              Technical Specification
            </span>
            <span className="text-[#737686]">Document Rev 4.19.0-B</span>
            <span className="text-[#c3c6d7]">•</span>
            <span className="text-[#737686]">Class: Operational Infrastructure</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#0d1c2e] tracking-tight">
                System Architecture &amp; Empirical Methodology
              </h1>
              <p className="text-base text-[#434655] mt-2 leading-relaxed">
                A regime-conditioned neural post-processing engine translating coarse deterministic numerical models into high-precision, terrain-calibrated convective precipitation forecasts.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowBibtex(!showBibtex)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                  showBibtex
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-white hover:bg-[#eff4ff] text-[#0d1c2e] border border-[#e2e8f0]'
                }`}
              >
                <Terminal className="w-4 h-4 text-[#004ac6]" />
                <span>View Citation Node</span>
              </button>

              <button
                onClick={onOpenConsole}
                className="px-4 py-2 rounded-lg bg-[#004ac6] hover:bg-[#1d4ed8] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Operational Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bibtex Drawer */}
          {showBibtex && (
            <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-sm mt-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e2e8f0] text-xs">
                <span className="font-semibold text-[#004ac6]">BibTeX Metadata Record</span>
                <span className="text-[#737686] font-mono">atmospheric_ai_postprocessing_2026.bib</span>
              </div>
              <pre className="font-mono text-xs text-[#434655] overflow-x-auto p-3 bg-[#eff4ff] rounded-lg leading-relaxed select-all">
{`@techreport{atmospheric_ai_2026,
  title       = {Regime-Conditioned Mixture-of-Experts for Convective Monsoon Precipitation Post-Processing},
  author      = {Atmospheric AI Systems Architecture Group},
  institution = {Operational Hydrometeorological Intelligence Consortium},
  year        = {2026},
  number      = {SPEC-NWP-2026-V4}
}`}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto flex flex-col gap-8 pb-16">
        {/* The Physical Bottleneck vs Paradigm Shift */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  The Physical Bottleneck
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0d1c2e]">
                Why Classical NWP Degrades Over Steep Topography
              </h2>
              <p className="text-xs sm:text-sm text-[#434655] mt-3 leading-relaxed">
                Standard Numerical Weather Prediction (NWP) solvers—such as deterministic operational models running at 9km to 25km grid spacings—rely on sub-grid parameterization schemes for deep cumulus convection.
              </p>
              <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                When moist air masses encounter abrupt orographic barriers, hydrostatic smoothing attenuates vertical mass flux gradients. Consequently, peak localized rain rates are underestimated by upwards of 64%, while diurnal initiation peaks are mistimed by up to 3.8 hours across heterogeneous drainage basins.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="font-semibold text-[#0d1c2e]">Unresolved Hydrostatic Dispersion</span>
                <span className="text-rose-600 font-bold font-mono">+3.8h Lag</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#d5e3fc] overflow-hidden">
                <div className="h-full bg-rose-600 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <p className="text-[11px] text-[#737686] mt-1.5">
                Parameterization dampens extreme convective intensity in narrow valleys.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
                <span className="text-xs font-bold text-[#004ac6] uppercase tracking-wider">
                  Operational Paradigm Shift
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0d1c2e]">
                Regime-Conditioned Deep Learning vs. Naive Bias Correction
              </h2>
              <p className="text-xs sm:text-sm text-[#434655] mt-3 leading-relaxed">
                Conventional scalar corrections apply linear quantile mapping across static calendar baselines, assuming stationary error structures. This fails catastrophically during non-linear transition events like pre-monsoon squalls or mesoscale vortex surges.
              </p>
              <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                The Atmospheric AI pipeline dynamically identifies synoptic circulation clusters (Zonal Shears, Cyclonic Ensembles, and Dry Intrusions). Specialized sub-networks (Mixture-of-Experts) evaluate local moisture convergence, thermodynamic stability indices, and microphysics states, producing a spatially continuous, physics-constrained correction matrix.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[11px] text-[#737686] uppercase font-bold">Synoptic Clustered</span>
                <div className="text-3xl font-bold text-[#0d1c2e] mt-1 font-mono">12</div>
                <span className="text-xs text-[#737686]">Active weather regimes</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[11px] text-[#737686] uppercase font-bold">Peak Calibration</span>
                <div className="text-3xl font-bold text-[#004ac6] mt-1 font-mono">94.2%</div>
                <span className="text-xs text-[#737686]">Gauge agreement index</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[11px] text-[#737686] uppercase font-bold">Inference Latency</span>
                <div className="text-3xl font-bold text-[#1d4ed8] mt-1 font-mono">&lt;14s</div>
                <span className="text-xs text-[#737686]">Per regional forecast grid</span>
              </div>
            </div>
          </div>
        </div>

        {/* Atmospheric Data Architecture (Tri-Tier Pipeline) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#004ac6] font-bold uppercase tracking-wider">
                Tri-Tier Pipeline
              </span>
              <h2 className="text-2xl font-bold text-[#0d1c2e]">Atmospheric Data Architecture</h2>
            </div>
            <span className="text-xs text-[#737686] hidden sm:inline-block">
              High-Throughput Heterogeneous Ingestion
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stage 01 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6] mb-4">
                  <CloudRain className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#004ac6] font-bold uppercase tracking-wide">
                  Stage 01 • Dynamic Forcing
                </span>
                <h3 className="text-base font-bold text-[#0d1c2e] mt-1">Numerical Grids (NWP)</h3>
                <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                  Asynchronous ingestion of operational deterministic and 51-member ensemble weather grids ranging from 0.12° to 0.25° resolution across 37 standard isobaric pressure levels.
                </p>
              </div>

              <div className="mt-6 pt-3 flex flex-col gap-1.5 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">ECMWF IFS / HRES</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">0.10° Regridded</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">GFS Ensemble Core</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">0.25° Global</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">Temporal Step</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">Hourly to +72h</span>
                </div>
              </div>
            </div>

            {/* Stage 02 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6] mb-4">
                  <History className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#004ac6] font-bold uppercase tracking-wide">
                  Stage 02 • Representation Grounding
                </span>
                <h3 className="text-base font-bold text-[#0d1c2e] mt-1">40-Year Reanalysis Archives</h3>
                <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                  Pre-trained across four decades of high-resolution atmospheric reanalysis (ERA5 and Regional IMDAA/MERRA-2) to establish baseline synoptic vorticity patterns and orographic wind vectors.
                </p>
              </div>

              <div className="mt-6 pt-3 flex flex-col gap-1.5 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">Temporal Depth</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">1985 — 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">Feature Vector Size</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">128 Variables</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">Reanalysis Grid</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">31km Synoptic</span>
                </div>
              </div>
            </div>

            {/* Stage 03 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6] mb-4">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#004ac6] font-bold uppercase tracking-wide">
                  Stage 03 • Ground Truth Assimilation
                </span>
                <h3 className="text-base font-bold text-[#0d1c2e] mt-1">High-Density Telemetry (AWS)</h3>
                <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                  Ground observation networks with over 4,200 Automatic Weather Stations (AWS) and optical rain gauge streams feeding real-time sub-hourly rainfall rates for loss constraint back-propagation.
                </p>
              </div>

              <div className="mt-6 pt-3 flex flex-col gap-1.5 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">Active Ground Nodes</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">4,281 Monitored</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">Reporting Latency</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">15 Minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737686]">Gauge Accuracy</span>
                  <span className="font-semibold text-[#0d1c2e] font-mono">0.1mm Resolution</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Computational Stack */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs text-[#004ac6] font-bold uppercase tracking-wider">
                Technical Infrastructure
              </span>
              <h2 className="text-2xl font-bold text-[#0d1c2e]">Integrated Computational Stack</h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-2xs border border-[#e2e8f0] text-xs text-[#434655]">
              <Cpu className="w-4 h-4 text-[#004ac6]" />
              <span className="font-semibold">Distributed CUDA Cluster • Microservices Driven</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Modeling Core */}
            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#0d1c2e]">AI Modeling Core</span>
                  <span className="text-[10px] text-[#004ac6] bg-[#dce9ff] px-2 py-0.5 rounded font-bold uppercase">
                    Compute
                  </span>
                </div>
                <p className="text-xs text-[#737686] mb-3">
                  Deep representation learning and calibrated uncertainty quantification.
                </p>
                <ul className="flex flex-col gap-2 text-xs text-[#434655]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>PyTorch Distributed (FSDP Engine)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Sparse Mixture-of-Experts (MoE) Routing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Conformalized Quantile Regression (CQR)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Custom PDE Continuity Loss Enforcers</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-[#e2e8f0] text-right text-[11px] text-[#737686] font-mono">
                Loss: CRPS + 0.15 · L_continuity
              </div>
            </div>

            {/* Backend Ingestion */}
            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#0d1c2e]">Backend Ingestion</span>
                  <span className="text-[10px] text-[#1d4ed8] bg-[#dce9ff] px-2 py-0.5 rounded font-bold uppercase">
                    ETL / Synoptic
                  </span>
                </div>
                <p className="text-xs text-[#737686] mb-3">
                  Real-time GRIB2 raster pipelines and asynchronous service meshes.
                </p>
                <ul className="flex flex-col gap-2 text-xs text-[#434655]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Python 3.12 Asynchronous FastAPI Services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Xarray &amp; Dask Multi-Grid Regridding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>NetCDF4 &amp; HDF5 Memory-Mapped I/O</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>GDAL / PROJ Geodetic Projection Engine</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-[#e2e8f0] text-right text-[11px] text-[#737686] font-mono">
                Ingestion Throughput: 4.8 GB/s
              </div>
            </div>

            {/* Visual Analytics Layer */}
            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#0d1c2e]">Visual Analytics Layer</span>
                  <span className="text-[10px] text-[#4d556b] bg-[#e6eeff] px-2 py-0.5 rounded font-bold uppercase">
                    Client Canvas
                  </span>
                </div>
                <p className="text-xs text-[#737686] mb-3">
                  Sub-second spatial telemetry exploration and vector flow visualization.
                </p>
                <ul className="flex flex-col gap-2 text-xs text-[#434655]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>React &amp; TypeScript High-Assurance Runtime</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Tailwind CSS Token Design Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Dynamic SVG Contour &amp; Vector Tiling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Distribution-Free Quantile Envelopes</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-[#e2e8f0] text-right text-[11px] text-[#737686] font-mono">
                Render Speed: 60 FPS Sync Canvas
              </div>
            </div>
          </div>
        </div>

        {/* Critical Operational Domains */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#004ac6] font-bold uppercase tracking-wider">
                Mission Applications
              </span>
              <h2 className="text-2xl font-bold text-[#0d1c2e]">Critical Operational Domains</h2>
            </div>
            <span className="text-xs text-[#737686] hidden md:inline-block">
              Decision Advantage for High-Consequence Environments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Domain 1 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6] mb-4">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0d1c2e]">Precision Agriculture</h3>
                <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                  48-hour calibrated rainfall onset windows. Allows farm conglomerates and smallholders to optimize precision fertilizer dispersal, avoid chemical wash-off, and automate sub-surface irrigation scheduling.
                </p>
              </div>
              <div className="mt-6 pt-3 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
                <span className="text-[11px] text-[#737686]">Societal Metric</span>
                <div className="text-sm font-bold text-[#0d1c2e] mt-0.5">38% Less Fertilizer Runoff</div>
              </div>
            </div>

            {/* Domain 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6] mb-4">
                  <Waves className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0d1c2e]">Urban Catchments</h3>
                <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                  12 to 24-hour advance convective flash flood warnings across metropolitan stormwater basins. Enables preemptive automated sluice gate deployment and traffic routing around underpass sumps.
                </p>
              </div>
              <div className="mt-6 pt-3 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
                <span className="text-[11px] text-[#737686]">Lead Time Advantage</span>
                <div className="text-sm font-bold text-[#0d1c2e] mt-0.5">+14 Hours Evacuation Lead</div>
              </div>
            </div>

            {/* Domain 3 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6] mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0d1c2e]">Hydropower Operations</h3>
                <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                  Volumetric basin catchment inflow forecasting. Mitigates emergency spillway releases by facilitating phased base load generation ahead of high-volume storm cell landfalls.
                </p>
              </div>
              <div className="mt-6 pt-3 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
                <span className="text-[11px] text-[#737686]">Operational Safety</span>
                <div className="text-sm font-bold text-[#0d1c2e] mt-0.5">99.1% Inflow Volumetric Bound</div>
              </div>
            </div>

            {/* Domain 4 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6] mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0d1c2e]">Civil Defense Preparedness</h3>
                <p className="text-xs sm:text-sm text-[#434655] mt-2 leading-relaxed">
                  High-confidence extreme percentile thresholds (P95/P99) delivered straight to disaster response command centers, reducing false alarm fatigue across landslide-prone mountain sectors.
                </p>
              </div>
              <div className="mt-6 pt-3 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
                <span className="text-[11px] text-[#737686]">False Positive Rate</span>
                <div className="text-sm font-bold text-[#0d1c2e] mt-0.5">-42% False Alarms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Guaranteed Bounds: System Integrity & Deployment Fail-Safes */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]"></span>
                <span className="text-xs font-bold text-[#1d4ed8] uppercase tracking-wider">
                  Guaranteed Bounds
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0d1c2e]">
                System Integrity &amp; Deployment Fail-Safes
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#004ac6] font-semibold">
                Safe-Mode Auto Fallback
              </span>
              <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#737686]">
                Continuous Drift Verifier
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="p-5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
              <span className="text-sm font-bold text-[#0d1c2e] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#004ac6]" />
                Continuous Drift Monitoring &amp; Online Recalibration
              </span>
              <p className="text-xs sm:text-sm text-[#434655] leading-relaxed mt-1">
                Ground validation nodes compare rolling 72-hour forecast surfaces against real-time automatic weather station readouts. If Brier Skill Scores or Continuous Ranked Probability Scores (CRPS) drop below calibrated thresholds, the affected synoptic expert is automatically sandboxed for incremental warm-start fine-tuning.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
              <span className="text-sm font-bold text-[#0d1c2e] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#004ac6]" />
                Thermodynamic Mass &amp; Momentum Enforcers
              </span>
              <p className="text-xs sm:text-sm text-[#434655] leading-relaxed mt-1">
                Unlike unconstrained neural networks, outputs pass through a hard differentiable clipping layer enforcing total column water vapor mass conservation. Sensor telemetry anomalies or synthetic artifacts outside physically possible precipitable water indices immediately trigger fallback to NWP baseline states.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#dce9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#004ac6] font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>[Demonstration Specification &amp; System Architecture Documentation]</span>
            </div>
            <span className="text-[#434655]">Verified for Synoptic Region 0.04° Deployment</span>
          </div>
        </div>
      </section>
    </div>
  );
};
