// src/components/contact/SubmissionSuccess.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SubmissionSuccess = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        className="text-6xl mb-6"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        ✨
      </motion.div>
      <h2 className="text-4xl font-bold mb-4 text-dark dark:text-light">
        Thoughts Sent!
      </h2>
      <p className="text-lg text-dark dark:text-light opacity-80 mb-6">
        Your message has embarked on its journey through the digital ether. Pari will receive it soon.
      </p>
      <p className="text-md italic text-dark dark:text-light opacity-70 mb-8">
        "Thank you for being part of the chaos and the calm."
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300
                   bg-blue text-dark dark:bg-pink dark:text-light shadow-md
                   hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue"
      >
        Send Another Message
      </button>
    </motion.div>
  );
};

export default SubmissionSuccess;