import React from 'react';
import styled from 'styled-components';

// This is a sample solution for the challenge
// The file is provided as reference but will be renamed in the final challenge

interface AnimatedButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

interface ButtonContainerProps {
  size: string;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.size === 'small' ? '6px' : props.size === 'large' ? '10px' : '8px'};
  height: ${props => props.size === 'small' ? '36px' : props.size === 'large' ? '56px' : '48px'};
  padding: ${props => props.size === 'small' ? '0 16px' : props.size === 'large' ? '0 32px' : '0 24px'};
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: ${props => props.size === 'small' ? '0.75rem' : props.size === 'large' ? '1rem' : '0.875rem'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: all 0.6s ease;
  }

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
  }

  &:hover::before {
    left: 100%;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  &:hover .icon {
    transform: translateX(3px) translateY(-3px) rotate(-10deg);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
  }

  @media (prefers-reduced-motion: reduce) {
    &, &::before, .icon {
      transition: none;
    }
    
    &:hover {
      transform: none;
    }
    
    &:hover .icon {
      transform: none;
    }
  }
`;

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  icon, 
  size = 'medium',
  onClick 
}) => {
  return (
    <ButtonContainer size={size} onClick={onClick}>
      <span>{children}</span>
      {icon && icon}
    </ButtonContainer>
  );
};

export default AnimatedButton; 