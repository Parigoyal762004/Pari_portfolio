// LabIntro.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LabIntro = ({ onFilterChange, activeFilter }) => {
  const filterButtons = [
    { label: 'Show me brilliance', filter: 'brilliance' },
    { label: 'Show me chaos', filter: 'chaos' },
    { label: 'Show me impact', filter: 'impact' },
  ];

  return (
    <section className="text-center py-16">
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-4 text-dark dark:text-light" // Direct color usage
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        She builds. But not like others do.
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-dark dark:text-light opacity-80 mb-10" // Using dark/light with opacity
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Explore the inventions, the chaos, the brilliance — all born in her creative lab.
      </motion.p>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 flex-wrap mt-8">
        {filterButtons.map((button) => (
          <button
            key={button.filter}
            onClick={() => onFilterChange(button.filter)}
            className={`
              px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300
              ${activeFilter === button.filter
                ? 'bg-pink text-light shadow-lg' // Active state: Pink background, light text
                : 'bg-peach text-dark dark:bg-blue dark:text-dark hover:bg-opacity-80' // Inactive: Peach/Blue bg, dark text
              }
            `}
          >
            {button.label}
          </button>
        ))}
        <button
          onClick={() => onFilterChange('all')}
          className={`
            px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300
            ${activeFilter === 'all'
              ? 'bg-pink text-light shadow-lg'
              : 'bg-peach text-dark dark:bg-blue dark:text-dark hover:bg-opacity-80'
            }
          `}
        >
          Show All
        </button>
      </div>
    </section>
  );
};

export default LabIntro;