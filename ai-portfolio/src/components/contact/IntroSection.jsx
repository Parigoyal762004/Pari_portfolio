// src/components/contact/IntroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const IntroSection = ({ onTriggerFeedback }) => {
  const feedbackTriggers = [
    { label: "Tell her something brilliant", type: "Brilliant Idea" },
    { label: "Point out a chaotic bug", type: "Bug Report" },
    { label: "Just say hi, the normal way", type: "General Inquiry" },
  ];

  return (
    <div className="text-center py-16">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-dark dark:text-light leading-tight tracking-tighter mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        So… how did I do?
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-dark dark:text-light opacity-80 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        This portfolio is a journey. Your thoughts help map the next adventure.
      </motion.p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        {feedbackTriggers.map((trigger, index) => (
          <motion.button
            key={trigger.type}
            onClick={() => onTriggerFeedback(trigger.type)}
            className="px-6 py-3 rounded-full text-base font-semibold transition-all duration-300
                       bg-pink text-light dark:bg-blue dark:text-dark shadow-md
                       hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
          >
            {trigger.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default IntroSection;