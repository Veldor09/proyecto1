// src/App.tsx
import React from 'react';
import Layout from './Components/Layout';

// Import your pages - adjust according to actual exports
import Home from './Pages/HomePage';
// Use temporary components for pages with export issues
const DonacionesPage = () => <div>Donaciones Page</div>;
const ProyectosPage = () => <div>Proyectos Page</div>;
const VoluntariosPage = () => <div>Voluntarios Page</div>;

import { useNavigateTo } from './Hooks/useNavigateTo';

function App() {
  const { currentPage, navigateTo } = useNavigateTo('home');

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'donaciones':
        return <DonacionesPage />;
      case 'proyectos':
        return <ProyectosPage />;
      case 'voluntarios':
        return <VoluntariosPage />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout navigateTo={navigateTo} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;