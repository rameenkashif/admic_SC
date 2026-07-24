import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Printer, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Edit3, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  SlidersHorizontal,
  X,
  Building2,
  QrCode
} from 'lucide-react';
import { RegistrationRecord } from '../types';

interface EntrancesProps {
  registrations: RegistrationRecord[];
  onUpdateRegistration: (reg: RegistrationRecord) => void;
  onPrintTicket: (reg: RegistrationRecord) => void;
  onReserveSlot: (reg: RegistrationRecord) => void;
}

export const Entrances: React.FC<EntrancesProps> = ({
  registrations,
  onUpdateRegistration,
  onPrintTicket,
  onReserveSlot,
}) => {
  const [search, setSearch] = useState('');
  const [selectedProgramFilter, setSelectedProgramFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter registrations
  const filteredRegs = registrations.filter((reg) => {
    const matchesSearch =
      reg.memberName.toLowerCase().includes(search.toLowerCase()) ||
      reg.phone.includes(search) ||
      reg.rfid?.toLowerCase().includes(search.toLowerCase());
    const matchesProgram = selectedProgramFilter === 'ALL' || reg.programCategory === selectedProgramFilter;
    return matchesSearch && matchesProgram;
  });

  const handleIncrementRemaining = (reg: RegistrationRecord) => {
    onUpdateRegistration({
      ...reg,
      remainingEntries: reg.remainingEntries + 1,
    });
  };

  const handleDecrementRemaining = (reg: RegistrationRecord) => {
    if (reg.remainingEntries <= 0) return;
    onUpdateRegistration({
      ...reg,
      remainingEntries: reg.remainingEntries - 1,
    });
  };

  const handleToggleStatus = (reg: RegistrationRecord) => {
    onUpdateRegistration({
      ...reg,
      status: reg.status === 'Aktiv' ? 'Inaktiv' : 'Aktiv',
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Search Bar matching Screenshot #3 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">Hyrjet & Riabonimet</h1>
          <p className="text-xs text-indigo-300/90 font-medium mt-0.5">
            <span className="font-bold text-white">{registrations.length}</span> regjistrime në sistem
          </p>
        </div>

        {/* Search input with rounded pills matching Screenshot #3 */}
        <div className="flex items-center gap-3 max-w-lg w-full">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Kërko anëtar, RFID ose numër telefoni..."
              className="w-full bg-slate-900 border border-indigo-500/20 rounded-2xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60 transition shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Program Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Programi:
        </span>
        {['ALL', 'SHKOLLA E NOTIT', 'INDIVIDUAL', 'KIDS FITNESS', 'STEP ADULTS', 'DUO (FITNESS+NOT)'].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProgramFilter(p)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedProgramFilter === p
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {p === 'ALL' ? 'Të Gjitha' : p}
          </button>
        ))}
      </div>

      {/* Member Cards Stream */}
      <div className="space-y-4">
        {filteredRegs.length > 0 ? (
          filteredRegs.map((reg) => (
            <div
              key={reg.id}
              className="glass-panel p-5 rounded-3xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-200 relative shadow-lg"
            >
              {/* Top Row: Name, Program, Dates, Edit Pencil */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/10 pb-3">
                <div>
                  <h3 className="font-black text-lg text-white tracking-wide">{reg.memberName}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-slate-300">Regjistrim</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black tracking-wider uppercase">
                      {reg.program}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{reg.duration}</span>
                  </div>
                </div>

                {/* Start & End Dates & Edit Pencil */}
                <div className="flex items-center gap-4">
                  <div className="text-right text-xs">
                    <p className="text-slate-400">
                      Data e fillimit: <strong className="text-white font-mono">{reg.startDate}</strong>
                    </p>
                    <p className="text-slate-400">
                      Data e përfundimit: <strong className="text-white font-mono">{reg.endDate}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => onReserveSlot(reg)}
                    className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-300 hover:text-white"
                    title="Ndrysho të dhënat"
                  >
                    <Edit3 className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>

              {/* Middle Row: Entry Stepper, Tel, DOB, Action Buttons */}
              <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Steppers & Contact */}
                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span>Gjithsej hyrje: <strong className="text-white font-bold">{reg.totalEntries}</strong></span>
                    <span className="text-slate-600">|</span>
                    <span>Hyrje të mbetura: <strong className="text-white font-bold text-sm">{reg.remainingEntries}</strong></span>

                    {/* Plus / Minus Stepper Controls */}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handleDecrementRemaining(reg)}
                        className="w-6 h-6 rounded-lg glass-button flex items-center justify-center text-slate-300 hover:text-white"
                        title="Zbrit 1 hyrje"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleIncrementRemaining(reg)}
                        className="w-6 h-6 rounded-lg glass-button flex items-center justify-center text-slate-300 hover:text-white"
                        title="Shto 1 hyrje"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-[11px] text-slate-300">
                    <span>TEL: <strong className="text-white">{reg.phone}</strong></span>
                    <span>DT: <strong className="text-white">{reg.dob}</strong></span>
                  </div>
                </div>

                {/* Action Buttons: Printo, Aktiv, Rezervo */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Printo */}
                  <button
                    onClick={() => onPrintTicket(reg)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Printo</span>
                  </button>

                  {/* Status Toggle (Aktiv) */}
                  <button
                    onClick={() => handleToggleStatus(reg)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                      reg.status === 'Aktiv'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${reg.status === 'Aktiv' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                    <span>{reg.status}</span>
                  </button>

                  {/* Rezervo */}
                  <button
                    onClick={() => onReserveSlot(reg)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Rezervo</span>
                  </button>
                </div>
              </div>

              {/* Bottom Row: Pool & Schedule Chips */}
              <div className="pt-2 border-t border-indigo-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span>Pishina: <strong className="text-slate-200">{reg.poolAssignment}</strong></span>
                  <span>•</span>
                  <span>Kati: <strong className="text-slate-200">{reg.floor}</strong></span>
                </div>

                {/* Schedule Chips */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  {reg.schedule.map((s, idx) => (
                    <div key={idx} className="px-2.5 py-1 rounded-xl bg-slate-900/80 border border-white/10 text-[10px] font-bold text-slate-200 flex items-center gap-1">
                      <span>{s.day}</span>
                      <span className="text-indigo-400 font-mono">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel p-12 rounded-3xl border border-dashed border-indigo-500/30 text-center space-y-3">
            <QrCode className="w-8 h-8 text-indigo-400 mx-auto" />
            <h3 className="font-bold text-base text-white">Nuk ka regjistrime në këtë kategori</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Nuk u gjet asnjë regjistrim aktiv apo hyrje me këtë kriter kërkimi. Klikoni butonin për të hapur formën e regjistrimit të ri.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="glass-panel p-4 rounded-2xl border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div>
          Shfaqja <strong className="text-white">1</strong> deri <strong className="text-white">{filteredRegs.length}</strong> nga{' '}
          <strong className="text-indigo-300">9,953</strong> regjistrime
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3, 4, '...', 340].map((num, idx) => (
            <button
              key={idx}
              onClick={() => typeof num === 'number' && setCurrentPage(num)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                currentPage === num
                  ? 'bg-blue-600 text-white border border-blue-400/40 shadow-md'
                  : 'glass-button text-slate-300 hover:text-white'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-300 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
