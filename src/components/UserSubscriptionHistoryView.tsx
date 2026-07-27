import React, { useState } from 'react';
import { 
  Search, 
  History, 
  Printer, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  User,
  CreditCard,
  QrCode,
  ExternalLink
} from 'lucide-react';
import { UserSubscriptionHistory, SubscriptionHistoryEvent } from '../types';

// Sample dataset matching the user screenshot
const mockSubscriptionUsers: UserSubscriptionHistory[] = [
  {
    id: 'sub-1',
    name: 'Malza Hasani',
    rfid: '0009629824',
    subscriptionPlan: 'Shkolla e Notit',
    scansThisMonth: 0,
    events: [
      {
        id: 'ev-1',
        action: 'Abonimi i parë',
        date: '26.07.2026',
        payableAmount: 45,
        scanDetails: 'Asnjë skanim i gjetur për këtë periudhë.',
      }
    ],
  },
  {
    id: 'sub-2',
    name: 'Tirana Hasani',
    rfid: '0010176555',
    subscriptionPlan: 'Shkolla e Notit',
    scansThisMonth: 0,
    events: [
      {
        id: 'ev-2',
        action: 'Abonimi i parë',
        date: '26.07.2026',
        payableAmount: 45,
        scanDetails: 'Asnjë skanim i gjetur për këtë periudhë.',
      }
    ],
  },
  {
    id: 'sub-3',
    name: 'Gilles Stern',
    rfid: '0009645491',
    subscriptionPlan: 'Individual',
    scansThisMonth: 0,
    events: [
      {
        id: 'ev-3',
        action: 'Abonimi i parë',
        date: '20.07.2026',
        payableAmount: 60,
        scanDetails: 'Skanim në Receptcion #1 (21.07.2026 14:20)',
      }
    ],
  },
  {
    id: 'sub-4',
    name: 'Ajan Arben Gashi',
    rfid: '0008812304',
    subscriptionPlan: 'Shkolla e Notit',
    scansThisMonth: 1,
    events: [
      {
        id: 'ev-4',
        action: 'Rinovim Abonimi',
        date: '15.07.2026',
        payableAmount: 45,
        scanDetails: 'Skanim i suksesshëm me RFID #0008812304',
      }
    ],
  },
  {
    id: 'sub-5',
    name: 'Amasja Abazi',
    rfid: '0007739182',
    subscriptionPlan: 'Kids Fitness + Not',
    scansThisMonth: 0,
    events: [
      {
        id: 'ev-5',
        action: 'Abonimi i parë',
        date: '10.07.2026',
        payableAmount: 50,
        scanDetails: 'Asnjë skanim i gjetur për këtë periudhë.',
      }
    ],
  },
  {
    id: 'sub-6',
    name: 'Ador Ruqi',
    rfid: '0006629104',
    subscriptionPlan: 'Ekipa e Parë',
    scansThisMonth: 5,
    events: [
      {
        id: 'ev-6',
        action: 'Pagesë Mujore',
        date: '01.07.2026',
        payableAmount: 130,
        scanDetails: '5 skanime të regjistruara gjatë muajit.',
      }
    ],
  },
  {
    id: 'sub-7',
    name: 'Drilon Kryeziu',
    rfid: '0005519283',
    subscriptionPlan: 'Individual 3 Mujor',
    scansThisMonth: 4,
    events: [
      {
        id: 'ev-7',
        action: 'Rinovim 3 Mujor',
        date: '05.06.2026',
        payableAmount: 150,
        scanDetails: '4 skanime këtë muaj.',
      }
    ],
  },
  {
    id: 'sub-8',
    name: 'Elsa Berisha',
    rfid: '0004419201',
    subscriptionPlan: 'Shkolla e Notit',
    scansThisMonth: 0,
    events: [
      {
        id: 'ev-8',
        action: 'Abonimi i parë',
        date: '18.07.2026',
        payableAmount: 45,
        scanDetails: 'Asnjë skanim i gjetur për këtë periudhë.',
      }
    ],
  },
  {
    id: 'sub-9',
    name: 'Blend Hoxha',
    rfid: '0003310291',
    subscriptionPlan: 'Step Adults Fitness',
    scansThisMonth: 8,
    events: [
      {
        id: 'ev-9',
        action: 'Pagesë Mujore',
        date: '02.07.2026',
        payableAmount: 55,
        scanDetails: '8 skanime gjatë korrikut.',
      }
    ],
  },
  {
    id: 'sub-10',
    name: 'Lea Morina',
    rfid: '0002219482',
    subscriptionPlan: 'Duo Fitness + Not',
    scansThisMonth: 3,
    events: [
      {
        id: 'ev-10',
        action: 'Abonimi i parë',
        date: '12.07.2026',
        payableAmount: 80,
        scanDetails: '3 skanime në sallë / pishinë.',
      }
    ],
  },
  {
    id: 'sub-11',
    name: 'Lorik Gashi',
    rfid: '0001192834',
    subscriptionPlan: 'Individual',
    scansThisMonth: 0,
    events: [
      {
        id: 'ev-11',
        action: 'Abonimi i parë',
        date: '22.07.2026',
        payableAmount: 60,
        scanDetails: 'Asnjë skanim i gjetur për këtë periudhë.',
      }
    ],
  },
  {
    id: 'sub-12',
    name: 'Diellza Zeqiri',
    rfid: '0009918273',
    subscriptionPlan: 'Shkolla e Notit',
    scansThisMonth: 1,
    events: [
      {
        id: 'ev-12',
        action: 'Rinovim Abonimi',
        date: '19.07.2026',
        payableAmount: 45,
        scanDetails: '1 skanim i regjistruar.',
      }
    ],
  },
];

export const UserSubscriptionHistoryView: React.FC = () => {
  const [userList] = useState<UserSubscriptionHistory[]>(mockSubscriptionUsers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Expanded card tracking
  const [expandedUserIds, setExpandedUserIds] = useState<Record<string, boolean>>({
    'sub-1': true, // Expand first item by default
  });

  // Modal state for screenshot 2 history view
  const [selectedUser, setSelectedUser] = useState<UserSubscriptionHistory | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleExpandUser = (id: string) => {
    setExpandedUserIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter users based on search query
  const filteredUsers = userList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.rfid.includes(searchTerm) ||
      u.subscriptionPlan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecords = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrint = (userToPrint?: UserSubscriptionHistory) => {
    if (userToPrint) {
      setSelectedUser(userToPrint);
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  const handleDownload = (user: UserSubscriptionHistory) => {
    // Generate text/csv data for download
    const content = `STEP SPORT CENTER - Historia e Abonimit\nPërdoruesi: ${user.name}\nRFID: ${user.rfid}\nAbonimi: ${user.subscriptionPlan}\nSkanime këtë muaj: ${user.scansThisMonth}\n\nVEPRIMI | DATA | SHUMA (€) | DETAJET E SKANIMEVE\n` + 
      user.events.map(ev => `${ev.action} | ${ev.date} | ${ev.payableAmount}€ | ${ev.scanDetails}`).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Historia_Abonimit_${user.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Print Styles for Native Browser Printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible !important;
          }
          #printable-receipt {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
            color: black !important;
            padding: 30px !important;
            margin: 0 !important;
            z-index: 999999 !important;
          }
        }
      `}</style>

      {/* Printable Receipt element targeting window.print() */}
      <div id="printable-receipt" className="hidden print:block text-slate-900 bg-white">
        {(selectedUser || currentRecords[0]) && (() => {
          const u = selectedUser || currentRecords[0];
          return (
            <div className="max-w-2xl mx-auto space-y-6 border border-slate-300 p-8 rounded-2xl shadow-sm">
              <div className="text-center border-b border-slate-300 pb-4">
                <h1 className="text-2xl font-black text-slate-900">STEP SPORT CENTER</h1>
                <p className="text-sm font-semibold text-slate-600">Historia e Abonimit të Përdoruesit</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-800">
                <div>
                  <p><strong>Përdoruesi:</strong> {u.name}</p>
                  <p><strong>RFID:</strong> {u.rfid}</p>
                </div>
                <div>
                  <p><strong>Abonimi:</strong> {u.subscriptionPlan}</p>
                  <p><strong>Skanime këtë muaj:</strong> {u.scansThisMonth}</p>
                </div>
              </div>
              <table className="w-full text-left border-collapse border border-slate-300 text-xs mt-4">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
                    <th className="p-2.5 border-r border-slate-300">Veprimi</th>
                    <th className="p-2.5 border-r border-slate-300">Data</th>
                    <th className="p-2.5 border-r border-slate-300">Shuma (€)</th>
                    <th className="p-2.5">Detajet e Skanimeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {u.events.map((ev) => (
                    <tr key={ev.id} className="border-b border-slate-200">
                      <td className="p-2.5 border-r border-slate-200 font-bold">{ev.action}</td>
                      <td className="p-2.5 border-r border-slate-200 font-mono">{ev.date}</td>
                      <td className="p-2.5 border-r border-slate-200 font-black text-emerald-700">{ev.payableAmount}€</td>
                      <td className="p-2.5 text-slate-600">{ev.scanDetails}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center pt-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
                Faleminderit që përdorni Step Sport Center!
              </div>
            </div>
          );
        })()}
      </div>

      {/* Main Glass Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-slate-900/60 backdrop-blur-xl space-y-6 shadow-2xl">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-6">
          <div className="flex items-center gap-3">
            <History className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Historia e Abonimit të Përdoruesit
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Regjistrat e historisë, skanimeve dhe abonimeve për secilin anëtar.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              placeholder="Kërko me emër ose RFID..."
              className="w-full bg-slate-900/90 border border-indigo-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60 shadow-inner"
            />
          </div>
        </div>

        {/* TOP-TO-BOTTOM SCROLLABLE BLOCKS (Matching messages page structure) */}
        {currentRecords.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-bold bg-slate-950/40 rounded-2xl border border-indigo-500/15">
            Nuk u gjet asnjë përdorues.
          </div>
        ) : (
          <div className="space-y-4">
            {currentRecords.map((user) => {
              const isExpanded = Boolean(expandedUserIds[user.id]);

              return (
                <div
                  key={user.id}
                  className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
                    isExpanded
                      ? 'border-indigo-400/40 bg-slate-950/80 shadow-2xl ring-1 ring-indigo-500/20'
                      : 'border-indigo-500/20 hover:border-indigo-400/30 bg-slate-950/50'
                  }`}
                >
                  {/* Block Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-4">
                    <div className="flex items-center gap-3">
                      <User className="w-6 h-6 text-indigo-400 shrink-0" />
                      <div>
                        <h2 className="text-xl font-black text-white tracking-tight">
                          {user.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-slate-400">RFID:</span>
                          <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-lg border border-indigo-500/30">
                            {user.rfid}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary Pills */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="bg-slate-900 border border-indigo-500/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
                        <span className="text-slate-400 font-semibold">Abonimi:</span>
                        <span className="text-indigo-300 font-extrabold">{user.subscriptionPlan}</span>
                      </div>

                      <div className="bg-slate-900 border border-indigo-500/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
                        <span className="text-slate-400 font-semibold">Skanime këtë muaj:</span>
                        <span className="text-white font-black">{user.scansThisMonth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details Block */}
                  {isExpanded && (
                    <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase text-indigo-300 tracking-wider flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-400" />
                          <span>Detajet e Eventeve dhe Skanimeve</span>
                        </h3>

                        {/* Direct Download/Print Buttons inside block */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownload(user)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-indigo-500/20 transition active:scale-95"
                            title="Shkarko detajet (TXT/CSV)"
                          >
                            <Download className="w-3.5 h-3.5 text-blue-400" />
                            <span>Shkarko</span>
                          </button>

                          <button
                            onClick={() => handlePrint(user)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/30 transition active:scale-95"
                            title="Printo ose Ruaj si PDF"
                          >
                            <Printer className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Printo / PDF</span>
                          </button>
                        </div>
                      </div>

                      {/* Event History Sub-table */}
                      <div className="overflow-x-auto rounded-2xl border border-indigo-500/20 bg-slate-900/80">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-indigo-500/20 bg-indigo-950/40 text-indigo-200 font-extrabold uppercase">
                              <th className="py-3 px-4">Veprimi</th>
                              <th className="py-3 px-4">Data</th>
                              <th className="py-3 px-4">Shuma e Pagueshme (€)</th>
                              <th className="py-3 px-4">Detajet e Skanimeve</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-indigo-500/10 text-slate-300">
                            {user.events.map((ev) => (
                              <tr key={ev.id} className="hover:bg-indigo-900/10 transition-colors">
                                <td className="py-3 px-4 font-bold text-white">{ev.action}</td>
                                <td className="py-3 px-4 text-slate-300 font-mono">{ev.date}</td>
                                <td className="py-3 px-4 font-black text-emerald-400 text-sm">
                                  {ev.payableAmount}€
                                </td>
                                <td className="py-3 px-4 text-slate-400 font-medium">
                                  {ev.scanDetails}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Controls: Expand Toggle & Open Full Modal Option */}
                  <div className="flex items-center justify-between pt-2 border-t border-indigo-500/10">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Hap dritaren e plotë</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleExpandUser(user.id)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 font-bold text-xs border border-blue-400/30 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Shiko më pak' : 'Historia e Eventeve (Shiko detajet)'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION CONTROLS AT BOTTOM (Matching Screenshot: E mëparshme | 1 | 2 | ... | 1702 | E ardhshme) */}
        {totalPages > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-indigo-500/15 text-xs text-slate-400">
            <div>
              Po tregohen <span className="font-bold text-white">{startIndex + 1}</span> -{' '}
              <span className="font-bold text-white">
                {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
              </span>{' '}
              nga <span className="font-bold text-white">{filteredUsers.length}</span> përdorues
            </div>

            {/* Pagination Navigation Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {/* E mëparshme (Previous) */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-bold transition flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>E mëparshme</span>
              </button>

              {/* Page Number Buttons: 1, 2, 3... */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition text-xs ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {totalPages > 5 && (
                <>
                  <span className="text-slate-500 font-black px-1">...</span>
                  <button
                    onClick={() => handlePageChange(1702)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition text-xs ${
                      currentPage === 1702
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    1702
                  </button>
                </>
              )}

              {/* E ardhshme (Next) */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-bold transition flex items-center gap-1"
              >
                <span>E ardhshme</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EVENT HISTORY MODAL (Matching overall website dark glass theme) */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900/95 text-white border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl backdrop-blur-xl relative animate-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="text-center pt-2">
              <h2 className="text-2xl font-black text-white tracking-tight">
                Historia për {selectedUser.name}
              </h2>
            </div>

            {/* Event History Table */}
            <div className="overflow-x-auto rounded-2xl border border-indigo-500/20 bg-slate-950/80">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-indigo-950/60 border-b border-indigo-500/20 text-indigo-200 font-extrabold uppercase">
                    <th className="py-3.5 px-4 text-center border-r border-indigo-500/20">Veprimi</th>
                    <th className="py-3.5 px-4 text-center border-r border-indigo-500/20">Data</th>
                    <th className="py-3.5 px-4 text-center border-r border-indigo-500/20">
                      Shuma e Pagueshme (€)
                    </th>
                    <th className="py-3.5 px-4 text-center">Detajet e Skanimeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-500/10 text-slate-300">
                  {selectedUser.events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-indigo-900/15 transition-colors">
                      <td className="py-4 px-4 font-bold text-white border-r border-indigo-500/10 text-center">
                        {ev.action}
                      </td>
                      <td className="py-4 px-4 border-r border-indigo-500/10 text-center text-slate-300 font-mono">
                        {ev.date}
                      </td>
                      <td className="py-4 px-4 border-r border-indigo-500/10 text-center font-black text-emerald-400 text-base">
                        {ev.payableAmount}€
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-center">
                        {ev.scanDetails}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Buttons: Mbyll and Printo matching website theme */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition active:scale-95"
              >
                Mbyll
              </button>

              <button
                type="button"
                onClick={() => handlePrint()}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Printo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

