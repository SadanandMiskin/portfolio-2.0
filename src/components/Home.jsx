import { About } from "./GridComponents/About"
import Education from "./GridComponents/Education"
import Experience from "./GridComponents/Experience"
import Image from "./GridComponents/Image"
import Logo from "./GridComponents/Logo"
import Quote from "./GridComponents/Quote"
import ResumeButton from "./GridComponents/ResumeButton"
import Technologies from "./GridComponents/Technologies"
import Title from "./GridComponents/Title"

const Home = () => {
  return (
    <>
   
    
    <div className='main'>
      
      <div className="grid">
      <ResumeButton />
       <About />
       <Image />
       <Title />
       <Logo />
       <Quote />
       <Technologies />
       <Experience />
      <Education />
       
      
        
      </div>

    </div>
    </>
  )
}

export default Home
