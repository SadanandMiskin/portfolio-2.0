import { useEffect, useState } from 'react';
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
    },
    {
      name: "Resume",
      href: "https://drive.google.com/file/d/1buDyrIGowWRZB2JdybjKYm3ttu2dlzZa/view"
    },
    {
      name: "Blogs",
      href: "/blogs"
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center p-2 w-full">
      <div className={`rounded-lg p-6 max-w-3xl h-max text-white transition-all duration-500 transform flex flex-col md:flex-row items-center
        ${isVisible ? 'blur-none opacity-100 translate-y-0' : 'blur-lg opacity-0 translate-y-8'}`}>

        {/* Name and Description */}
        <div className="md:w-1/2 w-full mb-4 md:mb-0">
          <h1 className="text-5xl font-bold dark:text-black tracking-tighter">Sadanand Miskin</h1>
          <p className="text-gray-400 dark:text-gray-700 py-2 mt-2">Software Dev - Passionate, Enthusiast, Dedicated.</p>
          <div className="gap-3 mt-6 flex flex-wrap">
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

        {/* Image Section */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative w-60 h-60">
            <div className="absolute w-full h-full rounded-full animate-spin-slow border-4 border-transparent border-t-cyan-400 border-b-purple-400" />
            <img
              src="/about/sam.jpeg"
              alt="Sadanand Miskin"
              className="w-full h-full rounded-full object-cover shadow-xl"
            />
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default NameCard;