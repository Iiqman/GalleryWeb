import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { GalleryProvider } from './context/GalleryContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Gallery from './pages/Gallery';
import Albums from './pages/Albums';
import AlbumView from './pages/AlbumView';
import PhotoDetail from './pages/PhotoDetail';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

// Protected route component
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AppContent = () => {
  const { darkMode } = useTheme();
  const { isLoggedIn } = useAuth();
  
  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <Router>
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<Gallery />} />
            
            {/* Protected Routes */}
            <Route 
              path="/albums" 
              element={
                <PrivateRoute>
                  <Albums />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/albums/:id" 
              element={
                <PrivateRoute>
                  <AlbumView />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/photos/:id" 
              element={
                <PrivateRoute>
                  <PhotoDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GalleryProvider>
          <AppContent />
        </GalleryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
  
export default App;