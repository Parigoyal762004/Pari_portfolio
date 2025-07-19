// src/components/resume/ResumeGallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Example data for pre-tweaked resumes (these are still static examples for the gallery)
const sampleTweakedResumes = [
  {
    id: 'dev',
    title: 'Software Developer Resume',
    description: 'Optimized for core software engineering roles, highlighting coding prowess and system design.',
    bullets: [
      "Engineered scalable web applications using advanced React hooks and Node.js microservices, boosting performance by 15%.",
      "Designed robust RESTful APIs for seamless data exchange, facilitating integration with diverse frontend systems.",
      "Implemented test-driven development (TDD) resulting in a 20% reduction in production bugs and enhanced code reliability.",
      "Collaborated effectively within Agile sprints, contributing to on-time delivery of critical software features."
    ],
    accentColor: 'blue',
  },
  {
    id: 'product',
    title: 'Product-Focused Resume',
    description: 'Tailored for product-oriented roles, emphasizing user empathy, feature delivery, and business impact.',
    bullets: [
      "Collaborated cross-functionally with product managers and designers to translate user needs into technical specifications, shaping product roadmap.",
      "Translated user research and market analysis into actionable features, contributing to a 15% increase in user engagement for key modules.",
      "Iterated on product designs and functionalities based on A/B testing and user feedback, driving data-informed decision-making for product evolution.",
      "Communicated technical feasibility and progress to non-technical stakeholders, ensuring alignment on product vision."
    ],
    accentColor: 'pink',
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Resume',
    description: 'Showcasing expertise in infrastructure, automation, and cloud deployments (AWS focus).',
    bullets: [
      "Automated CI/CD pipelines using GitLab CI/CD, Docker, and Kubernetes, reducing deployment time by 40% and improving release cycles.",
      "Managed and optimized AWS EC2 instances, S3 buckets, and RDS databases for highly available and scalable application environments.",
      "Configured Ansible playbooks and Terraform for infrastructure as code, ensuring consistent, reproducible, and secure environment provisioning across dev and prod.",
      "Monitored system performance and implemented proactive alerting, enhancing system reliability and uptime."
    ],
    accentColor: 'peach',
  },
];

const ResumeGallery = ({ downloadTweakedResume }) => { // Receive the download function
  const [selectedResume, setSelectedResume] = useState(sampleTweakedResumes[0].id);

  const currentResume = sampleTweakedResumes.find(res => res.id === selectedResume);

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Toggle Buttons for Different Resume Types */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {sampleTweakedResumes.map((resume) => (
          <button
            key={resume.id}
            onClick={() => setSelectedResume(resume.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${selectedResume === resume.id
                ? `bg-${resume.accentColor} text-light shadow-md`
                : 'bg-ivory dark:bg-dark/30 text-dark dark:text-light border border-peach dark:border-blue hover:bg-peach/50 dark:hover:bg-blue/20'
              }`}
          >
            {resume.title.replace(' Resume', '')}
          </button>
        ))}
      </div>

      {/* Display Selected Resume Snippet */}
      <motion.div
        key={selectedResume} // Key for Framer Motion to re-animate on selection change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-2xl p-6 rounded-2xl shadow-xl border border-blue dark:border-pink bg-light dark:bg-dark/20 text-dark dark:text-light mt-8`}
      >
        <h3 className="text-2xl font-bold mb-3 text-center text-pink dark:text-blue">
          {currentResume.title}
        </h3>
        <p className="text-sm italic opacity-80 mb-5 text-center">
          {currentResume.description}
        </p>
        <ul className="space-y-3">
          {currentResume.bullets.map((bullet, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-2 text-${currentResume.accentColor}`}>•</span>
              <p className="text-sm">{bullet}</p>
            </li>
          ))}
        </ul>
        <div className="text-center mt-6">
           <button
             onClick={() => downloadTweakedResume(currentResume.bullets, `${currentResume.id}_Resume.pdf`)}
             className="px-6 py-2 bg-pink text-light dark:bg-blue dark:text-dark rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-all duration-300"
           >
             Download this Example PDF
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeGallery;