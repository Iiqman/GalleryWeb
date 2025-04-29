import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryList from '../components/gallery/GalleryList';
import LayoutToggle from '../components/gallery/LayoutToggle';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import PhotoUploadForm from '../components/gallery/PhotoUploadForm';
import AlbumForm from '../components/gallery/AlbumForm';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import AlbumService from '../services/album.service';
import { useGallery } from '../context/GalleryContext';

const AlbumContainer = styled.div`
  margin-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TitleSection = styled.div``;

const Title = styled.h1`
  margin: 0 0 0.5rem;
`;

const Description = styled.p`
  margin: 0;
  color: #666;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AlbumView = () => {
  const { layout } = useGallery();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  useEffect(() => {
    fetchAlbum();
  }, [id]);
  
  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const response = await AlbumService.getAlbumById(id);
      setAlbum(response);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat album');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);
    fetchAlbum();
  };
  
  const handleUpdateSuccess = () => {
    setIsEditModalOpen(false);
    fetchAlbum();
  };
  
  const handleDeleteAlbum = async () => {
    try {
      await AlbumService.deleteAlbum(id);
      navigate('/albums');
    } catch (err) {
      setError('Terjadi kesalahan saat menghapus album');
      console.error(err);
    }
  };
  
  if (loading) {
    return <Loading fullHeight />;
  }
  
  if (!album) {
    return <Alert variant="danger">Album tidak ditemukan</Alert>;
  }
  
  return (
    <AlbumContainer>
      <Header>
        <TitleSection>
          <Title>{album.name}</Title>
          {album.description && <Description>{album.description}</Description>}
        </TitleSection>
        
        <Controls>
          <ButtonGroup>
            <Button 
              variant="primary" 
              onClick={() => setIsUploadModalOpen(true)}
            >
              Tambah Foto
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Album
            </Button>
            <Button 
              variant="danger" 
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Hapus
            </Button>
          </ButtonGroup>
          <LayoutToggle />
        </Controls>
      </Header>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {layout === 'grid' ? (
        <GalleryGrid 
          photos={album.photos} 
          emptyMessage="Album ini belum memiliki foto. Tambahkan foto sekarang!"
        />
      ) : (
        <GalleryList 
          photos={album.photos} 
          emptyMessage="Album ini belum memiliki foto. Tambahkan foto sekarang!"
        />
      )}
      
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Unggah Foto ke Album"
      >
        <PhotoUploadForm albumId={id} onSuccess={handleUploadSuccess} />
      </Modal>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Album"
      >
        <AlbumForm 
          album={album} 
          onSuccess={handleUpdateSuccess} 
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
      
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Album"
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Batal
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteAlbum}
            >
              Hapus
            </Button>
          </>
        }
      >
        <p>Apakah Anda yakin ingin menghapus album "{album.name}"?</p>
        <p>Semua foto dalam album ini juga akan dihapus. Tindakan ini tidak dapat dibatalkan.</p>
      </Modal>
    </AlbumContainer>
  );
};

export default AlbumView;