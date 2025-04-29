import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
`;

const Hero = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--background);
  padding: 0 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, var(--background) 100%);
    opacity: 0.7;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 850px;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: var(--secondary-text);
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ActionButton = styled(Link)`
  padding: 16px 36px;
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  display: inline-block;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FeaturesSection = styled.section`
  padding: 120px 20px;
  background-color: var(--secondary-background);
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 50px 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 25px;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 1.8rem;
`;

const FeatureDescription = styled.p`
  color: var(--secondary-text);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const CTASection = styled.section`
  padding: 100px 20px;
  text-align: center;
  background: var(--background);
`;

const CTATitle = styled.h2`
  margin-bottom: 30px;
  font-size: 2.8rem;
`;

const CTADescription = styled.p`
  max-width: 700px;
  margin: 0 auto 40px;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero>
        <HeroContent>
          <Title>Selamat Datang di GalleryApp</Title>
          <Subtitle>
            Simpan, kelola, dan bagikan foto-foto Anda dengan cara yang elegan. Pengalaman melihat galeri foto yang belum pernah Anda rasakan sebelumnya.
          </Subtitle>
          <ActionButton to="/gallery">Lihat Galeri</ActionButton>
        </HeroContent>
      </Hero>
      
      <FeaturesSection>
        <FeaturesContainer>
          <FeatureCard>
            <FeatureIcon>🖼️</FeatureIcon>
            <FeatureTitle>Tampilan Elegan</FeatureTitle>
            <FeatureDescription>
              Tampilkan foto-foto Anda dengan layout yang fleksibel dan desain yang minimalis untuk pengalaman visual terbaik.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📁</FeatureIcon>
            <FeatureTitle>Album Pribadi</FeatureTitle>
            <FeatureDescription>
              Kelompokkan foto-foto Anda dalam album untuk organisasi yang lebih baik dan berbagi dengan siapa saja.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Privasi Terjamin</FeatureTitle>
            <FeatureDescription>
              Kelola siapa saja yang dapat melihat foto-foto Anda dengan berbagai pengaturan privasi yang tersedia.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </FeaturesSection>
      
      <CTASection>
        <CTATitle>Mulai Petualangan Visual Anda</CTATitle>
        <CTADescription>
          Daftar sekarang dan nikmati semua fitur premium GalleryApp tanpa biaya. Lihat foto-foto Anda dalam tampilan yang belum pernah ada sebelumnya.
        </CTADescription>
        <ActionButton to="/register">Mulai Sekarang - Gratis!</ActionButton>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;