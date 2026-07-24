import React, { useState } from 'react';
import { X, Calendar, Clock, Bookmark, CheckCircle2 } from 'lucide-react';
import { RegistrationRecord } from '../types';

interface ReserveSlotModalProps {
  registration: RegistrationRecord | null;
  onClose: () => void;
  onSave: (reg: RegistrationRecord) => void;
}

export const ReserveSlotModal: React.FC<ReserveSlotModalProps> = ({
  registration,
  onClose,
  onSave,
}) => {
  if (!registration) return null;

  const [day, setDay] = useState('E HËNË');
  const [time, setTime] = useState('18:00');
  const [pool, setPool] = useState(registration.poolAssignment);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSchedule = [...registration.schedule, { day, time }];

    onSave({
      ...registration,
      poolAssignment: pool,
      schedule: updatedSchedule,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-indigo-500/30 shadow-2xl space-y-5 animate-in zoom-in duration-200">
        
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Rezervo Terminin / Orarin
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {savedSuccess ? (
          <div className="p-6 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-bold text-white text-base">Termini u rezervua me sukses!</h3>
            <p className="text-xs text-slate-400">Orari i ri u caktua për {registration.memberName}</p>
          </div>
        ) : (
          <form onSubmit={handleSaveReservation} className="space-y-4 text-xs">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Anëtari</span>
              <strong className="text-white text-sm block font-black">{registration.memberName}</strong>
              <span className="text-blue-300 text-[11px] font-medium">{registration.program}</span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dita e Javës</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white font-medium focus:outline-none"
              >
                <option value="E HËNË">E HËNË</option>
                <option value="E MARTË">E MARTË</option>
                <option value="E MËRKURË">E MËRKURË</option>
                <option value="E ENJTE">E ENJTE</option>
                <option value="E PREMTE">E PREMTE</option>
                <option value="E SHTUNË">E SHTUNË</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Ora e Terminit</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white font-medium focus:outline-none"
              >
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Pishina / Kategori Zone</label>
              <select
                value={pool}
                onChange={(e) => setPool(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white font-medium focus:outline-none"
              >
                <option value="Pishina me 4 korsi">Pishina me 4 korsi</option>
                <option value="Pishinat e vogla">Pishinat e vogla</option>
                <option value="Pishina me 5 korsi">Pishina me 5 korsi</option>
              </select>
            </div>

            <div className="pt-3 border-t border-indigo-500/20 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl glass-button text-slate-300 hover:text-white"
              >
                Anulo
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md"
              >
                Konfirmo Rezervimin
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
