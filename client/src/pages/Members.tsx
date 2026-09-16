import React, { useState } from 'react';
import { Users, Sparkles, ShieldCheck, Tag } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface LeadMember {
  id: string;
  name: string;
  role: string;
  linkedin?: string;
  imageUrl?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  department: string;
}

export const Members: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState('All Domains');

  const leads: LeadMember[] = [
    { id: '1', name: 'Asmit Maity', role: 'Chairperson', linkedin: 'https://linkedin.com' },
    { id: '2', name: 'Kousani Banerjee', role: 'Vice-Chairperson', linkedin: 'https://linkedin.com' },
    { id: '3', name: 'Sougata Pal', role: 'Secretary', linkedin: 'https://linkedin.com' },
    { id: '4', name: 'Rishabh Raj', role: 'Joint Secretary', linkedin: 'https://linkedin.com' },
    { id: '5', name: 'Abhinav Maiti', role: 'Treasurer', linkedin: 'https://linkedin.com' },
    { id: '6', name: 'Suman Kalyan Jana', role: 'Teacher Lead', linkedin: 'https://linkedin.com' },
    { id: '7', name: 'Debalina Jana', role: 'Teacher Head', linkedin: 'https://linkedin.com' },
    { id: '8', name: 'Gunjan Kumar', role: 'Volunteer Head', linkedin: 'https://linkedin.com' },
    { id: '9', name: 'Rishikesh Banerjee', role: 'Volunteer Head', linkedin: 'https://linkedin.com' },
    { id: '10', name: 'Priyanshu Singha Roy', role: 'Web Development Lead', linkedin: 'https://linkedin.com' },
    { id: '11', name: 'Sagnik Mondal', role: 'Web Development Lead', linkedin: 'https://linkedin.com' },
    { id: '12', name: 'Ujani Saha Choudhury', role: 'PR & Social Media Head', linkedin: 'https://linkedin.com' },
    { id: '13', name: 'Soumyajit Paul', role: 'Graphic Designer Lead', linkedin: 'https://linkedin.com' },
    { id: '14', name: 'Raushan kumar', role: 'Photography Head', linkedin: 'https://linkedin.com' },
    { id: '15', name: 'Divya Kumari', role: 'Content Head', linkedin: 'https://linkedin.com' }
  ];

  const teamMembers: TeamMember[] = [
    { id: 't1', name: 'Anish Kumar', role: 'Instructor', domain: 'Teacher', department: 'CSE' },
    { id: 't2', name: 'Priya Sengupta', role: 'Instructor', domain: 'Teacher', department: 'IT' },
    { id: 't3', name: 'Rohan Sharma', role: 'Evening Class Instructor', domain: 'Teacher', department: 'ECE' },
    { id: 't4', name: 'Sneha Roy', role: 'Subject Instructor', domain: 'Teacher', department: 'CHE' },
    { id: 't5', name: 'Amit Banerjee', role: 'Activity Teacher', domain: 'Teacher', department: 'EE' },
    { id: 't6', name: 'Sujata Paul', role: 'Primary Instructor', domain: 'Teacher', department: 'ME' },

    { id: 'v1', name: 'Rishav Roy', role: 'Field Volunteer', domain: 'Volunteer', department: 'CSE' },
    { id: 'v2', name: 'Debjyoti Sen', role: 'Event Coordinator', domain: 'Volunteer', department: 'IT' },
    { id: 'v3', name: 'Aakash Verma', role: 'Animal Rescue Volunteer', domain: 'Volunteer', department: 'ECE' },
    { id: 'v4', name: 'Pooja Das', role: 'Relief Drive Volunteer', domain: 'Volunteer', department: 'CHE' },
    { id: 'v5', name: 'Vikas Kumar', role: 'Campus Volunteer', domain: 'Volunteer', department: 'EE' },

    { id: 'w1', name: 'Soham Mukherjee', role: 'Frontend Developer', domain: 'Web Developer', department: 'CSE' },
    { id: 'w2', name: 'Arpan Maiti', role: 'Full Stack Contributor', domain: 'Web Developer', department: 'IT' },

    { id: 'g1', name: 'Subhadip Ghosh', role: 'Banner & Poster Designer', domain: 'Graphic Designer', department: 'CSE' },

    { id: 've1', name: 'Vikram Singh', role: 'Video Editor', domain: 'Video Editor', department: 'EE' },
    { id: 've2', name: 'Sayantan Das', role: 'Reels Editor', domain: 'Video Editor', department: 'ECE' },

    { id: 'p1', name: 'Tanmay Bannerjee', role: 'Event Photographer', domain: 'Photography', department: 'ME' },

    { id: 'c1', name: 'Debolina Dutta', role: 'Social Media Writer', domain: 'Content Writer', department: 'IT' },

    { id: 'pr1', name: 'Ananya Paul', role: 'Public Relations Member', domain: 'PR', department: 'CSE' },
    { id: 'pr2', name: 'Siddharth Roy', role: 'Outreach Member', domain: 'PR', department: 'ECE' }
  ];

  const domainTabs = [
    { label: 'All Domains', count: 20 },
    { label: 'Teacher', count: 6 },
    { label: 'Volunteer', count: 5 },
    { label: 'Photography', count: 1 },
    { label: 'Web Developer', count: 2 },
    { label: 'Graphic Designer', count: 1 },
    { label: 'Video Editor', count: 2 },
    { label: 'Content Writer', count: 1 },
    { label: 'PR', count: 2 }
  ];

  const filteredMembers = teamMembers.filter((m) => {
    if (activeDomain === 'All Domains') return true;
    return m.domain === activeDomain;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-8 pb-16 py-4">
      {/* Top Banner */}
      <div className="editorial-card p-8 md:p-12 text-center space-y-4 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-xl border border-blue-800/40">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full text-xs font-bold text-blue-300">
          <Sparkles size={14} />
          <span>MEET OUR TEAM</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">Our Dedicated Team</h1>
        <p className="text-slate-200 text-sm max-w-xl mx-auto font-normal leading-relaxed">
          Dedicated student volunteers working together to achieve excellence in child education and animal welfare.
        </p>
      </div>

      {/* Section 1: Executive & Sub-Leads Grid */}
      <div className="editorial-card p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-serif font-extrabold text-xl text-slate-900">
          <ShieldCheck size={22} className="text-blue-600" />
          <span>Team Leaders & Heads</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-slate-50/60 border border-slate-200/80 rounded-[20px] p-5 text-center space-y-3 hover:shadow-md transition-all flex flex-col items-center justify-between"
            >
              <ImageWithFallback
                src={lead.imageUrl}
                alt={lead.name}
                fallbackType="avatar"
                initials={lead.name}
                className="w-16 h-16 rounded-full border-2 border-slate-200 object-cover"
              />
              <div className="w-full">
                <h3 className="text-xs font-extrabold text-slate-900 truncate">{lead.name}</h3>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mt-2">
                  {lead.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Team Members & Domain Filter Tabs */}
      <div className="editorial-card p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-serif font-extrabold text-xl text-slate-900">
            <Users size={22} className="text-blue-600" />
            <span>Team Members</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {domainTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveDomain(tab.label)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeDomain === tab.label
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50/60 border border-slate-200/80 rounded-[20px] p-5 space-y-3 hover:shadow-md transition-all text-center flex flex-col items-center justify-between"
            >
              <ImageWithFallback
                alt={member.name}
                fallbackType="avatar"
                initials={member.name}
                className="w-14 h-14 rounded-full border border-slate-200 object-cover"
              />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-slate-600">{member.role}</p>
                <p className="text-[10px] font-medium text-slate-400">{member.department}</p>
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Tag size={10} />
                {member.domain}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
