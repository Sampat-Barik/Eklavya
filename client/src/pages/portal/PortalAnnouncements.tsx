import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, Filter, Search } from 'lucide-react';
import type { AnnouncementItem } from '../../types/auth';

export const PortalAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/portal/announcements', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            setAnnouncements(await res.json());
            return;
          }
        } catch {
          // Local fallback
        }
      }

      setAnnouncements([
        {
          id: 'ann-1',
          title: 'Weekend Animal Vaccination & Rabies Prevention Camp',
          date: 'September 22, 2026',
          author: 'Animal Welfare Coordinator',
          category: 'Animal Care',
          priority: 'High',
          content: 'Volunteers are requested to gather at Central Lawn by 8:30 AM with safety gloves and hydration kits. Dr. Roy will guide on safe canine interaction protocols.'
        },
        {
          id: 'ann-2',
          title: 'Village Evening School: Mid-Semester Stationery Event',
          date: 'September 20, 2026',
          author: 'Education Cell',
          category: 'Child Education',
          priority: 'Normal',
          content: 'Collection of notebooks, pencils, and geometry boxes will be coordinated at Student Activity Centre. Please hand over student packs by Friday afternoon.'
        },
        {
          id: 'ann-3',
          title: 'Quarterly General Body Meeting & Core Committee Induction',
          date: 'September 25, 2026',
          author: 'President Office',
          category: 'General',
          priority: 'Important',
          content: 'All active student members across 1st, 2nd, 3rd, and 4th years are invited to attend at Main Auditorium for our seasonal impact review and next term roadmap.'
        },
        {
          id: 'ann-4',
          title: 'Haldia Riverside Emergency Flood Watch Update',
          date: 'September 15, 2026',
          author: 'Disaster Relief Squad',
          category: 'Relief',
          priority: 'High',
          content: 'Water levels along Sutahata bank have stabilized. Emergency relief inventory has been stored at Central Warehouse.'
        }
      ]);
    };

    fetchAnnouncements();
  }, []);

  const filtered = announcements.filter((ann) => {
    const matchesQuery =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || ann.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
          Community Announcements & Circulars
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Official society circulars, urgent rescue alerts, and activity notices approved by administration.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Notice Types</option>
            <option value="General">General</option>
            <option value="Child Education">Child Education</option>
            <option value="Animal Care">Animal Care</option>
            <option value="Relief">Relief</option>
          </select>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="editorial-card p-12 text-center text-xs text-slate-500 bg-slate-50/50">
            No announcements match your filter.
          </div>
        ) : (
          filtered.map((ann) => (
            <div
              key={ann.id}
              className={`editorial-card p-6 bg-white space-y-3 transition-all ${
                ann.priority === 'High' ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-blue-600'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wide">
                    {ann.category}
                  </span>
                  {ann.priority === 'High' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                      <AlertCircle size={10} />
                      <span>Urgent Circular</span>
                    </span>
                  )}
                  {ann.priority === 'Important' && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      Important Notice
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar size={13} />
                  <span>{ann.date}</span>
                </div>
              </div>

              <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                {ann.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Issued by: {ann.author}</span>
                <span className="text-[11px] text-blue-600 font-bold">Official Eklavya Notice</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
