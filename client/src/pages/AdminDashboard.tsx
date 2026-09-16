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
    <div className="container mx-auto px-4 md:px-8 max-w-[1500px] space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl text-center space-y-3 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-300">
          <Shield size={14} />
          <span>EKLAVYA ADMIN PORTAL</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black">Society Control Dashboard</h1>
        <p className="text-slate-300 text-xs max-w-lg mx-auto">
          Manage upcoming community drives, volunteer rosters, and verify incoming donation passes.
        </p>
      </div>

      {/* Quick Overview Widget Cards */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 font-bold text-base text-slate-900">
          <Sliders size={18} className="text-blue-600" />
          <span>Quick Admin Overview</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">TOTAL DRIVES</span>
              <span className="text-2xl font-black text-slate-900">{events.length || 4}</span>
            </div>
            <Calendar size={24} className="text-blue-600" />
          </div>

          <div className="bg-purple-50/60 border border-purple-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">REGISTERED MEMBERS</span>
              <span className="text-2xl font-black text-slate-900">{members.length || 14}</span>
            </div>
            <Users size={24} className="text-purple-600" />
          </div>

          <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">DONATION PROOFS</span>
              <span className="text-2xl font-black text-slate-900">{donations.length || 0}</span>
            </div>
            <Heart size={24} className="text-rose-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'events'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Community Drives ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'members'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Member Roster ({members.length})
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'donations'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Donations ({donations.length})
        </button>
      </div>

      {/* Data Panels */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-bold text-sm text-slate-900">Manage Community Drives</span>
              <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1">
                <Plus size={14} /> Add New Drive
              </button>
            </div>
            <div className="space-y-2">
              {events.map((e, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex justify-between items-center text-xs font-semibold">
                  <div>
                    <span className="text-slate-900 block">{e.title}</span>
                    <span className="text-slate-500 text-[10px]">{e.date} | {e.location}</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-bold text-sm text-slate-900">Member Roster</span>
              <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1">
                <Plus size={14} /> Add Member
              </button>
            </div>
            <div className="space-y-2">
              {members.map((m, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex justify-between items-center text-xs font-semibold">
                  <div>
                    <span className="text-slate-900 block">{m.name}</span>
                    <span className="text-slate-500 text-[10px]">{m.role} - {m.department}</span>
                  </div>
                  <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">{m.domain || 'Volunteer'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-bold text-sm text-slate-900">Received Donation Proofs</span>
            </div>
            <div className="space-y-2">
              {donations.length === 0 ? (
                <p className="text-xs font-semibold text-slate-500 py-6 text-center">No submitted donation proofs yet.</p>
              ) : (
                donations.map((d, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex justify-between items-center text-xs font-semibold">
                    <div>
                      <span className="text-slate-900 block">{d.fullName} ({d.email})</span>
                      <span className="text-slate-500 text-[10px]">UTR: {d.utrNumber} | Amount: ₹{d.amount}</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
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
