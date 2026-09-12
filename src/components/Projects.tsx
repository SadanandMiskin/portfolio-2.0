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

      <div className="folio-panel divide-y divide-[#171514]/10">
        {works.map((work, index) => (
          <Link
            key={work.id}
            to={`/projects/${work.id}`}
            className="a-blog group grid gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[5.75rem_1fr_auto] sm:items-center"
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
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-[15px] font-extrabold text-[#171514]">{work.title}</h2>
              </div>

              <p className="mt-2 text-[12.5px] leading-6 text-[#736d63]">
                {work.desc}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {work.technologies.map((tech) => (
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
