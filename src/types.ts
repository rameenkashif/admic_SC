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
  | 'prog_first_team'
  | 'group_reservations'
  | 'agents'
  | 'sub_history';

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
  firstName?: string;
  lastName?: string;
  parentName?: string;
  age?: number | string;
  program: string;
  programCategory: 'SHKOLLA E NOTIT' | 'INDIVIDUAL' | 'KIDS FITNESS' | 'STEP ADULTS' | 'DUO (FITNESS+NOT)' | 'REZERVIME GRUPORE' | 'EKIPA E PARË / AKADEMIA';
  duration: string;
  startDate: string;
  endDate: string;
  totalEntries: number;
  remainingEntries: number;
  phone: string;
  email?: string;
  dob: string;
  status: 'Aktiv' | 'Inaktiv' | 'Në pritje';
  poolAssignment: string;
  floor?: string;
  schedule: { day: string; time: string }[];
  paymentMethod: 'Cash' | 'POS' | 'Transfer Bankar' | 'Kompenzim';
  pricePaid: number;
  discount?: string;
  entryPlan?: string;
  rfid?: string;
  collaborator?: string;
  healthIssues?: string;
  timeDuration?: string;
  description?: string;
  paymentStatus?: 'Payment Confirmed' | 'Pending' | 'Unpaid';
  createdAt?: string;
  receptionId?: string;
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

export interface AcademyPaymentHistoryItem {
  id: string;
  title: string;
  statusTag: string;
  amount: number;
  date: string;
  time: string;
  description: string;
  paymentId: string;
  sessionId: string;
}

export interface AcademyStudent {
  id: string;
  name: string;
  email: string;
  email2?: string;
  city?: string;
  phone: string;
  phone2?: string;
  shuma: number;
  borxhi: number;
  totali: number;
  grupi: 'EKIPA E PARE' | 'A' | 'B' | 'Gr/rr/20';
  status: 'Active' | 'Inactive';
  description?: string;
  paymentHistory: AcademyPaymentHistoryItem[];
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

export interface Agent {
  id: string;
  instituteName: string; // Emri i Institutit
  phone: string; // Nr Telefonit
  fullName: string; // Emri dhe Mbiemri
  businessNumber: string; // Numri i Biznesit
  email: string; // Email
  discountPercentage: number; // Zbritja në % / Përqindja (%)
  createdAt?: string;
}

export interface GroupReservation {
  id: string;
  groupName: string;
  contactPerson: string;
  email: string;
  phone: string;
  membersCount: number;
  reservationDate: string;
  timeSlot: string;
  poolLocation: string;
  status: 'Aktiv' | 'Në pritje' | 'Përfunduar' | 'Anuluar';
  price: number;
  notes?: string;
}

export interface SubscriptionHistoryEvent {
  id: string;
  action: string;
  date: string;
  payableAmount: number;
  scanDetails: string;
}

export interface UserSubscriptionHistory {
  id: string;
  name: string;
  rfid: string;
  subscriptionPlan: string;
  scansThisMonth: number;
  events: SubscriptionHistoryEvent[];
}
