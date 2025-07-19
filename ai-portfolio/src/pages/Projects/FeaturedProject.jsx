// FeaturedProject.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FeaturedProject = ({ project }) => {
  return (
    <motion.section
      className="relative p-8 rounded-lg border-2 border-pink shadow-2xl overflow-hidden
                 bg-peach dark:bg-dark animate-float" // Use peach/dark for background, add float animation
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Pulsating glow animation from tailwind.config.js */}
      <div className="absolute inset-0 z-0 animate-pulse-glow" />
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4 text-dark dark:text-light">{project.title}</h2>
        <p className="text-xl text-dark dark:text-light opacity-90 mb-6">{project.summary}</p>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-dark dark:text-light">The Problem & Solution:</h3>
          <p className="text-dark dark:text-light opacity-80">{project.problemSolution}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-dark dark:text-light">Patent Status:</h3>
          <p className="text-dark dark:text-light opacity-90 font-medium">{project.patentStatus}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-dark dark:text-light">Key Technologies:</h3>
          <p className="text-dark dark:text-light opacity-80">{project.techUsedDetails}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-dark dark:text-light">My Role:</h3>
          <p className="text-dark dark:text-light opacity-80">{project.role}</p>
        </div>

        <div className="flex gap-4 mt-6">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-md bg-pink text-light text-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-md border border-pink text-dark dark:text-light text-lg font-medium hover:bg-pink hover:text-light transition-colors"
            >
              Codebase
            </a>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedProject;