// src/pages/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SkillArcCard from '../components/skills/SkillArcCard'; // Path to your new component

const skillArcsData = [
  {
    id: 'first-flirt',
    quote: "I didn’t know <body> would one day carry mine.",
    description: "It all started with a simple tag, a curious click in 7th grade. What began as innocent web experiments soon blossomed into a foundational understanding of how the digital world takes shape. This was the first spark, the initial whisper of a lifelong passion.",
    techs: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: 'loyal-cheater',
    quote: "Diploma made me loyal to nothing. One day I was a Blockchain girl, the next I was deploying MERN.",
    description: "My diploma years were a whirlwind of exploration. I dabbled in everything, refusing to be confined. This phase was about discovering the sheer power of full-stack development – building end-to-end experiences, from the database's heartbeat to the pixel-perfect UI.",
    techs: ["JavaScript (ES6+)", "Node.js", "React", "Next.js", "MongoDB", "Express"],
  },
  {
    id: 'rebellion',
    quote: "No one talks about the backend of the backend. The part where your app breathes.",
    description: "After building, I wanted to know how it *lived*. This was my rebellion against the 'just code it' mentality. I dove deep into making applications robust, scalable, and resilient, understanding the unseen forces that keep the digital world turning.",
    techs: ["Docker", "Linux", "AWS (EC2, S3)", "Git", "GitLab CI/CD", "Ansible", "Terraform"],
  },
  {
    id: 'affair',
    quote: "I never liked ML. Until it started talking back.",
    description: "My initial skepticism towards machine learning vanished the moment I witnessed its creative potential. This isn't just about algorithms; it's about crafting intelligent companions, building systems that learn, and pushing the boundaries of what's possible with AI.",
    techs: ["Python", "Langchain", "Generative AI", "Prompt Engineering", "OpenAI APIs"],
  },
  {
    id: 'unseen-lovers',
    quote: "I never tweeted about DBMS. But it made every project better.",
    description: "Beyond the flashy frameworks and trending tech, lies the bedrock of computer science. These are the unsung heroes, the fundamental concepts that underpin every elegant solution and robust system I've built. They're the silent architects of brilliance.",
    techs: ["OS (Operating Systems)", "CN (Computer Networks)", "OOP (Object-Oriented Programming)", "DBMS (Database Management Systems)"],
  },
];

const Skills = () => {
  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Glyphs/Shapes */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-500"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-peach rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float delay-1000"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-20">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 text-dark dark:text-light">
          Her Skill Arcs
        </h1>

        {skillArcsData.map((arc, index) => (
          <SkillArcCard key={arc.id} {...arc} index={index} />
        ))}

        <motion.p
          className="text-center text-xl md:text-2xl font-semibold mt-20 text-dark dark:text-light opacity-80"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: skillArcsData.length * 0.2 + 0.5 }} // Delay after all cards
        >
          These aren’t just skills. They’re proof I showed up — through burnout, boredom, and bugs.
        </motion.p>
      </div>
    </div>
  );
};

export default Skills;