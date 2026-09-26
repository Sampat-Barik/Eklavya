import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, CheckCircle2, Download } from 'lucide-react';
import type { CertificateItem } from '../../types/auth';

export const PortalCertificates: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/portal/my-certificates', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            setCertificates(await res.json());
            return;
          }
        } catch {
          // Local fallback
        }
      }

      setCertificates([
        {
          id: 'cert-1',
          title: 'Flood Relief Volunteer Commendation 2026',
          issuedAt: 'August 2026',
          category: 'Relief Event',
          hours: 24,
          verificationCode: 'EKL-2026-REL-098',
          status: 'Verified'
        },
        {
          id: 'cert-2',
          title: 'Certificate of Excellence: Rural Science Educator',
          issuedAt: 'July 2026',
          category: 'Child Education',
          hours: 36,
          verificationCode: 'EKL-2026-EDU-045',
          status: 'Verified'
        }
      ]);
    };

    fetchCertificates();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
          My Verified Certificates
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Digital volunteer commendations awarded for community engagement, animal rescues, and child mentorship.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="editorial-card p-12 text-center space-y-3 bg-slate-50/50 max-w-lg mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Award size={24} />
          </div>
          <h3 className="font-bold text-sm text-slate-900">No Certificates Earned Yet</h3>
          <p className="text-xs text-slate-500">
            Certificates are issued by the society after completing minimum service hours in certified events.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="editorial-card p-6 bg-gradient-to-br from-white to-amber-50/20 border-amber-200/80 hover:border-amber-300 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wide">
                    {cert.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 size={12} />
                    <span>Verified Credential</span>
                  </span>
                </div>

                <h3 className="font-serif font-black text-base text-slate-900 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-500">
                  Issued to <strong className="text-slate-800">{user?.name}</strong> for dedicated service in {cert.issuedAt}.
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Credential ID:</span>
                  <span className="font-mono font-bold text-slate-800">{cert.verificationCode}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Award size={13} />
                    <span>View Digital Certificate</span>
                  </button>

                  <button
                    onClick={() => alert(`Downloading PDF certificate for ${cert.title}...`)}
                    className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Download PDF"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="editorial-card max-w-xl w-full bg-white p-6 sm:p-8 space-y-6 shadow-2xl border-amber-300">
            <div className="border-4 border-double border-amber-200 p-6 rounded-2xl bg-amber-50/30 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  Eklavya Society • HIT Haldia
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
                  Certificate of Appreciation
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                This certifies that <strong className="text-slate-900 font-bold">{user?.name}</strong> has demonstrated exemplary commitment to community service for <strong className="text-slate-900">{selectedCert.title}</strong>.
              </p>
              <div className="flex items-center justify-center gap-6 pt-3 text-xs text-slate-500 font-mono">
                <div>Issued: {selectedCert.issuedAt}</div>
                <div>Code: {selectedCert.verificationCode}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Generating printable verified PDF...');
                  setSelectedCert(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Download Print PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
