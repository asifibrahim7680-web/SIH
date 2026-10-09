import React from 'react';
import { NavigationTab } from '../types';
import { User, Terminal, BookOpen, Activity } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenConsole: () => void;
  onOpenDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenConsole,
  onOpenDocs,
}) => {
  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'forecast-dashboard', label: 'Forecast Dashboard' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'regime-detection', label: 'Regime Detection' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.03)] h-16">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1X0j7I_Z0_taoHuTkGAWxlEFyLMCoAfv3IQNr1D333u6cAHYp3YMtEcra7akUVhafoPGTyXBpKZNKCREaCQHSMmapbncj43NGj235JItvtsu0zghXfnfp3D0Vzee-fKaEtls45wuZtnnz3Vd4b94zt23fAMJkp2fr4ZRrNNiQJbT68go9BqBZVPtyKEqXMHuD9RTCTvMbg-kL6-HM0ttzy0jFpBUP-9jjwVuDq16c11VXSg-JnSRIPDv5k"
              alt="Atmospheric AI Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-semibold text-[17px] text-[#0d1c2e] tracking-tight group-hover:text-[#004ac6] transition-colors">
              Atmospheric AI
            </span>
          </button>

          {/* Nav links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#dce9ff] text-[#004ac6] font-semibold shadow-xs'
                      : 'text-[#434655] hover:bg-[#eff4ff] hover:text-[#0d1c2e]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Operational live indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#c3c6d7]/40 text-[#434655]">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
            <span className="text-[12px] font-medium tracking-tight">
              Model Live • 0.04° Synoptic Grid
            </span>
          </div>

          <button
            onClick={onOpenDocs}
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] text-[#434655] hover:text-[#0d1c2e] font-medium transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#737686]" />
            <span>Documentation</span>
          </button>

          {/* Console CTA */}
          <button
            onClick={onOpenConsole}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-medium rounded-lg shadow-xs transition-all cursor-pointer active:scale-98"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
          </button>

          {/* User profile avatar */}
          <div
            title="Operational Meteorologist"
            className="w-8 h-8 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-sm shadow-xs cursor-pointer hover:ring-2 hover:ring-[#2563eb]/30 transition-all"
          >
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mobile nav bar below header */}
      <div className="xl:hidden flex items-center overflow-x-auto px-4 py-1.5 bg-[#f8f9ff] border-t border-[#e2e8f0] scrollbar-none gap-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`px-2.5 py-1 rounded-md text-[12px] font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#dce9ff] text-[#004ac6] font-semibold'
                  : 'text-[#434655] hover:text-[#0d1c2e]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
