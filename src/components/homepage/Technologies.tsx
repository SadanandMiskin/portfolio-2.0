const skillGroups = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'TailwindCSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Python'],
  },
  {
    title: 'Data',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Infra',
    skills: ['Docker', 'Linux', 'AWS EC2', 'S3', 'Lambda', 'Caddy', 'Nginx', 'Git', 'CI/CD'],
  },
  {
    title: 'Networking',
    skills: ['CCNA', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'Subnetting', 'Routing & Switching'],
  },
];

const Work = () => {
  return (
    <section className="section-block">
      <div className="mb-4">
        <p className="section-kicker">Skills</p>
        <h2 className="section-title">Things I work with</h2>
      </div>

      <div className="folio-panel divide-y divide-[#171514]/10">
        {skillGroups.map((group) => (
          <div key={group.title} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7.5rem_1fr]">
            <h3 className="font-code text-[10px] font-bold uppercase text-[#827b70]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={`${group.title}-${skill}`} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
