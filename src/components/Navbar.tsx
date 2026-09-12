import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Work' },
  { path: '/blogs', label: 'Notes' },
  // { path: '/r', label: 'CV' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full px-4 py-3">
      <nav className="mx-auto flex max-w-[42rem] items-center justify-between rounded-full border border-[#171514]/10 bg-[#f6f4ee]/90 px-2 py-2 shadow-[0_12px_40px_rgba(23,21,20,0.06)] backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2.5 pl-1" aria-label="Sadanand Miskin home">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#171514] text-[10px] font-black text-[#fbfaf6]">
            SM
          </span>
          <span className="font-code hidden text-[11px] font-semibold text-[#524c45] sm:block">
            sadanand.me
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition duration-200 ${
                    isActive
                      ? 'bg-[#171514] text-[#fbfaf6]'
                      : 'text-[#716a60] hover:bg-[#fbfaf6] hover:text-[#171514]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 pr-1">
          <span className="hidden rounded-full border border-[#171514]/10 bg-[#fbfaf6]/65 px-2.5 py-1 text-[10px] font-bold text-[#5c8b63] sm:inline-flex">
            available
          </span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="grid h-7 w-7 place-items-center rounded-full border border-[#171514]/10 bg-[#fbfaf6]/65 text-[#524c45] transition hover:bg-[#fffdf8] md:hidden"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <MdClose className="h-4 w-4" /> : <MdMenu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-30 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button
          className={`absolute inset-0 bg-[#171514]/25 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close navigation"
        />
        <aside
          className={`absolute right-4 top-16 w-[min(16rem,calc(100vw-2rem))] rounded-[18px] border border-[#171514]/10 bg-[#f6f4ee]/96 p-2 shadow-xl backdrop-blur-xl transition duration-300 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-full px-3 py-2 text-[11px] font-bold transition ${
                    location.pathname === link.path
                      ? 'bg-[#171514] text-[#fbfaf6]'
                      : 'text-[#716a60] hover:bg-[#fbfaf6]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
