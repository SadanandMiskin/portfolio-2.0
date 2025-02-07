import React, { useEffect, useState } from 'react';
import { CgArrowTopRight } from 'react-icons/cg';
import { useLocation } from 'react-router-dom';

const NameCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/sadanandmiskin",
    },
    {
      name: "GitHub",
      href: "https://github.com/SadanandMiskin",
    },
    {
      name: "Email",
      href: "mailto:miskinsadanand@gmail.com",
    }
  ];

  return (
    <div className="flex flex-col justify-center p-2 w-full">
      <div className={`rounded-lg p-6 max-w-2xl h-max text-white transition-all duration-500 transform
        ${isVisible ? 'blur-none opacity-100 translate-y-0' : 'blur-lg opacity-0 translate-y-8'}`}>
        {/* Name and Links */}
        <div className="flex justify-center md:flex-row flex-row mb-2">
          <h1 className="text-5xl font-bold dark:text-black tracking-tighter">Sadanand Miskin</h1>
        </div>

        {/* Description */}
        <p className="text-gray-400 dark:text-gray-700 py-2 mt-2 flex justify-center flex-wrap">
          A Software Developer - Passionate, Enthusiast, Dedicated.
        </p>

        {/* Social Links */}
        <div className="gap-3 mt-6 flex justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:bg-slate-200/50 rounded-xl px-2 py-1 hover:bg-gray-800/10 transition-colors duration-200 bg-slate-700/30"
            >
              <span className="dark:text-black text-white flex">
                {link.name}
                <CgArrowTopRight size={20} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NameCard;