import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, Users, BookOpen, Calendar, Quote } from 'lucide-react';

// Mock data for demonstration
const mockUser = {
  id: 1,
  role: 'student',
  reviews: [
    {
      id: 1,
      reviewer: 'Sarah Johnson',
      reviewerAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Excellent mentoring session! Alex showed great understanding of React concepts and asked thoughtful questions. Very engaged and motivated to learn.',
      date: '2024-03-10',
      subject: 'React Development'
    },
    {
      id: 2,
      reviewer: 'Michael Chen',
      reviewerAvatar: '/api/placeholder/40/40',
      rating: 4,
      comment: 'Good progress on the JavaScript fundamentals. Shows strong problem-solving skills and is always prepared for our sessions.',
      date: '2024-02-28',
      subject: 'JavaScript Basics'
    },
    {
      id: 3,
      reviewer: 'Emily Rodriguez',
      reviewerAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Outstanding dedication to learning! Alex completed all assignments on time and went above and beyond with additional practice projects.',
      date: '2024-02-15',
      subject: 'Web Development'
    },
    {
      id: 4,
      reviewer: 'David Thompson',
      reviewerAvatar: '/api/placeholder/40/40',
      rating: 4,
      comment: 'Great attitude and willingness to learn. Shows improvement in coding skills and understanding of best practices.',
      date: '2024-01-20',
      subject: 'Python Programming'
    }
  ]
};

const ReviewList = () => {
  const { reviews, role } = mockUser;

  // Filter to show only the 2 highest-rated reviews
  const topReviews = reviews
    .sort((a, b) => {
      // Sort by rating (descending), then by date (most recent first)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      y: -3,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    })
  };

  const getRatingColor = (rating) => {
    if (rating >= 5) return 'from-emerald-500 to-emerald-600';
    if (rating >= 4) return 'from-blue-500 to-blue-600';
    if (rating >= 3) return 'from-yellow-500 to-yellow-600';
    return 'from-gray-500 to-gray-600';
  };

  const getRatingBadge = (rating) => {
    if (rating >= 5) return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
    if (rating >= 4) return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
    if (rating >= 3) return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
    return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
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
            {role === 'student' ? (
              <>
                <BookOpen className="w-6 h-6 text-emerald-400" />
                Top Mentor Reviews
              </>
            ) : (
              <>
                <Users className="w-6 h-6 text-cyan-400" />
                Top Student Feedback
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {topReviews.map((review, index) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                custom={index}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative"
                >
                  <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                    {/* Decorative Border */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getRatingColor(review.rating)}`} />
                    
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
                          <AvatarImage src={review.reviewerAvatar} alt={review.reviewer} />
                          <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-semibold">
                            {review.reviewer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-slate-900 text-lg">
                                {review.reviewer}
                              </h4>
                              {review.subject && (
                                <Badge variant="outline" className="mt-1 text-xs bg-slate-50 text-slate-600">
                                  {review.subject}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <Badge className={`${getRatingBadge(review.rating)} border-0 shadow-sm`}>
                                {review.rating}.0
                              </Badge>
                            </div>
                          </div>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1 mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <motion.div
                                key={i}
                                variants={starVariants}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              </motion.div>
                            ))}
                          </div>

                          {/* Comment */}
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 w-6 h-6 text-slate-300" />
                            <p className="text-gray-700 leading-relaxed pl-6 italic">
                              "{review.comment}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewList;