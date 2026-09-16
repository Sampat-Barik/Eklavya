import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Sparkles, Upload, Building, GraduationCap } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [college, setCollege] = useState('Haldia Institute of Technology');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'Computer Science & Engg.',
    'Information Technology',
    'Electronics & Comm. Engg.',
    'Chemical Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Applied Electronics & Inst. Engg.',
    'Management Studies',
    'Basic Sciences'
  ];

  return (
    <div className="container mx-auto px-4 max-w-lg py-10">
      <div className="bg-white border-[2.5px] border-slate-950 rounded-3xl p-8 shadow-[5px_5px_0px_0px_#0f172a] space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#a7f3d0] border-2 border-slate-950 rounded-full text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            <Sparkles size={14} className="text-emerald-800" />
            <span>CREATE MEMBER ACCOUNT</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950">Join Eklavya</h1>
          <p className="text-xs font-medium text-slate-600">Register as a student volunteer or contributor</p>
        </div>

        {error && (
          <div className="bg-[#fecdd3] border-2 border-slate-950 p-3 rounded-xl text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1">Profile Avatar (Optional)</label>
            <div className="relative border-2 border-slate-950 border-dashed rounded-xl p-3 bg-white shadow-[2px_2px_0px_0px_#0f172a] text-center cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload size={18} className="mx-auto text-slate-950 mb-1" />
              <span className="text-[11px] font-bold text-slate-950 block">
                {avatarFile ? avatarFile.name : 'Upload Profile Picture'}
              </span>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sourav Maity"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department Dropdown */}
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1 flex items-center gap-1">
                <GraduationCap size={12} /> Department *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border-2 border-slate-950 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* College */}
            <div>
              <label className="block text-xs font-black text-slate-950 mb-1 flex items-center gap-1">
                <Building size={12} /> College *
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-white border-2 border-slate-950 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="sourav@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-black text-slate-950 mb-1">Password *</label>
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
            className="w-full py-3 bg-[#fef08a] hover:bg-[#fde047] border-2 border-slate-950 text-slate-950 font-black text-xs rounded-xl shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all"
          >
            <UserPlus size={16} />
            <span>{loading ? 'Creating Profile...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs font-bold text-slate-700 pt-2 border-t-2 border-slate-950">
          Already registered?{' '}
          <Link to="/login" className="text-blue-700 underline font-black">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};
