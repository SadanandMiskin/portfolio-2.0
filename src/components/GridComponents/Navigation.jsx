import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import './Navigation.css'; // Make sure this points to your CSS file

const Navigation = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="header">
      <nav className="navigate">
        <Link 
          to={'/'} 
          className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
          onClick={() => handleClick('/')}
        >
          Home
        </Link>
        <Link 
          to={'/projects'} 
          className={`nav-link ${activeLink === '/projects' ? 'active' : ''}`}
          onClick={() => handleClick('/projects')}
        >
          Projects
        </Link>
        <Link 
          to={'/blog'} 
          className={`nav-link ${activeLink === '/blog' ? 'active' : ''}`}
          onClick={() => handleClick('/blog')}
        >
          Blogs
        </Link>
        <Link 
          to={'/contact'} 
          className={`nav-link ${activeLink === '/contact' ? 'active' : ''}`}
          onClick={() => handleClick('/contact')}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;