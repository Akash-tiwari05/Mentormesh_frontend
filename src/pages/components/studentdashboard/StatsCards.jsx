// StatsCards.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Clock, Award } from 'lucide-react';

/**
 * StatsCards Component
 * Displays key statistics for the student in a card format.
 *
 * @param {object} props - Component props.
 * @param {object} props.stats - Student's statistics data.
 * @param {number} props.stats.projectsCompleted - Number of projects completed.
 * @param {number} props.stats.totalProjects - Total number of projects available.
 * @param {number} props.stats.overallScore - Student's overall score.
 * @param {number} props.stats.maxScore - Maximum possible overall score.
 * @param {number} props.stats.studyHours - Total study hours.
 * @param {number} props.stats.certificates - Number of certificates earned.
 */
const StatsCards = ({ stats }) => {
  // Define the data for each stat card
  const statCards = [
    {
      title: "Projects Completed",
      value: stats.projectsCompleted,
      total: stats.totalProjects,
      icon: BookOpen,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      percentage: Math.round((stats.projectsCompleted / stats.totalProjects) * 100)
    },
    {
      title: "Overall Score",
      value: stats.overallScore,
      total: stats.maxScore,
      icon: Target,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      percentage: Math.round((stats.overallScore / stats.maxScore) * 100)
    },
    {
      title: "Study Hours",
      value: stats.studyHours,
      total: null, // No total for study hours
      icon: Clock,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      percentage: null // No percentage for study hours
    },
    {
      title: "Certificates",
      value: stats.certificates,
      total: null, // No total for certificates
      icon: Award,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      percentage: null // No percentage for certificates
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-inter">
      {statCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`group ${card.bgColor} rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} group-hover:scale-110 transition-transform`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            {card.percentage && (
              <div className={`text-sm font-bold ${card.textColor} bg-white px-3 py-1 rounded-full`}>
                {card.percentage}%
              </div>
            )}
          </div>
          <h3 className="text-gray-600 text-sm mb-2 font-medium">{card.title}</h3>
          <div className={`text-3xl font-bold ${card.textColor} group-hover:scale-105 transition-transform`}>
            {card.value}
            {card.total && <span className="text-xl text-gray-500">/{card.total}</span>}
          </div>

          {card.percentage && (
            <div className="mt-3 bg-white rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${card.percentage}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
