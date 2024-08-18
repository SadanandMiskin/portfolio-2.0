import React from 'react'
import { RiLinkedinBoxFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri";
import { git, linkedin, X } from '../../functions/Onclicks';

const ResumeButton = () => {
  return (
    <>
    <div className='res'>
    {/* https://drive.google.com/file/d/1-Bld6VniO49O-gucQAx6mzrqBZ07-Rsu/view?usp=sharing */}
    <a href='https://drive.google.com/file/d/1-Bld6VniO49O-gucQAx6mzrqBZ07-Rsu/view?usp=sharing' target='_blank'><button className="button-61" role="button">Download Resume</button></a>
    
        {/* <div className='socials'>
            <RiLinkedinBoxFill size={0} />
            <RiGithubFill />
            <RiTwitterXFill />
        </div> */}
        </div>

       <div className='socials'>
            <RiLinkedinBoxFill size={30} className='so' onClick={linkedin}/>
            <RiGithubFill size={30} className='so' onClick={git}/>
            <RiTwitterXFill size={30} className='so' onClick={X}/>
        </div>
    </>
  )
}

export default ResumeButton
