import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  padding: ${props => props.size === 'large' ? '14px 32px' : props.size === 'small' ? '8px 16px' : '12px 24px'};
  font-size: ${props => props.size === 'large' ? '1.1rem' : props.size === 'small' ? '0.85rem' : '0.95rem'};
  border-radius: 4px;
  border: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  
  /* Variant-specific styles */
  background-color: ${props => {
    if (props.variant === 'primary') return 'var(--button-bg)';
    if (props.variant === 'secondary') return 'transparent';
    if (props.variant === 'danger') return '#e53935';
    return 'var(--button-bg)';
  }};
  
  color: ${props => {
    if (props.variant === 'primary') return 'var(--button-text)';
    if (props.variant === 'secondary') return 'var(--text)';
    if (props.variant === 'danger') return 'white';
    return 'var(--button-text)';
  }};
  
  border: ${props => {
    if (props.variant === 'secondary') return '1px solid var(--border)';
    return 'none';
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    background-color: ${props => {
      if (props.variant === 'primary') return 'var(--button-bg)';
      if (props.variant === 'secondary') return 'var(--hover-bg)';
      if (props.variant === 'danger') return '#c62828';
      return 'var(--button-bg)';
    }};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  ...props 
}) => {
  return (
    <StyledButton 
      variant={variant} 
      size={size} 
      fullWidth={fullWidth} 
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;