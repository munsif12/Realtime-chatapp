import React from 'react';
import ReactDOM from 'react-dom/client';
import { VechaiProvider } from "@vechaiui/react";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux';
import App from './App';
import { theme } from './config/vechaiuiThemes';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <VechaiProvider theme={theme} colorScheme="light">
        <div className="mainApp">
          <App />
        </div>
      </VechaiProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

