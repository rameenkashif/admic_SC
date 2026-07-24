import React, { useState } from 'react';
import { Search, Bell, Plus, CheckCircle2, MessageSquareText, Sun, Moon } from 'lucide-react';
import { NavTab, Reception } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeReception: Reception | null;
  receptions: Reception[];
  onSelectReception: (rec: Reception) => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeReception,
  receptions,
  onSelectReception,
  globalSearch,
  setGlobalSearch,
  theme,
  onToggleTheme,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 border-b border-indigo-500/15 glass-panel-light px-6 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
      {/* Center Search Bar & Branch Switcher */}
      <div className="flex items-center gap-3 max-w-md w-full">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-indigo-300/60" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Kërko anëtar, RFID, regjistrim..."
            className="w-full bg-slate-900/70 border border-indigo-500/20 rounded-2xl pl-9 pr-4 py-2 text-xs text-white placeholder-indigo-300/40 focus:outline-none focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/30 transition shadow-inner"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* New Registration Quick Action */}
        <button
          onClick={() => setActiveTab('new_registration')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Regjistrim i Ri</span>
        </button>

        {/* Theme Switcher Toggle */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Kalo në Light Mode' : 'Kalo në Dark Mode'}
          className="w-9 h-9 rounded-2xl glass-button flex items-center justify-center text-amber-400 hover:text-amber-300 transition"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-2xl glass-button flex items-center justify-center text-slate-300 hover:text-white relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-2 right-2 ring-2 ring-slate-950 animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-panel rounded-2xl p-4 shadow-2xl z-50 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-500/15 pb-2">
                <span className="text-xs font-bold text-white">Njoftimet Së Fundmi</span>
                <span className="text-[10px] text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full font-medium">3 te reja</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Pagesë Online e Suksesshme</p>
                    <p className="text-[10px] text-slate-400">Asteria Hoxha ka rinovuar anëtarësinë për 3 muaj (€50.00)</p>
                    <span className="text-[9px] text-indigo-300 mt-1 block">Para 5 minutave</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex gap-2.5 items-start">
                  <MessageSquareText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Kërkesë e Re për Pishinë</p>
                    <p className="text-[10px] text-slate-400">Blerim Krasniqi ka dërguar pyetje mbi orarin e së shtunës</p>
                    <span className="text-[9px] text-indigo-300 mt-1 block">Para 12 minutave</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
