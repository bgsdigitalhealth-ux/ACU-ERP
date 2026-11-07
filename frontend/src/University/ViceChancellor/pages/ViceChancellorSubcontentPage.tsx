import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  FileCheck,
  Building2,
  Calendar,
  Users,
  Coins,
  GraduationCap,
  FlaskConical,
  BookOpen,
  Mail,
  Settings,
  Scale,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import {
  vicechancellorApi,
  ViceChancellorGovernanceRecord,
  ViceChancellorProposalItem,
} from '../services/vicechancellorApi';

interface VcSubcontentPageProps {
  pageId: string;
  onBackToDashboard: () => void;
  onOpenProposalModal?: (proposal: ViceChancellorProposalItem) => void;
  proposals?: ViceChancellorProposalItem[];
}

export const ViceChancellorSubcontentPage: React.FC<VcSubcontentPageProps> = ({
  pageId,
  onBackToDashboard,
  onOpenProposalModal,
  proposals = [],
}) => {
  const [records, setRecords] = useState<ViceChancellorGovernanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState<ViceChancellorGovernanceRecord | null>(null);

  // Section meta mapping
  const getSubcontentInfo = (id: string) => {
    switch (id) {
      case 'governance':
        return {
          title: 'University Governance & Statutory Compliance',
          category: 'Statutory Administration',
          icon: Building2,
          description:
            'Apex university governance, statute formulation, ordinances, and regulatory alignment with Karnataka State Universities Act.',
        };
      case 'academic-affairs':
      case 'academic-oversight':
        return {
          title: 'Academic Affairs & Curriculum Oversight',
          category: 'Academic Leadership',
          icon: GraduationCap,
          description:
            'Monitoring academic standards, Board of Studies resolutions, program accreditation, curriculum revisions, and student outcomes across 52 departments.',
        };
      case 'examinations':
        return {
          title: 'Examinations, Evaluation & Results Gazette',
          category: 'Academic Oversight',
          icon: FileCheck,
          description:
            'Central evaluation oversight, examination calendar scheduling, results moderation, degree awards, and examination malpractice committee proceedings.',
        };
      case 'research-innovation':
        return {
          title: 'Research, Innovation & Collaborations',
          category: 'Institutional Growth',
          icon: FlaskConical,
          description:
            'Sponsored research projects, national/international grants, patent filings, research center authorizations, and institutional MoUs.',
        };
      case 'human-resources':
        return {
          title: 'Human Resources & Faculty Management',
          category: 'Administration',
          icon: Users,
          description:
            'Statutory selection committees, professor appointments, Career Advancement Scheme (CAS) promotions, faculty welfare, and cadre management.',
        };
      case 'finance-budget':
        return {
          title: 'Finance, Budget & Resource Management',
          category: 'Financial Oversight',
          icon: Coins,
          description:
            'Consolidated university annual budget, statutory grants utilization, capital expenditures, audit compliance, and financial sanctions.',
        };
      case 'planning-development':
        return {
          title: 'Planning & Institutional Development',
          category: 'Infrastructure & Strategy',
          icon: Building2,
          description:
            'Master campus development, laboratory expansions, digital infrastructure modernization, and long-term institutional vision execution.',
        };
      case 'student-affairs':
        return {
          title: 'Student Affairs, Welfare & Grievance Redressal',
          category: 'Student Leadership',
          icon: Users,
          description:
            'Student council administration, scholarships, hostel welfare, anti-ragging cell reports, placement cell analytics, and student grievance appeals.',
        };
      case 'college-affiliation':
        return {
          title: 'College Development & Affiliation Council',
          category: 'University Governance',
          icon: Building2,
          description:
            'Affiliation renewal inspections, permanent affiliation approvals, intake sanctions, and regional constituent college administration.',
        };
      case 'quality-accreditation':
        return {
          title: 'Quality Assurance & Accreditation (NAAC, NBA, NIRF)',
          category: 'Quality Oversight',
          icon: ShieldCheck,
          description:
            'Internal Quality Assurance Cell (IQAC), NAAC cycle preparation, NBA outcome-based education metrics, and NIRF institutional ranking submissions.',
        };
      case 'statutory-meetings':
        return {
          title: 'Statutory Bodies, Councils & Meeting Proceedings',
          category: 'Governance & Councils',
          icon: Calendar,
          description:
            'Executive Council (Syndicate), Academic Council, Finance Committee, and Board of Governors agendas, minutes of meetings, and gazetted resolutions.',
        };
      case 'approvals-workflow':
        return {
          title: 'Approvals & Statutory Decision Workflow',
          category: 'Executive Decision Desk',
          icon: FileCheck,
          description:
            'Pending proposals requiring Vice-Chancellor delegated approval, endorsement for Chancellor assent, or referral to the Syndicate.',
        };
      case 'communication':
        return {
          title: 'Official Communications, Gazettes & Circulars',
          category: 'Institutional Notices',
          icon: Mail,
          description:
            'Statutory notifications, executive orders, official circulars, university press releases, and gazetted announcements.',
        };
      case 'documents-policies':
        return {
          title: 'University Acts, Statues & Policy Repository',
          category: 'Legal & Statutes',
          icon: BookOpen,
          description:
            'Authorized university handbooks, service rules, academic regulations, ethical conduct policies, and gazetted university acts.',
        };
      case 'settings':
        return {
          title: 'Settings & Delegated Role Access Configuration',
          category: 'Security & ERP Admin',
          icon: Settings,
          description:
            'Delegation of powers matrix, Vice-Chancellor secretarial access privileges, multi-factor security credentials, and digital audit logs.',
        };
      default:
        return {
          title: `${id.replace(/-/g, ' ').toUpperCase()} Management`,
          category: 'University Operations',
          icon: Scale,
          description: 'Integrated University ERP module and administrative records.',
        };
    }
  };

  const info = getSubcontentInfo(pageId);
  const IconComp = info.icon;

  // Filter proposals relevant to this page
  const pageProposals = proposals.filter((p) => {
    if (pageId === 'approvals-workflow') return true;
    if (pageId === 'academic-affairs' || pageId === 'academic-oversight')
      return p.category === 'New Program Proposals';
    if (pageId === 'human-resources') return p.category === 'Faculty Appointments';
    if (pageId === 'finance-budget') return p.category === 'Budget Proposals';
    if (pageId === 'governance' || pageId === 'documents-policies')
      return p.category === 'Policy / Regulation Amendments';
    if (pageId === 'research-innovation') return p.category === 'MoU / Collaboration Requests';
    return false;
  });

  // Fetch governance records
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    vicechancellorApi
      .fetchGovernanceRecords(pageId)
      .then((data) => {
        if (isMounted) {
          setRecords(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching governance records:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pageId]);

  // Filter records by status and search
  const filteredRecords = records.filter((r) => {
    const matchesFilter = statusFilter === 'All' || r.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-[#f4f6fb] flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 1. Full-page Navigation Header & Breadcrumbs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition-all cursor-pointer shadow-2xs shrink-0 flex items-center gap-1.5 text-xs font-bold"
            title="Return to VC Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to VC Dashboard</span>
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <span>Vice Chancellor ERP</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500">{info.category}</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5 mt-1">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <IconComp className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <span>{info.title}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">{info.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Records</span>
          </button>
          <button
            onClick={() => {
              const content = JSON.stringify({ module: info.title, records: filteredRecords }, null, 2);
              const blob = new Blob([content], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${pageId}-statutory-records.json`;
              a.click();
            }}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-blue-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Gazette JSON</span>
          </button>
        </div>
      </div>

      {/* 2. Statutory Proposals Requiring VC Action (If Applicable) */}
      {pageProposals.length > 0 && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <span>Statutory Proposals Requiring Vice-Chancellor Action</span>
              </h2>
              <p className="text-xs text-slate-500">
                Proposals submitted under delegated institutional authority awaiting decision, sanction, or endorsement.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
              {pageProposals.length} Action Items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageProposals.map((proposal) => (
              <div
                key={proposal._id || proposal.proposalCode}
                className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                      {proposal.proposalCode}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        proposal.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : proposal.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : proposal.status === 'Endorsed for Chancellor Assent'
                          ? 'bg-amber-100 text-amber-800'
                          : proposal.status === 'Returned for Correction'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800 animate-pulse'
                      }`}
                    >
                      {proposal.status}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {proposal.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2">{proposal.description}</p>

                  <div className="text-[11px] font-medium text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span>Dept: {proposal.department}</span>
                    <span className="font-bold text-slate-800">{proposal.budgetInvolved}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">
                    {proposal.delegatedAuthority}
                  </span>
                  {onOpenProposalModal && (
                    <button
                      onClick={() => onOpenProposalModal(proposal)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>Review &amp; Decide</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Live Governance Ledger / Repository */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, reference, department, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Status:</span>
            {['All', 'Active', 'Approved', 'Gazetted', 'Pending'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-2">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold">Loading statutory records from university database...</span>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-2">
            <Info className="w-8 h-8 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No official records found</div>
            <div className="text-xs text-slate-400">Try adjusting your search query or status filter.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-black text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-3.5">Ref. Code</th>
                  <th className="py-3 px-3.5">Title &amp; Subject</th>
                  <th className="py-3 px-3.5">Department / Wing</th>
                  <th className="py-3 px-3.5">Date Gazetted</th>
                  <th className="py-3 px-3.5">Lead Officer</th>
                  <th className="py-3 px-3.5">Metric / Value</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRecords.map((rec) => (
                  <tr
                    key={rec._id || rec.referenceCode}
                    onClick={() => setSelectedRecord(rec)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {rec.referenceCode}
                    </td>
                    <td className="py-3 px-3.5 font-bold text-slate-900 group-hover:text-blue-700 transition-colors max-w-xs truncate">
                      {rec.title}
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 font-medium whitespace-nowrap">
                      {rec.department}
                    </td>
                    <td className="py-3 px-3.5 text-slate-500 whitespace-nowrap">{rec.date}</td>
                    <td className="py-3 px-3.5 text-slate-700 font-medium whitespace-nowrap">
                      {rec.leadOfficer || 'Registrar / VC Office'}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-slate-900 whitespace-nowrap">
                      {rec.metricOrValue || '—'}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          rec.status === 'Active' || rec.status === 'Approved' || rec.status === 'Gazetted'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{rec.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(rec);
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        Inspect Dossier →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Record Detail Drawer / Dossier Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-mono text-xs font-bold">
                  {selectedRecord.referenceCode}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedRecord.department} • {selectedRecord.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-900 leading-snug">{selectedRecord.title}</h2>
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                {selectedRecord.summary}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Lead Authority</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {selectedRecord.leadOfficer || 'Vice-Chancellor Secretarial Office'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Audit Status</div>
                <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedRecord.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Recorded in ACU University Enterprise ERP</span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViceChancellorSubcontentPage;
