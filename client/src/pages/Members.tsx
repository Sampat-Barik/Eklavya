import React, { useState } from 'react';
import { Users, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface LeadMember {
  id: string;
  name: string;
  role: string;
  linkedin?: string;
  imageUrl?: string;
  department?: string;
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

  const executiveLeaders: LeadMember[] = [
    { id: '1', name: 'Asmit Maity', role: 'Chairperson', department: 'Executive Directorate', linkedin: 'https://linkedin.com' },
    { id: '2', name: 'Kousani Banerjee', role: 'Vice-Chairperson', department: 'Executive Directorate', linkedin: 'https://linkedin.com' },
  ];

  const domainHeads: LeadMember[] = [
    { id: '3', name: 'Sougata Pal', role: 'Secretary', department: 'Secretariat' },
    { id: '4', name: 'Rishabh Raj', role: 'Joint Secretary', department: 'Secretariat' },
    { id: '5', name: 'Abhinav Maiti', role: 'Treasurer', department: 'Finance & Treasury' },
    { id: '6', name: 'Suman Kalyan Jana', role: 'Teacher Lead', department: 'Education Wing' },
    { id: '7', name: 'Debalina Jana', role: 'Teacher Head', department: 'Education Wing' },
    { id: '8', name: 'Gunjan Kumar', role: 'Volunteer Head', department: 'Ground Operations' },
    { id: '9', name: 'Rishikesh Banerjee', role: 'Volunteer Head', department: 'Ground Operations' },
    { id: '10', name: 'Priyanshu Singha Roy', role: 'Web Development Lead', department: 'Tech & Platform' },
    { id: '11', name: 'Sagnik Mondal', role: 'Web Development Lead', department: 'Tech & Platform' },
    { id: '12', name: 'Ujani Saha Choudhury', role: 'PR & Social Media Head', department: 'Public Relations' },
    { id: '13', name: 'Soumyajit Paul', role: 'Graphic Designer Lead', department: 'Creative & Media' },
    { id: '14', name: 'Raushan kumar', role: 'Photography Head', department: 'Media Documentation' },
    { id: '15', name: 'Divya Kumari', role: 'Content Head', department: 'Editorial & Content' }
  ];

  const teamMembers: TeamMember[] = [
    { id: 't1', name: 'Anish Kumar', role: 'Evening Class Instructor', domain: 'Teacher', department: 'CSE' },
    { id: 't2', name: 'Priya Sengupta', role: 'Science & Math Instructor', domain: 'Teacher', department: 'IT' },
    { id: 't3', name: 'Rohan Sharma', role: 'Primary Language Tutor', domain: 'Teacher', department: 'ECE' },
    { id: 't4', name: 'Sneha Roy', role: 'Elementary Instructor', domain: 'Teacher', department: 'CHE' },
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
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-[#E5E0D8] pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold">
              <Users size={14} className="text-[#C25E38]" />
              <span>Active Volunteer Cadre • HIT Haldia</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C2826] leading-[1.08]">
              The Student Force <br className="hidden sm:inline" />
              Driving Grassroots Impact.
            </h1>
            <p className="text-[#1C2826]/70 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Every initiative at Eklavya is planned, staffed, and executed by undergraduate engineering students who dedicate their evenings to public service, community teaching, and animal rescue.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>EXECUTIVE LEADS</span>
                <span className="font-bold text-[#1C2826]">15 OFFICERS</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>FIELD VOLUNTEERS</span>
                <span className="font-bold text-[#1C2826]">35+ CADRE</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2826]/60">
                <span>SELECTION</span>
                <span className="font-bold text-[#C25E38]">ANNUAL AUDITION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tier 1: Executive Directorate Spotlight (2 cols) */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold block">
            Executive Leadership
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2826]">
            Chairperson & Vice-Chairperson
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {executiveLeaders.map((exec) => (
            <div
              key={exec.id}
              className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs"
            >
              <ImageWithFallback
                src={exec.imageUrl}
                alt={exec.name}
                fallbackType="avatar"
                initials={exec.name}
                className="w-24 h-24 rounded-xl border border-[#E5E0D8] object-cover shrink-0 shadow-2xs"
              />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider bg-[#1C2826] text-[#FAF8F5] px-2.5 py-0.5 rounded font-bold inline-block">
                  {exec.role}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C2826]">
                  {exec.name}
                </h3>
                <p className="text-xs text-[#1C2826]/70 font-medium">
                  {exec.department} • Haldia Institute of Technology
                </p>
                <div className="pt-2">
                  <a
                    href={exec.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#1C2826] hover:text-[#C25E38] transition-colors"
                  >
                    <span>LINKEDIN PROFILE</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tier 2: Domain Heads & Executive Officers */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold block">
            Departmental Heads
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2826]">
            Domain Leaders & Officers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domainHeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-5 space-y-3 shadow-2xs flex flex-col justify-between hover:border-[#C25E38]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={lead.imageUrl}
                  alt={lead.name}
                  fallbackType="avatar"
                  initials={lead.name}
                  className="w-12 h-12 rounded-lg border border-[#E5E0D8] object-cover shrink-0"
                />
                <div className="truncate">
                  <h4 className="font-serif text-base font-normal text-[#1C2826] truncate">{lead.name}</h4>
                  <span className="font-mono text-[10px] text-[#C25E38] font-bold uppercase block truncate">
                    {lead.role}
                  </span>
                </div>
              </div>
              <div className="border-t border-[#E5E0D8] pt-2.5 flex items-center justify-between text-[11px] text-[#1C2826]/60 font-mono">
                <span>{lead.department}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tier 3: Active Squad & Domain Filter Tabs */}
      <div className="space-y-6 border-t border-[#E5E0D8] pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C25E38] font-bold block">
              Field Operations Squad
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2826]">
              Active Volunteers by Specialization
            </h2>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#E5E0D8]/40 border border-[#E5E0D8] rounded-xl">
            {domainTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveDomain(tab.label)}
                className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer ${
                  activeDomain === tab.label
                    ? 'bg-[#1C2826] text-[#FAF8F5]'
                    : 'text-[#1C2826]/70 hover:text-[#1C2826]'
                }`}
              >
                {tab.label} <span className="opacity-60 text-[10px]">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white/85 backdrop-blur-md border border-[#E5E0D8] rounded-xl p-4 space-y-3 shadow-2xs hover:border-[#C25E38]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  alt={member.name}
                  fallbackType="avatar"
                  initials={member.name}
                  className="w-10 h-10 rounded-lg border border-[#E5E0D8] object-cover shrink-0"
                />
                <div className="truncate">
                  <h4 className="font-serif text-sm font-normal text-[#1C2826] truncate">{member.name}</h4>
                  <span className="text-xs text-[#1C2826]/60 font-normal block truncate">{member.role}</span>
                </div>
              </div>

              <div className="border-t border-[#E5E0D8] pt-2 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#1C2826]/60">DEPT: {member.department}</span>
                <span className="px-2 py-0.5 rounded bg-[#FAF8F5] text-[#1C2826] border border-[#E5E0D8] font-bold">
                  {member.domain}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
