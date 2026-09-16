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
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="enamo-card p-8 md:p-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-900">
            <Sparkles size={14} />
            <span>MEMBER PORTAL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950">Sign In</h1>
          <p className="text-xs font-medium text-slate-500">Access your member profile and admin tools</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-950 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. admin@eklavya.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-950 focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-950 mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-950 focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-semibold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] pt-3 mt-2"
          >
            <LogIn size={16} />
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Demo Helper */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-[11px] font-medium text-slate-700 text-center space-y-1">
          <span className="block font-extrabold text-slate-950 uppercase text-[10px]">Demo Admin Credentials</span>
          <div>Email: <span className="font-mono font-bold text-slate-900">admin@eklavya.org</span></div>
          <div>Password: <span className="font-mono font-bold text-slate-900">admin123</span></div>
        </div>

        <div className="text-center text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
          Don't have an account?{' '}
          <Link to="/register" className="text-slate-950 font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
