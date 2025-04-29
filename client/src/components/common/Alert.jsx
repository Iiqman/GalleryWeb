import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  
  ${({ variant }) => {
    switch (variant) {
      case 'success':
        return `
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        `;
      case 'warning':
        return `
          background-color: #fff3cd;
          color: #856404;
          border: 1px solid #ffeeba;
        `;
      case 'danger':
        return `
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        `;
      case 'info':
      default:
        return `
          background-color: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        `;
    }
  }}
`;

const AlertIcon = styled.div`
  margin-right: 0.75rem;
  font-size: 1.2rem;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const Alert = ({ 
  children, 
  variant = 'info',
  ...props 
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'danger':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };
  
  return (
    <AlertContainer variant={variant} {...props}>
      <AlertIcon>{getIcon()}</AlertIcon>
      <AlertContent>{children}</AlertContent>
    </AlertContainer>
  );
};

export default Alert;