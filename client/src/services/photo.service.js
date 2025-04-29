import API from './api';

const uploadPhoto = async (file, description, albumId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', description || '');
  if (albumId) {
    formData.append('album_id', albumId);
  }

  const response = await API.post('/photos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

const getAllPhotos = async (albumId = null) => {
  let url = '/photos';
  if (albumId) {
    url += `?album_id=${albumId}`;
  }
  
  const response = await API.get(url);
  return response.data;
};

const getPhotoById = async (id) => {
  const response = await API.get(`/photos/${id}`);
  return response.data;
};

const updatePhoto = async (id, photoData) => {
  const response = await API.put(`/photos/${id}`, photoData);
  return response.data;
};

const deletePhoto = async (id) => {
  const response = await API.delete(`/photos/${id}`);
  return response.data;
};

const PhotoService = {
  uploadPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
};

export default PhotoService;