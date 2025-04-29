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

const LoginContainer = styled.div`
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

const SignupLink = styled.p`
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

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi input
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/gallery');
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Wrapper>
      <LoginContainer>
        <Title>Login</Title>
        
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
          
          <FormButton
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </FormButton>
        </Form>
        
        <SignupLink>
          Belum punya akun? <Link to="/register">Register</Link>
        </SignupLink>
      </LoginContainer>
    </Wrapper>
  );
};

export default Login;