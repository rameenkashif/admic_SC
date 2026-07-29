import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Mail, 
  History, 
  DollarSign, 
  Pencil, 
  Trash2, 
  X, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  Send,
  FileText
} from 'lucide-react';
import { AcademyStudent, AcademyPaymentHistoryItem } from '../types';

// Sample initial data for Academy students
const initialAcademyStudents: AcademyStudent[] = [
  {
    id: 'acad-1',
    name: 'Arion Budima',
    email: 'nora.ibishaga@gmail.com',
    email2: '',
    city: 'Prishtina',
    phone: '38344117003',
    phone2: '',
    shuma: 130,
    borxhi: 830,
    totali: 960,
    grupi: 'EKIPA E PARE',
    status: 'Inactive',
    description: 'Regjistrim në Akademinë e Notit - Ekipa e parë',
    paymentHistory: [
      {
        id: 'pay-1',
        title: 'PAGESA NË PRITJE',
        statusTag: 'NË PRITJE',
        amount: 830,
        date: '01/06/2026',
        time: '16:45:39',
        description: 'Pagesa për Arion Budima - Grupi EKIPA E PARE',
        paymentId: '2432269',
        sessionId: '1d0snj9qjh9un',
      },
      {
        id: 'pay-2',
        title: 'PAGESA NË PRITJE',
        statusTag: 'NË PRITJE',
        amount: 440,
        date: '02/12/2025',
        time: '17:38:39',
        description: 'Pagesa për Arion Budima - Grupi EKIPA E PARE',
        paymentId: '2001659',
        sessionId: '1r48nf3uerwjp',
      },
    ],
  },
  {
    id: 'acad-2',
    name: 'Dior Krasniqi',
    email: 'diorduadea@hotmail.com',
    email2: '',
    city: 'Prishtina',
    phone: '38349223344',
    phone2: '',
    shuma: 130,
    borxhi: 130,
    totali: 260,
    grupi: 'EKIPA E PARE',
    status: 'Inactive',
    description: 'Grupi A - Trajnim intensiv',
    paymentHistory: [
      {
        id: 'pay-3',
        title: 'PAGESA NË PRITJE',
        statusTag: 'NË PRITJE',
        amount: 130,
        date: '15/05/2026',
        time: '11:20:10',
        description: 'Pagesa për Dior Krasniqi - Grupi EKIPA E PARE',
        paymentId: '2498120',
        sessionId: '2a0x88f192aa',
      },
    ],
  },
  {
    id: 'acad-3',
    name: 'Edvin Spahiu',
    email: 'ardianks@gmail.com',
    email2: '',
    city: 'Prishtina',
    phone: '38345889900',
    phone2: '',
    shuma: 130,
    borxhi: 0,
    totali: 130,
    grupi: 'EKIPA E PARE',
    status: 'Inactive',
    description: 'Pagesë e rregullt mujore',
    paymentHistory: [
      {
        id: 'pay-4',
        title: 'PAGUAR CASH',
        statusTag: 'PAGUAR',
        amount: 130,
        date: '10/06/2026',
        time: '14:15:00',
        description: 'Pagesa me cash për Edvin Spahiu',
        paymentId: 'CASH-88219',
        sessionId: 'CASH-SES-001',
      }
    ],
  },
];

export const Academy: React.FC = () => {
  const [students, setStudents] = useState<AcademyStudent[]>(initialAcademyStudents);
  const [searchTerm, setSearchTerm] = useState('');

  // UI Modals / Expanded states
  const [activeHistoryStudentId, setActiveHistoryStudentId] = useState<string | null>(null);
  const [cashModalStudent, setCashModalStudent] = useState<AcademyStudent | null>(null);
  const [cashAmountInput, setCashAmountInput] = useState<string>('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<AcademyStudent | null>(null);
  
  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    email2: '',
    city: 'Prishtina',
    phone: '',
    phone2: '',
    shuma: '130',
    borxhi: '0',
    description: '',
    grupi: 'EKIPA E PARE' as 'EKIPA E PARE' | 'A' | 'B' | 'Gr/rr/20',
    status: 'Inactive' as 'Active' | 'Inactive',
  });

  // Calculate dynamic total in modal
  const parsedShuma = parseFloat(formData.shuma) || 0;
  const parsedBorxhi = parseFloat(formData.borxhi) || 0;
  const computedTotali = parsedShuma + parsedBorxhi;

  // Filter students
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      s.grupi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleOpenCreateModal = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      email2: '',
      city: 'Prishtina',
      phone: '',
      phone2: '',
      shuma: '130',
      borxhi: '0',
      description: '',
      grupi: 'EKIPA E PARE',
      status: 'Inactive',
    });
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (s: AcademyStudent) => {
    setEditingStudent(s);
    setFormData({
      name: s.name,
      email: s.email,
      email2: s.email2 || '',
      city: s.city || 'Prishtina',
      phone: s.phone,
      phone2: s.phone2 || '',
      shuma: s.shuma.toString(),
      borxhi: s.borxhi.toString(),
      description: s.description || '',
      grupi: s.grupi,
      status: s.status,
    });
    setIsFormOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const shumaVal = parseFloat(formData.shuma) || 0;
    const borxhiVal = parseFloat(formData.borxhi) || 0;
    const totaliVal = shumaVal + borxhiVal;

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? {
                ...s,
                name: formData.name,
                email: formData.email,
                email2: formData.email2,
                city: formData.city,
                phone: formData.phone,
                phone2: formData.phone2,
                shuma: shumaVal,
                borxhi: borxhiVal,
                totali: totaliVal,
                grupi: formData.grupi,
                status: formData.status,
                description: formData.description,
              }
            : s
        )
      );
      showToast(`U përditësuan të dhënat për ${formData.name}`);
    } else {
      const newStudent: AcademyStudent = {
        id: `acad-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        email2: formData.email2,
        city: formData.city,
        phone: formData.phone,
        phone2: formData.phone2,
        shuma: shumaVal,
        borxhi: borxhiVal,
        totali: totaliVal,
        grupi: formData.grupi,
        status: formData.status,
        description: formData.description,
        paymentHistory: [],
      };
      setStudents((prev) => [newStudent, ...prev]);
      showToast(`U shtua studenti i ri ${formData.name}`);
    }

    setIsFormOpen(false);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (window.confirm(`A jeni të sigurt që dëshironi të fshini studentin "${name}"?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`Studenti ${name} u fshi me sukses.`);
    }
  };

  // Cash payment modal handler
  const handleOpenCashModal = (s: AcademyStudent) => {
    setCashModalStudent(s);
    setCashAmountInput(s.totali.toString());
  };

  const handleConfirmCashPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashModalStudent) return;

    const paidAmount = parseFloat(cashAmountInput) || 0;
    if (paidAmount <= 0) return;

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB');
    const timeStr = today.toLocaleTimeString('en-GB');

    const newHistoryItem: AcademyPaymentHistoryItem = {
      id: `pay-${Date.now()}`,
      title: 'PAGUAR CASH',
      statusTag: 'PAGUAR',
      amount: paidAmount,
      date: dateStr,
      time: timeStr,
      description: `Pagesa me cash për ${cashModalStudent.name}`,
      paymentId: `CASH-${Math.floor(100000 + Math.random() * 900000)}`,
      sessionId: `SES-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === cashModalStudent.id) {
          const newDebt = Math.max(0, s.borxhi - paidAmount);
          const newTotal = s.shuma + newDebt;
          return {
            ...s,
            borxhi: newDebt,
            totali: newTotal,
            paymentHistory: [newHistoryItem, ...s.paymentHistory],
          };
        }
        return s;
      })
    );

    showToast(`U regjistrua pagesa prej ${paidAmount}€ në cash për ${cashModalStudent.name}`);
    setCashModalStudent(null);
  };

  const handleSendEmail = (s: AcademyStudent) => {
    showToast(`U dërgua email njoftues te: ${s.email}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-400/40 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-slate-900/60 backdrop-blur-xl space-y-6 shadow-2xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-7 h-7 text-indigo-400" />
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ekipa e parë/Akademia
              </h1>
            </div>
            
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Krijo</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full bg-slate-900/90 border border-indigo-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60 shadow-inner"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-indigo-500/15 bg-slate-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-indigo-500/15 bg-indigo-950/40 text-slate-300 text-xs uppercase font-extrabold tracking-wider">
                <th className="py-4 px-4 sm:px-6">Emri dhe Mbiemri</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Shuma</th>
                <th className="py-4 px-4">Borxhi</th>
                <th className="py-4 px-4">Totali</th>
                <th className="py-4 px-4">Grupi</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Veprimet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-500/10 text-xs sm:text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                    Nuk u gjet asnjë student në akademi.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isHistoryExpanded = activeHistoryStudentId === student.id;

                  return (
                    <React.Fragment key={student.id}>
                      <tr className="hover:bg-indigo-900/10 transition-colors">
                        {/* Name & Send Email */}
                        <td className="py-4 px-4 sm:px-6 align-middle">
                          <div className="space-y-1.5">
                            <span className="font-bold text-white text-base block">
                              {student.name}
                            </span>
                            <button
                              onClick={() => handleSendEmail(student)}
                              className="px-3 py-1 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] flex items-center gap-1.5 shadow transition active:scale-95"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Dërgo Email</span>
                            </button>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-4 align-middle text-slate-300 font-medium break-all">
                          {student.email}
                        </td>

                        {/* Shuma */}
                        <td className="py-4 px-4 align-middle font-black text-blue-400 text-base">
                          {student.shuma}
                        </td>

                        {/* Borxhi */}
                        <td className="py-4 px-4 align-middle font-black text-cyan-300 text-base">
                          {student.borxhi}
                        </td>

                        {/* Totali */}
                        <td className="py-4 px-4 align-middle font-black text-blue-300 text-base">
                          {student.totali}€
                        </td>

                        {/* Grupi */}
                        <td className="py-4 px-4 align-middle">
                          <span className="px-3 py-1 rounded-xl bg-blue-500/20 text-blue-300 font-black text-xs border border-blue-400/30 uppercase tracking-wide inline-block">
                            {student.grupi}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 align-middle">
                          <span
                            className={`font-black text-xs ${
                              student.status === 'Active' ? 'text-emerald-400' : 'text-red-400'
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 align-middle text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Historia button */}
                            <button
                              onClick={() =>
                                setActiveHistoryStudentId(
                                  isHistoryExpanded ? null : student.id
                                )
                              }
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow ${
                                isHistoryExpanded
                                  ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                                  : 'bg-blue-600 hover:bg-blue-500 text-white'
                              }`}
                            >
                              <History className="w-3.5 h-3.5" />
                              <span>Historia</span>
                            </button>

                            {/* Cash button */}
                            <button
                              onClick={() => handleOpenCashModal(student)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>Cash</span>
                            </button>

                            {/* Edit Pencil */}
                            <button
                              onClick={() => handleOpenEditModal(student)}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                              title="Ndrysho"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            {/* Delete Trash */}
                            <button
                              onClick={() => handleDeleteStudent(student.id, student.name)}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                              title="Fshi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Online Payment History Drawer */}
                      {isHistoryExpanded && (
                        <tr>
                          <td colSpan={8} className="p-0 bg-slate-900/80">
                            <div className="p-6 border-y border-indigo-500/20 bg-indigo-950/30 space-y-4 animate-in fade-in duration-200">
                              <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-base border-b border-indigo-500/20 pb-3">
                                <FileText className="w-5 h-5 text-indigo-400" />
                                <span>Historia e Pagesave Online</span>
                              </div>

                              {student.paymentHistory.length === 0 ? (
                                <p className="text-xs text-slate-400 py-4 italic">
                                  Nuk ka histori të regjistruar për këtë student.
                                </p>
                              ) : (
                                <div className="space-y-3">
                                  {student.paymentHistory.map((item) => (
                                    <div
                                      key={item.id}
                                      className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow"
                                    >
                                      {/* Left Details */}
                                      <div className="space-y-1.5">
                                        <div className="flex items-center gap-3">
                                          <span className="font-extrabold text-white text-sm">
                                            {item.title}
                                          </span>
                                          <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-black">
                                            {item.statusTag}
                                          </span>
                                          <span className="font-black text-blue-400 text-sm">
                                            {item.amount}€
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                          <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {item.date}
                                          </span>
                                          <span className="flex items-center gap-1 font-mono">
                                            <Clock className="w-3.5 h-3.5" />
                                            {item.time}
                                          </span>
                                        </div>

                                        <p className="text-xs text-slate-300">
                                          {item.description}
                                        </p>
                                      </div>

                                      {/* Right Metadata */}
                                      <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs text-slate-400">
                                        <div className="bg-slate-950/80 px-3 py-1 rounded-xl border border-indigo-500/10">
                                          <span>ID e Pagesës: </span>
                                          <span className="font-mono text-white font-bold">
                                            {item.paymentId}
                                          </span>
                                        </div>
                                        <div className="bg-slate-950/80 px-3 py-1 rounded-xl border border-indigo-500/10">
                                          <span>ID e Sesionit: </span>
                                          <span className="font-mono text-white font-bold">
                                            {item.sessionId}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Additional Info Box */}
                              <div className="p-4 rounded-2xl bg-slate-900/50 border border-indigo-500/15 space-y-2">
                                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                                  <AlertCircle className="w-4 h-4 text-indigo-400" />
                                  <span>Informacione Shtesë</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                  <div className="p-3 rounded-xl bg-slate-950/60 border border-indigo-500/10">
                                    <span className="text-slate-400 block text-[11px]">
                                      ID e Sesionit:
                                    </span>
                                    <span className="text-white font-bold">N/A</span>
                                  </div>
                                  <div className="p-3 rounded-xl bg-slate-950/60 border border-indigo-500/10">
                                    <span className="text-slate-400 block text-[11px]">
                                      ID e Pagesës:
                                    </span>
                                    <span className="text-white font-bold">N/A</span>
                                  </div>
                                  <div className="p-3 rounded-xl bg-slate-950/60 border border-indigo-500/10">
                                    <span className="text-slate-400 block text-[11px]">
                                      Grupi:
                                    </span>
                                    <span className="text-blue-400 font-bold uppercase">
                                      {student.grupi}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Cash Payment Modal */}
      {cashModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setCashModalStudent(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white">Paguar Cash</h2>
              <p className="text-xs text-slate-400">
                Regjistro pagesën në cash për <span className="text-indigo-300 font-bold">{cashModalStudent.name}</span>
              </p>
            </div>

            <form onSubmit={handleConfirmCashPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Emri */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Emri dhe Mbiemri
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={cashModalStudent.name}
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-slate-300 font-medium cursor-not-allowed"
                  />
                </div>

                {/* Borxhi Paraprak */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Borxhi Paraprak
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={cashModalStudent.borxhi}
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-slate-300 font-medium cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={cashModalStudent.email}
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-slate-300 font-medium cursor-not-allowed"
                  />
                </div>

                {/* Totali Highlighted */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Totali
                  </label>
                  <div className="w-full bg-emerald-500/10 border border-emerald-400/40 rounded-2xl px-4 py-2 text-emerald-300 font-black text-lg flex items-center">
                    {cashModalStudent.totali}€
                  </div>
                </div>

                {/* Shuma */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Shuma
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={cashModalStudent.shuma}
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-slate-300 font-medium cursor-not-allowed"
                  />
                </div>

                {/* Shuma për të Paguar */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Shuma për të Paguar
                  </label>
                  <input
                    type="number"
                    required
                    value={cashAmountInput}
                    onChange={(e) => setCashAmountInput(e.target.value)}
                    className="w-full bg-slate-950 border-2 border-blue-500 rounded-2xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCashModalStudent(null)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
                >
                  Regjistro Pagesën
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create / Edit Student Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white">
                {editingStudent ? 'Ndrysho Akademi' : 'Shto Akademi'}
              </h2>
              <p className="text-xs text-slate-400">
                {editingStudent
                  ? 'Përditëso të dhënat e studentit'
                  : 'Plotëso të dhënat për studentin e ri'}
              </p>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Emri dhe Mbiemri
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Shkruaj emrin e plotë"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Email 2 (opsional)
                    </label>
                    <input
                      type="email"
                      value={formData.email2}
                      onChange={(e) => setFormData({ ...formData, email2: e.target.value })}
                      placeholder="email2@example.com"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Qyteti
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Prishtina"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Telefoni
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="38344117003"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Telefoni 2
                    </label>
                    <input
                      type="text"
                      value={formData.phone2}
                      onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                      placeholder="+355 XX XXX XXX"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Shuma
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.shuma}
                      onChange={(e) => setFormData({ ...formData, shuma: e.target.value })}
                      placeholder="e.g., 130"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Borxhi Paraprak
                    </label>
                    <input
                      type="number"
                      value={formData.borxhi}
                      onChange={(e) => setFormData({ ...formData, borxhi: e.target.value })}
                      placeholder="e.g., 830"
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Përshkrimi
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Shkruaj përshkrimin..."
                      className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  {/* Totali Display */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-1">
                      Totali
                    </label>
                    <div className="w-full bg-emerald-500/10 border border-emerald-400/40 rounded-2xl px-4 py-3 text-emerald-300 font-black text-lg flex items-center justify-between">
                      <span>Totali:</span>
                      <span>= {computedTotali.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Group (Zgjidh Grupin) */}
              <div className="space-y-2 border-t border-indigo-500/15 pt-4">
                <label className="block text-xs font-extrabold text-slate-300 text-center">
                  Zgjidh Grupin
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['EKIPA E PARE', 'A', 'B', 'Gr/rr/20'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, grupi: g })}
                      className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                        formData.grupi === g
                          ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/30 shadow-lg'
                          : 'bg-slate-950 text-slate-300 border-indigo-500/20 hover:border-indigo-400/40'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={formData.grupi === g}
                        onChange={() => setFormData({ ...formData, grupi: g })}
                        className="accent-blue-500 cursor-pointer"
                      />
                      <span>{g}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-indigo-500/15">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-8 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition active:scale-95"
                >
                  {editingStudent ? 'Përditëso' : 'Shto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
