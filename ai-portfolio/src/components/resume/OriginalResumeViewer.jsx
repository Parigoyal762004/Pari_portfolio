// src/components/resume/OriginalResumeViewer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const OriginalResumeViewer = () => {
  // Placeholder for your actual resume PDF
  const resumePdfUrl = "/Pari_Goyal_Resume.pdf"; // Make sure this path is correct in your 'public' folder

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center p-6 rounded-2xl bg-light/70 dark:bg-dark/30 border border-peach dark:border-blue shadow-md text-center"
    >
      <h3 className="text-xl font-bold mb-4 text-dark dark:text-light">My Foundational Resume</h3>
      <p className="text-dark dark:text-light opacity-80 mb-6">
        This is the bedrock—the comprehensive overview of my journey. While the AI fine-tunes for context, the core narrative always remains.
      </p>
      <a
        href={resumePdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-6 py-3 bg-blue text-dark dark:bg-pink dark:text-light rounded-full text-lg font-semibold shadow-md
                   hover:scale-105 hover:bg-pink dark:hover:bg-blue transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        View Full Resume (PDF)
      </a>
    </motion.div>
  );
};

export default OriginalResumeViewer;