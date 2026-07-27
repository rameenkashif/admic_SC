import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  Activity, 
  Zap, 
  Waves, 
  Trophy, 
  Search, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  CreditCard, 
  Building2, 
  X, 
  Save, 
  FileText,
  Filter,
  Check
} from 'lucide-react';
import { RegistrationRecord, NavTab, Reception } from '../types';

interface ProgramsViewProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  registrations: RegistrationRecord[];
  onUpdateRegistration: (updatedReg: RegistrationRecord) => void;
  onDeleteRegistration: (id: string) => void;
  activeReception: Reception;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  activeTab,
  setActiveTab,
  registrations,
  onUpdateRegistration,
  onDeleteRegistration,
  activeReception,
}) => {
  // Determine selected program category based on activeTab
  const getCategoryFromTab = (tab: NavTab): string => {
    switch (tab) {
      case 'prog_swimming_school':
        return 'SHKOLLA E NOTIT';
      case 'prog_individual':
        return 'INDIVIDUAL';
      case 'prog_kids_fitness':
        return 'KIDS FITNESS';
      case 'prog_step_adults':
        return 'STEP ADULTS';
      case 'prog_duo':
        return 'DUO (FITNESS+NOT)';
      default:
        return 'SHKOLLA E NOTIT';
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(getCategoryFromTab(activeTab));
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRegId, setExpandedRegId] = useState<string | null>('reg-malza-1'); // Expand Malza Hasani by default
  const [editingReg, setEditingReg] = useState<RegistrationRecord | null>(null);
  const [deletingRegId, setDeletingRegId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('Të gjitha');

  // Sync category when activeTab changes
  React.useEffect(() => {
    setSelectedCategory(getCategoryFromTab(activeTab));
  }, [activeTab]);

  const categoriesList = [
    { id: 'SHKOLLA E NOTIT', label: 'Shkolla e Notit', icon: GraduationCap, tab: 'prog_swimming_school' as NavTab },
    { id: 'INDIVIDUAL', label: 'Individual', icon: User, tab: 'prog_individual' as NavTab },
    { id: 'KIDS FITNESS', label: 'Kids Fitness', icon: Activity, tab: 'prog_kids_fitness' as NavTab },
    { id: 'STEP ADULTS', label: 'Step Adults', icon: Zap, tab: 'prog_step_adults' as NavTab },
    { id: 'DUO (FITNESS+NOT)', label: 'Duo (Fitness+Not)', icon: Waves, tab: 'prog_duo' as NavTab },
  ];

  // Filter registrations for current category & search
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesCategory =
      selectedCategory === 'GJITHSEJ' ||
      reg.programCategory?.toUpperCase() === selectedCategory.toUpperCase() ||
      reg.program?.toUpperCase().includes(selectedCategory.toUpperCase());

    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      reg.memberName.toLowerCase().includes(query) ||
      (reg.phone && reg.phone.includes(query)) ||
      (reg.rfid && reg.rfid.includes(query)) ||
      (reg.poolAssignment && reg.poolAssignment.toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === 'Të gjitha' || reg.status === statusFilter;

    return matchesCategory && matchesQuery && matchesStatus;
  });

  const toggleExpand = (id: string) => {
    setExpandedRegId((prev) => (prev === id ? null : id));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReg) return;
    
    // Auto sync full memberName from firstName & lastName if provided
    const fullName = editingReg.firstName || editingReg.lastName 
      ? `${editingReg.firstName || ''} ${editingReg.lastName || ''}`.trim()
      : editingReg.memberName;

    const updated = {
      ...editingReg,
      memberName: fullName,
    };

    onUpdateRegistration(updated);
    setEditingReg(null);
  };

  const confirmDelete = () => {
    if (deletingRegId) {
      onDeleteRegistration(deletingRegId);
      setDeletingRegId(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            {React.createElement(
              categoriesList.find((c) => c.id === selectedCategory)?.icon || GraduationCap,
              { className: 'w-6 h-6 text-indigo-400' }
            )}
            <h1 className="text-2xl font-black text-white tracking-tight">
              Programet: {categoriesList.find((c) => c.id === selectedCategory)?.label || selectedCategory}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Menaxhoni të gjitha regjistrimet aktive, detajet e anëtarëve, pagesat dhe faturat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('new_registration')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Regjistrim i Ri</span>
          </button>
        </div>
      </div>

      {/* Program Category Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoriesList.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveTab(cat.tab);
              }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/25 scale-102'
                  : 'glass-panel text-slate-300 hover:text-white hover:bg-white/10 border-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
              <span>{cat.label}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {
                  registrations.filter(
                    (r) =>
                      r.programCategory?.toUpperCase() === cat.id.toUpperCase() ||
                      r.program?.toUpperCase().includes(cat.id.toUpperCase())
                  ).length
                }
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Header Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-indigo-300/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kërko sipas emrit, numrit, RFID, pishinës..."
            className="w-full bg-slate-900/80 border border-indigo-500/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Statusi:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-indigo-500/20 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="Të gjitha">Të gjitha</option>
              <option value="Aktiv">Aktiv</option>
              <option value="Inaktiv">Inaktiv</option>
            </select>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Rezultate: <span className="text-white font-bold">{filteredRegistrations.length}</span>
          </div>
        </div>
      </div>

      {/* REGISTRATIONS LIST - Landscape Table / Card Rows */}
      {filteredRegistrations.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center border border-indigo-500/20 space-y-3">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">Nuk u gjet asnjë regjistrim</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Nuk ka anëtarë të regjistruar në kategorinë "{categoriesList.find((c) => c.id === selectedCategory)?.label}". Shtoni një regjistrim të ri për ta shfaqur këtu.
          </p>
          <button
            onClick={() => setActiveTab('new_registration')}
            className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
          >
            + Regjistro Anëtar të Ri
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRegistrations.map((reg) => {
            const isExpanded = expandedRegId === reg.id;

            // Extract or infer display values
            const firstName = reg.firstName || reg.memberName.split(' ')[0] || reg.memberName;
            const lastName = reg.lastName || reg.memberName.split(' ').slice(1).join(' ') || '';
            const parentName = reg.parentName || '';
            const age = reg.age || '8';
            const dob = reg.dob || '01-03-2018';
            const rfid = reg.rfid || '0009629824';
            const phone = reg.phone || '044234796';
            const email = reg.email || '';
            const collaborator = reg.collaborator || 'Nuk ka bashkëpuntor';
            const healthIssues = reg.healthIssues || 'No';
            const paymentMethod = reg.paymentMethod || 'cash';
            const pricePaid = reg.pricePaid ? `${reg.pricePaid}€` : '40.5€';
            const discount = reg.discount || '10%';
            const entryPlan = reg.entryPlan || '2 Hyrje në Javë - 8 Hyrje në Muaj';
            const totalEntries = reg.totalEntries || 8;
            const remainingEntries = reg.remainingEntries || 8;
            const timeDuration = reg.timeDuration || reg.duration || '1 muaj';
            const description = reg.description || 'Nuk ka përshkrim';
            const paymentStatus = reg.paymentStatus || 'Payment Confirmed';
            const poolAssignment = reg.poolAssignment || 'Pishina me 4 korsi';
            const createdAt = reg.createdAt || reg.startDate || '26-07-2026';

            return (
              <div
                key={reg.id}
                className={`glass-panel rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-indigo-400/50 bg-slate-900/90 shadow-2xl ring-1 ring-indigo-500/20'
                    : 'border-indigo-500/20 hover:border-indigo-400/30 bg-slate-900/50'
                }`}
              >
                {/* Header Row (Summary Row) */}
                <div
                  onClick={() => toggleExpand(reg.id)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      className="p-1.5 rounded-xl bg-slate-800 text-indigo-300 border border-indigo-500/20 hover:bg-slate-700 transition"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center border border-indigo-400/30 shrink-0">
                      {firstName.substring(0, 1)}
                      {lastName.substring(0, 1)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white">
                          {reg.memberName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          {reg.program || selectedCategory}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Data: {createdAt}</span>
                        <span>•</span>
                        <span>Tel: {phone}</span>
                        <span>•</span>
                        <span className="font-mono text-indigo-300">RFID: {rfid}</span>
                      </p>
                    </div>
                  </div>

                  {/* Summary Right Info & Action Buttons */}
                  <div className="flex items-center gap-3 ml-auto md:ml-0" onClick={(e) => e.stopPropagation()}>
                    <div className="text-right hidden lg:block mr-2">
                      <div className="text-sm font-extrabold text-emerald-400">{pricePaid}</div>
                      <div className="text-[10px] text-slate-400">{poolAssignment}</div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{paymentStatus}</span>
                    </span>

                    <button
                      onClick={() => setEditingReg(reg)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-bold text-xs border border-blue-400/30 flex items-center gap-1 transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeletingRegId(reg.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-300 font-bold text-xs border border-red-500/30 flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* EXPANDED FULL DETAILS PANEL (Matching Exact User Request Structure) */}
                {isExpanded && (
                  <div className="border-t border-indigo-500/20 p-6 bg-slate-950/70 space-y-6 animate-in fade-in duration-200">
                    
                    {/* Top Action Bar matching prompt format */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-indigo-500/20">
                      <div>
                        <h4 className="text-lg font-black text-white flex items-center gap-2">
                          <span>{reg.memberName}</span>
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-indigo-300 mt-0.5">
                          <span className="font-bold">{reg.program || selectedCategory}</span>
                          <span>•</span>
                          <span>Data: {createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingReg(reg)}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeletingRegId(reg.id)}
                          className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* ORGANIZED LANDSCAPE TABLE FORM / DETAILED GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                      
                      {/* CARD 1: Të Dhënat Personale */}
                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-indigo-500/20 space-y-2.5">
                        <div className="text-[11px] font-black uppercase text-indigo-400 tracking-wider border-b border-indigo-500/15 pb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>Të Dhënat Personale</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Emri:</span>
                          <span className="text-white font-bold">{firstName || reg.memberName}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Emri i Prindit:</span>
                          <span className="text-white font-medium">{parentName || '-'}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Mbiemri:</span>
                          <span className="text-white font-bold">{lastName || '-'}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Mosha:</span>
                          <span className="text-white font-bold">{age} vjeç</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Data e lindjes:</span>
                          <span className="text-white font-medium">{dob}</span>
                        </div>

                        <div className="flex justify-between py-1">
                          <span className="text-slate-400 font-semibold">RFID:</span>
                          <span className="text-indigo-300 font-mono font-bold bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">{rfid}</span>
                        </div>
                      </div>

                      {/* CARD 2: Kontakti & Shëndeti */}
                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-indigo-500/20 space-y-2.5">
                        <div className="text-[11px] font-black uppercase text-indigo-400 tracking-wider border-b border-indigo-500/15 pb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <span>Kontakti & Bashkëpunimi</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Numri kontaktues:</span>
                          <span className="text-white font-bold">{phone}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Email:</span>
                          <span className="text-white font-medium">{email || '-'}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Bashkëpuntori:</span>
                          <span className="text-white font-medium">{collaborator}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Probleme shëndetësore:</span>
                          <span className={`font-bold ${healthIssues === 'No' || healthIssues === 'Jo' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {healthIssues}
                          </span>
                        </div>

                        <div className="flex justify-between py-1">
                          <span className="text-slate-400 font-semibold">Pishina:</span>
                          <span className="text-blue-300 font-bold">{poolAssignment}</span>
                        </div>
                      </div>

                      {/* CARD 3: Pagesa & Plani */}
                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-indigo-500/20 space-y-2.5">
                        <div className="text-[11px] font-black uppercase text-indigo-400 tracking-wider border-b border-indigo-500/15 pb-1.5 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pagesa & Plani i Abonimit</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Metoda e Pagesës:</span>
                          <span className="text-white font-bold capitalize">{paymentMethod}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Shuma e Paguar:</span>
                          <span className="text-emerald-400 font-black text-sm">{pricePaid}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Zbritja:</span>
                          <span className="text-amber-300 font-bold">{discount}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Plani i hyrjeve:</span>
                          <span className="text-slate-200 font-semibold text-right max-w-[180px]">{entryPlan}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400 font-semibold">Totali / Hyrjet e mbetura:</span>
                          <span className="text-white font-bold">{remainingEntries} / {totalEntries} hyrje</span>
                        </div>

                        <div className="flex justify-between py-1">
                          <span className="text-slate-400 font-semibold">Koha:</span>
                          <span className="text-white font-medium">{timeDuration}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-400/30 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{paymentStatus}</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          <span className="font-semibold text-slate-400">Përshkrimi:</span> {description}
                        </p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT REGISTRATION MODAL */}
      {editingReg && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-indigo-500/30 p-6 space-y-5 my-8 relative">
            <button
              onClick={() => setEditingReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-indigo-500/15 pb-3">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-400" />
                <span>Edito Regjistrimin: {editingReg.memberName}</span>
              </h3>
              <p className="text-xs text-slate-400">Përditësoni të dhënat e anëtarit dhe cilësimet e abonimit.</p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Emri i Anëtarit *</label>
                  <input
                    type="text"
                    required
                    value={editingReg.memberName}
                    onChange={(e) => setEditingReg({ ...editingReg, memberName: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Emri i Prindit</label>
                  <input
                    type="text"
                    value={editingReg.parentName || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, parentName: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mosha</label>
                  <input
                    type="text"
                    value={editingReg.age || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, age: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Data e Lindjes</label>
                  <input
                    type="text"
                    value={editingReg.dob || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, dob: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">RFID Code</label>
                  <input
                    type="text"
                    value={editingReg.rfid || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, rfid: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Numri Kontaktues *</label>
                  <input
                    type="text"
                    required
                    value={editingReg.phone}
                    onChange={(e) => setEditingReg({ ...editingReg, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={editingReg.email || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, email: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Programi</label>
                  <input
                    type="text"
                    value={editingReg.program}
                    onChange={(e) => setEditingReg({ ...editingReg, program: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Pishina / Lokacioni</label>
                  <select
                    value={editingReg.poolAssignment}
                    onChange={(e) => setEditingReg({ ...editingReg, poolAssignment: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  >
                    <option value="Pishina me 4 korsi">Pishina me 4 korsi</option>
                    <option value="Pishinat e vogla">Pishinat e vogla</option>
                    <option value="Pishina me 5 korsi">Pishina me 5 korsi</option>
                    <option value="Gym Studio">Gym Studio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Metoda e Pagesës</label>
                  <select
                    value={editingReg.paymentMethod}
                    onChange={(e: any) => setEditingReg({ ...editingReg, paymentMethod: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  >
                    <option value="Cash">Cash</option>
                    <option value="POS">POS</option>
                    <option value="Transfer Bankar">Transfer Bankar</option>
                    <option value="Kompenzim">Kompenzim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Shuma e Paguar (€)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingReg.pricePaid}
                    onChange={(e) => setEditingReg({ ...editingReg, pricePaid: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Zbritja (%)</label>
                  <input
                    type="text"
                    value={editingReg.discount || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, discount: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Plani i Hyrjeve</label>
                  <input
                    type="text"
                    value={editingReg.entryPlan || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, entryPlan: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Koha / Kohëzgjatja</label>
                  <input
                    type="text"
                    value={editingReg.timeDuration || editingReg.duration || ''}
                    onChange={(e) => setEditingReg({ ...editingReg, timeDuration: e.target.value, duration: e.target.value })}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Përshkrimi</label>
                <textarea
                  rows={2}
                  value={editingReg.description || ''}
                  onChange={(e) => setEditingReg({ ...editingReg, description: e.target.value })}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-indigo-500/15">
                <button
                  type="button"
                  onClick={() => setEditingReg(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 shadow-lg transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Ruaj Ndryshimet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingRegId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl border border-red-500/30 p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-white">Konfirmo Fshirjen</h3>
            <p className="text-xs text-slate-300">
              Jeni të sigurt që dëshironi të fshini këtë regjistrim? Ky veprim nuk mund të kthehet prapa.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingRegId(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 text-xs transition"
              >
                Anulo
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition"
              >
                Fshij Regjistrimin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
