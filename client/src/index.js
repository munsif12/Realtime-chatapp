import React from 'react';
import ReactDOM from 'react-dom/client';
import { VechaiProvider } from "@vechaiui/react";
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { theme } from './config/vechaiuiThemes';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <VechaiProvider theme={theme} colorScheme="dark">
        <App />
      </VechaiProvider>
    </BrowserRouter>
  </React.StrictMode>
);

