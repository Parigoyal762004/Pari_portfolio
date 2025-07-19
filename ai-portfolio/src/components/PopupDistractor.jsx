// src/components/components/PopupDistractor.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PopupDistractor = ({ message, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute z-50 px-4 py-2 bg-pink text-light rounded-full text-sm whitespace-nowrap"
      style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
    >
      {message}
    </motion.div>
  );
};

export default PopupDistractor;