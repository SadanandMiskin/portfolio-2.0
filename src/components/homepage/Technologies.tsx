const skillGroups = [
  {
    title: 'Networking',
    skills: ['TCP/IP', 'DNS', 'DHCP', 'Subnetting', 'VLANs', 'Routing & Switching', 'Wireless'],
  },
  {
    title: 'Meraki',
    skills: ['Meraki Dashboard', 'Wireless troubleshooting', 'Switching', 'Security appliances'],
  },
  {
    title: 'Foundations',
    skills: ['Linux', 'Python', 'CCNA'],
  },
];

const Work = () => {
  return (
    <section className="section-block">
      <div className="mb-4">
        <p className="section-kicker">Skills</p>
        <h2 className="section-title">Things I work with</h2>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {skillGroups.map((group) => (
          <div key={group.title} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7.5rem_1fr]">
            <h3 className="font-code text-[10px] font-bold uppercase text-[#7f8b84]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-[12px] text-stone-300">
              {group.skills.map((skill, index) => (
                <span key={`${group.title}-${skill}`} className="inline-flex items-center gap-2.5">
                  {skill}{index < group.skills.length - 1 && <span className="text-stone-600" aria-hidden="true">·</span>}
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
