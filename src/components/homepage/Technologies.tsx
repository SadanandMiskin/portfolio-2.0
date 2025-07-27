// import { useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython } from "react-icons/fa";
import { FaDocker } from "react-icons/fa6";
import { SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiVite } from "react-icons/si";
// import { useLocation } from 'react-router-dom';

const Work = () => {
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
    gsap.set(['.tech', '.h2'] , {
      y: 60,
      opacity: 0
    })
    gsap.to(['.h2','.tech' ]  , {
      y:9,
      opacity: 1,
      stagger: 0.06,
      delay: 0.2,
      duration: 0.3
    }, )
  }, [])

  const technologies = [
    { icon: <FaReact className="text-blue-400" />, name: "React" },
    { icon: <SiJavascript className="text-yellow-400" />, name: "JavaScript" },
    { icon: <SiTypescript className="text-blue-500" />, name: "TypeScript" },
    { icon: <SiMongodb className="text-green-500" />, name: "MongoDB" },
    { icon: <SiExpress className="text-gray-400" />, name: "Express" },
    { icon: <FaPython className="text-blue-500" />, name: "Python" },
    { icon: <FaNodeJs className="text-green-600" />, name: "Node.js" },
    { icon: <FaDatabase className="text-blue-600" />, name: "MySQL" },
    { icon: <FaDocker className="text-blue-500" />, name: "Docker" },
    { icon: <SiTailwindcss className="text-cyan-400" />, name: "TailwindCSS" },
    { icon: <SiVite className="text-purple-500" />, name: "Vite" },
    { icon: <FaGitAlt className="text-orange-500" />, name: "Git" },
  ];

  return (
    <div className={`py-8 px-4 max-w-3xl mx-auto mt-2 transition-all duration-800 transform
      ${'blur-none opacity-100 translate-y-0' }`}>
      <h2 className={`h2 text-2xl font-bold text-center mb-8 bg-gradient-to-b from-gray-300 via-gray-400 to-zinc-600
  dark:from-gray-500 dark:via-gray-600 dark:to-zinc-800
  bg-clip-text text-transparent tracking-tighter ${ 'blur-none opacity-100 translate-y-0'}`}>
        I work with...
      </h2>
      <div className="flex flex-wrap gap-4 justify-center px-5">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="tech group relative flex items-center gap-3 px-3 py-2
                     bg-gray-800/10 dark:bg-black/10 backdrop-blur-md
                     border border-gray-400/20 dark:border-gray-700/20
                     rounded-xl
                     hover:bg-white/20 hover:bg-gradient-to-bl hover:from-blue-500/50 hover:via-orange-300/20 dark:hover:to-fuchsia-400/20 hover:backdrop-blur-md
                     hover:scale-105 transform
                     transition-all duration-300 ease-out"

          >
            <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
              {tech.icon}
            </div>
            <span className="text-sm text-white dark:text-black transition-transform duration-300 group-hover:scale-110">
              {tech.name}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent dark:from-black/5
                          rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
