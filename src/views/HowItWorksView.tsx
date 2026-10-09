import React, { useState } from 'react';
import { NavigationTab } from '../types';
import {
  CloudRain,
  Sliders,
  Brain,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  Info,
  Server,
  Zap,
  Layers,
  Database,
} from 'lucide-react';

interface HowItWorksViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigateTab }) => {
  const [selectedRegimeDirichlet, setSelectedRegimeDirichlet] = useState<string>('monsoon');

  const dirichletBreakdown = [
    { id: 'monsoon', label: 'Monsoon', val: 0.42, color: '#004ac6' },
    { id: 'cyclonic', label: 'Cyclonic', val: 0.26, color: '#2563eb' },
    { id: 'orographic', label: 'Orographic', val: 0.14, color: '#4069f2' },
    { id: 'convective', label: 'Convective', val: 0.08, color: '#656d84' },
    { id: 'frontal', label: 'Frontal', val: 0.06, color: '#737686' },
    { id: 'divergent', label: 'Divergent', val: 0.04, color: '#8d90a0' },
  ];

  return (
    <div className="flex flex-col w-full text-[#0d1c2e]">
      {/* Header Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex flex-col gap-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[#1d4ed8] text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Architecture &amp; Methodology Specification</span>
          <span className="text-[#c3c6d7]">•</span>
          <span className="text-[#434655] font-normal">v4.8 Operational Core</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0d1c2e] tracking-tight">
              Physics-Guaranteed Neural Atmospheric Pipeline
            </h1>
            <p className="text-base text-[#434655] leading-relaxed">
              An end-to-end multi-scale computational framework translating coarse global numerical weather predictions into sub-kilometer, mass-conserved precipitation risk bounds.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start lg:self-auto bg-[#eff4ff] border border-[#dce9ff] px-5 py-3 rounded-xl shadow-2xs">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#737686] font-semibold uppercase">SYSTEM TOPOLOGY</span>
              <span className="text-sm font-bold text-[#0d1c2e]">6-Stage Invariant MoE</span>
            </div>
            <div className="w-px h-8 bg-[#c3c6d7]/50"></div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#737686] font-semibold uppercase">SPATIAL RESOLUTION</span>
              <span className="text-sm font-bold text-[#004ac6]">0.04° (3.8 km)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 6-Stage Pipeline Canvas */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stage 01 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#e6eeff] text-[#004ac6] font-bold">
                    STAGE 01
                  </span>
                  <span className="text-xs text-[#737686] font-semibold">INGESTION</span>
                </div>
                <CloudRain className="w-5 h-5 text-[#1d4ed8]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold text-[#0d1c2e]">Raw NWP Ingestion</h2>
                <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                  Continuous assimilation of multi-model global numerical weather prediction grids (GFS, ECMWF, operational ensembles) over South Asia.
                </p>
              </div>

              {/* Tensors Tag Block */}
              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-2">
                <span className="text-[11px] text-[#737686] font-semibold uppercase tracking-wider">
                  8 Primary Atmospheric Tensors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['U/V 850 hPa', 'U/V 200 hPa', 'Z500', 'TCWV', 'MSLP', 'SST Field'].map((tensor) => (
                    <span
                      key={tensor}
                      className="px-2 py-0.5 rounded bg-white text-[#0d1c2e] text-xs font-mono font-medium border border-[#e2e8f0]"
                    >
                      {tensor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#737686]">
              <span>Throughput: ~1.4 GB/hr</span>
              <span className="text-[#004ac6] font-semibold flex items-center gap-1">
                Validated <Check className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Stage 02 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#e6eeff] text-[#004ac6] font-bold">
                    STAGE 02
                  </span>
                  <span className="text-xs text-[#737686] font-semibold">PRE-PROCESSING</span>
                </div>
                <Sliders className="w-5 h-5 text-[#1d4ed8]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold text-[#0d1c2e]">QC &amp; Climatology Normalisation</h2>
                <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                  Bicubic conservative re-gridding to high-resolution 4km mesh paired with Median Absolute Deviation (MAD) outlier filtering.
                </p>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#737686] font-semibold">Dropout Artifact Rejection</span>
                  <span className="text-[#0d1c2e] font-bold font-mono">99.94%</span>
                </div>
                <div className="w-full bg-[#e6eeff] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '99.94%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-[#737686] pt-0.5">
                  <span>Sensor Dropouts: Filtered</span>
                  <span>Grid: Conservative</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#737686]">
              <span>Bicubic Interpolation</span>
              <span className="text-[#004ac6] font-semibold flex items-center gap-1">
                Zero Mass Leak <Check className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Stage 03 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#e6eeff] text-[#004ac6] font-bold">
                    STAGE 03
                  </span>
                  <span className="text-xs text-[#737686] font-semibold">CLASSIFICATION</span>
                </div>
                <Brain className="w-5 h-5 text-[#1d4ed8]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold text-[#0d1c2e]">Synoptic Regime Routing</h2>
                <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                  Neural router assesses macro-scale circulation vectors and projects atmospheric state onto a Dirichlet distribution across 6 operational regimes.
                </p>
              </div>

              {/* Dirichlet breakdown */}
              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-2">
                <span className="text-[11px] text-[#737686] font-semibold uppercase tracking-wider">
                  Dirichlet Vector α (Current Batch)
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  {dirichletBreakdown.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRegimeDirichlet(r.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedRegimeDirichlet === r.id
                          ? 'bg-white border-[#2563eb] shadow-2xs scale-102'
                          : 'bg-white/80 border-[#e2e8f0] hover:bg-white'
                      }`}
                    >
                      <div className="font-bold text-[#004ac6] font-mono">{r.val}</div>
                      <div className="text-[9px] text-[#737686] uppercase font-semibold">{r.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#737686]">
              <span>Entropy: 1.28 nats</span>
              <span className="text-[#004ac6] font-semibold flex items-center gap-1">
                Soft Continuous <Check className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Stage 04 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#e6eeff] text-[#004ac6] font-bold">
                    STAGE 04
                  </span>
                  <span className="text-xs text-[#737686] font-semibold">CORE INFERENCE</span>
                </div>
                <Cpu className="w-5 h-5 text-[#1d4ed8]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold text-[#0d1c2e]">MoE Specialist Correction</h2>
                <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                  Dynamic soft-routing to specialized neural expert networks (DenseNet/ResNet backbones) trained with Asymmetric Extreme-Aware Loss functions.
                </p>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-2">
                <span className="text-[11px] text-[#737686] font-semibold uppercase tracking-wider">
                  Extreme Tail Penalization
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0d1c2e] font-medium">Underprediction Weight:</span>
                  <span className="px-2 py-0.5 bg-[#dce9ff] rounded text-[#004ac6] font-bold font-mono">
                    λ_ext = 4.5x
                  </span>
                </div>
                <p className="text-[11px] text-[#737686] leading-normal">
                  Counters inherent Gaussian compression on high-impact cloudburst precipitation events.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#737686]">
              <span>6 Parallel Experts</span>
              <span className="text-[#004ac6] font-semibold flex items-center gap-1">
                Asymmetric Loss <Check className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Stage 05 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#e6eeff] text-[#004ac6] font-bold">
                    STAGE 05
                  </span>
                  <span className="text-xs text-[#737686] font-semibold">CALIBRATION</span>
                </div>
                <TrendingUp className="w-5 h-5 text-[#1d4ed8]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold text-[#0d1c2e]">Uncertainty Conformalization</h2>
                <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                  Distribution-free split conformal prediction delivering rigorous non-parametric P10, P50, and P90 rainfall boundaries.
                </p>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#737686] font-semibold">Coverage Confidence (1 - α)</span>
                  <span className="text-[#004ac6] font-bold">90.0% Guaranteed</span>
                </div>
                <div className="flex items-center py-1">
                  <div className="h-2 rounded bg-[#e6eeff] flex-1 relative overflow-hidden">
                    <div className="absolute inset-y-0 bg-[#004ac6] opacity-30 left-[10%] right-[10%]"></div>
                    <div className="absolute inset-y-0 w-1 bg-[#004ac6] left-[50%]"></div>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-[#737686] font-mono">
                  <span>P10: Lower Bound</span>
                  <span>P50: Median</span>
                  <span>P90: Extreme Risk</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#737686]">
              <span>Non-Exchangeable Shift</span>
              <span className="text-[#004ac6] font-semibold flex items-center gap-1">
                P90 Calibrated <Check className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Stage 06 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#e6eeff] text-[#004ac6] font-bold">
                    STAGE 06
                  </span>
                  <span className="text-xs text-[#737686] font-semibold">INVARIANTS</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#1d4ed8]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold text-[#0d1c2e]">Physical Quality &amp; Conservation</h2>
                <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                  Rigid physical post-checks enforcing hard non-negativity invariants (ReLU projection) and conservation of columnar precipitable moisture.
                </p>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0d1c2e] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span> Non-Negativity: R(x,y) ≥ 0
                  </span>
                  <span className="font-semibold text-emerald-600 font-mono">PASS</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0d1c2e] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span> Moisture Conservation
                  </span>
                  <span className="font-semibold text-[#1d4ed8] font-mono">ΔM ≤ 0.01%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0d1c2e] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span> Topographic Clamp
                  </span>
                  <span className="font-semibold text-[#1d4ed8] font-mono">L1 Clamped</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#737686]">
              <span>Latency: 38ms end-to-end</span>
              <span className="text-[#004ac6] font-semibold flex items-center gap-1">
                Physically Sound <Check className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Visual Vector & Progression Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e2e8f0] flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center text-[#004ac6]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0d1c2e]">Continuous Latent Flow Sequence</h3>
              <p className="text-xs text-[#434655]">
                Deterministic transformation from 0.25° NWP tensors down to 3.8km hazard distributions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#737686] overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
            <span className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0d1c2e] font-semibold whitespace-nowrap">
              Input Grid
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0d1c2e] font-semibold whitespace-nowrap">
              4km Tensor
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0d1c2e] font-semibold whitespace-nowrap">
              Dirichlet Router
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0d1c2e] font-semibold whitespace-nowrap">
              6-MoE Blend
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-[#dce9ff] text-[#004ac6] font-bold whitespace-nowrap">
              P10/50/90 Output
            </span>
          </div>
        </div>
      </section>

      {/* Technical Deep-Dive Cards */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Deep Dive 1: Continuous Gating vs Cliff Thresholding */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0d1c2e]">
                Why Soft-Routing Outperforms Hard Thresholding
              </h3>
              <span className="px-2.5 py-0.5 rounded bg-[#eff4ff] text-xs font-semibold text-[#004ac6]">
                Algorithmic Advantage
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
              Traditional meteorological downscaling relies on rigid kinematic thresholds (e.g., if convective available potential energy &gt; 1200 J/kg, apply deep convective equations). This produces severe non-physical boundary artifacts, cliff discontinuities at cell transitions, and instability across transitional weather fronts.
            </p>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#fff5f5] border border-rose-200 flex flex-col gap-2">
                <div className="flex items-center justify-between text-rose-700 font-bold text-xs">
                  <span>Hard Thresholding</span>
                  <X className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#434655] leading-relaxed">
                  Forces discrete model switching. Generates spatial gradient cliffs, spurious vorticity, and high boundary variance when synoptic indicators oscillate near cutoff levels.
                </p>
                <div className="mt-1 text-[11px] text-rose-600 font-semibold font-mono">
                  Boundary Gradient Discontinuity: High (0.84 Δz)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#2563eb]/30 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[#004ac6] font-bold text-xs">
                  <span>Dynamic Soft-Gating (Ours)</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#434655] leading-relaxed">
                  Continuous affine combination across expert subnets weighted by Dirichlet router outputs. Yields continuous C1 spatio-temporal derivatives and smooth transition fields.
                </p>
                <div className="mt-1 text-[11px] text-[#004ac6] font-semibold font-mono">
                  Boundary Smoothness: C1 Continuous
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9ff] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between text-xs text-[#737686] gap-2 border border-[#e2e8f0]">
              <span>
                Mathematical Formulation:{' '}
                <code className="text-[#0d1c2e] font-semibold font-mono">y = ∑ [g_k(x) · E_k(x)]</code>
              </span>
              <span className="text-[#1d4ed8] font-semibold">Lipschitz Bounded</span>
            </div>
          </div>

          {/* Deep Dive 2: Infrastructure & Streaming Engine */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xs border border-[#e2e8f0] flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0d1c2e]">Asynchronous Serving Core</h3>
                <span className="px-2.5 py-0.5 rounded bg-[#eff4ff] text-xs font-semibold text-[#004ac6]">
                  Microservices
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                Engineered on a decoupled FastAPI service mesh designed for low-latency asynchronous raster chunk streaming and WebSocket broadcast.
              </p>

              <div className="flex flex-col gap-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                  <span className="text-[#0d1c2e] font-medium flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#004ac6]" />
                    REST Geospatial Endpoints
                  </span>
                  <span className="text-[#737686]">GeoTIFF / NetCDF4</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                  <span className="text-[#0d1c2e] font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#004ac6]" />
                    FastAPI Async Engine
                  </span>
                  <span className="text-[#737686]">Sub-45ms P99 Loop</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                  <span className="text-[#0d1c2e] font-medium flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#004ac6]" />
                    Tile Protocol Stream
                  </span>
                  <span className="text-[#737686]">Vector XYZ Tiles</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#737686]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
                Redis In-Memory Array Cache
              </span>
              <span className="text-[#0d1c2e] font-bold font-mono">120k req/min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Disclaimer Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
        <div className="w-full bg-[#eff4ff] border border-[#dce9ff] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-[#004ac6] shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#004ac6] uppercase tracking-wider block">
                [Demonstration Pipeline Specification]
              </span>
              <p className="text-xs text-[#434655] mt-0.5">
                Parameters, ensemble loss topologies, and quantile calibration factors depict the operational synoptic testbed for validation runs across South Asian coordinates.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('forecast-dashboard')}
            className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer active:scale-98"
          >
            <span>Inspect In Live View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
