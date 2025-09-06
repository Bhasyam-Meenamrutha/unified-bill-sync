export interface Bill {
  id: string;
  serviceName: string;
  serviceIcon: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'autopay';
  category: string;
  description?: string;
}

export interface AutoPaySettings {
  enabled: boolean;
  date: string;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  maxLimit: number;
}

export interface Notification {
  id: string;
  type: 'upcoming' | 'overdue' | 'success' | 'warning';
  title: string;
  message: string;
  billId?: string;
  timestamp: string;
}

export type BillStatus = 'all' | 'pending' | 'paid' | 'autopay';