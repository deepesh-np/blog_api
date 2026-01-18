/** @format */

import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider';
// import { ThemeProvider } from './themes/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeProvider> */}
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    {/* </ThemeProvider> */}
  </StrictMode>
);
