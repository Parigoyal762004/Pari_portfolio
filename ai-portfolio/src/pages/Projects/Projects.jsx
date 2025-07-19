// Projects.jsx  <-- Corrected file name in comment
import React, { useState, useEffect } from 'react';
import LabIntro from './LabIntro';
import ProjectsGrid from './ProjectsGrid';
import ProjectCard from './ProjectCard';
import FeaturedProject from './FeaturedProject';
import FailureDrawer from './FailureDrawer';
import ProjectsOutro from './ProjectsOutro';

// Dummy Data - Replace with actual data from Pari's resume/portfolio
const allProjects = [
  {
    id: 'smart-gut',
    title: 'Smart Gut Breath Analyzer',
    summary: 'AI-powered diagnostic tool for GI/metabolic disorders. India Provisional Patent (Filed) - Co-author.',
    tags: ['#AI', '#Healthcare', '#IoT', '#ML', '#EmbeddedSystems'],
    patentStatus: 'India Provisional Patent (Filed) - Co-author', // Updated: "Filed"
    isFeatured: false, // Updated: No longer featured
    problemSolution: 'The problem of non-invasive, accurate diagnosis for gut disorders is prevalent. This device provides real-time analysis of breath biomarkers to identify specific imbalances, enabling early intervention and personalized treatment plans.',

    techUsedDetails: 'Python (TensorFlow/PyTorch for ML), React (Frontend), Embedded C (Firmware), Microcontrollers (ESP32), Custom Sensor Integration, Cloud (AWS IoT Core, Lambda)',
    role: 'Lead Hardware Engineer, Software Architect, ML Model Trainer, Patent Co-author',
    // Removed demoLink and githubLink as per request for patent project
  },
  {
    id: 'doc-appoint',
    title: 'Doc_Appoint',
    summary: 'A real-world healthcare appointment platform built with Next.js + TypeScript.',
    tags: ['#Healthcare', '#FullStack', '#NextJS', '#TypeScript', '#TailwindCSS', '#MongoDB'],
    demoLink: '/doc_appoint.mp4', // Assuming this is the path to the demo
    githubLink: 'https://github.com/Parigoyal762004/doc_appoint',
    isFeatured: false, // Updated: Now the featured project
    role: 'Full-Stack Developer',
    keyLearning: 'Mastered server-side rendering with Next.js and robust type-safe development with TypeScript.',
    challenges: 'Ensuring real-time availability updates and secure patient data handling.',
    techUsedDetails: 'Next.js, TypeScript, React, Tailwind CSS, MongoDB, Mongoose, Express.js (API)',
  },
  {
    id: 'travel-story',
    title: 'Travel Story',
    summary: 'A beautiful MERN stack travel diary with filtering and CRUD.',
    tags: ['#MERN', '#Travel', '#CRUD', '#WebDev', '#MongoDB'],
    demoLink: '/Travel.mp4',
    githubLink: 'https://github.com/Parigoyal762004/Travel-Stories',
    isFeatured: false,
    role: 'Frontend & Backend Developer',
    keyLearning: 'Deep dive into RESTful API design and seamless integration of MERN stack components.',
    challenges: 'Optimizing image uploads and ensuring efficient data retrieval for diverse travel entries.',
    techUsedDetails: 'MongoDB, Express.js, React, Node.js, Cloudinary (for image storage)',
  },
  // Add more projects based on Pari's resume with relevant tags
{
  id: 'mala-jap', // Changed ID to be more descriptive
  title: 'Mala Jap - Digital Solution', // Updated title
  summary: 'A virtual chanting application with an interactive counter, affirmation input, mantra selection, and self-audio recording. Designed for personalized spiritual practice.', // Concise summary
  tags: ['#SpiritualTech', '#WebDev', '#React', '#JavaScript', '#Audio', '#PersonalProject', '#ResponsiveDesign'], // More specific and relevant tags
  demoLink: '/Jap.mp4', // Assuming you don't have a live demo URL yet
  githubLink: 'https://github.com/Parigoyal762004/maala_jap', // Assuming you don't have a GitHub link yet
  isFeatured: false,
  role: 'Solo Developer', // Your role
  keyLearning: 'Developed interactive UI for personalized chanting, integrated audio recording/playback, and implemented robust state management for a seamless virtual spiritual experience.', // Captures new learnings
  challenges: 'Ensuring cross-browser compatibility for audio recording, optimizing performance for real-time counter updates, and crafting an intuitive, spiritually uplifting user interface.', // Reflects technical challenges
  problemSolution: `Faced with the need for a digital Mala Jap solution lacking suitable online options, I developed this application to provide a virtual chanting experience. It addresses the inconvenience of not having a physical mala by offering an interactive counter (defaulting to 108 chants), personalized affirmation/mantra input, a dropdown of common Sanskrit mantras with deity context, and unique self-audio recording/playback functionality. This allows users to track their progress and chant along with their own voice, making spiritual practice accessible and tailored.`, // Detailed problem/solution
  techUsedDetails: 'React, JavaScript, HTML, CSS (Tailwind CSS for styling), Web Audio API (for recording/playback), Responsive Design Principles', // Specific technologies
  // Footer content is part of the app's design, not necessarily project data
},
{
  id: 'my-old-portfolio', // Unique identifier for this project
  title: 'My Old Portfolio Site (A Time Capsule)', // Descriptive title
  summary: "My first serious attempt at building a real web presence. It was instrumental in learning the fundamentals of React, Vite, and component-based development.", // Concise summary
  tags: ['#React', '#Vite', '#Frontend', '#HTMLCSS', '#PersonalProject', '#LearningJourney', '#FirstProject'], // Relevant tags
  demoLink: '/Pari.mp4', // Placeholder: Add the URL to your deployed old portfolio if it's still live
  githubLink: 'https://github.com/Parigoyal762004/portfolio', // Placeholder: Add the GitHub repository URL for this old portfolio
  isFeatured: false, // Likely not a featured project, but good for context
  role: 'Solo Developer', // Your role in this project
  keyLearning: 'Grasped the basics of React, Vite, and component-based architecture. Understood fundamental web development workflows and the entire frontend build process.', // Specific learnings
  challenges: 'Navigating the initial learning curve of modern frontend development, understanding build tools like Vite, and translating design concepts into functional, responsive web layouts for the first time.', // Challenges faced
  problemSolution: `The problem was a common one for aspiring developers: needing a personal online presence to showcase skills. This portfolio served as the initial solution, providing a functional platform to present my work. While basic, it fulfilled its purpose of establishing my first web presence and laid the foundational knowledge for future, more complex projects. It also served as a sandbox for exploring new tools like Vite and early architectural patterns.`, // Detailed problem/solution
  techUsedDetails: 'React, Vite, HTML, CSS (Basic styling), Monstac (structural inspiration)', // Specific technologies used
  notes: 'This project is planned for a redesign and rebuild soon, serving as a valuable historical record of my early development journey. It reflects an early design aesthetic and foundational understanding.', // Added a 'notes' field for the 'time capsule' aspect
},
];

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'brilliance', 'chaos', 'impact'

  useEffect(() => {
    let projectsToDisplay = allProjects.filter(p => !p.isFeatured); // Always exclude featured from main grid initially

    if (activeFilter === 'brilliance') {
      // Filter for polished/impactful projects (e.g., AI, Healthcare, significant tech)
      projectsToDisplay = projectsToDisplay.filter(p =>
        p.tags.includes('#AI') || p.tags.includes('#Healthcare') || p.tags.includes('#NextJS')
      );
    } else if (activeFilter === 'chaos') {
      // Filter for creative/quirky side-projects
      projectsToDisplay = projectsToDisplay.filter(p =>
        p.tags.includes('#SideProject') || p.tags.includes('#Experimental') || p.tags.includes('#CreativeCoding')
      );
    } else if (activeFilter === 'impact') {
      // Filter for real-world results (like patents, demos that show significant impact)
      projectsToDisplay = projectsToDisplay.filter(p =>
        p.patentStatus || p.tags.includes('#Healthcare') || (p.demoLink && p.demoLink !== '#') // Check if demoLink exists and is not '#'
      );
    }
    // If 'all', it remains projectsToDisplay without further filtering (excluding featured)

    setFilteredProjects(projectsToDisplay);
  }, [activeFilter]);

  // Find the single featured project
  const featuredProject = allProjects.find(p => p.isFeatured);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8"> {/* Body styling handled by index.css */}
      <LabIntro onFilterChange={handleFilterChange} activeFilter={activeFilter} />

      <hr className="my-16 border-t border-peach dark:border-blue" />

      {featuredProject && (
        <>
          {/* Ensure the title reflects the featured project's importance */}
          <h2 className="text-4xl font-bold text-center mb-10 text-dark dark:text-light">Centerpiece Invention</h2>
          <FeaturedProject project={featuredProject} />
          <hr className="my-16 border-t border-peach dark:border-blue" />
        </>
      )}

      <h2 className="text-4xl font-bold text-center mb-10 text-dark dark:text-light">Creations so Far</h2>
      <ProjectsGrid projects={filteredProjects} />

      <hr className="my-16 border-t border-peach dark:border-blue" />

      <FailureDrawer />

      <hr className="my-16 border-t border-peach dark:border-blue" />

      <ProjectsOutro
        githubLink="https://github.com/parigoyal762004" // Replace with actual GitHub link
        // resumeLink="/path/to/pari-goyal-resume.pdf" // Replace with actual resume path
      />
    </div>
  );
};

export default Projects;