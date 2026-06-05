import { useState, useRef, useCallback, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ─── Types ───────────────────────────────────────────────────────────────────
// import { useState, useRef, useCallback, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type OptionKey = string;
type QuizState = 'idle' | 'correct' | 'wrong';

interface Question {
  id: number;
  prompt: string;
  correct: OptionKey;
  options: { key: OptionKey; label: string; icon: string }[];
  devices: string[];
  servers: string[];
  serverLabel?: string;
}

// ─── Question Bank ────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'Even distribution across servers?',
    correct: 'LB',
    options: [
      { key: 'LB',  label: 'Load Balancer', icon: '⚖️' },
      { key: 'API', label: 'API Gateway',   icon: '🔀' },
      { key: 'FW',  label: 'Firewall',      icon: '🛡️' },
    ],
    devices: ['💻', '📱', '🖥️', '⌚', '🤖', '📡'],
    servers: ['🗄️', '🗄️', '🗄️'],
    serverLabel: 'APP',
  },
  {
    id: 2,
    prompt: 'Cache repeated DB reads?',
    correct: 'CACHE',
    options: [
      { key: 'CACHE', label: 'Cache Layer',  icon: '⚡' },
      { key: 'CDN',   label: 'CDN',          icon: '🌐' },
      { key: 'QUEUE', label: 'Message Queue',icon: '📨' },
    ],
    devices: ['💻', '📱', '🖥️', '🤖', '📡'],
    servers: ['🗄️', '🗄️'],
    serverLabel: 'DB',
  },
  {
    id: 3,
    prompt: 'Auth & rate-limit all requests?',
    correct: 'API',
    options: [
      { key: 'LB',  label: 'Load Balancer', icon: '⚖️' },
      { key: 'API', label: 'API Gateway',   icon: '🔀' },
      { key: 'CDN', label: 'CDN',           icon: '🌐' },
    ],
    devices: ['💻', '📱', '🖥️', '⌚', '🤖'],
    servers: ['🗄️', '🗄️', '🗄️'],
    serverLabel: 'SVC',
  },
  {
    id: 4,
    prompt: 'Serve static assets fast globally?',
    correct: 'CDN',
    options: [
      { key: 'LB',   label: 'Load Balancer', icon: '⚖️' },
      { key: 'CDN',  label: 'CDN',           icon: '🌐' },
      { key: 'CACHE',label: 'Cache Layer',   icon: '⚡' },
    ],
    devices: ['💻', '📱', '🖥️', '⌚'],
    servers: ['🗄️', '🗄️', '🗄️', '🗄️'],
    serverLabel: 'EDGE',
  },
  {
    id: 5,
    prompt: 'Decouple async job processing?',
    correct: 'QUEUE',
    options: [
      { key: 'LB',    label: 'Load Balancer',  icon: '⚖️' },
      { key: 'QUEUE', label: 'Message Queue',  icon: '📨' },
      { key: 'API',   label: 'API Gateway',    icon: '🔀' },
    ],
    devices: ['💻', '📱', '🖥️', '🤖', '📡'],
    servers: ['🗄️', '🗄️'],
    serverLabel: 'WORKER',
  },
  {
    id: 6,
    prompt: 'Block malicious traffic at edge?',
    correct: 'FW',
    options: [
      { key: 'FW',  label: 'Firewall',      icon: '🛡️' },
      { key: 'LB',  label: 'Load Balancer', icon: '⚖️' },
      { key: 'CDN', label: 'CDN',           icon: '🌐' },
    ],
    devices: ['💻', '📱', '🖥️', '⌚', '🤖', '📡'],
    servers: ['🗄️', '🗄️', '🗄️'],
    serverLabel: 'APP',
  },
];

function pickRandom<T>(arr: T[], exclude?: T): T {
  const pool = exclude !== undefined ? arr.filter((x) => x !== exclude) : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─── Quiz Card ────────────────────────────────────────────────────────────────

 function SystemDesignQuiz() {
  const [currentQ, setCurrentQ] = useState<Question>(() => pickRandom(QUESTIONS));
  const [answered, setAnswered]   = useState<OptionKey | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [score, setScore]   = useState(0);
  const [attempts, setAttempts] = useState(0);
  const draggingRef = useRef<OptionKey | null>(null);

  const networkRef = useRef<HTMLDivElement>(null);
  const dropRef    = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const serversRef = useRef<HTMLDivElement>(null);
  const topSvgRef  = useRef<SVGSVGElement>(null);
  const botSvgRef  = useRef<SVGSVGElement>(null);

  const state: QuizState =
    answered === null ? 'idle' : answered === currentQ.correct ? 'correct' : 'wrong';

  const clearLines = useCallback(() => {
    if (topSvgRef.current) topSvgRef.current.innerHTML = '';
    if (botSvgRef.current) botSvgRef.current.innerHTML = '';
  }, []);

  const drawLines = useCallback((st: 'correct' | 'wrong') => {
    const na     = networkRef.current;
    const dz     = dropRef.current;
    const devRow = devicesRef.current;
    const srvRow = serversRef.current;
    const topSvg = topSvgRef.current;
    const botSvg = botSvgRef.current;
    if (!na || !dz || !devRow || !srvRow || !topSvg || !botSvg) return;

    const naRect  = na.getBoundingClientRect();
    const dzRect  = dz.getBoundingClientRect();
    const dzCX    = dzRect.left + dzRect.width / 2 - naRect.left;

    // Light-mode palette strokes
    const lineColor = st === 'correct' ? 'rgba(74,144,88,0.35)'  : 'rgba(192,72,72,0.3)';
    const dashColor = st === 'correct' ? 'rgba(160,118,20,0.45)' : 'rgba(192,72,72,0.3)';

    const topH = topSvg.getBoundingClientRect().height || 36;
    const botH = botSvg.getBoundingClientRect().height || 36;

    let top = '';
    devRow.querySelectorAll<HTMLElement>('.q-device').forEach((el) => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - naRect.left;
      top += `<line x1="${cx}" y1="0" x2="${dzCX}" y2="${topH}" stroke="${lineColor}" stroke-width="1.5" stroke-dasharray="4 5"/>`;
    });
    topSvg.innerHTML = top;

    let bot = '';
    srvRow.querySelectorAll<HTMLElement>('.q-server').forEach((el) => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - naRect.left;
      bot += `<line x1="${dzCX}" y1="0" x2="${cx}" y2="${botH}" stroke="${dashColor}" stroke-width="1.5" stroke-dasharray="4 5"/>`;
    });
    botSvg.innerHTML = bot;
  }, []);

  const submitAnswer = useCallback(
    (val: OptionKey) => {
      if (answered !== null) return;
      setAnswered(val);
      setAttempts((a) => a + 1);
      if (val === currentQ.correct) setScore((s) => s + 1);
      setTimeout(() => drawLines(val === currentQ.correct ? 'correct' : 'wrong'), 40);
    },
    [answered, currentQ.correct, drawLines]
  );

  const next = useCallback(() => {
    setAnswered(null);
    setIsDragOver(false);
    draggingRef.current = null;
    clearLines();
    setCurrentQ((prev) => pickRandom(QUESTIONS, prev));
  }, [clearLines]);

  const handleDragStart = (e: React.DragEvent, key: OptionKey) => {
    draggingRef.current = key;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggingRef.current && answered === null) submitAnswer(draggingRef.current);
    draggingRef.current = null;
  };

  useEffect(() => {
    const onDragEnd = () => { draggingRef.current = null; };
    window.addEventListener('dragend', onDragEnd);
    return () => window.removeEventListener('dragend', onDragEnd);
  }, []);

  const placedOpt = currentQ.options.find((o) => o.key === answered);

  // ── Progress dots ──────────────────────────────────────────────────────────
  const totalQ = QUESTIONS.length;
  const qIndex = QUESTIONS.findIndex((q) => q.id === currentQ.id);

  return (
    <div
      className="hero-item flex flex-1 flex-col overflow-hidden rounded-[22px] border border-[#171514]/10 bg-[#f0ede6] p-3 text-[#171514]"
    >
      {/* ── Header ── */}
      <div className="mb-2 flex items-center justify-between">
        <p className="font-display text-[13px] font-bold leading-tight text-[#171514]">
          System Design Quiz
        </p>
        {attempts > 0 && (
          <span className="font-code rounded-full border border-[#171514]/12 bg-[#fbfaf6] px-2 py-0.5 text-[9px] font-bold text-[#686158]">
            {score}/{attempts}
          </span>
        )}
      </div>

      {/* ── Progress dots ── */}
      <div className="mb-2 flex items-center gap-1">
        {QUESTIONS.map((q, i) => (
          <span
            key={q.id}
            className={[
              'h-1 rounded-full transition-all duration-300',
              i === qIndex
                ? 'w-4 bg-[#415477]'
                : 'w-1.5 bg-[#171514]/15',
            ].join(' ')}
          />
        ))}
        <span className="font-code ml-auto text-[9px] text-[#827b70]">
          {qIndex + 1}/{totalQ}
        </span>
      </div>

      {/* ── Question ── */}
      <p className="font-code mb-2.5 border-l-2 border-[#415477] pl-2 text-[10px] font-bold leading-snug text-[#415477]">
        {currentQ.prompt}
      </p>

      {/* ── Network diagram ── */}
      <div
        ref={networkRef}
        className="relative flex-1 rounded-[14px] border border-[#171514]/8 bg-[#fbfaf6]/70 px-2 py-2"
      >
        {/* Devices */}
        <div ref={devicesRef} className="flex justify-around">
          {currentQ.devices.map((icon, i) => (
            <div key={i} className="q-device flex flex-col items-center">
              <div className="grid h-6 w-6 place-items-center rounded-[6px] border border-[#171514]/10 bg-white text-[11px] shadow-sm">
                {icon}
              </div>
            </div>
          ))}
        </div>

        {/* Lines: devices → drop zone */}
        <svg
          ref={topSvgRef}
          className="pointer-events-none block w-full"
          style={{ height: 32, marginBottom: -4 }}
          aria-hidden="true"
        />

        {/* Drop zone */}
        <div className="flex justify-center py-0.5">
          <div
            ref={dropRef}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={[
              'relative flex h-10 w-[148px] cursor-pointer items-center justify-center rounded-[10px] border-2 transition-all duration-200',
              answered === null && isDragOver
                ? 'border-[#415477] bg-[#415477]/10 border-solid'
                : state === 'correct'
                ? 'border-[#4a9058] bg-[#4a9058]/10 border-solid'
                : state === 'wrong'
                ? 'border-[#c04848] bg-[#c04848]/10 border-solid'
                : 'border-dashed border-[#171514]/20 bg-white/40',
            ].join(' ')}
          >
            {answered === null ? (
              <span className="font-code text-[9px] font-semibold uppercase tracking-widest text-[#827b70]">
                {isDragOver ? 'Release' : 'Drop / Tap'}
              </span>
            ) : (
              <span
                className={`font-code flex items-center gap-1 text-[10px] font-bold ${
                  state === 'correct' ? 'text-[#4a9058]' : 'text-[#c04848]'
                }`}
              >
                {state === 'correct' ? '✓' : '✗'} {placedOpt?.icon}{' '}
                {placedOpt?.label}
              </span>
            )}
          </div>
        </div>

        {/* Lines: drop zone → servers */}
        <svg
          ref={botSvgRef}
          className="pointer-events-none block w-full"
          style={{ height: 32, marginTop: -4 }}
          aria-hidden="true"
        />

        {/* Servers */}
        <div ref={serversRef} className="flex justify-around px-4">
          {currentQ.servers.map((icon, i) => (
            <div key={i} className="q-server flex flex-col items-center gap-0.5">
              <div className="grid h-6 w-6 place-items-center rounded-[6px] border border-[#171514]/10 bg-white text-[11px] shadow-sm">
                {icon}
              </div>
              <span className="font-code text-[7px] font-semibold uppercase tracking-wider text-[#827b70]">
                {currentQ.serverLabel ?? 'S'}{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Option chips ── */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {currentQ.options.map((opt) => (
          <div
            key={opt.key}
            draggable={answered === null}
            onDragStart={(e) => handleDragStart(e, opt.key)}
            onClick={() => submitAnswer(opt.key)}
            className={[
              'font-code flex cursor-grab select-none items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide transition-all duration-150 active:scale-95',
              answered !== null
                ? opt.key === currentQ.correct
                  ? 'border-[#4a9058]/30 bg-[#4a9058]/8 text-[#4a9058]'   // highlight correct after answer
                  : 'pointer-events-none border-[#171514]/8 text-[#171514]/25'
                : 'border-[#171514]/12 bg-white text-[#171514] hover:border-[#415477]/40 hover:bg-[#e9edf8] hover:text-[#415477]',
            ].join(' ')}
          >
            {opt.icon} {opt.label}
          </div>
        ))}
      </div>

      {/* ── Feedback + Next ── */}
      {answered !== null && (
        <div className="mt-2 flex items-center justify-between">
          <p className={`font-code text-[9px] font-semibold ${state === 'correct' ? 'text-[#4a9058]' : 'text-[#c04848]'}`}>
            {state === 'correct' ? '✓ Correct!' : '✗ Not quite.'}
          </p>
          <button
            onClick={next}
            className="font-code rounded-full border border-[#171514]/12 bg-white px-3 py-1 text-[10px] font-semibold text-[#415477] transition-all hover:border-[#415477]/40 hover:bg-[#e9edf8]"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── NameCard ─────────────────────────────────────────────────────────────────

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
  ];

  return (
    <section className="w-full pb-7 pt-3 sm:pb-8 sm:pt-5">
      <div className="hero-shell rounded-[28px] border border-[#171514]/10 bg-[#fbfaf6]/85 p-3 shadow-[0_22px_80px_rgba(23,21,20,0.07)]">
        <div className="grid gap-3 md:grid-cols-[1fr_12rem] md:items-stretch">

          {/* ── Left: bio ── */}
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
                  A tinkerer who enjoys building things end-to-end, from how data
                  moves across networks to how it feels on a user screen.
                </p>
                <p>
                  My journey started with curiosity about the internet: packets,
                  systems, and how everything connects. That led me through
                  networking, CCNA, cloud, and eventually full-stack development.
                </p>
                <p>
                  Now I build scalable apps backed by solid fundamentals: clean
                  APIs, thoughtful UIs, and systems that make sense under the hood.
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

          {/* ── Right: photo + quiz card ── */}
          <aside className="mx-auto flex w-full max-w-[18rem] flex-col gap-3 md:mx-0 md:max-w-none">
            {/* Photo */}
            <div className="hero-photo aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-[#171514]/10">
              <img
                src="/about/b.jpg"
                alt="Sadanand Miskin"
                className="h-full w-full object-cover object-center grayscale-[5%] transition duration-500 hover:scale-[1.015] hover:grayscale-0"
              />
            </div>

            {/* Quiz replaces router/switch card */}
            <SystemDesignQuiz />
          </aside>

        </div>
      </div>
    </section>
  );
};

export default NameCard;