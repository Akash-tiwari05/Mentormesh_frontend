import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const MentorRequestCard = ({ request, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout // Enables smooth layout transitions when items are added/removed
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{request.studentName}</h3>
          <p className="text-gray-600 text-sm">{request.studentEmail}</p>
          <p className="text-gray-500 text-xs mt-1">{request.timestamp}</p>
        </div>
        {request.status === 'pending' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onAction(request.id, 'accepted')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Accept
            </button>
            <button
              onClick={() => onAction(request.id, 'rejected')}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-700 mb-4">{request.message}</p>
      
      <div className="flex flex-wrap gap-2">
        {request.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default MentorRequestCard;