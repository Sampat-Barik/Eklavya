import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, User, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AccessDenied: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="editorial-card p-8 sm:p-12 max-w-lg w-full text-center space-y-6 shadow-xl border-rose-200/80 bg-gradient-to-b from-white to-rose-50/20">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/10">
          <ShieldAlert size={36} />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            403 • Access Restricted
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
            Access Denied
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            You do not have permission to view this administrative module or resource. This page is restricted to authorized personnel with assigned operational roles.
          </p>
        </div>

        {user && (
          <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
            <span className="font-medium">Signed in as:</span>
            <span className="font-bold text-slate-900">{user.email}</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 uppercase">
              {user.role}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>

          {user && (
            <Link
              to="/profile"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <User size={14} />
              <span>My Member Profile</span>
            </Link>
          )}

          <Link
            to="/"
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Home size={14} />
            <span>Public Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
