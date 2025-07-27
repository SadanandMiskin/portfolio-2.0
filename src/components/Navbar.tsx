import { Link, useLocation } from 'react-router-dom';
import { MdModeNight, MdSunny, MdMenu, MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleDark() {
    setIsDarkMode(!isDarkMode);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Project' },
    { path: '/blogs', label: 'Blogs'},
    // { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="w-full bg-transparent py-1 relative mb-6 text-sm mt-4">
      <nav className="max-w-3xl mx-auto px-4 font-medium">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`text-xl font-bold text-white dark:text-black hover:text-gray-300 transition-colors duration-300 ${
                location.pathname === '/' ? 'font-extrabold' : ''
              }`}
            >
              <div className='w-6 h-6'>
                <h3>SM</h3>
              </div>
            </Link>
            <div className="text-white dark:text-black flex justify-center items-center animate-pulse" style={{ fontSize: '9px' }}>
              <p className="bg-green-500/70 rounded-lg px-2 text-black">Open-to-Work</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-3 text-white">
              {navLinks.map((link) => (
                <Link to={link.path} key={link.path}>
                  <li
                    className={`px-2 py-1 cursor-pointer dark:text-black hover:text-gray-300 transition-colors duration-300 hover:dark:bg-slate-300/50 hover:rounded-md ${
                      location.pathname === link.path ? 'dark:bg-slate-300/50 rounded-md bg-slate-600/50' : ''
                    }`}
                  >
                    {link.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* <a href='https://cal.com/sadanandmiskin' target='_blank' rel='noopener noreferrer'>
              <button className="relative ml-2 px-4 py-2 text-white dark:text-black font-semibold rounded-md overflow-hidden group border-2 border-yellow-500 hover:bg-gray-500/50 dark:hover:bg-gray-400/50 transition duration-300">
                <span className="absolute inset-0 w-full h-full rounded-md animate-spin-slow bg-gradient-to-r from-gray-500 via-black-500 to-zinc-500 opacity-30 blur-sm"></span>
                <span className="relative z-10">Get on Call</span>
              </button>
            </a> */}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="hover:text-gray-300 text-white dark:text-black transition-colors duration-300"
            >
              {isDarkMode ? (
                <MdSunny className="h-6 w-6" />
              ) : (
                <MdModeNight className="h-6 w-6" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="p-2 md:hidden text-white dark:text-black hover:text-gray-300 transition-all duration-300 relative z-50"
            >
              {isMenuOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] dark:bg-white/50 bg-zinc-900/50 backdrop-blur-md  shadow-xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

            {/* Navigation Links */}
            <div className="pt-20 px-6">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg font-medium py-2 transition-colors duration-200 ${
                        location.pathname === link.path
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-300 dark:text-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;