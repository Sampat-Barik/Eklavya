import React, { useState } from 'react';
import { MapPin, BookOpen, Heart, Activity, CheckCircle2, Sparkles } from 'lucide-react';

interface GroundZone {
  id: string;
  name: string;
  location: string;
  type: 'education' | 'animal' | 'relief';
  status: 'Active Now' | 'Scheduled 4:30 PM' | 'In Progress' | 'Completed Today';
  statusColor: string;
  beneficiaries: string;
  volunteers: number;
  leadCoordinator: string;
  details: string;
  coordinates: { x: number; y: number };
  recentUpdate: string;
}

export const LiveOperationsMap: React.FC = () => {
  const zones: GroundZone[] = [
    {
      id: 'z1',
      name: 'Brajalalchak Evening School',
      location: 'Brajalalchak Village, Near Haldia Port Link',
      type: 'education',
      status: 'Active Now',
      statusColor: 'emerald',
      beneficiaries: '65 Children',
      volunteers: 14,
      leadCoordinator: 'Rahul & Priya (HIT CSE & EE)',
      details: 'Daily primary tutoring in Mathematics, English & Science basics. Distribution of evening nutritious snacks.',
      coordinates: { x: 35, y: 38 },
      recentUpdate: 'Daily evening attendance logged. Stationeries and notebooks handed out.',
    },
    {
      id: 'z2',
      name: 'HIT Campus & Ranichak Stray Squad',
      location: 'Campus Vicinity & Ranichak Crossing',
      type: 'animal',
      status: 'Active Now',
      statusColor: 'emerald',
      beneficiaries: '18 Stray Animals Today',
      volunteers: 9,
      leadCoordinator: 'Ankit & Sneha (HIT ME & IT)',
      details: 'Wound dressing, anti-rabies vaccination rounds, and post-surgery rehabilitation for campus community dogs.',
      coordinates: { x: 62, y: 55 },
      recentUpdate: 'Puppy rescued from stormwater drain; stabilized with veterinary saline & bandage.',
    },
    {
      id: 'z3',
      name: 'Kshudiram Nagar Remedial Batch',
      location: 'Kshudiram Nagar Colony, Haldia',
      type: 'education',
      status: 'Scheduled 4:30 PM',
      statusColor: 'amber',
      beneficiaries: '45 Children',
      volunteers: 10,
      leadCoordinator: 'Debjit (HIT CHE)',
      details: 'Foundational literacy workshops, moral storytelling, and creative art sessions for first-generation learners.',
      coordinates: { x: 48, y: 72 },
      recentUpdate: 'Volunteer batch briefing complete at Student Activity Center.',
    },
    {
      id: 'z4',
      name: 'Sutahata Emergency Relief Hub',
      location: 'Sutahata Rural Belt, Purba Medinipur',
      type: 'relief',
      status: 'Completed Today',
      statusColor: 'blue',
      beneficiaries: '35 Families & Strays',
      volunteers: 12,
      leadCoordinator: 'Sourav & Team (HIT CE)',
      details: 'Warm clothing drive and dry ration distribution alongside stray animal feeding routes.',
      coordinates: { x: 80, y: 30 },
      recentUpdate: 'Winter blankets and emergency pet feeding bags distributed successfully.',
    },
  ];

  const [selectedZoneId, setSelectedZoneId] = useState<string>('z1');
  const currentZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Activity size={14} className="text-blue-600 animate-pulse" />
            <span>Real-Time Field Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
            Live Ground Operations in Haldia
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            Student teams deploy daily across Haldia's rural hamlets and streets. Select an active zone below to inspect today's field deployment and direct impact.
          </p>
        </div>

        {/* Global Operational Status Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-slate-800">4 Active Squads Deployed Today</span>
        </div>
      </div>

      {/* Main Console Box */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
          {/* Left Column: Interactive Map & Zone Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Interactive Schematic Map Frame */}
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden group">
              {/* Abstract Topological Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Connecting Vector Circuits / Ground Routes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500/30 stroke-[1.5] fill-none">
                <path d="M 120 100 Q 240 140 380 90 T 520 220" strokeDasharray="4 4" />
                <path d="M 220 120 Q 320 190 420 170" strokeDasharray="3 3" />
                <path d="M 380 90 L 420 170" strokeDasharray="2 4" />
              </svg>

              {/* Haldia Landmark Watermark */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-mono font-bold text-slate-400 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin size={13} className="text-blue-400" />
                <span>HALDIA FIELD RADAR • 22.06° N, 88.07° E</span>
              </div>

              {/* Interactive Zone Hotspots on Map */}
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none group/pin z-20"
                    aria-label={`Select ${zone.name}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
                      )}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                          isSelected
                            ? 'bg-blue-600 text-white scale-125 ring-4 ring-blue-500/40'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-110 border border-slate-700'
                        }`}
                      >
                        {zone.type === 'education' ? (
                          <BookOpen size={16} />
                        ) : (
                          <Heart size={16} />
                        )}
                      </div>
                    </div>
                    {/* Tooltip Tag */}
                    <div
                      className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all shadow-md ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950/90 text-slate-300 border border-slate-800 group-hover/pin:border-slate-600'
                      }`}
                    >
                      {zone.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Zone Selector Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs ring-1 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                        {zone.id.toUpperCase()}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          zone.statusColor === 'emerald'
                            ? 'bg-emerald-500'
                            : zone.statusColor === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                        }`}
                      />
                    </div>
                    <div className="font-bold text-xs text-slate-900 truncate leading-snug">
                      {zone.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                      {zone.beneficiaries}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Telemetry Panel */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Header with Type & Status */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-3.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-xl ${
                      currentZone.type === 'education'
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {currentZone.type === 'education' ? <BookOpen size={16} /> : <Heart size={16} />}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                      Sector Focus
                    </span>
                    <span className="text-xs font-bold text-slate-900 capitalize">
                      {currentZone.type === 'education' ? 'Free Rural Education' : 'Animal Welfare & Rescue'}
                    </span>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    currentZone.statusColor === 'emerald'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : currentZone.statusColor === 'amber'
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                  }`}
                >
                  {currentZone.status}
                </div>
              </div>

              {/* Zone Title & Location */}
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
                  {currentZone.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin size={13} className="text-blue-600 shrink-0" />
                  <span>{currentZone.location}</span>
                </p>
              </div>

              {/* Impact Breakdown Stats */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Impact Scope
                  </span>
                  <span className="text-lg font-serif font-black text-slate-900 block mt-0.5">
                    {currentZone.beneficiaries}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Student Volunteers
                  </span>
                  <span className="text-lg font-serif font-black text-blue-600 block mt-0.5">
                    {currentZone.volunteers} Active On-Duty
                  </span>
                </div>
              </div>

              {/* Operational Description */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Field Briefing
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {currentZone.details}
                </p>
              </div>

              {/* Real-time Field Update */}
              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-2.5">
                <Sparkles size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                    Latest Ground Log
                  </span>
                  <p className="text-xs text-slate-700 leading-normal">
                    {currentZone.recentUpdate}
                  </p>
                </div>
              </div>
            </div>

            {/* Coordinator Footer */}
            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span>Field Leads: <strong className="text-slate-800">{currentZone.leadCoordinator}</strong></span>
              <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1 font-bold">
                <CheckCircle2 size={13} />
                <span>Verified by HIT Eklavya</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
