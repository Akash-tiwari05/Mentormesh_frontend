import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Github, Linkedin, Clock } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';


const MentorCard = ({ mentor, onRequestMentor, currentUserRole }) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequest = async () => {
    setIsRequesting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    onRequestMentor(mentor.id);
    setIsRequesting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden group"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />
      
      {/* Badge */}
      {mentor.badge && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {mentor.badge}
        </div>
      )}
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <Avatar name={mentor.name} src={mentor.profileImage} size="w-20 h-20" />
          <h3 className="text-xl font-bold text-gray-800 mt-3 text-center">{mentor.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {mentor.location}
          </div>
        </div>

        {/* Rating and Experience */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-semibold">{mentor.rating}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {mentor.experience}
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {mentor.skills.length > 4 && (
            <span className="text-gray-500 text-xs">+{mentor.skills.length - 4} more</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {mentor.github && (
              <a href={mentor.github} className="text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            )}
            {mentor.linkedin && (
              <a href={mentor.linkedin} className="text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
          
          {currentUserRole === "student" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRequest}
              disabled={isRequesting || mentor.availability === "Busy"}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRequesting ? "Requesting..." : mentor.availability === "Busy" ? "Busy" : "Request Mentor"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard;