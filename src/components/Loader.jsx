// components/Loader.js
import React, { useState, useEffect } from 'react';
import '../assets/Loader.css';

const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return Math.round(prev + 1.37);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onLoadComplete();
          }, 180); 
          return prev;
        }
      });
    }, 8); 

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="loader-container">
      {/* <div className="loader"> */}
        <div className="loader-progress" style={{ width: `${progress}%` }}></div>
        
        {/* <span className="loader-percentage">{progress}</span> */}
      {/* </div> */}
      <p className="loader-text">{progress}%</p>
      <p className='loader-text2'>It is Happening</p>
    </div>
  );
};

export default Loader;
