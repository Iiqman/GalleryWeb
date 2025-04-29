import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

const FooterContainer = styled.footer`
  padding: 80px 0 40px;
  background-color: var(--secondary-background);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 60px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 20px;
  letter-spacing: 1px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  color: var(--secondary-text);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
  font-weight: 300;
  
  &:hover {
    color: var(--primary);
  }
`;

const ThemeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const ThemeLabel = styled.span`
  font-size: 0.95rem;
  color: var(--secondary-text);
`;

const CopyrightSection = styled.div`
  text-align: center;
  padding-top: 60px;
  color: var(--secondary-text);
  font-size: 0.9rem;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid var(--border);
  padding-left: 20px;
  padding-right: 20px;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Gallery</FooterTitle>
          <p style={{ marginBottom: '20px', color: 'var(--secondary-text)', fontSize: '0.95rem' }}>
            Simpan dan tampilkan foto-foto Anda dengan cara yang elegan.
          </p>
          <ThemeSection>
            <ThemeLabel>Dark Mode</ThemeLabel>
            <ThemeToggle />
          </ThemeSection>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Navigasi</FooterTitle>
          <FooterLinks>
            <FooterLink to="/">Beranda</FooterLink>
            <FooterLink to="/gallery">Galeri</FooterLink>
            <FooterLink to="/albums">Album</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Akun</FooterTitle>
          <FooterLinks>
            <FooterLink to="/login">Login</FooterLink>
            <FooterLink to="/register">Register</FooterLink>
            <FooterLink to="/profile">Profil</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Bantuan</FooterTitle>
          <FooterLinks>
            <FooterLink to="#">Kontak</FooterLink>
            <FooterLink to="#">FAQ</FooterLink>
            <FooterLink to="#">Kebijakan Privasi</FooterLink>
            <FooterLink to="#">Syarat & Ketentuan</FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <CopyrightSection>
        <p>&copy; {currentYear} Gallery App. All rights reserved.</p>
      </CopyrightSection>
    </FooterContainer>
  );
};

export default Footer;
