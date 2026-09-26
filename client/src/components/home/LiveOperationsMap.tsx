import React, { useState } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { MapPin, BookOpen, Heart, CheckCircle2 } from 'lucide-react';

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
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <SectionTitle
          badge="GROUND PRESENCE"
          badgeVariant="green"
          title="Live Ground Operations in Haldia"
          highlightWord="Ground Operations"
          subtitle="Student teams deploy daily across Haldia's rural settlements and streets. Inspect real-time field deployments and direct impact below."
        />

        {/* Global Operational Status Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-mono tracking-wide text-slate-800 shadow-sm shrink-0 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>4 Active Squads Deployed Today</span>
        </div>
      </div>

      {/* Main Command Console */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Radar Grid & Zone Selector (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-5">
            {/* Topological Radar Frame */}
            <div className="relative w-full h-[300px] sm:h-[350px] rounded-xl bg-slate-50 border border-slate-200 overflow-hidden group">
              {/* Abstract Coordinate Grid */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.3) 1px, transparent 0)',
                  backgroundSize: '28px 28px'
                }}
              />

              {/* Connecting Ground Circuits / Vectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500/30 stroke-[1.2] fill-none">
                <path d="M 120 100 Q 240 140 380 90 T 520 220" strokeDasharray="3 4" />
                <path d="M 220 120 Q 320 190 420 170" strokeDasharray="2 3" />
                <path d="M 380 90 L 420 170" strokeDasharray="2 4" />
              </svg>

              {/* Coordinates Stamp */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono font-medium text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <MapPin size={12} className="text-emerald-600" />
                <span>HALDIA RADAR • 22.06° N, 88.07° E</span>
              </div>

              {/* Interactive Zone Pins */}
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none group/pin z-20 cursor-pointer"
                    aria-label={`Select ${zone.name}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
                      )}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white scale-110 ring-2 ring-blue-400'
                            : 'bg-white text-blue-600 hover:bg-slate-100 border border-slate-300'
                        }`}
                      >
                        {zone.type === 'education' ? (
                          <BookOpen size={14} strokeWidth={1.75} />
                        ) : (
                          <Heart size={14} strokeWidth={1.75} />
                        )}
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div
                      className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all shadow-sm ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {zone.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Zone Selector Buttons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 border-blue-300 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-blue-700 font-bold' : 'text-slate-500'}`}>
                        {zone.id.toUpperCase()}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          zone.statusColor === 'emerald'
                            ? 'bg-emerald-500'
                            : zone.statusColor === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                        }`}
                      />
                    </div>
                    <div className="font-semibold text-xs truncate">
                      {zone.name}
                    </div>
                    <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                      {zone.beneficiaries}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tactical Telemetry Inspector (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 rounded-xl bg-slate-50 border border-slate-200 p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-sm">
            <div className="space-y-4">
              {/* Header with Type & Status */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                    {currentZone.type === 'education' ? <BookOpen size={14} strokeWidth={1.75} /> : <Heart size={14} strokeWidth={1.75} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      Sector Focus
                    </span>
                    <span className="text-xs font-semibold text-slate-800 capitalize">
                      {currentZone.type === 'education' ? 'Rural Education' : 'Animal Rescue'}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold">
                  {currentZone.status}
                </span>
              </div>

              {/* Zone Title & Location */}
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                  {currentZone.name}
                </h3>
                <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                  <MapPin size={12} className="text-blue-600 shrink-0" />
                  <span>{currentZone.location}</span>
                </p>
              </div>

              {/* Impact Breakdown Stats */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Impact Scope
                  </span>
                  <span className="text-base font-serif font-bold text-slate-900 block mt-0.5">
                    {currentZone.beneficiaries}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Student Squad
                  </span>
                  <span className="text-base font-serif font-bold text-slate-900 block mt-0.5">
                    {currentZone.volunteers} Active On-Duty
                  </span>
                </div>
              </div>

              {/* Field Briefing */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Field Briefing
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {currentZone.details}
                </p>
              </div>

              {/* Real-time Field Update */}
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 block font-bold">
                  Latest Field Dispatch
                </span>
                <p className="text-xs text-slate-700 leading-normal mt-0.5">
                  {currentZone.recentUpdate}
                </p>
              </div>
            </div>

            {/* Coordinator Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="text-[11px]">Lead: <strong className="text-slate-800 font-medium">{currentZone.leadCoordinator}</strong></span>
              <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 size={12} />
                <span>Verified</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

