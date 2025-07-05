import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Users, Calendar, CheckCircle, Clock } from 'lucide-react';

// Mock data for demonstration
const mockUser = {
  id: 1,
  role: 'student',
  projects: [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, shopping cart, and payment integration.',
      date: '2024-03-15',
      status: 'completed',
      rating: 4.8,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 2,
      title: 'Machine Learning Image Classifier',
      description: 'Developed an AI model to classify images using TensorFlow and Python. Achieved 94% accuracy on test dataset.',
      date: '2024-02-20',
      status: 'completed',
      rating: 4.9,
      technologies: ['Python', 'TensorFlow', 'OpenCV']
    },
    {
      id: 3,
      title: 'Mobile Task Management App',
      description: 'Creating a cross-platform mobile app with React Native for task management and team collaboration.',
      date: '2024-01-10',
      status: 'in-progress',
      technologies: ['React Native', 'Firebase', 'Redux']
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for business analytics using D3.js and modern web technologies.',
      date: '2023-12-05',
      status: 'completed',
      rating: 4.7,
      technologies: ['D3.js', 'Vue.js', 'Chart.js']
    }
  ]
};

const ProjectsTimeline = () => {
  const { projects, role: userRole } = mockUser;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-emerald-500 to-emerald-600';
      case 'in-progress':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
      'in-progress': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-8"
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-2xl">
            {userRole === 'student' ? (
              <>
                <BookOpen className="w-6 h-6 text-emerald-400" />
                Learning Projects
              </>
            ) : (
              <>
                <Users className="w-6 h-6 text-cyan-400" />
                Mentorship Projects
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400 opacity-30" />
            
            <div className="space-y-8">
              {projects.slice(0, 2).map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="relative flex gap-6"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    variants={dotVariants}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getStatusColor(project.status)} shadow-lg ring-4 ring-white flex items-center justify-center`}>
                      {project.status === 'completed' ? (
                        <CheckCircle className="w-3 h-3 text-white" />
                      ) : (
                        <Clock className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </motion.div>

                  {/* Project Card */}
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="flex-1"
                  >
                    <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-semibold text-slate-900 mb-2">
                              {project.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(project.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`${getStatusBadge(project.status)} border-0 shadow-sm`}>
                              {project.status === 'completed' ? 'Completed' : 'In Progress'}
                            </Badge>
                            {project.rating && (
                              <motion.div 
                                className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium text-yellow-700">
                                  {project.rating}
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {project.description && (
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {project.description}
                          </p>
                        )}

                        {project.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <motion.div
                                key={techIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: techIndex * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Badge
                                  variant="outline"
                                  className="bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 border-slate-200 hover:border-slate-300 transition-colors"
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectsTimeline;