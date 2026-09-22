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
    <section id="contact" className="space-y-10 py-6 sm:py-10">
      {/* Asymmetric Header - Right Aligned */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5E0D8] pb-6">
        <div className="text-xs text-[#1C2826]/60 max-w-sm order-2 sm:order-1 font-normal leading-relaxed">
          <span className="font-semibold text-[#1C2826] block mb-1">Direct Campus Presence</span>
          Active student responders on-site at Haldia Institute of Technology. Emergency helpline active 24/7 for street animal rescues.
        </div>

        <SectionTitle
          badge="GET IN TOUCH"
          badgeVariant="terracotta"
          title="Connect with Our Campus Society"
          highlightWord="Campus Society"
          subtitle="Have a question about our educational drives, want to report an animal distress case in Haldia, or collaborate as an alumni partner? We are here."
          align="right"
          className="order-1 sm:order-2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Campus Information & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5E0D8] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-normal text-[#1C2826] leading-snug">
              HIT Campus Center
            </h3>
            <p className="text-[#1C2826]/70 text-xs sm:text-sm leading-relaxed font-normal">
              Our core student coordination operates directly from the HIT campus in Haldia. Volunteers assemble daily at 4:30 PM before departing for evening school clusters and feeding rounds.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
              <MapPin size={16} className="text-[#C25E38] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-[#1C2826]">Campus Location</h4>
                <p className="text-xs text-[#1C2826]/70 leading-relaxed font-normal">
                  Haldia Institute of Technology, HIT Main Gate, Haldia, West Bengal 721657
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
              <Mail size={16} className="text-[#C25E38] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-[#1C2826]">Official Society Email</h4>
                <a
                  href="mailto:eklavya.official.haldia@gmail.com"
                  className="text-xs font-medium text-[#1C2826] hover:text-[#C25E38] underline underline-offset-2"
                >
                  eklavya.official.haldia@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
              <Phone size={16} className="text-[#C25E38] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-[#1C2826]">Emergency Animal Helpline</h4>
                <p className="text-xs text-[#1C2826]/70 font-normal">
                  Student emergency animal rescue squad on-call 24/7 across Haldia campus.
                </p>
              </div>
            </div>
          </div>

          {/* Aid Drop-off Info */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] flex items-start gap-3">
            <HeartHandshake size={20} className="text-[#C25E38] shrink-0 mt-0.5" />
            <div className="text-xs text-[#1C2826]/80">
              <span className="font-semibold block text-[#1C2826] mb-0.5">Physical Aid Drop-off</span>
              Supplies like clothes, books, stationery, and pet rations can be handed over directly to student coordinators at HIT Gate 1.
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5E0D8] p-6 sm:p-8 md:p-10 shadow-xs">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#1C2826]">Message Received</h3>
              <p className="text-xs sm:text-sm text-[#1C2826]/70 max-w-md font-normal leading-relaxed">
                Thank you for reaching out to Eklavya. One of our student executive members will review your dispatch and reply promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-[#1C2826] hover:text-[#C25E38] underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-normal text-[#1C2826]">
                  Send Us A Message
                </h3>
                <p className="text-xs text-[#1C2826]/60 font-normal">
                  Fill in your details below and our student team will get back to you promptly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1C2826]/80">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#1C2826] placeholder-[#1C2826]/40 focus:bg-white focus:outline-none focus:border-[#1C2826] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1C2826]/80">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#1C2826] placeholder-[#1C2826]/40 focus:bg-white focus:outline-none focus:border-[#1C2826] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1C2826]/80">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#1C2826] placeholder-[#1C2826]/40 focus:bg-white focus:outline-none focus:border-[#1C2826] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1C2826]/80">Topic of Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#1C2826] focus:bg-white focus:outline-none focus:border-[#1C2826] transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Volunteer as Student">Volunteer as Student (HIT)</option>
                    <option value="Animal Distress Report">Report Animal Distress</option>
                    <option value="Physical Aid Contribution">Physical Aid (Clothes/Books)</option>
                    <option value="Alumni Collaboration">Alumni Collaboration</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#1C2826]/80">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you or how would you like to contribute?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#1C2826] placeholder-[#1C2826]/40 focus:bg-white focus:outline-none focus:border-[#1C2826] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#1C2826] hover:bg-[#C25E38] disabled:opacity-50 text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <Send size={13} />
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
