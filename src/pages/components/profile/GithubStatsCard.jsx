import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, GitBranch, Users, UserPlus, Star, TrendingUp, ExternalLink, Activity, Code2, GitCommit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const GithubStatsCard = () => {
  // Mock data - replace with your actual data source
  const user = {
    githubUsername: "johndoe",
    githubStats: {
      repos: 47,
      followers: 234,
      following: 189,
      contributions: 1247
    }
  };

  const { githubStats, githubUsername } = user;
  const [animatedStats, setAnimatedStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    contributions: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Stagger the animations
    setTimeout(() => animateValue(0, githubStats.repos, 1000, 'repos'), 200);
    setTimeout(() => animateValue(0, githubStats.followers, 1200, 'followers'), 400);
    setTimeout(() => animateValue(0, githubStats.following, 1000, 'following'), 600);
    setTimeout(() => animateValue(0, githubStats.contributions, 1500, 'contributions'), 800);
  }, []);

  const statCards = [
    {
      key: 'repos',
      label: 'Repositories',
      value: animatedStats.repos,
      icon: GitBranch,
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50',
      iconColor: 'text-purple-600',
      delay: 0
    },
    {
      key: 'followers',
      label: 'Followers',
      value: animatedStats.followers,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      delay: 0.1
    },
    {
      key: 'following',
      label: 'Following',
      value: animatedStats.following,
      icon: UserPlus,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      delay: 0.2
    },
    {
      key: 'contributions',
      label: 'Contributions',
      value: animatedStats.contributions,
      icon: Activity,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      iconColor: 'text-orange-600',
      delay: 0.3
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-8 relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-3xl opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent rounded-3xl" />
      
      {/* Main card */}
      <Card className="relative bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <CardHeader className="relative pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl shadow-lg"
              >
                <Github className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  GitHub Analytics
                </CardTitle>
                <p className="text-gray-500 text-sm mt-1">Development activity overview</p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>@{githubUsername}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </CardHeader>

        <CardContent className="relative">
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
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
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: animatedStats[stat.key] > 0 ? 360 : 0 }}
                      transition={{ duration: 0.5, delay: stat.delay }}
                    >
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </motion.div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-gray-900 mb-2"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: stat.delay + 0.2, type: "spring" }}
                    >
                      {animatedStats[stat.key].toLocaleString()}
                    </motion.div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activity indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-gray-100"
          >
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
              <GitCommit className="w-3 h-3 mr-1" />
              Active Developer
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200">
              <Code2 className="w-3 h-3 mr-1" />
              Open Source
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200">
              <Star className="w-3 h-3 mr-1" />
              Contributor
            </Badge>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GithubStatsCard;