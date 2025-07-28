import React from 'react';
import './ErrorModal.css';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="error-modal-overlay" data-testid="error-modal-overlay">
      <div className="error-modal" data-testid="error-modal">
        <div className="error-header">
          <h3>Error</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            data-testid="error-close-button"
          >
            &times;
          </button>
        </div>
        <div className="error-content" data-testid="error-message">
          {message}
        </div>
        <div className="error-footer">
          <button 
            className="error-action-button" 
            onClick={onClose}
            data-testid="error-action-button"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal; 