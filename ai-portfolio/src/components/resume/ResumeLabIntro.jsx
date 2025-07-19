// src/components/resume/ResumeLabIntro.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ResumeLabIntro = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="text-center relative py-16"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-dark dark:text-light leading-tight tracking-tighter">
        The Resume Lab: Where It All Begins
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-6 text-xl md:text-2xl font-medium text-pink dark:text-blue italic"
      >
        “A single resume? Too boring. Here’s how I shape mine for every opportunity that excites me.”
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="mt-10 text-lg text-dark dark:text-light opacity-80"
      >
        <span className="font-semibold">Try building one with me?</span>
      </motion.p>
      {/* Small, subtle resume-like icon/glyph in background */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue rounded-full blur-2xl opacity-0"
      ></motion.div>
    </motion.div>
  );
};

export default ResumeLabIntro;