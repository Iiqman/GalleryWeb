import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Alert from '../common/Alert';

const FormContainer = styled.div`
  padding: 10px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: var(--secondary-text);
  letter-spacing: 0.5px;
`;

const FileInputContainer = styled.div`
  position: relative;
  height: 180px;
  border: 2px dashed var(--border);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background-color: var(--secondary-background);
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    border-color: var(--accent);
    background-color: var(--hover-bg);
  }
  
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
`;

const FileIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: var(--accent);
`;

const FileText = styled.div`
  color: var(--secondary-text);
  font-size: 0.95rem;
  margin-bottom: 5px;
`;

const FileSubText = styled.div`
  color: var(--secondary-text);
  font-size: 0.8rem;
  opacity: 0.7;
`;

const FileName = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 500;
`;

const PreviewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-background);
  z-index: 1;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--text);
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.1);
  }
`;

const UploadButton = styled(Button)`
  width: 100%;
  padding: 14px;
  font-size: 0.95rem;
  letter-spacing: 1px;
`;

const PhotoUploadForm = ({ albumId, onSuccess, onCancel }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Pilih file foto terlebih dahulu');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);
      
      if (albumId) {
        formData.append('album_id', albumId);
      }
      
      // Replace this with your actual PhotoService method
      // await PhotoService.uploadPhoto(formData);
      
      // For demonstration - simulate an upload
      setTimeout(() => {
        setLoading(false);
        if (onSuccess) onSuccess();
      }, 1500);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengunggah foto');
      setLoading(false);
    }
  };
  
  return (
    <FormContainer>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Pilih Foto</Label>
          <FileInputContainer>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              id="photo-upload"
            />
            
            {preview ? (
              <PreviewContainer>
                <PreviewImage src={preview} alt="Preview" />
              </PreviewContainer>
            ) : (
              <>
                <FileIcon>📷</FileIcon>
                <FileText>Klik atau seret file foto ke sini</FileText>
                <FileSubText>JPG, PNG, GIF (Max 10MB)</FileSubText>
              </>
            )}
          </FileInputContainer>
          
          {file && <FileName>{file.name}</FileName>}
        </FormGroup>
        
        <FormGroup>
          <Label>Deskripsi (opsional)</Label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tambahkan deskripsi tentang foto ini..."
          />
        </FormGroup>
        
        <UploadButton
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'MENGUNGGAH...' : 'UNGGAH FOTO'}
        </UploadButton>
      </form>
    </FormContainer>
  );
};

export default PhotoUploadForm;