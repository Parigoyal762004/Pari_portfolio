// src/components/about/TimelineSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TimelineSection = ({ timelineItems }) => {
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);

  const handleNextTimeline = () => {
    setCurrentTimelineIndex((prevIndex) => Math.min(prevIndex + 1, timelineItems.length - 1));
  };

  const handlePrevTimeline = () => {
    setCurrentTimelineIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleResetTimeline = () => {
    setCurrentTimelineIndex(0);
  };

  return (
    <div className="pt-12">
      <h2 className="text-3xl font-bold mb-10 text-dark dark:text-light">✨ Her Evolution</h2>
      <div className="space-y-8 max-w-2xl mx-auto">
        {timelineItems.map((item, i) => (
          <motion.div
            key={i}
            className={`relative pl-6 transition-all duration-500
              ${i === currentTimelineIndex ? 'opacity-100' : 'opacity-40 blur-[1px]'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} // Slight horizontal offset
            animate={{ opacity: i === currentTimelineIndex ? 1 : 0.4, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className={`absolute left-[-10px] top-1 w-4 h-4 rounded-full transition-colors duration-300
              ${i === currentTimelineIndex ? 'bg-pink dark:bg-blue scale-125' : 'bg-peach dark:bg-dark'}`}></span>
            <div className={`border-l-4 pl-4 pb-4
              ${i === currentTimelineIndex ? 'border-pink dark:border-blue' : 'border-peach dark:border-dark'}`}>
              <h3 className="text-xl font-semibold text-dark dark:text-light">{item.title}</h3>
              <p className="text-sm opacity-70 italic text-dark dark:text-light">{item.place}</p>
              {typeof item.highlight === 'string' ? (
                <p className="mt-1 text-sm text-dark dark:text-light">{item.highlight}</p>
              ) : (
                <div className="mt-1 text-sm text-dark dark:text-light">{item.highlight}</div>
              )}
              <p className="mt-1 text-xs opacity-50 text-dark dark:text-light">{item.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <button
          onClick={handlePrevTimeline}
          disabled={currentTimelineIndex === 0}
          className="px-5 py-2 text-base rounded-full bg-dark text-light dark:bg-light dark:text-dark disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          ← Rewind
        </button>
        {currentTimelineIndex < timelineItems.length - 1 ? (
          <button
            onClick={handleNextTimeline}
            className="px-5 py-2 text-base rounded-full bg-dark text-light dark:bg-light dark:text-dark hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Next Journey →
          </button>
        ) : (
          <button
            onClick={handleResetTimeline}
            className="px-5 py-2 text-base rounded-full bg-dark text-light dark:bg-light dark:text-dark hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Start Over
          </button>
        )}
      </div>
      {currentTimelineIndex === timelineItems.length - 1 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-lg font-medium text-dark dark:text-light"
        >
          And that's all about the About section, hehe. (Pun intended!)
        </motion.p>
      )}
    </div>
  );
};

export default TimelineSection;