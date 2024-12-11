import {  FaEye, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import {  MdLocationCity, MdMailOutline } from 'react-icons/md';


const NameCard = () => {
  return (
    <div className="flex flex-col justify-center p-2">
      <img
        src='/s.jpg'
        className='w-32 rounded-full mb-4 border-solid border-x-2 border-gray-300'

      />
      <div className="border rounded-lg border-gray-500 shadow-lg p-6 max-w-3xl w-full h-max text-white ">
        {/* Name and Links */}
        <div className="flex  justify-between i md:flex-row flex-rpw">
          <h1 className="text-4xl font-bold dark:text-black">Sadanand Miskin</h1>
          <div className="flex gap-2">
            <div className='w-max h-max border-solid border-2 border-gray-900 rounded-lg p-1' >
            <a
              href="https://linkedin.com/in/sadanandmiskin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 "
            >
              <FaLinkedinIn  className='h-6 w-6 dark:text-black'/>
              {/* <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="h-6 w-6"
              /> */}
            </a>
            </div>
            <div className='w-max h-max border-solid border-2 border-gray-900 rounded-lg p-1' >

            <a
              href="https://github.com/SadanandMiskin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              {/* <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="h-6 w-6"
              /> */}
              <FaGithub className='h-6 w-6 dark:text-black'/>

            </a>
            </div>
            <div className='w-max h-max border-solid border-2 border-gray-900 rounded-lg p-1' >

            <a
              href="mailto:miskinsadanand@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              {/* <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="h-6 w-6"
              /> */}
              <MdMailOutline className='h-6 w-6 dark:text-black'/>

            </a>
            </div>
          </div>
        </div>

        {/* Location */}
        <p className="mt-2 dark:text-gray-700 text-gray-400 text-lg flex items-center gap-1"><MdLocationCity />Full Stack Dev.</p>

        {/* Description */}
        <p className="text-gray-400 dark:text-gray-700 py-2">
        I have a strong passion for software technologies and am dedicated to pushing projects to completion with enthusiasm and perseverance, I'm excited for any opportunity I get, hopp in with excitement.
        </p>
      <a href='
        https://drive.google.com/file/d/1-GteVh_J6-NBk1cX51Dv0n2h53U-OSdl/view?usp=sharing' target='_blank'>
      <button className='bg-gradient-to-r from-red-500 to-orange-500  text-white font-semibold  p-1 px-2 rounded-md flex gap-2 items-center'>
            <FaEye />  View Resume
        </button>
      </a>
      </div>
    </div>
  );
};

export default NameCard;
