
import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Star, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';


/**
 * MentorsSection Component
 * Displays a list of previous mentors with their expertise, rating, and number of sessions.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.mentors - Array of mentor objects.
 * @param {number} props.mentors[].id - Unique ID for the mentor.
 * @param {string} props.mentors[].name - Mentor's name.
 * @param {string} props.mentors[].expertise - Mentor's area of expertise.
 * @param {number} props.mentors[].rating - Mentor's rating.
 * @param {number} props.mentors[].sessions - Number of sessions with the mentor.
 */
const MentorsSection = ({ mentors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 font-inter"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          Previous Mentors
        </h3>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          {mentors.length} mentors
        </div>
      </div>

      <ScrollArea  className="h-80">
        <div className="space-y-3 pr-2">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50
                         border border-gray-200 hover:border-purple-200 rounded-xl p-4
                         hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-900 transition-colors">
                    {mentor.name}
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                    {mentor.expertise}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-yellow-700">{mentor.rating}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700">{mentor.sessions} sessions</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default MentorsSection;
