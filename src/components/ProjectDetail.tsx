import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaGithub } from 'react-icons/fa';
import { BiArrowFromRight, BiGlobe } from "react-icons/bi";
import { works } from "../data/works";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = works.find((work) => work.id === parseInt(id!));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) {
    return <p className="page-shell py-16 text-center text-sm text-[#736d63]">Project not found.</p>;
  }

  return (
    <article className="page-shell py-8">
      <Link to="/projects" className="ghost-button mb-6">
        <BiArrowFromRight />
        Back to projects
      </Link>

      <div className="overflow-hidden rounded-[18px] border border-[#171514]/10 bg-[#fbfaf6]/70 p-1.5">
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[16/9] w-full rounded-[14px] object-cover"
        />
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-[1fr_0.42fr]">
        <div>
          <p className="section-kicker text-left">Project</p>
          <h1 className="font-display text-3xl font-bold leading-tight text-[#171514] sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-[13px] leading-7 text-[#736d63]">
            {project.desc}
          </p>
        </div>

        <aside className="surface-card h-fit p-4">
          <h2 className="font-code text-[10px] font-semibold uppercase text-[#827b70]">
            Stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech.t} className="chip">
                <tech.logo />
                {tech.t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-button"
            >
              <FaGithub />
              GitHub
            </a>
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-button"
              >
                <BiGlobe />
                Live Demo
              </a>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="mt-10 border-t border-[#171514]/10 pt-7">
        <h2 className="section-title">Features</h2>
        <ul className="mt-4 grid gap-2 text-[#736d63]">
          {project.features
            .split('\n')
            .map((feature) => feature.trim())
            .filter(Boolean)
            .map((feature) => (
              <li key={feature} className="rounded-[10px] border border-[#171514]/10 bg-[#fbfaf6]/60 px-3 py-2.5 text-xs leading-6">
                {feature.replace(/^- /, '')}
              </li>
            ))}
        </ul>
      </section>
    </article>
  );
};

export default ProjectDetail;
