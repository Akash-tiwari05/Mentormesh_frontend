
import React, { useState, useEffect } from 'react';
import ProfileHeader from './components/studentdashboard/ProfileHeader';
import StatsCards from './components/studentdashboard/StatsCards';
import ProgressChart from './components/studentdashboard/ProgressChart';
import RecentProjects from './components/studentdashboard/RecentProjects';
import MentorsSection from './components/studentdashboard/MentorsSection';
import AchievementSection from './components/studentdashboard/AchievementSection';


// Mock data - simulating backend API response
const mockStudentData = {
  profile: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "/api/placeholder/100/100", // Placeholder for an avatar image
    enrollmentDate: "2024-01-15",
    currentStreak: 12,
    totalScore: 847,
    level: "Intermediate"
  },
  stats: {
    projectsCompleted: 8,
    totalProjects: 12,
    overallScore: 847,
    maxScore: 1000,
    averageScore: 85.2,
    studyHours: 156,
    certificates: 3
  },
  recentProjects: [
    {
      id: 1,
      title: "E-commerce Website",
      score: 92,
      maxScore: 100,
      status: "completed",
      completedDate: "2024-06-15",
      technology: "React, Node.js",
      mentor: "Sarah Wilson"
    },
    {
      id: 2,
      title: "Mobile App UI/UX",
      score: 88,
      maxScore: 100,
      status: "completed",
      completedDate: "2024-06-10",
      technology: "Figma, Flutter",
      mentor: "Mike Chen"
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      score: 0, // In-progress project has 0 score initially
      maxScore: 100,
      status: "in-progress",
      completedDate: null,
      technology: "Python, Django",
      mentor: "Emily Davis"
    },
    {
      id: 4,
      title: "API Development",
      score: 95,
      maxScore: 100,
      status: "completed",
      completedDate: "2024-06-01",
      technology: "Express.js, MongoDB",
      mentor: "James Rodriguez"
    }
  ],
  mentors: [
    {
      id: 1,
      name: "Sarah Wilson",
      expertise: "Frontend Development",
      rating: 4.9,
      sessions: 15,
      avatar: "/api/placeholder/50/50" // Placeholder for mentor avatar
    },
    {
      id: 2,
      name: "Mike Chen",
      expertise: "UI/UX Design",
      rating: 4.8,
      sessions: 12,
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 3,
      name: "Emily Davis",
      expertise: "Data Science",
      rating: 4.7,
      sessions: 8,
      avatar: "/api/placeholder/50/50"
    }
  ],
  weeklyProgress: [
    { day: "Mon", projects: 2, score: 85 },
    { day: "Tue", projects: 1, score: 90 },
    { day: "Wed", projects: 3, score: 78 },
    { day: "Thu", projects: 2, score: 92 },
    { day: "Fri", projects: 1, score: 88 },
    { day: "Sat", projects: 0, score: 0 },
    { day: "Sun", projects: 1, score: 94 }
  ]
};

/**
 * App Component (Student Dashboard)
 * This is the main component that orchestrates the entire student dashboard.
 * It fetches mock data and renders various sub-components to display student information.
 */
const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous API call to fetch student data
    setTimeout(() => {
      setData(mockStudentData);
      setLoading(false);
    }, 1000); // Simulate 1 second loading time
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-inter">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Render the dashboard once data is loaded
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 font-inter pt-15">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header Section */}
        <ProfileHeader profile={data.profile} />

        {/* Statistics Cards Section */}
        <StatsCards stats={data.stats} />

        {/* Charts and Recent Projects Section (arranged in a grid for larger screens) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ProgressChart data={data.weeklyProgress} stats={data.stats} />
          <RecentProjects projects={data.recentProjects} />
        </div>

        {/* Mentors and Achievements Section (arranged in a grid for larger screens) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MentorsSection mentors={data.mentors} />
          <AchievementSection stats={data.stats} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
