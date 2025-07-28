import React from 'react';
import { Transaction } from '../types/transaction';
import StatusIcon from './StatusIcon';
import './TransactionTable.css';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="transaction-table-container" data-testid="transaction-table">
      <h2>Deposit Transactions</h2>
      
      {transactions.length === 0 ? (
        <div className="no-data" data-testid="no-transactions">
          No transactions found.
        </div>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th data-testid="header-date">Date</th>
              <th data-testid="header-reference">Reference</th>
              <th data-testid="header-beneficiary">Beneficiary</th>
              <th data-testid="header-account">Account</th>
              <th data-testid="header-amount">Amount</th>
              <th data-testid="header-description">Description</th>
              <th data-testid="header-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} data-testid={`transaction-${transaction.id}`}>
                <td data-testid={`date-${transaction.id}`}>{formatDate(transaction.date)}</td>
                <td data-testid={`reference-${transaction.id}`}>{transaction.reference}</td>
                <td data-testid={`beneficiary-${transaction.id}`}>{transaction.beneficiary}</td>
                <td data-testid={`account-${transaction.id}`}>{transaction.accountNumber}</td>
                <td data-testid={`amount-${transaction.id}`}>
                  {formatCurrency(transaction.amount, transaction.currency)}
                </td>
                <td data-testid={`description-${transaction.id}`}>{transaction.description}</td>
                <td data-testid={`status-${transaction.id}`}>
                  <div className="status-cell">
                    <StatusIcon status={transaction.status} />
                    <span>{transaction.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable; 