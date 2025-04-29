import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { useAuth } from '../context/AuthContext';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background);
  padding: 20px;
`;

const RegisterContainer = styled.div`
  max-width: 450px;
  width: 100%;
  padding: 50px;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-weight: 300;
  font-size: 2.2rem;
  color: var(--primary);
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 30px;
  color: var(--secondary-text);
  font-size: 0.95rem;
  
  a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FormButton = styled(Button)`
  margin-top: 10px;
  padding: 14px;
  font-size: 1rem;
  letter-spacing: 1px;
`;

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi input
    if (!email || !password || !confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }
    
    try {
      setLoading(true);
      await register(email, password);
      navigate('/login', { state: { message: 'Registrasi berhasil, silahkan login' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat registrasi');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Wrapper>
      <RegisterContainer>
        <Title>Register</Title>
        
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Input
            label="Konfirmasi Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <FormButton
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
          </FormButton>
        </Form>
        
        <LoginLink>
          Sudah punya akun? <Link to="/login">Login</Link>
        </LoginLink>
      </RegisterContainer>
    </Wrapper>
  );
};

export default Register;