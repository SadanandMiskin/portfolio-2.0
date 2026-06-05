import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const experiences = [
  {
    company: "Cisco Systems Pvt. Ltd",
    role: "Technical Consulting Engineer",
    duration: "Aug 2025 - Present",
    mark: "CS",
    highlights: [
      "Resolved enterprise ACI incidents by analyzing APIC logs, fault records, and fabric telemetry, reducing customer downtime by 30%.",
      "Restored and migrated 5+ ACI pods, including 3 full rebuilds, by reconfiguring tenants, bridge domains, and contracts with zero data loss.",
      "Diagnosed complex L2/L3 connectivity issues across multi-tenant fabrics using TCP/IP, ARP, and MAC learning analysis.",
      "Automated troubleshooting workflows with Python-assisted scripting to streamline issue triaging and improve engineer efficiency by 20%.",
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
        isVisible ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-4 opacity-0 blur-md'
      }`}
    >
      <div className="mb-4">
        <p className="section-kicker">Experience</p>
        <h2 className="section-title">Where I worked</h2>
      </div>

      <div className="folio-panel divide-y divide-[#171514]/10">
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
            <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[#171514]/10 bg-[#fbfaf6]">
              {exp.logo ? (
                <img src={exp.logo} alt={`${exp.company} logo`} className="h-7 w-7 object-contain" />
              ) : (
                <span className="font-code text-[10px] font-black text-[#415477]">{exp.mark}</span>
              )}
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-[#171514]">{exp.role}</h3>
              <p className="mt-1 text-[12px] font-semibold text-[#70695f]">{exp.company}</p>
              <ul className="mt-3 space-y-2">
                {exp.highlights.map((highlight) => (
                  <li key={highlight} className="grid grid-cols-[auto_1fr] gap-2 text-[12px] leading-6 text-[#7f786e]">
                    <span className="mt-[0.55rem] h-1 w-1 rounded-full bg-[#171514]/45" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <span className="font-code text-[10px] font-semibold uppercase text-[#9a9389] sm:text-right">
              {exp.duration}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
