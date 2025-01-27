import React, { useState } from 'react';
import axios from 'axios';
import { RiGithubFill, RiTwitterXFill, RiLinkedinBoxFill, RiMailLine, RiLoader4Line, RiSendPlane2Fill } from 'react-icons/ri';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const socialLinks = [
    {
      icon: RiMailLine,
      name: 'Email',
      username: 'miskinsadanand@gmail.com',
      link: 'mailto:miskinsadanand@gmail.com',
      color: 'text-red-500'
    },
    {
      icon: RiGithubFill,
      name: 'GitHub',
      username: 'SadanandMiskin',
      link: 'https://github.com/SadanandMiskin',
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      icon: RiTwitterXFill,
      name: 'X (Twitter)',
      username: '@ISadanandMiskin',
      link: 'https://x.com/ISadanandMiskin',
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      icon: RiLinkedinBoxFill,
      name: 'LinkedIn',
      username: 'sadanandmiskin',
      link: 'https://linkedin.com/in/sadanandmiskin',
      color: 'text-blue-600'
    },

  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await axios.post('https://surf-tasteful-swing.glitch.me/messageme', formData, {
        headers: { Authorization: 'Bearer sadanandbhai' }
      });

      if (response.data == true) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else if (response.data == 'unauthorized'){
        setStatus('error')
      }
    } catch (error) {
      setStatus('error');
      console.error('Submission failed', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex  justify-center min-h-screen">
      <div className="w-full max-w-2xl overflow-hidden">
      <h1 className=" md:text-2xl font-bold text-white dark:text-black mb-6 animate-fade-up animate-delay-100">Contact Me</h1>
        {/* Social Links Section */}
        <div className=" p-8 md:p-10">

          <div className="grid grid-cols-2  justify-center gap-6 ">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center space-y-2 hover:scale-105 hover:bg-blue-300/50 rounded-md transition-colors animate-fade-up animate-delay-200"
              >
                <social.icon className={`text-3xl md:text-4xl text-white dark:text-black`} />
                <div className="text-center">
                  <p className="text-white dark:text-black text-sm font-medium">{social.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="border border-gray-400/30  p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up animate-delay-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-gray-700"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-gray-700"
              />
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-gray-700"
            />


<button
  type="submit"
  disabled={status === 'sending'}
  className="w-full p-3 dark:bg-black dark:text-white bg-blue-400 text-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 hover:dark:bg-gray-700"
>
  {status === 'sending' ? (
    <>
      <RiLoader4Line className="animate-spin" />
      Sending...
    </>
  ) : (
    <>
    <RiSendPlane2Fill size={20}/>
    Send Message
    </>
  )}
</button>

          </form>

          {status === 'success' && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
              Message sent successfully!
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-center">
              Failed to send message. Please try again or contact on email.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;