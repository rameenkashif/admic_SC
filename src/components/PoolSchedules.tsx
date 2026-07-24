import React, { useState } from 'react';
import { Calendar, Clock, User, Filter, Plus, ChevronLeft, ChevronRight, Waves, CheckCircle2 } from 'lucide-react';
import { PoolSlot, NavTab } from '../types';

interface PoolSchedulesProps {
  activeTab: NavTab;
  poolSlots: PoolSlot[];
  onAddSlot: (slot: PoolSlot) => void;
}

export const PoolSchedules: React.FC<PoolSchedulesProps> = ({
  activeTab,
  poolSlots,
  onAddSlot,
}) => {
  const [selectedDay, setSelectedDay] = useState('E HËNË');
  const [trainerFilter, setTrainerFilter] = useState('ALL');

  const getScheduleTitle = () => {
    switch (activeTab) {
      case 'pool_4_lanes': return 'Orari - Pishina me 4 korsi (Kati i dytë)';
      case 'pool_small': return 'Orari - Pishinat e vogla (Kati i parë)';
      case 'pool_5_lanes': return 'Orari - Pishina me 5 korsi (Olimpike)';
      case 'kids_fitness_schedule': return 'Orari - Kids Fitness Gym';
      case 'step_adults_schedule': return 'Orari - Step Adults Gym';
      default: return 'Orari i Pishinave';
    }
  };

  const laneCount = activeTab === 'pool_5_lanes' ? 5 : 4;
  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
  ];

  const days = ['E HËNË', 'E MARTË', 'E MËRKURË', 'E ENJTE', 'E PREMTE', 'E SHTUNË'];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold text-white">{getScheduleTitle()}</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zënia e korsive sipas orareve, grupeve dhe trajnerëve të caktuar.
          </p>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-2xl border border-indigo-500/20 overflow-x-auto">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedDay === d
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lanes vs Time Slots */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 overflow-x-auto">
        <div className="min-w-[700px] space-y-4">
          
          {/* Header row: Lanes */}
          <div className="grid grid-cols-5 gap-3 text-center text-xs font-bold text-indigo-300 border-b border-indigo-500/15 pb-3">
            <div className="text-left font-mono text-slate-400">Koha / Korsia</div>
            {Array.from({ length: laneCount }).map((_, i) => (
              <div key={i} className="p-2 rounded-xl bg-slate-900/60 border border-white/5">
                Korsia {i + 1}
              </div>
            ))}
          </div>

          {/* Time Slot Rows */}
          {timeSlots.map((time, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-3 items-center text-xs">
              {/* Time Label */}
              <div className="font-mono text-slate-300 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{time}</span>
              </div>

              {/* Lane Columns */}
              {Array.from({ length: laneCount }).map((_, laneIdx) => {
                const laneNumber = laneIdx + 1;
                const slot = poolSlots.find((s) => s.lane === laneNumber && s.time === time);

                return slot ? (
                  <div
                    key={laneIdx}
                    className={`p-3 rounded-2xl border flex flex-col justify-between space-y-1.5 transition hover:scale-102 ${slot.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-[11px] truncate">{slot.groupName}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30">
                        {slot.occupancy}/{slot.maxCapacity}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-300">
                      <User className="w-3 h-3 text-indigo-300" />
                      <span>{slot.trainer}</span>
                    </div>

                    <div className="w-full bg-slate-950/50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${(slot.occupancy / slot.maxCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={laneIdx}
                    className="p-3 rounded-2xl border border-dashed border-white/10 bg-slate-950/20 text-center text-[10px] text-slate-500 hover:border-indigo-400/30 cursor-pointer transition flex items-center justify-center min-h-[72px]"
                  >
                    + Korsi e Lirë
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
