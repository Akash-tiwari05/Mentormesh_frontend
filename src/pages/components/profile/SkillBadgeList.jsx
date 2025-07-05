import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Sparkles, Code, Zap, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SkillBadgeList = ({ isEditing = false }) => {
  // Mock data - replace with your actual data source
  const initialSkills = [
    "React", "JavaScript", "TypeScript", "Node.js", "Python", 
    "UI/UX Design", "MongoDB", "GraphQL", "Docker", "AWS"
  ];
  
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill('');
      setIsAddingSkill(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addSkill();
    } else if (e.key === 'Escape') {
      setIsAddingSkill(false);
      setNewSkill('');
    }
  };

  // Skill badge variants with different gradients
  const skillVariants = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-green-500',
    'from-cyan-500 to-blue-500',
  ];

  const getSkillGradient = (index) => {
    return skillVariants[index % skillVariants.length];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent rounded-2xl" />
      
      {/* Main content */}
      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h3>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-4 h-4 text-yellow-500" />
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
          <AnimatePresence mode="popLayout">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  delay: index * 0.05 
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`relative group bg-gradient-to-r ${getSkillGradient(index)} p-0.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="bg-white rounded-lg px-4 py-3 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <Code className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {skill}
                      </span>
                    </div>
                    
                    {isEditing && (
                      <motion.button
                        onClick={() => removeSkill(skill)}
                        className="opacity-0 group-hover:opacity-100 ml-2 p-1 rounded-full hover:bg-red-50 transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add New Skill Section */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-gray-200 pt-6"
          >
            <AnimatePresence mode="wait">
              {!isAddingSkill ? (
                <motion.div
                  key="add-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={() => setIsAddingSkill(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Skill
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="add-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-3"
                >
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter a new skill (e.g., React, Python, Design)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      autoFocus
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl pointer-events-none" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={addSkill}
                      disabled={!newSkill.trim()}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setIsAddingSkill(false);
                        setNewSkill('');
                      }}
                      variant="outline"
                      className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Skills count indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {skills.length} skill{skills.length !== 1 ? 's' : ''} total
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillBadgeList;