import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Sparkles,
  Camera,
  Heart,
  BookOpen,
  MessageSquare,
  X
} from 'lucide-react';

export type ScheduleTabId = 'gd' | 've' | 'cw' | 'photo';

interface TabDefinition {
  id: ScheduleTabId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tagline: string;
  actionLabel: string;
}

const TABS: TabDefinition[] = [
  {
    id: 'gd',
    label: 'GD Schedule',
    icon: MessageSquare,
    tagline: 'Group discussions, interview grooming, and student volunteer orientation timetable.',
    actionLabel: 'Add GD Session'
  },
  {
    id: 've',
    label: 'VE Schedule',
    icon: BookOpen,
    tagline: 'Village Education evening class rosters, syllabus progress, and mentor shift duties.',
    actionLabel: 'Add VE Shift'
  },
  {
    id: 'cw',
    label: 'CW Schedule',
    icon: Heart,
    tagline: 'Community Welfare field operations, nutrition distribution, and animal feeding runs.',
    actionLabel: 'Add CW Drive'
  },
  {
    id: 'photo',
    label: 'Photo Schedule',
    icon: Camera,
    tagline: 'Media squad coverage, equipment checkout, and field photography roster.',
    actionLabel: 'Add Photo Shift'
  }
];

interface ScheduleEntry {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  lead: string;
  teamCount: number;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  categoryBadge: string;
  notes?: string;
}

export const SchedulesLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab') as ScheduleTabId | null;
  const initialTab: ScheduleTabId = rawTab && ['gd', 've', 'cw', 'photo'].includes(rawTab) ? rawTab : 'gd';

  const [activeTab, setActiveTab] = useState<ScheduleTabId>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVenue, setFilterVenue] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newLead, setNewLead] = useState('');

  // Sample seed data categorized by tab
  const [schedulesData, setSchedulesData] = useState<Record<ScheduleTabId, ScheduleEntry[]>>({
    gd: [
      {
        id: 'gd-1',
        title: 'Communication & Critical Thinking Orientation',
        date: 'Oct 02, 2026',
        time: '04:30 PM - 06:00 PM',
        venue: 'HIT Campus - Seminar Hall B',
        lead: 'Dr. Debabrata Roy & Cadre Lead',
        teamCount: 32,
        status: 'Upcoming',
        categoryBadge: 'Soft Skills',
        notes: 'Mandatory for all 2nd-year newly inducted volunteer cohorts.'
      },
      {
        id: 'gd-2',
        title: 'Rural Education Challenges & Solutions Round',
        date: 'Oct 09, 2026',
        time: '05:00 PM - 06:30 PM',
        venue: 'Khudiram Centre - Main Hall',
        lead: 'Arpan Chatterjee',
        teamCount: 18,
        status: 'Upcoming',
        categoryBadge: 'Policy & Fieldwork',
        notes: 'Brainstorming session on improving retention in village primary classes.'
      },
      {
        id: 'gd-3',
        title: 'Interview & Personality Grooming Workshop',
        date: 'Sep 24, 2026',
        time: '04:00 PM - 05:30 PM',
        venue: 'HIT Campus - Room 302',
        lead: 'Alumni Mentorship Cell',
        teamCount: 45,
        status: 'Completed',
        categoryBadge: 'Alumni Led',
        notes: 'Mock interviews conducted with 2024 graduated mentors.'
      }
    ],
    ve: [
      {
        id: 've-1',
        title: 'Class 6-8: Mathematics & Foundational Science',
        date: 'Daily (Mon - Sat)',
        time: '05:00 PM - 07:00 PM',
        venue: 'Ranichak Evening Centre',
        lead: 'Subhajit Paul (Shift Coordinator)',
        teamCount: 12,
        status: 'In Progress',
        categoryBadge: 'Secondary Education',
        notes: 'Covers algebra, geometry basics, and environmental science.'
      },
      {
        id: 've-2',
        title: 'Class 1-5: Basic Alphabets & Arithmetic Playgroup',
        date: 'Daily (Mon - Fri)',
        time: '04:45 PM - 06:30 PM',
        venue: 'Khudiram Bright Star Club',
        lead: 'Priyanka Das & Riya Mondal',
        teamCount: 14,
        status: 'In Progress',
        categoryBadge: 'Primary Literacy',
        notes: 'Activity-based learning with drawing sheets and slate boards.'
      },
      {
        id: 've-3',
        title: 'Digital Literacy & Computer Basics Shift',
        date: 'Sat & Sun',
        time: '10:00 AM - 12:30 PM',
        venue: 'Gandhi Nagar Digital Hub',
        lead: 'Souvik Karan',
        teamCount: 8,
        status: 'Upcoming',
        categoryBadge: 'Computer Lab',
        notes: 'Hands-on practice with typing tutor and foundational digital tools.'
      }
    ],
    cw: [
      {
        id: 'cw-1',
        title: 'Village Nutrition & Protein Meal Drive',
        date: 'Oct 04, 2026',
        time: '07:30 AM - 11:30 AM',
        venue: 'Ranichak Riverbank Settlement',
        lead: 'Ayan Mukherjee',
        teamCount: 22,
        status: 'Upcoming',
        categoryBadge: 'Nutrition Relief',
        notes: 'Supplying fortified porridge and eggs to 80 undernourished children.'
      },
      {
        id: 'cw-2',
        title: 'Campus & Township Stray Animal Feeding Run',
        date: 'Daily Evening',
        time: '07:00 PM - 09:00 PM',
        venue: 'HIT Campus & Gandhi Nagar Periphery',
        lead: 'Tanmay Ghosh & Squad Alpha',
        teamCount: 10,
        status: 'In Progress',
        categoryBadge: 'Animal Care',
        notes: 'Feeding 110+ community dogs; basic antiseptic wound dressing kit included.'
      },
      {
        id: 'cw-3',
        title: 'Winter Warmth & Clothing Donation Sorting',
        date: 'Oct 15, 2026',
        time: '02:00 PM - 06:00 PM',
        venue: 'Central Inventory Storage (HIT)',
        lead: 'Sagnik Bhattacharya',
        teamCount: 16,
        status: 'Upcoming',
        categoryBadge: 'Winter Relief',
        notes: 'Sorting 400+ donated sweaters and blankets by age group.'
      }
    ],
    photo: [
      {
        id: 'photo-1',
        title: 'Ranichak Evening Classroom Documentation',
        date: 'Oct 03, 2026',
        time: '04:45 PM - 06:45 PM',
        venue: 'Ranichak Evening Centre',
        lead: 'Aniket Sen (Lead Photographer)',
        teamCount: 2,
        status: 'Upcoming',
        categoryBadge: 'Field Media',
        notes: 'Kit: Sony Alpha A7 III + 35mm f/1.4 for low-light lantern classroom photos.'
      },
      {
        id: 'photo-2',
        title: 'Township Animal Vaccination Video Coverage',
        date: 'Oct 11, 2026',
        time: '08:00 AM - 01:00 PM',
        venue: 'Gandhi Nagar Centre',
        lead: 'Raktim Banerjee',
        teamCount: 3,
        status: 'Upcoming',
        categoryBadge: 'Video Reels',
        notes: 'Kit: Gimbal + Wireless Mic; producing short reel for social impact report.'
      },
      {
        id: 'photo-3',
        title: 'Flood Relief Dispatch Photo Archives',
        date: 'Sep 21, 2026',
        time: 'Full Day',
        venue: 'Kholakhali & Riverbed Zones',
        lead: 'Media Volunteer Core',
        teamCount: 4,
        status: 'Completed',
        categoryBadge: 'Archival',
        notes: '180 high-res raw images edited and synced to cloud public ledger.'
      }
    ]
  });

  const handleTabChange = (tabId: ScheduleTabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
    setSearchQuery('');
    setFilterVenue('All');
  };

  const currentTabDef = TABS.find((t) => t.id === activeTab) || TABS[0];
  const entriesForCurrentTab = schedulesData[activeTab] || [];

  // Filter entries
  const filteredEntries = entriesForCurrentTab.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lead.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVenue =
      filterVenue === 'All' || entry.venue.toLowerCase().includes(filterVenue.toLowerCase());

    return matchesSearch && matchesVenue;
  });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry: ScheduleEntry = {
      id: `${activeTab}-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate.trim() || 'Upcoming Date',
      time: newTime.trim() || 'TBD',
      venue: newVenue.trim() || 'Eklavya Ground Centre',
      lead: newLead.trim() || 'Assigned Lead',
      teamCount: 8,
      status: 'Upcoming',
      categoryBadge: 'General Shift'
    };

    setSchedulesData((prev) => ({
      ...prev,
      [activeTab]: [newEntry, ...prev[activeTab]]
    }));

    setNewTitle('');
    setNewDate('');
    setNewTime('');
    setNewVenue('');
    setNewLead('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-100/90 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-teal-900 text-[10px] font-mono font-extrabold uppercase tracking-wider border border-emerald-200">
              Operations & Rosters
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 Roster Channels</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-teal-950 tracking-tight">
            Society Schedules & Rosters
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Consolidated master timetable for village evening classes, group discussions, community welfare runs, and media documentation.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-teal-900/10 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>{currentTabDef.actionLabel}</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Navigation (Horizontal Scrollable Tab Bar) */}
      <div className="overflow-x-auto pb-1 max-w-full">
        <div className="bg-emerald-50/50 p-1 rounded-xl inline-flex mb-6 border border-emerald-100/80 gap-1 min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white shadow-sm text-teal-800 font-semibold rounded-lg px-4 py-2'
                    : 'text-slate-500 hover:text-teal-600 font-medium px-4 py-2'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-teal-800' : 'text-slate-400'} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-emerald-100 text-teal-900' : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {schedulesData[tab.id]?.length || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Context Banner */}
      <div className="bg-white/80 backdrop-blur-sm border border-emerald-50 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-teal-800 flex items-center justify-center border border-emerald-100 shrink-0">
            <currentTabDef.icon size={20} />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-teal-950 flex items-center gap-2">
              <span>{currentTabDef.label} Overview</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold uppercase tracking-wide">
                Live Timetable
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{currentTabDef.tagline}</p>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 block font-mono">Total Roster Slots</span>
            <span className="font-serif font-black text-teal-900 text-base">{entriesForCurrentTab.length}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 block font-mono">Assigned Cadre</span>
            <span className="font-serif font-black text-teal-900 text-base">
              {entriesForCurrentTab.reduce((acc, curr) => acc + curr.teamCount, 0)} Volunteers
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm border border-emerald-50 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${currentTabDef.label} by title, lead, or venue...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
            <Filter size={13} className="text-slate-400" />
            <select
              value={filterVenue}
              onChange={(e) => setFilterVenue(e.target.value)}
              className="bg-transparent focus:outline-none text-xs text-slate-800 font-semibold cursor-pointer"
            >
              <option value="All">All Locations & Hubs</option>
              <option value="HIT">HIT Campus</option>
              <option value="Ranichak">Ranichak Centre</option>
              <option value="Khudiram">Khudiram Centre</option>
              <option value="Gandhi Nagar">Gandhi Nagar Centre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Schedule Cards / Table */}
      <div className="space-y-3.5">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/80 backdrop-blur-sm border border-emerald-50 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-200 hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200/60">
                    {entry.categoryBadge}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      entry.status === 'In Progress'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : entry.status === 'Completed'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm sm:text-base text-teal-950 group-hover:text-teal-800 transition-colors">
                  {entry.title}
                </h3>

                {entry.notes && (
                  <p className="text-xs text-slate-500 line-clamp-2">{entry.notes}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar size={13} className="text-teal-700" />
                    <span>{entry.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock size={13} className="text-teal-700" />
                    <span>{entry.time}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin size={13} className="text-emerald-700" />
                    <span className="truncate">{entry.venue}</span>
                  </span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Assigned Lead
                  </span>
                  <span className="text-xs font-bold text-teal-900 block truncate max-w-[200px]">
                    {entry.lead}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                  <Users size={12} />
                  <span>{entry.teamCount} Volunteers</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-50 rounded-2xl p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-teal-800 flex items-center justify-center mx-auto border border-emerald-100">
              <Sparkles size={22} />
            </div>
            <h3 className="font-serif font-bold text-sm text-teal-950">No schedule entries found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No matching slots for "{searchQuery}". Try updating your search keyword or venue filter.
            </p>
          </div>
        )}
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-teal-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-emerald-100 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h3 className="font-serif font-bold text-base text-teal-950">
                {currentTabDef.actionLabel}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Session / Shift Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Revision Shift / Discussion Round"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date / Frequency</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oct 14, 2026 or Daily"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 05:00 PM - 07:00 PM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Venue / Ground Centre</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ranichak Evening Centre or HIT Hall B"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lead Mentor / Coordinator</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subhajit Paul"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-sm shadow-teal-900/10"
                >
                  <CheckCircle2 size={14} />
                  <span>Save Roster Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
