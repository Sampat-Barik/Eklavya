import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle2, MapPin, User, Calendar } from 'lucide-react';
import type { AttendanceRecord } from '../../types/auth';

export const PortalAttendance: React.FC = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState({
    totalDrives: 3,
    totalHours: 9.5,
    verifiedRate: '100%'
  });

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/portal/my-attendance', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setAttendance(data.records || []);
            if (data.summary) setSummary(data.summary);
            return;
          }
        } catch {
          // Local fallback
        }
      }

      setAttendance([
        {
          id: 'att-1',
          userId: user?.id || 'demo-user',
          userEmail: user?.email || 'user@gmail.com',
          date: '2026-09-15',
          driveType: 'Village Education (VE)',
          location: 'Debhog Primary Center',
          hoursLogged: 3,
          mentor: 'Prof. S. Das',
          status: 'Present'
        },
        {
          id: 'att-2',
          userId: user?.id || 'demo-user',
          userEmail: user?.email || 'user@gmail.com',
          date: '2026-09-12',
          driveType: 'Animal Rescue & Vaccination',
          location: 'HIT Campus & Township',
          hoursLogged: 2.5,
          mentor: 'Ananya Roy',
          status: 'Present'
        },
        {
          id: 'att-3',
          userId: user?.id || 'demo-user',
          userEmail: user?.email || 'user@gmail.com',
          date: '2026-09-08',
          driveType: 'Community Ration Distribution',
          location: 'Durgachak Basti',
          hoursLogged: 4,
          mentor: 'Sampat Barik',
          status: 'Present'
        }
      ]);
    };

    fetchAttendance();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
          My Attendance & Volunteering Hours
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review verified on-field volunteer presence, field hours, and mentor endorsements.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="editorial-card p-5 bg-white space-y-1">
          <span className="text-xs font-bold text-slate-500">Completed Sessions</span>
          <div className="text-3xl font-serif font-black text-slate-900">{summary.totalDrives}</div>
          <span className="text-[11px] text-emerald-600 font-bold">Verified on record</span>
        </div>

        <div className="editorial-card p-5 bg-white space-y-1">
          <span className="text-xs font-bold text-slate-500">Total Volunteer Hours</span>
          <div className="text-3xl font-serif font-black text-slate-900">{summary.totalHours} hrs</div>
          <span className="text-[11px] text-blue-600 font-bold">Contributed toward society credit</span>
        </div>

        <div className="editorial-card p-5 bg-white space-y-1">
          <span className="text-xs font-bold text-slate-500">Attendance Reliability</span>
          <div className="text-3xl font-serif font-black text-slate-900">{summary.verifiedRate}</div>
          <span className="text-[11px] text-indigo-600 font-bold">Consistently present</span>
        </div>
      </div>

      {/* Attendance History Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock size={16} className="text-blue-600" />
            <span>Attendance Session Logs</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Logged by society supervisors</span>
        </div>

        {attendance.length === 0 ? (
          <div className="editorial-card p-12 text-center text-xs text-slate-500 bg-slate-50/50">
            No attendance sessions logged yet. Join an upcoming event to earn service hours!
          </div>
        ) : (
          <div className="editorial-card overflow-hidden bg-white border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Event Activity</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Hours Logged</th>
                    <th className="py-3.5 px-4">Supervisor / Mentor</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {attendance.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 text-slate-900 font-bold flex items-center gap-2 whitespace-nowrap">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 font-semibold">{record.driveType}</td>
                      <td className="py-3.5 px-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span>{record.location}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-blue-700 font-mono">
                        {record.hoursLogged} hrs
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-slate-400 shrink-0" />
                          <span>{record.mentor || 'Coordinator'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={11} />
                          <span>{record.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
