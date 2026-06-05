import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const routes = ['projects', 'blogs', 'r'];

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [randomRoutes, setRandomRoutes] = useState('');

  useEffect(() => {
    setRandomRoutes(routes[Math.floor(Math.random() * routes.length)]);
  }, []);

  const handleNavigate = () => {
    navigate(`/${randomRoutes}`);
  };

  return (
    <section className="page-shell flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
      <p className="section-kicker">Not found</p>
      <h1 className="font-display text-7xl font-bold leading-none text-[#171514] sm:text-8xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-[#736d63]">
        This page is quiet because it does not exist. Maybe you meant{' '}
        <button onClick={handleNavigate} className="font-bold text-[#171514] underline underline-offset-4">
          {randomRoutes || 'projects'}
        </button>
        .
      </p>
      <Link to="/" className="quiet-button mt-7">
        Go home
      </Link>
    </section>
  );
};

export default NotFoundPage;
