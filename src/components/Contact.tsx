import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiLoader4Line,
  RiMailLine,
  RiSendPlane2Fill,
  RiTwitterXFill,
} from 'react-icons/ri';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Contact = () => {
  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#c',
        start: 'top bottom',
        end: 'bottom bottom',
      },
    });

    timeline.fromTo(
      '#c',
      {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
      }
    );
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { icon: RiMailLine, name: 'Email', link: 'mailto:miskinsadanand@gmail.com' },
    { icon: RiGithubFill, name: 'GitHub', link: 'https://github.com/SadanandMiskin' },
    { icon: RiTwitterXFill, name: 'X', link: 'https://x.com/ISadanandMiskin' },
    { icon: RiLinkedinBoxFill, name: 'LinkedIn', link: 'https://linkedin.com/in/sadanandmiskin' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await axios.post('https://mail.sadanand.me/messageme', formData, {
        headers: { Authorization: 'Bearer sadanandbhai' },
      });

      if (response.data == true) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else if (response.data == 'unauthorized') {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Submission failed', error);
    }
  };

  return (
    <section ref={containerRef} className="section-block">
      <div id="c" className="w-full">
        <div className="mb-7 text-center">
          <p className="section-kicker">Contact</p>
          <h1 className="section-title">Let&apos;s build something clear</h1>
        </div>

        <div className="folio-panel grid gap-4 md:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <p className="text-xs leading-6 text-[#736d63]">
              Have an opportunity, collaboration, or project idea? Send a note and I will get back with a focused reply.
            </p>

            <a
              href="mailto:miskinsadanand@gmail.com"
              className="mt-4 inline-flex text-xs font-bold text-[#171514] underline decoration-[#171514]/20 underline-offset-4 hover:decoration-[#171514]"
            >
              miskinsadanand@gmail.com
            </a>

            <div className="mt-6 grid grid-cols-4 gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 place-items-center rounded-full border border-[#171514]/10 bg-[#fbfaf6]/55 text-base text-[#625c53] transition hover:border-[#171514]/25 hover:bg-[#fffdf8] hover:text-[#171514]"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </aside>

          <div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="field"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="field"
                />
              </div>

              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
                className="field h-32 resize-none"
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="quiet-button w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <RiLoader4Line className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    <RiSendPlane2Fill size={18} />
                    Send message
                  </>
                )}
              </button>
            </form>

            {status === 'success' && (
              <div className="mt-4 rounded-md border border-emerald-700/20 bg-emerald-100/55 p-3 text-center text-xs text-emerald-800 dark:text-emerald-800">
                Message sent successfully.
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 rounded-md border border-red-700/20 bg-red-100/55 p-3 text-center text-xs text-red-700 dark:text-red-700">
                Failed to send message. Please try again or contact me by email.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
