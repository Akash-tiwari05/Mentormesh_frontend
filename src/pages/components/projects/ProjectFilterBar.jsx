import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Briefcase, Clock, Star } from 'lucide-react'; // Import all needed icons
import FilterDropdown from './FilterDropdown'; // Import the reusable dropdown

const ProjectFilterBar = React.memo(({ skills, onSkillChange, onDurationChange, onDifficultyChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20"
  >
    <div className="flex items-center gap-2 mb-4">
      <Filter className="w-5 h-5 text-purple-600" />
      <h3 className="text-lg font-semibold text-gray-800">Filter Projects</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FilterDropdown
        label="Skills"
        onChange={onSkillChange}
        options={skills}
        icon={Star}
      />
      <FilterDropdown
        label="Duration"
        onChange={onDurationChange}
        options={['1-2 weeks', '2-4 weeks', '1-2 months', '3+ months']}
        icon={Clock}
      />
      <FilterDropdown
        label="Difficulty"
        onChange={onDifficultyChange}
        options={['Easy', 'Medium', 'Hard']}
        icon={Briefcase}
      />
    </div>
  </motion.div>
));

export default ProjectFilterBar;