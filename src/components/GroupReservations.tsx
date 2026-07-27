import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  Trash2, 
  Pencil, 
  X, 
  CheckCircle2, 
  Send,
  Building2
} from 'lucide-react';
import { GroupReservation } from '../types';

// Sample initial data
const initialReservations: GroupReservation[] = [];

export const GroupReservations: React.FC = () => {
  const [reservations, setReservations] = useState<GroupReservation[]>(initialReservations);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Email Broadcast Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Create/Edit Reservation Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GroupReservation | null>(null);

  const [formData, setFormData] = useState({
    groupName: '',
    contactPerson: '',
    email: '',
    phone: '',
    membersCount: '10',
    reservationDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 - 11:30',
    poolLocation: 'Pishina 5 Shtigje',
    status: 'Aktiv' as 'Aktiv' | 'Në pritje' | 'Përfunduar' | 'Anuluar',
    price: '150',
    notes: '',
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter reservations based on search term
  const filteredReservations = reservations.filter(
    (r) =>
      r.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm)
  );

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      groupName: '',
      contactPerson: '',
      email: '',
      phone: '',
      membersCount: '10',
      reservationDate: new Date().toISOString().split('T')[0],
      timeSlot: '10:00 - 11:30',
      poolLocation: 'Pishina 5 Shtigje',
      status: 'Aktiv',
      price: '150',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (r: GroupReservation) => {
    setEditingItem(r);
    setFormData({
      groupName: r.groupName,
      contactPerson: r.contactPerson,
      email: r.email,
      phone: r.phone,
      membersCount: r.membersCount.toString(),
      reservationDate: r.reservationDate,
      timeSlot: r.timeSlot,
      poolLocation: r.poolLocation,
      status: r.status,
      price: r.price.toString(),
      notes: r.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.groupName.trim()) return;

    if (editingItem) {
      setReservations((prev) =>
        prev.map((r) =>
          r.id === editingItem.id
            ? {
                ...r,
                groupName: formData.groupName,
                contactPerson: formData.contactPerson,
                email: formData.email,
                phone: formData.phone,
                membersCount: parseInt(formData.membersCount) || 1,
                reservationDate: formData.reservationDate,
                timeSlot: formData.timeSlot,
                poolLocation: formData.poolLocation,
                status: formData.status,
                price: parseFloat(formData.price) || 0,
                notes: formData.notes,
              }
            : r
        )
      );
      showToast(`U përditësua rezervimi grupor për ${formData.groupName}`);
    } else {
      const newItem: GroupReservation = {
        id: `group-${Date.now()}`,
        groupName: formData.groupName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        membersCount: parseInt(formData.membersCount) || 1,
        reservationDate: formData.reservationDate,
        timeSlot: formData.timeSlot,
        poolLocation: formData.poolLocation,
        status: formData.status,
        price: parseFloat(formData.price) || 0,
        notes: formData.notes,
      };
      setReservations((prev) => [newItem, ...prev]);
      showToast(`U regjistrua me sukses rezervimi për ${formData.groupName}`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, groupName: string) => {
    if (window.confirm(`A jeni të sigurt që dëshironi të fshini rezervimin e grupit "${groupName}"?`)) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      showToast(`U fshi rezervimi për ${groupName}`);
    }
  };

  const handleSendGroupEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailModalOpen(false);
    showToast('Email-i u dërgua me sukses tek të gjitha grupet!');
    setEmailSubject('');
    setEmailBody('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-400/40 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Glass Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-slate-900/60 backdrop-blur-xl space-y-6 shadow-2xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Rezervime Grupore
            </h1>
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Shto Rezervim</span>
            </button>
          </div>

          {/* Right Action Bar (Email button + Search) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border-2 border-blue-500/80 bg-blue-600/10 hover:bg-blue-600 text-blue-300 hover:text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg transition active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Dërgo Email tek të gjithë</span>
            </button>

            <div className="w-full sm:w-64 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kërko..."
                className="w-full bg-slate-900/90 border border-indigo-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="min-h-[320px] rounded-2xl border border-indigo-500/15 bg-slate-950/40 p-8 flex flex-col justify-center items-center">
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-lg font-bold text-slate-300">
                Nuk u gjetën rezultate.
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Kliko butonat më sipër për të krijuar një rezervim të ri grupor ose për të filtruar sipas kërkimit.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-indigo-500/15 bg-indigo-950/40 text-slate-300 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-4">Emri i Grupit</th>
                    <th className="py-4 px-4">Kontakt Personi</th>
                    <th className="py-4 px-4">Email / Tel</th>
                    <th className="py-4 px-4">Numri i Anëtarëve</th>
                    <th className="py-4 px-4">Data & Koha</th>
                    <th className="py-4 px-4">Pishina</th>
                    <th className="py-4 px-4">Statusi</th>
                    <th className="py-4 px-4 text-center">Veprimet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-500/10 text-xs sm:text-sm">
                  {filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-indigo-900/10 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">{res.groupName}</td>
                      <td className="py-4 px-4 text-slate-300">{res.contactPerson}</td>
                      <td className="py-4 px-4 text-slate-300">
                        <div>{res.email}</div>
                        <div className="text-slate-500 text-[11px]">{res.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-indigo-300 font-extrabold">
                        {res.membersCount} anëtarë
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {res.reservationDate}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {res.timeSlot}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-300 font-medium">
                        {res.poolLocation}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30">
                          {res.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(res)}
                            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                            title="Ndrysho"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(res.id, res.groupName)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                            title="Fshi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: Send Email to All */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsEmailModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white">Dërgo Email Tek Të Gjithë</h2>
              <p className="text-xs text-slate-400">
                Dërgo një njoftim ose mesazh te të gjitha grupet e rezervuara
              </p>
            </div>

            <form onSubmit={handleSendGroupEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1">
                  Subjekti
                </label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Shkruaj subjektin e email-it"
                  className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1">
                  Përmbajtja e Mesazhit
                </label>
                <textarea
                  rows={5}
                  required
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Përshëndetje, Ju njoftojmë lidhur me rezervimin tuaj grupor..."
                  className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dërgo Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create / Edit Group Reservation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white">
                {editingItem ? 'Ndrysho Rezervim Grupor' : 'Shto Rezervim Grupor'}
              </h2>
              <p className="text-xs text-slate-400">
                Plotëso të dhënat e rezervimit për grupin
              </p>
            </div>

            <form onSubmit={handleSaveReservation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Emri i Grupit
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.groupName}
                    onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                    placeholder="e.g. Kompania ABC / Shkolla X"
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Kontakt Personi
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Emri dhe mbiemri i kontaktit"
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
                    Nr Telefonit
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+383 XX XXX XXX"
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Numri i Anëtarëve
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.membersCount}
                    onChange={(e) => setFormData({ ...formData, membersCount: e.target.value })}
                    placeholder="10"
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-1">
                    Çmimi (€)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="150"
                    className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition active:scale-95"
                >
                  {editingItem ? 'Ruaj Ndryshimet' : 'Krijo Rezervim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
