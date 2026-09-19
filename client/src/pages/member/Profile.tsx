import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  Calendar,
  Phone,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Trash2,
  Camera
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile, requestAdminAccess } = useAuth();

  const [displayName, setDisplayName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [batch, setBatch] = useState(user?.batch || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Admin Request Modal / State
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestReason, setRequestReason] = useState('');
  const [requestMsg, setRequestMsg] = useState<{ success: boolean; message: string } | null>(null);

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name: displayName,
      department,
      batch,
      phone: phoneNumber
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSendAdminRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestReason.trim()) return;
    const res = await requestAdminAccess(requestReason, 'events_manager');
    setRequestMsg(res);
    setIsRequesting(false);
  };

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

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-12">
      {/* 1. Profile Header with Avatar & Identity */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar frame */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-slate-200 bg-white shadow-md flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={56} className="text-slate-400" />
              )}
            </div>
            <button
              onClick={() => alert('Photo upload simulation: Selected profile picture updated.')}
              className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform hover:scale-105"
              title="Upload photo"
            >
              <Camera size={14} />
            </button>
          </div>

          {/* Name & Badge */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
                {user.name}
              </h1>
              <span className="px-3 py-0.5 rounded-full bg-slate-900 text-white text-xs font-bold capitalize">
                {user.role === 'registered_user' ? 'Member' : user.role.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
              <Mail size={13} className="text-slate-400 shrink-0" />
              <span>{user.email}</span>
              <span className="text-[10px] text-slate-400 italic">(Not editable)</span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => alert('Photo upload dialog: Clicked Upload Photo')}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
          >
            Upload Photo
          </button>
        </div>
      </div>

      {/* 2. Personal Information & Sidebar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Personal Information Form */}
        <div className="lg:col-span-7 editorial-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-serif font-bold text-slate-900">Personal Information</h2>
            <p className="text-xs text-slate-500">Update your personal details below.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {savedSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Profile details saved successfully.</span>
              </div>
            )}

            {/* Display Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Display Name</label>
              <div className="relative">
                <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Department & Batch Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Department</label>
                <div className="relative">
                  <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Batch / Year</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. 2026"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Phone Number</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Become an Admin Card & Account Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Become an Admin Card */}
          <div className="editorial-card p-6 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 space-y-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldAlert size={18} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Become an Admin</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Request admin access to manage Eklavya's events, drives, and content. Requests are reviewed by the Super Admin.
                </p>
              </div>
            </div>

            {user.adminRequest?.requested ? (
              <div className="p-3.5 rounded-xl bg-white border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Clock size={14} className="text-amber-500" />
                  <span>Request Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-black ${
                      user.adminRequest.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : user.adminRequest.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {user.adminRequest.status}
                  </span>
                </div>
                {user.adminRequest.reason && (
                  <p className="text-[11px] text-slate-600 italic">"{user.adminRequest.reason}"</p>
                )}
                <p className="text-[10px] text-slate-400">
                  Submitted on {new Date(user.adminRequest.requestedAt || '').toLocaleDateString()}
                </p>
              </div>
            ) : isRequesting ? (
              <form onSubmit={handleSendAdminRequest} className="space-y-3 pt-2">
                <textarea
                  required
                  rows={3}
                  placeholder="Explain why you need administrative access (e.g., event organizer, communications lead)..."
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRequesting(false)}
                    className="py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsRequesting(true)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
              >
                Send Admin Request
              </button>
            )}

            {requestMsg && (
              <p className="text-xs text-emerald-700 font-semibold">{requestMsg.message}</p>
            )}
          </div>

          {/* Account Info Card */}
          <div className="editorial-card p-6 space-y-4">
            <h3 className="text-sm font-serif font-bold text-slate-900">Account Info</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Joined Date</span>
                <span className="font-bold text-slate-900">{user.joinedDate || '9/17/2026'}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Role Level</span>
                <span className="font-bold text-blue-600">{user.role}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => alert('Account deletion is disabled in demo mode.')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 size={13} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. My Certificates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-blue-600" />
            <h2 className="font-serif text-2xl font-bold text-slate-900">My Certificates</h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {user.certificates?.length || 0} Earned
          </span>
        </div>

        {user.certificates && user.certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.certificates.map((cert) => (
              <div
                key={cert.id}
                className="editorial-card p-6 border-amber-200 bg-gradient-to-br from-white to-amber-50/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="editorial-badge-amber text-[10px]">{cert.category}</span>
                  <ShieldCheck size={16} className="text-emerald-600" />
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900">{cert.title}</h3>
                <div className="text-[11px] text-slate-500 space-y-1">
                  <div>Issued: {cert.issuedAt}</div>
                  <div className="font-mono text-slate-400">ID: {cert.verificationCode}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 rounded-3xl border-2 border-dashed border-slate-200 text-center space-y-3 bg-white/50">
            <Award size={48} className="text-slate-300 mx-auto stroke-1" />
            <h3 className="font-serif text-lg font-bold text-slate-800">No certificates yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal leading-relaxed">
              Join our events and complete the required tasks to earn your verified Eklavya certificates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
