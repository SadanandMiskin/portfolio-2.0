import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const experiences = [
  {
    company: "ICICI Prudential AMC",
    role: "Full Stack Developer Intern",
    duration: "Jun - July 2024",
    description: "Worked on building and maintaining full-stack applications using React, Node.js, and MySQL with cross-functional teams.",
    logo: "/ICIPR.webp"
  },
  {
    company: "Compsoft Technologies Pvt Ltd",
    role: "Full Stack Web Developer Intern",
    duration: "Oct - Nov 2022",
    description: "Developed responsive web applications using JavaScript, React, Node.js, and MongoDB while improving UI/UX design.",
    logo: "c.webp"
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <section className={`max-w-3xl mx-auto p-4 mt-6 w-full transition-all duration-1000 transform
      ${isVisible ? 'blur-none opacity-100 translate-y-0' : 'blur-lg opacity-0 translate-y-8'}`}>
      <h2 className="text-2xl font-bold text-center bg-gradient-to-b from-gray-300 via-gray-400 to-zinc-600
  dark:from-gray-500 dark:via-gray-600 dark:to-zinc-800
  bg-clip-text text-transparent tracking-tighter mb-8">
        Experience
      </h2>
      <div>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-zinc-800/20 dark:bg-gray-100/30 rounded-lg p-6 hover:shadow-lg transition-all duration-300 backdrop-blur-sm mb-3"
            style={{
              transitionDelay: `${index * 200}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translateY(0) scale(1)'
                : 'translateY(20px) scale(0.95)'
            }}
          >
            <div className="md:flex  items-start gap-4">
              {/* Company Logo */}
              <div className="shrink-0">
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-16 h-16 rounded-full object-contain bg-white/10"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-md font-bold text-white dark:text-black mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-green-500 dark:text-purple-700 text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-600 whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-gray-400 dark:text-gray-700 mt-2 text-sm">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
