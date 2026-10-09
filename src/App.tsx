import React, { useState } from 'react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ForecastDashboardView } from './views/ForecastDashboardView';
import { HomeView } from './views/HomeView';
import { HowItWorksView } from './views/HowItWorksView';
import { AnalyticsView } from './views/AnalyticsView';
import { RegimeDetectionView } from './views/RegimeDetectionView';
import { AboutView } from './views/AboutView';
import { ConsoleModal } from './components/ConsoleModal';
import { DocumentationModal } from './components/DocumentationModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('forecast-dashboard');
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0d1c2e] font-sans antialiased selection:bg-[#2563eb]/20 selection:text-[#004ac6]">
      {/* Fixed Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenConsole={() => setIsConsoleOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 bg-[#f8f9ff]">
        {currentTab === 'forecast-dashboard' && (
          <ForecastDashboardView
            onNavigateTab={setCurrentTab}
            onOpenConsole={() => setIsConsoleOpen(true)}
          />
        )}

        {currentTab === 'home' && (
          <HomeView onNavigateTab={setCurrentTab} />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksView onNavigateTab={setCurrentTab} />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsView />
        )}

        {currentTab === 'regime-detection' && (
          <RegimeDetectionView />
        )}

        {currentTab === 'about' && (
          <AboutView
            onNavigateTab={setCurrentTab}
            onOpenConsole={() => setIsConsoleOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenDocs={() => setIsDocsOpen(true)} />

      {/* Interactive Global Modals */}
      <ConsoleModal
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
        onForecastCompleted={() => {
          // If in another tab, switch to dashboard to view results
          if (currentTab !== 'forecast-dashboard') {
            setCurrentTab('forecast-dashboard');
          }
        }}
      />

      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}
