// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { AuthProvider, AuthContext } from './Context/AuthContext';

const App = () => {
  const { user } = React.useContext(AuthContext);
  return <RouterProvider router={router} context={{ auth: { user } }} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
