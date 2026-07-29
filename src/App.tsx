import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Receptions } from './components/Receptions';
import { Employees } from './components/Employees';
import { Income } from './components/Income';
import { Entrances } from './components/Entrances';
import { NewRegistration } from './components/NewRegistration';
import { PoolSchedules } from './components/PoolSchedules';
import { ProgramsView } from './components/ProgramsView';
import { Messages } from './components/Messages';
import { Academy } from './components/Academy';
import { GroupReservations } from './components/GroupReservations';
import { Agents } from './components/Agents';
import { UserSubscriptionHistoryView } from './components/UserSubscriptionHistoryView';
import { PaymentHistory } from './components/PaymentHistory';
import { Coupons } from './components/Coupons';
import { PrintTicketModal } from './components/PrintTicketModal';
import { ReserveSlotModal } from './components/ReserveSlotModal';

import {
  INITIAL_RECEPTIONS,
  INITIAL_EMPLOYEES,
  INITIAL_REGISTRATIONS,
  INITIAL_INCOME,
  INITIAL_CATEGORY_REVENUE,
  INITIAL_POOL_SLOTS,
  INITIAL_MESSAGES,
} from './data/mockData';

import { NavTab, Reception, Employee, RegistrationRecord, DailyIncome, CategoryRevenue, PoolSlot, MessageItem } from './types';

// Wave ribbon shapes with curvature on BOTH the top and bottom edges (not a flat baseline)
const WAVE_RIBBON_A =
  'M0,25 C200,85 400,-15 600,45 C800,105 1000,5 1200,55 L1200,95 C1000,45 800,145 600,85 C400,25 200,125 0,65 Z';
const WAVE_RIBBON_B =
  'M0,60 C180,10 380,110 600,50 C820,-10 1020,90 1200,40 L1200,80 C1020,130 820,30 600,90 C380,150 180,50 0,100 Z';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navigation & Theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  React.useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Default active tab is 'receptions'
  const [activeTab, setActiveTab] = useState<NavTab>('receptions');
  const [receptions, setReceptions] = useState<Reception[]>(INITIAL_RECEPTIONS);
  
  // activeReception is null until explicitly chosen by user
  const [activeReception, setActiveReception] = useState<Reception | null>(null);
  
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(INITIAL_REGISTRATIONS);
  const [income, setIncome] = useState<DailyIncome>(INITIAL_INCOME);
  const [categoryRevenues, setCategoryRevenues] = useState<CategoryRevenue[]>(INITIAL_CATEGORY_REVENUE);
  const [poolSlots, setPoolSlots] = useState<PoolSlot[]>(INITIAL_POOL_SLOTS);
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);

  // Search & Modals
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [ticketToPrint, setTicketToPrint] = useState<RegistrationRecord | null>(null);
  const [registrationToReserve, setRegistrationToReserve] = useState<RegistrationRecord | null>(null);

  // Login handler - opens 'receptions' page by default
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab('receptions');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveReception(null);
    setActiveTab('receptions');
  };

  // Reception Handlers
  const handleSelectReception = (rec: Reception) => {
    setActiveReception(rec);
  };

  const handleAddReception = (newRec: Reception) => {
    setReceptions((prev) => [newRec, ...prev]);
  };

  const handleEditReception = (updatedRec: Reception) => {
    setReceptions((prev) => prev.map((r) => (r.id === updatedRec.id ? updatedRec : r)));
    if (activeReception?.id === updatedRec.id) {
      setActiveReception(updatedRec);
    }
  };

  const handleDeleteReception = (id: string) => {
    setReceptions((prev) => prev.filter((r) => r.id !== id));
    if (activeReception?.id === id) {
      setActiveReception(null);
    }
  };

  // Employee Handlers
  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const handleEditEmployee = (updatedEmp: Employee) => {
    setEmployees((prev) => prev.map((e) => (e.id === updatedEmp.id ? updatedEmp : e)));
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  // Registration Handlers
  const handleAddRegistration = (newReg: RegistrationRecord) => {
    setRegistrations((prev) => [newReg, ...prev]);
    // Also update daily income figures
    setIncome((prev) => ({
      ...prev,
      shift2Cash: newReg.paymentMethod === 'Cash' ? prev.shift2Cash + newReg.pricePaid : prev.shift2Cash,
      shift2Card: newReg.paymentMethod === 'POS' ? prev.shift2Card + newReg.pricePaid : prev.shift2Card,
    }));
  };

  const handleUpdateRegistration = (updatedReg: RegistrationRecord) => {
    setRegistrations((prev) => prev.map((r) => (r.id === updatedReg.id ? updatedReg : r)));
  };

  const handleDeleteRegistration = (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleRegisterStatus = () => {
    setIncome((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const handleAddPoolSlot = (newSlot: PoolSlot) => {
    setPoolSlots((prev) => [...prev, newSlot]);
  };

  // If not logged in, render the reference-styled Login Page
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Effective reception object for sub-views that require a non-null object
  const currentOrFirstReception = activeReception || receptions[0];

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-[#0d152a]' : 'bg-[#f7f9fc]'} text-slate-100 overflow-hidden font-sans antialiased selection:bg-blue-500 selection:text-white relative`}>

      {/* Swimming Pool & Water Aesthetic Liquid Background — dark & light variants (matching Login Page Shine) */}
      {theme === 'dark' ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ filter: 'blur(2px)' }}>
          {/* Deep navy blue and indigo radial glows */}
          <div className="absolute -top-32 -left-32 w-[55rem] h-[55rem] bg-indigo-700/35 rounded-full blur-[130px] animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-[60rem] h-[60rem] bg-slate-800/60 rounded-full blur-[150px] animate-pulse"></div>

          {/* Brighter vivid organic liquid shapes directly for light refraction */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-gradient-to-tr from-cyan-400/35 via-teal-300/25 to-indigo-500/35 rounded-full blur-[65px] transform rotate-12"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[36rem] h-[36rem] bg-gradient-to-br from-blue-500/30 via-sky-300/25 to-emerald-400/25 rounded-full blur-[55px]"></div>
          <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-sky-400/20 rounded-full blur-[75px]"></div>

          {/* Swimming Pool Water Surface Caustics Overlay */}
          <div
            className="absolute inset-0 opacity-35 mix-blend-screen"
            style={{
              backgroundImage: `
                radial-gradient(circle at 35% 35%, rgba(6, 182, 212, 0.55) 0%, transparent 50%),
                radial-gradient(circle at 65% 65%, rgba(99, 102, 241, 0.5) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.45) 0%, transparent 60%)
              `,
            }}
          ></div>

          {/* Animated Water Ripple Bands (curved on both top and bottom edges) */}
          <div className="absolute inset-0 opacity-25 flex flex-col justify-between pointer-events-none">
            <svg className="w-full h-40 text-cyan-300" fill="none" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d={WAVE_RIBBON_A} fill="currentColor" />
            </svg>
            <svg className="w-full h-40 text-teal-300 transform rotate-180" fill="none" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d={WAVE_RIBBON_B} fill="currentColor" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ filter: 'blur(2px)' }}>
          {/* Soft pastel echo of the dark-mode glows — a whisper of color on a mostly-white ground */}
          <div className="absolute -top-32 -left-32 w-[55rem] h-[55rem] bg-indigo-100/25 rounded-full blur-[130px]"></div>
          <div className="absolute -bottom-32 -right-32 w-[60rem] h-[60rem] bg-sky-100/25 rounded-full blur-[150px]"></div>

          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-gradient-to-tr from-cyan-100/20 via-teal-50/15 to-indigo-100/20 rounded-full blur-[65px] transform rotate-12"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[36rem] h-[36rem] bg-gradient-to-br from-blue-100/18 via-sky-50/15 to-emerald-50/15 rounded-full blur-[55px]"></div>
          <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-sky-100/18 rounded-full blur-[75px]"></div>

          {/* Water Surface Caustics Overlay — a whisper of tint, not a wash */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{
              backgroundImage: `
                radial-gradient(circle at 35% 35%, rgba(6, 182, 212, 0.035) 0%, transparent 50%),
                radial-gradient(circle at 65% 65%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.025) 0%, transparent 60%)
              `,
            }}
          ></div>

          {/* Animated Water Ripple Bands (curved on both top and bottom edges) */}
          <div className="absolute inset-0 opacity-[0.12] flex flex-col justify-between pointer-events-none">
            <svg className="w-full h-40 text-sky-400" fill="none" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d={WAVE_RIBBON_A} fill="currentColor" />
            </svg>
            <svg className="w-full h-40 text-indigo-300 transform rotate-180" fill="none" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d={WAVE_RIBBON_B} fill="currentColor" />
            </svg>
          </div>
        </div>
      )}

      {/* Persistent Glassmorphism Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeReception={activeReception}
        receptions={receptions}
        onSelectReception={handleSelectReception}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10 relative">
        
        {/* Apple Style Glass Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeReception={activeReception}
          receptions={receptions}
          onSelectReception={handleSelectReception}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Dynamic Page Views */}
        <main className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-slate-950/30' : 'bg-white/25'} backdrop-blur-xs pb-12`}>
          
          {activeTab === 'dashboard' && (
            <Dashboard
              activeReception={currentOrFirstReception}
              registrations={registrations}
              messages={messages}
              onNavigateToRegistrations={() => setActiveTab('new_registration')}
              onNavigateToEntrances={() => setActiveTab('entrances')}
            />
          )}

          {activeTab === 'receptions' && (
            <Receptions
              receptions={receptions}
              activeReception={activeReception}
              onSelectReception={handleSelectReception}
              onAddReception={handleAddReception}
              onEditReception={handleEditReception}
              onDeleteReception={handleDeleteReception}
            />
          )}

          {activeTab === 'employees' && (
            <Employees
              employees={employees}
              receptions={receptions}
              onAddEmployee={handleAddEmployee}
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteEmployee}
            />
          )}

          {activeTab === 'income' && (
            <Income
              income={income}
              categoryRevenues={categoryRevenues}
              registrations={registrations}
              onToggleRegisterStatus={handleToggleRegisterStatus}
            />
          )}

          {activeTab === 'messages' && (
            <Messages messages={messages} />
          )}

          {activeTab === 'entrances' && (
            <Entrances
              registrations={registrations}
              onUpdateRegistration={handleUpdateRegistration}
              onPrintTicket={(reg) => setTicketToPrint(reg)}
              onReserveSlot={(reg) => setRegistrationToReserve(reg)}
            />
          )}

          {activeTab === 'new_registration' && (
            <NewRegistration
              receptions={receptions}
              activeReception={currentOrFirstReception}
              onAddRegistration={handleAddRegistration}
            />
          )}

          {(activeTab === 'pool_4_lanes' ||
            activeTab === 'pool_small' ||
            activeTab === 'pool_5_lanes' ||
            activeTab === 'kids_fitness_schedule' ||
            activeTab === 'step_adults_schedule') && (
            <PoolSchedules
              activeTab={activeTab}
              poolSlots={poolSlots}
              onAddSlot={handleAddPoolSlot}
            />
          )}

          {(activeTab === 'prog_swimming_school' ||
            activeTab === 'prog_individual' ||
            activeTab === 'prog_kids_fitness' ||
            activeTab === 'prog_step_adults' ||
            activeTab === 'prog_duo') && (
            <ProgramsView
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              registrations={registrations}
              onUpdateRegistration={handleUpdateRegistration}
              onDeleteRegistration={handleDeleteRegistration}
              activeReception={currentOrFirstReception}
            />
          )}

          {activeTab === 'prog_first_team' && <Academy />}

          {activeTab === 'group_reservations' && <GroupReservations />}

          {activeTab === 'agents' && <Agents />}

          {activeTab === 'sub_history' && <UserSubscriptionHistoryView />}

          {activeTab === 'payment_history' && <PaymentHistory />}

          {activeTab === 'coupons' && <Coupons />}

        </main>
      </div>

      {/* Printable Membership Ticket Modal */}
      {ticketToPrint && (
        <PrintTicketModal
          registration={ticketToPrint}
          activeReception={currentOrFirstReception}
          onClose={() => setTicketToPrint(null)}
        />
      )}

      {/* Reserve Time Slot Modal */}
      {registrationToReserve && (
        <ReserveSlotModal
          registration={registrationToReserve}
          onClose={() => setRegistrationToReserve(null)}
          onSave={handleUpdateRegistration}
        />
      )}

    </div>
  );
}
