// import  { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { works } from '../data/works';
import { BiArrowToRight } from 'react-icons/bi';
// import { works } from '../../data/works';
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
//   technologies: tech[]
// }

//  const works: workType[] = [
//   {
//     id:1,
//     title: "ProfilesMe",
//     github: "https://github.com/SadanandMiskin/profilesme",
//     liveLink: "https://profilesme.site",
//     technologies: [
//       {
//       logo: <FaReact/> ,
//       t: 'React'
//       },
//       {
//         logo: <SiExpress />,
//         t: 'Express'
//       },
//       {
//         logo: <FaAws />,
//         t: 'EC2'
//       },
//       {
//         logo: <DiMongodb />,
//         t: 'MongoDB'
//       }

//     ],
//     desc: 'A profile builder platform',
//     image: "public/projects/profilesme.png",
//   },
//   {
//     id:2,
//     title: "NotFlix",
//     github: "https://github.com/SadanandMiskin/notflix",
//     liveLink: "https://notflixpage.vercel.app/",
//     technologies: [
//       {
//         logo: <FaReact />,
//         t: 'React'
//       },
//       {
//         logo: <SiRedux />,
//         t: 'Redux Toolkit'
//       },
//       {
//         logo: <SiExpress />,
//         t: 'Express'
//       }
//     ],
//     desc: 'A Netflix clone with JWT authentication, advanced search, and YouTube trailer streaming',
//     image: "public/projects/notflix.png",
//   }
//   // Add more work objects here
// ];

const Projects = () => {
  return (
    <div className="max-w-2xl w-full flex flex-col p-3">

      <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full  ">
        <h1 className="text-2xl font-bold  mb-1 text-white dark:text-black animate-fade-up animate-delay-200">
          Project Works
        </h1>

        {works.map((work) => (
          <Link
            key={work.id}
            to={`/projects/${work.id}`}
            className="animate-fade-up animate-delay-200 group relative flex flex-col justify-between overflow-hidden rounded-xl bg-zinc-900
                       border border-gray-500/50 dark:border-[rgba(255,255,255,.1)] shadow-sm
                       min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
            style={{ margin: "unset" }}
          >
            {/* Background Image */}
            <div>
              <img
                src={work.image}
                alt={`${work.title} background`}
                className="absolute left-0 top-0 h-full w-full border-none transition-all duration-300 ease-out opacity-70
                           [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105 object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-4 text-white flex flex-col justify-between h-full transition-all duration-300 group-hover:translate-y-[-50px]">
              <h2 className="md:text-4xl text-2xl font-semibold">{work.title}</h2>
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                {work.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="md:text-2xl text-sm flex flex-wrap justify-center items-center gap-1 md:gap-1 bg-white/10 py-1 px-2 rounded-md mb-3 border border-solid border-gray-700"
                  >
                     <tech.logo />
                    <span>{tech.t}</span>
                  </div>
                ))}
              </div>
              <p>{work.desc}</p>


            </div>
            <Link
            to={`/projects/${work.id}`}
            // target="_blank"
            // rel="noopener noreferrer"
            className="mb-0 absolute flex items-center gap-2 bottom-0 left-4 bg-white text-center  text-black py-1 px-2 rounded-lg
                       transition-transform transform translate-y-full group-hover:translate-y-[-10px] duration-300"
          >
            Learn More <BiArrowToRight className='w-6 h-6'/>
          </Link>
          </Link>
        ))}
      </div>
      <p className='mt-3 text-lg flex justify-center underline text-green-600'>Many more on Github {`->`}</p>
    </div>
  );
};

export default Projects;
