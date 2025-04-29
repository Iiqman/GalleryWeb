import React, { createContext, useState, useEffect, useContext } from 'react';
import PreferenceService from '../services/preference.service';
import { useAuth } from './AuthContext';

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [layout, setLayout] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      loadPreference();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const loadPreference = async () => {
    try {
      setLoading(true);
      const response = await PreferenceService.getPreference();
      setLayout(response.gallery_layout);
    } catch (error) {
      console.error('Error loading preference:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLayout = async (newLayout) => {
    try {
      setLoading(true);
      await PreferenceService.updatePreference({ gallery_layout: newLayout });
      setLayout(newLayout);
    } catch (error) {
      console.error('Error updating layout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        layout,
        loading,
        updateLayout,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  return useContext(GalleryContext);
};