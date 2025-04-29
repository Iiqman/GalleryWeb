import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const ToggleContainer = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: var(--overlay);
  }
  
  &:focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s, opacity 0.3s;
  color: var(--primary);
  font-size: 1.2rem;
`;

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <ToggleContainer onClick={toggleTheme} aria-label="Toggle theme">
      <IconContainer>
        <Icon style={{ 
          opacity: darkMode ? 1 : 0,
          transform: darkMode ? 'translateY(0) rotate(0)' : 'translateY(100%) rotate(90deg)'
        }}>
          ☀️
        </Icon>
        <Icon style={{ 
          opacity: darkMode ? 0 : 1,
          transform: darkMode ? 'translateY(-100%) rotate(-90deg)' : 'translateY(0) rotate(0)'
        }}>
          🌙
        </Icon>
      </IconContainer>
    </ToggleContainer>
  );
};

export default ThemeToggle;