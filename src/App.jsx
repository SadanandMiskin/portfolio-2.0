import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navigation from './components/GridComponents/Navigation';
import Projects from './components/Projects';
import { useState, useEffect } from 'react';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Loader from './components/Loader';

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
          <Navigation />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
