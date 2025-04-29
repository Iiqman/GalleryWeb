import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import AlbumService from '../../services/album.service';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const AlbumForm = ({ album, onSuccess, onCancel }) => {
  const [name, setName] = useState(album?.name || '');
  const [description, setDescription] = useState(album?.description || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Nama album tidak boleh kosong');
      return;
    }
    
    try {
      setLoading(true);
      
      if (album) {
        // Update existing album
        await AlbumService.updateAlbum(album.id, { name, description });
      } else {
        // Create new album
        await AlbumService.createAlbum({ name, description });
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan album');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Input
        label="Nama Album"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <Input
        label="Deskripsi (opsional)"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
      />
      
      <ButtonContainer>
        {onCancel && (
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
          >
            Batal
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : album ? 'Perbarui Album' : 'Buat Album'}
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default AlbumForm;