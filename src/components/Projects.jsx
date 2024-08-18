import React, { useEffect, useState } from 'react'
import '../assets/Project.css' // We'll create this file for styles
import empIm from '../assets/Photos/emp.webp'
import hive from '../assets/Photos/hive.webp'
import gitc from '../assets/Photos/gitc.webp'
import taskify from '../assets/Photos/taskify.webp'
import { RiGithubFill } from "react-icons/ri";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";


const Project = ({ title, description, imageUrl, technologies = [], index , githubLink, liveLink}) => {
    return (
        <div 
            className='project-card project-card-delay' 
            style={{ animationDelay: `${index * 0.2}s` }}
        >
            <div className='project-image'>
                <img src={imageUrl} alt={title} />
            </div>
            <div className='project-info'>
                <h3>{title}</h3>
                <p>{description}</p>
                {/* <div className='project-tech'>
                    {technologies.map((tech, index) => (
                        <span key={index} className='tech-tag'>{tech}</span>
                    ))}
                </div> */}
                <div className='project-links'>
                    <a href={githubLink} target='_blank' className='project-link'><RiGithubFill size={40} />
                    </a>
                    {liveLink!=null ? 
                    <a href={liveLink} target='_blank' className='project-link'><HiOutlineArrowTopRightOnSquare size={40}/>
</a> 
                    :
                    <></>    
                }
                </div>
            </div>
        </div>
    )
}

const Projects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setProjects([
            { 
                title: "HiveDeal", 
                description: "Collaborated on the development of an e-commerce website having Buyer, Admin privileges with Authencation. Adding functionalities like easy cart creation, adding, and removing items with a seamless checkout journey.", 
                githubLink: "https://github.com/SadanandMiskin/HiveDeal",
                liveLink: "https://e-comm-fe.vercel.app/",
                imageUrl: hive, 
                technologies: ["Vue.js", "Express", "PostgreSQL"]
            },
            { 
                title: "Taskify", 
                description: "A full-stack Todo application that allows users to manage their tasks with features like authentication, Google sign-in, and CRUD operations.", 
                githubLink: "https://github.com/SadanandMiskin/Taskify",
                liveLink: "",
                imageUrl: taskify, 
                technologies: ["Vue.js", "Express", "PostgreSQL"]
            },
            { 
                title: "EmpVerify", 
                description: "Web3 application for streamlined HR verification processes, ensuring transparency and tamper-proofing. Integrated IPFS for decentralized data storage, resulting in increase in data retrieval efficiency.", 
                imageUrl: empIm ,
                githubLink: "https://github.com/sadanandmiskin/empverify",
                liveLink: null,
                technologies: ["Solidity", "Node.js", "MongoDB", "EJS"]
            },
            
            { 
                title: "GitCrawler", 
                description: "Watches new issues for any repository user provides and notifies via email", 
                githubLink: "https://github.com/SadanandMiskin/GitCrawler",
                imageUrl: gitc, 
                technologies: ["Vue.js", "Express", "PostgreSQL"]
            },
        ])

        // Start animations after a short delay
        setTimeout(() => {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.animationPlayState = 'running';
            });
        }, 150);
    }, [])

    return (
        <div className="projects-container">
            <h1>Selected Work</h1>
            {projects.map((project, index) => (
                <Project key={index} {...project} index={index} />
            ))}
        </div>
    )
}

export default Projects