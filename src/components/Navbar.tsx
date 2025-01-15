import { Link, useLocation } from 'react-router-dom';
import { MdModeNight, MdSunny, MdMenu, MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
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

    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="w-full bg-transparent py-5 relative mb-6 text-sm">
      <nav className="max-w-2xl mx-auto px-4 font-medium ">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`text-xl font-bold text-white dark:text-black hover:text-gray-300 transition-colors duration-300 ${
                location.pathname === '/' ? 'font-extrabold' : ''
              }`}
            >
              0-SM
            </Link>
            <div className="dark:text-black flex justify-center items-center animate-pulse" style={{ fontSize: '9px' }}>
              <p className="bg-green-500/70 rounded-lg py-1 px-2 text-black">Open-to-Work</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-3 text-white">
              {navLinks.map((link) => (
                <Link to={link.path}>
                <li
                  key={link.path}
                  className={`px-2 py-1 cursor-pointer dark:text-black hover:text-gray-300 transition-colors duration-300 hover:dark:bg-slate-300/50 hover:rounded-md  ${
                    location.pathname === link.path ? 'dark:bg-slate-300/50 rounded-md bg-slate-600/50'  : ''
                  }`}
                >
                  {link.label}
                </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleDark}
              className="hover:text-gray-300 dark:text-black transition-colors duration-300"
            >
              {isDarkMode ? (
                <MdModeNight className="text-white h-6 w-6" />
              ) : (
                <MdSunny className="h-6 w-6" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="ml-4 p-2 md:hidden text-white dark:text-black hover:text-gray-300 transition-colors duration-300"
            >
              {isMenuOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full z-10">
            <ul className="bg-white/10 backdrop-blur-md dark:bg-black/10 rounded-lg mt-2 p-4 space-y-2 shadow-lg">
              {navLinks.map((link) => (
                <li
                  key={link.path}
                  className={`cursor-pointer text-white dark:text-black hover:text-gray-300 transition-colors duration-300 ${
                    location.pathname === link.path ? 'font-bold' : ''
                  }`}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block p-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;