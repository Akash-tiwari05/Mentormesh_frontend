import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Github, Linkedin, Globe, Save, X, Edit3, Check } from 'lucide-react';

const EditProfileForm = ({ onSave, onCancel }) => {
  // Mock user data since we don't have access to the JSON file
  const defaultUser = {
    id: 1,
    name: "John Doe",
    bio: "Full-stack developer passionate about creating amazing user experiences",
    location: "San Francisco, CA",
    githubUsername: "johndoe",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    isPublic: true
  };

  const [formData, setFormData] = useState(defaultUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(formData);
    setIsSubmitting(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.2 }
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-xl flex items-center justify-center p-4 "
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-t-3xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"
              >
                <Edit3 className="w-6 h-6" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                  Edit Profile
                </h2>
                <p className="text-purple-100 mt-1">Update your information</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {/* Bio Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 text-purple-600" />
              Bio
            </label>
            <motion.div
              variants={inputVariants}
              animate={focusedField === 'bio' ? 'focused' : 'unfocused'}
            >
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                onFocus={() => setFocusedField('bio')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-purple-50 border border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </motion.div>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin className="w-4 h-4 text-blue-600" />
              Location
            </label>
            <motion.div
              variants={inputVariants}
              animate={focusedField === 'location' ? 'focused' : 'unfocused'}
            >
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Where are you located?"
              />
            </motion.div>
          </div>

          {/* GitHub Username */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Github className="w-4 h-4 text-gray-800" />
              GitHub Username
            </label>
            <motion.div
              variants={inputVariants}
              animate={focusedField === 'github' ? 'focused' : 'unfocused'}
            >
              <input
                type="text"
                value={formData.githubUsername}
                onChange={(e) => handleChange('githubUsername', e.target.value)}
                onFocus={() => setFocusedField('github')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder="your-github-username"
              />
            </motion.div>
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Linkedin className="w-4 h-4 text-blue-700" />
              LinkedIn URL
            </label>
            <motion.div
              variants={inputVariants}
              animate={focusedField === 'linkedin' ? 'focused' : 'unfocused'}
            >
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                onFocus={() => setFocusedField('linkedin')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://linkedin.com/in/yourname"
              />
            </motion.div>
          </div>

          {/* Public Profile Toggle */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer"
              onClick={() => handleChange('isPublic', !formData.isPublic)}
            >
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => handleChange('isPublic', e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  formData.isPublic 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500' 
                    : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: formData.isPublic ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {formData.isPublic && (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-3 h-3 text-purple-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <label htmlFor="isPublic" className="text-sm font-medium text-gray-700 cursor-pointer">
                Make profile public
              </label>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <motion.button
              type="button"
              disabled={isSubmitting}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  />
                ) : (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <motion.button
              type="button"
              onClick={onCancel}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditProfileForm;