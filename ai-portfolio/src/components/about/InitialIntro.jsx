// src/components/about/InitialIntro.jsx
import React from 'react';

const InitialIntro = ({ onChoice }) => {
  const choices = ["Yes, of course", "Do I have to?", "Hmm, maybe later"];

  return (
    <>
      <h1 className="text-4xl font-bold text-dark dark:text-light mb-4">Hey, meet Pari.</h1>
      <p className="text-lg pt-4 font-light text-dark dark:text-light opacity-90 mb-6">Wanna know how she thinks?</p>
      <div className="flex justify-center gap-4 pt-4 flex-wrap">
        {choices.map((opt) => (
          <button
            key={opt}
            onClick={() => onChoice(opt)}
            className="px-5 py-2 text-base rounded-full bg-dark text-light dark:bg-light dark:text-dark hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
};

export default InitialIntro;