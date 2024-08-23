import React from 'react';
import '../assets/Blog.css'
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-message">The page you're looking for doesn't exist.</p>
      <button className="not-found-button">Go back home</button>
    </div>
  );
};

export default NotFound;