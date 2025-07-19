// src/components/contact/MicroInteractions.jsx
import React from 'react'; // No useState needed here anymore
import { motion } from 'framer-motion';

const MicroInteractions = ({
  suggestedSkill,
  setSuggestedSkill,
  strengthVote,
  setStrengthVote,
  loading // New prop for disabling inputs
}) => {
  const strengths = ["Innovation", "Problem-Solving", "Design Sense", "Leadership", "Adaptability"];
  // Quotes are now handled directly in Contact.jsx's Reflections section

  const handleSuggestSkillChange = (e) => {
    setSuggestedSkill(e.target.value);
  };

  const handleVoteStrength = (strength) => {
    setStrengthVote(strength);
    // Removed alert() here
  };

  return (
    <div className="space-y-10"> {/* Adjusted spacing for better flow */}
      {/* Suggest a New Skill */}
      <motion.div
        className="p-6 rounded-2xl shadow-inner border border-peach dark:border-blue text-center bg-ivory dark:bg-dark/40" // Add bg for better distinction
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-bold mb-3 text-dark dark:text-light">
          Got a Skill Idea for Pari?
        </h3>
        <p className="text-sm text-dark dark:text-light opacity-80 mb-5">
          What's the next big thing she should dive into?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={suggestedSkill}
            onChange={handleSuggestSkillChange}
            placeholder="e.g., Quantum Computing, Web3, Rust"
            className="flex-grow p-3 rounded-md bg-white dark:bg-dark/30 border border-peach dark:border-blue text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-pink"
            disabled={loading} // Disable during loading
          />
          {/* No submit button needed here, it's just updating state */}
        </div>
      </motion.div>

      {/* Vote on Her Strength */}
      <motion.div
        className="p-6 rounded-2xl shadow-inner border border-peach dark:border-blue text-center bg-ivory dark:bg-dark/40" // Add bg for better distinction
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold mb-3 text-dark dark:text-light">
          What's Her Superpower?
        </h3>
        <p className="text-sm text-dark dark:text-light opacity-80 mb-5">
          Vote on what you found most impressive.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {strengths.map((strength) => (
            <button
              key={strength}
              onClick={() => handleVoteStrength(strength)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                         ${strengthVote === strength
                           ? 'bg-blue text-dark dark:bg-pink dark:text-light shadow-md'
                           : 'bg-white dark:bg-dark/30 text-dark dark:text-light border border-peach dark:border-blue hover:bg-peach/50 dark:hover:bg-blue/20'
                         }`}
              disabled={loading} // Disable during loading
            >
              {strength}
            </button>
          ))}
        </div>
      </motion.div>

      {/* The Reflections section (quotes) is now moved to Contact.jsx */}
    </div>
  );
};

export default MicroInteractions;