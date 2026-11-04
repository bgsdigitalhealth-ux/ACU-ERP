import React, { useState } from 'react';
import {
  GraduationCap,
  Bed,
  ArrowRight,
  ArrowLeft,
  Printer,
  CheckCircle2,
  X,
  CreditCard,
  Building,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { FeeYearSummary, FeeReceiptItem } from '../../../types/student';

export const StudentMyFeePage: React.FC = () => {
  const { activeSubmenu, feeYearRecords, feeReceipts, payFee, profile } = useStudent();
  const [feeCategoryView, setFeeCategoryView] = useState<'cards' | 'details'>('cards');
  const [selectedFeeCategory, setSelectedFeeCategory] = useState<'Academic' | 'Hostel'>('Academic');
  const [activePayModal, setActivePayModal] = useState<FeeYearSummary | null>(null);
  const [payAmount, setPayAmount] = useState<number>(25000);
  const [payMethod, setPayMethod] = useState<'ONLINE' | 'NEFT' | 'ONLINEPAY'>('ONLINE');
  const [activeReceiptModal, setActiveReceiptModal] = useState<FeeReceiptItem | null>(null);
  const [paySuccessToast, setPaySuccessToast] = useState('');

  const totalFees = feeYearRecords.reduce((acc, r) => acc + r.totalFees, 0);
  const totalConcession = feeYearRecords.reduce((acc, r) => acc + r.totalConcession, 0);
  const totalRemitted = feeYearRecords.reduce((acc, r) => acc + r.remittedFee, 0);
  const totalPendingFine = feeYearRecords.reduce((acc, r) => acc + r.pendingFine, 0);
  const totalFineRemitted = feeYearRecords.reduce((acc, r) => acc + r.fineRemitted, 0);
  const totalBalance = feeYearRecords.reduce((acc, r) => acc + r.balanceFee, 0);

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePayModal) return;
    payFee(activePayModal.yearName, payAmount, payMethod);
    setActivePayModal(null);
    setPaySuccessToast(`Payment of ₹${payAmount.toLocaleString()} processed successfully! Receipt generated.`);
    setTimeout(() => setPaySuccessToast(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Pages 25, 26, 27 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        MY FEE &gt;{' '}
        {activeSubmenu === 'receipts'
          ? 'RECEIPTS'
          : activeSubmenu === 'challans'
          ? 'CHALLANS'
          : activeSubmenu === 'online-payments'
          ? 'ONLINE PAYMENTS'
          : 'PAY FEE'}
      </div>

      {paySuccessToast && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{paySuccessToast}</span>
        </div>
      )}

      {/* PAGE 25: PAY FEE - TWO CARDS */}
      {activeSubmenu === 'pay-fee' && feeCategoryView === 'cards' && (
        <div className="space-y-4">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide">
            PAY FEE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Card 1: Academic Fee matching Page 25 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#4a90e2] text-white flex items-center justify-center shadow-md">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#4a90e2] text-white uppercase tracking-wider">
                  ACADEMIC
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900">Academic Fee</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Tuition, Examination, Dissection Hall &amp; Laboratory charges for Phase 1 MBBS Program.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedFeeCategory('Academic');
                    setFeeCategoryView('details');
                  }}
                  className="text-xs sm:text-sm font-bold text-[#4a90e2] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Fee Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Hostel Fee matching Page 25 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#f56c6c] text-white flex items-center justify-center shadow-md">
                  <Bed className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#f56c6c] text-white uppercase tracking-wider">
                  HOSTEL
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900">Hostel Fee</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Hostel room rent, mess charges, electricity &amp; campus amenities.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedFeeCategory('Hostel');
                    setFeeCategoryView('details');
                  }}
                  className="text-xs sm:text-sm font-bold text-[#f56c6c] hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Fee Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 26: FEE DETAILS TABLE matching Page 26 */}
      {activeSubmenu === 'pay-fee' && feeCategoryView === 'details' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <button
              onClick={() => setFeeCategoryView('cards')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase">
              PAY FEE - {selectedFeeCategory.toUpperCase()} FEE DETAILS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100/80 text-gray-700 font-extrabold border-b border-gray-200 uppercase text-[11px]">
                  <th className="p-3 w-10">#</th>
                  <th className="p-3">YEAR</th>
                  <th className="p-3 text-right">TOTAL FEES</th>
                  <th className="p-3 text-right">TOTAL CONCESSION</th>
                  <th className="p-3 text-right">REMITTED FEE</th>
                  <th className="p-3 text-right">PENDING FINE</th>
                  <th className="p-3 text-right">FINE REMITTED</th>
                  <th className="p-3 text-right">BALANCE FEE</th>
                  <th className="p-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {feeYearRecords.map((row) => (
                  <tr key={row.slNo} className="hover:bg-purple-50/20">
                    <td className="p-3 font-bold text-gray-500">{row.slNo}</td>
                    <td className="p-3 font-extrabold text-gray-900">{row.yearName}</td>
                    <td className="p-3 text-right font-semibold text-gray-800">
                      {row.totalFees.toFixed(2)}
                    </td>
                    <td className="p-3 text-right text-gray-500">
                      {row.totalConcession.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-bold text-gray-900">
                      {row.remittedFee.toFixed(0)}
                    </td>
                    <td className="p-3 text-right text-gray-500">
                      {row.pendingFine.toFixed(2)}
                    </td>
                    <td className="p-3 text-right text-gray-500">
                      {row.fineRemitted.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-bold text-emerald-600">
                      {row.balanceFee}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setActivePayModal(row);
                          setPayAmount(row.balanceFee > 0 ? row.balanceFee : 5000);
                        }}
                        className="px-4 py-1 rounded bg-[#a284e8] hover:bg-[#7047eb] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-black text-xs border-t-2 border-gray-300">
                  <td className="p-3">Total</td>
                  <td className="p-3">-</td>
                  <td className="p-3 text-right text-gray-900">{totalFees.toFixed(2)}</td>
                  <td className="p-3 text-right text-gray-500">{totalConcession.toFixed(2)}</td>
                  <td className="p-3 text-right text-gray-900">{totalRemitted.toFixed(2)}</td>
                  <td className="p-3 text-right text-gray-500">{totalPendingFine.toFixed(2)}</td>
                  <td className="p-3 text-right text-gray-500">{totalFineRemitted.toFixed(2)}</td>
                  <td className="p-3 text-right text-emerald-600">{totalBalance.toFixed(2)}</td>
                  <td className="p-3 text-center">-</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="text-[11px] text-gray-400 font-medium">
            * Installment assigned for the semester
          </p>
        </div>
      )}

      {/* PAGE 27: RECEIPTS TABLE matching Page 27 */}
      {activeSubmenu === 'receipts' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            RECEIPTS
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-extrabold border-b border-gray-200 uppercase text-[11px]">
                  <th className="p-3 w-10">#</th>
                  <th className="p-3">RECEIPT NO</th>
                  <th className="p-3">RECEIPT DATE</th>
                  <th className="p-3">PAYMENT METHOD</th>
                  <th className="p-3 text-right">AMOUNT</th>
                  <th className="p-3 text-center w-24">PRINT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {feeReceipts.map((rec) => (
                  <tr key={rec.slNo} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-3 font-bold text-gray-500">{rec.slNo}</td>
                    <td className="p-3 font-mono font-bold text-gray-900">{rec.receiptNo}</td>
                    <td className="p-3 font-medium text-gray-700">{rec.receiptDate}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                        {rec.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3 text-right font-extrabold text-gray-900">
                      {rec.amount.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setActiveReceiptModal(rec)}
                        className="w-7 h-7 rounded bg-[#7047eb] hover:bg-[#5b32d6] text-white inline-flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                        title="Print Official Fee Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CHALLANS SUBMENU */}
      {activeSubmenu === 'challans' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4 max-w-2xl">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            OFFLINE BANK CHALLAN GENERATION
          </h2>
          <p className="text-xs text-gray-600">
            Generate and print pre-filled bank challans for fee remittance at designated State Bank of India or Canara Bank branches.
          </p>

          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-gray-600">Account Name:</span>
              <span className="text-gray-900">Adichunchanagiri University Central Fee Account</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-gray-600">Bank &amp; Branch:</span>
              <span className="text-gray-900">SBI, ACU Campus Branch (IFSC: SBIN0040510)</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-gray-600">Student Roll / Adm No:</span>
              <span className="text-purple-700">{profile.rollNo} / {profile.admissionNo}</span>
            </div>
          </div>

          <button
            onClick={() => alert('Generating 3-copy bank challan PDF (Student / University / Bank Copy)...')}
            className="px-5 py-2 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Generate &amp; Download Fee Challan (PDF)</span>
          </button>
        </div>
      )}

      {/* ONLINE PAYMENTS SUBMENU */}
      {activeSubmenu === 'online-payments' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
          <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            ONLINE PAYMENT TRANSACTION GATEWAY LOG
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-extrabold border-b border-gray-200 text-[11px] uppercase">
                  <th className="p-3">TRANSACTION ID</th>
                  <th className="p-3">DATE &amp; TIME</th>
                  <th className="p-3">GATEWAY REF</th>
                  <th className="p-3">CATEGORY</th>
                  <th className="p-3 text-right">AMOUNT</th>
                  <th className="p-3 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-mono font-bold text-gray-900">TXN-ACU-2026-98124</td>
                  <td className="p-3 text-gray-600">17-01-2026, 04:32 PM</td>
                  <td className="p-3 text-gray-500 font-mono">RZP_pay_Ox88129</td>
                  <td className="p-3 font-semibold text-gray-800">Examination Fee</td>
                  <td className="p-3 text-right font-extrabold text-gray-900">₹5,000.00</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      SUCCESS
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-purple-50/20">
                  <td className="p-3 font-mono font-bold text-gray-900">TXN-ACU-2025-44910</td>
                  <td className="p-3 text-gray-600">23-12-2025, 11:15 AM</td>
                  <td className="p-3 text-gray-500 font-mono">RZP_pay_Nx11024</td>
                  <td className="p-3 font-semibold text-gray-800">Library &amp; Lab Fee</td>
                  <td className="p-3 text-right font-extrabold text-gray-900">₹1,500.00</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      SUCCESS
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {activePayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">
                  Pay Academic Fee - {activePayModal.yearName}
                </h3>
                <p className="text-xs text-gray-500">Secure University Payment Gateway</p>
              </div>
              <button
                onClick={() => setActivePayModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Payment Amount (₹):</label>
                <input
                  type="number"
                  required
                  min={500}
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 font-bold text-gray-900 text-sm outline-hidden focus:border-[#7047eb]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Payment Method:</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      checked={payMethod === 'ONLINE'}
                      onChange={() => setPayMethod('ONLINE')}
                    />
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span className="font-bold">UPI / QR Code / Net Banking</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      checked={payMethod === 'NEFT'}
                      onChange={() => setPayMethod('NEFT')}
                    />
                    <Building className="w-4 h-4 text-blue-600" />
                    <span className="font-bold">NEFT / RTGS Bank Transfer</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActivePayModal(null)}
                  className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white font-bold"
                >
                  Confirm &amp; Pay ₹{payAmount.toLocaleString()}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Printable Fee Receipt Modal */}
      {activeReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border-2 border-purple-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-3">
                <img src="/roles/acu-logo.png" alt="ACU" className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-tight">
                    ADICHUNCHANAGIRI UNIVERSITY
                  </h3>
                  <p className="text-[10px] text-gray-500">
                    B.G. Nagara, Mandya, Karnataka - 571448
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveReceiptModal(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center bg-gray-50 py-1.5 rounded font-black text-xs text-purple-900 uppercase tracking-wider">
              OFFICIAL FEE PAYMENT RECEIPT
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-700 pt-1">
              <div><span className="font-bold text-gray-500">Receipt No: </span><span className="font-mono font-bold text-purple-700">{activeReceiptModal.receiptNo}</span></div>
              <div><span className="font-bold text-gray-500">Receipt Date: </span><span className="font-semibold text-gray-900">{activeReceiptModal.receiptDate}</span></div>
              <div><span className="font-bold text-gray-500">Student Name: </span><span className="font-bold text-gray-900">{profile.fullName}</span></div>
              <div><span className="font-bold text-gray-500">Roll No: </span><span className="font-bold text-purple-700">{profile.rollNo}</span></div>
              <div><span className="font-bold text-gray-500">Programme: </span><span className="font-semibold text-gray-800">{profile.program}</span></div>
              <div><span className="font-bold text-gray-500">Payment Mode: </span><span className="font-bold text-gray-900">{activeReceiptModal.paymentMethod}</span></div>
              <div className="col-span-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-700">Fee Category / Description:</span>
                <span className="font-semibold text-gray-900">{activeReceiptModal.feeType}</span>
              </div>
              <div className="col-span-2 bg-purple-50 p-3 rounded-lg flex items-center justify-between border border-purple-200">
                <span className="font-black text-gray-900 text-sm">TOTAL AMOUNT PAID:</span>
                <span className="font-black text-purple-800 text-base">₹{activeReceiptModal.amount.toLocaleString()}.00</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Authenticated by ACU Finance Office</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-lg bg-[#7047eb] hover:bg-[#5b32d6] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
