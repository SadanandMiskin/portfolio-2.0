import { IconType } from 'react-icons';
import { DiMongodb } from 'react-icons/di';
import { FaReact, FaAws, FaNodeJs } from 'react-icons/fa';
import { GiGemini } from 'react-icons/gi';
import { SiEjs, SiEthereum, SiExpress, SiMinutemailer, SiRedux, SiSolidity } from 'react-icons/si';

export interface Tech {
  logo: IconType,
  t: string
}

export interface WorkType {
  id: number,
  title: string,
  github: string,
  liveLink?: string,
  image: string,
  desc: string,
  features: string,
  technologies: Tech[]
}

export const works: WorkType[] = [
  {
    id: 2,
    title: "Chat0sm",
    github: "https://github.com/SadanandMiskin/chat0sm",
    liveLink: "https://chat.0sm.bar",
    technologies: [
      { logo: FaReact, t: 'React' },
      { logo: SiExpress, t: 'Express' },
      { logo: GiGemini, t: 'Gemini AI' },
      { logo: DiMongodb, t: 'MongoDB' },
    ],
    desc: 'A chatgpt like clone',
    features: `
      - A chatGpt like clone using Gemini and google OAuth.
      - Creates a structured Readme like format for the queries and solutions.
      - Login & Signup: Sign up or log in to access more features.
      - Get answer to your any query asked directly to Google's Gemini
    `,
    image: "/projects/chat.png",
  },
  {
    id: 2,
    title: "ProfilesMe",
    github: "https://github.com/SadanandMiskin/profilesme",
    liveLink: "https://profilesme.site",
    technologies: [
      { logo: FaReact, t: 'React' },
      { logo: SiExpress, t: 'Express' },
      { logo: FaAws, t: 'EC2' },
      { logo: DiMongodb, t: 'MongoDB' },
    ],
    desc: 'A profile builder platform',
    features: `
      - A profile builder similar to Guns.lol.
      - Bring all your unique profiles at single place at a single link.
      - Login & Signup: Sign up or log in to access more features.
      - Get insights of total profile views.
      - Special video background and a short description looks cook :).
    `,
    image: "/projects/profilesme.png",
  },
  {
    id: 3,
    title: "NotFlix",
    github: "https://github.com/SadanandMiskin/notflix",
    liveLink: "https://notflixpage.vercel.app/",
    technologies: [
      { logo: FaReact, t: 'React' },
      { logo: SiRedux, t: 'Redux Toolkit' },
      { logo: SiExpress, t: 'Express' },
    ],
    desc: 'A Netflix clone with JWT authentication, advanced search, and YouTube trailer streaming',
    features: `
      - Stream Movies: Watch movies directly without downloading the full file.
      - Watch Trailers: View trailers for movies, integrated with YouTube.
      - Login & Signup: Sign up or log in to access more features.
      - Search: Search for movies or actors.
      - Home Page: See popular movies and what's trending.
    `,
    image: "/projects/notflix.png",
  },

  {
    id:4,
    title: "Kum Kum",
    github: "https://github.com/SadanandMiskin/kum-kum",
    liveLink: "https://kum-kum.vercel.app/",
    technologies: [
      { logo: SiEjs, t: 'Ejs' },
      { logo: SiExpress, t: 'Express' },
      { logo: SiMinutemailer, t: 'NodeMailer' },
    ],
    desc: 'My freelance project',
    features: `
      - Enables users to pre-book various beauty services directly through the website.
      - Utilizes NodeMailer for sending automated confirmation emails to users upon booking.
      - An administrative interface where the owner can manage user details.
      - Custom built template for testimonials collected directly from user and display on the homepage.
    `,
    image: "/projects/kum.png",
  },
  {
    id: 5,
    title: "EmpVerify",
    github: "https://github.com/sadanandmiskin/empverify",
    image: '/projects/emp.png',
    desc: "My Final year project, (Unavailable due to vercel not support metamask)",
    features: `
    - Web3 application for streamlined HR verification processes, ensuring transparency and tamper-proofing.
    - Integrated IPFS for decentralized data storage, resulting in an increase in data retrieval efficiency. HR verification.
    - decentralized data storage using IPFS`,
    technologies: [
      { logo: SiSolidity, t: "Solidity" },
      { logo: FaNodeJs ,t: "Node.js" },
      { logo: DiMongodb, t: "MongoDB" },
      { logo: SiEjs, t: "EJS" },
      { logo: SiEthereum, t: "Ganache" }
    ]
  },
  {
    id: 6,
    title: "GitCrawler",
    github: "https://github.com/SadanandMiskin/GitCrawler",
    image: '/projects/gitc.png',
    desc: "A hobby project, I was bored :)",
    features: `
    - Watches new issues for any repository user provides
    -  notifies via email Watches new issues, email notifications`,
    technologies: [
      { logo: FaNodeJs, t: "Node" },
      { logo: SiExpress, t: "Express" },
      { logo: SiMinutemailer, t: "NodeMailer" },
      { logo: SiEjs, t: "EJS" }
    ]
  }

];