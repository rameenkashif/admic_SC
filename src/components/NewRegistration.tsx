import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  Activity, 
  Zap, 
  Users, 
  Waves, 
  Check, 
  Calendar, 
  CreditCard, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Building2,
  AlertCircle
} from 'lucide-react';
import { Reception, RegistrationRecord } from '../types';

interface NewRegistrationProps {
  receptions: Reception[];
  activeReception: Reception;
  onAddRegistration: (reg: RegistrationRecord) => void;
}

type RegistrationCategory = 
  | 'Shkolla e Notit' 
  | 'Individual' 
  | 'Kids Fitness' 
  | 'Step Adults' 
  | 'Rezervime Grupore' 
  | 'Duo (Fitness+Not)';

export const NewRegistration: React.FC<NewRegistrationProps> = ({
  receptions,
  activeReception,
  onAddRegistration,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RegistrationCategory>('Shkolla e Notit');
  const [selectedReceptionId, setSelectedReceptionId] = useState<string>(activeReception.id);

  // Form Fields - Personal
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('2018-05-12');
  const [childAge, setChildAge] = useState('8');
  const [phone, setPhone] = useState('+383 49 ');
  const [email, setEmail] = useState('');
  const [rfidCode, setRfidCode] = useState('');
  const [rfidSaved, setRfidSaved] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPool, setSelectedPool] = useState('Pishina me 4 korsi');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'POS' | 'Transfer Bankar' | 'Kompenzim'>('Cash');
  const [description, setDescription] = useState('');
  const [hasHealthIssue, setHasHealthIssue] = useState<boolean>(false);
  const [healthDetails, setHealthDetails] = useState('');
  
  // Discounts (10%, 15%, 20%, 25%, 30%, 40%)
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);

  // Right Column Plan Pricing Selections
  const [duration, setDuration] = useState<'1 Muaj' | '3 Muaj' | '6 Muaj' | '12 Muaj'>('1 Muaj');
  const [frequency, setFrequency] = useState<string>('2 Hyrje në Javë - 8 Hyrje në Muaj');
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(45);

  // Group Booking Specifics
  const [institution, setInstitution] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [personCount, setPersonCount] = useState<number>(20);
  const [malesCount, setMalesCount] = useState<number>(10);
  const [femalesCount, setFemalesCount] = useState<number>(10);
  const [groupOfferPrice, setGroupOfferPrice] = useState<number>(2.5); // 2.5€ per person
  const [groupTime, setGroupTime] = useState<string>('10:00');
  const [groupAge, setGroupAge] = useState<string>('10-15');

  // Duo Days Scheduler
  const [fitnessDays, setFitnessDays] = useState<string[]>(['E HËNË', 'E MËRKURË']);
  const [swimDays, setSwimDays] = useState<string[]>(['E MARTË', 'E ENJTE']);
  const [duoSwimDay, setDuoSwimDay] = useState<string>('Zgjhedh Ditën');
  const [duoSwimTime, setDuoSwimTime] = useState<string>('Zgjhedh Kohën');
  const [remainingSwimDaysCount, setRemainingSwimDaysCount] = useState<number>(1);
  const [remainingFitnessDaysCount, setRemainingFitnessDaysCount] = useState<number>(2);

  // Success Notification
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const categories: { id: RegistrationCategory; icon: any; label: string }[] = [
    { id: 'Shkolla e Notit', icon: GraduationCap, label: 'Shkolla e Notit' },
    { id: 'Individual', icon: User, label: 'Individual' },
    { id: 'Kids Fitness', icon: Activity, label: 'Kids Fitness' },
    { id: 'Step Adults', icon: Zap, label: 'Step Adults' },
    { id: 'Rezervime Grupore', icon: Users, label: 'Rezervime Grupore' },
    { id: 'Duo (Fitness+Not)', icon: Waves, label: 'Duo (Fitness+Not)' },
  ];

  // Individual Plan Dropdown States
  const [bazikeMonth, setBazikeMonth] = useState<string>('1 muaj');
  const [bazikeHyrje, setBazikeHyrje] = useState<string>('8 hyrje');
  const [aktiveMonth, setAktiveMonth] = useState<string>('1 muaj');
  const [selectedPlanType, setSelectedPlanType] = useState<'bazike' | 'aktive'>('bazike');

  // Shkolla e Notit Sub-Plan Dropdown States
  const [selectedSwimPlan, setSelectedSwimPlan] = useState<'femijet' | 'foshnjat' | 'rriturit'>('femijet');
  const [femijetMonth, setFemijetMonth] = useState<string>('1 Muaj');
  const [femijetKoha, setFemijetKoha] = useState<string>('2 Hyrje në Javë - 8 Hyrje në Muaj');
  
  const [foshnjatMonth, setFoshnjatMonth] = useState<string>('1 Muaj');
  const [foshnjatKoha, setFoshnjatKoha] = useState<string>('2 Hyrje në Javë - 8 Hyrje në Muaj');

  const [rrituritMonth, setRrituritMonth] = useState<string>('1 Muaj');
  const [rrituritKoha, setRrituritKoha] = useState<string>('2 Hyrje në Javë - 8 Hyrje në Muaj');

  // Individual pricing helpers
  const getBazikePrice = (): number => {
    const entriesNum = bazikeHyrje.includes('4') ? 4 : bazikeHyrje.includes('12') ? 12 : 8;
    const monthsNum = bazikeMonth.includes('12') ? 12 : bazikeMonth.includes('6') ? 6 : bazikeMonth.includes('3') ? 3 : 1;
    let base = entriesNum === 4 ? 20 : entriesNum === 12 ? 45 : 35;
    if (monthsNum === 3) base = Math.round(base * 2.7);
    else if (monthsNum === 6) base = Math.round(base * 5.2);
    else if (monthsNum === 12) base = Math.round(base * 9.5);
    return base;
  };

  const getAktivePrice = (): number => {
    if (aktiveMonth.includes('12')) return 550;
    if (aktiveMonth.includes('6')) return 300;
    if (aktiveMonth.includes('3')) return 160;
    return 60; // 1 muaj
  };

  // Shkolla e Notit pricing helpers
  const getFemijetPrice = (): number => {
    let base = 45;
    if (femijetKoha.includes('4 Hyrje')) base = 25;
    else if (femijetKoha.includes('12 Hyrje')) base = 65;
    else if (femijetKoha.includes('16 Hyrje')) base = 85;
    else if (femijetKoha.includes('20 Hyrje')) base = 100;

    let mult = 1;
    if (femijetMonth.includes('3')) mult = 2.7;
    else if (femijetMonth.includes('6')) mult = 5.2;
    else if (femijetMonth.includes('12')) mult = 9.5;

    return Math.round(base * mult);
  };

  const getFoshnjatPrice = (): number => {
    let base = 50;
    if (foshnjatKoha.includes('4 Hyrje')) base = 30;

    let mult = 1;
    if (foshnjatMonth.includes('3')) mult = 2.7;
    else if (foshnjatMonth.includes('6')) mult = 5.2;
    else if (foshnjatMonth.includes('12')) mult = 9.5;

    return Math.round(base * mult);
  };

  const getRrituritPrice = (): number => {
    let base = 50;
    if (rrituritMonth.includes('3 Javë')) base = 50;
    else if (rrituritMonth.includes('1 Muaj')) base = 60;
    else if (rrituritMonth.includes('3')) base = 160;
    else if (rrituritMonth.includes('6')) base = 300;
    else if (rrituritMonth.includes('12')) base = 550;

    if (rrituritKoha.includes('4 Hyrje')) base = Math.round(base * 0.6);

    return base;
  };

  // Kids Fitness Dropdown States
  const [kidsFrequency, setKidsFrequency] = useState<string>('2x Javë');
  const [kidsTimeSlot, setKidsTimeSlot] = useState<string>('18:00 - 19:00');
  const [kidsDays, setKidsDays] = useState<string[]>(['THURSDAY', 'FRIDAY']);
  const [kidsWarning, setKidsWarning] = useState<string | null>(null);

  // Step Adults Dropdown States
  const [adultsPlan, setAdultsPlan] = useState<string>('3x Javë');
  const [adultsDays, setAdultsDays] = useState<string[]>(['E HËNË', 'E MËRKURË', 'E PREMTE']);
  const [adultsWarning, setAdultsWarning] = useState<string | null>(null);
  const [adultsDayTimes, setAdultsDayTimes] = useState<Record<string, string>>({
    'E HËNË': '08:00 - 09:00',
    'E MËRKURË': '08:00 - 09:00',
    'E PREMTE': '08:00 - 09:00',
  });

  const getKidsPrice = (): number => {
    if (kidsFrequency === '1x Javë') return 20;
    if (kidsFrequency === '3x Javë') return 40;
    return 30; // 2x Javë
  };

  const getAdultsPrice = (): number => {
    if (adultsPlan === '3x Javë') return 40;
    if (adultsPlan === '5x Javë') return 60;
    if (adultsPlan === '1 Muaj') return 50;
    if (adultsPlan === '3 Muaj') return 130;
    return 60;
  };

  const handleSaveRFID = () => {
    if (!rfidCode) return;
    setRfidSaved(true);
    setTimeout(() => setRfidSaved(false), 3000);
  };

  // Base price calculation with discount
  const calculatedBasePrice = selectedCategory === 'Rezervime Grupore'
    ? personCount * groupOfferPrice
    : selectedCategory === 'Individual'
    ? (selectedPlanType === 'bazike' ? getBazikePrice() : getAktivePrice())
    : selectedCategory === 'Shkolla e Notit'
    ? (selectedSwimPlan === 'femijet' ? getFemijetPrice() : selectedSwimPlan === 'foshnjat' ? getFoshnjatPrice() : getRrituritPrice())
    : selectedCategory === 'Kids Fitness'
    ? getKidsPrice()
    : selectedCategory === 'Step Adults'
    ? getAdultsPrice()
    : selectedCategory === 'Duo (Fitness+Not)'
    ? 60
    : selectedPlanPrice;

  const finalCalculatedPrice = Math.max(0, calculatedBasePrice * (1 - selectedDiscount / 100));

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName && selectedCategory !== 'Rezervime Grupore') return;

    const newReg: RegistrationRecord = {
      id: `reg-${Date.now()}`,
      memberName: selectedCategory === 'Rezervime Grupore' ? institution : fullName,
      program: selectedCategory.toUpperCase(),
      programCategory: selectedCategory as any,
      duration: duration,
      startDate: startDate,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalEntries: selectedCategory === 'Shkolla e Notit' ? 8 : 12,
      remainingEntries: selectedCategory === 'Shkolla e Notit' ? 8 : 12,
      phone: phone,
      dob: dob,
      status: 'Aktiv',
      poolAssignment: selectedPool,
      floor: 'Kati i dytë',
      schedule: [
        { day: 'E HËNË', time: '18:00' },
        { day: 'E ENJTE', time: '18:00' },
      ],
      paymentMethod: paymentMethod,
      pricePaid: finalCalculatedPrice,
      rfid: rfidCode || `RF-${Math.floor(Math.random() * 900000 + 100000)}`,
    };

    onAddRegistration(newReg);
    setSuccessMessage(`Regjistrimi për "${newReg.memberName}" u krye me sukses!`);
    
    // Reset Form
    setFullName('');
    setRfidCode('');
    setDescription('');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Reception Context */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Regjistrohu</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Zgjidhni kategorinë dhe plotësoni të dhënat e anëtarit të ri.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-indigo-500/20 text-xs">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span className="text-slate-300 font-medium">Krijo regjistrimin për:</span>
          <select
            value={selectedReceptionId}
            onChange={(e) => setSelectedReceptionId(e.target.value)}
            className="bg-indigo-950/80 border border-indigo-400/30 rounded-xl px-2.5 py-1 text-white font-bold focus:outline-none"
          >
            {receptions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Category Pills Bar (6 main categories) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3.5 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all duration-200 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-500/30 scale-105'
                  : 'glass-panel text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
              <span className="text-center text-[11px] leading-tight">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Form Split View: Left Form vs Right Plan Cards */}
      <form onSubmit={handleSubmitRegistration} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Të dhënat tuaja (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-indigo-500/20 space-y-5">
          <div className="flex items-center gap-3 border-b border-indigo-500/15 pb-3">
            <button
              type="button"
              onClick={() => setSelectedCategory('Shkolla e Notit')}
              className="px-3 py-1.5 rounded-xl border border-blue-500/40 text-blue-400 hover:bg-blue-600/20 font-bold text-xs flex items-center gap-1 transition"
            >
              ← Kthehu
            </button>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {selectedCategory === 'Step Adults' ? 'Adults' : selectedCategory}
            </h2>
          </div>

          {selectedCategory !== 'Rezervime Grupore' ? (
            /* Individual / Swimming / Kids / Adults / Duo Form */
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-white mb-2">Të dhënat tuaja</h3>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Emri i plotë</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Emri i plotë"
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Data e Lindjes</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                  />
                </div>

                {(selectedCategory === 'Shkolla e Notit' || selectedCategory === 'Kids Fitness' || selectedCategory === 'Duo (Fitness+Not)') && (
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Mosha e Fëmijës</label>
                    <input
                      type="text"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="8 vjeç"
                      className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                    />
                  </div>
                )}

                {selectedCategory === 'Step Adults' && (
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Mosha</label>
                    <input
                      type="text"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="25"
                      className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telefon *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="044/123-456"
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@shembull.com"
                    className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                  />
                </div>
              </div>

              {/* RFID Input & Save Button */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">RFID</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={rfidCode}
                    onChange={(e) => setRfidCode(e.target.value)}
                    placeholder="Vendosni RFID"
                    className="flex-1 bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-400/60"
                  />
                  <button
                    type="button"
                    onClick={handleSaveRFID}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-md"
                  >
                    Ruaj
                  </button>
                </div>
                {rfidSaved && (
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">Kodi RFID u ruajt me sukses!</span>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Data e Fillimit</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              {(selectedCategory === 'Shkolla e Notit' || selectedCategory === 'Duo (Fitness+Not)') && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Zgjedh Pishinën</label>
                    <select
                      value={selectedPool}
                      onChange={(e) => setSelectedPool(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                    >
                      <option value="Zgjedh">Zgjedh</option>
                      <option value="Pishina me 4 korsi">Pishina me 4 korsi</option>
                      <option value="Pishinat e vogla">Pishinat e vogla</option>
                      <option value="Pishina me 5 korsi">Pishina me 5 korsi</option>
                      <option value="Fitness Main Gym">Fitness Main Gym</option>
                    </select>
                  </div>

                  {/* Vendose në Kalendar */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-slate-300 font-semibold mb-1">Vendose në Kalendar</label>
                    {selectedCategory === 'Duo (Fitness+Not)' ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={duoSwimDay}
                            onChange={(e) => setDuoSwimDay(e.target.value)}
                            className="flex-1 bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                          >
                            <option value="Zgjhedh Ditën">Zgjhedh Ditën</option>
                            <option value="E HËNË">E HËNË</option>
                            <option value="E MARTË">E MARTË</option>
                            <option value="E MËRKURË">E MËRKURË</option>
                            <option value="E ENJTE">E ENJTE</option>
                            <option value="E PREMTE">E PREMTE</option>
                            <option value="E SHTUNË">E SHTUNË</option>
                          </select>

                          <select
                            value={duoSwimTime}
                            onChange={(e) => setDuoSwimTime(e.target.value)}
                            className="flex-1 bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none"
                          >
                            <option value="Zgjhedh Kohën">Zgjhedh Kohën</option>
                            <option value="09:00">09:00</option>
                            <option value="11:00">11:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              setDuoSwimDay('Zgjhedh Ditën');
                              setDuoSwimTime('Zgjhedh Kohën');
                            }}
                            className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition shadow-md"
                          >
                            Fshij
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (remainingSwimDaysCount > 0) {
                              setRemainingSwimDaysCount(prev => Math.max(0, prev - 1));
                              setSuccessMessage('Ditën për Not u shtua në kalendar!');
                            }
                          }}
                          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
                        >
                          Shto Ditën për Not ({remainingSwimDaysCount} ditë të mbetura)
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => setSuccessMessage('Mësimi u shtua në kalendar me sukses!')}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
                        >
                          Shto Ditën
                        </button>
                      </div>
                    )}
                  </div>

                  {selectedCategory === 'Duo (Fitness+Not)' && (
                    <div className="space-y-2 pt-2">
                      <label className="block text-slate-300 font-semibold mb-1">Vendose në Kalendar për Fitness</label>
                      <button
                        type="button"
                        onClick={() => {
                          if (remainingFitnessDaysCount > 0) {
                            setRemainingFitnessDaysCount(prev => Math.max(0, prev - 1));
                            setSuccessMessage('Ditën për Fitness u shtua në kalendar!');
                          }
                        }}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
                      >
                        Shto Ditën për Fitness ({remainingFitnessDaysCount} ditë të mbetura)
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Metoda e Pagesës</label>
                <select
                  value={paymentMethod}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                >
                  <option value="" disabled>Zgjidhni metodën e pagesës</option>
                  <option value="Cash">Cash (Kesh)</option>
                  <option value="POS">POS (Kartelë Bankare)</option>
                  <option value="Transfer Bankar">Transfer Bankar</option>
                  <option value="Kompenzim">Kompenzim</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Përshkrimi (Opsional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Shkruani përshkrimin..."
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              {/* Health Issues Radio */}
              <div className="pt-2 border-t border-indigo-500/10 space-y-2">
                <span className="block text-slate-300 font-semibold">Probleme Shëndetësore:</span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-white cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={hasHealthIssue}
                      onChange={(e) => setHasHealthIssue(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Po</span>
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={!hasHealthIssue}
                      onChange={(e) => setHasHealthIssue(!e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Jo</span>
                  </label>
                </div>
                <p className="text-[11px] text-slate-400">
                  Nëse keni probleme shëndetësore ju lutemi përshkruani ato
                </p>

                {hasHealthIssue && (
                  <textarea
                    rows={2}
                    value={healthDetails}
                    onChange={(e) => setHealthDetails(e.target.value)}
                    placeholder="Përshkruani problemet shëndetësore..."
                    className="w-full bg-slate-950 border border-amber-500/30 rounded-xl p-2 text-white focus:outline-none mt-2"
                  />
                )}
              </div>

              {/* Apply Discount Checkboxes */}
              <div className="pt-3 border-t border-indigo-500/10 space-y-2">
                <span className="block text-slate-300 font-semibold">Apliko Zbritjen (Opsionale)</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: 'Zbritje 10%', val: 10 },
                    { label: 'Zbritje 25%', val: 25 },
                    { label: 'Zbritje 15%', val: 15 },
                    { label: 'Zbritje 30%', val: 30 },
                    { label: 'Zbritje 20%', val: 20 },
                    { label: 'Zbritje 40%', val: 40 },
                  ].map((disc) => (
                    <label
                      key={disc.val}
                      className="flex items-center gap-2.5 text-slate-200 cursor-pointer p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-blue-500/40 transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDiscount === disc.val}
                        onChange={() => setSelectedDiscount(selectedDiscount === disc.val ? 0 : disc.val)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{disc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/20 transition active:scale-98"
              >
                Regjistrohu me Çmim Final (€{finalCalculatedPrice.toFixed(2)})
              </button>
            </div>
          ) : (
            /* Rezervime Grupore Form */
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-white mb-2">Të dhënat tuaja</h3>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Institucioni</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Adresa</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Telefon *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personi Përgjegjës</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Data</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setSuccessMessage('Data e re u shtua me sukses!')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
                >
                  Add Another Date
                </button>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Koha</label>
                <input
                  type="time"
                  value={groupTime}
                  onChange={(e) => setGroupTime(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Numri i Personave</label>
                <input
                  type="number"
                  value={personCount || ''}
                  onChange={(e) => setPersonCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mosha</label>
                <input
                  type="text"
                  value={groupAge}
                  onChange={(e) => setGroupAge(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Meshkuj</label>
                <input
                  type="number"
                  value={malesCount || ''}
                  onChange={(e) => setMalesCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Femra</label>
                <input
                  type="number"
                  value={femalesCount || ''}
                  onChange={(e) => setFemalesCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-indigo-500/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-400/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Zgjhedh Ofertën</label>
                <select
                  value={groupOfferPrice}
                  onChange={(e) => setGroupOfferPrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-blue-500/40 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400 font-semibold"
                >
                  <option value={2.5}>Shfrytezimi i pishinës (2.5€/person)</option>
                  <option value={4.0}>Pishinë + trajner (4€/person)</option>
                  <option value={5.5}>Pishinë + trajner + transport (5.5€/person)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Plans & Live Calculated Price Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedCategory === 'Shkolla e Notit' ? (
            /* SHKOLLA E NOTIT SPECIFIC PLAN CARDS MATCHING SCREENSHOTS */
            <div className="space-y-6">
              {/* 1. Shkolla e Notit për Fëmijët */}
              <div>
                <h3 className="text-xl font-black text-white mb-3">Shkolla e Notit për Fëmijët</h3>
                <div
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    selectedSwimPlan === 'femijet'
                      ? 'border-blue-600 bg-slate-900/90 shadow-2xl shadow-blue-500/20'
                      : 'border-blue-600/70 bg-slate-900/50'
                  } space-y-4`}
                >
                  {/* Dropdown 1: Kohëzgjatja */}
                  <div>
                    <select
                      value={femijetMonth}
                      onChange={(e) => setFemijetMonth(e.target.value)}
                      className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="1 Muaj" className="bg-slate-900 text-white">1 Muaj</option>
                      <option value="3 Muaj" className="bg-slate-900 text-white">3 Muaj</option>
                      <option value="6 Muaj" className="bg-slate-900 text-white">6 Muaj</option>
                      <option value="12 Muaj" className="bg-slate-900 text-white">12 Muaj</option>
                    </select>
                  </div>

                  {/* Dropdown 2: Koha / Frekuenca */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-300 font-semibold shrink-0">Koha:</span>
                    <select
                      value={femijetKoha}
                      onChange={(e) => setFemijetKoha(e.target.value)}
                      className="flex-1 bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="2 Hyrje në Javë - 8 Hyrje në Muaj" className="bg-slate-900 text-white">2 Hyrje në Javë - 8 Hyrje në Muaj</option>
                      <option value="1 Hyrje në Javë - 4 Hyrje në Muaj" className="bg-slate-900 text-white">1 Hyrje në Javë - 4 Hyrje në Muaj</option>
                      <option value="3 Hyrje në Javë - 12 Hyrje në Muaj" className="bg-slate-900 text-white">3 Hyrje në Javë - 12 Hyrje në Muaj</option>
                      <option value="4 Hyrje në Javë - 16 Hyrje në Muaj" className="bg-slate-900 text-white">4 Hyrje në Javë - 16 Hyrje në Muaj</option>
                      <option value="5 Hyrje në Javë - 20 Hyrje në Muaj" className="bg-slate-900 text-white">5 Hyrje në Javë - 20 Hyrje në Muaj</option>
                    </select>
                  </div>

                  {/* Price display */}
                  <div className="text-2xl font-black text-white font-mono pt-1">
                    {Math.round(getFemijetPrice() * (1 - selectedDiscount / 100))}€
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSwimPlan('femijet');
                      setSuccessMessage(`Plani 'Shkolla e Notit për Fëmijët' (${femijetMonth}) u zgjodh!`);
                    }}
                    className={`w-full py-3 rounded-2xl font-black text-sm border-2 transition ${
                      selectedSwimPlan === 'femijet'
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xl'
                        : 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    choosePlan
                  </button>
                </div>
              </div>

              {/* 2. Shkolla e Notit për Foshnjat */}
              <div>
                <h3 className="text-xl font-black text-white mb-3">Shkolla e Notit për Foshnjat</h3>
                <div
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    selectedSwimPlan === 'foshnjat'
                      ? 'border-blue-600 bg-slate-900/90 shadow-2xl shadow-blue-500/20'
                      : 'border-blue-600/70 bg-slate-900/50'
                  } space-y-4`}
                >
                  {/* Dropdown 1: Kohëzgjatja */}
                  <div>
                    <select
                      value={foshnjatMonth}
                      onChange={(e) => setFoshnjatMonth(e.target.value)}
                      className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="1 Muaj" className="bg-slate-900 text-white">1 Muaj</option>
                      <option value="3 Muaj" className="bg-slate-900 text-white">3 Muaj</option>
                      <option value="6 Muaj" className="bg-slate-900 text-white">6 Muaj</option>
                      <option value="12 Muaj" className="bg-slate-900 text-white">12 Muaj</option>
                    </select>
                  </div>

                  {/* Dropdown 2: Koha / Frekuenca */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-300 font-semibold shrink-0">Koha:</span>
                    <select
                      value={foshnjatKoha}
                      onChange={(e) => setFoshnjatKoha(e.target.value)}
                      className="flex-1 bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="2 Hyrje në Javë - 8 Hyrje në Muaj" className="bg-slate-900 text-white">2 Hyrje në Javë - 8 Hyrje në Muaj</option>
                      <option value="1 Hyrje në Javë - 4 Hyrje në Muaj" className="bg-slate-900 text-white">1 Hyrje në Javë - 4 Hyrje në Muaj</option>
                    </select>
                  </div>

                  {/* Price display */}
                  <div className="text-2xl font-black text-white font-mono pt-1">
                    {Math.round(getFoshnjatPrice() * (1 - selectedDiscount / 100))}€
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSwimPlan('foshnjat');
                      setSuccessMessage(`Plani 'Shkolla e Notit për Foshnjat' (${foshnjatMonth}) u zgjodh!`);
                    }}
                    className={`w-full py-3 rounded-2xl font-black text-sm border-2 transition ${
                      selectedSwimPlan === 'foshnjat'
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xl'
                        : 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    choosePlan
                  </button>
                </div>
              </div>

              {/* 3. Shkolla e Notit për Të Rriturit */}
              <div>
                <h3 className="text-xl font-black text-white mb-3">Shkolla e Notit për Të Rriturit</h3>
                <div
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    selectedSwimPlan === 'rriturit'
                      ? 'border-blue-600 bg-slate-900/90 shadow-2xl shadow-blue-500/20'
                      : 'border-blue-600/70 bg-slate-900/50'
                  } space-y-4`}
                >
                  {/* Dropdown 1: Kohëzgjatja */}
                  <div>
                    <select
                      value={rrituritMonth}
                      onChange={(e) => setRrituritMonth(e.target.value)}
                      className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="3 Javë" className="bg-slate-900 text-white">3 Javë</option>
                      <option value="1 Muaj" className="bg-slate-900 text-white">1 Muaj</option>
                      <option value="3 Muaj" className="bg-slate-900 text-white">3 Muaj</option>
                      <option value="6 Muaj" className="bg-slate-900 text-white">6 Muaj</option>
                      <option value="12 Muaj" className="bg-slate-900 text-white">12 Muaj</option>
                    </select>
                  </div>

                  {/* Dropdown 2: Koha / Frekuenca */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-300 font-semibold shrink-0">Koha:</span>
                    <select
                      value={rrituritKoha}
                      onChange={(e) => setRrituritKoha(e.target.value)}
                      className="flex-1 bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="2 Hyrje në Javë - 8 Hyrje në Muaj" className="bg-slate-900 text-white">2 Hyrje në Javë - 8 Hyrje në Muaj</option>
                      <option value="1 Hyrje në Javë - 4 Hyrje në Muaj" className="bg-slate-900 text-white">1 Hyrje në Javë - 4 Hyrje në Muaj</option>
                    </select>
                  </div>

                  {/* Price display */}
                  <div className="text-2xl font-black text-white font-mono pt-1">
                    {Math.round(getRrituritPrice() * (1 - selectedDiscount / 100))}€
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSwimPlan('rriturit');
                      setSuccessMessage(`Plani 'Shkolla e Notit për Të Rriturit' (${rrituritMonth}) u zgjodh!`);
                    }}
                    className={`w-full py-3 rounded-2xl font-black text-sm border-2 transition ${
                      selectedSwimPlan === 'rriturit'
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xl'
                        : 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    choosePlan
                  </button>
                </div>
              </div>
            </div>
          ) : selectedCategory === 'Kids Fitness' ? (
            /* KIDS FITNESS SPECIFIC PLAN CARD MATCHING FIRST & SECOND SCREENSHOTS */
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white mb-3">Kids Fitness</h3>
              <div className="p-6 rounded-3xl border-2 border-blue-600/80 bg-slate-900/90 shadow-2xl space-y-5">
                
                {kidsWarning && (
                  <div className="bg-amber-500/20 border border-amber-500/50 text-amber-300 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between">
                    <span>⚠️ {kidsWarning}</span>
                    <button type="button" onClick={() => setKidsWarning(null)} className="text-amber-300 font-black hover:text-white">✕</button>
                  </div>
                )}

                {/* Frequency Dropdown (1x Javë, 2x Javë, 3x Javë) */}
                <div>
                  <select
                    value={kidsFrequency}
                    onChange={(e) => {
                      setKidsFrequency(e.target.value);
                      setKidsWarning(null);
                    }}
                    className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                  >
                    <option value="1x Javë" className="bg-slate-900 text-white">1x Javë</option>
                    <option value="2x Javë" className="bg-slate-900 text-white">2x Javë</option>
                    <option value="3x Javë" className="bg-slate-900 text-white">3x Javë</option>
                  </select>
                </div>

                {/* Time slot dropdown */}
                <div>
                  <select
                    value={kidsTimeSlot}
                    onChange={(e) => setKidsTimeSlot(e.target.value)}
                    className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
                  >
                    <option value="18:00 - 19:00" className="bg-slate-900 text-white">18:00 - 19:00</option>
                    <option value="19:00 - 20:00" className="bg-slate-900 text-white">19:00 - 20:00</option>
                  </select>
                </div>

                {/* Days of week selector buttons */}
                <div>
                  <div className="grid grid-cols-3 gap-2">
                    {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map((day) => {
                      const isSel = kidsDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            if (isSel) {
                              setKidsWarning(null);
                              setKidsDays(kidsDays.filter(d => d !== day));
                            } else {
                              if (kidsDays.length >= 2) {
                                setKidsWarning('Mund të zgjidhni maksimum 2 ditë për këtë plan.');
                              } else {
                                setKidsWarning(null);
                                setKidsDays([...kidsDays, day]);
                              }
                            }
                          }}
                          className={`py-2 px-1 rounded-xl text-[11px] font-extrabold border transition ${
                            isSel
                              ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                              : 'border-blue-500/40 text-blue-300 hover:bg-blue-600/20'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs font-semibold text-slate-300 mt-3 text-center">
                    Zgjedhe maksimum 2 ditët e javës
                  </p>
                </div>

                {/* Price Display */}
                <div className="text-2xl font-black text-white font-mono text-center pt-2">
                  {Math.round(getKidsPrice() * (1 - selectedDiscount / 100))} €
                </div>

                {/* Zgjidh Planin Button */}
                <button
                  type="button"
                  onClick={() => setSuccessMessage(`Plani 'Kids Fitness' (${kidsFrequency}) u zgjodh!`)}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm border-2 border-blue-500 shadow-xl transition"
                >
                  Zgjidh Planin
                </button>
              </div>
            </div>
          ) : selectedCategory === 'Step Adults' ? (
            /* STEP ADULTS SPECIFIC PLAN CARD MATCHING THIRD & FOURTH SCREENSHOTS */
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white mb-3">Step Adults</h3>
              <div className="p-6 rounded-3xl border-2 border-blue-600/80 bg-slate-900/90 shadow-2xl space-y-5">
                
                {/* Yellow Warning Banner Matching Screenshot */}
                {adultsWarning && (
                  <div className="bg-amber-500/20 border border-amber-500/50 text-amber-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between shadow-lg">
                    <span>⚠️ {adultsWarning}</span>
                    <button type="button" onClick={() => setAdultsWarning(null)} className="text-amber-300 font-black hover:text-white ml-2">✕</button>
                  </div>
                )}

                {/* Plani Label & Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1.5">Plani</label>
                  <select
                    value={adultsPlan}
                    onChange={(e) => {
                      setAdultsPlan(e.target.value);
                      setAdultsWarning(null);
                    }}
                    className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                  >
                    <option value="3x Javë" className="bg-slate-900 text-white">3x Javë</option>
                    <option value="5x Javë" className="bg-slate-900 text-white">5x Javë</option>
                    <option value="1 Muaj" className="bg-slate-900 text-white">1 Muaj</option>
                    <option value="3 Muaj" className="bg-slate-900 text-white">3 Muaj</option>
                  </select>
                </div>

                {/* Days selection buttons grid */}
                <div>
                  <p className="text-xs font-semibold text-blue-300 mb-2.5">
                    {adultsPlan === '5x Javë' ? 'Zgjidhni 5 ditë' : 'Zgjidhni 3 ditë'}
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['E HËNË', 'E MARTË', 'E MËRKURË', 'E ENJTE', 'E PREMTE', 'E SHTUNË'].map((day) => {
                      const isSel = adultsDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            const maxAllowed = adultsPlan === '5x Javë' ? 5 : 3;
                            if (isSel) {
                              setAdultsWarning(null);
                              setAdultsDays(adultsDays.filter(d => d !== day));
                            } else {
                              if (adultsDays.length >= maxAllowed) {
                                setAdultsWarning(`Mund të zgjidhni maksimum ${maxAllowed} ditë për këtë plan.`);
                              } else {
                                setAdultsWarning(null);
                                setAdultsDays([...adultsDays, day]);
                              }
                            }
                          }}
                          className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition ${
                            isSel
                              ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                              : 'border-blue-500/40 text-blue-300 hover:bg-blue-600/20'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Attached Timings: Orari për secilën ditë */}
                {adultsDays.length > 0 && (
                  <div className="space-y-2.5 pt-3 border-t border-indigo-500/15">
                    <label className="block text-xs font-bold text-blue-300">Orari për secilën ditë</label>
                    <div className="space-y-2">
                      {adultsDays.map((day) => (
                        <div key={day} className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-white uppercase">{day}</span>
                          <select
                            value={adultsDayTimes[day] || '08:00 - 09:00'}
                            onChange={(e) => setAdultsDayTimes({ ...adultsDayTimes, [day]: e.target.value })}
                            className="bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
                          >
                            <option value="08:00 - 09:00" className="bg-slate-900 text-white">08:00 - 09:00</option>
                            <option value="09:00 - 10:00" className="bg-slate-900 text-white">09:00 - 10:00</option>
                            <option value="10:00 - 11:00" className="bg-slate-900 text-white">10:00 - 11:00</option>
                            <option value="17:00 - 18:00" className="bg-slate-900 text-white">17:00 - 18:00</option>
                            <option value="18:00 - 19:00" className="bg-slate-900 text-white">18:00 - 19:00</option>
                            <option value="19:00 - 20:00" className="bg-slate-900 text-white">19:00 - 20:00</option>
                            <option value="20:00 - 21:00" className="bg-slate-900 text-white">20:00 - 21:00</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Row */}
                <div className="flex items-center justify-between border-t border-indigo-500/15 pt-3">
                  <span className="text-sm font-bold text-slate-300">Çmimi</span>
                  <span className="text-2xl font-black text-white font-mono">
                    {Math.round(getAdultsPrice() * (1 - selectedDiscount / 100))} €
                  </span>
                </div>

                {/* Zgjidh Planin Button */}
                <button
                  type="button"
                  onClick={() => setSuccessMessage(`Plani 'Step Adults' (${adultsPlan}) u zgjodh!`)}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm border-2 border-blue-500 shadow-xl transition"
                >
                  Zgjidh Planin
                </button>
              </div>
            </div>
          ) : selectedCategory === 'Individual' ? (
            /* INDIVIDUAL SPECIFIC PLAN CARDS MATCHING SCREENSHOTS */
            <div className="space-y-6">
              {/* ANËTARËSIA BAZIKE */}
              <div>
                <h3 className="text-xl font-black text-white mb-3">Anëtarësia Bazike</h3>
                <div
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    selectedPlanType === 'bazike'
                      ? 'border-blue-600 bg-slate-900/90 shadow-2xl shadow-blue-500/20'
                      : 'border-blue-600/70 bg-slate-900/50'
                  } space-y-4`}
                >
                  {/* Dropdown 1: Month (1 muaj, 3 muaj, 6 muaj, 12 muaj) */}
                  <div>
                    <label className="block text-xs font-semibold text-blue-300 mb-1">Muajt</label>
                    <select
                      value={bazikeMonth}
                      onChange={(e) => setBazikeMonth(e.target.value)}
                      className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="1 muaj" className="bg-slate-900 text-white">1 muaj</option>
                      <option value="3 muaj" className="bg-slate-900 text-white">3 muaj</option>
                      <option value="6 muaj" className="bg-slate-900 text-white">6 muaj</option>
                      <option value="12 muaj" className="bg-slate-900 text-white">12 muaj</option>
                    </select>
                  </div>

                  {/* Dropdown 2: Entries (8 hyrje, 4 hyrje, 12 hyrje) */}
                  <div>
                    <label className="block text-xs font-semibold text-blue-300 mb-1">Hyrjet në Muaj</label>
                    <select
                      value={bazikeHyrje}
                      onChange={(e) => setBazikeHyrje(e.target.value)}
                      className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      {(() => {
                        const m = bazikeMonth.includes('12') ? 12 : bazikeMonth.includes('6') ? 6 : bazikeMonth.includes('3') ? 3 : 1;
                        const p4 = m === 1 ? 20 : m === 3 ? 55 : m === 6 ? 100 : 190;
                        const p8 = m === 1 ? 35 : m === 3 ? 95 : m === 6 ? 180 : 330;
                        const p12 = m === 1 ? 45 : m === 3 ? 120 : m === 6 ? 230 : 420;
                        return (
                          <>
                            <option value="8 hyrje" className="bg-slate-900 text-white">8 hyrje — {p8} €</option>
                            <option value="4 hyrje" className="bg-slate-900 text-white">4 hyrje — {p4} €</option>
                            <option value="12 hyrje" className="bg-slate-900 text-white">12 hyrje — {p12} €</option>
                          </>
                        );
                      })()}
                    </select>
                  </div>

                  {/* Info stats */}
                  <div className="space-y-1 text-sm font-semibold text-slate-200 pt-1">
                    <p>
                      Hyrjet: <span className="font-mono text-white font-bold">{bazikeHyrje.includes('4') ? '4' : bazikeHyrje.includes('12') ? '12' : '8'} në muaj</span>
                    </p>
                    <p>
                      Çmimi Totali: <span className="font-mono text-emerald-400 font-extrabold">{Math.round(getBazikePrice() * (1 - selectedDiscount / 100))} €</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlanType('bazike');
                      setSuccessMessage(`Plani 'Anëtarësia Bazike' (${bazikeMonth}, ${bazikeHyrje}) u zgjodh!`);
                    }}
                    className={`w-full py-3 rounded-2xl font-black text-sm border-2 transition ${
                      selectedPlanType === 'bazike'
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xl'
                        : 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    Zgjidh Planin
                  </button>
                </div>
              </div>

              {/* ANËTARËSIA AKTIVE */}
              <div>
                <h3 className="text-xl font-black text-white mb-3">Anëtarësia Aktive</h3>
                <div
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    selectedPlanType === 'aktive'
                      ? 'border-blue-600 bg-slate-900/90 shadow-2xl shadow-blue-500/20'
                      : 'border-blue-600/70 bg-slate-900/50'
                  } space-y-4`}
                >
                  {/* Dropdown Month: 1 muaj, 3 muaj, 6 muaj, 12 muaj */}
                  <div>
                    <label className="block text-xs font-semibold text-blue-300 mb-1">Muajt</label>
                    <select
                      value={aktiveMonth}
                      onChange={(e) => setAktiveMonth(e.target.value)}
                      className="w-full bg-blue-500/15 border border-blue-400/30 text-indigo-100 font-bold rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                      <option value="1 muaj" className="bg-slate-900 text-white">1 muaj — 60 €</option>
                      <option value="3 muaj" className="bg-slate-900 text-white">3 muaj — 160 €</option>
                      <option value="6 muaj" className="bg-slate-900 text-white">6 muaj — 300 €</option>
                      <option value="12 muaj" className="bg-slate-900 text-white">12 muaj — 550 €</option>
                    </select>
                  </div>

                  {/* Info stats */}
                  <div className="space-y-1 text-sm font-semibold text-slate-200 pt-1">
                    <p>
                      Hyrjet: <span className="font-mono text-white font-bold">I pashmangshëm / Unlimited</span>
                    </p>
                    <p>
                      Çmimi Totali: <span className="font-mono text-emerald-400 font-extrabold">{Math.round(getAktivePrice() * (1 - selectedDiscount / 100))} €</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlanType('aktive');
                      setSuccessMessage(`Plani 'Anëtarësia Aktive' (${aktiveMonth}) u zgjodh!`);
                    }}
                    className={`w-full py-3 rounded-2xl font-black text-sm border-2 transition ${
                      selectedPlanType === 'aktive'
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xl'
                        : 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    Zgjidh Planin
                  </button>
                </div>
              </div>
            </div>
          ) : selectedCategory === 'Rezervime Grupore' ? (
            /* REZERVI ME GRUPORE RIGHT SIDE CARD MATCHING SCREENSHOT 1 & 2 */
            <div className="space-y-6">
              <div className="p-8 rounded-3xl border-2 border-blue-500/60 bg-slate-900/90 text-center flex flex-col items-center justify-center min-h-[180px] shadow-2xl space-y-3">
                <h3 className="text-xl font-extrabold text-blue-400">Shuma Totale</h3>
                <div className="text-4xl font-black text-blue-500 font-mono">
                  {personCount > 0 ? `${Math.round(personCount * groupOfferPrice)}€` : '0€'}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl border-2 border-blue-500 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl transition active:scale-98"
                >
                  Dërgo Kërkesën
                </button>
              </div>
            </div>
          ) : selectedCategory === 'Duo (Fitness+Not)' ? (
            /* DUO (FITNESS+NOT) RIGHT SIDE CARD MATCHING SCREENSHOT 4 */
            <div className="space-y-6">
              <div className="p-6 rounded-3xl border-2 border-blue-500/60 bg-slate-900/90 shadow-2xl space-y-6 text-center">
                <div>
                  <h3 className="text-2xl font-black text-blue-400 tracking-tight">Duo Plan</h3>
                  <p className="text-xs font-semibold text-blue-300/80 mt-1">Fitness + Not</p>
                </div>

                <div className="p-4 rounded-2xl border-2 border-blue-400/50 bg-blue-500/10 text-center">
                  <span className="text-2xl font-black text-blue-400 font-mono">
                    {Math.round(60 * (1 - selectedDiscount / 100))}€ / Muaj
                  </span>
                </div>

                <div className="divide-y divide-indigo-500/20 text-xs font-semibold text-slate-200 text-left space-y-2">
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-blue-300">Hyrje Total</span>
                    <span className="font-bold text-white font-mono">16</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-blue-300">Hyrje për Javë</span>
                    <span className="font-bold text-white font-mono">4</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-blue-300">Hyrje Fitness</span>
                    <span className="font-bold text-white font-mono">8</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-blue-300">Hyrje Pishina</span>
                    <span className="font-bold text-white font-mono">8</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSuccessMessage("Plani 'Duo (Fitness+Not)' u zgjodh me sukses!")}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm border-2 border-blue-500 shadow-xl transition"
                >
                  Zgjidh Planin
                </button>
              </div>
            </div>
          ) : (
            /* STANDARD PLAN CARDS FOR OTHER CATEGORIES */
            <>
              <div className="glass-panel p-6 rounded-3xl border border-blue-400/40 shadow-2xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>

                <div className="flex items-center justify-between border-b border-indigo-500/15 pb-3">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    Plani i Zgjedhur
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                    Pishinë & Fitnes
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Kohëzgjatja</label>
                    <select
                      value={duration}
                      onChange={(e: any) => {
                        setDuration(e.target.value);
                        if (e.target.value === '3 Muaj') setSelectedPlanPrice(120);
                        else if (e.target.value === '6 Muaj') setSelectedPlanPrice(220);
                        else if (e.target.value === '12 Muaj') setSelectedPlanPrice(400);
                        else setSelectedPlanPrice(45);
                      }}
                      className="w-full bg-slate-900 border border-indigo-500/30 rounded-xl p-2.5 text-white font-bold focus:outline-none"
                    >
                      <option value="1 Muaj">1 Muaj</option>
                      <option value="3 Muaj">3 Muaj</option>
                      <option value="6 Muaj">6 Muaj</option>
                      <option value="12 Muaj">12 Muaj</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Frekuenca i Hyrjeve / Koha</label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-500/30 rounded-xl p-2.5 text-white font-medium focus:outline-none"
                    >
                      <option value="2 Hyrje në Javë - 8 Hyrje në Muaj">2 Hyrje në Javë - 8 Hyrje në Muaj</option>
                      <option value="1 Hyrje në Javë - 4 Hyrje në Muaj">1 Hyrje në Javë - 4 Hyrje në Muaj</option>
                      <option value="3 Hyrje në Javë - 12 Hyrje në Muaj">3 Hyrje në Javë - 12 Hyrje në Muaj</option>
                      <option value="4 Hyrje në Javë - 16 Hyrje në Muaj">4 Hyrje në Javë - 16 Hyrje në Muaj</option>
                      <option value="Unlimited - Pa Limite">Unlimited - Pa Limite</option>
                    </select>
                  </div>

                  {/* Price Display */}
                  <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-950 to-slate-900 border border-indigo-500/30 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Çmimi Përfundimtar</span>
                    <div className="text-3xl font-black text-emerald-400 font-mono">
                      €{finalCalculatedPrice.toFixed(2)}
                    </div>
                    {selectedDiscount > 0 && (
                      <span className="text-[11px] text-indigo-300 block">
                        (Zbritje prej {selectedDiscount}% e aplikuar)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSuccessMessage(`Plani "${duration}" u zgjodh me sukses!`)}
                    className="w-full py-2.5 rounded-xl border border-blue-400/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 font-bold text-xs transition"
                  >
                    Zgjidh Planin
                  </button>
                </div>
              </div>

              {/* Sub-Category Sample Plans */}
              <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Nën-Kategoritë & Ofertat
                </h3>

                <div className="space-y-2 text-xs">
                  <div 
                    onClick={() => { setSelectedPlanPrice(45); setDuration('1 Muaj'); }}
                    className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-blue-400/40 cursor-pointer flex items-center justify-between transition"
                  >
                    <div>
                      <span className="font-bold text-white block">Shkolla e Notit për Fëmijët</span>
                      <span className="text-[10px] text-slate-400">1 Muaj • 2x në javë</span>
                    </div>
                    <span className="font-bold text-emerald-400 font-mono">45.00 €</span>
                  </div>

                  <div 
                    onClick={() => { setSelectedPlanPrice(50); setDuration('1 Muaj'); }}
                    className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-blue-400/40 cursor-pointer flex items-center justify-between transition"
                  >
                    <div>
                      <span className="font-bold text-white block">Shkolla e Notit për Foshnjat</span>
                      <span className="text-[10px] text-slate-400">1 Muaj • 2x në javë</span>
                    </div>
                    <span className="font-bold text-emerald-400 font-mono">50.00 €</span>
                  </div>

                  <div 
                    onClick={() => { setSelectedPlanPrice(60); setDuration('1 Muaj'); }}
                    className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-blue-400/40 cursor-pointer flex items-center justify-between transition"
                  >
                    <div>
                      <span className="font-bold text-white block">Shkolla e Notit për Të Rriturit</span>
                      <span className="text-[10px] text-slate-400">1 Muaj / 3 Javë</span>
                    </div>
                    <span className="font-bold text-emerald-400 font-mono">60.00 €</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      </form>
    </div>
  );
};
