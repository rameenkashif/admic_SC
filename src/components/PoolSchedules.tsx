import React, { useState } from 'react';
import { Plus, Printer, Trash2 } from 'lucide-react';
import { PoolSlot, NavTab } from '../types';

interface ScheduleMember {
  id: string;
  name: string;
  lastName: string;
  parentName: string;
  type: string;
  age: number;
  entries: number;
  address: string;
  phone: string;
  email: string;
  pool: string;
  isFill?: boolean;
  selectedDays: { [day: string]: string };
  day: string;
  timeSlot: string;
}

interface PoolSchedulesProps {
  activeTab: NavTab;
  poolSlots: PoolSlot[];
  onAddSlot: (slot: PoolSlot) => void;
}

export const PoolSchedules: React.FC<PoolSchedulesProps> = ({
  activeTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTempModal, setShowTempModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ScheduleMember | null>(null);

  // Form State for Temp Reservation ("Rezervim i përkohshëm")
  const [tempName, setTempName] = useState('');
  const [selectedTempDays, setSelectedTempDays] = useState<{ [day: string]: boolean }>({});
  const [isFillMode, setIsFillMode] = useState(false);

  // Members dataset covering Pishina me 4 korsi, Pishina e vogël Kati 1, and Kati 2
  const [members, setMembers] = useState<ScheduleMember[]>([
    // === 4 KORSI ===
    { id: 'm-1', name: 'Luna', lastName: 'Ramadani', parentName: 'Agim', type: 'Shkolla e Notit', age: 10, entries: 8, address: 'Prishtinë', phone: '044 202014', email: 'luna.ramadani@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-2', name: 'Erisa', lastName: 'Saraci', parentName: 'Blerim', type: 'Shkolla e Notit', age: 12, entries: 8, address: 'Prishtinë', phone: '049 112233', email: 'erisa.saraci@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-3', name: 'Ensar', lastName: 'Syla', parentName: 'Driton', type: 'Shkolla e Notit', age: 9, entries: 4, address: 'Fushë Kosovë', phone: '045 998877', email: 'ensar.syla@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-4', name: 'Amanta', lastName: 'Emini', parentName: 'Fatos', type: 'Shkolla e Notit', age: 11, entries: 12, address: 'Prishtinë', phone: '044 554433', email: 'amanta.emini@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-5', name: 'Luna', lastName: 'Syla', parentName: 'Kreshnik', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '049 332211', email: 'luna.syla@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-6', name: 'Melisa', lastName: 'Krasniqi', parentName: 'Valon', type: 'Shkolla e Notit', age: 13, entries: 8, address: 'Prishtinë', phone: '044 123789', email: 'melisa.krasniqi@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-7', name: 'Daorsa', lastName: 'Gashi', parentName: 'Arben', type: 'Shkolla e Notit', age: 11, entries: 3, address: 'Prishtinë', phone: '044 202014', email: 'daorsa.gashi@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E HËNË': '18:00', 'E MËRKURË': '18:00', 'E PREMTE': '18:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-8', name: 'Arta', lastName: 'Fejzullahu', parentName: 'Lulzim', type: 'Shkolla e Notit', age: 10, entries: 8, address: 'Prishtinë', phone: '044 887766', email: 'arta.fejzullahu@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-9', name: 'Denis', lastName: 'Shala', parentName: 'Besnik', type: 'Shkolla e Notit', age: 14, entries: 12, address: 'Prishtinë', phone: '049 776655', email: 'denis.shala@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-10', name: 'Erion', lastName: 'Magashi', parentName: 'Ilir', type: 'Shkolla e Notit', age: 9, entries: 8, address: 'Fushë Kosovë', phone: '045 443322', email: 'erion.magashi@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-11', name: 'Blend', lastName: 'Dedaqi', parentName: 'Genc', type: 'Shkolla e Notit', age: 11, entries: 8, address: 'Prishtinë', phone: '044 990011', email: 'blend.dedaqi@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-12', name: 'Erza', lastName: 'Gashi', parentName: 'Agron', type: 'Shkolla e Notit', age: 12, entries: 8, address: 'Prishtinë', phone: '049 221144', email: 'erza.gashi@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-13', name: 'Sara', lastName: 'Merovci', parentName: 'Naim', type: 'Shkolla e Notit', age: 10, entries: 8, address: 'Prishtinë', phone: '044 334455', email: 'sara.merovci@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'm-14', name: 'Jon', lastName: 'Shamli', parentName: 'Petrit', type: 'Shkolla e Notit', age: 13, entries: 8, address: 'Prishtinë', phone: '049 889900', email: 'jon.shamli@gmail.com', pool: 'Pishina me 4 korsi', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },

    // === PISHINA E VOGËL - KATI I PARË ===
    // E HËNË 17:00
    { id: 'k1-1', name: 'Mersi', lastName: 'Deliu', parentName: '', type: 'Shkolla e Notit', age: 7, entries: 8, address: 'Prishtinë', phone: '044 100200', email: 'mersi@gmail.com', pool: 'Pishina e vogël - Kati i parë', isFill: true, selectedDays: { 'E HËNË': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-2', name: 'Leon', lastName: 'Pira', parentName: 'Bekim', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '044 111222', email: 'leon.pira@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E HËNË': '17:00', 'E MËRKURË': '17:00', 'E PREMTE': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-3', name: 'Ana', lastName: 'Restelica', parentName: 'Fisnik', type: 'Shkolla e Notit', age: 6, entries: 8, address: 'Prishtinë', phone: '049 222333', email: 'ana.restelica@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E HËNË': '17:00', 'E MËRKURË': '17:00', 'E ENJTE': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-4', name: 'Oaza', lastName: 'Krasniqi', parentName: 'Luan', type: 'Shkolla e Notit', age: 7, entries: 8, address: 'Prishtinë', phone: '044 333444', email: 'oaza.krasniqi@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E HËNË': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-5', name: 'Malza', lastName: 'Kamberi', parentName: 'Sami', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '045 444555', email: 'malza.kamberi@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E HËNË': '17:00', 'E MËRKURË': '17:00', 'E PREMTE': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-6', name: 'Amra', lastName: 'Bylygbashi', parentName: 'Mentor', type: 'Shkolla e Notit', age: 7, entries: 8, address: 'Prishtinë', phone: '049 555666', email: 'amra.bylygbashi@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E HËNË': '17:00', 'E MËRKURË': '17:00', 'E PREMTE': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },

    // E MARTË 17:00
    { id: 'k1-7', name: 'Leke', lastName: 'Ismaili', parentName: 'Bujar', type: 'Shkolla e Notit', age: 9, entries: 8, address: 'Prishtinë', phone: '044 666777', email: 'leke.ismaili@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-8', name: 'Aaron', lastName: 'Trepqa', parentName: 'Gani', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '049 777888', email: 'aaron.trepqa@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-9', name: 'Nilgun', lastName: 'Kurtulus', parentName: 'Eren', type: 'Shkolla e Notit', age: 7, entries: 8, address: 'Prishtinë', phone: '045 888999', email: 'nilgun.kurtulus@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-10', name: 'Anel', lastName: 'Bislimi', parentName: 'Arian', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '044 999000', email: 'anel.bislimi@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-11', name: 'Majda', lastName: 'Sopjani', parentName: 'Burim', type: 'Shkolla e Notit', age: 6, entries: 8, address: 'Prishtinë', phone: '049 123123', email: 'majda.sopjani@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E MARTË': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-12', name: 'Buna', lastName: 'Sopjani', parentName: 'Burim', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '049 123124', email: 'buna.sopjani@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E MARTË': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },

    // E MËRKURË 17:00
    { id: 'k1-13', name: 'Mersi', lastName: 'Deliu', parentName: '', type: 'Shkolla e Notit', age: 7, entries: 8, address: 'Prishtinë', phone: '044 100200', email: 'mersi@gmail.com', pool: 'Pishina e vogël - Kati i parë', isFill: true, selectedDays: { 'E MËRKURË': '17:00' }, day: 'E MËRKURË', timeSlot: '17:00 - 18:00' },
    { id: 'k1-14', name: 'Daris', lastName: 'Pira', parentName: 'Bekim', type: 'Shkolla e Notit', age: 6, entries: 8, address: 'Prishtinë', phone: '044 111223', email: 'daris.pira@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E MËRKURË': '17:00', 'E PREMTE': '17:00' }, day: 'E MËRKURË', timeSlot: '17:00 - 18:00' },

    // E ENJTE 17:00
    { id: 'k1-15', name: 'Alp', lastName: 'Pacolli', parentName: 'Valdrin', type: 'Shkolla e Notit', age: 7, entries: 8, address: 'Prishtinë', phone: '044 543210', email: 'alp.pacolli@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E ENJTE': '17:00' }, day: 'E ENJTE', timeSlot: '17:00 - 18:00' },

    // E PREMTE 17:00
    { id: 'k1-16', name: 'Bora', lastName: 'Sokoli', parentName: 'Gezim', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '049 876543', email: 'bora.sokoli@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E PREMTE': '17:00' }, day: 'E PREMTE', timeSlot: '17:00 - 18:00' },
    { id: 'k1-17', name: 'Denata', lastName: 'Aliu', parentName: 'Kujtim', type: 'Shkolla e Notit', age: 9, entries: 8, address: 'Prishtinë', phone: '045 234567', email: 'denata.aliu@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E PREMTE': '17:00' }, day: 'E PREMTE', timeSlot: '17:00 - 18:00' },

    // E SHTUNË 10:00
    { id: 'k1-18', name: 'Hafsa', lastName: 'Hoda', parentName: 'Krenar', type: 'Shkolla e Notit', age: 7, entries: 8, address: 'Prishtinë', phone: '044 345678', email: 'hafsa.hoda@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k1-19', name: 'Akil', lastName: 'Zymeri', parentName: 'Visar', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '049 456789', email: 'akil.zymeri@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k1-20', name: 'Amarda', lastName: 'Zymeri', parentName: 'Visar', type: 'Shkolla e Notit', age: 6, entries: 8, address: 'Prishtinë', phone: '049 456780', email: 'amarda.zymeri@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k1-21', name: 'Ana', lastName: 'Vrajolli', parentName: 'Shpetim', type: 'Shkolla e Notit', age: 8, entries: 8, address: 'Prishtinë', phone: '045 567890', email: 'ana.vrajolli@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k1-22', name: 'Buna', lastName: 'Vrajolli', parentName: 'Shpetim', type: 'Shkolla e Notit', age: 6, entries: 8, address: 'Prishtinë', phone: '045 567891', email: 'buna.vrajolli@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k1-23', name: 'Muhamed', lastName: 'Trepça', parentName: 'Gani', type: 'Shkolla e Notit', age: 9, entries: 8, address: 'Prishtinë', phone: '044 678901', email: 'muhamed.trepca@gmail.com', pool: 'Pishina e vogël - Kati i parë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },

    // === PISHINA E VOGËL - KATI I DYTË ===
    // E HËNË 17:00 & 18:00
    { id: 'k2-1', name: 'Art', lastName: 'Pretreshnja', parentName: 'Driton', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '044 789012', email: 'art.pretreshnja@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E HËNË': '17:00', 'E ENJTE': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-2', name: 'Malt', lastName: 'Neziri', parentName: 'Agon', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '049 890123', email: 'malt.neziri@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E HËNË': '17:00', 'E MËRKURË': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-3', name: 'Jar', lastName: 'Shala', parentName: 'Blerim', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '045 901234', email: 'jar.shala@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E HËNË': '17:00', 'E MËRKURË': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-4', name: 'Elena', lastName: 'Dakaj', parentName: 'Faton', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '044 012345', email: 'elena.dakaj@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E HËNË': '17:00' }, day: 'E HËNË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-5', name: 'Valë', lastName: 'Kabashi', parentName: 'Lulzim', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '049 123456', email: 'vale.kabashi@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E HËNË': '18:00', 'E MËRKURË': '18:00' }, day: 'E HËNË', timeSlot: '18:00 - 19:00' },

    // E MARTË 17:00 & 18:00
    { id: 'k2-6', name: 'Gjon', lastName: 'Demiri', parentName: 'Gjon', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '044 234567', email: 'gjon.demiri@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MARTË': '17:00', 'E PREMTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-7', name: 'Blir', lastName: 'Dermaku', parentName: 'Sokol', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '049 345678', email: 'blir.dermaku@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-8', name: 'Roel', lastName: 'Foniqi', parentName: 'Mentor', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '045 456789', email: 'roel.foniqi@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-9', name: 'Mal', lastName: 'Haxhidauti', parentName: 'Krenar', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '044 567890', email: 'mal.haxhidauti@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-10', name: 'Mar', lastName: 'Rizani', parentName: 'Valon', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '049 678901', email: 'mar.rizani@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-11', name: 'Drin', lastName: 'Prekadini', parentName: 'Agim', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '045 789012', email: 'drin.prekadini@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MARTË': '17:00', 'E ENJTE': '17:00' }, day: 'E MARTË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-12', name: 'Rua', lastName: 'Hajrizaj', parentName: 'Naim', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '044 890123', email: 'rua.hajrizaj@gmail.com', pool: 'Pishina e vogël - Kati i dytë', isFill: true, selectedDays: { 'E MARTË': '18:00' }, day: 'E MARTË', timeSlot: '18:00 - 19:00' },

    // E MËRKURË 17:00
    { id: 'k2-13', name: 'Ergen', lastName: 'Qerimi', parentName: 'Petrit', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '049 901234', email: 'ergen.qerimi@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MËRKURË': '17:00', 'E PREMTE': '17:00' }, day: 'E MËRKURË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-14', name: 'Drin', lastName: 'Hashani', parentName: 'Bekim', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '045 012345', email: 'drin.hashani@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MËRKURË': '17:00', 'E PREMTE': '17:00' }, day: 'E MËRKURË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-15', name: 'Ador', lastName: 'Ruqi', parentName: 'Luan', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '044 123456', email: 'ador.ruqi@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MËRKURË': '17:00' }, day: 'E MËRKURË', timeSlot: '17:00 - 18:00' },
    { id: 'k2-16', name: 'Luna', lastName: 'Shala', parentName: 'Blerim', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '049 234567', email: 'luna.shala@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E MËRKURË': '17:00', 'E PREMTE': '17:00' }, day: 'E MËRKURË', timeSlot: '17:00 - 18:00' },

    // E ENJTE 18:00
    { id: 'k2-17', name: 'Luigj', lastName: 'Zeqiri', parentName: 'Gjoni', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '045 345678', email: 'luigj.zeqiri@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E ENJTE': '18:00' }, day: 'E ENJTE', timeSlot: '18:00 - 19:00' },

    // E PREMTE 17:00 & 18:00
    { id: 'k2-18', name: 'Rajja', lastName: 'Krasniqi', parentName: 'Fisnik', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '044 456789', email: 'rajja.krasniqi@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E PREMTE': '17:00' }, day: 'E PREMTE', timeSlot: '17:00 - 18:00' },
    { id: 'k2-19', name: 'Nea', lastName: 'Maloku', parentName: 'Agon', type: 'Shkolla e Notit', age: 3, entries: 8, address: 'Prishtinë', phone: '049 567890', email: 'nea.maloku@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E PREMTE': '17:00' }, day: 'E PREMTE', timeSlot: '17:00 - 18:00' },
    { id: 'k2-20', name: 'Klea', lastName: 'Berisha', parentName: 'Bujar', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '045 678901', email: 'klea.berisha@gmail.com', pool: 'Pishina e vogël - Kati i dytë', isFill: true, selectedDays: { 'E PREMTE': '18:00' }, day: 'E PREMTE', timeSlot: '18:00 - 19:00' },

    // E SHTUNË 10:00
    { id: 'k2-21', name: 'Eden', lastName: 'Shabani', parentName: 'Valon', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '044 789012', email: 'eden.shabani@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k2-22', name: 'Alp', lastName: 'Salihu', parentName: 'Burim', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '049 890123', email: 'alp.salihu@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k2-23', name: 'Inaja', lastName: 'Gashi', parentName: 'Arben', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '045 901234', email: 'inaja.gashi@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k2-24', name: 'Jon', lastName: 'Krasniqi', parentName: 'Driton', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '044 012345', email: 'jon.krasniqi@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k2-25', name: 'Zohen', lastName: 'Vitia', parentName: 'Mentor', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '049 123456', email: 'zohen.vitia@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
    { id: 'k2-26', name: 'Narta', lastName: 'Hasani', parentName: 'Kujtim', type: 'Shkolla e Notit', age: 4, entries: 8, address: 'Prishtinë', phone: '045 234567', email: 'narta.hasani@gmail.com', pool: 'Pishina e vogël - Kati i dytë', selectedDays: { 'E SHTUNË': '10:00' }, day: 'E SHTUNË', timeSlot: '10:00 - 11:00' },
  ]);

  const daysList = ['E HËNË', 'E MARTË', 'E MËRKURË', 'E ENJTE', 'E PREMTE', 'E SHTUNË'];

  const handlePrint = () => {
    window.print();
  };

  const handleSaveTempReservation = () => {
    const finalName = tempName.trim() || (isFillMode ? 'FILL' : '');
    if (!finalName) return;

    // Convert selected temp days to uppercase map with appropriate default times
    const daysMap: { [day: string]: string } = {};
    Object.keys(selectedTempDays).forEach((dayKey) => {
      if (selectedTempDays[dayKey]) {
        const uppercaseDay = dayKey.toUpperCase();
        daysMap[uppercaseDay] = uppercaseDay === 'E SHTUNË' ? '10:00' : '16:00';
      }
    });

    // Default to Monday if no day was selected
    if (Object.keys(daysMap).length === 0) {
      daysMap['E HËNË'] = '16:00';
    }

    const firstDay = Object.keys(daysMap)[0];
    const isSaturdayFirst = firstDay === 'E SHTUNË';

    let targetPool = 'Pishina me 4 korsi';
    if (activeTab === 'pool_small') targetPool = 'Pishina e vogël - Kati i parë';
    else if (activeTab === 'pool_5_lanes') targetPool = 'Pishina me 5 korsi';
    else if (activeTab === 'kids_fitness_schedule') targetPool = 'Kids Fitness';
    else if (activeTab === 'step_adults_schedule') targetPool = 'Step Adults';

    const newMember: ScheduleMember = {
      id: `m-${Date.now()}`,
      name: finalName,
      lastName: '',
      parentName: '',
      type: 'Rezervim i përkohshëm',
      age: 0,
      entries: 1,
      address: 'Prishtinë',
      phone: '',
      email: '',
      pool: targetPool,
      isFill: isFillMode || finalName.toUpperCase().includes('FILL'),
      selectedDays: daysMap,
      day: firstDay,
      timeSlot: isSaturdayFirst ? '10:00 - 11:00' : '16:00 - 17:00',
    };

    setMembers((prev) => [...prev, newMember]);
    setTempName('');
    setSelectedTempDays({});
    setIsFillMode(false);
    setShowTempModal(false);
  };

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setSelectedMember(null);
  };

  const toggleDaySelectedInMemberModal = (dayName: string) => {
    if (!selectedMember) return;
    const currentDays = { ...selectedMember.selectedDays };
    if (currentDays[dayName]) {
      delete currentDays[dayName];
    } else {
      currentDays[dayName] = '18:00';
    }
    setSelectedMember({
      ...selectedMember,
      selectedDays: currentDays,
    });
  };

  const updateDayTimeInMemberModal = (dayName: string, time: string) => {
    if (!selectedMember) return;
    setSelectedMember({
      ...selectedMember,
      selectedDays: {
        ...selectedMember.selectedDays,
        [dayName]: time,
      },
    });
  };

  const handleSaveMemberChanges = () => {
    if (!selectedMember) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === selectedMember.id ? selectedMember : m))
    );
    setSelectedMember(null);
  };

  // Reusable Dark Calendar grid renderer for all pool and fitness schedules
  const renderDarkCalendarGrid = (
    title: string,
    poolFilterName: string,
    badgeBg: string,
    timeSlots: {
      weekdaySlot1: string;
      weekdaySub1?: string;
      weekdaySlot2?: string;
      weekdaySub2?: string;
      saturdaySlot1: string;
      saturdaySub1?: string;
      saturdaySlot2?: string;
      saturdaySub2?: string;
    },
    allowAddTemp: boolean = true,
    capacity: number = 14
  ) => {
    const renderOccupancyBar = (count: number) => {
      const pct = Math.min((count / capacity) * 100, 100);
      const isFull = count >= capacity;
      return (
        <div className="pt-2 mt-2 border-t border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className={isFull ? 'text-rose-400' : 'text-blue-400'}>
              Të zëna: {count}/{capacity}
            </span>
            <span className="text-slate-500">Lirë: {Math.max(capacity - count, 0)}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-500/25 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isFull ? 'bg-rose-500' : 'pool-occupancy-fill bg-blue-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    };

    return (
      <div className="bg-[#0e1322] text-slate-100 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800/80 mb-8 space-y-6">
        {/* Top Header Bar: Title, Search & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className={`w-3.5 h-3.5 rounded-full ${badgeBg} shadow-lg animate-pulse`} />
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Orari javor dhe regjistrimet e anëtarëve në këtë seksion
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Printo Orarin</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Printo (Nesër)</span>
            </button>

            {allowAddTemp && (
              <button
                type="button"
                onClick={() => setShowTempModal(true)}
                className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
                title="Rezervim i përkohshëm"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Rezervim</span>
              </button>
            )}
          </div>
        </div>

        {/* Search bar & info row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#141b2e] p-3.5 rounded-2xl border border-slate-800">
          <div className="text-xs text-blue-400 font-semibold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
            <span>Kërko anëtarët sipas emrit ose mbiemrit</span>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kërko anëtarin..."
              className="w-full bg-[#1b243b] border border-slate-700/80 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Calendar Grid Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {daysList.map((dayName) => {
              const isSaturday = dayName === 'E SHTUNË';

              const slot1Time = isSaturday ? timeSlots.saturdaySlot1 : timeSlots.weekdaySlot1;
              const slot1Sub = isSaturday ? timeSlots.saturdaySub1 : timeSlots.weekdaySub1;

              const slot2Time = isSaturday ? timeSlots.saturdaySlot2 : timeSlots.weekdaySlot2;
              const slot2Sub = isSaturday ? timeSlots.saturdaySub2 : timeSlots.weekdaySub2;

              // Filter members for this pool/section and day
              const dayMembers = members.filter((m) => {
                if (m.pool !== poolFilterName) return false;
                const matchesDay =
                  m.day === dayName ||
                  Boolean(m.selectedDays && m.selectedDays[dayName]);
                if (!matchesDay) return false;
                if (searchTerm) {
                  const q = searchTerm.toLowerCase();
                  return (
                    m.name.toLowerCase().includes(q) ||
                    m.lastName.toLowerCase().includes(q) ||
                    m.phone.toLowerCase().includes(q)
                  );
                }
                return true;
              });

              // Slot 1 members
              const time1Start = slot1Time ? slot1Time.split(' ')[0] : '';
              const slot1Members = dayMembers.filter((m) => {
                if (!slot1Time) return false;
                const sel = m.selectedDays ? m.selectedDays[dayName] : '';
                if (sel && sel.includes(time1Start)) return true;
                if (m.timeSlot && m.timeSlot.includes(time1Start)) return true;
                if (!slot2Time) return true;
                return false;
              });

              // Slot 2 members
              const time2Start = slot2Time ? slot2Time.split(' ')[0] : '';
              const slot2Members = slot2Time
                ? dayMembers.filter((m) => {
                    const sel = m.selectedDays ? m.selectedDays[dayName] : '';
                    if (sel && sel.includes(time2Start)) return true;
                    if (m.timeSlot && m.timeSlot.includes(time2Start)) return true;
                    return false;
                  })
                : [];

              return (
                <div key={dayName} className="space-y-4 flex flex-col">
                  {/* Day Header */}
                  <div className="bg-[#182136] border border-blue-500/30 rounded-2xl py-3 px-2 text-center shadow-md">
                    <span className="font-extrabold text-xs sm:text-sm text-blue-400 uppercase tracking-wider block">
                      {dayName}
                    </span>
                  </div>

                  {/* SLOT 1 BLOCK */}
                  <div className="bg-[#151c2e] border-2 border-blue-500/90 rounded-2xl p-3.5 aspect-square min-h-[230px] overflow-hidden shadow-xl shadow-blue-950/40 hover:border-blue-400 transition flex flex-col justify-between w-full">
                    {/* Timing Badge */}
                    <div className="mb-2 shrink-0">
                      <div className="bg-blue-600/90 text-white font-extrabold px-2.5 py-1 rounded-lg text-xs flex flex-col text-center shadow-sm">
                        <span>{slot1Time}</span>
                        {slot1Sub && (
                          <span className="text-[10px] font-medium text-blue-200">{slot1Sub}</span>
                        )}
                      </div>
                    </div>

                    {/* Members List */}
                    <div className="flex-1 min-h-[104px] overflow-y-auto pr-1 space-y-1.5">
                      {slot1Members.map((m, idx) => (
                        <div
                          key={m.id}
                          onClick={() => setSelectedMember(m)}
                          className="cursor-pointer transition"
                        >
                          {m.isFill ? (
                            <div className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-2.5 py-1.5 rounded-lg text-xs shadow-md text-center transition">
                              {m.name} {m.lastName} (FILL)
                            </div>
                          ) : (
                            <div className="bg-blue-600/90 hover:bg-blue-500 text-white font-semibold text-xs px-2.5 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-2 border border-blue-400/30">
                              <span className="bg-blue-900/90 text-blue-100 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                                {idx + 1}
                              </span>
                              <span className="truncate">{m.name} {m.lastName}</span>
                            </div>
                          )}
                        </div>
                      ))}

                      {slot1Members.length === 0 && (
                        <div className="text-xs text-slate-500 italic text-center py-8">
                          Nuk ka të regjistruar
                        </div>
                      )}
                    </div>

                    {/* Occupancy Footer */}
                    <div className="shrink-0">{renderOccupancyBar(slot1Members.length)}</div>
                  </div>

                  {/* SLOT 2 BLOCK (OR PLACEHOLDER) */}
                  {slot2Time ? (
                    <div className="bg-[#151c2e] border-2 border-blue-500/90 rounded-2xl p-3.5 aspect-square min-h-[230px] overflow-hidden shadow-xl shadow-blue-950/40 hover:border-blue-400 transition flex flex-col justify-between w-full">
                      <div className="mb-2 shrink-0">
                        <div className="bg-blue-600/90 text-white font-extrabold px-2.5 py-1 rounded-lg text-xs flex flex-col text-center shadow-sm">
                          <span>{slot2Time}</span>
                          {slot2Sub && (
                            <span className="text-[10px] font-medium text-blue-200">{slot2Sub}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-h-[104px] overflow-y-auto pr-1 space-y-1.5">
                        {slot2Members.map((m, idx) => (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMember(m)}
                            className="cursor-pointer transition"
                          >
                            {m.isFill ? (
                              <div className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-2.5 py-1.5 rounded-lg text-xs shadow-md text-center transition">
                                {m.name} {m.lastName} (FILL)
                              </div>
                            ) : (
                              <div className="bg-blue-600/90 hover:bg-blue-500 text-white font-semibold text-xs px-2.5 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-2 border border-blue-400/30">
                                <span className="bg-blue-900/90 text-blue-100 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                                  {idx + 1}
                                </span>
                                <span className="truncate">{m.name} {m.lastName}</span>
                              </div>
                            )}
                          </div>
                        ))}

                        {slot2Members.length === 0 && (
                          <div className="text-xs text-slate-500 italic text-center py-8">
                            Nuk ka të regjistruar
                          </div>
                        )}
                      </div>

                      <div className="shrink-0">{renderOccupancyBar(slot2Members.length)}</div>
                    </div>
                  ) : (
                    <div className="bg-[#111728]/50 border border-slate-800/60 rounded-2xl p-3.5 aspect-square min-h-[230px] flex flex-col justify-center items-center text-center text-slate-600 text-xs italic">
                      Nuk ka orar pasdite
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8">

      {/* RENDER FOR PISHINA ME 4 KORSI */}
      {activeTab === 'pool_4_lanes' &&
        renderDarkCalendarGrid(
          'Pishina me 4 korsi',
          'Pishina me 4 korsi',
          'bg-blue-500',
          {
            weekdaySlot1: '16:00 - 17:00',
            weekdaySub1: '(F. të rritura - fillestare)',
            saturdaySlot1: '10:00 - 11:00',
            saturdaySlot2: '11:00 - 12:00',
          },
          true,
          16
        )}

      {/* RENDER FOR PISHINAT E VOGLA (SHOWING BOTH KATI 1 AND KATI 2) */}
      {activeTab === 'pool_small' && (
        <div className="space-y-8">
          {/* SECTION 1: Kati i parë */}
          {renderDarkCalendarGrid(
            'Pishina e vogël - Kati i parë',
            'Pishina e vogël - Kati i parë',
            'bg-amber-500',
            {
              weekdaySlot1: '17:00 - 18:00',
              weekdaySlot2: '18:00 - 19:00',
              saturdaySlot1: '10:00 - 11:00',
              saturdaySlot2: '11:00 - 12:00',
            },
            true,
            12
          )}

          {/* SECTION 2: Kati i dytë */}
          {renderDarkCalendarGrid(
            'Pishina e vogël - Kati i dytë',
            'Pishina e vogël - Kati i dytë',
            'bg-amber-500',
            {
              weekdaySlot1: '17:00 - 18:00',
              weekdaySlot2: '18:00 - 19:00',
              weekdaySub2: '4 vjeçar',
              saturdaySlot1: '10:00 - 11:00',
              saturdaySub1: '(4 vjeçar)',
              saturdaySlot2: '11:00 - 12:00',
              saturdaySub2: '3 vjeçar',
            },
            true,
            12
          )}
        </div>
      )}

      {/* RENDER FOR PISHINA ME 5 KORSI */}
      {activeTab === 'pool_5_lanes' &&
        renderDarkCalendarGrid(
          'Pishina me 5 korsi',
          'Pishina me 5 korsi',
          'bg-emerald-500',
          {
            weekdaySlot1: '16:00 - 17:00',
            saturdaySlot1: '10:00 - 11:00',
            saturdaySlot2: '11:00 - 12:00',
          },
          true,
          20
        )}

      {/* RENDER FOR KIDS FITNESS (NO ADD TEMP RESERVATION BUTTON) */}
      {activeTab === 'kids_fitness_schedule' &&
        renderDarkCalendarGrid(
          'Kids Fitness',
          'Kids Fitness',
          'bg-purple-500',
          {
            weekdaySlot1: '17:00 - 18:00',
            saturdaySlot1: '11:00 - 12:00',
            saturdaySlot2: '12:00 - 13:00',
          },
          false,
          15
        )}

      {/* RENDER FOR ADULT FITNESS / STEP ADULTS (NO ADD TEMP RESERVATION BUTTON) */}
      {activeTab === 'step_adults_schedule' &&
        renderDarkCalendarGrid(
          'Step Adults',
          'Step Adults',
          'bg-indigo-500',
          {
            weekdaySlot1: '18:00 - 19:00',
            saturdaySlot1: '12:00 - 13:00',
            saturdaySlot2: '13:00 - 14:00',
          },
          false,
          20
        )}

      {/* MODAL 1: Rezervim i përkohshëm (Temporary Reservation Modal) */}
      {showTempModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#141b2e] rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl border border-slate-700/80 text-slate-100 space-y-5">
            <h2 className="text-lg sm:text-xl font-extrabold text-white text-center tracking-tight">
              Rezervim i përkohshëm
            </h2>

            {/* Inline Emri + FILL & RIFILL buttons row */}
            <div className="flex flex-col sm:flex-row items-end gap-3">
              <div className="flex-1 w-full space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Emri:</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Shkruaj emrin..."
                  className="w-full bg-[#1b243b] border border-slate-700/80 rounded-xl p-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const newFill = !isFillMode;
                    setIsFillMode(newFill);
                    if (newFill && !tempName) {
                      setTempName('FILL');
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl font-extrabold transition shadow-sm text-xs sm:text-sm whitespace-nowrap cursor-pointer border ${
                    isFillMode
                      ? 'bg-amber-500 hover:bg-amber-400 border-amber-400 text-slate-950 shadow-md'
                      : 'bg-[#1b243b] hover:bg-slate-800 border-slate-700 text-slate-200 font-bold'
                  }`}
                  title="Shëno si tä mbushur (FILL)"
                >
                  FILL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempName('');
                    setSelectedTempDays({});
                    setIsFillMode(false);
                  }}
                  className="bg-[#1b243b] hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl transition shadow-sm text-xs sm:text-sm whitespace-nowrap cursor-pointer"
                  title="Pastro/Rifillo formën"
                >
                  RIFILL
                </button>
              </div>
            </div>

            {/* Days selection grid */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center">
                Zgjidh ditën dhe orën
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {daysList.map((d) => {
                  const isSel = Boolean(selectedTempDays[d]);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() =>
                        setSelectedTempDays((prev) => ({
                          ...prev,
                          [d]: !prev[d],
                        }))
                      }
                      className={`px-2 py-2 border rounded-xl font-bold text-xs text-center transition cursor-pointer ${
                        isSel
                          ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'border-slate-700 bg-[#1b243b] text-slate-300 hover:border-blue-500/60 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowTempModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-2 rounded-xl transition text-xs sm:text-sm cursor-pointer"
              >
                Mbyll
              </button>
              <button
                type="button"
                onClick={handleSaveTempReservation}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-xl transition shadow-lg shadow-emerald-600/30 text-xs sm:text-sm cursor-pointer"
              >
                Ruaj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Member Details ("Zgjidh afatet për regjistrimin e mëposhtëm") */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="my-auto bg-[#141b2e] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-700/80 text-slate-100 space-y-6 max-h-[92vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-black text-white text-center tracking-tight">
              Zgjidh afatet për regjistrimin e mëposhtëm
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-xs sm:text-sm font-medium text-slate-300 bg-[#1b243b]/90 border border-slate-800 p-4 rounded-2xl">
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-white">Type: </span>
                  <span className="text-blue-400 font-semibold">{selectedMember.type}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Emri: </span>
                  <span>{selectedMember.name} {selectedMember.lastName}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Emri i Prindit: </span>
                  <span>{selectedMember.parentName}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Mbiemri: </span>
                  <span>{selectedMember.lastName}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Mosha: </span>
                  <span>{selectedMember.age}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Hyrjet: </span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedMember.entries}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-bold text-white">Adresa: </span>
                  <span>{selectedMember.address}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Numri kontaktues: </span>
                  <span className="font-mono text-blue-300">{selectedMember.phone}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Email: </span>
                  <span>{selectedMember.email}</span>
                </div>
                <div className="pt-2">
                  <label className="font-bold text-white block mb-1">
                    Përzgjidh pishinën:
                  </label>
                  <select
                    value={selectedMember.pool}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        pool: e.target.value,
                      })
                    }
                    className="w-full bg-[#0e1322] border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Pishina me 4 korsi">Pishina me 4 korsi</option>
                    <option value="Pishina e vogël - Kati i parë">Pishina e vogël - Kati i parë</option>
                    <option value="Pishina e vogël - Kati i dytë">Pishina e vogël - Kati i dytë</option>
                    <option value="Pishina me 5 korsi">Pishina me 5 korsi</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'E HËNË' },
                { name: 'E MARTË' },
                { name: 'E MËRKURË' },
                { name: 'E ENJTE' },
                { name: 'E PREMTE' },
                { name: 'E SHTUNË' },
              ].map((dayObj) => {
                const dayName = dayObj.name;
                const isSelected = Boolean(selectedMember.selectedDays[dayName]);
                const timeValue = selectedMember.selectedDays[dayName] || '18:00';

                return (
                  <div key={dayName} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleDaySelectedInMemberModal(dayName)}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition text-center shadow-sm ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'border border-slate-700 bg-[#1b243b] text-slate-300 hover:border-blue-500 hover:text-white'
                      }`}
                    >
                      {dayName}
                    </button>

                    {isSelected && (
                      <select
                        value={timeValue}
                        onChange={(e) =>
                          updateDayTimeInMemberModal(dayName, e.target.value)
                        }
                        className="bg-[#0e1322] border border-blue-500/80 rounded-xl px-3 py-2 text-xs sm:text-sm text-blue-400 font-bold focus:outline-none shadow-sm cursor-pointer"
                      >
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                      </select>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveMemberChanges}
                  className="flex-1 sm:flex-none bg-blue-600/90 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-blue-600/20"
                >
                  Ndrysho përkohësisht
                </button>
                <button
                  type="button"
                  onClick={handleSaveMemberChanges}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-blue-600/20"
                >
                  Shto/Ndrysho
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md text-xs sm:text-sm"
                >
                  Anulo
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveMember(selectedMember.id)}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold p-2.5 rounded-xl transition shadow-md text-xs sm:text-sm"
                  title="Fshij anëtarin"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
