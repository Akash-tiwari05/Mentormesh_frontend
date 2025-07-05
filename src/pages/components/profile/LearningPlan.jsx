import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, X, Target, Brain, CheckCircle2, Clock, TrendingUp, Lightbulb, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const LearningPlan = ({ isEditing = false }) => {
  // Mock data - replace with your actual data source
  const initialLearningPlan = [
    { id: 1, goal: "Master React Advanced Patterns", progress: 75, category: "Frontend", priority: "high" },
    { id: 2, goal: "Learn TypeScript Best Practices", progress: 60, category: "Language", priority: "high" },
    { id: 3, goal: "Build Full-Stack Applications", progress: 40, category: "Full-Stack", priority: "medium" },
    { id: 4, goal: "Understand System Design", progress: 25, category: "Architecture", priority: "medium" },
    { id: 5, goal: "Master Docker & Kubernetes", progress: 15, category: "DevOps", priority: "low" }
  ];

  const [learningPlan, setLearningPlan] = useState(initialLearningPlan);
  const [newGoal, setNewGoal] = useState('');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const addGoal = () => {
    const trimmed = newGoal.trim();
    if (trimmed && !learningPlan.some(goal => goal.goal === trimmed)) {
      const newLearningGoal = {
        id: Date.now(),
        goal: trimmed,
        progress: 0,
        category: "General",
        priority: "medium"
      };
      setLearningPlan([...learningPlan, newLearningGoal]);
      setNewGoal('');
      setIsAddingGoal(false);
    }
  };

  const removeGoal = (goalToRemove) => {
    setLearningPlan(learningPlan.filter(goal => goal.id !== goalToRemove.id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addGoal();
    } else if (e.key === 'Escape') {
      setIsAddingGoal(false);
      setNewGoal('');
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Frontend': return Brain;
      case 'Language': return BookOpen;
      case 'Full-Stack': return Target;
      case 'Architecture': return TrendingUp;
      case 'DevOps': return Zap;
      default: return Lightbulb;
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'from-green-500 to-emerald-500';
    if (progress >= 50) return 'from-blue-500 to-cyan-500';
    if (progress >= 25) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const averageProgress = learningPlan.length > 0 
    ? Math.round(learningPlan.reduce((sum, goal) => sum + goal.progress, 0) / learningPlan.length)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-6 relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-3xl" />
      
      {/* Floating background orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <Card className="relative bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="relative pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg"
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent">
                  Learning Roadmap
                </CardTitle>
                <p className="text-gray-500 text-sm mt-1">Track your learning journey</p>
              </div>
            </div>
            
            {/* Overall progress */}
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{averageProgress}%</div>
              <div className="text-sm text-gray-500">Overall Progress</div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4"
          >
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress Overview</span>
              <span>{learningPlan.length} Goals</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${averageProgress}%` }}
                transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${getProgressColor(averageProgress)} rounded-full shadow-sm`}
              />
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="relative">
          {/* Learning goals */}
          <div className="space-y-4 mb-6">
            <AnimatePresence mode="popLayout">
              {learningPlan.map((goal, index) => {
                const IconComponent = getCategoryIcon(goal.category);
                return (
                  <motion.div
                    key={goal.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100 
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex items-start gap-4">
                        {/* Icon and category */}
                        <div className="flex-shrink-0">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${getPriorityColor(goal.priority)} shadow-lg`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        
                        {/* Goal content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 truncate">{goal.goal}</h4>
                            <Badge variant="outline" className="text-xs">
                              {goal.category}
                            </Badge>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${goal.progress}%` }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${getProgressColor(goal.progress)} rounded-full`}
                              />
                            </div>
                          </div>
                          
                          {/* Priority badge */}
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {goal.priority} priority
                            </Badge>
                            
                            {goal.progress >= 75 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                              >
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                        
                        {/* Remove button */}
                        {isEditing && (
                          <motion.button
                            onClick={() => removeGoal(goal)}
                            className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Add new goal section */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-gray-200 pt-6"
            >
              <AnimatePresence mode="wait">
                {!isAddingGoal ? (
                  <motion.div
                    key="add-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center"
                  >
                    <Button
                      onClick={() => setIsAddingGoal(true)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Learning Goal
                      <Target className="w-5 h-5 ml-2" />
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
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your learning goal (e.g., Master React Hooks)"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        autoFocus
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl pointer-events-none" />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={addGoal}
                        disabled={!newGoal.trim()}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => {
                          setIsAddingGoal(false);
                          setNewGoal('');
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

          {/* Stats footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-100"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{learningPlan.filter(g => g.progress < 100).length} In Progress</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>{learningPlan.filter(g => g.progress >= 75).length} Near Completion</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{learningPlan.filter(g => g.priority === 'high').length} High Priority</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LearningPlan;