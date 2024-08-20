import { RiJavascriptFill , RiNodejsLine, RiReactjsLine, RiJavaLine, RiHtml5Fill   } from "react-icons/ri";
import { SiExpress , SiMongodb, SiDocker,SiEjs , SiMysql, SiSocketdotio, SiCss3 , SiTypescript   } from "react-icons/si";
import { FiFigma } from "react-icons/fi";

const Technologies = () => {
  return (
    <div className="g technologies">
    <p>Technologies I have worked with</p>
    <div className="tech-icons">
      <div className="icon-row">
        <RiJavascriptFill size={25} color="yellow" />
        <SiTypescript size={25} color="blue"/>
        <RiNodejsLine size={25} color="green" />
        <SiExpress size={25} color="grey" />
      </div>
      <div className="icon-row">
        <RiReactjsLine size={25} color="rgb(0,225,255)" />
        <SiEjs size={25} color="green"/>
        <SiMongodb size={25} color="green" />
        <SiDocker size={25} color="rgb(0,239,255)" />
      </div>
      <div className="icon-row">
        <RiJavaLine size={25} color="red" />
        <SiMysql size={25} color="white" />
        <SiSocketdotio size={25} color="grey" />
      </div>
      <div className="icon-row">
        <RiHtml5Fill size={25} color="orange"/>
        <SiCss3 size={25} color="blue"/>
        <FiFigma size={25} color="white" />
      </div>
    </div>
  </div>
  )
}

export default Technologies
