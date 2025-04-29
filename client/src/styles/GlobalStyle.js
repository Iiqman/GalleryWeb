import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    /* Light Theme Colors - Pixieset Inspired */
    --background: #ffffff;
    --secondary-background: #f9f9f9;
    --text: #333333;
    --secondary-text: #6c6c6c;
    --border: #eeeeee;
    --primary: #000000;
    --secondary: #555555;
    --accent: #3b3b3b;
    --shadow: rgba(0, 0, 0, 0.04);
    --card-bg: #ffffff;
    --overlay: rgba(0, 0, 0, 0.03);
    --navbar-bg: rgba(255, 255, 255, 0.98);
    --button-bg: #000000;
    --button-text: #ffffff;
    --hover-bg: #f3f3f3;
    
    /* Apply Dark Theme Colors */
    ${props => props.darkMode && `
      --background: #0c0c0c;
      --secondary-background: #151515;
      --text: #f0f0f0;
      --secondary-text: #a0a0a0;
      --border: #2a2a2a;
      --primary: #ffffff;
      --secondary: #cccccc;
      --accent: #bebebe;
      --shadow: rgba(0, 0, 0, 0.2);
      --card-bg: #1a1a1a;
      --overlay: rgba(0, 0, 0, 0.2);
      --navbar-bg: rgba(12, 12, 12, 0.98);
      --button-bg: #ffffff;
      --button-text: #000000;
      --hover-bg: #1e1e1e;
    `}
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.3s;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .app-content {
    min-height: calc(100vh - 150px);
    width: 100%;
    max-width: 100%;
  }
  
  a {
    color: var(--accent);
    text-decoration: none;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    line-height: 1.2;
    color: var(--primary);
    letter-spacing: 0.5px;
  }
  
  h1 {
    font-size: 3.5rem;
    letter-spacing: 1px;
  }
  
  h2 {
    font-size: 2.5rem;
  }
  
  h3 {
    font-size: 1.8rem;
  }
  
  p {
    color: var(--secondary-text);
    font-weight: 300;
    letter-spacing: 0.2px;
  }
  
  img {
    max-width: 100%;
  }
  
  button {
    cursor: pointer;
    font-family: 'Inter', sans-serif;
  }
  
  input, textarea, select {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    background-color: var(--background);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 14px 18px;
    
    &:focus {
      outline: none;
      border-color: var(--accent);
    }
  }
  
  /* Form styles */
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 400;
    color: var(--secondary-text);
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }
  
  select {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    background-color: var(--background);
    color: var(--text);
    
    &:focus {
      outline: none;
      border-color: var(--accent);
    }
  }
`;