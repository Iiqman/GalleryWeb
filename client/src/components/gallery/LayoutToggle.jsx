import React from 'react';
import styled from 'styled-components';
import { useGallery } from '../../context/GalleryContext';

const ToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const ToggleButton = styled.button`
  background-color: ${({ active }) => (active ? '#4a90e2' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#666')};
  border: 1px solid #ddd;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
  
  &:hover {
    background-color: ${({ active }) => (active ? '#4a90e2' : '#f5f5f5')};
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const LayoutToggle = () => {
  const { layout, updateLayout } = useGallery();
  
  return (
    <ToggleContainer>
      <ToggleButton
        active={layout === 'grid'}
        onClick={() => updateLayout('grid')}
        title="Grid View"
      >
        <Icon>▦</Icon>
      </ToggleButton>
      <ToggleButton
        active={layout === 'list'}
        onClick={() => updateLayout('list')}
        title="List View"
      >
        <Icon>☰</Icon>
      </ToggleButton>
    </ToggleContainer>
  );
};

export default LayoutToggle;