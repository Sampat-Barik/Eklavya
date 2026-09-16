import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Briefcase, Sparkles, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface AlumniItem {
  _id: string;
  name: string;
  batch: string;
  department: string;
  currentRole: string;
  company: string;
  quote?: string;
  linkedin?: string;
  imageUrl?: string;
}

export const Alumni: React.FC = () => {
  const [alumniList, setAlumniList] = useState<AlumniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [visibleQuotes, setVisibleQuotes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alumni');
        if (!response.ok) throw new Error('Failed to fetch alumni');
        const data = await response.json();
        setAlumniList(data);
      } catch (err) {
        setAlumniList([
          {
            _id: '1',
            name: 'Rahul Sharma',
            batch: '2020-2024',
            department: 'Computer Science & Engg.',
            currentRole: 'Software Engineer',
            company: 'Microsoft',
            quote: 'Eklavya taught me empathy and teamwork. Managing free school sessions made me a better leader.'
          },
          {
            _id: '2',
            name: 'Ananya Roy',
            batch: '2021-2025',
            department: 'Information Technology',
            currentRole: 'Frontend Developer',
            company: 'Amazon',
            quote: 'Working on Eklavya tech initiatives gave me practical full-stack experience.'
          },
          {
            _id: '3',
            name: 'Subham Mukherjee',
            batch: '2020-2024',
            department: 'Electronics & Comm. Engg.',
            currentRole: 'Systems Engineer',
            company: 'TCS Innovation Labs',
            quote: 'The animal rescue drives taught me kindness that I carry everywhere.'
          },
          {
            _id: '4',
            name: 'Priyanka Das',
            batch: '2022-2026',
            department: 'Chemical Engineering',
            currentRole: 'Operations Analyst',
            company: 'Reliance Industries',
            quote: 'Being part of Eklavya was the highlight of my college life at HIT.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const toggleQuote = (id: string) => {
    setVisibleQuotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAlumni = alumniList.filter((alumnus) => {
    const matchesSearch =
      alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.currentRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch === 'All' || alumnus.batch === selectedBatch;

    return matchesSearch && matchesBatch;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-8 pb-16 py-4">
      {/* Top Banner */}
      <div className="enamo-card p-8 md:p-12 text-center space-y-4 bg-slate-950 text-white relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white">
          <Sparkles size={14} className="text-amber-300" />
          <span>LEGACY & LEADERSHIP</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Our Esteemed Alumni</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto font-normal leading-relaxed">
          Honoring our former student leaders who pioneered Eklavya's mission and continue to excel across global organizations.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="enamo-card p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search alumni by name, role, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
          />
        </div>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-full px-5 py-3 focus:outline-none w-full md:w-auto"
        >
          <option value="All">Batch: All Batches</option>
          <option value="2020-2024">Batch 2020-2024</option>
          <option value="2021-2025">Batch 2021-2025</option>
          <option value="2022-2026">Batch 2022-2026</option>
        </select>
      </div>

      {/* Alumni Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 font-semibold">Loading alumni directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlumni.map((alumnus) => (
            <div
              key={alumnus._id}
              className="enamo-card p-8 space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={alumnus.imageUrl}
                  alt={alumnus.name}
                  fallbackType="avatar"
                  initials={alumnus.name}
                  className="w-16 h-16 rounded-full border border-slate-200 shrink-0 object-cover"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-slate-950">{alumnus.name}</h2>
                    {alumnus.quote && (
                      <button
                        onClick={() => toggleQuote(alumnus._id)}
                        className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full"
                      >
                        <MessageSquare size={13} />
                        <span>{visibleQuotes[alumnus._id] ? 'Hide' : 'Quote'}</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <GraduationCap size={15} className="text-slate-900" />
                    <span>{alumnus.department} ({alumnus.batch})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Briefcase size={15} className="text-slate-900" />
                    <span>{alumnus.currentRole} at {alumnus.company}</span>
                  </div>
                </div>
              </div>

              {alumnus.quote && visibleQuotes[alumnus._id] && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs font-normal text-slate-700 italic leading-relaxed animate-in fade-in duration-200">
                  "{alumnus.quote}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
