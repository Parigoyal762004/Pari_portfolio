// src/components/resume/ResumeTweaker.jsx
import React from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

const ResumeTweaker = ({ jobDescription, setJobDescription, tweaks, setTweaks, loading, aiResponse }) => {

  const handleToggle = (key) => {
    setTweaks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleButton = ({ label, tweakKey }) => (
    <button
      onClick={() => handleToggle(tweakKey)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
        ${tweaks[tweakKey]
          ? 'bg-pink text-light shadow-md'
          : 'bg-ivory dark:bg-dark/30 text-dark dark:text-light border border-peach dark:border-blue hover:bg-peach/50 dark:hover:bg-blue/20'
        }`}
      disabled={loading} // Disable toggles while AI is loading
    >
      {label}
    </button>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Job Description Input */}
      <div>
        <label htmlFor="job-description" className="block text-lg font-medium mb-3 text-dark dark:text-light">
          Paste a Job Description:
        </label>
        <textarea
          id="job-description"
          className="w-full p-4 rounded-lg bg-ivory dark:bg-dark/30 border border-peach dark:border-blue
                     text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-pink resize-y min-h-[150px]"
          placeholder="e.g., 'Seeking a passionate SDE intern to work on scalable cloud services...'"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={loading} // Disable input while AI is loading
        />
        <p className="text-sm text-dark dark:text-light opacity-70 mt-2">
          This helps the AI understand the role.
        </p>
        <div className="mt-6">
          <label className="block text-lg font-medium mb-3 text-dark dark:text-light">
            AI Tweak Options:
          </label>
          <div className="flex flex-wrap gap-3">
            <ToggleButton label="Make it more impact-focused" tweakKey="impactFocused" />
            <ToggleButton label="Add ATS keywords" tweakKey="atsKeywords" />
            <ToggleButton label="Highlight leadership" tweakKey="leadershipHighlight" />
          </div>
        </div>
      </div>

      {/* Simulated AI Response Area (now real AI response) */}
      <div>
        <label className="block text-lg font-medium mb-3 text-dark dark:text-light">
          AI-Generated Suggestions:
        </label>
        <div className="min-h-[250px] p-4 rounded-lg bg-light dark:bg-dark/20 border border-blue dark:border-pink text-dark dark:text-light overflow-auto custom-scrollbar relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-dark/70 backdrop-blur-sm z-10 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <p className="text-pink dark:text-blue font-semibold">AI is thinking...</p>
              </div>
            </div>
          )}
          {aiResponse.length > 0 ? (
            <Typewriter
              options={{
                strings: [aiResponse],
                autoStart: true,
                loop: false,
                delay: 20, // Typing speed
                cursor: '|',
                deleteSpeed: 5,
                wrapperClassName: "font-mono text-sm leading-relaxed",
                cursorClassName: "font-mono"
              }}
              key={aiResponse + loading} // Key prop to re-initialize Typewriter on content change or loading state change
            />
          ) : (
            <p className="text-sm italic opacity-70">
              Paste a job description and select tweaks to see the AI in action...
            </p>
          )}
        </div>
        <p className="text-sm text-dark dark:text-light opacity-70 mt-2 text-right italic">
          "Tweaked by AI. Approved by me."
        </p>
      </div>
    </div>
  );
};

export default ResumeTweaker;