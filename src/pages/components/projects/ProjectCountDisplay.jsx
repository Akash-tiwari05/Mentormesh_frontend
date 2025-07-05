import React from 'react';
import { motion } from 'framer-motion';

const ProjectCountDisplay = React.memo(({ count }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mb-6"
  >
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">
        {count} Projects Found
      </h2>
      <motion.div
        animate={{ scale: count > 0 ? 1 : 0.8 }}
        className="text-sm text-gray-600"
      >
        {count === 0 ? 'No projects match your criteria' : 'Ready to start your journey?'}
      </motion.div>
    </div>
  </motion.div>
));

export default ProjectCountDisplay;