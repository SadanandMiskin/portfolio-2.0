import React, { useState,  useRef } from 'react';
import axios from 'axios';
import {
  RiGithubFill, RiTwitterXFill, RiLinkedinBoxFill, RiMailLine,
  RiLoader4Line, RiSendPlane2Fill
} from 'react-icons/ri';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'


const Contact = () => {
  useGSAP(() => {
    // gsap.to('#c', {
    //   scrollTrigger: {
    //     trigger: '#c',
    //     start: 'top bottom', // When top of #c hits bottom of viewport
    //     end: 'bottom bottom',
    //   },
    // });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#c',
        start: 'top bottom', // When top of #c hits bottom of viewport
        end: 'bottom bottom',
      }
    })

    timeline.fromTo('#c' , {
      opacity: 0,
      y: 100
    }, {
      opacity: 1,
      y: 0,
      ease: 'power3.inOut'
    })
  }, []);


  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  // const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) setIsVisible(true);
  //     },
  //     { threshold: 0.3 }
  //   );

  //   if (containerRef.current) observer.observe(containerRef.current);
  //   return () => observer.disconnect();
  // }, []);

  const socialLinks = [
    { icon: RiMailLine, name: 'Email', username: 'miskinsadanand@gmail.com', link: 'mailto:miskinsadanand@gmail.com', color: 'text-red-500' },
    { icon: RiGithubFill, name: 'GitHub', username: 'SadanandMiskin', link: 'https://github.com/SadanandMiskin', color: 'text-gray-800 dark:text-gray-200' },
    { icon: RiTwitterXFill, name: 'X (Twitter)', username: '@ISadanandMiskin', link: 'https://x.com/ISadanandMiskin', color: 'text-gray-800 dark:text-gray-200' },
    { icon: RiLinkedinBoxFill, name: 'LinkedIn', username: 'sadanandmiskin', link: 'https://linkedin.com/in/sadanandmiskin', color: 'text-blue-600' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await axios.post('https://mail.0sm.bar/messageme', formData, {
        headers: { Authorization: 'Bearer sadanandbhai' }
      });

      if (response.data == true) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else if (response.data == 'unauthorized') {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Submission failed', error);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`container mx-auto px-4 py-12 flex justify-center  transition-all duration-700 ease-in-out
        ${ 'opacity-100 blur-none translate-y-0' }`}
    >
      <div id='c' className="w-full max-w-4xl overflow-hidden">
        {/* Heading */}
        <h1 className={`md:text-4xl text-3xl flex justify-center font-bold bg-gradient-to-b from-gray-300 via-gray-400 to-zinc-600
  dark:from-gray-500 dark:via-gray-600 dark:to-zinc-800
  bg-clip-text text-transparent tracking-tighter mb-6 transition-all duration-300 ease-in-out
          ${ 'opacity-100 blur-none translate-y-0' }`}
        >
          Contact Me
        </h1>

        <div className='md:flex md:gap-3'>
          <div className="md:w-1/3 p-8 md:p-10">
            {/* Contact Text */}
            <div className={`mb-6 transition-all duration-300 ease-in-out
              ${ 'opacity-100 blur-none translate-y-0'}`}
            >
              <p className="text-white dark:text-black text-sm leading-relaxed">
               For any inquiries, you can contact me via email. {' '}
                <a
                  href="mailto:miskinsadanand@gmail.com"
                  className="text-blue-400 dark:text-blue-600 hover:underline"
                >
                  miskinsadanand@gmail.com
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-4 justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center space-y-2 rounded-md transition-all duration-500 ease-in-out
                    ${'opacity-100 blur-none translate-y-0 scale-100' }
                    hover:scale-105 0`}
                >
                  <social.icon className="border border-gray-700 rounded-md p-1 text-3xl md:text-4xl text-gray-400 dark:text-black" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`md:w-xl border border-gray-400/30 p-6 md:p-8 transition-all duration-300 ease-in-out
            ${ 'opacity-100 blur-none translate-y-0'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="text-sm w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-gray-700"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-sm w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-gray-700"
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="text-sm w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 dark:text-gray-700"
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
                    <RiSendPlane2Fill size={20} />
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
    </div>
  );
};

export default Contact;