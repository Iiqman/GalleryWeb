import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';

const NavbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--navbar-bg);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.isScrolled ? '14px 40px' : '20px 40px'};
  max-width: 1800px;
  margin: 0 auto;
  transition: padding 0.3s ease;
  
  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Logo = styled(Link)`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--primary);
  letter-spacing: 1.5px;
  text-decoration: none;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--navbar-bg);
    padding: 20px;
    gap: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 5px 0;
  position: relative;
  opacity: ${props => props.active ? 1 : 0.7};
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: ${props => props.active ? '100%' : '0'};
    height: 1px;
    background-color: var(--primary);
    transition: width 0.3s;
  }
  
  &:hover {
    opacity: 1;
    
    &::after {
      width: 100%;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const AuthButton = styled(Link)`
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 5px 0;
  position: relative;
  opacity: ${props => props.active ? 1 : 0.7};
  
  &:hover {
    opacity: 1;
  }
  
  &.register {
    background-color: var(--button-bg);
    color: var(--button-text);
    padding: 8px 20px;
    border-radius: 4px;
    opacity: 1;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <NavbarContainer style={{ 
      boxShadow: isScrolled ? '0 2px 15px rgba(0, 0, 0, 0.08)' : 'none',
    }}>
      <Nav isScrolled={isScrolled}>
        <Logo to="/">GALLERY</Logo>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        
        <NavItems isOpen={isMenuOpen}>
          <NavLink to="/gallery" active={isActive('/gallery') ? 1 : 0}>Gallery</NavLink>
          {isLoggedIn && (
            <NavLink to="/albums" active={isActive('/albums') ? 1 : 0}>Albums</NavLink>
          )}
        </NavItems>
        
        <Controls>
          <ThemeToggle />
          
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" active={isActive('/profile') ? 1 : 0}>Profile</NavLink>
              <AuthButton as="button" onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
              </AuthButton>
            </>
          ) : (
            <>
              <AuthButton to="/login" active={isActive('/login') ? 1 : 0}>Login</AuthButton>
              <AuthButton to="/register" className="register" active={isActive('/register') ? 1 : 0}>
                Register
              </AuthButton>
            </>
          )}
        </Controls>
      </Nav>
    </NavbarContainer>
  );
};

export default Navbar;