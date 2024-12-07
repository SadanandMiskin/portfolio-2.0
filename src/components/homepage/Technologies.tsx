
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaJava } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiVite, SiVercel } from "react-icons/si";

const Work = () => {
  const technologies = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    {icon: <FaJava/> , name:  'Java'},
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <FaDatabase />, name: "MySQL" },
    { icon: <SiTailwindcss />, name: "TailwindCSS" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiVite />, name: "Vite" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <SiVercel />, name: "Vercel" },
  ];

  return (
    <div className="py-8 px-4 max-w-4xl w-full">
      <h2 className="text-3xl md:text-3xl font-bold text-center mb-6 text-white dark:text-black">
        I work with...
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-950/80 border border-gray-300 dark:border-white rounded-md hover:bg-slate-500 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <span className="text-black dark:text-white text-xl">{tech.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-white">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;