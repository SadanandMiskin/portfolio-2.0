import { CgArrowTopRight } from 'react-icons/cg';
// import { FaEye } from 'react-icons/fa';
import { FcDocument } from 'react-icons/fc';

const NameCard = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/sadanandmiskin",
    },
    {
      name: "GitHub",
      href: "https://github.com/SadanandMiskin",
    },
    {
      name: "Email",
      href: "mailto:miskinsadanand@gmail.com",
    }
  ];

  return (
    <div className="flex flex-col justify-center p-2">
      <div className="rounded-lg p-6 max-w-2xl w-full h-max text-white">
        {/* Name and Links */}
        <div className="flex justify-between md:flex-row flex-row animate-fade-up">
          <h1 className="text-4xl font-bold dark:text-black ">Sadanand Miskin</h1>
        </div>

        {/* Description */}
        <p className="text-gray-400 dark:text-gray-700 py-2 animate-fade-up animate-delay-100">
          Passionate about software, I have enthusiasm and work with dedication, Every opportunity fuels my excitement to create and achieve.
        </p>

        {/* Resume Button */}
        <a
          href="https://drive.google.com/file/d/1-GteVh_J6-NBk1cX51Dv0n2h53U-OSdl/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gradient-to-tl from-blue-500 to-purple-900 text-white font-semibold p-1 px-2 rounded-md flex gap-1 items-center animate-fade-up animate-delay-150">
            <FcDocument size={20} /> View Resume
          </button>
        </a>

        {/* Social Links */}
        <div className="flex gap-3 mt-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:bg-slate-200/50 rounded-xl px-2 py-1 hover:bg-gray-800/10 transition-colors duration-300 bg-slate-700/30 animate-fade-up animate-delay-250"
            >
              <span className="dark:text-black text-white  flex ">
                {link.name}
                <CgArrowTopRight size={20} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NameCard;