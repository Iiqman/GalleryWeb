import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 200px); // Adjust based on navbar and footer heights
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <PageContainer>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </PageContainer>
  );
};

export default Layout;