import React, { useState } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { MapPin, BookOpen, Heart, Navigation, ExternalLink, ShieldCheck, Sparkles, Compass } from 'lucide-react';

interface OperationCentre {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  location: string;
  gpsLabel: string;
  embedUrl: string;
  googleMapsUrl: string;
  type: 'campus' | 'school' | 'remedial';
  status: 'Active Now' | 'In Progress' | 'Scheduled 4:30 PM';
  statusColor: 'emerald' | 'teal' | 'amber';
  beneficiaries: string;
  volunteers: number;
  leadCoordinator: string;
  details: string;
  recentUpdate: string;
}

const CENTRES: OperationCentre[] = [
  {
    id: 'hit-campus',
    name: 'HIT College Campus Centre',
    shortName: 'HIT Campus Hub',
    tagline: 'Central Operations, Animal Rescue Bay & Volunteer Headquarters',
    location: 'Haldia Institute of Technology, ICARE Complex, HIT Campus, Haldia, WB 721657',
    gpsLabel: '22.0476° N, 88.0669° E',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14792.210733339141!2d88.06689234422605!3d22.047580122392322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f0bd0fcacc69%3A0x409c7ac845fe6280!2sHaldia%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1790425529768!5m2!1sen!2sin',
    googleMapsUrl: 'https://www.google.com/maps/place/Haldia+Institute+of+Technology/@22.0475801,88.0668923,15z',
    type: 'campus',
    status: 'Active Now',
    statusColor: 'emerald',
    beneficiaries: '120+ Street Animals & Campus Tutees',
    volunteers: 28,
    leadCoordinator: 'Prof. S. Das & Central Student Council',
    details: 'Central administrative command coordinating society operations, emergency animal care and first-aid bay, vaccination logistics, and daily volunteer deployments.',
    recentUpdate: '24/7 animal emergency triage on duty. Evening study supplies dispatched to community branches.'
  },
  {
    id: 'khudiram-centre',
    name: 'Khudiram Centre',
    shortName: 'Khudiram Centre',
    tagline: 'Remedial Literacy, Child Mentorship & Academic Support',
    location: 'Khudiram Smriti, Near HIT Campus Periphery, Haldia, WB 721657',
    gpsLabel: '22.0559° N, 88.0695° E',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d344.86638540893136!2d88.06946071954832!3d22.055931943921156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1790425632360!5m2!1sen!2sin',
    googleMapsUrl: 'https://maps.google.com/?q=22.0559319,88.0694607',
    type: 'remedial',
    status: 'Active Now',
    statusColor: 'emerald',
    beneficiaries: '50+ Village Children',
    volunteers: 12,
    leadCoordinator: 'Debjit & Ananya (HIT CHE & IT)',
    details: 'Dedicated remedial batches offering free foundational education in Mathematics, English & Science. Regular distribution of books, drawing kits, and educational aids.',
    recentUpdate: 'Daily evening attendance logged. Mid-semester notebook and pencil kits distributed.'
  },
  {
    id: 'gandhinagar-centre',
    name: 'Gandhi Nagar Centre',
    shortName: 'Gandhi Nagar Centre',
    tagline: 'Evening Primary School, Nutrition Support & Outreach Unit',
    location: '333F+QWX, Gandhi Nagar, Haldia, West Bengal 721657',
    gpsLabel: '22.0544° N, 88.0749° E',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d344.870204111672!2d88.07492465719626!3d22.054366010390073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f0bea88b9591%3A0x8f61096d5b578d07!2s333F%2BQWX%2C%20Gandhi%20Nagar%2C%20Haldia%2C%20West%20Bengal%20721657!5e1!3m2!1sen!2sin!4v1790425672471!5m2!1sen!2sin',
    googleMapsUrl: 'https://www.google.com/maps/place/333F%2BQWX,+Gandhi+Nagar,+Haldia,+West+Bengal+721657/@22.054366,88.0749247,19z',
    type: 'school',
    status: 'Scheduled 4:30 PM',
    statusColor: 'teal',
    beneficiaries: '65 Children & Families',
    volunteers: 15,
    leadCoordinator: 'Rahul & Priya (HIT CSE & EE)',
    details: 'Primary coaching classes, moral storytelling, daily boiled eggs and nutritious snacks for children, alongside street animal feeding routines in the Gandhi Nagar corridor.',
    recentUpdate: 'Evening session batch prep completed. Volunteers on-site at community hall.'
  }
];

export const LiveOperationsMap: React.FC = () => {
  const [selectedCentreId, setSelectedCentreId] = useState<string>('hit-campus');
  const currentCentre = CENTRES.find((c) => c.id === selectedCentreId) || CENTRES[0];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-100 pb-6">
        <SectionTitle
          badge="GROUND CENTRES & HUBS"
          badgeVariant="green"
          title="Our 3 Active Centres in Haldia"
          highlightWord="Active Centres"
          subtitle="Explore the verified Google Maps locations and operational activities across our 3 official branches: HIT College Campus, Khudiram Centre, and Gandhi Nagar Centre."
        />

        {/* Global Operational Status Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200 text-xs font-mono text-teal-950 shadow-xs shrink-0 self-start md:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold">3 Verified Operational Centres</span>
        </div>
      </div>

      {/* Main Command Console */}
      <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-100/90 p-5 sm:p-7 shadow-xl shadow-teal-950/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          
          {/* Left Column: Official Google Maps Embed Frame & Interactive Centre Switcher (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Embedded Google Map Frame */}
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-emerald-200/90 shadow-md bg-slate-100 group">
              <iframe
                key={currentCentre.id}
                src={currentCentre.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`${currentCentre.name} Google Map Location`}
                className="w-full h-full"
              />

              {/* GPS Stamp Floating Pill */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-teal-950 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200 shadow-md">
                  <MapPin size={13} className="text-emerald-600" />
                  <span>{currentCentre.gpsLabel}</span>
                </div>
              </div>

              {/* Direct Full-Screen Google Maps Trigger */}
              <a
                href={currentCentre.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 text-[11px] font-bold text-teal-950 bg-white/95 hover:bg-emerald-50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200 shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
                title="Open in Google Maps"
              >
                <Compass size={13} className="text-teal-700" />
                <span className="hidden sm:inline">View on Google Maps</span>
                <ExternalLink size={11} className="text-slate-400" />
              </a>
            </div>

            {/* 3 Centre Quick-Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CENTRES.map((centre) => {
                const isSelected = centre.id === selectedCentreId;
                return (
                  <button
                    key={centre.id}
                    onClick={() => setSelectedCentreId(centre.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-teal-50 to-emerald-50/70 border-teal-600 shadow-sm ring-2 ring-teal-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${isSelected ? 'text-teal-800' : 'text-slate-400'}`}>
                          {centre.shortName}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-slate-300'}`} />
                      </div>
                      <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-teal-950 font-black' : 'text-slate-900'}`}>
                        {centre.name}
                      </h4>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className={`${isSelected ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
                        {centre.beneficiaries.split('&')[0]}
                      </span>
                      <span className="text-emerald-700 font-bold">Select &rarr;</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tactical Telemetry Inspector (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-50/80 to-emerald-50/20 border border-emerald-100 p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-xs">
            <div className="space-y-4">
              {/* Header with Type & Status */}
              <div className="flex items-center justify-between gap-2 border-b border-emerald-100/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-teal-700 shadow-xs">
                    {currentCentre.type === 'campus' ? (
                      <Heart size={16} strokeWidth={2} className="text-emerald-600 fill-emerald-100" />
                    ) : (
                      <BookOpen size={16} strokeWidth={2} className="text-teal-700" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      Centre Designation
                    </span>
                    <span className="text-xs font-bold text-teal-950">
                      {currentCentre.shortName}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border border-emerald-300 bg-emerald-50 text-emerald-800 font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentCentre.status}</span>
                </span>
              </div>

              {/* Centre Title & Address */}
              <div>
                <h3 className="text-xl font-serif font-black text-teal-950 leading-snug">
                  {currentCentre.name}
                </h3>
                <p className="text-xs text-slate-600 flex items-start gap-1.5 mt-1.5">
                  <MapPin size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{currentCentre.location}</span>
                </p>
              </div>

              {/* Impact Metrics Row */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Impact Scope
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold text-teal-950 block mt-0.5">
                    {currentCentre.beneficiaries}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Student Squad
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold text-teal-950 block mt-0.5">
                    {currentCentre.volunteers} Active On-Duty
                  </span>
                </div>
              </div>

              {/* Field Operations Briefing */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Ground Operations Briefing
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {currentCentre.details}
                </p>
              </div>

              {/* Latest Field Dispatch */}
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200/70 shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 block font-bold flex items-center gap-1">
                  <Sparkles size={11} className="text-emerald-600" />
                  <span>Latest Field Dispatch</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCentre.recentUpdate}
                </p>
              </div>

              {/* Google Maps External Navigation Button */}
              <a
                href={currentCentre.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-99"
              >
                <Navigation size={13} className="group-hover:rotate-45 transition-transform" />
                <span>Navigate & Open in Google Maps</span>
                <ExternalLink size={12} className="opacity-80" />
              </a>
            </div>

            {/* Coordinator Footer */}
            <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-600">
              <span className="text-[11px] truncate max-w-[200px]">
                Coord: <strong className="text-slate-800 font-semibold">{currentCentre.leadCoordinator}</strong>
              </span>
              <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-bold">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Verified Centre</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
