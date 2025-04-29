import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  gap: ${props => props.gap || 20}px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  margin-bottom: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoItem = styled.div`
  position: relative;
  margin-bottom: ${props => props.gap || 20}px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  background-color: var(--secondary-background);
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const PhotoInfo = styled.div`
  padding: 15px;
  background-color: var(--card-bg);
`;

const PhotoTitle = styled.h3`
  margin: 0 0 5px;
  font-size: 1rem;
  font-weight: 400;
`;

const PhotoDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--secondary-text);
`;

const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px 20px;
  background-color: var(--secondary-background);
  border-radius: 8px;
  color: var(--secondary-text);
`;

const GalleryGrid = ({ 
  photos = [], 
  emptyMessage = "Tidak ada foto untuk ditampilkan.", 
  columns = 3,
  gap = 20,
  fullWidth = false
}) => {
  if (photos.length === 0) {
    return <EmptyMessage>{emptyMessage}</EmptyMessage>;
  }

  return (
    <GridContainer columns={columns} gap={gap} fullWidth={fullWidth}>
      {photos.map((photo) => (
        <Link 
          to={`/photos/${photo.id}`} 
          key={photo.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <PhotoItem gap={gap}>
            <ImageContainer>
              <Image src={photo.file_path} alt={photo.description || 'Photo'} />
            </ImageContainer>
            {photo.description && (
              <PhotoInfo>
                <PhotoTitle>
                  {photo.description.length > 30 
                    ? `${photo.description.substring(0, 30)}...` 
                    : photo.description}
                </PhotoTitle>
                <PhotoDescription>
                  {new Date(photo.created_at).toLocaleDateString()}
                </PhotoDescription>
              </PhotoInfo>
            )}
          </PhotoItem>
        </Link>
      ))}
    </GridContainer>
  );
};

export default GalleryGrid;