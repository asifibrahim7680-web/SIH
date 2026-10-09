import React, { useState } from 'react';
import { REGIME_CLASSES } from '../data/mockData';
import { LeadTimeHorizon } from '../types';
import {
  Download,
  RotateCw,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Droplets,
  Calendar,
  Layers,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<LeadTimeHorizon>('24h');
  const [selectedMetricCurve, setSelectedMetricCurve] = useState<'ETS' | 'HSS' | 'BSS'>('ETS');
  const [searchFilter, setSearchFilter] = useState('');
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [revalidationSuccess, setRevalidationSuccess] = useState(false);

  const filteredRegimes = REGIME_CLASSES.filter(
    (r) =>
      r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleRevalidation = () => {
    setIsRevalidating(true);
    setRevalidationSuccess(false);
    setTimeout(() => {
      setIsRevalidating(false);
      setRevalidationSuccess(true);
      setTimeout(() => setRevalidationSuccess(false), 2500);
    }, 1500);
  };

  const handleExportNetCDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      const netcdfPayload = `dimensions:
  time = 120 ;
  regime = 6 ;
  lat = 850 ;
  lon = 750 ;
variables:
  float rmse_raw(regime, time) ;
  float rmse_ai(regime, time) ;
  float csi_heavy(regime, time) ;
  float pod(regime, time) ;
  float far(regime, time) ;
// Global Attributes:
  :title = "Atmospheric AI Reanalysis Validation Partition" ;
  :convention = "CF-1.8" ;
  :eval_window = "JJAS 2024" ;
  :verification_standard = "WMO #485" ;
`;
      const blob = new Blob([netcdfPayload], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `atmospheric_validation_metrics_${Date.now()}.nc.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full text-[#0d1c2e]">
      {/* Top Validation Notice Banner */}
      <div className="w-full bg-[#dce9ff] px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs border-b border-[#c3c6d7]/40 text-xs text-[#004ac6]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#004ac6] shrink-0" />
          <span className="font-medium text-[#0d1c2e]">
            Sample Demonstration Data • Synthetic Validation Benchmark Partition (ERA5 / IMD Reanalysis Blend v4.2)
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#434655]">Deterministic Verification Epoch #1,402</span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white shadow-2xs text-[#004ac6] font-semibold font-mono">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span>99.4% Latent Convergence</span>
          </div>
        </div>
      </div>

      {/* Header & Interactive Filter Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-1.5 text-[#004ac6] text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Empirical Validation Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0d1c2e] tracking-tight">
              Model Performance &amp; Validation Analytics
            </h1>
            <p className="text-sm text-[#434655] mt-2 leading-relaxed">
              Rigorous statistical benchmarks comparing raw operational NWP, baseline global corrections, and regime-aware AI across dynamic convective regimes.
            </p>
          </div>

          {/* Action Cluster */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <button
              onClick={handleExportNetCDF}
              disabled={isExporting}
              className="px-4 py-2 bg-white text-[#0d1c2e] text-xs font-semibold rounded-lg border border-[#e2e8f0] shadow-2xs hover:bg-[#eff4ff] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-4 h-4 text-[#737686]" />
              <span>{isExporting ? 'Exporting...' : 'Export Metrics (.NC)'}</span>
            </button>

            <button
              onClick={handleRevalidation}
              disabled={isRevalidating}
              className="px-4 py-2 bg-[#004ac6] text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-[#1d4ed8] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75 active:scale-98"
            >
              {isRevalidating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Recomputing...</span>
                </>
              ) : revalidationSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Metrics Synchronized</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-4 h-4" />
                  <span>Trigger Revalidation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Control Strip */}
        <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e2e8f0]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Region Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#737686] font-semibold">Spatial Domain / Region</label>
              <select className="w-full bg-[#eff4ff] text-[#0d1c2e] text-xs font-medium px-3 py-2 rounded-lg border border-transparent hover:border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 cursor-pointer">
                <option value="pan-india">South Asia Synoptic Domain (04°-38°N, 68°-98°E)</option>
                <option value="western-ghats">Western Ghats Orographic Corridor</option>
                <option value="gangetic-plains">Indo-Gangetic Basin Convective Belt</option>
                <option value="bay-of-bengal">Bay of Bengal Marine Inflow Front</option>
                <option value="himalayan-foothills">Himalayan Foothills Complex Terrain</option>
              </select>
            </div>

            {/* Lead Time Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#737686] font-semibold">Forecast Horizon (Lead-Time)</label>
              <div className="grid grid-cols-4 gap-1 bg-[#eff4ff] p-1 rounded-lg">
                {(['24h', '48h', '72h', '120h'] as LeadTimeHorizon[]).map((horizon) => (
                  <button
                    key={horizon}
                    onClick={() => setSelectedHorizon(horizon)}
                    className={`py-1 rounded text-xs transition-all cursor-pointer ${
                      selectedHorizon === horizon
                        ? 'bg-[#004ac6] text-white font-bold shadow-2xs'
                        : 'text-[#434655] hover:text-[#0d1c2e] font-medium'
                    }`}
                  >
                    {horizon}
                  </button>
                ))}
              </div>
            </div>

            {/* Regime Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#737686] font-semibold">Stratified Atmospheric Regime</label>
              <select className="w-full bg-[#eff4ff] text-[#0d1c2e] text-xs font-medium px-3 py-2 rounded-lg border border-transparent hover:border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 cursor-pointer">
                <option value="all">All Synoptic Regimes (Weighted Blended)</option>
                <option value="active-monsoon">Active Monsoon Deep Depression</option>
                <option value="orographic-surge">Orographic Windward Surge</option>
                <option value="coastal-front">Coastal Convergence Line</option>
                <option value="break-monsoon">Break Monsoon Suppression</option>
                <option value="western-disturbance">Western Disturbance Baroclinic Wave</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#737686] font-semibold">Evaluation Epoch Window</label>
              <div className="flex items-center gap-2 bg-[#eff4ff] px-3 py-2 rounded-lg text-xs">
                <Calendar className="w-4 h-4 text-[#737686]" />
                <span className="text-[#0d1c2e] font-medium flex-1">2024-06-01 to 2024-09-30 (JJAS)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[#0d1c2e]">
              Benchmark Discrepancy &amp; Accuracy Coefficients
            </h2>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#e6eeff] text-[#4d556b] font-medium">
              N = 48,290 Verification Stations
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-[#434655]">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#bec6e0]"></span> Raw NWP Baseline
            </span>
            <span className="flex items-center gap-1.5 text-[#004ac6] font-semibold">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#004ac6]"></span> Regime-Aware AI Output
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Metric 1: MAE */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                Mean Abs Error
              </span>
              <span className="text-[11px] font-bold text-[#004ac6] bg-[#e6eeff] px-1.5 py-0.5 rounded">
                -51.2%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-2">
              <span className="text-3xl font-bold text-[#0d1c2e] font-mono leading-none">4.1</span>
              <span className="text-xs text-[#737686]">mm</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-[#eff4ff] rounded-lg px-2 py-1">
              <span className="text-[#737686]">Raw NWP:</span>
              <span className="text-[#434655] font-medium line-through">8.4 mm</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '48.8%' }}></div>
            </div>
          </div>

          {/* Metric 2: RMSE */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                Root Mean Sq Err
              </span>
              <span className="text-[11px] font-bold text-[#004ac6] bg-[#e6eeff] px-1.5 py-0.5 rounded">
                -39.9%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-2">
              <span className="text-3xl font-bold text-[#0d1c2e] font-mono leading-none">8.9</span>
              <span className="text-xs text-[#737686]">mm</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-[#eff4ff] rounded-lg px-2 py-1">
              <span className="text-[#737686]">Raw NWP:</span>
              <span className="text-[#434655] font-medium line-through">14.8 mm</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '60.1%' }}></div>
            </div>
          </div>

          {/* Metric 3: Pearson Corr */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                Pearson Corr (r)
              </span>
              <span className="text-[11px] font-bold text-[#004ac6] bg-[#e6eeff] px-1.5 py-0.5 rounded">
                +43.5%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-2">
              <span className="text-3xl font-bold text-[#004ac6] font-mono leading-none">0.89</span>
              <span className="text-xs text-[#737686]">idx</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-[#eff4ff] rounded-lg px-2 py-1">
              <span className="text-[#737686]">Raw NWP:</span>
              <span className="text-[#434655] font-medium">0.62 idx</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>

          {/* Metric 4: CSI (>50mm) */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                CSI (&gt;50mm/d)
              </span>
              <span className="text-[11px] font-bold text-[#004ac6] bg-[#e6eeff] px-1.5 py-0.5 rounded">
                +117.8%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-2">
              <span className="text-3xl font-bold text-[#004ac6] font-mono leading-none">0.61</span>
              <span className="text-xs text-[#737686]">skill</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-[#eff4ff] rounded-lg px-2 py-1">
              <span className="text-[#737686]">Raw NWP:</span>
              <span className="text-[#434655] font-medium">0.28 skill</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '61%' }}></div>
            </div>
          </div>

          {/* Metric 5: POD */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                Prob of Detect
              </span>
              <span className="text-[11px] font-bold text-[#004ac6] bg-[#e6eeff] px-1.5 py-0.5 rounded">
                +62.9%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-2">
              <span className="text-3xl font-bold text-[#0d1c2e] font-mono leading-none">0.88</span>
              <span className="text-xs text-[#737686]">POD</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-[#eff4ff] rounded-lg px-2 py-1">
              <span className="text-[#737686]">Raw NWP:</span>
              <span className="text-[#434655] font-medium">0.54 POD</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>

          {/* Metric 6: FAR */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                False Alarm Ratio
              </span>
              <span className="text-[11px] font-bold text-[#004ac6] bg-[#e6eeff] px-1.5 py-0.5 rounded">
                -57.1%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-2">
              <span className="text-3xl font-bold text-[#0d1c2e] font-mono leading-none">0.18</span>
              <span className="text-xs text-[#737686]">FAR</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-[#eff4ff] rounded-lg px-2 py-1">
              <span className="text-[#737686]">Raw NWP:</span>
              <span className="text-[#434655] font-medium line-through">0.42 FAR</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison Charts (7 cols / 5 cols split) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Skill Score Across Lead Times */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0d1c2e]">
                    Skill Score Comparison Across Lead Times (24h to 120h)
                  </h3>
                  <p className="text-xs text-[#737686]">
                    Equitable Threat Score (ETS) stability across forecast range against ground radar truth.
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg self-start">
                  {(['ETS', 'HSS', 'BSS'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMetricCurve(m)}
                      className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${
                        selectedMetricCurve === m
                          ? 'bg-white text-[#004ac6] shadow-xs font-bold'
                          : 'text-[#737686] hover:text-[#0d1c2e]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inline Custom SVG Chart */}
              <div className="w-full mt-4 relative">
                <svg className="w-full h-64 overflow-visible" viewBox="0 0 700 280">
                  <defs>
                    <linearGradient id="analyticsAreaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="40" x2="680" y1="30" y2="30" stroke="#eff4ff" strokeWidth="1.5" />
                  <text x="30" y="34" fill="#737686" textAnchor="end" className="text-[10px] font-mono">0.90</text>
                  <line x1="40" x2="680" y1="80" y2="80" stroke="#eff4ff" strokeWidth="1.5" />
                  <text x="30" y="84" fill="#737686" textAnchor="end" className="text-[10px] font-mono">0.75</text>
                  <line x1="40" x2="680" y1="130" y2="130" stroke="#eff4ff" strokeWidth="1.5" />
                  <text x="30" y="134" fill="#737686" textAnchor="end" className="text-[10px] font-mono">0.60</text>
                  <line x1="40" x2="680" y1="180" y2="180" stroke="#eff4ff" strokeWidth="1.5" />
                  <text x="30" y="184" fill="#737686" textAnchor="end" className="text-[10px] font-mono">0.45</text>
                  <line x1="40" x2="680" y1="230" y2="230" stroke="#eff4ff" strokeWidth="1.5" />
                  <text x="30" y="234" fill="#737686" textAnchor="end" className="text-[10px] font-mono">0.30</text>

                  {/* Area Polygon */}
                  <polygon
                    points="100,45 240,65 380,95 520,135 660,170 660,230 100,230"
                    fill="url(#analyticsAreaGrad)"
                  />

                  {/* Line 1: Raw NWP (Rapid Decay) */}
                  <path
                    d="M 100,140 Q 180,175 240,185 T 380,210 T 520,230 T 660,248"
                    fill="none"
                    stroke="#737686"
                    strokeDasharray="4,4"
                    strokeWidth="2.5"
                  />

                  {/* Line 2: Conventional Poly Regression */}
                  <path
                    d="M 100,105 Q 180,125 240,140 T 380,165 T 520,195 T 660,220"
                    fill="none"
                    stroke="#4069f2"
                    strokeWidth="2"
                  />

                  {/* Line 3: Regime-Aware AI (High Sustained Skill) */}
                  <path
                    d="M 100,45 Q 170,55 240,65 T 380,95 T 520,135 T 660,170"
                    fill="none"
                    stroke="#004ac6"
                    strokeWidth="3.5"
                  />

                  {/* Circles */}
                  <circle cx="100" cy="45" r="5" fill="#ffffff" stroke="#004ac6" strokeWidth="3" />
                  <circle cx="240" cy="65" r="5" fill="#ffffff" stroke="#004ac6" strokeWidth="3" />
                  <circle cx="380" cy="95" r="5" fill="#ffffff" stroke="#004ac6" strokeWidth="3" />
                  <circle cx="520" cy="135" r="5" fill="#ffffff" stroke="#004ac6" strokeWidth="3" />
                  <circle cx="660" cy="170" r="5" fill="#ffffff" stroke="#004ac6" strokeWidth="3" />

                  {/* Highlight Callout at 72h */}
                  <g transform="translate(380, 50)">
                    <rect x="-46" y="-24" width="92" height="20" rx="4" fill="#0d1c2e" />
                    <text x="0" y="-10" fill="#ffffff" textAnchor="middle" className="text-[11px] font-semibold">
                      +94% Skill vs NWP
                    </text>
                    <line x1="0" x2="0" y1="-4" y2="45" stroke="#0d1c2e" strokeDasharray="2,2" strokeWidth="1" />
                  </g>

                  {/* X-Axis Labels */}
                  <text x="100" y="255" fill="#434655" textAnchor="middle" className="text-[11px] font-semibold">T+24h</text>
                  <text x="240" y="255" fill="#434655" textAnchor="middle" className="text-[11px] font-semibold">T+48h</text>
                  <text x="380" y="255" fill="#434655" textAnchor="middle" className="text-[11px] font-semibold">T+72h</text>
                  <text x="520" y="255" fill="#434655" textAnchor="middle" className="text-[11px] font-semibold">T+96h</text>
                  <text x="660" y="255" fill="#434655" textAnchor="middle" className="text-[11px] font-semibold">T+120h</text>
                </svg>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#004ac6]"></span>
                  <span className="font-semibold text-[#0d1c2e]">Regime-Aware AI (Ours)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#4069f2]"></span>
                  <span className="text-[#434655]">Poly MOS Baseline</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-[#737686]"></span>
                  <span className="text-[#737686]">Operational Raw NWP</span>
                </div>
              </div>
              <span className="text-[#737686] font-mono">Confidence Band: p &lt; 0.001 (Wilcoxon Signed-Rank)</span>
            </div>
          </div>

          {/* Chart 2: Extreme Event Tail Recovery (P95+ Threshold) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-[#0d1c2e]">
                  Extreme Event Tail Recovery (P95+ Threshold)
                </h3>
                <Droplets className="w-4 h-4 text-[#004ac6]" />
              </div>
              <p className="text-xs text-[#737686] mb-4">
                Probability density function exhibiting raw model truncation of cloudburst intensity versus AI restoration.
              </p>

              {/* Tail Density SVG */}
              <div className="w-full relative">
                <svg className="w-full h-56 overflow-visible" viewBox="0 0 450 240">
                  {/* Threshold marker zone */}
                  <rect x="230" y="20" width="180" height="170" rx="4" fill="#eff4ff" opacity="0.6" />
                  <text x="240" y="36" fill="#1d4ed8" className="text-[10px] font-bold">
                    P95 Heavy Event Regime (&gt;65 mm/hr)
                  </text>

                  {/* Base Line */}
                  <line x1="40" x2="420" y1="190" y2="190" stroke="#eff4ff" strokeWidth="1.5" />

                  {/* Ground Radar Truth */}
                  <path
                    d="M 40,190 C 80,185 100,50 160,50 C 220,50 260,110 320,135 C 370,155 390,175 420,188"
                    fill="none"
                    stroke="#0d1c2e"
                    strokeDasharray="3,3"
                    strokeWidth="2"
                  />

                  {/* Raw NWP (Truncated) */}
                  <path
                    d="M 40,190 C 80,180 110,40 150,40 C 200,40 230,175 270,186 C 310,189 360,190 420,190"
                    fill="none"
                    stroke="#737686"
                    strokeWidth="2.5"
                  />

                  {/* Regime AI (Fat Tail Retention) */}
                  <path
                    d="M 40,190 C 80,185 105,48 160,48 C 215,48 260,105 320,130 C 370,152 390,174 420,188"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  {/* Underestimate label */}
                  <g transform="translate(290, 155)">
                    <circle cx="0" cy="0" r="3.5" fill="#ba1a1a" />
                    <text x="8" y="4" fill="#ba1a1a" className="text-[9px] font-bold">
                      Raw NWP 68% Underestimate
                    </text>
                  </g>

                  {/* Axis values */}
                  <text x="40" y="210" fill="#737686" textAnchor="middle" className="text-[10px] font-mono">10mm</text>
                  <text x="140" y="210" fill="#737686" textAnchor="middle" className="text-[10px] font-mono">35mm</text>
                  <text x="240" y="210" fill="#737686" textAnchor="middle" className="text-[10px] font-mono">65mm</text>
                  <text x="340" y="210" fill="#737686" textAnchor="middle" className="text-[10px] font-mono">110mm</text>
                  <text x="410" y="210" fill="#737686" textAnchor="middle" className="text-[10px] font-mono">180mm+</text>
                </svg>
              </div>
            </div>

            <div className="mt-3 p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
                <span className="text-xs font-semibold text-[#0d1c2e]">Localized Cloudburst Capture</span>
              </div>
              <span className="text-xs font-bold text-[#004ac6] font-mono">91.4% Sensitivity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stratified Regime Performance Matrix Table */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xs border border-[#e2e8f0] overflow-hidden">
          {/* Table Header & Search */}
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2e8f0]">
            <div>
              <h3 className="text-base font-bold text-[#0d1c2e]">Stratified Regime Performance Matrix</h3>
              <p className="text-xs text-[#737686]">
                Multi-class convective classification decomposed across distinct synoptic flow patterns.
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter regime..."
                className="px-3 py-1.5 pl-8 rounded-lg bg-[#eff4ff] text-[#0d1c2e] text-xs focus:outline-none focus:ring-1 focus:ring-[#004ac6] w-48 border border-transparent"
              />
              <Search className="w-4 h-4 text-[#737686] absolute left-2.5 top-2 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#eff4ff] text-[#737686] text-[11px]">
                  <th className="py-3 px-5 font-semibold">Atmospheric Regime Class</th>
                  <th className="py-3 px-3 font-semibold text-right">Sample Count (N)</th>
                  <th className="py-3 px-3 font-semibold text-right">Raw NWP RMSE</th>
                  <th className="py-3 px-3 font-semibold text-right text-[#004ac6]">AI Corrected RMSE</th>
                  <th className="py-3 px-3 font-semibold text-right">CSI (&gt;35mm)</th>
                  <th className="py-3 px-3 font-semibold text-right">FAR</th>
                  <th className="py-3 px-3 font-semibold text-right">Mean Bias Offset</th>
                  <th className="py-3 px-5 font-semibold text-center">Stability Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {filteredRegimes.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#f8f9ff] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: reg.color }}
                        ></span>
                        <div>
                          <span className="font-semibold text-[#0d1c2e] block">{reg.name}</span>
                          <span className="text-[11px] text-[#737686]">{reg.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-medium text-[#434655]">
                      {reg.sampleCount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#737686]">{reg.rawNwpRmse} mm</td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#004ac6]">
                      {reg.aiCorrectedRmse} mm
                      <span className="text-[10px] text-[#2563eb] block font-normal">
                        -{reg.reductionPct}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-medium">{reg.csi35}</td>
                    <td className="py-3.5 px-3 text-right font-mono">{reg.far}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#2563eb]">{reg.biasOffsetMm}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          reg.status === 'Optimal'
                            ? 'bg-[#dce9ff] text-[#004ac6]'
                            : 'bg-[#eff4ff] text-[#434655]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            reg.status === 'Optimal' ? 'bg-[#004ac6]' : 'bg-[#737686]'
                          }`}
                        ></span>
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-[#eff4ff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#737686]">
            <span>RMSE is computed on 0.04° grid vs dual-polarimetric radar rainfall product estimates.</span>
            <span>Showing {filteredRegimes.length} of {REGIME_CLASSES.length} Identified Regimes</span>
          </div>
        </div>
      </div>

      {/* Validation Protocol Footnote */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
        <div className="bg-[#eff4ff] rounded-2xl p-6 border border-[#dce9ff] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-4xl">
            <h4 className="text-base font-bold text-[#0d1c2e] mb-1">
              Validation Protocol &amp; Spatial Cross-Validation Discipline
            </h4>
            <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
              All presented validation statistics employ block-bootstrapped 5-fold spatial cross-validation to prevent spatial auto-correlation leakage. Synthetic benchmark testing strictly evaluates out-of-sample gauge points quarantined during model parameter estimation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-[10px] text-[#737686] uppercase font-bold tracking-wider">
                Verification Pipeline
              </div>
              <div className="text-base font-bold text-[#004ac6]">WMO Standard #485</div>
            </div>
            <ShieldCheck className="w-8 h-8 text-[#004ac6]" />
          </div>
        </div>
      </div>
    </div>
  );
};
