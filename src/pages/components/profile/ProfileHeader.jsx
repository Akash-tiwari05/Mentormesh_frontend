import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BookOpen,
  Users,
  Star,
  MapPin,
  Mail,
  TrendingUp,
  Edit,
  Share2
} from 'lucide-react';

const ProfileHeader = ({ user, isEditing, onEdit, isOwnProfile }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-8"
    >
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10" />
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400" />
          
          <CardContent className="p-8 relative">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar Section */}
              <motion.div variants={avatarVariants} className="relative">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl ring-4 ring-white/10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Role Icon */}
                  <motion.div 
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {user.role === 'student' ? (
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Users className="w-5 h-5 text-cyan-600" />
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* User Information */}
              <div className="flex-1 text-center lg:text-left text-white">
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      {user.name}
                    </h1>
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <Badge 
                        variant="secondary" 
                        className={`px-4 py-2 text-white border-0 shadow-lg ${
                          user.role === 'student' 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                            : 'bg-gradient-to-r from-cyan-500 to-cyan-600'
                        }`}
                      >
                        {user.role === 'student' ? 'Student' : 'Mentor'}
                      </Badge>
                      <motion.div 
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-white">{user.karma}</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <motion.p 
                  variants={itemVariants}
                  className="text-lg text-gray-200 mb-6 max-w-2xl"
                >
                  {user.bio}
                </motion.p>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-6 text-sm text-gray-300"
                >
                  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>{user.email}</span>
                  </div>
                  {user.role === 'mentor' && user.experience && (
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span>{user.experience}</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Action Buttons */}
              {isOwnProfile && (
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-3"
                >
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      onClick={onEdit}
                      className="bg-white text-slate-900 hover:bg-gray-100 shadow-lg font-medium"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </motion.div>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:text-white shadow-lg backdrop-blur-sm"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileHeader;