import { Link, useLocation } from 'react-router-dom';
import { MdModeNight, MdSunny } from 'react-icons/md';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleDark() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <header className="w-full bg-transparent py-3 ">
      <nav className='flex flex-col md:flex-row items-center justify-around max-w-7xl mx-auto px-4 text-md font-medium font-mono '>
        <div className='flex gap-4 items-center justify-start'>
        <ul className='flex items-center space-x-4 text-white '>
          <li className="flex hover:text-gray-300 dark:text-black cursor-pointer transition-colors duration-300">
            <button onClick={toggleDark}>
              {
                !isDarkMode ? <MdModeNight className='text-white h-max w-7' /> : <MdSunny className='h-max w-7'/>
              }
            </button>
          </li>
        </ul>
          <Link
            to="/"
            className={`text-xl font-bold text-white dark:text-black hover:text-gray-300 transition-colors duration-300 ${location.pathname === '/' ? 'font-extrabold' : ''}`}
          >
            SM
          </Link>
          <li className='dark:text-black flex justify-center items-center animate-pulse' style={{fontSize: '9px'}}>
            <p className='bg-green-500/70 rounded-lg py-1 px-2 text-black'>Open-to-Work</p>
          </li>
        </div>
        <div className="flex items-center space-x-6">
          <ul className='flex space-x-4 text-white'>
            <li className={`p-4 cursor-pointer dark:text-black hover:text-gray-300 transition-colors duration-300 underline ${location.pathname === '/projects' ? 'font-bold' : ''}`}>
              <Link to="/projects">Projects</Link>
            </li>
            <li className={`p-4 cursor-pointer dark:text-black hover:text-gray-300 transition-colors duration-300 underline ${location.pathname === '/blogs' ? 'font-bold' : ''}`}>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className={`p-4 cursor-pointer dark:text-black hover:text-gray-300 transition-colors duration-300 underline ${location.pathname === '/contact' ? 'font-bold' : ''}`}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
