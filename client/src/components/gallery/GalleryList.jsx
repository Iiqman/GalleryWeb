import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.div`
  display: flex;
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

const PhotoImage = styled.div`
  width: 150px;
  height: 100px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const PhotoContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const PhotoTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const PhotoDescription = styled.p`
  margin: 0 0 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const PhotoDate = styled.p`
  margin: 0;
  color: #999;
  font-size: 0.8rem;
`;

const PhotoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const GalleryList = ({ photos, emptyMessage = "Tidak ada foto yang ditemukan." }) => {
  if (!photos || photos.length === 0) {
    return <EmptyMessage>{emptyMessage}</EmptyMessage>;
  }

  return (
    <ListContainer>
      {photos.map((photo) => (
        <PhotoLink to={`/photos/${photo.id}`} key={photo.id}>
          <ListItem>
            <PhotoImage src={photo.file_path} />
            <PhotoContent>
              <PhotoTitle>{photo.album?.name || "Tanpa Album"}</PhotoTitle>
              <PhotoDescription>
                {photo.description || "Tidak ada deskripsi"}
              </PhotoDescription>
              <PhotoDate>
                {new Date(photo.created_at).toLocaleDateString()}
              </PhotoDate>
            </PhotoContent>
          </ListItem>
        </PhotoLink>
      ))}
    </ListContainer>
  );
};

export default GalleryList;