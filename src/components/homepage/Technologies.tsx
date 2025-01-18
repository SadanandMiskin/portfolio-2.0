import { FaReact, FaNodeJs, FaDatabase, FaGitAlt,  FaPython } from "react-icons/fa";
import { FaDocker } from "react-icons/fa6";
import { SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiVite } from "react-icons/si";

const Work = () => {
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
    <div className="py-8 px-4 max-w-2xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-white dark:text-black animate-fade-up animate-delay-250">
        I work with...
      </h2>
      <div className="flex flex-wrap gap-4 justify-center px-5">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="group relative flex items-center gap-3 px-3 py-2
                     bg-white/10 dark:bg-black/10 backdrop-blur-md
                     border border-gray-50/20 dark:border-gray-700/20
                     rounded-xl
                     hover:bg-white/20 hover:bg-gradient-to-bl hover:from-blue-500/50 hover:via-orange-300/20 dark:hover:to-fuchsia-400/20 hover:backdrop-blur-md
                     hover:scale-105 transform
                     transition-all duration-300 ease-out animate-fade-up animate-delay-300"
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