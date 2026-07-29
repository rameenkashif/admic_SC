import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Building2, 
  LogIn, 
  UserPlus, 
  UsersRound, 
  TrendingUp, 
  Calendar, 
  GraduationCap, 
  User, 
  Activity, 
  Zap, 
  Waves, 
  Trophy, 
  MessageSquare, 
  Search,
  LogOut,
  ChevronDown,
  Lock,
  QrCode,
  UserCheck,
  History,
  Wallet,
  Ticket
} from 'lucide-react';
import { ScLogo } from './ScLogo';
import { NavTab, Reception } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeReception: Reception | null;
  receptions: Reception[];
  onSelectReception: (rec: Reception) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeReception,
  receptions,
  onSelectReception,
  searchQuery,
  setSearchQuery,
  onLogout,
}) => {
  const [showReceptionDropdown, setShowReceptionDropdown] = useState(false);

  const isBranchSelected = Boolean(activeReception);

  const handleTabClick = (tab: NavTab) => {
    if (!isBranchSelected && tab !== 'receptions') {
      alert("Lutemi zgjidhni së pari nëse po veproni për 'Step Sport Center' apo 'Step Sport Arena' te 'Recepsionet' për të hapur këtë faqe!");
      setActiveTab('receptions');
      return;
    }
    setActiveTab(tab);
  };

  const isNavActive = (tab: NavTab) => activeTab === tab;

  const navButtonClass = (tab: NavTab) => {
    const locked = !isBranchSelected && tab !== 'receptions';
    return `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
      locked
        ? 'opacity-50 text-slate-400 cursor-not-allowed hover:bg-transparent'
        : isNavActive(tab)
        ? 'bg-white/15 text-white border border-white/35 shadow-lg shadow-black/20 backdrop-blur-md font-bold'
        : 'text-slate-300 hover:text-white hover:bg-white/10 hover:border hover:border-white/15'
    }`;
  };

  return (
    <aside className="w-64 liquid-glass-sidebar h-screen flex flex-col shrink-0 overflow-y-auto select-none border-r border-white/15 shadow-2xl">
      {/* Brand Header */}
      <div className="p-4 border-b border-indigo-500/10">
        <ScLogo />
      </div>

      {/* Menu Search Bar */}
      <div className="p-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-indigo-300/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kërko menu..."
            className="w-full bg-slate-900/60 border border-indigo-500/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-indigo-300/40 focus:outline-none focus:border-indigo-400/50 transition"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 px-3 space-y-5 py-2 overflow-y-auto">
        {/* KRYESORE */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-indigo-400/80 tracking-wider uppercase">
            KRYESORE
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleTabClick('dashboard')}
              className={navButtonClass('dashboard')}
            >
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="w-4 h-4 text-indigo-400" />
                <span>Faqja e parë</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('receptions')}
              className={navButtonClass('receptions')}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>Recepsionet</span>
              </div>
              {!isBranchSelected && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </button>

            <button
              onClick={() => handleTabClick('entrances')}
              className={navButtonClass('entrances')}
            >
              <div className="flex items-center gap-2.5">
                <LogIn className="w-4 h-4 text-indigo-400" />
                <span>Hyrjet & Riabonimet</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('new_registration')}
              className={navButtonClass('new_registration')}
            >
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span>Regjistrimi i ri</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('employees')}
              className={navButtonClass('employees')}
            >
              <div className="flex items-center gap-2.5">
                <UsersRound className="w-4 h-4 text-indigo-400" />
                <span>Punëtorët</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('income')}
              className={navButtonClass('income')}
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Të Hyrat</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>
          </div>
        </div>

        {/* ORARET E PISHINAVE */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-indigo-400/80 tracking-wider uppercase flex items-center justify-between">
            <span>ORARET E PISHINAVE</span>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleTabClick('pool_4_lanes')}
              className={navButtonClass('pool_4_lanes')}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Pishina me 4 korsi</span>
              </div>
              {!isBranchSelected ? <Lock className="w-3 h-3 text-purple-400/70" /> : <span className="w-2 h-2 rounded-full bg-blue-500 glow-blue"></span>}
            </button>

            <button
              onClick={() => handleTabClick('pool_small')}
              className={navButtonClass('pool_small')}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Pishinat e vogla</span>
              </div>
              {!isBranchSelected ? <Lock className="w-3 h-3 text-purple-400/70" /> : <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
            </button>

            <button
              onClick={() => handleTabClick('pool_5_lanes')}
              className={navButtonClass('pool_5_lanes')}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Pishina me 5 korsi</span>
              </div>
              {!isBranchSelected ? <Lock className="w-3 h-3 text-purple-400/70" /> : <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
            </button>

            <button
              onClick={() => handleTabClick('kids_fitness_schedule')}
              className={navButtonClass('kids_fitness_schedule')}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Kids Fitness Schedule</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('step_adults_schedule')}
              className={navButtonClass('step_adults_schedule')}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Step Adults Schedule</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>
          </div>
        </div>

        {/* PROGRAMET */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-indigo-400/80 tracking-wider uppercase">
            PROGRAMET
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleTabClick('prog_swimming_school')}
              className={navButtonClass('prog_swimming_school')}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Shkolla e Notit</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('prog_individual')}
              className={navButtonClass('prog_individual')}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-indigo-400" />
                <span>Individual</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('prog_kids_fitness')}
              className={navButtonClass('prog_kids_fitness')}
            >
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>Kids Fitness</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('prog_step_adults')}
              className={navButtonClass('prog_step_adults')}
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Step Adults</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>

            <button
              onClick={() => handleTabClick('prog_duo')}
              className={navButtonClass('prog_duo')}
            >
              <div className="flex items-center gap-2.5">
                <Waves className="w-4 h-4 text-indigo-400" />
                <span>Duo (Fitness+Not)</span>
              </div>
              {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
            </button>
          </div>
        </div>

        {/* REZERVIME & MESAZHE */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-indigo-400/80 tracking-wider uppercase">
            REZERVIME & MESAZHE
          </div>
          <button
            onClick={() => handleTabClick('messages')}
            className={navButtonClass('messages')}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Mesazhet</span>
            </div>
            {!isBranchSelected ? (
              <Lock className="w-3 h-3 text-purple-400/70" />
            ) : (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-blue-500/30 text-blue-300 font-bold border border-blue-400/30">
                3
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabClick('prog_first_team')}
            className={navButtonClass('prog_first_team')}
          >
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-indigo-400" />
              <span>Ekipa e parë/Akademia</span>
            </div>
            {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
          </button>

          <button
            onClick={() => handleTabClick('group_reservations')}
            className={navButtonClass('group_reservations')}
          >
            <div className="flex items-center gap-2.5">
              <QrCode className="w-4 h-4 text-indigo-400" />
              <span>Rezervime Grupore</span>
            </div>
            {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
          </button>

          <button
            onClick={() => handleTabClick('agents')}
            className={navButtonClass('agents')}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>Agjentët</span>
            </div>
            {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
          </button>

          <button
            onClick={() => handleTabClick('payment_history')}
            className={navButtonClass('payment_history')}
          >
            <div className="flex items-center gap-2.5">
              <Wallet className="w-4 h-4 text-indigo-400" />
              <span>Historia e Pagesës</span>
            </div>
            {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
          </button>

          <button
            onClick={() => handleTabClick('sub_history')}
            className={navButtonClass('sub_history')}
          >
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-indigo-400" />
              <span>Historia e Abonuesit</span>
            </div>
            {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
          </button>

          <button
            onClick={() => handleTabClick('coupons')}
            className={navButtonClass('coupons')}
          >
            <div className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4 text-indigo-400" />
              <span>Kuponi</span>
            </div>
            {!isBranchSelected && <Lock className="w-3 h-3 text-purple-400/70" />}
          </button>
        </div>
      </div>

      {/* User Footer Card & Branch Switcher & Logout */}
      <div className="p-3 border-t border-indigo-500/10 bg-slate-900/60 relative">
        <div 
          onClick={() => setShowReceptionDropdown(!showReceptionDropdown)}
          className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/80 border border-purple-400/40 flex items-center justify-center font-bold text-white text-xs shrink-0">
              RM
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {activeReception ? activeReception.name : 'Zgjidh Filialin...'}
              </p>
              <p className="text-[10px] text-purple-300/80 font-medium truncate">rameen (Admin)</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full mt-2 py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
          title="Çkyçu nga paneli"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Çkyçu (Logout)</span>
        </button>

        {/* Branch Dropdown Popup */}
        {showReceptionDropdown && (
          <div className="absolute bottom-24 left-3 right-3 glass-panel rounded-2xl p-2 z-50 border border-indigo-500/30 shadow-2xl space-y-1">
            <p className="text-[10px] font-bold text-indigo-300 px-2 py-1 uppercase tracking-wider">
              Zgjidh Filialin Aktiv
            </p>
            {receptions.map((rec) => (
              <button
                key={rec.id}
                onClick={() => {
                  onSelectReception(rec);
                  setShowReceptionDropdown(false);
                }}
                className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                  activeReception && rec.id === activeReception.id
                    ? 'bg-indigo-600/40 text-white font-medium border border-indigo-400/30'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <span>{rec.name}</span>
                {activeReception && rec.id === activeReception.id && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

