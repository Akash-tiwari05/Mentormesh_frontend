import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Star, 
  Award, 
  Heart, 
  TrendingUp, 
  Calendar, 
  MessageCircle,
  Target,
  Sparkles,
  Crown,
  Zap,
  BookOpen,
  Coffee
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const MentorStats = () => {
  // Mock mentor data - replace with your actual data source
  const mentor = {
    menteeCount: 47,
    availableHours: 25,
    karma: 4.9,
    specialization: "Full-Stack Development, React/Node.js, System Design, and Career Guidance",
    totalSessions: 234,
    successRate: 96,
    yearsExperience: 8,
    achievements: ["Top Mentor 2024", "Career Catalyst", "Community Leader"],
    skills: ["React", "Node.js", "System Design", "Career Coaching", "Leadership"]
  };

  const [animatedStats, setAnimatedStats] = useState({
    menteeCount: 0,
    availableHours: 0,
    karma: 0,
    totalSessions: 0,
    successRate: 0,
    yearsExperience: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const animateValue = (start, end, duration, key, isDecimal = false) => {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = isDecimal 
          ? parseFloat((start + (end - start) * easeOutQuart).toFixed(1))
          : Math.floor(start + (end - start) * easeOutQuart);
        
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Stagger the animations
    setTimeout(() => animateValue(0, mentor.menteeCount, 1200, 'menteeCount'), 200);
    setTimeout(() => animateValue(0, mentor.availableHours, 1000, 'availableHours'), 400);
    setTimeout(() => animateValue(0, mentor.karma, 1500, 'karma', true), 600);
    setTimeout(() => animateValue(0, mentor.totalSessions, 1800, 'totalSessions'), 800);
    setTimeout(() => animateValue(0, mentor.successRate, 1400, 'successRate'), 1000);
    setTimeout(() => animateValue(0, mentor.yearsExperience, 1000, 'yearsExperience'), 1200);
  }, []);

  const primaryStats = [
    {
      key: 'menteeCount',
      label: 'Students Mentored',
      value: animatedStats.menteeCount,
      icon: Users,
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50',
      iconColor: 'text-purple-600',
      delay: 0
    },
    {
      key: 'availableHours',
      label: 'Weekly Availability',
      value: `${animatedStats.availableHours}h`,
      icon: Clock,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      delay: 0.1
    },
    {
      key: 'karma',
      label: 'Average Rating',
      value: animatedStats.karma,
      icon: Star,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      iconColor: 'text-yellow-600',
      delay: 0.2
    }
  ];

  const secondaryStats = [
    {
      key: 'totalSessions',
      label: 'Total Sessions',
      value: animatedStats.totalSessions,
      icon: MessageCircle,
      color: 'text-emerald-600'
    },
    {
      key: 'successRate',
      label: 'Success Rate',
      value: `${animatedStats.successRate}%`,
      icon: Target,
      color: 'text-pink-600'
    },
    {
      key: 'yearsExperience',
      label: 'Years Experience',
      value: animatedStats.yearsExperience,
      icon: Award,
      color: 'text-indigo-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-6 relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-3xl opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent rounded-3xl" />
      
      {/* Floating background orbs */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />

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
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg relative"
              >
                <Heart className="w-6 h-6 text-white" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                />
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-pink-800 bg-clip-text text-transparent">
                  Mentorship Impact
                </CardTitle>
                <p className="text-gray-500 text-sm mt-1">Empowering the next generation</p>
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex items-center gap-2"
            >
              <Crown className="w-5 h-5 text-yellow-500" />
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                Elite Mentor
              </Badge>
            </motion.div>
          </motion.div>
        </CardHeader>

        <CardContent className="relative space-y-8">
          {/* Primary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {primaryStats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: stat.delay,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: animatedStats[stat.key] > 0 ? 360 : 0 }}
                      transition={{ duration: 0.5, delay: stat.delay }}
                    >
                      <Sparkles className="w-5 h-5 text-purple-500" />
                    </motion.div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-gray-900 mb-2"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: stat.delay + 0.3, type: "spring" }}
                    >
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {secondaryStats.map((stat, index) => (
              <motion.div
                key={stat.key}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Specialization Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-900 to-pink-800 bg-clip-text text-transparent">
                Specialization Areas
              </h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {mentor.specialization}
            </p>
            
            {/* Skills badges */}
            <div className="flex flex-wrap gap-2">
              {mentor.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-white/80 text-purple-700 border-purple-200 hover:bg-purple-50 transition-colors"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-yellow-900 to-orange-800 bg-clip-text text-transparent">
                Recent Achievements
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mentor.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 rounded-xl p-4 border border-yellow-200 hover:border-yellow-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-900">{achievement}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gray-100"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Top 5% Mentor</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Active Since 2020</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Coffee className="w-4 h-4 text-orange-500" />
              <span>Available for Coffee Chats</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MentorStats;