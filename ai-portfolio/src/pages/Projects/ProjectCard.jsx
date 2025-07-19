// ProjectCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`relative p-6 rounded-lg border border-peach dark:border-blue transition-all duration-300
        ${isExpanded ? 'col-span-full' : ''}
        hover:shadow-xl hover:scale-[1.02] cursor-pointer
        bg-light dark:bg-dark bg-opacity-80 dark:bg-opacity-80`} // Glassmorphic base
      onClick={() => setIsExpanded(!isExpanded)}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        scale: 1.02,
        // backdropFilter 'blur' needs direct CSS or a custom utility if not already in Tailwind's core
        // You might need to add 'backdrop-filter: blur(12px);' directly if Tailwind doesn't generate it
      }}
      transition={{ duration: 0.3 }}
      style={{
         // If Tailwind's backdrop-filter doesn't work out of the box, uncomment:
         // backdropFilter: 'blur(8px)',
         // WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <h3 className="text-2xl font-semibold mb-2 text-dark dark:text-light">{project.title}</h3>
      <p className="text-dark dark:text-light opacity-75 text-sm mb-4">{project.summary}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue text-dark text-xs rounded-full dark:bg-pink dark:text-light" // Tag colors
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-4 rounded-md text-center bg-pink text-light hover:opacity-90 transition-opacity"
            onClick={(e) => e.stopPropagation()} // Prevent card expansion on link click
          >
            Demo
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-4 rounded-md text-center border border-peach dark:border-blue text-dark dark:text-light hover:bg-peach dark:hover:bg-blue transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
          </a>
        )}
      </div>

      {isExpanded && (
        <motion.div
          className="mt-6 pt-4 border-t border-peach dark:border-blue text-sm text-dark dark:text-light opacity-80"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {project.role && <p className="mb-2"><strong>Role:</strong> {project.role}</p>}
          {project.keyLearning && <p className="mb-2"><strong>Key Learning:</strong> {project.keyLearning}</p>}
          {project.challenges && <p className="mb-2"><strong>Challenges:</strong> {project.challenges}</p>}
          {project.techUsedDetails && <p className="mb-2"><strong>Detailed Tech:</strong> {project.techUsedDetails}</p>}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="mt-4 px-4 py-2 rounded-md bg-blue text-dark dark:bg-peach dark:text-dark hover:opacity-90"
          >
            Close Details
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectCard;