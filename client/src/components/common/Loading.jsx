import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ fullHeight }) => (fullHeight ? '100vh' : '100%')};
  width: 100%;
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4a90e2;
  border-radius: 50%;
  width: ${({ size }) => size || '30px'};
  height: ${({ size }) => size || '30px'};
  animation: ${spin} 1s linear infinite;
`;

const Loading = ({ fullHeight = false, size }) => {
  return (
    <LoadingContainer fullHeight={fullHeight}>
      <Spinner size={size} />
    </LoadingContainer>
  );
};

export default Loading;