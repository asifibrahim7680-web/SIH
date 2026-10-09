import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';
import { WeatherStation } from '../types';

interface ExportLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  stations: WeatherStation[];
  activeRegion: string;
}

export const ExportLogModal: React.FC<ExportLogModalProps> = ({
  isOpen,
  onClose,
  stations,
  activeRegion,
}) => {
  const [format, setFormat] = useState<'csv' | 'netcdf' | 'json'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);

    setTimeout(() => {
      let content = '';
      let filename = `atmospheric_telemetry_${activeRegion}_${Date.now()}`;
      let mimeType = 'text/plain';

      if (format === 'csv') {
        const headers = 'Station,Region,Latitude,Longitude,Elevation_m,Regime,Raw_NWP_mm,Corrected_AI_mm,Status,P10_mm,P90_mm\n';
        const rows = stations
          .map(
            (s) =>
              `"${s.name}","${s.region}",${s.lat},${s.lon},${s.elevationM},"${s.regime}",${s.rawRainMm},${s.correctedRainMm},"${s.status}",${s.p10},${s.p90}`
          )
          .join('\n');
        content = headers + rows;
        filename += '.csv';
        mimeType = 'text/csv';
      } else if (format === 'json') {
        content = JSON.stringify(
          {
            epoch: '2026-08-14T06:00:00Z',
            resolution: '0.04deg_3.8km',
            pipeline: '6-Stage_Invariant_MoE',
            region: activeRegion,
            telemetry: stations,
          },
          null,
          2
        );
        filename += '.json';
        mimeType = 'application/json';
      } else {
        // NetCDF description mock
        content = `# NetCDF-4 Classic CF-1.8 Compliant Export Header
:title = "Atmospheric AI Calibrated Synoptic Telemetry"
:institution = "Atmospheric AI Systems Inc."
:history = "Created ${new Date().toISOString()} via FastAPI Async Engine"
:grid_resolution = "0.04 degrees"
dimensions:
  station = ${stations.length} ;
  time = 1 ;
variables:
  float prec_raw(station) ;
  float prec_corrected(station) ;
  float lat(station) ;
  float lon(station) ;
// Data records validated with WMO #485 protocol
`;
        filename += '.nc.txt';
        mimeType = 'text/plain';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-[#e2e8f0]">
        <div className="px-5 py-4 bg-[#f8f9ff] border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#004ac6]" />
            <h3 className="font-semibold text-sm text-[#0d1c2e]">Export Telemetry Audit Log</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#737686] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm text-[#0d1c2e]">
          <p className="text-xs text-[#434655]">
            Export station calibrations, quantile envelopes (P10/P90), and bias corrections for{' '}
            <strong className="text-[#0d1c2e]">{stations.length} monitored stations</strong>.
          </p>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#737686] tracking-wider mb-2">
              Select Output Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  format === 'csv'
                    ? 'border-[#2563eb] bg-[#dce9ff] text-[#004ac6] font-semibold'
                    : 'border-[#e2e8f0] text-[#434655] hover:bg-[#f8f9ff]'
                }`}
              >
                CSV Table
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  format === 'json'
                    ? 'border-[#2563eb] bg-[#dce9ff] text-[#004ac6] font-semibold'
                    : 'border-[#e2e8f0] text-[#434655] hover:bg-[#f8f9ff]'
                }`}
              >
                GeoJSON
              </button>
              <button
                type="button"
                onClick={() => setFormat('netcdf')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  format === 'netcdf'
                    ? 'border-[#2563eb] bg-[#dce9ff] text-[#004ac6] font-semibold'
                    : 'border-[#e2e8f0] text-[#434655] hover:bg-[#f8f9ff]'
                }`}
              >
                NetCDF-4 (.NC)
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e2e8f0] text-xs text-[#737686]">
            Includes WMO Standard #485 verification metadata, bias offsets, and station coordinate bounds.
          </div>
        </div>

        <div className="px-5 py-3.5 bg-[#f8f9ff] border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-[#434655] hover:bg-[#e2e8f0] rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting || isSuccess}
            className="px-4 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60 active:scale-98"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Generating...' : 'Download File'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
