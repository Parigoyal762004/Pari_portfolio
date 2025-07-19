// src/components/components/FloatingImage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FloatingImage = () => {
  return (
    <motion.img
      src="/hero-img.jpg" // Replace with actual image path
      alt="Pari Goyal"
      className="w-28 h-28 mx-auto rounded-full border-4 border-pink object-cover shadow-lg animate-float"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
  );
};

export default FloatingImage;