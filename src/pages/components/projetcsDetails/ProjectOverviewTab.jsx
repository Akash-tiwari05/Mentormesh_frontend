// components/ProjectOverviewTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ProjectOverviewTab = ({ project }) => (
  <motion.div
    key="overview"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Project Description
      </h2>
      <p className="text-gray-700 leading-relaxed text-lg">
        {project.description}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">Project Mentor</h3>
        <div className="flex items-center gap-4">
          <img
            src={project.mentor.avatar}
            alt={project.mentor.name}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h4 className="font-semibold text-blue-900">{project.mentor.name}</h4>
            <p className="text-blue-700">{project.mentor.title}</p>
            <p className="text-sm text-blue-600">{project.mentor.company}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold mb-4 text-purple-900">Project Score</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <span className="text-3xl font-bold text-purple-900">
              {project.score}
            </span>
            <span className="text-xl text-purple-600">/ {project.maxScore}</span>
          </div>
          <div className="flex-1">
            <div className="w-full bg-purple-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(project.score / project.maxScore) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Technologies Used</h3>
      <div className="flex flex-wrap gap-3">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full border border-indigo-200 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default ProjectOverviewTab;