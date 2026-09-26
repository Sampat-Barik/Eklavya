import React, { useState } from 'react';
import { ngoService } from '../../services/ngoService';
import { Mail, MapPin, Phone, Send, CheckCircle2, Heart } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ngoService.submitInquiry(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'General Inquiry',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="space-y-8 sm:space-y-10 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-100 pb-6 text-right sm:text-right">
        <div className="text-left space-y-1 order-2 md:order-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 inline-block">
            Direct Campus Presence
          </span>
          <p className="text-xs text-slate-500 font-medium">
            Active student responders on-site at Haldia Institute of Technology. Emergency helpline active 24/7.
          </p>
        </div>

        <div className="order-1 md:order-2 text-left md:text-right max-w-xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight text-teal-950 leading-[1.12]">
            Connect with Our{' '}
            <span className="italic bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Campus Society
            </span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mt-1">
            Have a question about our educational drives, want to report an animal distress case in Haldia, or collaborate as an alumni partner? We are here.
          </p>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Column 1: HIT Campus Center (Deep Teal Card) */}
        <div className="bg-teal-800 text-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Campus Photo Placeholder */}
            <div className="relative h-36 w-full rounded-xl overflow-hidden border border-teal-700/80 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                alt="HIT Haldia Campus Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200 bg-teal-950/70 backdrop-blur-xs px-2 py-0.5 rounded">
                  Haldia Institute of Technology
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                HIT Campus Center
              </h3>
              <p className="text-teal-100/90 text-xs sm:text-sm leading-relaxed font-normal">
                Our core student coordination operates directly from the HIT campus in Haldia. Volunteers assemble daily at 4:30 PM before departing for evening school clusters and feeding rounds.
              </p>
            </div>
          </div>

          {/* Stacked Contact Rows */}
          <div className="space-y-2.5">
            {/* Row 1: Location */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-900/50 backdrop-blur-xs border border-teal-700/60">
              <div className="p-1.5 rounded-lg bg-teal-800 text-emerald-300 shrink-0 mt-0.5">
                <MapPin size={15} />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-white">Campus Location</h4>
                <p className="text-xs text-teal-100/80 leading-relaxed font-normal">
                  Haldia Institute of Technology, HIT Main Gate, Haldia, West Bengal 721657
                </p>
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-900/50 backdrop-blur-xs border border-teal-700/60">
              <div className="p-1.5 rounded-lg bg-teal-800 text-cyan-300 shrink-0 mt-0.5">
                <Mail size={15} />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-white">Official Society Email</h4>
                <a
                  href="mailto:eklavya.official.haldia@gmail.com"
                  className="text-xs font-medium text-teal-200 hover:text-white underline underline-offset-2 break-all"
                >
                  eklavya.official.haldia@gmail.com
                </a>
              </div>
            </div>

            {/* Row 3: Emergency Helpline */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-900/50 backdrop-blur-xs border border-teal-700/60">
              <div className="p-1.5 rounded-lg bg-teal-800 text-emerald-300 shrink-0 mt-0.5">
                <Phone size={15} />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-white">Emergency Animal Helpline</h4>
                <p className="text-xs text-teal-100/80 leading-relaxed font-normal">
                  Student emergency animal rescue squad on-call 24/7 across Haldia campus.
                </p>
              </div>
            </div>

            {/* Row 4: Physical Aid Drop-off */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-900/50 backdrop-blur-xs border border-teal-700/60">
              <div className="p-1.5 rounded-lg bg-teal-800 text-rose-300 shrink-0 mt-0.5">
                <Heart size={15} className="fill-current text-rose-300" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-white">Physical Aid Drop-off</h4>
                <p className="text-xs text-teal-100/80 leading-relaxed font-normal">
                  Supplies like clothes, books, stationery, and pet rations can be handed over directly to student coordinators at HIT Gate 1.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Send Us A Message (High-Contrast Dark Slate Card) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl space-y-5 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-1.5">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Send Us A Message
            </h3>
            <p className="text-xs text-slate-400 font-normal">
              Fill in your details below and our student team will get back to you promptly.
            </p>
          </div>

          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed font-normal">
                Thank you for reaching out to Eklavya. A student coordinator will review your message and reply promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-teal-400 hover:text-teal-300 underline underline-offset-4 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800 border-none rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 border-none rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 border-none rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Topic of Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-slate-800 border-none rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Volunteer as Student">Volunteer as Student (HIT)</option>
                    <option value="Animal Distress Alert">Report Animal Distress</option>
                    <option value="Physical Aid Contribution">Physical Aid (Clothes/Books)</option>
                    <option value="Alumni Collaboration">Alumni Collaboration</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you or how would you like to contribute?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-800 border-none rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-medium px-6 py-2.5 rounded-lg shadow-md shadow-teal-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
