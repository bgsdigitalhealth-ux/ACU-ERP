import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import {
  chancellorApi,
  ChancellorAdmsMetricsData,
} from '../services/chancellorApi';

interface ChancellorAdmsDashboardPageProps {
  onBackToDashboard: () => void;
  academicYear: string;
}

export const ChancellorAdmsDashboardPage: React.FC<ChancellorAdmsDashboardPageProps> = ({
  onBackToDashboard,
  academicYear,
}) => {
  const [metrics, setMetrics] = useState<ChancellorAdmsMetricsData | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const data = await chancellorApi.fetchAdmsMetrics(academicYear);
      if (isMounted) setMetrics(data);
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [academicYear]);

  // Fallbacks matching Image 2
  const enrollment = metrics?.enrollment || [
    { parameter: 'Student Sanction Strength', value: 72, maxScale: 80, color: '#0284c7' },
    { parameter: 'Students to mentor', value: 15, maxScale: 80, color: '#84cc16' },
    { parameter: 'Scholarship & Freeships', value: 5, maxScale: 80, color: '#a3e635' },
  ];

  const curriculum = metrics?.curriculumAcademics || [
    { parameter: 'Revision Programs', value: 11, maxScale: 20, color: '#84cc16' },
    { parameter: 'Course for Skill Development', value: 15, maxScale: 20, color: '#dc2626' },
    { parameter: 'Cert/Dip/Add on course', value: 13, maxScale: 20, color: '#b91c1c' },
    { parameter: 'Student Projects', value: 9, maxScale: 20, color: '#eab308' },
    { parameter: 'Teacher Ph.D Details', value: 6, maxScale: 20, color: '#0284c7' },
  ];

  const research = metrics?.research || [
    { label: '3', value: 3, color: '#dc2626' },
    { label: '7', value: 7, color: '#0284c7' },
    { label: '5', value: 5, color: '#eab308' },
    { label: '8', value: 8, color: '#0284c7' },
  ];

  const infra = metrics?.infrastructureGovernance || [
    { parameter: 'Classroom/Seminar Hall with ICT', value: 5, maxScale: 6, color: '#84cc16' },
    { parameter: 'Book & Journals Annual Expenditure', value: 2, maxScale: 6, color: '#eab308' },
    { parameter: 'Expenditure on Physical and Academic Facilities', value: 5, maxScale: 6, color: '#84cc16' },
    { parameter: 'Quality Initiatives by IQAC', value: 3, maxScale: 6, color: '#0284c7' },
    { parameter: 'Equity Promotion Programs Organized', value: 5, maxScale: 6, color: '#dc2626' },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 select-none text-slate-800">
      
      {/* 1. Breadcrumb Top Bar (ADMS > Parameter's Dashboard) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
            <span
              onClick={onBackToDashboard}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              ADMS
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-950 font-bold">Parameter&apos;s Dashboard</span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Institutional Quality &amp; Governance Parameters
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Key Institutional Performance Indicators, Academic Ratios &amp; IQAC Metrics
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="self-start sm:self-center flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-600" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* 2. 2x2 Grid of Parameter Cards (Image 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        
        {/* Card 1: Enrollment */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 text-center pb-3 border-b border-slate-100">
            Enrollment
          </h2>

          <div className="py-4 space-y-4">
            {enrollment.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>{item.parameter}</span>
                  <span className="font-extrabold text-slate-900">{item.value}</span>
                </div>
                {/* Horizontal Bar */}
                <div className="w-full h-5 bg-slate-100 rounded-md overflow-hidden relative border border-slate-200/60">
                  <div
                    className="h-full rounded-md transition-all duration-500"
                    style={{
                      width: `${(item.value / (item.maxScale || 80)) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Scale Axis */}
          <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 pt-2 border-t border-slate-100">
            <span>0</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
          </div>
        </div>

        {/* Card 2: Curriculum & Academics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 text-center pb-3 border-b border-slate-100">
            Curriculum &amp; Academics
          </h2>

          <div className="py-4 space-y-3">
            {curriculum.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>{item.parameter}</span>
                  <span className="font-extrabold text-slate-900">{item.value}</span>
                </div>
                {/* Horizontal Bar */}
                <div className="w-full h-4 bg-slate-100 rounded-md overflow-hidden relative border border-slate-200/60">
                  <div
                    className="h-full rounded-md transition-all duration-500"
                    style={{
                      width: `${(item.value / (item.maxScale || 20)) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Scale Axis */}
          <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 pt-2 border-t border-slate-100">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </div>

        {/* Card 3: Research */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 text-center pb-3 border-b border-slate-100">
            Research
          </h2>

          <div className="py-4 flex items-end justify-around h-48 border-b border-slate-100 px-4">
            {research.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-xs font-black text-slate-800">{item.value}</span>
                <div
                  className="w-10 sm:w-12 rounded-t-md transition-all duration-500 shadow-2xs"
                  style={{
                    height: `${(item.value / 8) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
                <span className="text-[10px] font-bold text-slate-400">P{idx + 1}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 font-medium">
            <div>P1: Publications (3)</div>
            <div>P2: Funded Projects (7)</div>
            <div>P3: Patents (5)</div>
            <div>P4: Consultancy (8)</div>
          </div>
        </div>

        {/* Card 4: Infrastructure & Governance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 text-center pb-3 border-b border-slate-100">
            Infrastructure &amp; Governance
          </h2>

          <div className="py-4 space-y-3">
            {infra.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="truncate pr-2">{item.parameter}</span>
                  <span className="font-extrabold text-slate-900">{item.value}</span>
                </div>
                {/* Horizontal Bar */}
                <div className="w-full h-3.5 bg-slate-100 rounded-md overflow-hidden relative border border-slate-200/60">
                  <div
                    className="h-full rounded-md transition-all duration-500"
                    style={{
                      width: `${(item.value / (item.maxScale || 6)) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Scale Axis */}
          <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 pt-2 border-t border-slate-100">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChancellorAdmsDashboardPage;
