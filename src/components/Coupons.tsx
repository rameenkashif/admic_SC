import React, { useEffect, useState } from 'react';
import { Ticket, Printer, FileBarChart, FileText, RefreshCw } from 'lucide-react';
import { Coupon } from '../types';

const pad = (n: number, len = 2) => String(n).padStart(len, '0');

const formatDateTime = (d: Date) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}, ${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}:${pad(d.getSeconds())}`;

const formatFileStamp = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(
    d.getMinutes()
  )}${pad(d.getSeconds())}${pad(d.getMilliseconds(), 3)}`;

// Mock dataset matching the reference screenshots
const INITIAL_COUPONS: Coupon[] = [
  { id: 'c-2441', date: '29/07/2026, 00:06:23', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 14, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2441_20260728190624952.inp' },
  { id: 'c-2439', date: '28/07/2026, 23:39:11', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 10, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2439_20260728183913226.inp' },
  { id: 'c-2438', date: '28/07/2026, 23:04:11', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 6, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2438_20260728180413391.inp' },
  { id: 'c-2435', date: '28/07/2026, 22:55:10', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 6, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2435_20260728175512279.inp' },
  { id: 'c-2434', date: '28/07/2026, 22:54:15', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 6, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2434_20260728175417377.inp' },
  { id: 'c-2432', date: '28/07/2026, 22:31:27', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 6, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2432_20260728173129319.inp' },
  { id: 'c-2429', date: '28/07/2026, 22:00:31', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 7, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2429_20260728170033152.inp' },
  { id: 'c-2428', date: '28/07/2026, 21:59:53', lloji: 'Paradhenje', pershkrimi: '-', partneri: 'Kkliente qytetare', vlera: 20, adresa: '1#Prishtinë, 10000, Rr. NN', file: 'receipt_2428_20260728165954748.inp' },
];

let nextCouponNumber = 2442;

export const Coupons: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [lloji, setLloji] = useState('Paradhenje');
  const [pershkrimi, setPershkrimi] = useState('');
  const [partneri, setPartneri] = useState('Kkliente qytetare');
  const [vlera, setVlera] = useState('0.01');
  const [adresa, setAdresa] = useState('1#Prishtinë, 10000, Rr. NN');

  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [shiftCounter, setShiftCounter] = useState(47);

  // Live-updating clock for the DATE field, matching the reference form
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const latestCoupon = coupons[0];

  const handlePrintAndSave = () => {
    const createdAt = new Date();
    const couponNumber = nextCouponNumber++;
    const newCoupon: Coupon = {
      id: `c-${couponNumber}`,
      date: formatDateTime(createdAt),
      lloji: lloji || '-',
      pershkrimi: pershkrimi.trim() || '-',
      partneri: partneri || '-',
      vlera: parseFloat(vlera) || 0,
      adresa: adresa || '-',
      file: `receipt_${couponNumber}_${formatFileStamp(createdAt)}.inp`,
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    setPershkrimi('');
  };

  const handleGenerateReport = (kind: 'X' | 'Z') => {
    const createdAt = new Date();
    const shift = shiftCounter + 1;
    setShiftCounter(shift);

    // Flink fiscal command format: <X|Z>,<register>,______,_,__;
    const content = `${kind},1,______,_,__;\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${kind === 'X' ? 'x_report' : 'z_report'}_shift_${shift}_${formatFileStamp(createdAt)}.inp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Main Glass Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-slate-900/60 backdrop-blur-xl space-y-8 shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center gap-3 border-b border-indigo-500/15 pb-6">
          <Ticket className="w-8 h-8 text-indigo-400 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Kuponi</h1>
            <p className="text-xs text-slate-400 mt-1">
              Only the required manual fields are shown below. Files are downloaded automatically.
            </p>
          </div>
        </div>

        {/* Manual Flink Coupon: Form + Latest Coupon */}
        <div>
          <h2 className="text-lg font-black text-white tracking-tight mb-4">Manual Flink Coupon</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 bg-slate-950/50 border border-indigo-500/20 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    1. DATE
                  </label>
                  <input
                    type="text"
                    value={formatDateTime(now)}
                    readOnly
                    className="w-full bg-slate-900/70 border border-indigo-500/15 rounded-2xl px-4 py-2.5 text-xs text-slate-300 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    2. Lloji
                  </label>
                  <input
                    type="text"
                    value={lloji}
                    onChange={(e) => setLloji(e.target.value)}
                    className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-400/60 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    3. Pershkrimi
                  </label>
                  <input
                    type="text"
                    value={pershkrimi}
                    onChange={(e) => setPershkrimi(e.target.value)}
                    placeholder="Optional"
                    className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/60 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    4. Partneri
                  </label>
                  <input
                    type="text"
                    value={partneri}
                    onChange={(e) => setPartneri(e.target.value)}
                    className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-400/60 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    5. Vlera
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={vlera}
                    onChange={(e) => setVlera(e.target.value)}
                    className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-400/60 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    6. Adresa
                  </label>
                  <input
                    type="text"
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                    className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-400/60 shadow-inner"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrintAndSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Print & Save INP</span>
              </button>
            </div>

            {/* Latest Coupon */}
            <div className="bg-slate-950/50 border border-indigo-500/20 rounded-2xl p-5 sm:p-6 space-y-3">
              <h3 className="text-sm font-black text-white tracking-tight mb-2">Latest Coupon</h3>
              {latestCoupon ? (
                <div className="space-y-2 text-xs text-slate-300">
                  <p><span className="font-bold text-slate-400">Date:</span> <span className="font-mono">{latestCoupon.date}</span></p>
                  <p><span className="font-bold text-slate-400">Lloji:</span> {latestCoupon.lloji}</p>
                  <p><span className="font-bold text-slate-400">Pershkrimi:</span> {latestCoupon.pershkrimi}</p>
                  <p><span className="font-bold text-slate-400">Partneri:</span> {latestCoupon.partneri}</p>
                  <p><span className="font-bold text-slate-400">Vlera:</span> <span className="font-black text-emerald-400">{latestCoupon.vlera} EUR</span></p>
                  <p><span className="font-bold text-slate-400">Adresa:</span> {latestCoupon.adresa}</p>
                  <p className="break-all"><span className="font-bold text-slate-400">Flink File:</span> <span className="font-mono text-indigo-300">{latestCoupon.file}</span></p>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Ende nuk ka kupon të krijuar.</p>
              )}
            </div>
          </div>
        </div>

        {/* Flink Reports */}
        <div className="border-t border-indigo-500/15 pt-6">
          <h2 className="text-lg font-black text-white tracking-tight">Flink Reports</h2>
          <p className="text-xs text-slate-400 mt-1 mb-4">Generate X and Z command files for Flink.</p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleGenerateReport('X')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-indigo-500/20 transition active:scale-95"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Generate X-Report</span>
            </button>

            <button
              type="button"
              onClick={() => handleGenerateReport('Z')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-indigo-500/20 transition active:scale-95"
            >
              <FileBarChart className="w-4 h-4 text-emerald-400" />
              <span>Generate Z-Report</span>
            </button>
          </div>
        </div>

        {/* Created Coupons Table */}
        <div className="border-t border-indigo-500/15 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-white tracking-tight">Created Coupons</h2>
            <button
              type="button"
              onClick={() => setCoupons((prev) => [...prev])}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-indigo-500/20 transition active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-indigo-500/20 bg-slate-950/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-indigo-500/20 bg-indigo-950/40 text-indigo-200 font-extrabold uppercase">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Lloji</th>
                  <th className="py-3 px-4">Pershkrimi</th>
                  <th className="py-3 px-4">Partneri</th>
                  <th className="py-3 px-4">Vlera</th>
                  <th className="py-3 px-4">Adresa</th>
                  <th className="py-3 px-4">File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500/10 text-slate-300">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-indigo-900/10 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-300 whitespace-nowrap">{c.date}</td>
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">{c.lloji}</td>
                    <td className="py-3 px-4 text-slate-400">{c.pershkrimi}</td>
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">{c.partneri}</td>
                    <td className="py-3 px-4 font-black text-emerald-400">{c.vlera}</td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{c.adresa}</td>
                    <td className="py-3 px-4 font-mono text-indigo-300 whitespace-nowrap">{c.file}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
