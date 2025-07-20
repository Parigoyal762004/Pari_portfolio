import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "./AnimatedBackground";

const phrases = [
  "Chaotic Genius™",
  "Pretty Pixels, Smarter Code",
  "AI-Assisted Everything",
  "Gen-Z Problem Solver",
  "Portfolio ≠ Boring",
  "Fresh Grad, Fresh Ideas",
  "Built with 0 Sleep, 100% AI",
  "Functionally Unstable, Creatively Unmatched",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDiveIntoChaosClick = () => {
    navigate('/about');
  };

  return (
    // Ensure the main section is positioned relative and has a higher z-index for its content
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-ivory dark:bg-dark text-dark dark:text-light relative z-10">

      {/* AI Avatar */}
      <div className="mb-6 rounded-full overflow-hidden w-44 h-48 border-4 border-pink shadow-xl">
        <img
          src="/hero-img.jpg" // Replace with actual image path later
          alt="AI Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Tagline */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Hi, I’m <span className="text-pink">Pari</span>
      </h1>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-xl sm:text-2xl font-medium h-8 mb-6"
      >
        {phrases[index]}
      </motion.div>

      <p className="max-w-xl text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
        I build immersive, aesthetic, AI-augmented experiences — one chaotic idea at a time.
      </p>

      <button
        onClick={handleDiveIntoChaosClick}
        className="inline-block mt-2 px-6 py-3 rounded-full bg-pink text-white hover:scale-105 transition-transform duration-300 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-pink focus:ring-opacity-75 font-semibold text-lg"
      >
        Dive Into the Chaos
      </button>

      {/* Scroll Down Cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-xl opacity-60"
      >
        {/* You can add an icon or text here for the scroll cue */}
      </motion.div>

      {/* THIS IS THE CRUCIAL CHANGE: Add pointer-events-none to the background layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>
    </section>
  );
};

export default Hero;