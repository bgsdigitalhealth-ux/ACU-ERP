import React from 'react';
import { AcuLogo } from './AcuLogo';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const TopHeader: React.FC = () => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-purple-100 px-4 sm:px-8 py-2 shadow-xs relative z-30 select-none">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Official ACU Logo */}
        <AcuLogo size="md" />

        {/* Center / Right: Institutional Intelligence Platform Tag */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200/60 font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI-Powered Institutional Governance</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>NAAC &amp; Statutory Compliant</span>
          </div>
        </div>
      </div>
    </header>
  );
};
