import { Link } from 'react-router-dom';
import { BiArrowToRight, BiGlobe } from 'react-icons/bi';
import { works } from '../data/works';
import { useEffect, useState, useRef } from 'react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`max-w-3xl mx-auto w-full p-4 md:p-6 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className={`text-4xl font-bold mb-8 text-white dark:text-black duration-900 flex justify-center tracking-tighter transition-all  ease-in-out
          ${isVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-md translate-y-5'}`}>
        All Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {works.map((work, index) => (
          <Link
            key={work.id}
            to={`/projects/${work.id}`}
            className={`group flex flex-col overflow-hidden rounded-xl bg-black dark:bg-white
                     border border-gray-500/50 dark:border-gray-400/50
                     transition-all duration-500 backdrop-blur-sm
                     hover:shadow-md hover:shadow-zinc-900/20
                     transform ${
                       isVisible
                         ? 'opacity-100 translate-y-0 scale-100 backdrop-blur-lg'
                         : 'opacity-0 translate-y-10 scale-95'
                     }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={work.image}
                alt={work.title}
                className={`h-full w-full object-cover transition-transform duration-500
                         group-hover:scale-105 ${
                           isVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-lg'
                         }`}
              />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-white mb-1 dark:text-black ">
                {work.title}
              </h2>

              <p className="dark:text-zinc-500 text-zinc-300/70 text-sm mb-4 flex-grow">
                {work.desc}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {work.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-zinc-300/30 px-2 py-1 rounded-md
                             text-sm text-zinc-300 dark:text-black"
                  >
                    <span>{tech.t}</span>
                  </div>
                ))}
              </div>

              {/* Learn More Button */}
              <a
                href={work.liveLink ? work.liveLink : work.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-1 text-sm font-medium text-white
                           bg-zinc-800 py-1 px-2 rounded-lg w-fit
                           group-hover:bg-zinc-700 transition-colors">
                  <BiGlobe className="w-5 h-5 transition-transform" />
                  {work.liveLink ? 'Website' : 'Learn More'}
                </div>
              </a>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/sadanandmiskin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-500
                   transition-colors font-medium text-lg hover:underline"
        >
          Many more on Github
          <BiArrowToRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Projects;
