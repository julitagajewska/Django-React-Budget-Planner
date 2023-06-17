import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { SidebarLinkProvider } from './context/SidebarLinkContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SidebarLinkProvider>
          <App />
        </SidebarLinkProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
