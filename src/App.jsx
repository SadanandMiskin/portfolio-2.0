import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navigation from './components/GridComponents/Navigation';
import Projects from './components/Projects';
import { useState, useEffect } from 'react';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Loader from './components/Loader';
import NotFound from './components/NotFound'; // Import your NotFound component

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <BrowserRouter>
      {loading ? (
        <Loader onLoadComplete={handleLoadComplete} />
      ) : (
        <>
        <div className="layout-container">
        <Navigation />
        <main className="main-content">
          {/* <MainContent /> */}
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
        </main>
      </div>
          {/* <Navigation />
          <div className="content-container">
            
          </div> */}
        </>
      )}
    </BrowserRouter>
  );
}

export default App;