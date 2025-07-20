// src/components/about/PoeticSummaryGenerator.jsx
import React, { useState, useEffect } from 'react';
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "framer-motion";

const PoeticSummaryGenerator = ({
  poem,
  poemLoading,
  userPoem,
  userPrompt,
  showInputPrompt,
  showUserPromptTypewriter,
  onGenerateUserPoem,
  onToggleInputPrompt,
  onResetGenerator,
  onShowTimeline
}) => {
  const [localUserPrompt, setLocalUserPrompt] = useState(userPrompt);

  // Sync internal state with prop if parent resets it
  useEffect(() => {
    setLocalUserPrompt(userPrompt);
  }, [userPrompt]);

  const handleGenerateClick = () => {
    onGenerateUserPoem(localUserPrompt);
  };

  const handleInputChange = (e) => {
    setLocalUserPrompt(e.target.value);
    // onResetGenerator is called onFocus, so no direct call here
  };

  return (
    <>
      <h2 className="text-xl font-semibold pt-6 text-dark dark:text-light">She thinks:</h2>
      <AnimatePresence mode="wait">
        {poemLoading && poem === "" ? (
          <motion.div
            key="initial-poem-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm opacity-60 italic text-dark dark:text-light relative z-0" // Ensure lower z-index if active
          >
            Generating poetic summary of: "Pari describes herself"...
          </motion.div>
        ) : (
          poem && (
            <motion.blockquote
              key="pari-poem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 italic text-sm bg-light/10 dark:bg-dark/20 px-4 py-3 rounded-lg text-dark dark:text-light relative z-0" // Ensure lower z-index if active
            >
              {poem}
            </motion.blockquote>
          )
        )}
      </AnimatePresence>

      <div className="mt-4 text-xs italic opacity-60 text-dark dark:text-light">Cool, right? AI these days...</div>

      <div className="flex justify-center gap-3 pt-4 flex-wrap relative z-10">
        <button
          onClick={() => onToggleInputPrompt(true)}
          className="text-sm bg-dark dark:bg-light text-light dark:text-dark px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          Make your own poetic summary
        </button>
        <button
          onClick={onShowTimeline}
          className="text-sm bg-dark dark:bg-light text-light dark:text-dark px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          Let's go further
        </button>
      </div>

      <AnimatePresence>
        {showInputPrompt && (
          <motion.div
            key="user-input-poem"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-3 relative z-20" // <-- Added relative z-20 here!
          >
            <input
              type="text"
              value={localUserPrompt}
              onChange={handleInputChange}
              onFocus={onResetGenerator}
              placeholder="e.g. A developer who loves art and innovation"
              className="w-full p-2 rounded bg-light/70 dark:bg-dark/20 border border-peach dark:border-blue text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-pink dark:focus:ring-pink"
            />
            <button
              onClick={handleGenerateClick}
              className="px-4 py-2 bg-pink text-light dark:bg-pink dark:text-light rounded-full text-sm hover:scale-105 transition-transform duration-200 ease-in-out"
              disabled={poemLoading}
            >
              {poemLoading ? "Generating..." : "Generate My Poem"}
            </button>

            {showUserPromptTypewriter && localUserPrompt && (
              <div className="text-sm opacity-80 mt-2 text-dark dark:text-light">
                Thinking about: <Typewriter
                  options={{
                    strings: [localUserPrompt],
                    autoStart: true,
                    loop: false,
                    delay: 50,
                    onComplete: () => {}
                  }}
                />
              </div>
            )}
            {poemLoading && localUserPrompt.trim() !== "" && !showUserPromptTypewriter && (
                <p className="text-sm opacity-60 mt-2 text-dark dark:text-light">Generating poetic summary of: "{localUserPrompt}"...</p>
            )}
            {userPoem && !poemLoading && (
              <blockquote className="italic text-sm bg-light/10 dark:bg-dark/20 px-4 py-3 rounded-lg mt-2 text-dark dark:text-light">
                {userPoem}
              </blockquote>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PoeticSummaryGenerator;