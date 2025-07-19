// src/components/resume/ResumeComparison.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeComparison = ({ oldBullets, newBullets, labLog, loading, aiError }) => {

  const bulletVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Old Resume Snippet */}
      <motion.div
        className="col-span-1 p-6 rounded-lg bg-light/70 dark:bg-dark/30 border border-peach dark:border-blue shadow-inner"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-bold mb-4 text-dark dark:text-light opacity-70">Before (Base Resume)</h3>
        <ul className="space-y-3 text-dark dark:text-light opacity-60">
          {oldBullets.map((bullet, index) => (
            <li key={`old-${index}`} className="flex items-start">
              <span className="mr-2 text-pink dark:text-blue">•</span>
              <p className="text-sm">{bullet}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Tweaked Resume Snippet */}
      <motion.div
        className="col-span-1 p-6 rounded-lg bg-light dark:bg-dark/20 border border-blue dark:border-pink shadow-lg relative"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-dark/70 backdrop-blur-sm z-10 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <p className="text-pink dark:text-blue font-semibold">Updating...</p>
            </div>
          </div>
        )}
        <h3 className="text-xl font-bold mb-4 text-dark dark:text-light">After (AI-Enhanced)</h3>
        {aiError ? (
          <p className="text-red-500 italic text-sm">{aiError}</p>
        ) : (
          <ul className="space-y-3 text-dark dark:text-light">
            <AnimatePresence mode="wait">
              {newBullets.map((bullet, index) => (
                <motion.li
                  key={`new-${bullet}-${index}`} // Key change for re-animation on content update
                  className="flex items-start bg-blue/10 dark:bg-pink/10 rounded-md p-2"
                  variants={bulletVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <span className="mr-2 text-pink dark:text-blue">✓</span>
                  <p className="text-sm">{bullet}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </motion.div>

      {/* Lab Log Panel */}
      <motion.div
        className="col-span-1 p-6 rounded-lg bg-ivory dark:bg-dark/40 border border-peach dark:border-blue shadow-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-4 text-dark dark:text-light">Lab Log</h3>
        <ul className="space-y-2 text-dark dark:text-light text-sm overflow-y-auto max-h-60 custom-scrollbar relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-dark/70 backdrop-blur-sm z-10 rounded-lg">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
          </div>
        )}
          <AnimatePresence>
            {labLog.length === 0 && !loading && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="italic opacity-70"
              >
                No changes logged yet. Start tweaking!
              </motion.li>
            )}
            {labLog.map((logEntry, index) => (
              <motion.li
                key={`log-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-start"
              >
                <span className="mr-2 text-blue dark:text-pink text-xl leading-none">•</span>
                <p className="text-xs sm:text-sm">{logEntry}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
  );
};

export default ResumeComparison;