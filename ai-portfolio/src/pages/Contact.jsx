// src/pages/Contact.jsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Section Components
import IntroSection from '../components/contact/IntroSection';
import ContactForm from '../components/contact/ContactForm';
import SubmissionSuccess from '../components/contact/SubmissionSuccess';
import MicroInteractions from '../components/contact/MicroInteractions';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    feedbackType: 'General Inquiry',
  });

  const [suggestedSkill, setSuggestedSkill] = useState('');
  const [strengthVote, setStrengthVote] = useState(null);

  // Define the backend API endpoint using an environment variable
  // IMPORTANT: You MUST set VITE_BACKEND_API_URL in your Vercel project's Environment Variables
  // Its value should be: https://pari-portfolio-bsko.onrender.com/api/send-contact-email
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;


  // Function to actually send email via a backend API
  const sendEmail = useCallback(async (data) => {
    setSubmissionStatus('loading');
    try {
      // Use the environment variable here
      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the combined data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email via backend.');
      }

      setSubmissionStatus('success');
      // Reset all form and micro-interaction states after success
      setFormData({ name: '', email: '', message: '', feedbackType: 'General Inquiry' });
      setSuggestedSkill('');
      setStrengthVote(null);

    } catch (error) {
      console.error("Error sending email:", error);
      setSubmissionStatus('error');
    }
  }, [BACKEND_API_URL]); // Add BACKEND_API_URL to dependencies


  // Modified handleFinalSubmit: now called directly by the main button
  const handleFinalSubmit = useCallback(() => {
    const combinedData = {
      ...formData,
      suggestedSkill: suggestedSkill.trim() !== '' ? suggestedSkill : 'N/A', // Send 'N/A' if not provided
      strengthVote: strengthVote || 'N/A', // Send 'N/A' if not voted
    };
    sendEmail(combinedData);
  }, [formData, suggestedSkill, strengthVote, sendEmail]);


  const handleFeedbackTrigger = useCallback((triggerType) => {
    setShowForm(true);
    setFormData(prev => ({ ...prev, feedbackType: triggerType }));
    setSubmissionStatus('idle'); // Reset status if user re-engages
  }, []);

  const handleShowFormAgain = useCallback(() => {
    setShowForm(true);
    setSubmissionStatus('idle');
  }, []);

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-ivory text-dark dark:bg-dark dark:text-light transition-colors duration-500">
      {/* Background glowing particles/shapes */}
      <div className="absolute top-1/4 left-[5%] w-32 h-32 bg-pink rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float"></div>
      <div className="absolute bottom-[10%] right-[10%] w-48 h-48 bg-blue rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float delay-500"></div>
      <div className="absolute top-[20%] right-[15%] w-24 h-24 bg-peach rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float delay-1000"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Intro Section */}
        <AnimatePresence mode="wait">
          {!showForm && submissionStatus === 'idle' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.7 }}
            >
              <IntroSection onTriggerFeedback={handleFeedbackTrigger} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form and Micro-interactions Container */}
        <AnimatePresence mode="wait">
          {(showForm || submissionStatus !== 'idle') && (
            <motion.div
              key="form-or-success"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7 }}
              className="bg-white dark:bg-dark/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-peach dark:border-blue"
            >
              {submissionStatus === 'success' ? (
                <SubmissionSuccess onReset={handleShowFormAgain} />
              ) : (
                <>
                  {/* Main Contact Form */}
                  <ContactForm
                    formData={formData}
                    setFormData={setFormData}
                    // onSubmit prop is removed, the button is now external
                    // loading and error props are no longer passed here as the button is external
                  />

                  {/* Micro-interactions section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 pt-8 border-t border-peach dark:border-blue"
                  >
                    <MicroInteractions
                      suggestedSkill={suggestedSkill}
                      setSuggestedSkill={setSuggestedSkill}
                      strengthVote={strengthVote}
                      setStrengthVote={setStrengthVote}
                      loading={submissionStatus === 'loading'}
                    />
                  </motion.div>

                  {/* Universal Submit Button - placed after all input sections */}
                  <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <button
                      onClick={handleFinalSubmit} // Calls the combined submit handler
                      className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300
                               ${submissionStatus === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink text-light dark:bg-blue dark:text-dark shadow-md hover:scale-105 hover:shadow-lg'}`}
                      disabled={submissionStatus === 'loading'}
                      whileHover={{ scale: submissionStatus === 'loading' ? 1 : 1.05 }}
                      whileTap={{ scale: submissionStatus === 'loading' ? 1 : 0.95 }}
                    >
                      {submissionStatus === 'loading' ? 'Sending Thoughts...' : 'Send My Thoughts'}
                    </button>
                    {submissionStatus === 'error' && (
                      <p className="text-red-500 text-sm mt-3">
                        Oops! Something went wrong. Please try again.
                      </p>
                    )}
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reflections section (static content, always present when form is shown) */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="bg-white dark:bg-dark/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-peach dark:border-blue mt-12"
          >
            <h3 className="text-2xl font-bold mb-4 text-dark dark:text-light text-center">
              Reflections
            </h3>
            <div className="space-y-4">
              <p className="text-md italic text-dark dark:text-light opacity-70 text-center">
                "The best way to predict the future is to create it. — Peter Drucker"
              </p>
              <p className="text-md italic text-dark dark:text-light opacity-70 text-center">
                "I never knew a Blockchain girl would end up deploying MERN. — Pari Goyal (2021)"
              </p>
              <p className="text-md italic text-dark dark:text-light opacity-70 text-center">
                "Chaos is a ladder. — Petyr Baelish"
              </p>
              <p className="text-md italic text-dark dark:text-light opacity-70 text-center">
                "Every bug is a feature in disguise, if you're brave enough. — Anonymous Dev"
              </p>
              <p className="text-md italic text-dark dark:text-light opacity-70 text-center">
                "The soul doesn’t change—just the outfit. — Pari Goyal"
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Contact;