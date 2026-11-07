import React from 'react';

interface ResearchLayoutProps {
  children: React.ReactNode;
  onBackToPortal?: () => void;
}

export const ResearchLayout: React.FC<ResearchLayoutProps> = ({ children, onBackToPortal }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              RES
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">University Directorate of Research & Patents</h1>
              <p className="text-xs text-slate-500">University Institutional Platform • ACU ERP</p>
            </div>
          </div>
          {onBackToPortal && (
            <button
              onClick={onBackToPortal}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              ← Back to Portal
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};
export default ResearchLayout;
