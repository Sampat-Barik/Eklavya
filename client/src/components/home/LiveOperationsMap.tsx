import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { MapPin, BookOpen, Heart, Navigation, ExternalLink, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface OperationCentre {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  location: string;
  coordinates: { lat: number; lng: number };
  gpsLabel: string;
  type: 'campus' | 'school' | 'remedial';
  status: 'Active Now' | 'In Progress' | 'Scheduled 4:30 PM';
  statusColor: 'emerald' | 'teal' | 'amber';
  beneficiaries: string;
  volunteers: number;
  leadCoordinator: string;
  details: string;
  recentUpdate: string;
  googleMapsUrl: string;
}

const CENTRES: OperationCentre[] = [
  {
    id: 'hit-campus',
    name: 'HIT College Campus Centre',
    shortName: 'HIT Campus Hub',
    tagline: 'Central Operations, Animal Rescue Bay & Volunteer Headquarters',
    location: 'Haldia Institute of Technology, ICARE Complex, HIT Campus, Haldia, WB 721657',
    coordinates: { lat: 22.0506, lng: 88.0722 },
    gpsLabel: '22.0506° N, 88.0722° E',
    type: 'campus',
    status: 'Active Now',
    statusColor: 'emerald',
    beneficiaries: '120+ Street Animals & Campus Tutees',
    volunteers: 28,
    leadCoordinator: 'Prof. S. Das & Central Student Council',
    details: 'Central administrative node coordinating society logistics, animal medical first-aid unit, anti-rabies vaccination stocks, and volunteer evening deployment batches.',
    recentUpdate: 'Emergency animal triage active. Evening teaching materials dispatched to community centres.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=22.0506,88.0722'
  },
  {
    id: 'ranichak-centre',
    name: 'Ranichak Centre',
    shortName: 'Ranichak Evening School',
    tagline: 'Primary Evening Coaching, Nutritional Snack Station & Relief Hub',
    location: 'Ranichak Crossing, Near Haldia Port Link, Haldia, WB 721602',
    coordinates: { lat: 22.0645, lng: 88.0860 },
    gpsLabel: '22.0645° N, 88.0860° E',
    type: 'school',
    status: 'Active Now',
    statusColor: 'emerald',
    beneficiaries: '65 Village Children',
    volunteers: 14,
    leadCoordinator: 'Rahul & Priya (HIT CSE & EE)',
    details: 'Daily free primary tutoring in Mathematics, English & Science fundamentals for village children. Daily distribution of fresh boiled eggs, milk, and stationery supplies.',
    recentUpdate: 'Daily evening attendance logged. Mid-semester notebooks and geometry kits distributed.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=22.0645,88.0860'
  },
  {
    id: 'khudiram-centre',
    name: 'Khudiram Centre',
    shortName: 'Khudiram Nagar Batch',
    tagline: 'Remedial Literacy, Child Mentorship & Community Outreach',
    location: 'Kshudiram Nagar Colony, Near Haldia River Periphery, Haldia, WB 721657',
    coordinates: { lat: 22.0492, lng: 88.0616 },
    gpsLabel: '22.0492° N, 88.0616° E',
    type: 'remedial',
    status: 'Scheduled 4:30 PM',
    statusColor: 'teal',
    beneficiaries: '45 Children & Families',
    volunteers: 10,
    leadCoordinator: 'Debjit & Ananya (HIT CHE & IT)',
    details: 'Foundational literacy mentorship for first-generation learners, interactive storytelling, drawing workshops, and community sanitation & hygiene guidance.',
    recentUpdate: 'Student mentorship cohort ready. Classroom worksheets prepared at Student Activity Center.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=22.0492,88.0616'
  }
];

export const LiveOperationsMap: React.FC = () => {
  const [selectedCentreId, setSelectedCentreId] = useState<string>('hit-campus');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const currentCentre = CENTRES.find((c) => c.id === selectedCentreId) || CENTRES[0];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet Map centered around Haldia
    const map = L.map(mapContainerRef.current, {
      center: [22.0545, 88.0730],
      zoom: 13,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Fast, crisp, high-contrast CartoDB Voyager map tiles matching modern organic aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Add Attribution subtly
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank" rel="noreferrer">CARTO</a>')
      .addTo(map);

    // Helper for custom animated Leaflet marker icon
    const createMarkerIcon = (shortName: string, isSelected: boolean) => {
      const markerHtml = `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="relative flex items-center justify-center">
            ${isSelected ? '<span class="absolute -inset-2 rounded-full bg-teal-500/40 animate-ping"></span>' : ''}
            <div class="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
              isSelected
                ? 'bg-gradient-to-tr from-teal-800 to-emerald-600 text-white scale-115 ring-3 ring-emerald-300 shadow-teal-900/30'
                : 'bg-white text-teal-800 border-2 border-emerald-300 hover:scale-105'
            }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
          <div class="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-sans tracking-wide whitespace-nowrap shadow-md transition-all ${
            isSelected
              ? 'bg-teal-950 text-emerald-200 border border-emerald-400/50'
              : 'bg-white/95 text-slate-800 border border-slate-200'
          }">
            ${shortName}
          </div>
        </div>
      `;

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [40, 52],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
      });
    };

    // Create markers for the 3 centres
    CENTRES.forEach((centre) => {
      const isSelected = centre.id === 'hit-campus';
      const marker = L.marker([centre.coordinates.lat, centre.coordinates.lng], {
        icon: createMarkerIcon(centre.shortName, isSelected)
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: inherit; min-width: 180px; padding: 2px;">
          <strong style="color: #042f2e; font-size: 13px; display: block; margin-bottom: 2px;">${centre.name}</strong>
          <span style="display: inline-block; font-size: 10px; color: #065f46; font-weight: 700; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 1px 6px; border-radius: 9999px; margin-bottom: 6px;">${centre.status}</span>
          <p style="font-size: 11px; color: #475569; margin: 0; line-height: 1.3;">${centre.location}</p>
        </div>
      `);

      marker.on('click', () => {
        setSelectedCentreId(centre.id);
      });

      markersRef.current[centre.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = {};
    };
  }, []);

  // Update map view & marker styles when selected centre changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Smooth fly to selected centre
    map.flyTo([currentCentre.coordinates.lat, currentCentre.coordinates.lng], 14, {
      duration: 1.2
    });

    // Update marker styling and open popup
    CENTRES.forEach((centre) => {
      const marker = markersRef.current[centre.id];
      if (!marker) return;

      const isSelected = centre.id === selectedCentreId;
      const markerHtml = `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="relative flex items-center justify-center">
            ${isSelected ? '<span class="absolute -inset-2 rounded-full bg-teal-500/40 animate-ping"></span>' : ''}
            <div class="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
              isSelected
                ? 'bg-gradient-to-tr from-teal-800 to-emerald-600 text-white scale-115 ring-3 ring-emerald-300 shadow-teal-900/30'
                : 'bg-white text-teal-800 border-2 border-emerald-300 hover:scale-105'
            }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
          <div class="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-sans tracking-wide whitespace-nowrap shadow-md transition-all ${
            isSelected
              ? 'bg-teal-950 text-emerald-200 border border-emerald-400/50'
              : 'bg-white/95 text-slate-800 border border-slate-200'
          }">
            ${centre.shortName}
          </div>
        </div>
      `;

      marker.setIcon(
        L.divIcon({
          className: 'custom-leaflet-marker',
          html: markerHtml,
          iconSize: [40, 52],
          iconAnchor: [20, 48],
          popupAnchor: [0, -48]
        })
      );

      if (isSelected) {
        marker.openPopup();
      }
    });
  }, [selectedCentreId, currentCentre]);

  // Fit bounds to show all 3 centres
  const handleFitAllCentres = () => {
    if (!mapInstanceRef.current) return;
    const group = L.featureGroup(Object.values(markersRef.current));
    mapInstanceRef.current.fitBounds(group.getBounds().pad(0.25), {
      duration: 1.0
    });
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-100 pb-6">
        <SectionTitle
          badge="GROUND CENTRES & HUBS"
          badgeVariant="green"
          title="Our 3 Active Centres in Haldia"
          highlightWord="Active Centres"
          subtitle="Explore the live GPS locations and operational details of our 3 official centres: HIT Campus Hub, Ranichak Centre, and Khudiram Centre."
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
          
          {/* Left Column: Live Interactive Map & Centre Quick Toggles (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Live Leaflet Map Frame */}
            <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-emerald-200/80 shadow-inner group">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Coordinates Stamp & Controls Overlay */}
              <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-teal-950 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">
                  <MapPin size={13} className="text-emerald-600" />
                  <span>{currentCentre.gpsLabel}</span>
                </div>
              </div>

              {/* Reset to Show All Centres Button */}
              <button
                onClick={handleFitAllCentres}
                className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5 text-[11px] font-bold text-teal-900 bg-white/95 hover:bg-emerald-50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
                title="View All 3 Centres"
              >
                <Maximize2 size={13} className="text-teal-700" />
                <span className="hidden sm:inline">Fit All Centres</span>
              </button>
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
                        ? 'bg-gradient-to-br from-teal-50 to-emerald-50/60 border-teal-600 shadow-sm ring-1 ring-teal-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${isSelected ? 'text-teal-800' : 'text-slate-400'}`}>
                          {centre.id.toUpperCase().replace('-', ' ')}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-slate-300'}`} />
                      </div>
                      <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-teal-950 font-black' : 'text-slate-900'}`}>
                        {centre.name}
                      </h4>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className={`${isSelected ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
                        {centre.beneficiaries.split('&')[0]}
                      </span>
                      <span className="text-emerald-700 font-bold">Inspect &rarr;</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Centre Telemetry & Details Inspector (5 cols) */}
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
