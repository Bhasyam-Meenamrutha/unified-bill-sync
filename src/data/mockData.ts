import { Bill, Notification } from '@/types';

export const mockBills: Bill[] = [
  {
    id: '1',
    serviceName: 'Netflix',
    serviceIcon: '🎬',
    dueDate: '2024-01-15',
    amount: 15.99,
    status: 'pending',
    category: 'Entertainment',
    description: 'Premium subscription'
  },
  {
    id: '2',
    serviceName: 'Spotify',
    serviceIcon: '🎵',
    dueDate: '2024-01-12',
    amount: 9.99,
    status: 'autopay',
    category: 'Entertainment',
    description: 'Music streaming'
  },
  {
    id: '3',
    serviceName: 'Electric Bill',
    serviceIcon: '⚡',
    dueDate: '2024-01-20',
    amount: 125.50,
    status: 'pending',
    category: 'Utilities',
    description: 'Monthly electricity'
  },
  {
    id: '4',
    serviceName: 'Internet',
    serviceIcon: '🌐',
    dueDate: '2024-01-18',
    amount: 59.99,
    status: 'paid',
    category: 'Utilities',
    description: 'Fiber internet 100MB'
  },
  {
    id: '5',
    serviceName: 'Water Bill',
    serviceIcon: '💧',
    dueDate: '2024-01-25',
    amount: 45.30,
    status: 'pending',
    category: 'Utilities',
    description: 'Municipal water service'
  },
  {
    id: '6',
    serviceName: 'Amazon Prime',
    serviceIcon: '📦',
    dueDate: '2024-01-10',
    amount: 14.99,
    status: 'autopay',
    category: 'Shopping',
    description: 'Annual membership'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'upcoming',
    title: 'Bill Due Soon',
    message: 'Netflix payment of $15.99 is due in 3 days',
    billId: '1',
    timestamp: '2024-01-12T10:00:00Z'
  },
  {
    id: '2',
    type: 'overdue',
    title: 'Overdue Payment',
    message: 'Electric bill of $125.50 is 2 days overdue',
    billId: '3',
    timestamp: '2024-01-11T15:30:00Z'
  },
  {
    id: '3',
    type: 'success',
    title: 'Payment Successful',
    message: 'Internet bill of $59.99 has been paid successfully',
    billId: '4',
    timestamp: '2024-01-10T09:15:00Z'
  },
  {
    id: '4',
    type: 'warning',
    title: 'AutoPay Alert',
    message: 'Spotify AutoPay will charge $9.99 tomorrow',
    billId: '2',
    timestamp: '2024-01-11T08:00:00Z'
  }
];