import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiLinkedinBoxFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri";
import '../assets/Contact.css';
import { git, linkedin, sendMail, X } from '../functions/Onclicks';


const Contact = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (popupVisible) {
      const timer = setTimeout(() => setPopupVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [popupVisible]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const mailMessage = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    const token = 'sadanandbhai';

    try {
      const response = await axios.post('https://surf-tasteful-swing.glitch.me/messageme', mailMessage, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setPopupVisible(true); 
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      return(
        <div className="popup" style={{backgroundColor: 'red'}}>
          <p className='err'>Error Occured! Please try again later</p>
        </div>
      )
    }
  };

  return (
    <div className="main2">
      <div className="grid2">
        <div className="gg d email" onClick={sendMail}>
          <span>miskinsadanand@gmail.com</span>
        </div>
        <div className="gg d linkd" onClick={linkedin}>
          <RiLinkedinBoxFill size={40} />
        </div>
        <div className="gg d x" onClick={X}>
          <RiTwitterXFill size={40} />
        </div>
        <div className="gg d github" onClick={git}>
          <RiGithubFill size={40} />
        </div>
      </div>

      <form className="dark-mode-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Your Name"
          className="form-input"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="your@email.com"
          className="form-input"
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          placeholder="Your Message"
          className="form-input"
        />

        <button type="submit" className="form-button">
          Send
        </button>
      </form>

      {popupVisible && (
        <div className="popup" style={{backgroundColor: 'green'}}>
          <p className='suc'>Thank you, your message has been sent!</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
