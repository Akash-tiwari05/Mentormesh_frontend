// ProgressChart.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';


const mockStudentData = {
  // ... other profile, stats, recentProjects, mentors data ...
  monthlyProgress: [
    { month: "Jan", projects: 5, score: 88 },
    { month: "Feb", projects: 3, score: 92 },
    { month: "Mar", projects: 6, score: 85 },
    { month: "Apr", projects: 4, score: 90 },
    { month: "May", projects: 7, score: 95 },
    { month: "Jun", projects: 2, score: 80 }
  ]
};

/**
 * ProgressChart Component
 * Displays a bar chart representing monthly progress in terms of projects and scores.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.data - Array of monthly progress data, each object containing 'month', 'projects', and 'score'.
 * @param {object} props.stats - Student's statistics data (not directly used in rendering, but could be for context).
 */
const ProgressChart = ({ data, stats }) => {
  // Calculate the maximum value for scaling the bars in the chart
  // Assuming score is out of 100, scaling it down by 10 for visual comparison with projects
  const maxValue = Math.max(...data.map(d => Math.max(d.projects, d.score / 10)));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 font-inter"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          Monthly Progress
        </h3>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          This month
        </div>
      </div>

      <div className="h-64 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-4">
        <div className="h-full flex items-end justify-between gap-3">
          {data.map((monthData, index) => (
            <div key={monthData.month} className="flex-1 flex flex-col items-center">
              <div className="flex gap-1 mb-3 w-full justify-center">
                {/* Bar for projects completed */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(monthData.projects / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-3 min-h-2 shadow-sm"
                  title={`${monthData.projects} projects`}
                />
                {/* Bar for score (scaled down by 10 for visual comparison) */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(monthData.score / 10 / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                  className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg w-3 min-h-2 shadow-sm"
                  title={`Score: ${monthData.score}`}
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-full">
                {monthData.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-6 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-sm"></div>
          <span className="text-sm font-medium text-gray-700">Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-400 rounded-full shadow-sm"></div>
          <span className="text-sm font-medium text-gray-700">Score</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressChart;
