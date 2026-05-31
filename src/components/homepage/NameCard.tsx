import { FaGithub } from 'react-icons/fa';
import {  FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
// import { driveLink } from '../../data/resume';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const NameCard = () => {
  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .from('.hero-shell', {
        y: 18,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
      })
      .from(
        '.hero-item',
        {
          y: 14,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.5,
          stagger: 0.05,
        },
        '-=0.25'
      )
      .from(
        '.hero-photo',
        {
          y: 14,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.5,
          stagger: 0.05,
        },
        '-=0.42'
      );
  });

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/sadanandmiskin', icon: FaLinkedin },
    { name: 'GitHub', href: 'https://github.com/SadanandMiskin', icon: FaGithub },
    { name: 'Email', href: 'mailto:miskinsadanand@gmail.com', icon: MdEmail },
    // { name: 'Resume', href: driveLink, icon: FaFileArrowDown },
  ];

  return (
    <section className="w-full pb-7 pt-3 sm:pb-8 sm:pt-5">
      <div className="hero-shell rounded-[28px] border border-[#171514]/10 bg-[#fbfaf6]/85 p-3 shadow-[0_22px_80px_rgba(23,21,20,0.07)]">
        <div className="grid gap-3 md:grid-cols-[1fr_10rem] md:items-stretch">
          <div className="flex flex-col justify-between rounded-[22px] border border-[#171514]/10 bg-[#f6f4ee]/85 p-4 sm:p-5">
            <div>
              <div className="hero-item mb-5 flex flex-wrap items-center gap-2">
                <span className="font-code rounded-full border border-[#171514]/10 bg-[#fbfaf6]/85 px-2.5 py-1 text-[10px] font-semibold text-[#827b70]">
                  BLR / INDIA
                </span>
                <span className="font-code rounded-full bg-[#e9edf8] px-2.5 py-1 text-[10px] font-semibold text-[#415477]">
                  CISCO SYSTEMS
                </span>
              </div>

              <p className="hero-item section-kicker">Technical Consulting Engineer</p>
              <h1 className="hero-item font-display max-w-xl text-[2.45rem] font-bold leading-[0.95] text-[#171514] sm:text-[3.75rem]">
                Hey - I&apos;m Sadanand.
              </h1>

              <div className="hero-item mt-4 max-w-lg space-y-3 text-[13px] leading-6 text-[#686158]">
                <p>
                  A tinkerer who enjoys building things end-to-end, from how data moves across networks to how it feels on a user screen.
                </p>
                <p>
                  My journey started with curiosity about the internet: packets, systems, and how everything connects. That led me through networking, CCNA, cloud, and eventually full-stack development.
                </p>
                <p>
                  Now I build scalable apps backed by solid fundamentals: clean APIs, thoughtful UIs, and systems that make sense under the hood.
                </p>
              </div>
            </div>

            <div className="hero-item mt-6 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip bg-[#fbfaf6]/90"
                >
                  <link.icon size={13} />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* <aside className="flex items-start justify-center rounded-[22px] border border-[#171514]/10 bg-[#efe7d7]/80 p-4 md:items-center">
            <div className="hero-photo aspect-square w-32 overflow-hidden rounded-full border border-[#171514]/10 bg-[#fbfaf6] p-1.5 sm:w-36 md:w-full md:max-w-[8.75rem]">
              <img
                src="/about/b.webp"
                alt="Sadanand Miskin"
                className="h-full w-full rounded-full object-cover object-center grayscale-[5%] transition duration-500 hover:scale-[1.015] hover:grayscale-0"
              />
            </div>
          </aside> */}
          <aside className="overflow-hidden rounded-[22px] border border-[#171514]/10">
  <img
    src="/about/b.webp"
    alt="Sadanand Miskin"
    className="h-full w-full object-cover object-center grayscale-[5%] transition duration-500 hover:scale-[1.015] hover:grayscale-0"
  />
</aside>
        </div>
      </div>
    </section>
  );
};

export default NameCard;
