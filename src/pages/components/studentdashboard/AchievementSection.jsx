// AchievementSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Trophy, Clock, CheckCircle } from 'lucide-react';

/**
 * AchievementSection Component
 * Displays a list of achievements and their completion status.
 *
 * @param {object} props - Component props.
 * @param {object} props.stats - Student's statistics data, used to determine achievement status.
 * @param {number} props.stats.projectsCompleted - Number of projects completed.
 * @param {number} props.stats.overallScore - Student's overall score.
 * @param {number} props.stats.studyHours - Total study hours.
 * @param {number} props.stats.certificates - Number of certificates earned.
 */
const AchievementSection = ({ stats }) => {
  // Define the list of achievements and their conditions
  const achievements = [
    {
      title: "First Project",
      description: "Complete your first project",
      achieved: stats.projectsCompleted > 0,
      icon: BookOpen,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "High Scorer",
      description: "Score above 90 on a project",
      achieved: stats.overallScore > 900, // Assuming maxScore is 1000, so >90%
      icon: Trophy,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Consistent Learner",
      description: "Study for 100+ hours",
      achieved: stats.studyHours > 100,
      icon: Clock,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Certificate Earner",
      description: "Earn your first certificate",
      achieved: stats.certificates > 0,
      icon: Award,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 font-inter"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          Achievements
        </h3>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          {achievements.filter(a => a.achieved).length}/{achievements.length} unlocked
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-xl p-4 border transition-all duration-300 ${
              achievement.achieved
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg transition-all duration-300 ${
                achievement.achieved
                  ? `bg-gradient-to-r ${achievement.color} group-hover:scale-110`
                  : 'bg-gray-400 group-hover:bg-gray-500'
              }`}>
                <achievement.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className={`font-bold mb-1 ${
                  achievement.achieved ? 'text-green-900' : 'text-gray-700'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-sm ${
                  achievement.achieved ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {achievement.description}
                </p>
              </div>
              {achievement.achieved && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementSection;
