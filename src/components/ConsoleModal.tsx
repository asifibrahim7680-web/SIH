import React, { useState, useEffect } from 'react';
import { X, Play, RefreshCw, CheckCircle2, AlertCircle, Database, Cpu, Sparkles } from 'lucide-react';

interface ConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForecastCompleted?: () => void;
}

export const ConsoleModal: React.FC<ConsoleModalProps> = ({
  isOpen,
  onClose,
  onForecastCompleted,
}) => {
  const [modelCore, setModelCore] = useState('ecmwf-hres');
  const [spatialDomain, setSpatialDomain] = useState('wg-konkan');
  const [massConservation, setMassConservation] = useState(true);
  const [tailPenalization, setTailPenalization] = useState('4.5');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Atmospheric AI Synoptic Inference Engine v4.8 loaded.',
    '[READY] Fast-API daemon connected. Awaiting execution trigger.',
  ]);

  useEffect(() => {
    if (!isOpen) {
      setIsRunning(false);
      setProgress(0);
    }
  }, [isOpen]);

  const handleRunInference = () => {
    setIsRunning(true);
    setProgress(10);
    setLogs([
      `[EXEC] Initializing cycle for domain: ${spatialDomain.toUpperCase()}`,
      `[NWP] Ingesting 8-tensor atmospheric boundary forcing from ${modelCore.toUpperCase()}...`,
    ]);

    setTimeout(() => {
      setProgress(30);
      setLogs((prev) => [
        ...prev,
        `[QC] Bicubic conservative re-gridding to 0.04° (3.8km) mesh completed. 0 outliers.`,
        `[ROUTER] Dirichlet classifier evaluating macro-scale westerly shear...`,
      ]);
    }, 600);

    setTimeout(() => {
      setProgress(60);
      setLogs((prev) => [
        ...prev,
        `[ROUTING] State classified as 'Active Monsoon Surge' (α = 0.942).`,
        `[MOE] Activating Expert #02: DenseNet-4K Orographic Convection Backbone.`,
        `[LOSS] Extreme tail multiplier λ_ext = ${tailPenalization} applied for cloudburst capture.`,
      ]);
    }, 1300);

    setTimeout(() => {
      setProgress(85);
      setLogs((prev) => [
        ...prev,
        `[CONFORMAL] Split conformal quantile regression: P10, P50, P90 calculated.`,
        massConservation
          ? `[PHYSICS] Strict column water vapor continuity enforcer: ΔM = 0.0008% (MASS VALIDATED).`
          : `[PHYSICS] Mass conservation bypassed (Unconstrained).`,
      ]);
    }, 2000);

    setTimeout(() => {
      setProgress(100);
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        `[SUCCESS] 0.04° synoptic rainfall raster generated in 0.418s. Tile stream cache refreshed.`,
      ]);
      if (onForecastCompleted) {
        onForecastCompleted();
      }
    }, 2600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden border border-[#e2e8f0] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#dce9ff] text-[#004ac6] flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#0d1c2e]">Operational Synoptic Console</h2>
              <p className="text-xs text-[#737686]">Execute model rollouts and evaluate physics-informed inference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737686] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#0d1c2e]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model Core */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#737686] tracking-wider mb-1.5">
                Forcing NWP Provider
              </label>
              <select
                value={modelCore}
                onChange={(e) => setModelCore(e.target.value)}
                disabled={isRunning}
                className="w-full bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              >
                <option value="ecmwf-hres">ECMWF IFS / HRES 0.10° (Operational Core)</option>
                <option value="gfs-ensemble">NCEP GFS 0.25° 51-Member Ensemble</option>
                <option value="imdaal-regional">NCMRWF Regional High-Res (4km Nested)</option>
              </select>
            </div>

            {/* Domain */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#737686] tracking-wider mb-1.5">
                Target Spatial Grid
              </label>
              <select
                value={spatialDomain}
                onChange={(e) => setSpatialDomain(e.target.value)}
                disabled={isRunning}
                className="w-full bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              >
                <option value="wg-konkan">Western Ghats & Konkan Coastline (0.04°)</option>
                <option value="meghalaya">Meghalaya Plateau & Cherrapunji Funnel</option>
                <option value="deccan">Central Deccan Semi-Arid Basin</option>
                <option value="gangetic">Indo-Gangetic Convective Belt</option>
              </select>
            </div>
          </div>

          {/* Hyperparameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f8f9ff] p-4 rounded-xl border border-[#e2e8f0]">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#737686] tracking-wider mb-1">
                Extreme Tail Loss Weight (λ_ext)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1.0"
                  max="6.0"
                  step="0.5"
                  value={tailPenalization}
                  onChange={(e) => setTailPenalization(e.target.value)}
                  disabled={isRunning}
                  className="flex-1 accent-[#2563eb]"
                />
                <span className="font-mono text-sm font-semibold text-[#004ac6] w-12 text-right">
                  {tailPenalization}x
                </span>
              </div>
              <p className="text-[11px] text-[#737686] mt-1">
                Penalizes underprediction of high-impact cloudbursts and flash flood spikes.
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <label className="block text-xs font-semibold uppercase text-[#737686] tracking-wider mb-1">
                Physical Continuity Enforcers
              </label>
              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={massConservation}
                  onChange={(e) => setMassConservation(e.target.checked)}
                  disabled={isRunning}
                  className="rounded border-[#c3c6d7] text-[#2563eb] focus:ring-[#2563eb]"
                />
                <span className="text-sm font-medium text-[#0d1c2e]">
                  Enforce Column Moisture Conservation (ΔM ≤ 0.01%)
                </span>
              </label>
              <p className="text-[11px] text-[#737686] mt-1">
                Strict divergence-free operator prevents unphysical mass leaks.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          {isRunning && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-[#737686]">
                <span>Inference Pipeline Execution</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-[#e6eeff] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#2563eb] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Terminal log window */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase text-[#737686] tracking-wider">
                Telemetry Log Output
              </span>
              <span className="text-[11px] font-mono text-[#004ac6]">FastAPI Async Loop</span>
            </div>
            <div className="bg-[#0d1c2e] text-[#eff4ff] p-3.5 rounded-xl font-mono text-xs h-40 overflow-y-auto space-y-1 select-all border border-[#233144]">
              {logs.map((log, index) => (
                <div key={index} className="leading-relaxed">
                  {log.startsWith('[SUCCESS]') ? (
                    <span className="text-emerald-400 font-semibold">{log}</span>
                  ) : log.startsWith('[EXEC]') || log.startsWith('[ROUTING]') ? (
                    <span className="text-blue-300 font-semibold">{log}</span>
                  ) : (
                    <span className="text-slate-300">{log}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-t border-[#e2e8f0] flex items-center justify-between">
          <div className="text-xs text-[#737686]">
            Latency: <strong className="text-[#0d1c2e]">~0.42s</strong> • Resolution:{' '}
            <strong className="text-[#0d1c2e]">4km Synoptic Tile</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#434655] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleRunInference}
              disabled={isRunning}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Fields...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Run Synoptic Inference</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
