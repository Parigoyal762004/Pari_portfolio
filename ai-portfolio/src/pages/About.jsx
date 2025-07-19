// src/pages/About.jsx
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For smoother transitions

// Sub-components - Ensure these paths are correct for your project structure
import InitialIntro from '../components/about/InitialIntro';
import PoeticSummaryGenerator from '../components/about/PoeticSummaryGenerator';
import TimelineSection from '../components/about/TimelineSection';
import PopupDistractor from '../components/PopupDistractor'; // Adjust path if PopupDistractor is in 'about'
import FloatingImage from '../components/FloatingImage'; // Adjust path if FloatingImage is in 'about'

// Poem Generator (Google Gemini or similar) - Kept here for centralized API call
const generatePoem = async (prompt) => {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA5yGfRMMLLm8MhHM7Sq06rSBCHkAaVOOU", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Write a poetic TL;DR about: ${prompt}` }] }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      return "An error occurred generating the poem. Please try again later.";
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Oops, something went poetic in the wires.";
  } catch (error) {
    console.error("Network or API call failed:", error);
    return "Failed to connect to the poetic muse. Check your internet.";
  }
};


const About = () => {
  const [step, setStep] = useState(0); // 0: Initial choice, 1: AI poem shown
  const [poem, setPoem] = useState(""); // Pari's generated poem
  const [poemLoading, setPoemLoading] = useState(false); // Loading state for any poem generation
  const [userPoem, setUserPoem] = useState(""); // User's generated poem
  const [userPrompt, setUserPrompt] = useState(""); // User's input prompt for their poem
  const [showInputPrompt, setShowInputPrompt] = useState(false); // To toggle user poem input area
  const [showTimeline, setShowTimeline] = useState(false); // To toggle visibility of the timeline section
  const [randomPopup, setRandomPopup] = useState(""); // State for ephemeral popup messages
  const [popupPosition, setPopupPosition] = useState({ top: '50%', left: '50%' }); // Position for popups
  const [showUserPromptTypewriter, setShowUserPromptTypewriter] = useState(false); // For typewriter effect on user prompt

  // Define timeline items here or in a separate constants file for larger apps
const timelineItems = [
  {
    year: "2019–2020",
    title: "Head Girl, Choir Leader",
    place: "Cambridge International School, Sangrur",
    highlight: "Led with empathy and voice — on stage and off. Built early leadership, communication, and collaborative skills.",
  },
  {
    year: "2020–2023",
    title: "Diploma in CSE",
    place: "Thapar Polytechnic College",
    highlight:
      "Earned the title 'Blockchain Girl' in 2021. Explored tech fearlessly — from DSA to Web3. Managed cultural fests and learned by building.",
  },
  {
    year: "2023–2026",
    title: "B.E. in Computer Science",
    place: "Thapar Institute of Engineering & Technology",
    highlight:
      "From patents to poetry in tech — building with AI, leading music teams, and navigating the future with curiosity as a compass.",
  },
  {
    year: "Now & Next",
    title: "Where is she headed?",
    place: "Open to opportunities",
    highlight:
      "Armed with skills, soft power, and a story — ready to learn, unlearn, and ship what's never been built before.",
  },
];


  // Logic for initial choice interaction
  const handleInitialChoice = useCallback(async (choice) => {
    if (choice === "Yes, of course") {
      setStep(1); // Move to AI poem step
      setPoemLoading(true);
      const generated = await generatePoem("Pari describes herself");
      setPoem(generated);
      setPoemLoading(false);
    } else {
      // Logic for random popup distractions
      const popups = [
        "Oops! Try again",
        "Hmm, not convincing.",
        "Try guessing again?",
        "Close, but not it.",
        "Not quite what she's thinking!",
        "Think deeper!",
      ];
      setRandomPopup(popups[Math.floor(Math.random() * popups.length)]);
      setPopupPosition({
        top: `${Math.random() * 70 + 10}%`, // Random vertical position (10%-80%)
        left: `${Math.random() * 70 + 10}%`, // Random horizontal position (10%-80%)
      });
      setTimeout(() => setRandomPopup(""), 2000); // Clear popup after 2 seconds
    }
  }, []); // Empty dependency array for useCallback as it only uses state setters

  // Logic for user-generated poem - THIS IS THE CORRECTED FUNCTION
  const handleUserPoemGeneration = useCallback(async (prompt) => {
    if (!prompt.trim()) return; // Do not proceed if prompt is empty

    setPoemLoading(true);
    setShowUserPromptTypewriter(true); // Show typewriter for user's prompt
    setUserPrompt(prompt); // Update userPrompt state for typewriter to pick up

    // --- FIX APPLIED HERE ---
    // Removed the artificial `setTimeout` delay for immediate API call.
    // The typewriter animation for the prompt will still play out visually
    // but the API request will be sent concurrently.
    // -------------------------

    const generated = await generatePoem(prompt); // API call fires immediately

    setUserPoem(generated);
    setPoemLoading(false);
    setShowUserPromptTypewriter(false); // Hide typewriter after poem is generated
  }, [generatePoem]); // Add generatePoem to dependencies if it's not a stable reference (e.g., if it changes)

  // Callback to transition to the timeline section
  const handleShowTimeline = useCallback(() => {
    setShowTimeline(true);
    // Optionally, you might want to reset or hide the AI section content more forcefully here
    // For now, AnimatePresence in render takes care of hiding elements.
  }, []);

  // Callback to reset the user poem generator state
  const handleResetUserPoemGenerator = useCallback(() => {
    setUserPrompt(""); // Clear user's input
    setUserPoem(""); // Clear generated poem
    setPoemLoading(false); // Ensure loading is off
    setShowUserPromptTypewriter(false); // Reset typewriter display
    setShowInputPrompt(true); // Ensure input prompt section is visible for new entry
  }, []);

  return (
    <div className="relative min-h-screen px-4 py-16 sm:px-6 md:px-8 lg:px-16 overflow-hidden bg-ivory text-dark dark:bg-dark dark:text-light transition-colors duration-500">
      {/* Ambient Soft Circles - Using Tailwind colors directly */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-peach rounded-full blur-3xl opacity-80 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-peach rounded-full blur-3xl opacity-30 animate-pulse delay-500"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">

        {/* Floating Image (always visible) */}
        <FloatingImage />

        {/* Initial Intro Section */}
        <AnimatePresence>
          {!showTimeline && step === 0 && (
            <motion.div
              key="intro-step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <InitialIntro onChoice={handleInitialChoice} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Poetic Summary Section */}
        {/* Only show if not in timeline view and step is 1 (after initial choice) */}
        <AnimatePresence>
          {!showTimeline && step === 1 && (
            <motion.div
              key="poem-step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PoeticSummaryGenerator
                poem={poem}
                poemLoading={poemLoading}
                userPoem={userPoem}
                userPrompt={userPrompt}
                showInputPrompt={showInputPrompt}
                showUserPromptTypewriter={showUserPromptTypewriter}
                onGenerateUserPoem={handleUserPoemGeneration} // This is the corrected function
                onToggleInputPrompt={setShowInputPrompt}
                onResetGenerator={handleResetUserPoemGenerator}
                onShowTimeline={handleShowTimeline}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline Section */}
        <AnimatePresence>
          {showTimeline && (
            <motion.div
              key="timeline-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7 }}
            >
              <TimelineSection timelineItems={timelineItems} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Random Popup Distraction */}
        <AnimatePresence>
          {randomPopup && (
            <PopupDistractor message={randomPopup} position={popupPosition} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default About;