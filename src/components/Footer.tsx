import React from 'react';

interface FooterProps {
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs }) => {
  return (
    <footer className="w-full bg-white border-t border-[#e2e8f0] py-4 text-xs text-[#434655]">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left branding */}
        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <img
              alt="Atmospheric AI Logo"
              className="h-4 w-4 object-contain opacity-80"
              src="https://lh3.googleusercontent.com/aida/AEtjO1X0j7I_Z0_taoHuTkGAWxlEFyLMCoAfv3IQNr1D333u6cAHYp3YMtEcra7akUVhafoPGTyXBpKZNKCREaCQHSMmapbncj43NGj235JItvtsu0zghXfnfp3D0Vzee-fKaEtls45wuZtnnz3Vd4b94zt23fAMJkp2fr4ZRrNNiQJbT68go9BqBZVPtyKEqXMHuD9RTCTvMbg-kL6-HM0ttzy0jFpBUP-9jjwVuDq16c11VXSg-JnSRIPDv5k"
            />
            <span className="font-medium text-[#434655]">Atmospheric AI Operational Telemetry</span>
          </div>
          <span className="text-[#c3c6d7] hidden sm:inline">•</span>
          <span className="text-[#737686]">© 2026 Atmospheric AI Systems Inc. All rights reserved.</span>
        </div>

        {/* Right API Status & Links */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
            <span>API Operational (99.98% Latency &lt; 42ms)</span>
          </div>
          <button
            onClick={onOpenDocs}
            className="text-[#434655] hover:text-[#004ac6] transition-colors cursor-pointer"
          >
            API Reference
          </button>
          <a
            href="mailto:engineering@atmospheric-ai.org"
            className="text-[#434655] hover:text-[#004ac6] transition-colors"
          >
            Contact Engineering
          </a>
        </div>
      </div>
    </footer>
  );
};
