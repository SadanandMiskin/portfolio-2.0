import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdMenu } from 'react-icons/md';
import { useState } from 'react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Work' },
  { path: '/blogs', label: 'Notes' },
  // { path: '/r', label: 'CV' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full px-4 py-3">
      <nav className="mx-auto flex max-w-[42rem] items-center justify-between border-b border-white/10 bg-[#0b0f0e]/90 px-1 py-2.5 backdrop-blur-xl">
        <Link to="/" className="font-display text-[13px] font-semibold tracking-tight text-stone-200" aria-label="Sadanand Miskin home">
          Sadanand Miskin
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
                      ? 'text-sky-300'
                      : 'text-[#929d97] hover:text-stone-100'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 pr-1">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="grid h-8 w-8 place-items-center rounded-md text-stone-400 transition-colors hover:text-sky-300 md:hidden"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <MdClose className="h-4 w-4" /> : <MdMenu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-30 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close navigation"
        />
        <aside
          className={`absolute right-4 top-16 w-[min(16rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-[#111716] p-2 shadow-xl backdrop-blur-xl transition duration-300 ${
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
                      ? 'text-sky-300'
                      : 'text-[#929d97] hover:bg-white/[0.04]'
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
