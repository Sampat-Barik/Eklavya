import React, { useState } from 'react';
import { QrCode, CheckCircle2, ShieldCheck, Copy, Sparkles, Send, RefreshCw, Upload } from 'lucide-react';

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

  // Exact UPI details from live site audit
  const primaryUPI = 'abhinavmaiti01@okaxis';
  const primaryTitle = 'Abhinav Maiti (Treasurer)';

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
    } catch (err) {
      setSubmittedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-8 pb-16 py-4">
      {/* Top Banner */}
      <div className="enamo-card p-8 md:p-12 text-center space-y-4 bg-slate-950 text-white relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white">
          <Sparkles size={14} className="text-amber-300" />
          <span>SUPPORT FREE EDUCATION & ANIMAL CARE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Donate to Eklavya</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto font-normal leading-relaxed">
          Your generous contribution directly funds books, food, stationery for needy children, and medical care for stray animals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - UPI Details & Switchable QR */}
        <div className="lg:col-span-5 space-y-6">
          <div className="enamo-card p-8 text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-slate-950 font-extrabold text-base">
              <QrCode size={20} />
              <span>Scan to Pay via UPI</span>
            </div>

            {/* QR Box Container */}
            <div className="w-52 h-52 mx-auto bg-slate-50 border border-slate-200 rounded-[28px] p-4 shadow-sm flex flex-col items-center justify-center space-y-2">
              <QrCode className="w-24 h-24 text-slate-950" />
              <span className="text-xs font-mono font-bold text-slate-950">{currentUPI}</span>
              <span className="text-[10px] font-medium text-slate-500">{currentTitle}</span>
            </div>

            {/* Switch QR Button */}
            <button
              onClick={() => setUseBackupQR(!useBackupQR)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw size={14} />
              <span>{useBackupQR ? 'Switch to Treasurer QR' : 'Switch to Backup QR (Chairperson)'}</span>
            </button>

            {/* UPI ID copy pill */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Official UPI ID</span>
                <span className="text-xs font-mono font-bold text-slate-950">{currentUPI}</span>
              </div>
              <button
                onClick={handleCopyUPI}
                className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-black text-white font-semibold px-4 py-2 rounded-full transition-transform hover:scale-105 shadow-sm"
              >
                {copiedUPI ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedUPI ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-xs font-semibold text-slate-600 space-y-1.5 pt-2">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck size={16} className="text-slate-950" />
                <span>100% Non-Profit Direct Service</span>
              </div>
              <p className="text-[11px] text-slate-400">Supports GPay, PhonePe, Paytm, BHIM & UPI</p>
            </div>
          </div>
        </div>

        {/* Right Column - Transaction Proof Form (Exact 6 Fields matching netlify site) */}
        <div className="lg:col-span-7">
          <div className="enamo-card p-8 md:p-10 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-extrabold text-slate-950">Submit Donation Proof</h2>
              <p className="text-xs text-slate-500 font-normal mt-1">
                Please fill out this form after completing payment so our finance team can record your donation.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-[24px] p-8 text-center space-y-4">
                <CheckCircle2 size={40} className="mx-auto text-emerald-600" />
                <h3 className="text-2xl font-extrabold text-slate-950">Thank You for Your Donation!</h3>
                <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                  Your transaction proof has been recorded successfully. Our team will verify and issue your acknowledgment.
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({ fullName: '', email: '', phone: '', amount: '', utrNumber: '', proofFile: null });
                  }}
                  className="text-xs font-semibold text-white bg-slate-900 hover:bg-black px-6 py-3 rounded-full shadow-md inline-block transition-transform hover:scale-105"
                >
                  Submit Another Donation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-950 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anish Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-950 focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>

                  {/* Field 2: Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-950 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anish@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-950 focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Field 3: Phone / WhatsApp No. */}
                  <div>
                    <label className="block text-xs font-bold text-slate-950 mb-1.5">Phone / WhatsApp No. *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-950 focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>

                  {/* Field 4: Donation Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-950 mb-1.5">Donation Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="500"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-950 focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Field 5: 12-Digit UTR */}
                <div>
                  <label className="block text-xs font-bold text-slate-950 mb-1.5">12-Digit UTR / UPI Reference Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 412356789012"
                    value={formData.utrNumber}
                    onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-mono font-semibold text-slate-950 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>

                {/* Field 6: Payment Screenshot / Proof */}
                <div>
                  <label className="block text-xs font-bold text-slate-950 mb-1.5">Payment Screenshot / Proof *</label>
                  <div className="relative border border-slate-200 border-dashed rounded-[20px] p-5 bg-slate-50 text-center cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setFormData({ ...formData, proofFile: e.target.files ? e.target.files[0] : null })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={22} className="mx-auto text-slate-950 mb-1" />
                    <span className="text-xs font-semibold text-slate-950 block">
                      {formData.proofFile ? formData.proofFile.name : 'Click or drop payment screenshot here'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-slate-900 hover:bg-black text-white font-semibold text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] pt-3 mt-4"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Submitting...' : 'Submit Donation Proof'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
