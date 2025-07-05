import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
// Update paths as needed
import userData from '../data/user.json'; // Load users array
import ProfileHeader from './components/profile/ProfileHeader';
import SkillBadgeList from './components/profile/SkillBadgeList';
import GithubStatsCard from './components/profile/GithubStatsCard';
import LearningPlan from './components/profile/LearningPlan';
import ProjectsTimeline from './components/profile/ProjectsTimeline';
import MentorStats from './components/profile/MentorStats';
import ReviewList from './components/profile/ReviewList';
import CertificationsList from './components/profile/CertificationsList';
import EditProfileForm from './components/profile/EditProfileForm';


// Preload users by role from JSON
const initialUserMap = {
  student: userData.users.find((u) => u.role === 'student'),
  mentor: userData.users.find((u) => u.role === 'mentor')
};

const Profile = () => {
  const [currentUser, setCurrentUser] = useState('student'); // 'student' or 'mentor'
  const [isEditing, setIsEditing] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userMap, setUserMap] = useState(initialUserMap);

  const user = userMap[currentUser];
  const isOwnProfile = true;

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSaveProfile = (updatedUser) => {
    setUserMap((prev) => ({
      ...prev,
      [currentUser]: updatedUser
    }));
    setShowEditForm(false);
  };

  const handleSkillsChange = (newSkills) => {
    setUserMap((prev) => ({
      ...prev,
      [currentUser]: { ...prev[currentUser], skills: newSkills }
    }));
  };

  const handleLearningPlanChange = (newPlan) => {
    setUserMap((prev) => ({
      ...prev,
      [currentUser]: { ...prev[currentUser], learningPlan: newPlan }
    }));
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-10"
      >

        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto p-4 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ProfileHeader
                user={user}
                isEditing={isEditing}
                onEdit={() => setShowEditForm(true)}
                isOwnProfile={isOwnProfile}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="transform hover:scale-[1.01] transition-transform duration-300"
                >
                  <SkillBadgeList
                    skills={user.skills}
                    isEditing={isEditing}
                    onSkillsChange={handleSkillsChange}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="transform hover:scale-[1.01] transition-transform duration-300"
                >
                  <GithubStatsCard
                    githubStats={user.githubStats}
                    githubUsername={user.githubUsername}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="transform hover:scale-[1.01] transition-transform duration-300"
                >
                  <ProjectsTimeline projects={user.projects} userRole={user.role} />
                </motion.div>

                {user.role === 'student' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="transform hover:scale-[1.01] transition-transform duration-300"
                  >
                    <LearningPlan
                      learningPlan={user.learningPlan}
                      isEditing={isEditing}
                      onPlanChange={handleLearningPlanChange}
                    />
                  </motion.div>
                )}
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {user.role === 'mentor' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="transform hover:scale-[1.01] transition-transform duration-300"
                  >
                    <MentorStats user={user} />
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="transform hover:scale-[1.01] transition-transform duration-300"
                >
                  <ReviewList reviews={user.reviews} userRole={user.role} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="transform hover:scale-[1.01] transition-transform duration-300"
                >
                  <CertificationsList certifications={user.certifications} isEditing={isEditing} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showEditForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20"
              >
                <EditProfileForm
                  user={user}
                  onSave={handleSaveProfile}
                  onCancel={() => setShowEditForm(false)}
                  className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Profile;