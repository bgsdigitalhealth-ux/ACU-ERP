import React from 'react';

interface FacultyLayoutProps {
  children: React.ReactNode;
  onBackToPortal?: () => void;
}

export const FacultyLayout: React.FC<FacultyLayoutProps> = ({ children, onBackToPortal }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              FAC
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Faculty Academic & Teaching Station</h1>
              <p className="text-xs text-slate-500">College Institutional Platform • ACU ERP</p>
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
export default FacultyLayout;
