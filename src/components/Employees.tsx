import React, { useState } from 'react';
import { UsersRound, Plus, Building2, Search, Edit2, Trash2, X, Shield, Phone, Mail } from 'lucide-react';
import { Employee, Reception } from '../types';

interface EmployeesProps {
  employees: Employee[];
  receptions: Reception[];
  onAddEmployee: (emp: Employee) => void;
  onEditEmployee: (emp: Employee) => void;
  onDeleteEmployee: (id: string) => void;
}

export const Employees: React.FC<EmployeesProps> = ({
  employees,
  receptions,
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'receptionist' | 'admin' | 'super admin'>('receptionist');
  const [receptionId, setReceptionId] = useState<string>('rec-1');
  const [phone, setPhone] = useState('+383 49 ');

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const openAddModal = () => {
    setEditingEmp(null);
    setName('');
    setEmail('');
    setRole('receptionist');
    setReceptionId('rec-1');
    setPhone('+383 49 ');
    setShowModal(true);
  };

  const openEditModal = (emp: Employee) => {
    setEditingEmp(emp);
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.role);
    setReceptionId(emp.receptionId || 'rec-1');
    setPhone(emp.phone);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const assignedRec = receptions.find((r) => r.id === receptionId);

    if (editingEmp) {
      onEditEmployee({
        ...editingEmp,
        name,
        email,
        role,
        receptionId: role === 'super admin' ? null : receptionId,
        receptionName: role === 'super admin' ? 'Gjithë Filialat' : assignedRec?.name || 'Step Sport Center',
        phone,
      });
    } else {
      onAddEmployee({
        id: `emp-${Date.now()}`,
        name,
        email,
        role,
        receptionId: role === 'super admin' ? null : receptionId,
        receptionName: role === 'super admin' ? 'Gjithë Filialat' : assignedRec?.name || 'Step Sport Center',
        phone,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      });
    }

    setShowModal(false);
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case 'super admin':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'admin':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'receptionist':
      case 'recepsionist':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <UsersRound className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Punëtorët & Stafi</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Menaxhimi i përdoruesve, trajnerëve dhe stafit administrativ.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Punëtor i ri</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kërko me emër ose email..."
            className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs text-slate-400 font-medium">Roli:</span>
          {['all', 'receptionist', 'admin', 'super admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1 rounded-xl text-xs font-medium capitalize transition ${
                roleFilter === r
                  ? 'bg-indigo-600/80 text-white font-bold shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/50 border border-white/5'
              }`}
            >
              {r === 'all' ? 'Të Gjithë' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Data Table */}
      <div className="glass-panel rounded-3xl border border-indigo-500/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-indigo-500/15 bg-slate-900/80 text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                <th className="p-4">Emri</th>
                <th className="p-4">Email & Telefon</th>
                <th className="p-4">Roli</th>
                <th className="p-4">Recepsioni</th>
                <th className="p-4 text-right">Veprime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-500/10 text-xs">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/5 transition">
                    <td className="p-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center font-bold text-white text-xs">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <span className="block text-white font-bold">{emp.name}</span>
                          <span className="text-[10px] text-slate-400">Shtuar më {emp.createdAt}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Mail className="w-3 h-3 text-indigo-400" />
                          <span>{emp.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Phone className="w-3 h-3 text-blue-400" />
                          <span>{emp.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getRoleBadge(emp.role)}`}>
                        {emp.role}
                      </span>
                    </td>

                    <td className="p-4">
                      {emp.receptionId ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/80 text-slate-200 border border-white/10 text-xs font-medium">
                          <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{emp.receptionName}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono pl-2">-</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(emp)}
                          className="p-1.5 rounded-xl glass-button text-slate-300 hover:text-white"
                          title="Ndrysho"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-indigo-400" />
                        </button>

                        <button
                          onClick={() => onDeleteEmployee(emp.id)}
                          className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition"
                          title="Fshi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Nuk ka punëtorë të regjistruar. Përdorni butonin "+ Punëtor i ri" për të shtuar anëtarin e parë të stafit.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add / Edit Employee */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl p-6 border border-indigo-500/30 shadow-2xl space-y-4 my-auto overflow-y-auto">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingEmp ? 'Përmirëso Punëtorin' : 'Shto Punëtor të Ri'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Emri i Plotë *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="p.sh. Bekim Zuka"
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bekim@stepsportcenter.com"
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Roli *</label>
                  <select
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                  >
                    <option value="receptionist">receptionist</option>
                    <option value="admin">admin</option>
                    <option value="super admin">super admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Telefoni</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                  />
                </div>
              </div>

              {role !== 'super admin' && (
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Caktimi i Recepsionit / Filialit</label>
                  <select
                    value={receptionId}
                    onChange={(e) => setReceptionId(e.target.value)}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                  >
                    {receptions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-3 border-t border-indigo-500/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl glass-button text-slate-300 hover:text-white"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20"
                >
                  Ruaj Punëtorin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
