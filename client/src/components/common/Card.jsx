import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: ${({ height }) => height || '200px'};
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const CardDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const Card = ({ 
  image, 
  imageHeight, 
  title, 
  description, 
  children, 
  ...props 
}) => {
  return (
    <CardWrapper {...props}>
      {image && <CardImage src={image} height={imageHeight} />}
      <CardContent>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {children}
      </CardContent>
    </CardWrapper>
  );
};

export default Card;