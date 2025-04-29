import API from './api';

const getPreference = async () => {
  const response = await API.get('/preferences');
  return response.data;
};

const updatePreference = async (preferenceData) => {
  const response = await API.put('/preferences', preferenceData);
  return response.data;
};

const PreferenceService = {
  getPreference,
  updatePreference,
};

export default PreferenceService;