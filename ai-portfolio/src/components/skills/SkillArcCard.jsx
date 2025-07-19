// src/components/skills/SkillArcCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SkillArcCard = ({ quote, description, techs, index }) => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 rounded-2xl shadow-xl border border-peach dark:border-blue
                 bg-light/80 dark:bg-dark/80 backdrop-blur-custom" // Apply soft-glass effect
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} // Animate when 30% of card is in view
      transition={{ duration: 0.7, delay: index * 0.15 }} // Staggered animation
    >
      <motion.p
        className="font-script text-2xl md:text-3xl italic text-pink dark:text-blue mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: index * 0.15 + 0.3 }} // Quote fades in after card
      >
        "{quote}"
      </motion.p>

      <p className="text-dark dark:text-light opacity-90 mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {techs.map((tech, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-medium
                       bg-blue text-dark dark:bg-pink dark:text-light
                       shadow-md hover:scale-105 transition-transform duration-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillArcCard;