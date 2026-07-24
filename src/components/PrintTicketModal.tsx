import React from 'react';
import { X, Printer, QrCode, CheckCircle2, Building2, Phone } from 'lucide-react';
import { RegistrationRecord, Reception } from '../types';

interface PrintTicketModalProps {
  registration: RegistrationRecord | null;
  activeReception: Reception;
  onClose: () => void;
}

export const PrintTicketModal: React.FC<PrintTicketModalProps> = ({
  registration,
  activeReception,
  onClose,
}) => {
  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-indigo-500/30 shadow-2xl space-y-5 animate-in zoom-in duration-200">
        
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Bileta e Anëtarësisë
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ticket Printable Body */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-5 text-slate-200 space-y-4 relative overflow-hidden shadow-inner print:bg-white print:text-black">
          
          {/* Logo Header */}
          <div className="text-center border-b border-indigo-500/20 pb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 mx-auto flex items-center justify-center font-bold text-white text-base shadow-md mb-2">
              SC
            </div>
            <h2 className="font-extrabold text-base text-white tracking-wide">{activeReception.name}</h2>
            <p className="text-[11px] text-indigo-300 font-medium">{activeReception.address} • {activeReception.phone}</p>
          </div>

          {/* Member Info */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-indigo-500/10 p-2.5 rounded-2xl border border-indigo-500/20">
              <span className="text-slate-400 font-medium">Anëtari:</span>
              <strong className="text-white text-sm font-black">{registration.memberName}</strong>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-400 block">Programi</span>
                <strong className="text-blue-300">{registration.program}</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-400 block">Kohëzgjatja</span>
                <strong className="text-white">{registration.duration}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-400 block">Gjithsej hyrje</span>
                <strong className="text-white">{registration.totalEntries}</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-400 block">Hyrje të mbetura</span>
                <strong className="text-emerald-400 font-bold">{registration.remainingEntries}</strong>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Data e Fillimit:</span>
                <strong className="text-white font-mono">{registration.startDate}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Data e Skadimit:</span>
                <strong className="text-white font-mono">{registration.endDate}</strong>
              </div>
            </div>

            {/* RFID QR Code Placeholder */}
            <div className="pt-2 text-center space-y-1">
              <div className="w-24 h-24 bg-white p-2 rounded-2xl mx-auto flex items-center justify-center shadow-md">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
              <span className="text-[10px] font-mono text-indigo-300 block font-bold">
                KODI RFID: {registration.rfid || 'RF-998822'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl glass-button text-xs font-semibold text-slate-300 hover:text-white"
          >
            Mbyll
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Printo Biletën</span>
          </button>
        </div>

      </div>
    </div>
  );
};
