

const Footer = () => {
  return (
    <footer className="max-w-4xl w-full mx-auto py-4 text-center text-sm text-gray-600 dark:text-gray-400">
      <hr className="mb-3 border-gray-300 dark:border-gray-600" />
      <p className='dark:text-amber-800 text-amber-500'>
        Made with <span className="text-red-500">❤️</span> by Sadanand Miskin
      </p>
      <p className="mt-1 text-white dark:text-black">
        © {new Date().getFullYear()} Sadanand Miskin. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
