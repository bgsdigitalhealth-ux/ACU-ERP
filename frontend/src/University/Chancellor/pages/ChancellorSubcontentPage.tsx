import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';
import {
  chancellorApi,
  ChancellorGovernanceRecord,
  ChancellorProposalItem,
} from '../services/chancellorApi';

interface ChancellorSubcontentPageProps {
  pageId: string;
  onBackToDashboard: () => void;
  onOpenProposalModal: (proposal: ChancellorProposalItem) => void;
  proposals: ChancellorProposalItem[];
}

export const ChancellorSubcontentPage: React.FC<ChancellorSubcontentPageProps> = ({
  pageId,
  onBackToDashboard,
  onOpenProposalModal,
  proposals,
}) => {
  const [records, setRecords] = useState<ChancellorGovernanceRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState<ChancellorGovernanceRecord | null>(null);

  // Map subcontent pageId to human-readable titles
  const getSubcontentInfo = (id: string) => {
    switch (id) {
      // University Governance
      case 'policies':
        return {
          title: 'University Policies Repository',
          category: 'University Governance',
          description: 'Official statutory and regulatory policies decreed and approved by the Chancellor.',
        };
      case 'statutes':
        return {
          title: 'Statutes & Regulations',
          category: 'University Governance',
          description: 'Gazetted university statutes under Karnataka Higher Education & University Acts.',
        };
      case 'ordinances':
        return {
          title: 'Ordinances & Amendments',
          category: 'University Governance',
          description: 'Apex academic and executive ordinances passed by the Syndicate.',
        };

      // Academic Oversight
      case 'academic-programs':
        return {
          title: 'Academic Programs (320 Active Curricula)',
          category: 'Academic Oversight',
          description: 'Registry of all undergraduate, postgraduate, and doctoral degree programs.',
        };
      case 'curriculum-approval':
        return {
          title: 'Curriculum & BoS Approvals',
          category: 'Academic Oversight',
          description: 'Board of Studies recommendations and Academic Council verified curricula.',
        };
      case 'exam-evaluation':
        return {
          title: 'Examination & Evaluation Oversight',
          category: 'Academic Oversight',
          description: 'Centralized valuation center reports, result gazettes, and academic audit records.',
        };

      // Administration
      case 'vc-reports':
        return {
          title: 'Vice-Chancellor Executive Reports',
          category: 'Administration',
          description: 'Quarterly institutional performance briefings submitted by the Vice-Chancellor.',
        };
      case 'registrar-updates':
        return {
          title: 'Registrar & Admin Updates',
          category: 'Administration',
          description: 'Statutory filings, compliance submissions, and general administrative orders.',
        };
      case 'hr-appointments':
        return {
          title: 'HR, Professorial & Statutory Appointments',
          category: 'Administration',
          description: 'Apex search committees, promotions, and senior executive functionary records.',
        };

      // Finance & Budget
      case 'annual-budget':
        return {
          title: 'University Consolidated Annual Budget',
          category: 'Finance & Budget',
          description: 'Statutory budget allocations, grants, capital expenditure and revenue accounts.',
        };
      case 'major-expenditures':
        return {
          title: 'Major Expenditure Approvals (> ₹1 Crore)',
          category: 'Finance & Budget',
          description: 'Statutory capital procurement proposals requiring Chancellor assent.',
        };
      case 'audit-compliance':
        return {
          title: 'Audit & Compliance Reports',
          category: 'Finance & Budget',
          description: 'Statutory auditor reports, CAG observations, and compliance certificates.',
        };

      // Research & Innovation
      case 'research-projects':
        return {
          title: 'Research Projects Registry (420 Active Grants)',
          category: 'Research & Innovation',
          description: 'Extramural and intramural funded research projects across health and technology.',
        };
      case 'grants-funding':
        return {
          title: 'Grants & Funding Disbursements',
          category: 'Research & Innovation',
          description: 'Government, ICMR, DST, and industry research grant accounts.',
        };
      case 'collaborations-mous':
        return {
          title: 'Collaborations & MoUs (68 Active Alliances)',
          category: 'Research & Innovation',
          description: 'International and national institutional partnerships authorized by the Chancellor.',
        };

      // Statutory & Meetings
      case 'executive-council':
        return {
          title: 'Executive Council Proceedings',
          category: 'Statutory & Meetings',
          description: 'Statutory agenda, attendee rolls, resolutions, and decree records.',
        };
      case 'academic-council':
        return {
          title: 'Academic Council Proceedings',
          category: 'Statutory & Meetings',
          description: 'Plenary academic meetings, curriculum ratifications, and doctoral decrees.',
        };
      case 'syndicate-meetings':
        return {
          title: 'Syndicate / Board Meetings',
          category: 'Statutory & Meetings',
          description: 'Apex institutional governing board records chaired by the Chancellor.',
        };
      case 'approvals-resolutions':
        return {
          title: 'Approvals & Official Resolutions Registry',
          category: 'Statutory & Meetings',
          description: 'Searchable index of all gazetted decrees and statutory resolutions.',
        };

      // Approvals All
      case 'approvals-all':
        return {
          title: 'All Proposals & Statutory Approvals Flowchart',
          category: 'Chancellor Apex Action',
          description: 'Interactive statutory decision dashboard implementing the full review workflow.',
        };

      // Communication
      case 'communication':
        return {
          title: 'Chancellor Communications & Decrees',
          category: 'Communication',
          description: 'Official proclamations, university community messages, and apex directives.',
        };

      default:
        return {
          title: pageId.replace('-', ' ').toUpperCase(),
          category: 'Chancellor Portal',
          description: 'Statutory university documentation and management view.',
        };
    }
  };

  const info = getSubcontentInfo(pageId);
  const isProposalsView =
    pageId === 'approvals-all' ||
    pageId.includes('proposal') ||
    [
      'New Program Proposals',
      'Policy / Regulation Amendments',
      'Major Expenditure Approvals',
      'MoU / Collaboration Requests',
      'Appointment / Promotion Cases',
    ].includes(pageId);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!isProposalsView) {
        const data = await chancellorApi.fetchGovernanceRecords(pageId, searchQuery);
        if (isMounted) setRecords(data);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [pageId, searchQuery, isProposalsView]);

  const filteredProposals = proposals.filter((p) => {
    const matchesCat =
      pageId === 'approvals-all' ? true : p.category.toLowerCase().includes(pageId.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter;
    const matchesSearch = searchQuery
      ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.proposalCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-5 select-none text-slate-800">
      
      {/* 1. Breadcrumb Bar & Back to Dashboard */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
            <span
              onClick={onBackToDashboard}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Chancellor Portal
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">{info.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-950 font-bold">{info.title}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {info.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">{info.description}</p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="self-start sm:self-center flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-600" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* 2. Controls Bar: Search & Filter */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by code, title, department, or keyword..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Chancellor Action">Pending Chancellor Action</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Returned for Correction">Returned for Correction</option>
          </select>
        </div>
      </div>

      {/* 3. Main Data Content: Proposals Flowchart Table OR Subcontent Records Table */}
      {isProposalsView ? (
        /* Proposals Flowchart Table */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Statutory Proposals Under Review ({filteredProposals.length} Items)
            </div>
            <div className="text-[11px] text-slate-500 font-semibold">
              Click any proposal to review and execute Chancellor decision
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Proposal Title &amp; Category</th>
                  <th className="py-3 px-4">Department / Faculty</th>
                  <th className="py-3 px-4">Budget / Outlay</th>
                  <th className="py-3 px-4">Urgency</th>
                  <th className="py-3 px-4">Workflow Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProposals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      No proposals match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredProposals.map((proposal) => (
                    <tr
                      key={proposal._id || proposal.id || proposal.proposalCode}
                      onClick={() => onOpenProposalModal(proposal)}
                      className="hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-indigo-900 whitespace-nowrap">
                        {proposal.proposalCode}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-indigo-900 transition-colors line-clamp-1">
                          {proposal.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                          {proposal.category}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                        {proposal.department}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-bold text-emerald-800">
                          {proposal.budgetInvolved || 'Nil'}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            proposal.urgency === 'Urgent'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : proposal.urgency === 'High'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {proposal.urgency}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${
                            proposal.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : proposal.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-800 border-rose-300'
                              : proposal.status === 'Returned for Correction'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-indigo-50 text-indigo-800 border-indigo-300'
                          }`}
                        >
                          {proposal.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProposalModal(proposal);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                        >
                          Review &amp; Decide
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Subcontent Governance Records Table */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Official Registry &amp; Statutory Records ({records.length} Records)
            </div>
            <div className="text-[11px] text-slate-500 font-semibold">
              Maintained under the authority of the Chancellor Secretariat
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Title &amp; Subject</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Metric / Outlay</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      No records found for this section.
                    </td>
                  </tr>
                ) : (
                  records.map((rec) => (
                    <tr
                      key={rec._id || rec.id || rec.referenceCode}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-indigo-900 whitespace-nowrap">
                        {rec.referenceCode}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 line-clamp-1">{rec.title}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {rec.summary}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                        {rec.department}
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{rec.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                        {rec.amountOrMetric || '—'}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedRecord(rec)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Details Modal if clicked */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="font-mono text-xs font-bold text-indigo-700">
                {selectedRecord.referenceCode}
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {selectedRecord.title}
              </h3>
              <div className="text-xs text-slate-500 mt-1">
                {selectedRecord.department} • {selectedRecord.date}
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed">
              {selectedRecord.summary}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer"
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

export default ChancellorSubcontentPage;
