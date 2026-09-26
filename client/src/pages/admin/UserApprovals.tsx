import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, CheckCircle2, XCircle, Clock, User, Mail } from 'lucide-react';
import type { UserRole } from '../../types/auth';

export const UserApprovals: React.FC = () => {
  const { allUsers, handleAdminRequest } = useAuth();
  const [selectedRoleMap, setSelectedRoleMap] = useState<Record<string, UserRole>>({});

  const requests = allUsers.filter((u) => u.adminRequest?.requested);

  const pendingRequests = requests.filter((u) => u.adminRequest?.status === 'pending');
  const pastRequests = requests.filter((u) => u.adminRequest?.status !== 'pending');

  const handleRoleChange = (userId: string, role: UserRole) => {
    setSelectedRoleMap((prev) => ({ ...prev, [userId]: role }));
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black text-slate-900">User Approvals & Admin Requests</h1>
            <p className="text-xs text-slate-500">
              Only Super Admins can review, approve, or reject administrative role elevation requests.
            </p>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            <span>Pending Elevation Requests</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-black">
              {pendingRequests.length}
            </span>
          </h2>
        </div>

        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.map((reqUser) => {
              const assignedRole = selectedRoleMap[reqUser.id] || reqUser.adminRequest?.requestedRole || 'events_manager';
              return (
                <div
                  key={reqUser.id}
                  className="editorial-card p-6 border-amber-200/90 bg-gradient-to-r from-white to-amber-50/20 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-900 border border-teal-200/80 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                        {reqUser.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900">{reqUser.name}</h3>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                            {reqUser.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <Mail size={12} />
                          <span>{reqUser.email}</span>
                          {reqUser.department && <span>• {reqUser.department} ({reqUser.batch})</span>}
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium">
                      Requested: {new Date(reqUser.adminRequest?.requestedAt || '').toLocaleDateString()}
                    </span>
                  </div>

                  {/* Reason Callout */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 font-normal leading-relaxed">
                    <strong>Reason for access:</strong> "{reqUser.adminRequest?.reason}"
                  </div>

                  {/* Actions & Role Assignment */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-700">Assign Role:</label>
                      <select
                        value={assignedRole}
                        onChange={(e) => handleRoleChange(reqUser.id, e.target.value as UserRole)}
                        className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                      >
                        <option value="events_manager">events_manager</option>
                        <option value="content_manager">content_manager</option>
                        <option value="team_manager">team_manager</option>
                        <option value="education_manager">education_manager</option>
                        <option value="communications_manager">communications_manager</option>
                        <option value="finance_manager">finance_manager</option>
                        <option value="admin">admin</option>
                        <option value="super_admin">super_admin</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleAdminRequest(reqUser.id, 'approve', assignedRole)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <CheckCircle2 size={14} />
                        <span>Approve Request</span>
                      </button>

                      <button
                        onClick={() => handleAdminRequest(reqUser.id, 'reject')}
                        className="px-3 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle size={14} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2">
            <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">All caught up!</h4>
            <p className="text-xs text-slate-400">No pending administrative elevation requests.</p>
          </div>
        )}
      </div>

      {/* Historical Processed Requests */}
      {pastRequests.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <h2 className="text-base font-bold text-slate-900">Historical Decisions</h2>
          <div className="space-y-2">
            {pastRequests.map((past) => (
              <div
                key={past.id}
                className="bg-white border border-slate-200/90 rounded-xl p-4 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <User size={15} className="text-slate-400" />
                  <span className="font-bold text-slate-900">{past.name}</span>
                  <span className="text-slate-500">({past.email})</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-600">Current Role: {past.role}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black ${
                      past.adminRequest?.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {past.adminRequest?.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
