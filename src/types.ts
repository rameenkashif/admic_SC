export type NavTab = 
  | 'dashboard'
  | 'receptions'
  | 'employees'
  | 'entrances'
  | 'new_registration'
  | 'income'
  | 'messages'
  | 'pool_4_lanes'
  | 'pool_small'
  | 'pool_5_lanes'
  | 'kids_fitness_schedule'
  | 'step_adults_schedule'
  | 'prog_swimming_school'
  | 'prog_individual'
  | 'prog_kids_fitness'
  | 'prog_step_adults'
  | 'prog_duo'
  | 'prog_first_team';

export interface Reception {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  manager: string;
  code?: string;
  isActive?: boolean;
  registrationTypes?: string[];
  activeMembers: number;
  staffCount: number;
  dailyEntries: number;
  status: 'active' | 'maintenance';
  image?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'receptionist' | 'admin' | 'super admin';
  receptionId: string | null;
  receptionName: string;
  phone: string;
  status: 'active' | 'on_leave';
  createdAt: string;
}

export interface RegistrationRecord {
  id: string;
  memberName: string;
  program: string;
  programCategory: 'SHKOLLA E NOTIT' | 'INDIVIDUAL' | 'KIDS FITNESS' | 'STEP ADULTS' | 'DUO (FITNESS+NOT)' | 'REZERVIME GRUPORE';
  duration: string;
  startDate: string;
  endDate: string;
  totalEntries: number;
  remainingEntries: number;
  phone: string;
  dob: string;
  status: 'Aktiv' | 'Inaktiv' | 'Në pritje';
  poolAssignment: string;
  floor: string;
  schedule: { day: string; time: string }[];
  paymentMethod: 'Cash' | 'POS' | 'Transfer Bankar' | 'Kompenzim';
  pricePaid: number;
  rfid?: string;
}

export interface DailyIncome {
  shift1Cash: number;
  shift1Card: number;
  shift2Cash: number;
  shift2Card: number;
  registerOpenTime: string;
  isOpen: boolean;
}

export interface CategoryRevenue {
  id: string;
  category: string;
  percentage: number;
  cashAmount: number;
  cardAmount: number;
  total: number;
}

export interface PoolSlot {
  id: string;
  lane: number; // 1-4 or 1-5
  time: string; // "08:00 - 09:00"
  trainer: string;
  groupName: string;
  category: string;
  occupancy: number; // e.g. 8/10
  maxCapacity: number;
  color: string;
}

export interface MessageItem {
  id: string;
  sender: string;
  phone: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
}
