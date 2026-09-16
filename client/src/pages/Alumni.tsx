import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
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

  const filteredAlumni = alumniList.filter((alumnus) => {
    const matchesSearch =
      alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.currentRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch === 'All' || alumnus.batch === selectedBatch;

    return matchesSearch && matchesBatch;
  });

  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#a7f3d0] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Sparkles size={14} />
          <span>LEGACY & LEADERSHIP</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-950">Our Esteemed Alumni</h1>
        <p className="text-slate-700 text-xs font-medium max-w-lg mx-auto">
          Honoring our former student leaders who pioneered Eklavya's mission and continue to excel across global organizations.
        </p>
      </div>

      {/* Search Bar & Filters (Matching Screenshot Neobrutalist Controls) */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-2xl p-4 md:p-6 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-950 w-4 h-4" />
          <input
            type="text"
            placeholder="Search alumni by name, role, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-950 rounded-xl text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none focus:border-blue-600"
          />
        </div>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="bg-[#fef08a] border-2 border-slate-950 text-slate-950 text-xs font-bold rounded-xl px-4 py-2.5 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none w-full md:w-auto"
        >
          <option value="All">Batch: All Batches</option>
          <option value="2020-2024">Batch 2020-2024</option>
          <option value="2021-2025">Batch 2021-2025</option>
          <option value="2022-2026">Batch 2022-2026</option>
        </select>
      </div>

      {/* Alumni Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-600 font-bold">Loading alumni directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlumni.map((alumnus) => (
            <div
              key={alumnus._id}
              className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-4"
            >
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={alumnus.imageUrl}
                  alt={alumnus.name}
                  fallbackType="avatar"
                  initials={alumnus.name}
                  className="w-14 h-14 rounded-full shrink-0"
                />
                <div className="space-y-1 flex-1">
                  <h2 className="text-lg font-black text-slate-950">{alumnus.name}</h2>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <GraduationCap size={14} className="text-blue-600" />
                    <span>{alumnus.department} ({alumnus.batch})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                    <Briefcase size={14} className="text-purple-700" />
                    <span>{alumnus.currentRole} at {alumnus.company}</span>
                  </div>
                </div>
              </div>

              {alumnus.quote && (
                <div className="bg-white border-2 border-slate-950 p-3 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] text-xs font-medium text-slate-900 italic">
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
