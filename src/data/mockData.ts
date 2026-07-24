import { Reception, Employee, RegistrationRecord, DailyIncome, CategoryRevenue, PoolSlot, MessageItem } from '../types';

export const INITIAL_RECEPTIONS: Reception[] = [
  {
    id: 'rec-1',
    name: 'Step Sport Center',
    subtitle: 'Kompleksi Kryesor - Sports & Leisure',
    address: 'Rruga B, Prishtinë',
    phone: '+383 49 123 456',
    manager: 'Daim (Super Admin)',
    activeMembers: 0,
    staffCount: 0,
    dailyEntries: 0,
    status: 'active',
  },
  {
    id: 'rec-2',
    name: 'Step Sport Arena',
    subtitle: 'Filiali - Fitness & Swimming Arena',
    address: 'Veternik, Prishtinë',
    phone: '+383 49 234 567',
    manager: 'Arben Krasniqi',
    activeMembers: 0,
    staffCount: 0,
    dailyEntries: 0,
    status: 'active',
  },
];

export const INITIAL_EMPLOYEES: Employee[] = [];

export const INITIAL_REGISTRATIONS: RegistrationRecord[] = [];

export const INITIAL_INCOME: DailyIncome = {
  shift1Cash: 0,
  shift1Card: 0,
  shift2Cash: 0,
  shift2Card: 0,
  registerOpenTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
  isOpen: false,
};

export const INITIAL_CATEGORY_REVENUE: CategoryRevenue[] = [];

export const INITIAL_POOL_SLOTS: PoolSlot[] = [];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    sender: 'fortesaademi91@gmail.com',
    phone: '38349697148',
    message: 'Pershendetje, dua ti regjistroj femijet ne shkollen e notit.',
    time: '14:20',
    date: '23-07-2026',
    read: false,
  },
  {
    id: 'msg-2',
    sender: 'dhurataibrahim@gmail.com',
    phone: '38344123456',
    message: 'Pershendetje. Sa kushton rezervimi per 1 korsi, cdo te shtune, nga 11 Korrik - 29 Gusht, per 1 person (17 vjec), ne cfaredo kohe gjate dites (per 1 ore), ne Step SC? Sa kushton nese jemi 2 persona ne nje korsi (17 vjece)? Faleminderit.',
    time: '09:15',
    date: '02-07-2026',
    read: true,
  },
  {
    id: 'msg-3',
    sender: 'arlindkrasniqi@outlook.com',
    phone: '38349887766',
    message: 'Përshëndetje! Dëshiroj të pyes nëse keni orare të lira për rezervime grupore në pishinën me 5 korsi pas orës 18:00?',
    time: '11:05',
    date: '18-07-2026',
    read: true,
  },
];

