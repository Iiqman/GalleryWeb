import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import AlbumForm from '../components/gallery/AlbumForm';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import AlbumService from '../services/album.service';

const AlbumsContainer = styled.div`
  animation: fadeIn 0.5s ease-in-out;
  padding: 60px 0;
`;

const ContentSection = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 40px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0;
`;

const AlbumsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const AlbumCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const AlbumImage = styled.div`
  height: 250px;
  width: 100%;
  background-color: var(--secondary-background);
  background-size: cover;
  background-position: center;
`;

const AlbumInfo = styled.div`
  padding: 20px;
`;

const AlbumTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 8px;
`;

const AlbumDescription = styled.p`
  color: var(--secondary-text);
  font-size: 0.9rem;
  margin: 0;
`;

const EmptyAlbum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  background-color: var(--secondary-background);
  color: var(--secondary-text);
`;

const CreateButton = styled(Button)`
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  border-radius: 4px;
  
  &:hover {
    background-color: var(--primary);
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  color: var(--secondary-text);
  grid-column: 1 / -1;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    font-weight: 300;
  }
  
  p {
    max-width: 500px;
    margin: 0 auto 30px;
  }
`;

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  useEffect(() => {
    fetchAlbums();
  }, []);
  
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await AlbumService.getAllAlbums();
      setAlbums(response);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat album');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    fetchAlbums();
  };
  
  if (loading) {
    return <Loading fullHeight />;
  }
  
  return (
    <AlbumsContainer>
      <ContentSection>
        <Header>
          <Title>Album Foto</Title>
          <CreateButton 
            onClick={() => setIsCreateModalOpen(true)}
          >
            Buat Album Baru
          </CreateButton>
        </Header>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <AlbumsGrid>
          {albums.length === 0 ? (
            <EmptyMessage>
              <h3>Belum Ada Album</h3>
              <p>Anda belum memiliki album. Buat album baru untuk mengorganisir foto Anda.</p>
              <CreateButton onClick={() => setIsCreateModalOpen(true)}>
                Buat Album Pertama
              </CreateButton>
            </EmptyMessage>
          ) : (
            albums.map((album) => (
              <Link to={`/albums/${album.id}`} key={album.id} style={{ textDecoration: 'none' }}>
                <AlbumCard>
                  {album.photos && album.photos.length > 0 ? (
                    <AlbumImage 
                      style={{ backgroundImage: `url(${album.photos[0].file_path})` }}
                    />
                  ) : (
                    <EmptyAlbum>Album Kosong</EmptyAlbum>
                  )}
                  <AlbumInfo>
                    <AlbumTitle>{album.name}</AlbumTitle>
                    <AlbumDescription>
                      {album.description || `${album.photos?.length || 0} foto`}
                    </AlbumDescription>
                  </AlbumInfo>
                </AlbumCard>
              </Link>
            ))
          )}
        </AlbumsGrid>
      </ContentSection>
      
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Buat Album Baru"
      >
        <AlbumForm 
          onSuccess={handleCreateSuccess} 
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </AlbumsContainer>
  );
};

export default Albums;