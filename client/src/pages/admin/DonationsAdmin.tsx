import React, { useState } from 'react';
import {
  Wallet,
  Clock,
  Download,
  Search,
  RotateCcw,
  Sparkles,
  QrCode,
  AlertCircle
} from 'lucide-react';

export const DonationsAdmin: React.FC = () => {
  const [activeSubtab, setActiveSubtab] = useState<'ledger' | 'impact' | 'qr'>('ledger');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  return (
    <div className="space-y-6">
      {/* Header with Subtabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl p-[2px] bg-gradient-to-tr from-teal-800 to-emerald-500 shadow-md shadow-teal-900/10 flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5">
              <img
                src="/eklavya_logo.png"
                alt="Eklavya Donations Ledger"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-teal-800 text-white rounded-full shadow-xs">
              <Wallet size={11} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black text-teal-950">
              Donation & Financial Ledger Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track voluntary donations, verify UTR reference numbers, and manage yearly QR handover configurations.
            </p>
          </div>
        </div>

        {/* Subtabs matching Screenshot 2 */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveSubtab('ledger')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubtab === 'ledger'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet size={13} />
            <span>Donations Ledger</span>
          </button>
          <button
            onClick={() => setActiveSubtab('impact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubtab === 'impact'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={13} />
            <span>Impact Updates</span>
          </button>
          <button
            onClick={() => setActiveSubtab('qr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubtab === 'qr'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode size={13} />
            <span>QR & Account Settings</span>
          </button>
        </div>
      </div>

      {activeSubtab === 'ledger' && (
        <>
          {/* Top Summary Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            <div className="md:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Verified Collected
                </span>
                <div className="text-3xl font-serif font-black text-slate-900">₹0</div>
                <span className="text-[11px] font-semibold text-slate-400">0 Verified Transactions</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-serif text-2xl font-black shrink-0">
                ₹
              </div>
            </div>

            <div className="md:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Pending Verification
                </span>
                <div className="text-3xl font-serif font-black text-slate-900">₹0</div>
                <span className="text-[11px] font-semibold text-amber-500">0 Pending Approvals</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
            </div>

            <div className="md:col-span-4 flex items-center">
              <button
                onClick={() => alert('Exporting ledger CSV...')}
                className="w-full h-full min-h-[96px] rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-sm"
              >
                <Download size={16} />
                <span>Export Ledger (CSV)</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col md:flex-row gap-3 shadow-xs">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Ref ID, Donor Name, Email, UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none"
              >
                <option value="All">All Academic Sessions</option>
                <option value="2026-2027">2026 - 2027</option>
                <option value="2025-2026">2025 - 2026</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSession('All');
                  setSelectedStatus('All');
                }}
                className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
                title="Reset filters"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Table Container / Empty State matching Screenshot 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl min-h-[380px] flex items-center justify-center p-8 text-center">
            <div className="space-y-3 max-w-sm">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <AlertCircle size={28} />
              </div>
              <h3 className="font-bold text-sm text-slate-800">No donation records found.</h3>
              <p className="text-xs text-slate-400">Try adjusting your search terms or filters.</p>
            </div>
          </div>
        </>
      )}

      {activeSubtab === 'impact' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Published Impact Dispatches</h2>
          <p className="text-xs text-slate-500">Attach fund utilization updates to donors.</p>
          <div className="p-8 text-center text-xs text-slate-400">Impact updates module active.</div>
        </div>
      )}

      {activeSubtab === 'qr' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 max-w-xl">
          <h2 className="text-base font-bold text-slate-900">UPI QR & Receiver Accounts</h2>
          <p className="text-xs text-slate-500">Configure annual society treasurer UPI handle and backup credentials.</p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div><strong>Active Account:</strong> Abhinav Maiti (Lead Treasurer)</div>
            <div><strong>UPI ID:</strong> abhinavmaiti01@okaxis</div>
          </div>
        </div>
      )}
    </div>
  );
};
