
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target } from 'lucide-react';
import { formatDate } from './components/projetcsDetails/utils/helpers';
import ProjectOverviewTab from './components/projetcsDetails/ProjectOverviewTab';
import ProjectTeamTab from './components/projetcsDetails/ProjectTeamTab';
import ProjectTasksTab from './components/projetcsDetails/ProjectTasksTab';
import ChatSidebar from './components/projetcsDetails/ChatSidebar';

// Mock data (you might move this to a separate `data/` folder or fetch from an API)
const mockProjectData = {
  id: 1,
  title: "E-commerce Website",
  description: "A comprehensive task management application that uses artificial intelligence to automatically prioritize tasks, predict completion times, and optimize workflow efficiency. The system includes real-time collaboration features, advanced analytics, and seamless integration with popular productivity tools.",
  mentor: {
    id: 1,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    experience: "8+ years"
  },
  students: [
    {
      id: 1,
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Full Stack Developer",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      role: "UI/UX Designer",
      joinDate: "2024-01-20"
    },
    {
      id: 3,
      name: "Michael Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "Backend Developer",
      joinDate: "2024-02-01"
    }
  ],
  score: 4.8,
  maxScore: 5,
  startDate: "2024-01-15",
  endDate: "2024-04-15",
  status: "In Progress",
  progress: 68,
  issues: [
    {
      id: 1,
      title: "Implement user authentication system",
      description: "Set up secure login/logout functionality with JWT tokens",
      status: "completed",
      assignee: "Alex Rodriguez",
      priority: "high",
      dueDate: "2024-02-15"
    },
    {
      id: 2,
      title: "Design responsive dashboard layout",
      description: "Create mobile-friendly dashboard with modern UI components",
      status: "in-progress",
      assignee: "Emily Johnson",
      priority: "medium",
      dueDate: "2024-03-01"
    },
    {
      id: 3,
      title: "Optimize database queries",
      description: "Improve performance of task retrieval and filtering operations",
      status: "todo",
      assignee: "Michael Kim",
      priority: "high",
      dueDate: "2024-03-15"
    },
    {
      id: 4,
      title: "Implement real-time notifications",
      description: "Add WebSocket support for instant task updates",
      status: "todo",
      assignee: "Alex Rodriguez",
      priority: "medium",
      dueDate: "2024-03-20"
    }
  ],
  technologies: ["React", "Node.js", "MongoDB", "Socket.io", "TensorFlow", "AWS"]
};

const mockChatMessages = [
  {
    id: 1,
    sender: "Dr. Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    message: "Great progress on the authentication system! The JWT implementation looks solid.",
    timestamp: "2024-03-10T10:30:00Z",
    isOwn: false
  },
  {
    id: 2,
    sender: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    message: "Thanks! I've also started working on the password reset functionality.",
    timestamp: "2024-03-10T10:32:00Z",
    isOwn: true
  },
  {
    id: 3,
    sender: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    message: "The new dashboard mockups are ready for review. Should I share them here?",
    timestamp: "2024-03-10T11:15:00Z",
    isOwn: false
  },
  {
    id: 4,
    sender: "Michael Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    message: "I've optimized the main queries. Performance improved by 40%!",
    timestamp: "2024-03-10T14:20:00Z",
    isOwn: false
  }
];


const ProjectDetailPage = () => {
  const [project, setProject] = useState(mockProjectData);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const chatEndRef = useRef(null);

  const handleCreateTask = (newTask) => {
    const task = {
      id: project.issues.length + 1,
      ...newTask,
      dueDate: new Date(newTask.dueDate).toISOString()
    };
    setProject(prev => ({
      ...prev,
      issues: [...prev.issues, task]
    }));
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        message: newMessage,
        timestamp: new Date().toISOString(),
        isOwn: true
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
                <motion.h1
                  className="text-4xl font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h1>
                <motion.div
                  className="flex items-center gap-4 text-blue-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span>{project.progress}% Complete</span>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {['overview', 'tasks', 'team'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-medium text-sm capitalize transition-all duration-200 border-b-2 ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && <ProjectOverviewTab project={project} />}
                  {activeTab === 'tasks' && (
                    <ProjectTasksTab
                      project={project}
                      handleCreateTask={handleCreateTask}
                    />
                  )}
                  {activeTab === 'team' && <ProjectTeamTab project={project} />}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <ChatSidebar
              chatMessages={chatMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              memberCount={project.students.length + 1}
              chatEndRef={chatEndRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;