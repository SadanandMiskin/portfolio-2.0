// import { useEffect, useState } from 'react';
// import { CgArrowTopRight } from 'react-icons/cg';
import {  FaGithub } from 'react-icons/fa';
import { FaFileArrowDown, FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
// import { useLocation } from 'react-router-dom';
import { driveLink } from '../../data/resume';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// interface

const NameCard = () => {
  // const [isVisible, setIsVisible] = useState(false);
  // const location = useLocation();

  // useEffect(() => {
  //   setIsVisible(false);
  //   const timer = setTimeout(() => {
  //     setIsVisible(true);
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, [location]);

useGSAP(() => {
  gsap.from('.z' , {
    y: 80,
    opacity: 0.1,
    delay: 0.2,
     filter: "blur(10px)",
    ease: "power3.inOut"
  })
})

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/sadanandmiskin",
      icon: FaLinkedin
    },
    {
      name: "GitHub",
      href: "https://github.com/SadanandMiskin",
      icon: FaGithub
    },
    {
      name: "Email",
      href: "mailto:miskinsadanand@gmail.com",
      icon: MdEmail
    },
    {
      name: "Resume",
      href: driveLink,
      icon: FaFileArrowDown
    },
    // {
    //   name: "Blogs",
    //   href: "/blogs",
    //   icon: FaFile
    // }
  ];

  return (
    <div className="z flex max-w-3xl flex-col justify-center items-center p-2 w-full">
      <div className={`rounded-lg p-6 max-w-3xl h-max text-white transition-all duration-500 transform flex flex-col md:flex-row items-center
        ${ 'blur-none opacity-100 translate-y-0' }`}>

        {/* Name and Description */}
        <div className="md:w-2/3 w-full mb-4 md:mb-0">
<h1 className="text-5xl font-bold
  bg-gradient-to-b from-gray-300 via-gray-400 to-zinc-600
  dark:from-gray-500 dark:via-gray-600 dark:to-zinc-800
  bg-clip-text text-transparent tracking-tighter">
  Sadanand Miskin
</h1>
          <p className="text-gray-400 dark:text-gray-600 py-2 mt-2">Software Dev - Passionate, Enthusiast, Dedicated.</p>
          <div className="gap-3 mt-6 flex flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:bg-slate-200/50 rounded-xl px-2 py-1 hover:bg-gray-800/10 transition-colors duration-200 bg-slate-700/30"
              >
                <span className="dark:text-gray-600 text-gray-400 flex gap-2">
                   {link.icon && <link.icon size={20} />}
                  {link.name}
                  {/* <link.icon size={20} /> */}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative w-60 h-60">
              <img
              src="/about/b.webp"
              alt="Sadanand Miskin"
              className="w-full h-full rounded-full object-cover shadow-[-3px_-8px_62px_-33px_#a2bcd7]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;