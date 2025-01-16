// import React from 'react';

const experiences = [
  {
    company: "ICICI Prudential AMC",
    role: "Full Stack Developer Intern",
    duration: "Jun - July 2024",
    description: "Worked on building and maintaining full-stack applications using React, Node.js, and MySQL with cross-functional teams.",
    logo: "/ICIPR.webp" // Replace with actual company logo
  },
  {
    company: "Compsoft Technologies Pvt Ltd",
    role: "Full Stack Web Developer Intern",
    duration: "Oct - Nov 2022",
    description: "Developed responsive web applications using JavaScript, React, Node.js, and MongoDB while improving UI/UX design.",
    logo: "c.webp" // Replace with actual company logo
  },
];

const Experience = () => {
  return (
    <section className="max-w-2xl mx-auto p-4 mt-8 w-full">
      <h2 className="text-2xl font-bold text-center dark:text-gray-800 text-white mb-8 animate-fade-up animate-delay-200">
        Experience
      </h2>
      <div>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-gray-800/30 dark:bg-gray-100/30 rounded-lg p-6 hover:shadow-lg transition-all duration-300 backdrop-blur-sm animate-fade-up animate-delay-300"
          >
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="shrink-0">
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-16 h-16 rounded-full object-contain bg-white/10 "
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-md font-bold text-white dark:text-black mb-1 ">
                      {exp.role}
                    </h3>
                    <p className="text-green-500 dark:text-purple-700 text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-600 whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-gray-400 dark:text-gray-700 mt-2 text-sm">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;