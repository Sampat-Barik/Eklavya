import React, { useState, useEffect } from 'react';
import { Shield, Plus, Sliders, CheckCircle2, Heart, Users, Calendar } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'members' | 'donations'>('events');
  const [events, setEvents] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resE, resM, resD] = await Promise.all([
          fetch('http://localhost:5000/api/events').catch(() => null),
          fetch('http://localhost:5000/api/members').catch(() => null),
          fetch('http://localhost:5000/api/donations').catch(() => null)
        ]);

        if (resE && resE.ok) setEvents(await resE.json());
        if (resM && resM.ok) setMembers(await resM.json());
        if (resD && resD.ok) setDonations(await resD.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-[1500px] space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 md:p-10 shadow-[5px_5px_0px_0px_#0f172a] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#fef08a] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Shield size={14} />
          <span>EKLAVYA ADMIN PORTAL</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-950">Society Control Dashboard</h1>
        <p className="text-slate-700 text-xs font-medium max-w-lg mx-auto">
          Manage upcoming community drives, volunteer rosters, and verify incoming donation passes.
        </p>
      </div>

      {/* Quick Overview Widget Cards (Neobrutalist Style) */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 shadow-[5px_5px_0px_0px_#0f172a] space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-950 pb-2 font-black text-base text-slate-950">
          <Sliders size={18} />
          <span>Quick Admin Overview</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="bg-[#bfdbfe] border-2 border-slate-950 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-700 block">TOTAL DRIVES</span>
              <span className="text-2xl font-black text-slate-950">{events.length || 4}</span>
            </div>
            <Calendar size={24} className="text-slate-950" />
          </div>

          <div className="bg-[#e9d5ff] border-2 border-slate-950 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-700 block">REGISTERED MEMBERS</span>
              <span className="text-2xl font-black text-slate-950">{members.length || 14}</span>
            </div>
            <Users size={24} className="text-slate-950" />
          </div>

          <div className="bg-[#fbcfe8] border-2 border-slate-950 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-700 block">DONATION PROOFS</span>
              <span className="text-2xl font-black text-slate-950">{donations.length || 0}</span>
            </div>
            <Heart size={24} className="text-rose-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-black border-2 border-slate-950 transition-all ${
            activeTab === 'events'
              ? 'bg-[#0f172a] text-white shadow-[3px_3px_0px_0px_#0f172a]'
              : 'bg-white text-slate-950 hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a]'
          }`}
        >
          Community Drives ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded-xl text-xs font-black border-2 border-slate-950 transition-all ${
            activeTab === 'members'
              ? 'bg-[#0f172a] text-white shadow-[3px_3px_0px_0px_#0f172a]'
              : 'bg-white text-slate-950 hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a]'
          }`}
        >
          Member Roster ({members.length})
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`px-4 py-2 rounded-xl text-xs font-black border-2 border-slate-950 transition-all ${
            activeTab === 'donations'
              ? 'bg-[#0f172a] text-white shadow-[3px_3px_0px_0px_#0f172a]'
              : 'bg-white text-slate-950 hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a]'
          }`}
        >
          Donations ({donations.length})
        </button>
      </div>

      {/* Data Panels */}
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-950 pb-3">
              <span className="font-black text-sm text-slate-950">Manage Community Drives</span>
              <button className="px-3 py-1.5 bg-[#bfdbfe] border-2 border-slate-950 rounded-xl font-bold text-xs shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1">
                <Plus size={14} /> Add New Drive
              </button>
            </div>
            <div className="space-y-2">
              {events.map((e, idx) => (
                <div key={idx} className="bg-[#f8fafc] border-2 border-slate-950 rounded-xl p-3 flex justify-between items-center text-xs font-bold">
                  <div>
                    <span className="text-slate-950 block">{e.title}</span>
                    <span className="text-slate-500 text-[10px]">{e.date} | {e.location}</span>
                  </div>
                  <span className="bg-[#a7f3d0] border border-slate-950 px-2 py-0.5 rounded-md text-[10px] font-black">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-950 pb-3">
              <span className="font-black text-sm text-slate-950">Member Roster</span>
              <button className="px-3 py-1.5 bg-[#fef08a] border-2 border-slate-950 rounded-xl font-bold text-xs shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1">
                <Plus size={14} /> Add Member
              </button>
            </div>
            <div className="space-y-2">
              {members.map((m, idx) => (
                <div key={idx} className="bg-[#f8fafc] border-2 border-slate-950 rounded-xl p-3 flex justify-between items-center text-xs font-bold">
                  <div>
                    <span className="text-slate-950 block">{m.name}</span>
                    <span className="text-slate-500 text-[10px]">{m.role} - {m.department}</span>
                  </div>
                  <span className="bg-[#e9d5ff] border border-slate-950 px-2 py-0.5 rounded-md text-[10px] font-black">{m.domain || 'Volunteer'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-950 pb-3">
              <span className="font-black text-sm text-slate-950">Received Donation Proofs</span>
            </div>
            <div className="space-y-2">
              {donations.length === 0 ? (
                <p className="text-xs font-bold text-slate-500 py-6 text-center">No submitted donation proofs yet.</p>
              ) : (
                donations.map((d, idx) => (
                  <div key={idx} className="bg-[#f8fafc] border-2 border-slate-950 rounded-xl p-3 flex justify-between items-center text-xs font-bold">
                    <div>
                      <span className="text-slate-950 block">{d.fullName} ({d.email})</span>
                      <span className="text-slate-500 text-[10px]">UTR: {d.utrNumber} | Amount: ₹{d.amount}</span>
                    </div>
                    <span className="bg-[#a7f3d0] border border-slate-950 px-2 py-0.5 rounded-md text-[10px] font-black">
                      <CheckCircle2 size={12} className="inline mr-1" />
                      Verified
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
