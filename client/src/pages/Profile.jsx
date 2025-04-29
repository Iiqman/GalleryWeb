import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';
import UserService from '../services/user.service';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h3`
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await UserService.getProfile();
      setProfile(response);
      setEmail(response.email);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat profil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Clear messages
    setError('');
    setSuccess('');
    
    // Validate input
    if (password && password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }
    
    try {
      setUpdating(true);
      
      const updateData = {
        email: email !== profile.email ? email : undefined,
        password: password || undefined
      };
      
      await UserService.updateProfile(updateData);
      
      setSuccess('Profil berhasil diperbarui');
      setPassword('');
      setConfirmPassword('');
      
      // Reload profile
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat memperbarui profil');
    } finally {
      setUpdating(false);
    }
  };
  
  if (loading) {
    return <Loading fullHeight />;
  }
  
  return (
    <ProfileContainer>
      <Title>Profil Saya</Title>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleUpdateProfile}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <SubTitle>Ubah Password</SubTitle>
        
        <Input
          label="Password Baru"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Input
          label="Konfirmasi Password Baru"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <Button
          type="submit"
          variant="primary"
          disabled={updating}
        >
          {updating ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </Form>
    </ProfileContainer>
  );
};

export default Profile;