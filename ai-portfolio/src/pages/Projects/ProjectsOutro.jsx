// ProjectsOutro.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router for navigation

const ProjectsOutro = ({ githubLink, resumeLink }) => {
  return (
    <section className="text-center py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark dark:text-light">
        Let her build something brilliant for you — before she automates your job.
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-8 rounded-md bg-pink text-light text-lg font-medium hover:opacity-90 transition-opacity"
          >
            GitHub
          </a>
        )}
        {/* {resumeLink && (
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-8 rounded-md border border-pink text-dark dark:text-light text-lg font-medium hover:bg-pink hover:text-light transition-colors"
          >
            Resume
          </a>
        )} */}
        <Link
          to="/contact"
          className="py-3 px-8 rounded-md bg-blue text-dark dark:bg-peach dark:text-dark text-lg font-medium hover:opacity-90 transition-opacity"
        >
          Let's Collaborate
        </Link>
      </div>
    </section>
  );
};

export default ProjectsOutro;