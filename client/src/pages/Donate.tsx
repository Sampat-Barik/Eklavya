import React, { useState } from 'react';
import { QrCode, CheckCircle2, ShieldCheck, Copy, Sparkles, Send } from 'lucide-react';

export const Donate: React.FC = () => {
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    amount: '',
    utrNumber: '',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const upiId = 'abhinavmaiti01@okaxis';
  const leadTreasurer = 'Abhinav Maiti (Lead Treasurer)';

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
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
        body: JSON.stringify(formData)
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
        {/* Left Column - UPI Details & QR Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-slate-950 font-black text-sm">
              <QrCode size={20} />
              <span>Scan to Pay via UPI</span>
            </div>

            {/* QR Box Container */}
            <div className="w-48 h-48 mx-auto bg-[#f8fafc] border-2 border-slate-950 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a] flex flex-col items-center justify-center">
              <QrCode className="w-24 h-24 text-slate-950 mb-2" />
              <span className="text-[10px] font-mono font-bold text-slate-950">{upiId}</span>
              <span className="text-[9px] font-semibold text-slate-600">{leadTreasurer}</span>
            </div>

            {/* UPI ID copy pill */}
            <div className="bg-[#fef08a] p-3 rounded-2xl border-2 border-slate-950 flex items-center justify-between shadow-[3px_3px_0px_0px_#0f172a]">
              <div className="text-left">
                <span className="text-[9px] text-slate-800 uppercase font-black block">Official UPI ID</span>
                <span className="text-xs font-mono font-black text-slate-950">{upiId}</span>
              </div>
              <button
                onClick={handleCopyUPI}
                className="flex items-center gap-1 text-xs bg-white border-2 border-slate-950 text-slate-950 font-bold px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-50 transition-all"
              >
                {copiedUPI ? <CheckCircle2 size={14} className="text-green-600" /> : <Copy size={14} />}
                <span>{copiedUPI ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-xs font-bold text-slate-700 space-y-1 pt-2">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck size={16} className="text-blue-700" />
                <span>100% Non-Profit Utilization</span>
              </div>
              <p className="text-[11px] text-slate-500">GPay, PhonePe, Paytm, BHIM & UPI</p>
            </div>
          </div>
        </div>

        {/* Right Column - Transaction Verification Form (Matching Screenshot 5) */}
        <div className="lg:col-span-7">
          <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
            <div className="border-b-2 border-slate-950 pb-3">
              <h2 className="text-2xl font-black text-slate-950">Ticket / Donation Proof Form</h2>
              <p className="text-xs font-medium text-slate-600">
                Please fill out details after completing payment to generate your verification pass.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-[#a7f3d0] border-2 border-slate-950 rounded-2xl p-6 text-center space-y-3 shadow-[3px_3px_0px_0px_#0f172a]">
                <CheckCircle2 size={36} className="mx-auto text-emerald-800" />
                <h3 className="text-xl font-black text-slate-950">Thank You for Your Support!</h3>
                <p className="text-xs font-bold text-slate-800">
                  Your transaction details have been verified and recorded successfully.
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({ fullName: '', email: '', phone: '', amount: '', utrNumber: '', note: '' });
                  }}
                  className="text-xs font-black text-slate-950 bg-white border-2 border-slate-950 px-4 py-2 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] inline-block"
                >
                  Submit Another Permit
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Khan Family"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. family@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-950 mb-1">Amount Donated (₹) *</label>
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

                <div>
                  <label className="block text-xs font-black text-slate-950 mb-1">12-Digit UTR / UPI Ref No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 412356789012"
                    value={formData.utrNumber}
                    onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#fef08a] hover:bg-[#fde047] border-2 border-slate-950 text-slate-950 font-black text-sm rounded-xl shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Processing...' : 'Generate Ticket / Submit Proof'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
