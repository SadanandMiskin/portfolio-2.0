// components/Loader.js
import React, { useState, useEffect } from 'react';
import '../assets/Loader.css';
import sadanand from '../assets/Photos/sadanand-l.png'

const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(()=>{
        setProgress(prev => {
          if (prev < 100) {
            return Math.round(prev + 1.37);
          } else {
            clearInterval(interval);
            setTimeout(() => {
              onLoadComplete();
            }, 280); 
            return prev;
          }
        });
      }, 600)
    }, 13); 

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="loader-container">
      <img src={sadanand} alt="Sadanand" />
      <div className="loader">
        <div className="loader-progress" style={{ width: `${progress}%` }}></div>
        
        {/* <span className="loader-percentage">{progress}</span> */}
        
      </div>
      {/* <p className="loader-text">{progress}%</p> */}
      {/* <p className='loader-text2'>....</p> */}
    </div>
  );
};

export default Loader;
