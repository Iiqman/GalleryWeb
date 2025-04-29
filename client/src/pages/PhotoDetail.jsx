import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import PhotoService from '../services/photo.service';
import AlbumService from '../services/album.service';

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  img {
    max-width: 100%;
    max-height: 70vh;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const InfoContainer = styled.div`
  flex: 0 0 300px;
  
  @media (max-width: 991px) {
    flex: 1;
  }
`;

const Title = styled.h1`
  margin: 0 0 1rem;
`;

const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const InfoText = styled.p`
  margin: 0;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [photo, setPhoto] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Edit form state
  const [description, setDescription] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  
  useEffect(() => {
    fetchPhoto();
    fetchAlbums();
  }, [id]);
  
  useEffect(() => {
    if (photo) {
      setDescription(photo.description || '');
      setAlbumId(photo.album_id || '');
    }
  }, [photo]);
  
  const fetchPhoto = async () => {
    try {
      setLoading(true);
      const response = await PhotoService.getPhotoById(id);
      setPhoto(response);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat foto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchAlbums = async () => {
    try {
      const response = await AlbumService.getAllAlbums();
      setAlbums(response);
    } catch (err) {
      console.error('Terjadi kesalahan saat memuat album:', err);
    }
  };
  
  const handleUpdatePhoto = async (e) => {
    e.preventDefault();
    
    try {
      setUpdateLoading(true);
      await PhotoService.updatePhoto(id, {
        description,
        album_id: albumId || null
      });
      
      setIsEditModalOpen(false);
      fetchPhoto();
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Terjadi kesalahan saat memperbarui foto');
    } finally {
      setUpdateLoading(false);
    }
  };
  
  const handleDeletePhoto = async () => {
    try {
      await PhotoService.deletePhoto(id);
      navigate(photo.album_id ? `/albums/${photo.album_id}` : '/gallery');
    } catch (err) {
      setError('Terjadi kesalahan saat menghapus foto');
      console.error(err);
    }
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.file_path;
    link.download = photo.file_path.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (loading) {
    return <Loading fullHeight />;
  }
  
  if (!photo) {
    return <Alert variant="danger">Foto tidak ditemukan</Alert>;
  }
  
  return (
    <PhotoContainer>
      <ImageContainer>
        <img src={photo.file_path} alt={photo.description || 'Photo'} />
      </ImageContainer>
      
      <InfoContainer>
        <Title>Detail Foto</Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {photo.album && (
          <InfoSection>
            <InfoTitle>Album</InfoTitle>
            <InfoText>{photo.album.name}</InfoText>
          </InfoSection>
        )}
        
        {photo.description && (
          <InfoSection>
            <InfoTitle>Deskripsi</InfoTitle>
            <InfoText>{photo.description}</InfoText>
          </InfoSection>
        )}
        
        <InfoSection>
          <InfoTitle>Tanggal Unggah</InfoTitle>
          <InfoText>{new Date(photo.created_at).toLocaleDateString()}</InfoText>
        </InfoSection>
        
        <ButtonContainer>
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
          <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
            Hapus
          </Button>
        </ButtonContainer>
      </InfoContainer>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Foto"
      >
        <Form onSubmit={handleUpdatePhoto}>
          {updateError && <Alert variant="danger">{updateError}</Alert>}
          
          <Input
            label="Deskripsi"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          
          <div className="form-group">
            <label htmlFor="albumId">Album</label>
            <select
              id="albumId"
              value={albumId}
              onChange={(e) => setAlbumId(e.target.value)}
              className="form-control"
            >
              <option value="">Tanpa Album</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>
          
          <ButtonContainer>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsEditModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={updateLoading}
            >
              {updateLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </ButtonContainer>
        </Form>
      </Modal>
      
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Foto"
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
              onClick={handleDeletePhoto}
            >
              Hapus
            </Button>
          </>
        }
      >
        <p>Apakah Anda yakin ingin menghapus foto ini?</p>
        <p>Tindakan ini tidak dapat dibatalkan.</p>
      </Modal>
    </PhotoContainer>
  );
};

export default PhotoDetail;