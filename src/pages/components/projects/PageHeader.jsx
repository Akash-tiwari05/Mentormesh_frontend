import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-10"
  >
    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
      Discover Amazing Projects
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      Find the perfect project to showcase your skills and advance your career
    </p>
  </motion.div>
));

export default PageHeader;