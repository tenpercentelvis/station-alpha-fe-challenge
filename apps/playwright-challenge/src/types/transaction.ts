export type TransactionStatus = 'initiated' | 'processed' | 'canceled';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  beneficiary: string;
  accountNumber: string;
  status: TransactionStatus;
  reference: string;
} 