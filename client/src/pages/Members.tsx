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
        setMembers([
          { _id: '1', name: 'Asmit Maity', role: 'Chairperson', department: 'Management', domain: 'Executive', isExecutive: true },
          { _id: '2', name: 'Kousani Banerjee', role: 'Vice-Chairperson', department: 'Management', domain: 'Executive', isExecutive: true },
          { _id: '3', name: 'Sougata Pal', role: 'Secretary', department: 'Management', domain: 'Executive', isExecutive: true },
          { _id: '4', name: 'Rishabh Raj', role: 'Joint Secretary', department: 'Operations', domain: 'Executive', isExecutive: true },
          { _id: '5', name: 'Abhinav Maiti', role: 'Lead Treasurer', department: 'Finance', domain: 'Executive', isExecutive: true },
          { _id: '6', name: 'Suman Kalyan Jana', role: 'Teacher Lead', department: 'Education', domain: 'Teacher', isExecutive: true },
          
          { _id: '7', name: 'Rohan Sharma', role: 'Lead Developer', department: 'CSE', domain: 'Web Developer' },
          { _id: '8', name: 'Sneha Roy', role: 'UI/UX Designer', department: 'IT', domain: 'Graphic Designer' },
          { _id: '9', name: 'Amit Kumar', role: 'Event Manager', department: 'ECE', domain: 'Volunteer' },
          { _id: '10', name: 'Priya Sengupta', role: 'Evening Class Instructor', department: 'CHE', domain: 'Teacher' },
          { _id: '11', name: 'Vikram Singh', role: 'Media Head', department: 'EE', domain: 'Video Editor' },
          { _id: '12', name: 'Ananya Paul', role: 'PR Lead', department: 'CSE', domain: 'PR' }
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
    'PR'
  ];

  const executiveTeam = members.filter((m) => m.isExecutive);
  const filteredMembers = members.filter((m) => {
    if (activeDomain === 'All') return true;
    return m.domain === activeDomain;
  });

  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#fef08a] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Sparkles size={14} />
          <span>DEDICATED VOLUNTEERS</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-950">Our Team & Members</h1>
        <p className="text-slate-700 text-xs font-medium max-w-lg mx-auto">
          Meet the driven student leaders and volunteers of Haldia Institute of Technology who power Eklavya every single day.
        </p>
      </div>

      {/* Executive Leadership Section */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-950 pb-3 font-black text-lg text-slate-950">
          <ShieldCheck size={20} className="text-blue-600" />
          <span>Executive Leadership</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {executiveTeam.map((exec) => (
            <div
              key={exec._id}
              className="bg-[#e0f2fe] border-2 border-slate-950 rounded-2xl p-5 text-center space-y-3 shadow-[3px_3px_0px_0px_#0f172a]"
            >
              <ImageWithFallback
                src={exec.imageUrl}
                alt={exec.name}
                fallbackType="avatar"
                initials={exec.name}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <div>
                <h3 className="text-base font-black text-slate-950">{exec.name}</h3>
                <span className="text-[11px] font-black uppercase text-blue-700 bg-white border border-slate-950 px-2 py-0.5 rounded-full inline-block mt-1">
                  {exec.role}
                </span>
                <p className="text-[10px] font-bold text-slate-600 mt-1">{exec.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Filtering (Matching Screenshot Location Filters) */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-slate-950 pb-4">
          <div className="flex items-center gap-2 font-black text-lg text-slate-950">
            <Users size={20} className="text-purple-700" />
            <span>All Team Members</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all border-2 border-slate-950 ${
                  activeDomain === domain
                    ? 'bg-[#0f172a] text-white shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'bg-white text-slate-950 hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a]'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-600 font-bold">Loading members...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member._id}
                className="bg-white border-2 border-slate-950 rounded-2xl p-4 space-y-3 shadow-[3px_3px_0px_0px_#0f172a] text-center flex flex-col items-center justify-between"
              >
                <ImageWithFallback
                  src={member.imageUrl}
                  alt={member.name}
                  fallbackType="avatar"
                  initials={member.name}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-black text-slate-950">{member.name}</h3>
                  <p className="text-[11px] font-bold text-slate-700">{member.role}</p>
                  <p className="text-[10px] font-medium text-slate-500">{member.department}</p>
                </div>
                {member.domain && (
                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#fef08a] border border-slate-950 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
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
  );
};
