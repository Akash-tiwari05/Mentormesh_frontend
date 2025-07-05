import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react'; // Import the User icon for mentor

const ProjectCard = React.memo(({ project, onApply }) => {
  // Determine score based on difficulty
  const getDifficultyScore = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 100;
      case 'Medium':
        return 150;
      case 'Hard':
        return 250;
      default:
        return 0; // Default for unknown difficulty
    }
  };

  const score = getDifficultyScore(project.difficulty);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {project.difficulty}
          </span>
          {score > 0 && ( // Display score only if it's greater than 0
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              Score: {score}
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills?.map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {project.duration}
          </div>
          {project.mentor && ( // Conditionally render mentor if available
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {project.mentor}
            </div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onApply(project.id)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          Apply Now
        </motion.button>
      </div>
    </motion.div>
  );
});

export default ProjectCard;