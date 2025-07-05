import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
 // Import the new request card
import { mockRequests } from '../data/mockData';
import MentorRequestCard from './MentorRequestCard';

const MentorDashboard = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [activeTab, setActiveTab] = useState('pending');

  const handleRequestAction = (requestId, action) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: action } : req
    ));
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">Mentor Dashboard</h1>
        <p className="text-blue-100">Manage your mentorship requests and help students grow</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {['pending', 'accepted', 'rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({requests.filter(r => r.status === tab).length})
          </button>
        ))}
      </div>

      {/* Requests */}
      <AnimatePresence mode="wait">
        {filteredRequests.length > 0 ? (
          <motion.div 
            key={activeTab} // Key changes to re-animate when tab changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {filteredRequests.map(request => (
              <MentorRequestCard 
                key={request.id} 
                request={request} 
                onAction={handleRequestAction} 
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="no-requests" // Key for the empty state
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="text-center py-12 bg-white rounded-xl shadow-lg"
          >
            <div className="text-gray-400 mb-4">
              <User className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No {activeTab} requests</h3>
            <p className="text-gray-500">You don't have any {activeTab} requests at the moment.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorDashboard;