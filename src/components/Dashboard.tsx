import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  UserCheck, 
  MessageSquare, 
  CreditCard, 
  ExternalLink,
  Users,
  Building2,
  CheckCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Waves,
  Bookmark,
  CalendarDays
} from 'lucide-react';
import { RegistrationRecord, MessageItem, Reception } from '../types';

interface DashboardProps {
  activeReception: Reception;
  registrations: RegistrationRecord[];
  messages: MessageItem[];
  onNavigateToRegistrations: () => void;
  onNavigateToEntrances: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activeReception,
  registrations,
  messages,
  onNavigateToRegistrations,
  onNavigateToEntrances,
}) => {
  const ALBANIAN_MONTHS = [
    'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
    'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
  ];

  const ALBANIAN_DAYS_FULL = [
    'E DIEL', 'E HËNË', 'E MARTE', 'E MËRKURË', 'E ENJTE', 'E PREMTE', 'E SHTUNË'
  ];

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [regSearch, setRegSearch] = useState('');
  const [msgSearch, setMsgSearch] = useState('');
  const [hyrjeSearch, setHyrjeSearch] = useState('');

  const formattedDayName = ALBANIAN_DAYS_FULL[selectedDate.getDay()];
  const formattedDateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const daysInMonthCount = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const paddingDays = (firstDayIndex + 6) % 7;
  const prevMonthDaysCount = new Date(year, month, 0).getDate();

  const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);
  const leadingPaddingDays = Array.from(
    { length: paddingDays },
    (_, i) => prevMonthDaysCount - paddingDays + i + 1
  );

  const weekDays = ['Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht', 'Die'];

  const today = new Date();
  const isToday = (dayNum: number) => {
    return (
      today.getDate() === dayNum &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (dayNum: number) => {
    return (
      selectedDate.getDate() === dayNum &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const filteredRegistrations = registrations.filter((r) =>
    r.memberName.toLowerCase().includes(regSearch.toLowerCase()) ||
    r.program.toLowerCase().includes(regSearch.toLowerCase())
  );

  const filteredMessages = messages.filter((m) =>
    m.sender.toLowerCase().includes(msgSearch.toLowerCase()) ||
    m.message.toLowerCase().includes(msgSearch.toLowerCase())
  );

  const entrancesStream = [
    { id: 'e-1', member: 'Kron Kasniqi', program: 'Shkolla e Notit', time: '10:14 AM', gate: 'Pishina 4 Korsi', status: 'OK' },
    { id: 'e-2', member: 'Asteria Hoxha', program: 'Individual Swim', time: '09:45 AM', gate: 'Pishina e Vogël', status: 'OK' },
    { id: 'e-3', member: 'Mal Besnik Berisha', program: 'Kids Fitness', time: '09:30 AM', gate: 'Main Gym Gate', status: 'OK' },
    { id: 'e-4', member: 'Orges Aliu', program: 'Step Adults', time: '08:50 AM', gate: 'Main Gym Gate', status: 'OK' },
    { id: 'e-5', member: 'Aria Aliu', program: 'Duo Fitness', time: '08:10 AM', gate: 'Pishina 4 Korsi', status: 'OK' },
  ].filter((item) =>
    item.member.toLowerCase().includes(hyrjeSearch.toLowerCase()) ||
    item.program.toLowerCase().includes(hyrjeSearch.toLowerCase())
  );

  const onlinePaymentsTotal = registrations
    .filter((r) => r.paymentMethod === 'POS' || r.paymentMethod === 'Transfer Bankar')
    .reduce((acc, curr) => acc + curr.pricePaid, 0);

  const totalRevenue = registrations.reduce((acc, curr) => acc + curr.pricePaid, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome & Reception Context Banner */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-500/20">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 font-['Cal_Sans']">
            Faqja e parë <span className="text-indigo-400">{activeReception.name}</span>
          </h1>
        </div>
      </div>

      {/* Grid of Main 4 Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Widget 1: Kalendari (Calendar) */}
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-500/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Kalendari i Qendrës</h3>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white px-2.5 py-1 bg-slate-900/60 rounded-xl border border-white/10">
                  {ALBANIAN_MONTHS[month]} {year}
                </span>
                <button
                  onClick={handlePrevMonth}
                  className="w-7 h-7 rounded-xl glass-button flex items-center justify-center text-slate-300 hover:text-white transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="w-7 h-7 rounded-xl glass-button flex items-center justify-center text-slate-300 hover:text-white transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Week Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-indigo-300/80 mb-2">
              {weekDays.map((d, idx) => (
                <div key={idx} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Dynamic Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {leadingPaddingDays.map((dayNum) => (
                <div key={`prev-${dayNum}`} className="py-2 text-slate-700 text-xs select-none">
                  {dayNum}
                </div>
              ))}

              {daysInMonth.map((dayNum) => {
                const selected = isSelected(dayNum);
                const current = isToday(dayNum);
                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDate(new Date(year, month, dayNum))}
                    className={`py-2 text-xs rounded-xl font-medium transition-all ${
                      selected
                        ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-950 shadow-lg shadow-blue-500/40'
                        : current
                        ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/50 font-bold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-500/15 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              E zgjedhur: <strong className="text-white">{selectedDate.getDate()} {ALBANIAN_MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}</strong>
            </span>
          </div>
        </div>

        {/* Widget 2: Regjistrimet (Registrations Widget) */}
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-indigo-500/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Regjistrimet e Reja</h3>
                </div>
              </div>

              <button 
                onClick={onNavigateToRegistrations}
                className="text-xs text-indigo-300 hover:text-white flex items-center gap-1 font-semibold"
              >
                <span>Shiko Të Gjitha</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Widget Search Bar */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
                placeholder="Kërko regjistrimet..."
                className="w-full bg-slate-900/60 border border-indigo-500/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50"
              />
            </div>

            {/* Stat Rows */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/70 border border-indigo-500/15">
                <span className="text-xs text-slate-300 font-medium">Totali i Regjistrimeve</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-indigo-600/30 text-indigo-300 text-xs font-bold border border-indigo-400/30">
                    {filteredRegistrations.length} regjistrime
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                    €{totalRevenue.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Online Payment Highlighted Box */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-400/40 shadow-md">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Totali me pagesa online</p>
                    <button onClick={onNavigateToRegistrations} className="text-[10px] text-blue-300 hover:underline flex items-center gap-1 font-medium">
                      <span>Pages Online</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-xl bg-blue-500/30 text-blue-200 text-xs font-extrabold border border-blue-400/40">
                    €{onlinePaymentsTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stream List */}
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.slice(0, 3).map((reg) => (
                  <div key={reg.id} className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between text-xs hover:border-indigo-400/30 transition">
                    <div>
                      <span className="font-bold text-white block">{reg.memberName}</span>
                      <span className="text-[10px] text-blue-300 font-medium">{reg.program} • {reg.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400 block">€{reg.pricePaid}</span>
                      <span className="text-[9px] text-slate-400">{reg.paymentMethod}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 text-xs rounded-2xl border border-dashed border-white/10">
                  Nuk ka regjistrime për të shfaqur
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Widget 3: Mesazhet (Messages Widget) */}
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-indigo-500/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Mesazhet e Pranuara</h3>
                  <p className="text-[10px] text-slate-400">Kërkesa nga anëtarët</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                Totali: {filteredMessages.length}
              </span>
            </div>

            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={msgSearch}
                onChange={(e) => setMsgSearch(e.target.value)}
                placeholder="Kërko mesazhet..."
                className="w-full bg-slate-900/60 border border-indigo-500/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50"
              />
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <div key={msg.id} className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{msg.sender}</span>
                      <span className="text-[10px] text-amber-300/80">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">"{msg.message}"</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>Tel: {msg.phone}</span>
                      <button className="text-blue-400 hover:underline">Përgjigju</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs rounded-2xl border border-dashed border-white/10">
                  Nuk ka mesazhe për këtë datë
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Widget 4: Hyrjet (Entrances Widget) */}
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-indigo-500/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Hyrjet Reale Sot</h3>
                  <p className="text-[10px] text-slate-400">Skanimi i kartelave RFID</p>
                </div>
              </div>

              <button 
                onClick={onNavigateToEntrances}
                className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 font-semibold"
              >
                <span>Hyrjet</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={hyrjeSearch}
                onChange={(e) => setHyrjeSearch(e.target.value)}
                placeholder="Kërko hyrjet..."
                className="w-full bg-slate-900/60 border border-indigo-500/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50"
              />
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto">
              {entrancesStream.length > 0 ? (
                entrancesStream.map((item) => (
                  <div key={item.id} className="p-2.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">{item.member}</span>
                        <span className="text-[10px] text-slate-400">{item.program} • {item.gate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-indigo-300 font-mono text-[11px] block">{item.time}</span>
                      <span className="text-[9px] text-emerald-400 font-bold">Aktiv</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs rounded-2xl border border-dashed border-white/10">
                  Nuk ka hyrje të skanuara sot
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Pishinat — përmbledhje sipas kalendarit Section */}
      <div className="mt-8 space-y-6">
        {/* Header Teal Banner */}
        <div className="bg-gradient-to-r from-teal-900/80 via-cyan-900/70 to-slate-900/90 border border-teal-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-lg">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Cal_Sans'] tracking-tight">
                Pishinat — përmbledhje sipas kalendarit
              </h2>
              <p className="text-xs sm:text-sm text-cyan-100/90 mt-2 leading-relaxed">
                Shifrat e statusit më poshtë janë <strong className="text-white font-bold">gjithsej</strong> (të gjitha ditët). Bloku "Sipas pishinës" përditësohet sipas <strong className="text-white font-bold">ditës së zgjedhur</strong> në kalendar.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-section 1: GJITHSEJ NË TRE PISHINAT (STATUSI) */}
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 bg-slate-900/40 backdrop-blur-md space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              GJITHSEJ NË TRE PISHINAT (STATUSI)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pa përsëritje personash; numrat vlejnë për të gjitha ditët, jo vetëm për datën e zgjedhur në kalendar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: AKTIV */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase text-slate-300 tracking-wider font-mono">AKTIV</span>
              </div>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">0</span>
            </div>

            {/* Card 2: NË SKADIM */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase text-slate-300 tracking-wider font-mono">NË SKADIM</span>
              </div>
              <span className="text-3xl font-extrabold text-amber-400 font-mono">0</span>
            </div>
          </div>
        </div>

        {/* Sub-section 2: SIPAS PISHINËS (SIPAS DATËS NË KALENDAR) */}
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 bg-slate-900/40 backdrop-blur-md space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              SIPAS PISHINËS (SIPAS DATËS NË KALENDAR)
            </h3>
            <p className="text-xs font-extrabold text-indigo-300 uppercase tracking-wide mt-1 font-mono">
              {formattedDayName} · {formattedDateString}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Pishina me 4 korsi', id: 'pishina_4' },
              { name: 'Pishina me 5 korsi', id: 'pishina_5' },
              { name: 'Pishinat e vogla', id: 'pishina_vogla' },
            ].map((pool) => (
              <div
                key={pool.id}
                className="p-5 rounded-3xl bg-slate-900/80 border border-indigo-500/20 space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <h3 className="font-cal font-bold text-base text-white">{pool.name}</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Aktiv (në orar)</span>
                    </div>
                    <span className="font-bold font-mono text-emerald-400 text-sm">0</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Në skadim (në orar)</span>
                    </div>
                    <span className="font-bold font-mono text-amber-400 text-sm">0</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Bookmark className="w-4 h-4 text-blue-400" />
                      <span>Rezervuar (këtë datë)</span>
                    </div>
                    <span className="font-bold font-mono text-blue-400 text-sm">0</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CalendarDays className="w-4 h-4 text-orange-400" />
                      <span>FILL / RIFILL</span>
                    </div>
                    <span className="font-bold font-mono text-orange-400 text-sm">0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
