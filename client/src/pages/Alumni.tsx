import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Briefcase, MessageSquare } from 'lucide-react';
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
      } catch {
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
            quote: 'Working on Eklavya tech initiatives gave me practical full-stack engineering experience.'
          },
          {
            _id: '3',
            name: 'Subham Mukherjee',
            batch: '2020-2024',
            department: 'Electronics & Comm. Engg.',
            currentRole: 'Systems Engineer',
            company: 'TCS Innovation Labs',
            quote: 'The animal rescue drives taught me resilience and kindness that I carry everywhere.'
          },
          {
            _id: '4',
            name: 'Priyanka Das',
            batch: '2022-2026',
            department: 'Chemical Engineering',
            currentRole: 'Operations Analyst',
            company: 'Reliance Industries',
            quote: 'Being part of Eklavya was the defining highlight of my undergraduate journey at HIT.'
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
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-[#E5E0D8] pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold">
              <GraduationCap size={14} className="text-[#C25E38]" />
              <span>Graduate Network & Legacy • HIT Haldia</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C2826] leading-[1.08]">
              Pioneering Leaders, <br className="hidden sm:inline" />
              Global Footprint.
            </h1>
            <p className="text-[#1C2826]/70 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Honoring former student coordinators who built Eklavya's foundation and now carry the culture of empathy and engineering excellence into global technology and industrial leaders.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>FOUNDING BATCH</span>
                <span className="font-bold text-[#1C2826]">CLASS OF 2020</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>MENTORSHIP</span>
                <span className="font-bold text-emerald-700">ACTIVE CHANNELS</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>PLACEMENTS</span>
                <span className="font-bold text-[#1C2826]">GLOBAL TOP FIRMS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Integrated Hairline Filter & Search Bar */}
      <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 shadow-2xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2826]/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search alumni by name, employer, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-xs font-medium text-[#1C2826] placeholder-[#1C2826]/40 focus:outline-none focus:border-[#1C2826] transition-colors"
          />
        </div>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="bg-[#FAF8F5] border border-[#E5E0D8] text-[#1C2826] font-mono text-xs rounded-lg px-3 py-2 focus:outline-none w-full sm:w-auto"
        >
          <option value="All">All Batches</option>
          <option value="2020-2024">Batch 2020-2024</option>
          <option value="2021-2025">Batch 2021-2025</option>
          <option value="2022-2026">Batch 2022-2026</option>
        </select>
      </div>

      {/* 3. Alumni Asymmetric Cards */}
      {loading ? (
        <div className="text-center py-16 text-[#1C2826]/60 font-mono text-xs">QUERYING ALUMNI DIRECTORY...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlumni.map((alumnus) => (
            <div
              key={alumnus._id}
              className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xs flex flex-col justify-between hover:border-[#C25E38]/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={alumnus.imageUrl}
                  alt={alumnus.name}
                  fallbackType="avatar"
                  initials={alumnus.name}
                  className="w-14 h-14 rounded-xl border border-[#E5E0D8] shrink-0 object-cover"
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1C2826] truncate">
                      {alumnus.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-[#FAF8F5] text-[#1C2826] border border-[#E5E0D8] px-2 py-0.5 rounded font-bold shrink-0">
                      {alumnus.batch}
                    </span>
                  </div>
                  <p className="text-xs text-[#1C2826]/60 truncate">
                    {alumnus.department}
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1C2826]">
                      <Briefcase size={13} className="text-[#C25E38]" />
                      <span>{alumnus.currentRole} • {alumnus.company}</span>
                    </span>
                  </div>
                </div>
              </div>

              {alumnus.quote && (
                <div className="pt-3 border-t border-[#E5E0D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleQuote(alumnus._id)}
                      className="font-mono text-[11px] text-[#C25E38] hover:text-[#A94F2E] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <MessageSquare size={12} />
                      <span>{visibleQuotes[alumnus._id] ? 'COLLAPSE TESTIMONIAL' : 'READ REFLECTION'}</span>
                    </button>
                  </div>
                  {visibleQuotes[alumnus._id] && (
                    <blockquote className="bg-[#FAF8F5] border border-[#E5E0D8] p-4 rounded-xl font-serif text-xs text-[#1C2826]/80 italic leading-relaxed">
                      "{alumnus.quote}"
                    </blockquote>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
