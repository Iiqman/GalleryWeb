import React from 'react';
import styled from 'styled-components';

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: var(--secondary-text);
  letter-spacing: 0.5px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--text);
  font-size: 0.95rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.1);
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--text);
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.1);
  }
`;

const Input = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  multiline = false, 
  ...rest 
}) => {
  return (
    <InputGroup>
      {label && <Label htmlFor={name}>{label}</Label>}
      
      {multiline ? (
        <StyledTextarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      ) : (
        <StyledInput
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    </InputGroup>
  );
};

export default Input;