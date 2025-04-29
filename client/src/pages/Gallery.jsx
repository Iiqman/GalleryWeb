import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import PhotoUploadForm from '../components/gallery/PhotoUploadForm';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import PhotoService from '../services/photo.service';
import { useGallery } from '../context/GalleryContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';

const GalleryContainer = styled.div`
  padding: 0;
  animation: fadeIn 0.5s ease-in-out;
`;

const HeroSection = styled.div`
  height: 70vh;
  width: 100%;
  background-color: var(--secondary-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  text-align: center;
  margin-bottom: 60px;
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5));
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 20px;
  font-weight: 200;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  font-weight: 300;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 1px;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const UploadButton = styled(Button)`
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

const Gallery = () => {
  const { layout } = useGallery();
  const { isLoggedIn } = useAuth();
  
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  useEffect(() => {
    fetchPhotos();
  }, []);
  
  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await PhotoService.getAllPhotos();
      setPhotos(response);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat foto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);
    fetchPhotos();
  };
  
  // Find a random photo for the hero background
  const heroPhoto = photos.length > 0 ? photos[Math.floor(Math.random() * photos.length)]?.file_path : null;
  
  if (loading) {
    return <Loading fullHeight />;
  }
  
  return (
    <GalleryContainer>
      <HeroSection style={{ backgroundImage: heroPhoto ? `url(${heroPhoto})` : 'none' }}>
        <HeroContent>
          <HeroTitle>Galeri Foto</HeroTitle>
          <HeroSubtitle>Koleksi foto-foto terbaik dalam satu tempat</HeroSubtitle>
          {isLoggedIn && (
            <UploadButton onClick={() => setIsUploadModalOpen(true)}>
              Unggah Foto
            </UploadButton>
          )}
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <Header>
          <Title>Semua Foto</Title>
          <Controls>
            {isLoggedIn && (
              <UploadButton 
                variant="primary" 
                onClick={() => setIsUploadModalOpen(true)}
              >
                Unggah Foto
              </UploadButton>
            )}
          </Controls>
        </Header>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <GalleryGrid 
          photos={photos} 
          columns={3}
          gap={8}
          fullWidth
        />
      </ContentSection>
      
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Unggah Foto Baru"
      >
        <PhotoUploadForm onSuccess={handleUploadSuccess} />
      </Modal>
    </GalleryContainer>
  );
};

export default Gallery;