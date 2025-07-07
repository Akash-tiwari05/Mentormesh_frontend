// components/ProjectTeamTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from './utils/helpers';

const ProjectTeamTab = ({ project }) => (
  <motion.div
    key="team"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Team Members
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {project.students.map((student, index) => (
        <motion.div
          key={student.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h3 className="font-semibold text-blue-900">{student.name}</h3>
              <p className="text-blue-700">{student.role}</p>
              <p className="text-sm text-blue-600">
                Joined: {formatDate(student.joinDate)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ProjectTeamTab;