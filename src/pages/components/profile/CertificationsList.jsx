import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, X, Calendar, Building, Trophy, Star, Sparkles } from 'lucide-react';

const CertificationsList = ({ isEditing = false }) => {
  // Mock user data since we don't have access to the JSON file
  const mockCertifications = [
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024-01"
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2023-11"
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "2023-09"
    }
  ];

  const [certifications, setCertifications] = useState(mockCertifications);
  const [newCert, setNewCert] = useState({ name: '', issuer: '', date: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newCert.name && newCert.issuer && newCert.date) {
      setCertifications([...certifications, newCert]);
      setNewCert({ name: '', issuer: '', date: '' });
      setIsAdding(false);
    }
  };

  const handleRemove = (indexToRemove) => {
    const updated = certifications.filter((_, idx) => idx !== indexToRemove);
    setCertifications(updated);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/90 via-orange-500/90 to-red-500/90"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"
          >
            <Trophy className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Certifications
            </h3>
            <p className="text-amber-100 text-sm">
              {certifications.length} achievement{certifications.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Certifications List */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {certifications.map((cert, index) => (
            <motion.div
              key={`${cert.name}-${index}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              whileHover={{ scale: 1.02, y: -2 }}
              className="group relative bg-gradient-to-br from-white to-purple-50/50 rounded-2xl p-4 border border-purple-200/50 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Background decorations */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-md"
                >
                  <Award className="w-5 h-5 text-white" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                    {cert.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Building className="w-3 h-3" />
                    <span className="truncate">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(cert.date)}</span>
                  </div>
                </div>
                
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemove(index)}
                    className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              
              {/* Hover effect gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {certifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-500 text-sm">No certifications yet</p>
          </motion.div>
        )}
      </div>

      {/* Add New Certification */}
      {isEditing && (
        <div className="border-t border-purple-200/50 bg-gradient-to-r from-purple-50/50 to-blue-50/50 p-6">
          <AnimatePresence mode="wait">
            {!isAdding ? (
              <motion.button
                key="add-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAdding(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Certification
              </motion.button>
            ) : (
              <motion.div
                key="add-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <input
                  type="text"
                  value={newCert.name}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                  placeholder="Certification name"
                  className="w-full px-4 py-2 bg-white/80 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                />
                <input
                  type="text"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  placeholder="Issuing organization"
                  className="w-full px-4 py-2 bg-white/80 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                />
                <input
                  type="month"
                  value={newCert.date}
                  onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/80 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                />
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                  >
                    Add
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsAdding(false);
                      setNewCert({ name: '', issuer: '', date: '' });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default CertificationsList;