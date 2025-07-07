// components/ProjectTasksTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';
import CreateTaskButton from './CreateTaskButton';
import { getStatusColor, getPriorityColor, formatDate } from './utils/helpers';

const ProjectTasksTab = ({ project, handleCreateTask }) => (
  <motion.div
    key="tasks"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Project Tasks
      </h2>
      <CreateTaskButton
        students={project.students}
        onCreateTask={handleCreateTask}
      />
    </div>
    <div className="space-y-4">
      {project.issues.map((issue, index) => (
        <motion.div
          key={issue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
              <p className="text-gray-600 mb-4">{issue.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{issue.assignee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{formatDate(issue.dueDate)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
                {issue.status.replace('-', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ProjectTasksTab;