import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type ExperienceItem = {
  company: string;
  role: string;
  duration?: string;
  logo?: string;
  mark?: string;
  highlights: string[];
};

const experiences: ExperienceItem[] = [
  {
    company: "Cisco Meraki",
    role: "Meraki Network Support Engineer",
    duration: "Present",
    logo: "/cisco.svg",
    highlights: [
      "Support customers with troubleshooting across Meraki network environments.",
      "Investigate connectivity issues and help identify practical paths to resolution.",
      "Keep communication clear and customer focused throughout the support process.",
    ],
  },
  {
    company: "Cisco Systems",
    role: "Technical Consulting Trainee",
    logo: "/cisco.svg",
    highlights: [
      "Supported enterprise customers by investigating network incidents and connectivity issues.",
      "Used TCP/IP, ARP, and MAC learning analysis to troubleshoot Layer 2 and Layer 3 behavior.",
      "Worked with Cisco ACI concepts including tenants, bridge domains, and contracts.",
    ],
  },
  {
    company: "ICICI Prudential AMC",
    role: "Full Stack Developer Intern",
    duration: "Jun - July 2024",
    logo: "/ICIPR.webp",
    highlights: ["Built full-stack app surfaces with React, Node.js, and MySQL."],
  },
  {
    company: "Compsoft Technologies Pvt Ltd",
    role: "Full Stack Web Developer Intern",
    duration: "Oct - Nov 2022",
    logo: "c.webp",
    highlights: ["Developed responsive web apps across React, Node.js, and MongoDB."],
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <section
      className={`section-block transition duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <div className="mb-4">
        <p className="section-kicker">Experience</p>
        <h2 className="section-title">Where I worked</h2>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {experiences.map((exp, index) => (
          <article
            key={`${exp.company}-${exp.role}`}
            className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[auto_1fr_auto] sm:items-start"
            style={{
              transitionDelay: `${index * 90}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            }}
          >
            <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[#edf1ef]/10 bg-[#111716]">
              {exp.logo ? (
                <img src={exp.logo} alt={`${exp.company} logo`} className="h-7 w-7 object-contain" />
              ) : (
                <span className="font-code text-[10px] font-black text-[#415477]">{exp.mark}</span>
              )}
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-[#edf1ef]">{exp.role}</h3>
              <p className="mt-1 text-[12px] font-semibold text-[#929d97]">{exp.company}</p>
              <ul className="mt-3 space-y-2">
                {exp.highlights.map((highlight) => (
                  <li key={highlight} className="grid grid-cols-[auto_1fr] gap-2 text-[12px] leading-6 text-[#9ba69f]">
                    <span className="mt-[0.55rem] h-1 w-1 rounded-full bg-[#edf1ef]/45" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {exp.duration && <span className="font-code text-[10px] font-semibold uppercase text-[#68746d] sm:text-right">{exp.duration}</span>}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
