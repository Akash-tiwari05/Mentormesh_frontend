import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';


import useFilterMentors from './hooks/useFilterMentors.js';
import { mockMentors } from './components/data/mockData';
import MentorDashboard from './components/mentor/MentorDashboard.jsx';
import FilterPanel from './components/mentor/FilterPanel.jsx';
import MentorCard from './components/mentor/MentorCard.jsx';

// Current user role - change this to test different views
const CURRENT_USER_ROLE = "student"; // Change to "mentor" to see mentor dashboard

const MentorPage = () => {
  const [mentors, setMentors] = useState(mockMentors);
  const [filters, setFilters] = useState({
    search: '',
    skill: '',
    rating: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false); // Simulate loading if needed

  const filteredMentors = useFilterMentors(mentors, filters);

  const handleRequestMentor = (mentorId) => {
    // In a real app, this would make an API call
    console.log(`Request sent to mentor ${mentorId}`);
    // You could show a toast notification here
  };

  // Show mentor dashboard if user is a mentor
  if (CURRENT_USER_ROLE === 'mentor') {
    return <MentorDashboard />;
  }

  // Show mentor list for students
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 pt-15 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Available Mentors
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Find mentors to guide you through your learning journey and accelerate your growth
          </motion.p>
        </div>

        {/* Filters */}
        <FilterPanel 
          filters={filters}
          onFilterChange={setFilters}
          mentors={mentors} // Pass all mentors to the filter panel to derive skill options
        />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading mentors...</p>
          </div>
        )}

        {/* Mentor Grid */}
        <AnimatePresence>
          {filteredMentors.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MentorCard 
                    mentor={mentor} 
                    onRequestMentor={handleRequestMentor}
                    currentUserRole={CURRENT_USER_ROLE}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <User className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No mentors found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={() => setFilters({ search: '', skill: '', rating: '', experience: '' })}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MentorPage;