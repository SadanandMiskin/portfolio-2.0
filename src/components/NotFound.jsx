import React from 'react';
import '../assets/Blog.css'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-message">The page you're looking for doesn't exist.</p>
      <Link to={'/'}>
      <button className="not-found-button">Go back home</button>
      </Link>
    </div>
  );
};

export default NotFound;