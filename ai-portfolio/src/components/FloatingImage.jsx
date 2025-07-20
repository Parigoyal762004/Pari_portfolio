// src/components/components/FloatingImage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FloatingImage = () => {
  return (
    <motion.img
      src="/hero-img.jpg" // Replace with actual image path
      alt="Pari Goyal"
      // Added mt-24 (margin-top: 6rem) to push it down.
      // Adjust this value as needed to clear your navbar.
      className="w-44 h-44 mx-auto rounded-full border-4 border-pink object-cover shadow-lg animate-float mt-24"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 0.5 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
  );
};

export default FloatingImage;