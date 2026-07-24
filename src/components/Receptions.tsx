import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Reception } from '../types';

interface ReceptionsProps {
  receptions: Reception[];
  activeReception: Reception | null;
  onSelectReception: (rec: Reception) => void;
  onAddReception: (rec: Reception) => void;
  onEditReception: (rec: Reception) => void;
  onDeleteReception: (id: string) => void;
}

export const Receptions: React.FC<ReceptionsProps> = ({
  receptions,
  activeReception,
  onSelectReception,
  onAddReception,
  onEditReception,
  onDeleteReception,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingRec, setEditingRec] = useState<Reception | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [manager, setManager] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedRegTypes, setSelectedRegTypes] = useState<string[]>([
    'Shkolla e Notit',
    'Kids Fitness',
    'Duo (Fitness+Not)',
    'Individual',
    'Adults',
    'Rezervime Grupore',
  ]);

  const ALL_REGISTRATION_TYPES = [
    { id: 'shkolla_notit', label: 'Shkolla e Notit' },
    { id: 'individual', label: 'Individual' },
    { id: 'kids_fitness', label: 'Kids Fitness' },
    { id: 'adults', label: 'Adults' },
    { id: 'duo', label: 'Duo (Fitness+Not)' },
    { id: 'rezervime_grupore', label: 'Rezervime Grupore' },
    { id: 'summer_school', label: 'Summer School' },
    { id: 'daily_pass', label: 'Daily Pass' },
  ];

  const toggleRegType = (label: string) => {
    setSelectedRegTypes((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const openAddModal = () => {
    setEditingRec(null);
    setName('');
    setCode('');
    setAddress('');
    setPhone('');
    setManager('Menaxher');
    setIsActive(true);
    setSelectedRegTypes([
      'Shkolla e Notit',
      'Kids Fitness',
      'Duo (Fitness+Not)',
      'Individual',
      'Adults',
      'Rezervime Grupore',
    ]);
    setShowModal(true);
  };

  const openEditModal = (rec: Reception) => {
    setEditingRec(rec);
    setName(rec.name);
    setCode(rec.code || '');
    setAddress(rec.address || '');
    setPhone(rec.phone || '');
    setManager(rec.manager || 'Menaxher');
    setIsActive(rec.isActive !== false);
    setSelectedRegTypes(
      rec.registrationTypes || [
        'Shkolla e Notit',
        'Kids Fitness',
        'Duo (Fitness+Not)',
        'Individual',
        'Adults',
        'Rezervime Grupore',
      ]
    );
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingRec) {
      onEditReception({
        ...editingRec,
        name,
        code,
        address,
        phone,
        manager,
        isActive,
        registrationTypes: selectedRegTypes,
        status: isActive ? 'active' : 'maintenance',
      });
    } else {
      onAddReception({
        id: `rec-${Date.now()}`,
        name,
        subtitle: 'Reception Center',
        code,
        address,
        phone,
        manager,
        isActive,
        registrationTypes: selectedRegTypes,
        activeMembers: 0,
        staffCount: 0,
        dailyEntries: 0,
        status: isActive ? 'active' : 'maintenance',
      });
    }

    setShowModal(false);
  };

  const isBranchSelected = Boolean(activeReception);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
              <Building2 className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white font-['Cal_Sans']">Recepsionet & Filialat</h1>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Recepsion i ri</span>
        </button>
      </div>

      {/* Grid of Reception Cards */}
      {receptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {receptions.map((rec) => {
            const isCurrentActive = activeReception?.id === rec.id;

            return (
              <div
                key={rec.id}
                className={`glass-panel p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isCurrentActive
                    ? 'border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-emerald-950/10'
                    : 'border-indigo-500/20 hover:border-purple-400/50'
                }`}
              >
                <div>
                  {/* Title & Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-md shrink-0 ${
                      isCurrentActive
                        ? 'bg-gradient-to-tr from-emerald-900 to-teal-800 border-emerald-400/40 text-emerald-300'
                        : 'bg-gradient-to-tr from-indigo-900 to-slate-800 border-indigo-400/30 text-indigo-300'
                    }`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-white leading-snug font-['Cal_Sans']">{rec.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Main Branch Selection Button */}
                <div className="space-y-3 pt-3 border-t border-indigo-500/15">
                  <button
                    onClick={() => onSelectReception(rec)}
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 ${
                      isCurrentActive
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25 border border-emerald-400/40'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/25 border border-purple-400/40'
                    }`}
                  >
                    {isCurrentActive ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Po punoni në {rec.name} (E Zgjedhur)</span>
                      </>
                    ) : (
                      <>
                        <span>Zgjidh & Hyr në {rec.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Edit / Delete Row */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(rec)}
                      className="flex-1 py-1.5 px-3 rounded-xl glass-button text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Ndrysho të dhënat</span>
                    </button>

                    <button
                      onClick={() => onDeleteReception(rec.id)}
                      className="py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Fshi</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl border border-dashed border-indigo-500/30 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto text-indigo-400">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-white">Nuk ka recepsione të regjistruara</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Krijoni recepsionin ose filialin tuaj të parë duke përdorur butonin "+ Recepsion i ri".
          </p>
        </div>
      )}

      {/* Modal for Add / Edit Reception */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="liquid-glass-card w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-200 text-white my-auto overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
              <h3 className="text-base font-bold text-white font-['Cal_Sans']">
                {editingRec ? 'Modifiko recepsionin' : 'Shto recepsionin'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 pt-3 overflow-hidden text-xs">
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                {/* Emri * */}
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Emri *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Step Sport Center"
                    className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Kodi */}
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Kodi</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Adresa */}
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Adresa</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Telefoni */}
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Telefoni</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Aktiv Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="recActiveCheck"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="recActiveCheck" className="text-slate-200 font-medium cursor-pointer">
                    Aktiv
                  </label>
                </div>

                {/* Llojet e regjistrimit që ofrohen */}
                <div className="pt-1">
                  <label className="block text-slate-200 font-medium mb-1.5">
                    Llojet e regjistrimit që ofrohen
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-900/50 p-3 rounded-2xl border border-white/10">
                    {ALL_REGISTRATION_TYPES.map((type) => {
                      const checked = selectedRegTypes.includes(type.label);
                      return (
                        <label
                          key={type.id}
                          onClick={() => toggleRegType(type.label)}
                          className="flex items-center gap-2 text-slate-200 cursor-pointer select-none text-xs hover:text-white"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {}} // Handled by parent label click
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span>{type.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer - fixed at bottom */}
              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-500/30 transition"
                >
                  Ruaj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
