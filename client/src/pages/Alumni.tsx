import React, { useState, useEffect } from 'react';
import { Search, Filter, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface Alumni {
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
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alumni');
        if (!response.ok) throw new Error('Failed to fetch alumni');
        const data = await response.json();
        setAlumniList(data);
      } catch (err) {
        console.error("Using fallback alumni dataset:", err);
        // High quality fallback dataset representing Eklavya alumni
        setAlumniList([
          {
            _id: '1',
            name: 'Rahul Sharma',
            batch: '2020-2024',
            department: 'Computer Science & Engg.',
            currentRole: 'Software Engineer',
            company: 'Microsoft',
            quote: 'Eklavya taught me empathy and teamwork. Managing free school sessions made me a better leader.',
            linkedin: 'https://linkedin.com'
          },
          {
            _id: '2',
            name: 'Ananya Roy',
            batch: '2021-2025',
            department: 'Information Technology',
            currentRole: 'Frontend Developer',
            company: 'Amazon',
            quote: 'Working on Eklavya tech initiatives gave me practical full-stack experience.',
            linkedin: 'https://linkedin.com'
          },
          {
            _id: '3',
            name: 'Subham Mukherjee',
            batch: '2020-2024',
            department: 'Electronics & Comm. Engg.',
            currentRole: 'Systems Engineer',
            company: 'TCS Innovation Labs',
            quote: 'The animal rescue drives taught me kindness that I carry everywhere.',
            linkedin: 'https://linkedin.com'
          },
          {
            _id: '4',
            name: 'Priyanka Das',
            batch: '2022-2026',
            department: 'Chemical Engineering',
            currentRole: 'Operations Analyst',
            company: 'Reliance Industries',
            quote: 'Being part of Eklavya was the highlight of my college life at HIT.',
            linkedin: 'https://linkedin.com'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const batches = ['All', '2020-2024', '2021-2025', '2022-2026'];
  const departments = ['All', 'Computer Science & Engg.', 'Information Technology', 'Electronics & Comm. Engg.', 'Chemical Engineering'];

  const filteredAlumni = alumniList.filter((alumnus) => {
    const matchesSearch =
      alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.currentRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch === 'All' || alumnus.batch === selectedBatch;
    const matchesDept = selectedDept === 'All' || alumnus.department === selectedDept;

    return matchesSearch && matchesBatch && matchesDept;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="py-16 bg-gradient-to-b from-blue-950/70 via-slate-900 to-slate-950 border-b border-slate-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Legacy & Leadership
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Our Esteemed Alumni</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Honoring our former student leaders who pioneered Eklavya's mission and continue to excel across global organizations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search alumni by name, role, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Batch Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
            >
              {batches.map((b) => (
                <option key={b} value={b}>
                  Batch: {b}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500 w-full md:w-auto"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  Dept: {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Alumni Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading alumni directory...</div>
        ) : filteredAlumni.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-base mb-2">No alumni found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBatch('All');
                setSelectedDept('All');
              }}
              className="text-xs text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredAlumni.map((alumnus) => (
              <div
                key={alumnus._id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 shadow-lg space-y-4"
              >
                <div className="flex items-start gap-4">
                  <ImageWithFallback
                    src={alumnus.imageUrl}
                    alt={alumnus.name}
                    fallbackType="avatar"
                    initials={alumnus.name}
                    className="w-16 h-16 rounded-full border-2 border-slate-700 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-white">{alumnus.name}</h2>
                      {alumnus.linkedin && (
                        <a
                          href={alumnus.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <GraduationCap size={14} className="text-cyan-400" />
                      <span>{alumnus.department} ({alumnus.batch})</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                      <Briefcase size={14} className="text-blue-400" />
                      <span>{alumnus.currentRole} at {alumnus.company}</span>
                    </div>
                  </div>
                </div>

                {alumnus.quote && (
                  <p className="text-slate-300 text-xs italic bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    "{alumnus.quote}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
