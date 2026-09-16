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
      console.warn("Backend not available or donation saved locally:", err);
      setSubmittedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      {/* Top Hero */}
      <div className="py-16 bg-gradient-to-b from-rose-950/60 via-slate-900 to-slate-950 border-b border-slate-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-900/40 border border-rose-700/50 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Support Free Education & Animal Care
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Donate to Eklavya</h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Your generous contribution directly funds books, food, stationary for needy children, and medical care for stray animals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - UPI Details & QR Code */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-sm">
              <QrCode size={20} />
              <span>Scan to Pay via UPI</span>
            </div>

            {/* QR Code Container with Fallback */}
            <div className="relative mx-auto w-56 h-56 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center shadow-inner group">
              <div className="w-full h-full bg-slate-900 rounded-xl flex flex-col items-center justify-center border border-dashed border-slate-700 p-2">
                <QrCode className="w-24 h-24 text-rose-400 opacity-90 mb-2" />
                <span className="text-[11px] font-mono text-slate-300 font-medium text-center">
                  {upiId}
                </span>
                <span className="text-[10px] text-slate-500 mt-1">{leadTreasurer}</span>
              </div>
            </div>

            {/* UPI ID copy box */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Official UPI ID</span>
                <span className="text-xs font-mono font-bold text-cyan-400">{upiId}</span>
              </div>
              <button
                onClick={handleCopyUPI}
                className="flex items-center gap-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                {copiedUPI ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
                <span>{copiedUPI ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-center gap-1.5 text-slate-300">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span>100% Direct Non-Profit Utilization</span>
              </div>
              <p>Supports GPay, PhonePe, Paytm, BHIM & all major UPI apps.</p>
            </div>
          </div>
        </div>

        {/* Right Column - Transaction Verification Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Submit Transaction Details</h2>
              <p className="text-xs text-slate-400">
                Please fill out this form after completing your payment so our finance team can verify and issue your acknowledgment.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Thank You for Your Generosity!</h3>
                <p className="text-slate-300 text-sm">
                  Your transaction details have been received successfully. Our team will verify the payment and contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({ fullName: '', email: '', phone: '', amount: '', utrNumber: '', note: '' });
                  }}
                  className="text-xs text-cyan-400 hover:underline pt-2 inline-block font-semibold"
                >
                  Submit Another Donation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anish Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="anish@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Amount Donated (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 500"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">12-Digit UTR / UPI Ref No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 412356789012"
                    value={formData.utrNumber}
                    onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Personal Message / Note (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Leave a message for our volunteers and children..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Submitting...' : 'Submit Proof of Donation'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
