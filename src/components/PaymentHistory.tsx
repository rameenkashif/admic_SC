import React, { useMemo, useState } from 'react';
import { Wallet, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Lock, LockOpen } from 'lucide-react';
import { PaymentDay } from '../types';

// Mock dataset matching the reference screenshots (31 days ending 7/27/2026)
const buildMockPaymentDays = (): PaymentDay[] => {
  const days: PaymentDay[] = [];
  const anchor = new Date(2026, 6, 27); // 7/27/2026

  for (let i = 0; i < 31; i++) {
    const d = new Date(anchor);
    d.setDate(anchor.getDate() - i);
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    const id = `pd-${dateStr.replace(/\//g, '-')}`;

    // Only 7/26/2026 has sample payment entries, matching the reference data
    const payments =
      i === 1
        ? [
            { id: `${id}-1`, name: 'Gilles Stern', idNumber: '06323083', type: 'Individual', amount: 60, time: '4:00:14 PM' },
            { id: `${id}-2`, name: 'Ajan Arben Gashi', idNumber: '044755550', type: 'Individual', amount: 35, time: '3:10:58 PM' },
            { id: `${id}-3`, name: 'Gilles Stern', idNumber: '06323083', type: 'Shkolla e Notit', amount: 60, time: '4:00:14 PM' },
            { id: `${id}-4`, name: 'Ajan Arben Gashi', idNumber: '044755550', type: 'Shkolla e Notit', amount: 35, time: '3:10:58 PM' },
            { id: `${id}-5`, name: 'Gilles Stern', idNumber: '06323083', type: 'Rezervime Grupore', amount: 60, time: '4:00:14 PM' },
            { id: `${id}-6`, name: 'Ajan Arben Gashi', idNumber: '044755550', type: 'Rezervime Grupore', amount: 35, time: '3:10:58 PM' },
          ]
        : [];

    days.push({
      id,
      date: dateStr,
      registerStatus: i === 0 ? 'Arka e Hapur' : 'Arka e Mbyllur',
      payments,
    });
  }

  return days;
};

const MOCK_PAYMENT_DAYS = buildMockPaymentDays();

export const PaymentHistory: React.FC = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({
    [MOCK_PAYMENT_DAYS[0].id]: true, // 7/27/2026
    [MOCK_PAYMENT_DAYS[1].id]: true, // 7/26/2026
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleDay = (id: string) => {
    setExpandedDays((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredDays = useMemo(() => {
    let days = MOCK_PAYMENT_DAYS;

    if (dateFrom) {
      const from = new Date(dateFrom);
      days = days.filter((d) => new Date(d.date) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      days = days.filter((d) => new Date(d.date) <= to);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      days = days
        .map((d) => ({
          ...d,
          payments: d.payments.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.idNumber.toLowerCase().includes(q)
          ),
        }))
        .filter((d) => d.payments.length > 0);
    }

    return days;
  }, [dateFrom, dateTo, searchTerm]);

  const totalPages = Math.ceil(filteredDays.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDays = filteredDays.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Main Glass Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-slate-900/60 backdrop-blur-xl space-y-6 shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center gap-3 border-b border-indigo-500/15 pb-6">
          <Wallet className="w-8 h-8 text-indigo-400 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Historia e Pagesës
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Regjistri ditor i të gjitha pagesave dhe statusi i arkës për secilën ditë.
            </p>
          </div>
        </div>

        {/* Filters Bar: From / To / Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-400/60 shadow-inner"
            />
          </div>

          <div className="flex-1">
            <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5">To:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-400/60 shadow-inner"
            />
          </div>

          <div className="flex-[1.5] relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email, or phone..."
              className="w-full bg-slate-950/90 border border-indigo-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60 shadow-inner"
            />
          </div>
        </div>

        {/* Date Groups */}
        {currentDays.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-bold bg-slate-950/40 rounded-2xl border border-indigo-500/15">
            Nuk u gjet asnjë rezultat.
          </div>
        ) : (
          <div className="space-y-3">
            {currentDays.map((day) => {
              const isExpanded = Boolean(expandedDays[day.id]);
              const isOpenRegister = day.registerStatus === 'Arka e Hapur';

              return (
                <div
                  key={day.id}
                  className="rounded-2xl border border-indigo-500/20 bg-slate-950/50 overflow-hidden shadow-lg"
                >
                  {/* Day Header */}
                  <button
                    type="button"
                    onClick={() => toggleDay(day.id)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 transition-colors ${
                      isExpanded ? 'bg-indigo-500/15' : 'bg-slate-900/60 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-indigo-300" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm font-black text-white tracking-tight">{day.date}</span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border ${
                        isOpenRegister
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                      }`}
                    >
                      {isOpenRegister ? <LockOpen className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      {day.registerStatus}
                    </span>
                  </button>

                  {/* Day Content */}
                  {isExpanded && (
                    <div className="p-4 border-t border-indigo-500/10">
                      {day.payments.length === 0 ? (
                        <p className="text-xs text-slate-400 font-medium py-2 px-1">
                          No payments for this date
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                          {day.payments.map((payment) => (
                            <div
                              key={payment.id}
                              className="bg-slate-900/70 border border-indigo-500/15 rounded-xl p-4 space-y-1"
                            >
                              <p className="text-sm font-black text-white">{payment.name}</p>
                              <p className="text-[11px] font-mono text-indigo-300">{payment.idNumber}</p>
                              <p className="text-xs text-slate-300">
                                <span className="font-bold text-slate-400">Type:</span> {payment.type}
                              </p>
                              <p className="text-xs text-slate-300">
                                <span className="font-bold text-slate-400">Amount:</span>{' '}
                                <span className="font-black text-emerald-400">{payment.amount}€</span>
                              </p>
                              <p className="text-xs text-slate-300">
                                <span className="font-bold text-slate-400">Time:</span> {payment.time}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-indigo-500/15 text-xs text-slate-400">
          <div>
            Po tregohen <span className="font-bold text-white">{startIndex + 1}</span> -{' '}
            <span className="font-bold text-white">
              {Math.min(startIndex + itemsPerPage, filteredDays.length)}
            </span>{' '}
            nga <span className="font-bold text-white">{filteredDays.length}</span> ditë
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-bold transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="px-3.5 py-1.5 text-slate-300 font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-bold transition flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
