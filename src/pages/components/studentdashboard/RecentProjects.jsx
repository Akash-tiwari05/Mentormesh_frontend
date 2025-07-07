// RecentProjects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, PlayCircle, Users, Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';


/**
 * RecentProjects Component
 * Displays a list of recent projects undertaken by the student, with details like score, status, and mentor.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.projects - Array of project objects.
 * @param {number} props.projects[].id - Unique ID for the project.
 * @param {string} props.projects[].title - Title of the project.
 * @param {number} props.projects[].score - Score obtained in the project.
 * @param {number} props.projects[].maxScore - Maximum possible score for the project.
 * @param {string} props.projects[].status - Current status of the project ('completed' or 'in-progress').
 * @param {string} props.projects[].completedDate - Date of completion (if status is 'completed').
 * @param {string} props.projects[].technology - Technologies used in the project.
 * @param {string} props.projects[].mentor - Name of the mentor for the project.
 */
const RecentProjects = ({ projects }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 font-inter"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          Recent Projects
        </h3>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          {projects.filter(p => p.status === 'completed').length} completed
        </div>
      </div>

      <ScrollArea className="h-80">
        <div className="space-y-3 pr-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50
                         border border-gray-200 hover:border-blue-200 rounded-xl p-4 
                         hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Link to={`/projects/${project.id}`}>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors underline hover:underline">
                      {project.title}
                    </h4>
                  </Link>

                  <p className="text-sm text-gray-600 mt-1">{project.technology}</p>
                </div>
                <div className="flex items-center gap-2">
                  {project.status === 'completed' ? (
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">Done</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      <PlayCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">Active</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{project.mentor}</span>
                </div>

                {project.status === 'completed' && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-yellow-700">
                        {project.score}/{project.maxScore}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(project.completedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default RecentProjects;
