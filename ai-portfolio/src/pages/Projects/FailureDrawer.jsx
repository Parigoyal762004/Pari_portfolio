// FailureDrawer.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Example icons

const FailureDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

const failures = [
  {
    title: 'FashionGPT',
    lesson: 'Lesson learned: AI can’t match socks properly. Yet.',
    description: 'An ambitious attempt to use AI for automated outfit generation. It generated some…interesting combinations. Back to the drawing board.',
  },
  {
    title: 'Pizza Tracker v1',
    lesson: 'Would’ve been great, but hunger > code.',
    description: 'Planned a hyper-local pizza delivery tracker. Got too distracted by actual pizza to finish. Priorities, right?',
  },
  {
    // New Failure: The Anti-Social App
    title: 'The "Ghost Mode" Social App',
    lesson: 'Discovered that even hermits crave an audience, sometimes. User engagement was... nonexistent.',
    description: 'My attempt to build a social media app focused purely on consumption, with minimal interaction and no public profiles. The idea was to reduce digital noise and foster peace, but it turns out true "anti-social" platforms are just empty rooms. A valuable lesson in understanding user psychology.',
  },
  {
    // New Failure: Automated Email Sending for Internships
    title: 'Automated Internship Cold Emailer (v0.1)',
    lesson: "Thought I could automate charisma. Hit spam filters instead. DevOps is more than just deploying code.",
    description: "An ambitious script designed to personalize and send cold emails for internship applications at scale. While technically functional for small batches, it quickly ran into SMTP rate limits, IP blacklists, and a complete lack of human touch. A painful but vital lesson in email deliverability, backend resilience, and the subtle art of not being marked as spam. Still a work in progress, but now with a proper understanding of serverless, queues, and email service providers (and less spamming).",
  },
];

  return (
    <section className="my-16 max-w-4xl mx-auto">
      <div
        className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-peach dark:bg-blue hover:bg-opacity-80 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-bold text-dark dark:text-light">Things That Didn’t Quite Work Out… Yet</h2>
        {isOpen ? (
          <ChevronUp className="text-dark dark:text-light" size={24} />
        ) : (
          <ChevronDown className="text-dark dark:text-light" size={24} />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {failures.map((item, index) => (
              <div key={index} className="p-6 rounded-lg border border-peach dark:border-blue bg-light dark:bg-dark">
                <h3 className="text-xl font-semibold mb-2 text-dark dark:text-light">{item.title}</h3>
                <p className="text-dark dark:text-light opacity-75 text-sm mb-2">{item.description}</p>
                <p className="text-dark dark:text-light opacity-60 italic">"{item.lesson}"</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FailureDrawer;