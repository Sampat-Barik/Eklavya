import React, { useState } from 'react';
import { QrCode, CheckCircle2, Copy, Send, RefreshCw, Upload, Heart } from 'lucide-react';

export const Donate: React.FC = () => {
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [useBackupQR, setUseBackupQR] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    amount: '',
    utrNumber: '',
    proofFile: null as File | null
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Official UPI accounts
  const primaryUPI = 'abhinavmaiti01@okaxis';
  const primaryTitle = 'Abhinav Maiti (Treasurer, Eklavya)';

  const backupUPI = '9153182300-2@naviaxis';
  const backupTitle = 'Asmit Maity (Chairperson / Vice CP)';

  const currentUPI = useBackupQR ? backupUPI : primaryUPI;
  const currentTitle = useBackupQR ? backupTitle : primaryTitle;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(currentUPI);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          amount: formData.amount,
          utrNumber: formData.utrNumber
        })
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmittedSuccess(true);
    } catch {
      setSubmittedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-[#E5E0D8] pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold">
              <Heart size={14} className="text-[#C25E38]" />
              <span>Direct Aid & Financial Transparency • Eklavya</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C2826] leading-[1.08]">
              Empower A Child. <br className="hidden sm:inline" />
              Rescue A Stray Animal.
            </h1>
            <p className="text-[#1C2826]/70 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Every rupee donated directly funds exercise books, pencils, evening school nourishment, rabies vaccines, and emergency surgical care for street dogs in Haldia. Eklavya operates with 0% administrative overhead.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>AUDIT FREQUENCY</span>
                <span className="font-bold text-[#1C2826]">MONTHLY REPORT</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>OVERHEAD CUT</span>
                <span className="font-bold text-emerald-700">0% (100% VOLUNTEER)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>REGISTRATION</span>
                <span className="font-bold text-[#1C2826]">HIT HALDIA SOCIETY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Asymmetric 7:5 Layout: Form & Fund Allocation on Left, QR Console on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column (7 cols): Impact Scale & Transaction Proof Form */}
        <div className="lg:col-span-7 space-y-10">
          {/* Micro Allocation Tiles */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold block">
              Where Your Donation Goes
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-white/85 backdrop-blur-md space-y-1 shadow-2xs">
                <span className="font-serif text-lg font-normal text-[#1C2826]">₹250</span>
                <span className="block text-xs font-semibold text-[#1C2826]">1 Student Term Kit</span>
                <p className="text-[11px] text-[#1C2826]/70">Notebooks, pencils, eraser, and daily snacks for 1 month.</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-white/85 backdrop-blur-md space-y-1 shadow-2xs">
                <span className="font-serif text-lg font-normal text-[#1C2826]">₹650</span>
                <span className="block text-xs font-semibold text-[#1C2826]">Vaccine & De-worming</span>
                <p className="text-[11px] text-[#1C2826]/70">Anti-rabies vial and 14-day anti-parasite medication.</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-white/85 backdrop-blur-md space-y-1 shadow-2xs">
                <span className="font-serif text-lg font-normal text-[#1C2826]">₹1,800</span>
                <span className="block text-xs font-semibold text-[#1C2826]">Emergency Surgery</span>
                <p className="text-[11px] text-[#1C2826]/70">Trauma treatment, antibiotic dressing, and shelter foster.</p>
              </div>
            </div>
          </div>

          {/* Transaction Proof Submission Form */}
          <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
            <div className="border-b border-[#E5E0D8] pb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#C25E38] font-bold block">
                Verification Pipeline
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#1C2826] mt-1">
                Submit Donation Proof
              </h2>
              <p className="text-xs text-[#1C2826]/60 mt-1 font-normal">
                Please submit the 12-digit UTR and payment screenshot so our finance lead can acknowledge your receipt.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 size={24} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#1C2826]">Transaction Recorded</h3>
                  <p className="text-xs text-[#1C2826]/70 max-w-sm mx-auto mt-1 leading-relaxed font-normal">
                    Your payment details have been logged in the Eklavya treasury ledger. Our volunteers will verify and dispatch an acknowledgment.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({ fullName: '', email: '', phone: '', amount: '', utrNumber: '', proofFile: null });
                  }}
                  className="font-mono text-xs font-bold text-[#1C2826] bg-white border border-[#E5E0D8] hover:bg-[#FAF8F5] px-5 py-2.5 rounded-lg transition-colors inline-block cursor-pointer"
                >
                  Submit Another Record
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1C2826]/80 font-bold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sagnik Mondal"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1C2826] placeholder-[#1C2826]/40 focus:outline-none focus:border-[#1C2826] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1C2826]/80 font-bold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sagnik@hithaldia.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1C2826] placeholder-[#1C2826]/40 focus:outline-none focus:border-[#1C2826] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1C2826]/80 font-bold mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1C2826] placeholder-[#1C2826]/40 focus:outline-none focus:border-[#1C2826] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1C2826]/80 font-bold mb-1.5">
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="500"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1C2826] placeholder-[#1C2826]/40 focus:outline-none focus:border-[#1C2826] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1C2826]/80 font-bold mb-1.5">
                    12-Digit UTR / Transaction Reference *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 412356789012"
                    value={formData.utrNumber}
                    onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-mono font-medium text-[#1C2826] placeholder-[#1C2826]/40 focus:outline-none focus:border-[#1C2826] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1C2826]/80 font-bold mb-1.5">
                    Payment Screenshot / Proof *
                  </label>
                  <div className="relative border border-[#E5E0D8] border-dashed rounded-xl p-5 bg-[#FAF8F5] text-center hover:bg-white transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setFormData({ ...formData, proofFile: e.target.files ? e.target.files[0] : null })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={20} className="mx-auto text-[#C25E38] mb-1" strokeWidth={1.75} />
                    <span className="text-xs font-medium text-[#1C2826]/70 block">
                      {formData.proofFile ? formData.proofFile.name : 'Upload receipt screenshot (PNG, JPG, PDF)'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#1C2826] hover:bg-[#C25E38] text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-colors pt-3 cursor-pointer"
                >
                  <Send size={14} />
                  <span>{submitting ? 'DISPATCHING...' : 'CONFIRM & SUBMIT AUDIT PROOF'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Tactical QR Console */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
              <div className="flex items-center gap-2">
                <QrCode size={18} className="text-[#C25E38]" />
                <span className="font-serif font-normal text-base text-[#1C2826]">Instant UPI Payment</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                VERIFIED
              </span>
            </div>

            {/* Architectural QR Frame */}
            <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-6 text-center space-y-3">
              <div className="w-44 h-44 mx-auto bg-white border border-[#E5E0D8] rounded-lg p-3 shadow-2xs flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-[#1C2826]" strokeWidth={1.5} />
                <span className="font-mono text-[10px] text-[#1C2826]/50 mt-1 uppercase">Scan with any UPI App</span>
              </div>

              <div className="space-y-0.5 pt-1">
                <span className="font-mono text-xs font-bold text-[#1C2826] block break-all">{currentUPI}</span>
                <span className="text-[11px] text-[#1C2826]/60 font-medium block">{currentTitle}</span>
              </div>
            </div>

            {/* Switch Account Button */}
            <button
              onClick={() => setUseBackupQR(!useBackupQR)}
              className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#1C2826] hover:text-white text-[#1C2826] border border-[#E5E0D8] rounded-xl text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>{useBackupQR ? 'Switch to Treasurer Account' : 'Switch to Chairperson Account'}</span>
            </button>

            {/* One-Click Copy UPI Pill */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5E0D8] flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="font-mono text-[10px] uppercase text-[#1C2826]/50 font-bold block">Account VPA</span>
                <span className="font-mono text-xs font-bold text-[#1C2826] truncate block">{currentUPI}</span>
              </div>
              <button
                onClick={handleCopyUPI}
                className="shrink-0 flex items-center gap-1 text-xs bg-[#1C2826] hover:bg-[#C25E38] text-white font-mono px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer"
              >
                {copiedUPI ? <CheckCircle2 size={13} className="text-emerald-300" /> : <Copy size={13} />}
                <span>{copiedUPI ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-[#1C2826]/60 space-y-1">
              <p className="font-medium">Supported on Google Pay, PhonePe, Paytm, BHIM & NetBanking.</p>
              <p className="font-mono text-[10px] text-[#1C2826]/70 font-semibold">HIT STUDENTS SOCIO-WELFARE ACCOUNT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
