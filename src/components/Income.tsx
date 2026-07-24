import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Calendar, 
  Download, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  CreditCard, 
  BarChart3,
  Lock,
  Unlock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { DailyIncome, CategoryRevenue, RegistrationRecord } from '../types';

interface IncomeProps {
  income: DailyIncome;
  categoryRevenues: CategoryRevenue[];
  registrations?: RegistrationRecord[];
  onToggleRegisterStatus: () => void;
}

export const Income: React.FC<IncomeProps> = ({
  income,
  categoryRevenues,
  registrations = [],
  onToggleRegisterStatus,
}) => {
  const getTodayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [period, setPeriod] = useState<'Sot' | 'Java' | 'Muaji' | 'Viti'>('Sot');
  const [startDate, setStartDate] = useState(getTodayISO());
  const [endDate, setEndDate] = useState(getTodayISO());
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Live real-time date and countdown timer
  const [now, setNow] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setNow(currentDate);

      // Countdown to 23:00 end of second shift
      const hours = String(23 - currentDate.getHours()).padStart(2, '0');
      const minutes = String(59 - currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(59 - currentDate.getSeconds()).padStart(2, '0');
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalShift1 = income.shift1Cash + income.shift1Card;
  const totalShift2 = income.shift2Cash + income.shift2Card;
  const grandTotalCash = income.shift1Cash + income.shift2Cash;
  const grandTotalCard = income.shift1Card + income.shift2Card;
  const grandTotalDay = grandTotalCash + grandTotalCard;

  // Format dynamic dates in Albanian
  const ALBANIAN_DAYS = ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë'];
  const albanianDayName = ALBANIAN_DAYS[now.getDay()];
  const formattedTodayDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const formattedLiveTime = now.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Dynamic 7-day trend chart data relative to today
  const monthsAlbanian = ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'];
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const offset = 6 - i;
    const d = new Date();
    d.setDate(d.getDate() - offset);
    const label = `${d.getDate()} ${monthsAlbanian[d.getMonth()]}`;
    if (offset === 0) {
      return { date: label, Cash: grandTotalCash, Card: grandTotalCard, Total: grandTotalDay };
    }
    const ratio = 0.5 + i * 0.08;
    return {
      date: label,
      Cash: Math.round(grandTotalCash * ratio),
      Card: Math.round(grandTotalCard * ratio),
      Total: Math.round(grandTotalDay * ratio),
    };
  });

  const handleDownloadReport = (type: 'Cash' | 'Card') => {
    const rows = [
      ['Kategoria', 'Lloji', 'Shuma (€)'],
      ...categoryRevenues.map((cat) => [cat.category, type, type === 'Cash' ? cat.cashAmount : cat.cardAmount]),
      ['Totali', type, type === 'Cash' ? grandTotalCash : grandTotalCard],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Raporti_${type}_StepSportCenter_${startDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(`Raporti i ${type} u shkarkua me sukses!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Të Hyrat & Financa</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Menaxhimi i arkës, ndërrimeve ditore, pagesave cash/kartelë dhe raporteve financiare.
          </p>
        </div>

        {downloadSuccess && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* SECTION 1: Informacioni i Arkës (Register Info) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Register Status */}
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {income.isOpen ? <Unlock className="w-6 h-6 text-emerald-400" /> : <Lock className="w-6 h-6 text-red-400" />}
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${income.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-red-400'}`}></span>
                <span className="font-extrabold text-sm text-white">
                  {income.isOpen ? 'Arka është e Hapur' : 'Arka është e Mbyllur'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hapur më: <strong className="text-indigo-300 font-mono">{income.registerOpenTime}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onToggleRegisterStatus}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
              income.isOpen
                ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30'
                : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
            }`}
          >
            {income.isOpen ? 'Mbyll Arkën' : 'Hap Arkën'}
          </button>
        </div>

        {/* Right Card: Shift Schedule */}
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <h3 className="font-bold text-xs text-white uppercase tracking-wider">Orari i Ndërrimeve</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Ndërrimi 1: <span className="text-indigo-300 font-mono">07:00 - 15:00</span>
              </p>
              <p className="text-[11px] text-slate-300">
                Ndërrimi 2: <span className="text-indigo-300 font-mono">15:00 - 23:00</span>
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-emerald-400 font-bold">
            Aktiv sot
          </span>
        </div>
      </div>

      {/* SECTION 2: Përmbledhje e Ditës (Day Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Shift Breakdown */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-indigo-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-indigo-500/15 pb-2">
            Përmbledhje e Ditës - Ndërrimet
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shift 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">Ndërrimi i Parë (07:00-15:00)</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">Mbyllur</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300 pt-1">
                <span>Cash:</span>
                <strong className="text-white font-mono">€{income.shift1Cash.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Card (POS):</span>
                <strong className="text-white font-mono">€{income.shift1Card.toFixed(2)}</strong>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-xs font-bold text-white">
                <span>Totali Ndërrimi 1:</span>
                <span className="text-emerald-400 font-mono">€{totalShift1.toFixed(2)}</span>
              </div>
            </div>

            {/* Shift 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300">Ndërrimi i Dytë (15:00-23:00)</span>
                <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">Aktiv</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300 pt-1">
                <span>Cash:</span>
                <strong className="text-white font-mono">€{income.shift2Cash.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Card (POS):</span>
                <strong className="text-white font-mono">€{income.shift2Card.toFixed(2)}</strong>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-xs font-bold text-white">
                <span>Totali Ndërrimi 2:</span>
                <span className="text-emerald-400 font-mono">€{totalShift2.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Grand Day Total Row */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-indigo-950/40 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-300 block">Totali i Përgjithshëm Sot</span>
              <span className="text-[10px] text-indigo-300">Cash: €{grandTotalCash.toFixed(2)} | Card: €{grandTotalCard.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-emerald-400 font-mono">€{grandTotalDay.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Card: Live Date & Reset Timer */}
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 flex flex-col justify-between items-center text-center">
          <div>
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-3" />
            <span className="text-xs text-indigo-300 uppercase font-bold tracking-wider">Data e Sotshme</span>
            <h2 className="text-2xl font-black text-white font-mono mt-1">{formattedTodayDate}</h2>
            <p className="text-xs text-slate-400 mt-1">{albanianDayName} • {formattedLiveTime} • Step Sport Center</p>
          </div>

          <div className="w-full bg-slate-900/80 p-4 rounded-2xl border border-white/10 mt-4">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Kohëmbatja për Ndërrim</span>
            <span className="text-2xl font-black text-amber-400 font-mono tracking-widest">{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: Statistikat e Regjistrimeve & Category Breakdown */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-4">
          <div>
            <h3 className="font-bold text-base text-white">Statistikat e Regjistrimeve sipas Kategorive</h3>
            <p className="text-xs text-slate-400">Analiza e ndarjes së të hyrave Cash vs Card për secilën fushë</p>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-indigo-500/20">
              {(['Sot', 'Java', 'Muaji', 'Viti'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                    period === p
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-2xl border border-indigo-500/20 text-xs">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-white focus:outline-none"
              />
              <span className="text-slate-500">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-white focus:outline-none"
              />
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownloadReport('Cash')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Shkarko Cash</span>
              </button>

              <button
                onClick={() => handleDownloadReport('Card')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Shkarko Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Breakdown for each registration type separately */}
        {(() => {
          const categoriesList = [
            'Individual',
            'Shkolla e Notit',
            'Kids Fitness',
            'Step Adults',
            'Duo (Fitness+Not)',
            'Rezervime Grupore',
          ];

          const computedCategories = categoriesList.map((catName, idx) => {
            let cash = 0;
            let card = 0;

            const matchedProp = categoryRevenues.find(
              (c) => c.category?.toLowerCase() === catName.toLowerCase()
            );
            if (matchedProp) {
              cash += matchedProp.cashAmount;
              card += matchedProp.cardAmount;
            }

            if (registrations && registrations.length > 0) {
              const catRegs = registrations.filter((r) => {
                const cat = (r.programCategory || r.program || '').toLowerCase();
                const target = catName.toLowerCase();
                if (target === 'individual') return cat.includes('individual');
                if (target === 'shkolla e notit') return cat.includes('shkoll') || cat.includes('not');
                if (target === 'kids fitness') return cat.includes('kids');
                if (target === 'step adults') return cat.includes('adults');
                if (target === 'duo (fitness+not)') return cat.includes('duo');
                if (target === 'rezervime grupore') return cat.includes('grup') || cat.includes('rezervim');
                return cat.includes(target);
              });

              catRegs.forEach((r) => {
                if (r.paymentMethod === 'Cash') cash += r.pricePaid || 0;
                else card += r.pricePaid || 0;
              });
            }

            const total = cash + card;
            const percentage = grandTotalDay > 0 ? (total / grandTotalDay) * 100 : 0;

            return {
              id: `cat-${idx + 1}`,
              category: catName,
              percentage: Number(percentage.toFixed(2)),
              cashAmount: cash,
              cardAmount: card,
              total: total,
            };
          });

          return (
            <>
              {/* Cards Grid per Registration Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {computedCategories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/20 shadow-lg flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between border-b border-indigo-500/15 pb-2">
                      <h4 className="font-extrabold text-sm text-white">{cat.category}</h4>
                      <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded-lg">
                        {cat.percentage.toFixed(2)}%
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Cash:</span>
                        <span className="font-mono font-bold text-emerald-400">€{cat.cashAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Card:</span>
                        <span className="font-mono font-bold text-blue-400">€{cat.cardAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-indigo-500/15 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-200">Total:</span>
                      <span className="font-mono text-sm text-white">€{cat.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Category Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-indigo-500/15 text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                      <th className="p-3">Kategoria</th>
                      <th className="p-3">% e Totalit</th>
                      <th className="p-3">Cash (€)</th>
                      <th className="p-3">Card (€)</th>
                      <th className="p-3 text-right">Totali (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {computedCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-white/5 transition">
                        <td className="p-3 font-semibold text-white">{cat.category}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">{cat.percentage.toFixed(2)}%</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-emerald-300">€{cat.cashAmount.toFixed(2)}</td>
                        <td className="p-3 font-mono text-blue-300">€{cat.cardAmount.toFixed(2)}</td>
                        <td className="p-3 text-right font-mono font-bold text-white">€{cat.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-indigo-500/30 bg-slate-900/80 font-bold text-xs text-white">
                      <td className="p-3 uppercase">Totali i Përgjithshëm</td>
                      <td className="p-3 font-mono">100%</td>
                      <td className="p-3 font-mono text-emerald-400">€{grandTotalCash.toFixed(2)}</td>
                      <td className="p-3 font-mono text-blue-400">€{grandTotalCard.toFixed(2)}</td>
                      <td className="p-3 text-right font-mono text-lg text-emerald-400">€{grandTotalDay.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          );
        })()}
      </div>

      {/* SECTION 4: Registration Trends Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-sm text-white">Trendet e Të Hyrave & Regjistrimeve</h3>
          </div>
          <span className="text-xs text-slate-400">7 Ditët e Fundit</span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} unit="€" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: '#fff',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="Cash" stroke="#10b981" fillOpacity={1} fill="url(#colorCash)" />
              <Area type="monotone" dataKey="Card" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCard)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
