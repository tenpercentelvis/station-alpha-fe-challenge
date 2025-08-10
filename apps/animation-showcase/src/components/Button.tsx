import React, { useState } from 'react'
import styled, { css } from 'styled-components'

type ButtonSize = 'small' | 'large'

interface ButtonProps {
  text?: string
  disabled?: boolean
  icon?: React.ReactNode
  size?: ButtonSize
  loading?: boolean
  onClick: () => void
}

const Button = ({ text, onClick, size = 'large', icon, disabled, loading }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => { 
    setIsPressed(false);
  };

  return (
    <ButtonContainer isPressed={isPressed}>
      <ButtonElement 
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        size={size}
      >
        {icon && <IconWrapper loading={loading}>{icon}</IconWrapper>}
        <ButtonText loading={loading} size={size}>{text}</ButtonText>
      </ButtonElement>
    </ButtonContainer>
  )
}

// styles
  
const ButtonContainer = styled.div<{ isPressed?: boolean }>`
    position: relative;
    display: inline-block;
    width: 200px;
    height: 48px;
    transition: transform 0.1s ease;
    transform: ${props => props.isPressed ? 'scale(0.95)' : 'scale(1)'};
`

const ButtonElement = styled.button<{
    size: ButtonSize
    disabled?: boolean
    loading?: boolean
    }>`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    width: ${props => props.size === 'small' ? '180px' : '210px'};
    background: #196bff;
    border: none;
    border-radius: 100px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(123, 173, 255, 0.7);
    padding: ${props => props.size === 'small' ? '4px 8px' : '14px 28px'};
    height: ${props => props.size === 'small' ? '32px' : '48px'};

    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        width ${props => props.loading ? '0.4s' : '0.6s'} cubic-bezier(0.4, 0, 0.2, 1),
        padding ${props => props.loading ? '0.4s' : '0.6s'} cubic-bezier(0.4, 0, 0.2, 1);

    ${props => props.loading && css`
        width: 48px;
        padding: 0;
        transition-delay: 0s, 0s, 1.3s, 1.3s;
    `}

    &:active {
        transform: translateX(-50%);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: background-color 0.2s ease, width 0.2s ease, padding 0.2s ease;
        
        ${props => props.loading && css`
            transition-delay: 0s, 0.65s, 0.65s;
        `}
        
        &:hover, &:active {
            transform: none;
        }
    }
`

const IconWrapper = styled.span<{ loading?: boolean }>`
    position: absolute;
    left: ${props => props.loading ? '50%' : '28px'};
    top: 50%;
    transform: ${props => props.loading ? 'translate(-50%, -50%)' : 'translateY(-50%)'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ${props => props.loading ? '0.3s' : '0.4s'} cubic-bezier(0.4, 0, 0.2, 1) ${props => props.loading ? '1s' : '0.1s'};
    z-index: 3;
    
    @media (prefers-reduced-motion: reduce) {
        transition: all 0.2s ease ${props => props.loading ? '0.5s' : '0s'};
    }
`

const ButtonText = styled.span<{ loading?: boolean, size: ButtonSize }>`
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: ${props => props.size === 'small' ? '14px' : '18px'};
    transition: opacity ${props => props.loading ? '0.3s' : '0.9s'} ease ${props => props.loading ? '0.5s' : '0.2s'};
    opacity: ${props => props.loading ? 0 : 1};
    z-index: 2;
    white-space: nowrap;
`

export default Button