import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { CreateOP } from './pages/CreateOP';
import { OPDetails } from './pages/OPDetails';
import { NotFound } from './pages/NotFound';
import './App.css';
function Layout({ children }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen pt-12 pb-20 px-4 flex flex-col items-center">
      {}
      <div className="mb-8 transform hover:scale-105 transition-transform duration-500 ease-out">
        <img src="/messias.svg" alt="Logo MESsias" className="w-[180px] h-auto drop-shadow-md" />
      </div>

      {}
      <main className="w-full max-w-5xl glass-card p-6 md:p-10 relative overflow-hidden">
        {}
        <div className="absolute top-[-50%] left-[-10%] w-[80%] h-[80%] bg-messias-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[60%] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          {}
          <Header currentPath={location.pathname} />
          
          <div className="mt-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nova-op" element={<CreateOP />} />
          <Route path="/op/:id" element={<OPDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
