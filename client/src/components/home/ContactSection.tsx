import React, { useState } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ngoService } from '../../services/ngoService';
import { Mail, MapPin, Phone, Send, CheckCircle2, HeartHandshake } from 'lucide-react';

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
    <section id="contact" className="space-y-10 py-8">
      {/* Asymmetric Header - Right Aligned */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <div className="text-xs text-slate-500 max-w-sm order-2 sm:order-1">
          <span className="font-bold text-slate-900 block mb-1">Direct Campus Presence</span>
          Active student responders on-site at Haldia Institute of Technology. Emergency helpline active 24/7 for street animal rescues.
        </div>

        <SectionTitle
          badge="GET IN TOUCH"
          badgeVariant="blue"
          title="Connect with Our Campus Society"
          highlightWord="Campus Society"
          subtitle="Have a question about our educational drives, want to report an animal distress case in Haldia, or collaborate as an alumni partner? We are here."
          align="right"
          className="order-1 sm:order-2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Campus Information & Direct Channels */}
        <div className="lg:col-span-5 editorial-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Haldia Institute of Technology Campus Center
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              Our central operations operate directly from the HIT campus in Haldia. Volunteers assemble daily at 4:30 PM before heading to evening village schools and feeding points.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <MapPin size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">Campus Location</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Haldia Institute of Technology, HIT Main Gate, Haldia, West Bengal 721657
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <Mail size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">Official Society Email</h4>
                <a
                  href="mailto:eklavya.official.haldia@gmail.com"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  eklavya.official.haldia@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <Phone size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">Emergency Animal Helpline</h4>
                <p className="text-xs text-slate-600 font-normal">
                  Student emergency animal rescue responder squad on-call for Haldia campus area.
                </p>
              </div>
            </div>
          </div>

          {/* Social Community Tag */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-100 flex items-center gap-3">
            <HeartHandshake size={24} className="text-blue-600 shrink-0" />
            <div className="text-xs text-slate-700">
              <span className="font-bold block text-slate-900">Physical & Monetary Aid Drop-off</span>
              Supplies like clothes, books, and rations can be handed over directly to our student coordinators at HIT Gate 1.
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7 editorial-card p-6 sm:p-8 md:p-10">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md font-normal leading-relaxed">
                Thank you for reaching out to Eklavya. One of our student executive members will review your inquiry and respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-blue-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Send Us A Message
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Fill in your details below and our team will get back to you promptly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Area of Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Contribute Physical Aid (Clothes / Food / Books)">Contribute Physical Aid (Clothes / Food / Books)</option>
                    <option value="Contribute Monetary Aid">Contribute Monetary Aid</option>
                    <option value="Animal Distress / Rescue">Animal Distress / Rescue</option>
                    <option value="Alumni Partnership">Alumni Partnership</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you or how would you like to get involved?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-101"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Message to Eklavya Team</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
