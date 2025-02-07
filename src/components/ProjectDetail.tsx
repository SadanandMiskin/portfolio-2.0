
import { Link, useParams } from "react-router-dom";
import { FaGithub } from 'react-icons/fa';

import { BiArrowFromRight, BiGlobe } from "react-icons/bi";
import { works } from "../data/works";
// interface tech {
//   logo: ReactElement,
//   t: string
// }

// interface workType {
//   id: number,
//   title: string,
//   github: string,
//   liveLink: string,
//   image: string,
//   desc: string,
//   features: string,
//   technologies: tech[]
// }

// const works: workType[] = [
//   {
//     id: 1,
//     title: "ProfilesMe",
//     github: "https://github.com/SadanandMiskin/profilesme",
//     liveLink: "https://profilesme.site",
//     technologies: [
//       { logo: <FaReact />, t: 'React' },
//       { logo: <SiExpress />, t: 'Express' },
//       { logo: <FaAws />, t: 'EC2' },
//       { logo: <DiMongodb />, t: 'MongoDB' },
//     ],
//     desc: 'A profile builder platform',
//     features: `
//       - Stream Movies: Watch movies directly without downloading the full file.
//       - Watch Trailers: View trailers for movies, integrated with YouTube.
//       - Login & Signup: Sign up or log in to access more features.
//       - Search: Search for movies or actors.
//       - Home Page: See popular movies and what’s trending.
//     `,
//     image: "/projects/profilesme.png",
//   },
//   {
//     id: 2,
//     title: "NotFlix",
//     github: "https://github.com/SadanandMiskin/notflix",
//     liveLink: "https://notflixpage.vercel.app/",
//     technologies: [
//       { logo: <FaReact />, t: 'React' },
//       { logo: <SiRedux />, t: 'Redux Toolkit' },
//       { logo: <SiExpress />, t: 'Express' },
//     ],
//     desc: 'A Netflix clone with JWT authentication, advanced search, and YouTube trailer streaming',
//     features: `
//       - Stream Movies: Watch movies directly without downloading the full file.
//       - Watch Trailers: View trailers for movies, integrated with YouTube.
//       - Login & Signup: Sign up or log in to access more features.
//       - Search: Search for movies or actors.
//       - Home Page: See popular movies and what’s trending.
//     `,
//     image: "/projects/notflix.png",
//   }
//   // Add more work objects here
// ];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = works.find((work) => work.id === parseInt(id!));

  if (!project) {
    return <p className="text-center text-lg mt-10">Project not found!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link to={'/projects'}
        className="px-3 mb-2 "
        >
        <button className="mb-3 px-3 bg-white flex items-center gap-2 rounded-md font-bold dark:bg-black dark:text-white"><BiArrowFromRight/> back</button>
      </Link>
      <img
        src={project.image}
        alt={project.title}
        className="w-full rounded-lg mb-6 border border-gray-500/50"
      />
      <div className="border border-gray-600 p-5">
        <h1 className="text-3xl font-bold mb-2 text-white dark:text-black">{project.title}</h1>
        <p className="text-lg dark:text-gray-700 mb-4 text-gray-500">{project.desc}</p>
        <div className="flex flex-wrap gap-4 mb-6">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-white text-xl border border-gray-500/50 dark:text-black px-3 py-1 rounded-lg"
            >
              <tech.logo />
              <span>{tech.t}</span>
            </div>
          ))}
        </div>
        <div className="mb-6">

        </div>
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className=" flex gap-2 dark:text-white items-center bg-white dark:bg-black px-3 py-1 rounded-lg hover:underline"
          >
           <FaGithub className="dark:text-white"/>  GitHub
          </a>
          {
            project.liveLink ? <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center bg-blue-400 px-3 py-1 rounded-lg text-white hover:underline"
          >
            <BiGlobe className="dark:text-white"/> Live Demo
          </a> : ''
          }
        </div>
      </div>
      <h2 className="text-3xl mt-4 font-semibold mb-2 dark:text-black text-white">Features</h2>
          <ul className="pl-5 space-y-2 dark:text-gray-700 text-gray-400">
            {project.features.split('\n').map((feature, index) => (
              <li key={index}>{feature.trim()}</li>
            ))}
          </ul>
    </div>
  );
};

export default ProjectDetail;
