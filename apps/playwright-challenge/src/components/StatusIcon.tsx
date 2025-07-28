import React from 'react';
import { TransactionStatus } from '../types/transaction';
import './StatusIcon.css';

interface StatusIconProps {
  status: TransactionStatus;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const getIcon = () => {
    switch (status) {
      case 'initiated':
        return (
          <svg data-testid="initiated-icon" viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="10" stroke="#f59f00" strokeWidth="2" fill="none" />
            <path d="M12 8v4l3 3" stroke="#f59f00" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );
      case 'processed':
        return (
          <svg data-testid="processed-icon" viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="10" stroke="#37b24d" strokeWidth="2" fill="none" />
            <path d="M8 12l3 3 6-6" stroke="#37b24d" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'canceled':
        return (
          <svg data-testid="canceled-icon" viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="10" stroke="#f03e3e" strokeWidth="2" fill="none" />
            <path d="M8 8l8 8M16 8l-8 8" stroke="#f03e3e" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`status-icon status-${status}`} data-testid={`status-icon-${status}`}>
      {getIcon()}
    </div>
  );
};

export default StatusIcon; 