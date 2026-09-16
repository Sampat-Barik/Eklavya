import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md py-12">
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e9d5ff] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            <Sparkles size={14} className="text-purple-700" />
            <span>PORTAL ACCESS</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950">Member Login</h1>
          <p className="text-xs font-medium text-slate-600">Access member tools & admin control dashboard</p>
        </div>

        {error && (
          <div className="bg-[#fecdd3] border-2 border-slate-950 p-3 rounded-xl text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. admin@eklavya.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-950 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#bfdbfe] hover:bg-[#93c5fd] border-2 border-slate-950 text-slate-950 font-black text-xs rounded-xl shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all"
          >
            <LogIn size={16} />
            <span>{loading ? 'Authenticating...' : 'Login to Account'}</span>
          </button>
        </form>

        {/* Demo Helper */}
        <div className="bg-[#fef08a] border-2 border-slate-950 p-3 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] text-[11px] font-bold text-slate-900 text-center space-y-1">
          <span className="block font-black text-slate-950 uppercase">Demo Admin Login</span>
          <div>Email: <span className="font-mono">admin@eklavya.org</span></div>
          <div>Password: <span className="font-mono">admin123</span></div>
        </div>

        <div className="text-center text-xs font-bold text-slate-700 pt-2 border-t-2 border-slate-950">
          Not registered yet?{' '}
          <Link to="/register" className="text-blue-700 underline font-black">
            Join Eklavya
          </Link>
        </div>
      </div>
    </div>
  );
};
