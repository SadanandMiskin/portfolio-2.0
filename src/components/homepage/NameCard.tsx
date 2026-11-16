import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/sadanandmiskin', icon: FaLinkedin },
  { name: 'GitHub', href: 'https://github.com/SadanandMiskin', icon: FaGithub },
  { name: 'Email', href: 'mailto:miskinsadanand@gmail.com', icon: MdEmail },
];

const NameCard = () => {
  useGSAP(() => {
    gsap.from('.hero-copy, .hero-photo', {
      y: 12,
      opacity: 0,
      duration: 0.55,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });

  return (
    <section className="w-full pb-7 pt-3 sm:pb-8 sm:pt-5">
      <div className="grid items-center gap-7 border-b border-white/10 pb-8 sm:grid-cols-[minmax(0,1fr)_12rem] sm:gap-9 sm:pb-10">
        <div className="hero-copy order-2 sm:order-1">
          <p className="section-kicker mb-3 text-sky-300">Meraki Network Support Engineer</p>
          <h1 className="font-display text-[2.65rem] font-medium leading-[1.02] tracking-[-0.05em] text-stone-100 sm:text-[3.4rem]">
            Hi, I&apos;m Sadanand<span className="text-sky-300">.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-stone-400">
            I work in network support at Cisco Meraki, helping customers troubleshoot connectivity and keep their networks running smoothly.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-200 transition-colors hover:text-sky-300">
              More about me <span aria-hidden="true">↗</span>
            </Link>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="text-stone-500 transition-colors hover:text-sky-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-photo order-1 mx-auto w-full max-w-[13rem] sm:order-2 sm:max-w-none">
          <img
            src="/about/b.jpg"
            alt="Sadanand Miskin"
            className="aspect-[4/5] w-full rounded-xl object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default NameCard;
