// ProfileHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Trophy } from 'lucide-react';

/**
 * ProfileHeader Component
 * Displays the student's profile information, including name, email, enrollment date, level, and current streak.
 *
 * @param {object} props - Component props.
 * @param {object} props.profile - Student's profile data.
 * @param {string} props.profile.name - Student's name.
 * @param {string} props.profile.email - Student's email.
 * @param {string} props.profile.enrollmentDate - Date when the student enrolled.
 * @param {number} props.profile.currentStreak - Current study streak in days.
 * @param {string} props.profile.level - Student's current academic level.
 */
const ProfileHeader = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-xl relative overflow-hidden 
      pt-8  font-inter"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
          {/* Using a generic User icon as avatar placeholder */}
          <User className="w-12 h-12" />
        </div>

        <div className="text-center lg:text-left flex-1">
          <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
          <p className="text-blue-100 mb-4 text-lg">{profile.email}</p>
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                Joined {new Date(profile.enrollmentDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">{profile.level}</span>
            </div>
          </div>
        </div>

        <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="text-4xl font-bold mb-2">{profile.currentStreak}</div>
          <div className="text-sm text-blue-100 font-medium">Day Streak</div>
          <div className="text-2xl mt-2">🔥</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
