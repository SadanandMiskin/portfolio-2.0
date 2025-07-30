import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const ar = ['projects', 'blogs', 'Contact'];
  const [randomRoutes, setRandomRoutes] = useState('');

  useEffect(() => {
    setRandomRoutes(ar[Math.floor(Math.random() * 3)]);
  }, []);

  const handleNavigate = () => {
    navigate(`/${randomRoutes}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-9xl font-bold dark:text-zinc-500 text-white mb-4 font-mono">404</h1>
      <h2 className="text-3xl font-bold dark:text-zinc-500 text-white mb-8">
        You mean{' '}
        <span className="underline text-cyan-600">
          <button onClick={handleNavigate} className='underline'>{randomRoutes}</button>
        </span>
        ?
      </h2>
      <Link to="/" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition duration-300 ease-in-out">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;