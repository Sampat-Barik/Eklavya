import React, { useState, useEffect } from 'react';
import { Users, Sparkles, ShieldCheck, Tag } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface Member {
  _id: string;
  name: string;
  role: string;
  department: string;
  domain?: string;
  imageUrl?: string;
  isExecutive?: boolean;
}

export const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDomain, setActiveDomain] = useState('All');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/members');
        if (!response.ok) throw new Error('Failed to fetch members');
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error("Using fallback members dataset:", err);
        setMembers([
          // Executive Leadership
          { _id: '1', name: 'Asmit Maity', role: 'Chairperson', department: 'Management', domain: 'Executive', isExecutive: true },
          { _id: '2', name: 'Kousani Banerjee', role: 'Vice-Chairperson', department: 'Management', domain: 'Executive', isExecutive: true },
          { _id: '3', name: 'Sougata Pal', role: 'Secretary', department: 'Management', domain: 'Executive', isExecutive: true },
          { _id: '4', name: 'Rishabh Raj', role: 'Joint Secretary', department: 'Operations', domain: 'Executive', isExecutive: true },
          { _id: '5', name: 'Abhinav Maiti', role: 'Lead Treasurer', department: 'Finance', domain: 'Executive', isExecutive: true },
          { _id: '6', name: 'Suman Kalyan Jana', role: 'Teacher Lead', department: 'Education', domain: 'Teacher', isExecutive: true },
          
          // Domain Team Members
          { _id: '7', name: 'Rohan Sharma', role: 'Lead Developer', department: 'CSE', domain: 'Web Developer' },
          { _id: '8', name: 'Sneha Roy', role: 'Ui/UX Designer', department: 'IT', domain: 'Graphic Designer' },
          { _id: '9', name: 'Amit Kumar', role: 'Event Manager', department: 'ECE', domain: 'Volunteer' },
          { _id: '10', name: 'Priya Sengupta', role: 'Evening Class Instructor', department: 'CHE', domain: 'Teacher' },
          { _id: '11', name: 'Vikram Singh', role: 'Media Head', department: 'EE', domain: 'Video Editor' },
          { _id: '12', name: 'Ananya Paul', role: 'PR & Outreach Lead', department: 'CSE', domain: 'PR' },
          { _id: '13', name: 'Tanmay Bannerjee', role: 'Chief Photographer', department: 'ME', domain: 'Photography' },
          { _id: '14', name: 'Debolina Dutta', role: 'Content Writer', department: 'IT', domain: 'Content Writer' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const domains = [
    'All',
    'Teacher',
    'Volunteer',
    'Web Developer',
    'Graphic Designer',
    'Video Editor',
    'Content Writer',
    'PR',
    'Photography'
  ];

  const executiveTeam = members.filter((m) => m.isExecutive);
  const filteredMembers = members.filter((m) => {
    if (activeDomain === 'All') return true;
    return m.domain === activeDomain;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="py-16 bg-gradient-to-b from-blue-950/70 via-slate-900 to-slate-950 border-b border-slate-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Dedicated Student Volunteers
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Our Team & Members</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Meet the driven student leaders and volunteers of Haldia Institute of Technology who power Eklavya every single day.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
        {/* Executive Leadership Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="text-cyan-400" size={22} />
            <h2 className="text-2xl font-bold text-white">Executive Leadership</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {executiveTeam.map((exec) => (
              <div
                key={exec._id}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 text-center space-y-4 shadow-xl transition-all hover:-translate-y-1"
              >
                <ImageWithFallback
                  src={exec.imageUrl}
                  alt={exec.name}
                  fallbackType="avatar"
                  initials={exec.name}
                  className="w-20 h-20 rounded-full mx-auto border-2 border-cyan-500/40 shadow-inner"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{exec.name}</h3>
                  <p className="text-xs font-semibold text-cyan-400 mt-0.5">{exec.role}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{exec.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Filtering & Team Members */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Users className="text-blue-400" size={22} />
              <h2 className="text-2xl font-bold text-white">All Team Members</h2>
            </div>

            {/* Domain Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setActiveDomain(domain)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeDomain === domain
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-slate-400">Loading team members...</div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-16 text-slate-400">No members found in this domain.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 hover:-translate-y-1 transition-all shadow-md flex flex-col items-center text-center"
                >
                  <ImageWithFallback
                    src={member.imageUrl}
                    alt={member.name}
                    fallbackType="avatar"
                    initials={member.name}
                    className="w-16 h-16 rounded-full border border-slate-700"
                  />
                  <div className="space-y-1 w-full">
                    <h3 className="text-base font-bold text-white truncate">{member.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{member.role}</p>
                    <p className="text-[11px] text-slate-500">{member.department}</p>
                  </div>
                  {member.domain && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-full">
                      <Tag size={10} />
                      {member.domain}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
