import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  X, 
  CheckCircle2, 
  Building2, 
  Phone, 
  User, 
  Briefcase, 
  Mail, 
  Percent 
} from 'lucide-react';
import { Agent } from '../types';

// Sample initial agents (empty by default as in screenshot, or sample data)
const initialAgents: Agent[] = [];

export const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  // Form inputs matching screenshot 3
  const [formData, setFormData] = useState({
    instituteName: '',
    phone: '',
    fullName: '',
    businessNumber: '',
    email: '',
    discountPercentage: '',
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter agents based on search query
  const filteredAgents = agents.filter(
    (a) =>
      a.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.businessNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setEditingAgent(null);
    setFormData({
      instituteName: '',
      phone: '',
      fullName: '',
      businessNumber: '',
      email: '',
      discountPercentage: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      instituteName: agent.instituteName,
      phone: agent.phone,
      fullName: agent.fullName,
      businessNumber: agent.businessNumber,
      email: agent.email,
      discountPercentage: agent.discountPercentage.toString(),
    });
    setIsModalOpen(true);
  };

  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() && !formData.instituteName.trim()) return;

    const parsedDiscount = parseFloat(formData.discountPercentage) || 0;

    if (editingAgent) {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === editingAgent.id
            ? {
                ...a,
                instituteName: formData.instituteName,
                phone: formData.phone,
                fullName: formData.fullName,
                businessNumber: formData.businessNumber,
                email: formData.email,
                discountPercentage: parsedDiscount,
              }
            : a
        )
      );
      showToast(`U përditësua agjenti ${formData.fullName || formData.instituteName}`);
    } else {
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        instituteName: formData.instituteName,
        phone: formData.phone,
        fullName: formData.fullName,
        businessNumber: formData.businessNumber,
        email: formData.email,
        discountPercentage: parsedDiscount,
        createdAt: new Date().toISOString(),
      };
      setAgents((prev) => [newAgent, ...prev]);
      showToast(`U kriua agjenti i ri: ${formData.fullName || formData.instituteName}`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteAgent = (id: string, name: string) => {
    if (window.confirm(`A jeni të sigurt që dëshironi të fshini agjentin "${name}"?`)) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
      showToast(`Agjenti ${name} u fshi me sukses.`);
    }
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
              Agjentët
            </h1>
            <button
              onClick={handleOpenCreateModal}
              className="px-5 py-2 rounded-full border-2 border-blue-500 bg-blue-600/20 hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Krijo</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
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

        {/* Data Box / Table */}
        <div className="min-h-[300px] rounded-2xl border border-indigo-500/15 bg-slate-950/40 p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-indigo-500/15 text-slate-300 text-xs uppercase font-black tracking-wider">
                <th className="py-4 px-4">Emri i Institutit</th>
                <th className="py-4 px-4">Nr Telefonit</th>
                <th className="py-4 px-4">Emri dhe Mbiemri</th>
                <th className="py-4 px-4">Numri i Biznesit</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Përqindja (%)</th>
                <th className="py-4 px-4 text-center">Veprime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-500/10 text-xs sm:text-sm">
              {filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400 font-bold text-sm">
                    Nuk ka agjentë të krijuar.
                  </td>
                </tr>
              ) : (
                filteredAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-indigo-900/10 transition-colors">
                    <td className="py-4 px-4 font-extrabold text-white">
                      {agent.instituteName || '-'}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {agent.phone || '-'}
                    </td>
                    <td className="py-4 px-4 text-slate-200 font-bold">
                      {agent.fullName || '-'}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      {agent.businessNumber || '-'}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {agent.email || '-'}
                    </td>
                    <td className="py-4 px-4 font-black text-emerald-400 text-base">
                      {agent.discountPercentage}%
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(agent)}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                          title="Ndrysho"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteAgent(agent.id, agent.fullName || agent.instituteName)
                          }
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                          title="Fshi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Krijo / Ndrysho Agjent (Matching overall website dark glass theme) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900/95 border border-indigo-500/30 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl backdrop-blur-xl relative animate-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title */}
            <div className="text-center pt-2">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {editingAgent ? 'Ndrysho Agjent' : 'Krijo Agjent'}
              </h2>
            </div>

            {/* Form Inputs with dark glass theme */}
            <form onSubmit={handleSaveAgent} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={formData.instituteName}
                  onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                  placeholder="Emri i Institutit"
                  className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Nr Telefonit"
                  className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Emri dhe Mbiemri"
                  className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={formData.businessNumber}
                  onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                  placeholder="Numri i Biznesit"
                  className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <input
                  type="number"
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                  placeholder="Zbritja në %"
                  className="w-full bg-slate-950/80 border border-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              {/* Bottom Buttons matching website theme */}
              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-2.5 rounded-full border border-blue-500/60 text-blue-300 hover:bg-blue-600/20 font-bold text-sm transition"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition active:scale-95"
                >
                  {editingAgent ? 'Përditëso' : 'Krijo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
