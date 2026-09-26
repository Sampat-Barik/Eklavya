import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  Calendar,
  Phone,
  CheckCircle2,
  Camera,
  ShieldCheck,
  Send,
  AlertCircle
} from 'lucide-react';
import type { UserRole } from '../../types/auth';

const departments = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Comm. Engg.',
  'Mechanical Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Applied Electronics & Inst. Engg.',
  'Biotechnology',
  'Basic Sciences & Humanities'
];

export const PortalProfile: React.FC = () => {
  const { user, updateProfile, requestAdminAccess } = useAuth();

  const [displayName, setDisplayName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [batch, setBatch] = useState(user?.batch || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin Request Modal/Section
  const [isRequestingAdmin, setIsRequestingAdmin] = useState(false);
  const [requestReason, setRequestReason] = useState('');
  const [requestedRole, setRequestedRole] = useState<UserRole>('events_manager');
  const [requestFeedback, setRequestFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:5000/api/portal/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: displayName,
            department,
            batch,
            phone,
            avatar
          })
        });
      }
    } catch {
      // Local fallback
    }

    await updateProfile({
      name: displayName,
      department,
      batch,
      phone,
      avatar
    });

    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleSendAdminRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestReason.trim()) return;

    const res = await requestAdminAccess(requestReason, requestedRole);
    setRequestFeedback(res);
    setIsRequestingAdmin(false);
    setRequestReason('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Title */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl p-[2px] bg-gradient-to-tr from-teal-700 to-emerald-500 shadow-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5">
              <img src="/eklavya_logo.png" alt="Eklavya Member Seal" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
              My Member Profile
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your student member identity, academic department, and contact details.
            </p>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Profile Form Card */}
      <form onSubmit={handleSaveProfile} className="editorial-card p-6 sm:p-8 bg-white space-y-8">
        {/* Avatar & Read-only Account Identity */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl border-4 border-slate-100 bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-2xl overflow-hidden shadow-inner">
              {avatar ? (
                <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={40} className="text-slate-400" />
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                const url = prompt('Enter image URL or avatar link:', avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
                if (url) setAvatar(url);
              }}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform hover:scale-105"
              title="Change avatar image"
            >
              <Camera size={13} />
            </button>
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">{displayName || user.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wide">
                {user.role === 'registered_user' ? 'Member' : user.role.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 font-medium">
              <Mail size={13} className="text-slate-400" />
              <span>{user.email}</span>
              <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded">
                Verified Google ID (Non-editable)
              </span>
            </div>
          </div>
        </div>

        {/* Editable Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <UserIcon size={14} className="text-slate-400" />
              <span>Display Name</span>
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Academic Department */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <GraduationCap size={14} className="text-slate-400" />
              <span>Department</span>
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select your department...</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Batch / Graduation Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              <span>Batch / Year of Graduation</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 2026 or 2027"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone size={14} className="text-slate-400" />
              <span>Contact Phone</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
          >
            {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {/* Admin Access Request Card */}
      {user.role === 'registered_user' && (
        <div className="editorial-card p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Request Operational Admin Role</h3>
                <p className="text-xs text-slate-500">
                  Society coordinators and event leads can request administrative module access from the Super Admin.
                </p>
              </div>
            </div>

            {user.adminRequest?.requested ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>Pending Super Admin Review</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsRequestingAdmin(!isRequestingAdmin)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                {isRequestingAdmin ? 'Cancel' : 'Request Role'}
              </button>
            )}
          </div>

          {requestFeedback && (
            <div className="p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              {requestFeedback.message}
            </div>
          )}

          {isRequestingAdmin && (
            <form onSubmit={handleSendAdminRequest} className="pt-4 border-t border-slate-200/80 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Desired Role</label>
                  <select
                    value={requestedRole}
                    onChange={(e) => setRequestedRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="events_manager">Events Manager</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="team_manager">Team Manager</option>
                    <option value="education_manager">Education Manager</option>
                    <option value="finance_manager">Finance Manager</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Reason / Society Responsibilities</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Appointed as co-lead for upcoming flood relief events..."
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Send size={12} />
                <span>Submit Request for Approval</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
