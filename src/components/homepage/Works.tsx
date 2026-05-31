import { Link } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import { works } from '../../data/works';
import { useEffect, useRef, useState } from 'react';

const Works = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const container = containerRef.current;
    if (container) observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`section-block transition duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Selected work</p>
          <h2 className="section-title">Recent builds</h2>
        </div>
        <Link to="/projects" className="ghost-button shrink-0">
          All work
        </Link>
      </div>

      <div className="folio-panel divide-y divide-[#171514]/10">
        {works.slice(0, 4).map((work, index) => (
          <Link
            key={work.id}
            to={`/projects/${work.id}`}
            className={`group grid gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[5.75rem_1fr_auto] sm:items-center ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <div className="overflow-hidden rounded-[12px] border border-[#171514]/10 bg-[#ebe6dc]">
              <img
                src={work.image}
                alt={work.title}
                className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-code text-[10px] font-semibold text-[#a09a90]">
                  0{index + 1}
                </span>
                <h3 className="text-[15px] font-extrabold text-[#171514]">{work.title}</h3>
              </div>
              <p className="mt-2 line-clamp-2 text-[12.5px] leading-6 text-[#736d63]">
                {work.desc}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {work.technologies.slice(0, 3).map((tech) => (
                  <span key={tech.t} className="font-code text-[10px] font-semibold uppercase text-[#8a8378]">
                    {tech.t}
                  </span>
                ))}
              </div>
            </div>

            <BiArrowToRight className="hidden h-5 w-5 text-[#171514] transition group-hover:translate-x-1 sm:block" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Works;
