import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global branding tokens and CSS resets
import App from './App.tsx';

// Rendering the application into the root element defined in index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
