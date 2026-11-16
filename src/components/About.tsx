import { Link } from 'react-router-dom';
import { MdArrowOutward, MdEmail } from 'react-icons/md';

const focusAreas = [
  { number: '01', title: 'Understand the issue', text: 'Gather the right context, read the symptoms, and narrow down where connectivity breaks.' },
  { number: '02', title: 'Troubleshoot with intent', text: 'Work through network behavior step by step and communicate findings in plain language.' },
  { number: '03', title: 'Restore confidence', text: 'Help customers get back to a stable connection and know what to expect next.' },
];

const About = () => (
  <section className="page-shell min-h-screen py-12 sm:py-16">
    <div className="mb-12 max-w-2xl">
      <p className="section-kicker">A little context</p>
      <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">About me<span className="text-sky-300">.</span></h1>
      <p className="mt-6 text-sm leading-7 text-stone-400 sm:text-base">
        I&apos;m Sadanand, a Meraki Network Support Engineer based in Bengaluru. I enjoy untangling network problems, helping people stay connected, and making technical support feel clear and human.
      </p>
    </div>

    <div className="section-block">
      <p className="section-kicker">How I work</p>
      <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {focusAreas.map((item) => (
          <article key={item.number} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr] sm:gap-4">
            <span className="font-code pt-0.5 text-[10px] text-sky-300/70">{item.number}</span>
            <div><h2 className="text-sm font-semibold text-stone-100">{item.title}</h2><p className="mt-1.5 text-[13px] leading-6 text-stone-400">{item.text}</p></div>
          </article>
        ))}
      </div>
    </div>

    <div className="section-block">
      <div className="folio-panel flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div><p className="section-kicker">Say hello</p><h2 className="mt-1 text-lg font-semibold text-white">Let&apos;s talk networks.</h2><p className="mt-1 text-sm text-stone-400">For a role, a question, or just a good conversation.</p></div>
        <a href="mailto:miskinsadanand@gmail.com" className="quiet-button"><MdEmail size={15} /> Get in touch <MdArrowOutward size={14} /></a>
      </div>
      <Link to="/" className="mt-5 inline-flex text-xs font-medium text-stone-500 transition hover:text-sky-200">← Back home</Link>
    </div>
  </section>
);

export default About;
