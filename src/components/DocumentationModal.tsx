import React from 'react';
import { X, BookOpen, Layers, ShieldCheck, Activity, Terminal, ArrowRight } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-[#e2e8f0] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#dce9ff] text-[#004ac6] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#0d1c2e]">Atmospheric AI Technical Reference</h2>
              <p className="text-xs text-[#737686]">Architecture, mathematical formulation, and REST API specification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737686] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#0d1c2e] text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-[#004ac6] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              1. Mathematical Formulation of Regime-Aware Soft Gating
            </h3>
            <p className="text-[#434655]">
              Traditional statistical downscaling or Model Output Statistics (MOS) applies rigid kinematic cutoffs, producing boundary discontinuities. Atmospheric AI employs dynamic continuous soft-gating over specialized neural sub-networks:
            </p>
            <div className="bg-[#f8f9ff] p-4 rounded-xl border border-[#e2e8f0] font-mono text-xs text-[#0d1c2e]">
              <span className="text-[#004ac6] font-semibold">y(x) = ∑ [ g_k(x) · E_k(x) ]</span> where <span className="text-[#004ac6]">∑ g_k(x) = 1</span>
            </div>
            <p className="text-xs text-[#737686]">
              where <code>g_k(x)</code> is the Dirichlet gating probability for regime <code>k</code>, and <code>E_k(x)</code> is the corresponding expert neural backbone (DenseNet-4K / ResNet-50) conditioned on 8 atmospheric tensors.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-[#004ac6] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              2. Distribution-Free Conformal Quantile Envelopes
            </h3>
            <p className="text-[#434655]">
              Standard uncalibrated deep learning produces overconfident point forecasts during non-linear monsoonal surges. We implement split conformal quantile regression (CQR) guaranteeing exact non-parametric coverage bounds:
            </p>
            <div className="bg-[#f8f9ff] p-3.5 rounded-xl border border-[#e2e8f0] space-y-1.5 text-xs">
              <div className="flex justify-between font-mono">
                <span>P10 (Lower Bound):</span>
                <span className="text-[#737686]">90% confidence lower precipitation floor</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>P50 (Median Expectation):</span>
                <span className="text-[#004ac6] font-semibold">Calibrated operational point estimate</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>P90 (Extreme Hazard Tail):</span>
                <span className="text-rose-600 font-semibold">Disaster response cloudburst activation bound</span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-[#004ac6] flex items-center gap-2">
              <Activity className="w-4 h-4" />
              3. REST Geospatial Microservices API
            </h3>
            <p className="text-[#434655]">
              Real-time programmatic endpoints supporting NetCDF-4, GeoTIFF, and Vector XYZ tiling:
            </p>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg flex items-center justify-between">
                <div>
                  <span className="px-1.5 py-0.5 rounded bg-[#2563eb] text-white font-semibold text-[10px] mr-2">GET</span>
                  <code>/api/v4/synoptic/inference?domain=wg&lead=48h</code>
                </div>
                <span className="text-xs text-[#737686]">GeoTIFF / NetCDF-4 stream</span>
              </div>
              <div className="p-2.5 bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg flex items-center justify-between">
                <div>
                  <span className="px-1.5 py-0.5 rounded bg-[#2563eb] text-white font-semibold text-[10px] mr-2">GET</span>
                  <code>/api/v4/regimes/current?lat=17.92&lon=73.65</code>
                </div>
                <span className="text-xs text-[#737686]">Softmax Dirichlet vector (JSON)</span>
              </div>
              <div className="p-2.5 bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg flex items-center justify-between">
                <div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-semibold text-[10px] mr-2">WSS</span>
                  <code>wss://telemetry.atmospheric-ai.org/v4/stream</code>
                </div>
                <span className="text-xs text-[#737686]">Sub-second station telemetry feed</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-t border-[#e2e8f0] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#004ac6] hover:bg-[#1d4ed8] text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-xs"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
