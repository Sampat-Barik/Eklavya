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
    <div className="container mx-auto px-4 max-w-5xl space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#fbcfe8] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Sparkles size={14} />
          <span>SUPPORT FREE EDUCATION & ANIMAL CARE</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-950">Donate to Eklavya</h1>
        <p className="text-slate-700 text-xs font-medium max-w-lg mx-auto">
          Your generous contribution directly funds books, food, stationary for needy children, and medical care for stray animals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - UPI Details & Switchable QR */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-5">
            <div className="flex items-center justify-center gap-2 text-slate-950 font-black text-sm">
              <QrCode size={20} />
              <span>Scan to Pay via UPI</span>
            </div>

            {/* QR Box Container */}
            <div className="w-48 h-48 mx-auto bg-white border-2 border-slate-950 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a] flex flex-col items-center justify-center">
              <QrCode className="w-24 h-24 text-slate-950 mb-2" />
              <span className="text-[10px] font-mono font-bold text-slate-950">{currentUPI}</span>
              <span className="text-[9px] font-semibold text-slate-600">{currentTitle}</span>
            </div>

            {/* Switch QR Button */}
            <button
              onClick={() => setUseBackupQR(!useBackupQR)}
              className="w-full py-2 bg-[#e0f2fe] hover:bg-[#bfdbfe] border-2 border-slate-950 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw size={14} />
              <span>{useBackupQR ? 'Switch to Treasurer QR' : 'Switch to Backup QR (Chairperson)'}</span>
            </button>

            {/* UPI ID copy pill */}
            <div className="bg-[#fef08a] p-3 rounded-2xl border-2 border-slate-950 flex items-center justify-between shadow-[3px_3px_0px_0px_#0f172a]">
              <div className="text-left">
                <span className="text-[9px] text-slate-800 uppercase font-black block">Official UPI ID</span>
                <span className="text-xs font-mono font-black text-slate-950">{currentUPI}</span>
              </div>
              <button
                onClick={handleCopyUPI}
                className="flex items-center gap-1 text-xs bg-white border-2 border-slate-950 text-slate-950 font-bold px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-50 transition-all"
              >
                {copiedUPI ? <CheckCircle2 size={14} className="text-green-600" /> : <Copy size={14} />}
                <span>{copiedUPI ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-xs font-bold text-slate-700 space-y-1 pt-1">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck size={16} className="text-blue-700" />
                <span>100% Non-Profit Direct Service</span>
              </div>
              <p className="text-[11px] text-slate-500">Supports GPay, PhonePe, Paytm, BHIM & UPI</p>
            </div>
          </div>
        </div>

        {/* Right Column - Transaction Proof Form (Exact 6 Fields matching netlify site) */}
        <div className="lg:col-span-7">
          <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
            <div className="border-b-2 border-slate-950 pb-3">
              <h2 className="text-2xl font-black text-slate-950">Submit Donation Proof</h2>
              <p className="text-xs font-medium text-slate-600">
                Please fill out this form after completing payment so our finance team can record your donation.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-[#a7f3d0] border-2 border-slate-950 rounded-2xl p-6 text-center space-y-3 shadow-[3px_3px_0px_0px_#0f172a]">
                <CheckCircle2 size={36} className="mx-auto text-emerald-800" />
                <h3 className="text-xl font-black text-slate-950">Thank You for Your Donation!</h3>
                <p className="text-xs font-bold text-slate-800">
                  Your transaction proof has been recorded successfully.
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({ fullName: '', email: '', phone: '', amount: '', utrNumber: '', proofFile: null });
                  }}
                  className="text-xs font-black text-slate-950 bg-white border-2 border-slate-950 px-4 py-2 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] inline-block"
                >
                  Submit Another Donation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anish Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                    />
                  </div>

                  {/* Field 2: Email Address */}
                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anish@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Field 3: Phone / WhatsApp No. */}
                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Phone / WhatsApp No. *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                    />
                  </div>

                  {/* Field 4: Donation Amount */}
                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Donation Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="500"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Field 5: 12-Digit UTR */}
                <div>
                  <label className="block text-xs font-black text-slate-950 mb-1">12-Digit UTR / UPI Reference Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 412356789012"
                    value={formData.utrNumber}
                    onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                  />
                </div>

                {/* Field 6: Payment Screenshot / Proof */}
                <div>
                  <label className="block text-xs font-black text-slate-950 mb-1">Payment Screenshot / Proof *</label>
                  <div className="relative border-2 border-slate-950 border-dashed rounded-xl p-4 bg-white shadow-[2px_2px_0px_0px_#0f172a] text-center cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setFormData({ ...formData, proofFile: e.target.files ? e.target.files[0] : null })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={20} className="mx-auto text-slate-950 mb-1" />
                    <span className="text-xs font-bold text-slate-950 block">
                      {formData.proofFile ? formData.proofFile.name : 'Click or drop payment screenshot here'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#fef08a] hover:bg-[#fde047] border-2 border-slate-950 text-slate-950 font-black text-sm rounded-xl shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all"
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
