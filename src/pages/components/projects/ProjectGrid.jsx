import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard'; // Import the individual card component

const ProjectGrid = React.memo(({ projects, onApply }) => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ staggerChildren: 0.1 }}
  >
    <AnimatePresence>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onApply={onApply} />
      ))}
    </AnimatePresence>
  </motion.div>
));

export default ProjectGrid;