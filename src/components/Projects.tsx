import { Link } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import { works } from '../data/works';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect } from 'react';

const Projects = () => {
  useGSAP(() => {
    gsap.from(".a-blog", {
      y: 16,
      opacity: 0,
      stagger: 0.055,
      duration: 0.45,
      ease: "power3.out",
    });
  });

  useEffect(()=>{
     window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])
  return (
    <section className="page-shell py-8">
      <div className="mb-5">
        <p className="section-kicker">Archive</p>
        <h1 className="section-title">Work index</h1>
      </div>

      <div className="folio-panel divide-y divide-[#edf1ef]/10">
        {works.map((work, index) => (
          <Link
            key={work.id}
            to={`/projects/${work.id}`}
            className="a-blog group grid gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[5.75rem_1fr_auto] sm:items-center"
          >
            <div className="overflow-hidden rounded-[12px] border border-[#edf1ef]/10 bg-[#151c1a]">
              <img
                src={work.image}
                alt={work.title}
                className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-code text-[10px] font-semibold text-[#68746d]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-[15px] font-extrabold text-[#edf1ef]">{work.title}</h2>
              </div>

              <p className="mt-2 text-[12.5px] leading-6 text-[#9ba69f]">
                {work.desc}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {work.technologies.map((tech) => (
                  <span key={tech.t} className="font-code text-[10px] font-semibold uppercase text-[#7f8b84]">
                    {tech.t}
                  </span>
                ))}
              </div>
            </div>

            <BiArrowToRight className="hidden h-5 w-5 text-[#edf1ef] transition group-hover:translate-x-1 sm:block" />
          </Link>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <a
          href="https://github.com/sadanandmiskin"
          target="_blank"
          rel="noopener noreferrer"
          className="ghost-button"
        >
          More on GitHub
        </a>
      </div>
    </section>
  );
};

export default Projects;
