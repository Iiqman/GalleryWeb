import API from './api';

const createAlbum = async (albumData) => {
  const response = await API.post('/albums', albumData);
  return response.data;
};

const getAllAlbums = async () => {
  const response = await API.get('/albums');
  return response.data;
};

const getAlbumById = async (id) => {
  const response = await API.get(`/albums/${id}`);
  return response.data;
};

const updateAlbum = async (id, albumData) => {
  const response = await API.put(`/albums/${id}`, albumData);
  return response.data;
};

const deleteAlbum = async (id) => {
  const response = await API.delete(`/albums/${id}`);
  return response.data;
};

const AlbumService = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};

export default AlbumService;