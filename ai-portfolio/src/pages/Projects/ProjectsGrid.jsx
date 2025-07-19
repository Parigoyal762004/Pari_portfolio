// ProjectsGrid.jsx
import React from 'react';
import ProjectCard from './ProjectCard'; // Make sure ProjectCard is in the same directory or adjust path

const ProjectsGrid = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16 text-xl text-dark dark:text-light opacity-70">
        No projects found for this filter. Time to make some noise!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8 max-w-7xl mx-auto">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;