import React from 'react';
import './NoCompanyIcon.css';

const NoCompanyIcon: React.FC = () => {
  return (
    <div className="no-company-icon" data-testid="no-company-icon">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="10" stroke="#f03e3e" strokeWidth="2" fill="none" />
        <path d="M8 8l8 8M16 8l-8 8" stroke="#f03e3e" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default NoCompanyIcon; 