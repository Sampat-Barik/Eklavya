import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_DOMAINS } from '../../types/auth';
import type { RoleLevel, ClubDomain } from '../../types/auth';
import {
  Crown,
  Shield,
  Zap,
  User,
  Globe,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { user, roleLevel, userDomain, switchDemoRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const rolesConfig: {
    level: RoleLevel;
    title: string;
    shortTitle: string;
    icon: typeof Crown;
    badgeColor: string;
    description: string;
    actions: string[];
  }[] = [
    {
      level: 1,
      title: 'Level 1: Super Admin',
      shortTitle: 'L1: Super Admin',
      icon: Crown,
      badgeColor: 'bg-amber-500/15 text-amber-700 border-amber-300',
      description: 'Complete system control. The only role with authority to assign, modify, or revoke roles.',
      actions: [
        'Assign, elevate or revoke user roles (Levels 1-5)',
        'Full website settings & global configs control',
        'Global oversight over all 8 domains and all events',
        'Audit logs inspection & security management'
      ]
    },
    {
      level: 2,
      title: 'Level 2: Admin',
      shortTitle: 'L2: Admin',
      icon: Shield,
      badgeColor: 'bg-teal-500/15 text-teal-700 border-teal-300',
      description: 'General club management. Oversees events, website content, and member onboarding.',
      actions: [
        'Create, edit, and delete club events',
        'Onboard new club members into the roster',
        'Cannot assign Admin or Super Admin roles (Restricted)',
        'Oversee general club operations & content'
      ]
    },
    {
      level: 3,
      title: 'Level 3: Domain Lead',
      shortTitle: 'L3: Domain Lead',
      icon: Zap,
      badgeColor: 'bg-indigo-500/15 text-indigo-700 border-indigo-300',
      description: 'Department-specific management across 8 designated domains.',
      actions: [
        'Create and assign tasks strictly for Level 4 members in own domain',
        'Track domain task deliverables & progress',
        'Publish internal department schedules & announcements',
        'No cross-domain management or global admin privileges'
      ]
    },
    {
      level: 4,
      title: 'Level 4: Active Club Member',
      shortTitle: 'L4: Member',
      icon: User,
      badgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-300',
      description: 'Inducted active club member with domain access, personal profile, and task execution.',
      actions: [
        'Active club member status with personalized member profile & achievements',
        'View and complete tasks assigned to them within domain',
        'View internal domain schedule, attendance & society updates',
        'Read-only for task creation (cannot assign or edit tasks)'
      ]
    },
    {
      level: 5,
      title: 'Level 5: Normal User (My Portal Access)',
      shortTitle: 'L5: Normal User',
      icon: Globe,
      badgeColor: 'bg-slate-500/15 text-slate-700 border-slate-300',
      description: 'Normal users have full access to My Portal (Profile, Attended Events, Donations, Certificates, Announcements). Cannot be active members or take domain tasks.',
      actions: [
        'Access My Portal: personal profile, events attended, donation history & announcements',
        'Download verified certificates of participation and donation aid',
        'Browse public website, register for upcoming events & submit contributions',
        'Restricted from internal domain tasks, staff rosters, and administrative consoles'
      ]
    }
  ];

  const currentRoleConfig = rolesConfig.find((r) => r.level === roleLevel) || rolesConfig[4];
  const CurrentIcon = currentRoleConfig.icon;

  const handleSelectRole = (level: RoleLevel, domain?: ClubDomain) => {
    switchDemoRole(level, domain);
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value as ClubDomain;
    switchDemoRole(roleLevel, selectedDomain);
  };

  return (
    <>
      {/* Floating Demo Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <div className="bg-slate-900/95 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 sm:p-3 text-white transition-all duration-300">
          <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
            {/* Left: Role status & selector */}
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 hidden sm:inline">
                RBAC Demo Switcher:
              </span>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${currentRoleConfig.badgeColor}`}>
                <CurrentIcon size={13} />
                <span>{currentRoleConfig.shortTitle}</span>
                {userDomain && (roleLevel === 3 || roleLevel === 4) && (
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold">
                    {OFFICIAL_DOMAINS.find((d) => d.key === userDomain)?.name || userDomain}
                  </span>
                )}
              </div>
            </div>

            {/* Middle: Quick Switch Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
              {rolesConfig.map((r) => {
                const Icon = r.icon;
                const isActive = roleLevel === r.level;
                return (
                  <button
                    key={r.level}
                    onClick={() => handleSelectRole(r.level, userDomain || 'web_development')}
                    title={r.description}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md scale-105'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <Icon size={12} />
                    <span>L{r.level}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Domain picker if L3 or L4, plus info button */}
            <div className="flex items-center gap-2">
              {(roleLevel === 3 || roleLevel === 4) && (
                <div className="flex items-center gap-1.5 bg-slate-800 rounded-lg px-2 py-1 border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Domain:</span>
                  <select
                    value={userDomain || 'web_development'}
                    onChange={handleDomainChange}
                    className="bg-transparent text-xs text-teal-300 font-bold focus:outline-none cursor-pointer"
                  >
                    {OFFICIAL_DOMAINS.map((dom) => (
                      <option key={dom.key} value={dom.key} className="bg-slate-900 text-white">
                        {dom.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={() => setShowInfoModal(true)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="View RBAC Hierarchy & Permissions Matrix"
              >
                <Info size={15} />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title={isOpen ? 'Collapse panel' : 'Expand role details'}
              >
                {isOpen ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
              </button>
            </div>
          </div>

          {/* Expanded Drawer */}
          {isOpen && (
            <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 animate-fadeIn text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Active User
                </span>
                <p className="font-bold text-teal-300">{user?.name || 'Anonymous Visitor'}</p>
                <p className="text-[11px] text-slate-400">{user?.email || 'Public Unauthenticated Session'}</p>
              </div>

              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Access Level Scope
                </span>
                <p className="text-[11px] text-slate-300 leading-snug">{currentRoleConfig.description}</p>
              </div>

              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                    Key Authority
                  </span>
                  <p className="text-[11px] text-emerald-400 font-semibold">{currentRoleConfig.actions[0]}</p>
                </div>
                <div className="mt-2 text-right">
                  <button
                    onClick={() => setShowInfoModal(true)}
                    className="text-[11px] text-teal-400 hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <span>View 5-Tier Specs</span>
                    <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5-Tier RBAC Specs Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl p-[2px] bg-gradient-to-r from-teal-700 to-emerald-500 shadow-md flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5">
                    <img src="/eklavya_logo.png" alt="Eklavya RBAC Matrix" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-black text-slate-900">
                    5-Level RBAC System Architecture
                  </h3>
                  <p className="text-xs text-slate-500">
                    Exact hierarchy, authority matrix, and domain delegation rules
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {rolesConfig.map((r) => {
                const Icon = r.icon;
                const isCurrent = roleLevel === r.level;
                return (
                  <div
                    key={r.level}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'border-teal-500 bg-teal-50/40 shadow-xs'
                        : 'border-slate-100 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 ${r.badgeColor}`}>
                          <Icon size={14} />
                          {r.title}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                            Current Active
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          handleSelectRole(r.level, userDomain || 'web_development');
                          setShowInfoModal(false);
                        }}
                        className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors ${
                          isCurrent
                            ? 'bg-teal-700 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        }`}
                      >
                        {isCurrent ? 'Selected' : 'Simulate'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{r.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                      {r.actions.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>8 Domains Included: Video Editing, Graphics Design, Teaching, Volunteering, Content Writing, Web Dev, PR, Management.</span>
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
