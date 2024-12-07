

const experiences = [
  {
    company: "ICICI Prudential AMC",
    role: "Full Stack Developer Intern",
    duration: "Jun 2024 - July 2024",
    description: "Worked on building and maintaining full-stack applications, focusing on front-end technologies like React and back-end technologies including Node.js. Collaborated with cross-functional teams to design and implement features and enhancements, and was involved in database management with MySQL.",
  },
  {
    company: "Compsoft Technologies Pvt Ltd",
    role: "Full Stack Web Developer Intern",
    duration: "Oct 2022 - Nov 2022",
    description: "Developed and maintained responsive web applications using JavaScript, React, and Node.js. Created RESTful APIs using Express.js and integrated MongoDB for backend data management. Contributed to UI/UX design improvements and bug fixes.",
  },
];

const Experience = () => {
  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold text-center dark:text-gray-800 text-white mb-6">Experience</h2>
      <div className="relative">
        {/* More pronounced vertical line with checkpoints */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700">
          {/* Checkpoint dots */}
          {experiences.map((_, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 bg-purple-800 dark:bg-green-700
                         rounded-full -left-1.5
                         transform -translate-y-1/2"
              style={{
                top: `${(index + 0.3) * (100 / (experiences.length))}%`
              }}
            />
          ))}
        </div>

        {/* Experience entries */}
        <div className="pl-16">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-9 relative">
              <div className="ml-3">
                <h3 className="text-md text-green-600 dark:text-purple-900 underline">{exp.company}</h3>
                <p className="font-bold text-white dark:text-black text-2xl">{exp.role}</p>
                <p className="text-gray-400 dark:text-gray-700 text-sm">{exp.duration}</p>
                <p className="mt-2 text-gray-400 dark:text-gray-700 ">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;