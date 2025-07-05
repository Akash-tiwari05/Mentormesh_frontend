import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AnimatedBackground from './components/projects/AnimatedBackground';
import PageHeader from './components/projects/PageHeader';
import SearchInput from './components/projects/SearchInput';
import ProjectFilterBar from './components/projects/ProjectFilterBar';
import ProjectCountDisplay from './components/projects/ProjectCountDisplay';
import ProjectGrid from './components/projects/ProjectGrid';

// Import all the separated components


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  // Simulate fetching from backend
  useEffect(() => {
    const fetchProjects = async () => {
      // Mock data - replace with your actual data source
      const mockProjects = [
        
          {
            id: 1,
            title: "E-commerce Platform",
            description: "Build a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
            skills: ["React", "Node.js", "MongoDB", "Stripe"],
            duration: "2-4 weeks",
            difficulty: "Medium",
            mentor: "Alice Johnson"
          },
          {
            id: 2,
            title: "Weather App",
            description: "Create a beautiful weather application with real-time data, location services, and animated UI components.",
            skills: ["React", "API Integration", "CSS"],
            duration: "1-2 weeks",
            difficulty: "Easy",
            mentor: "Bob Williams"
          },
          {
            id: 3,
            title: "Task Management System",
            description: "Develop a comprehensive task management system with team collaboration features, real-time updates, and advanced filtering options.",
            skills: ["React", "Firebase", "TypeScript"],
            duration: "3+ months",
            difficulty: "Hard",
            mentor: "Charlie Brown"
          },
          {
            id: 4,
            title: "Personal Blog Site",
            description: "Design and develop a responsive personal blog site with a content management system (CMS) integration and SEO optimization.",
            skills: ["Next.js", "GraphQL", "Strapi", "Tailwind CSS"],
            duration: "2-4 weeks",
            difficulty: "Medium",
            mentor: "Diana Prince"
          },
          {
            id: 5,
            title: "Mobile Game Development",
            description: "Build a simple 2D mobile game (e.g., a puzzle or endless runner) using React Native and a game engine library.",
            skills: ["React Native", "Expo", "Game Development", "JavaScript"],
            duration: "1-2 months",
            difficulty: "Hard",
            mentor: "Eve Adams"
          },
          {
            id: 6,
            title: "Recipe Finder Web App",
            description: "Develop a web application that allows users to search for recipes based on ingredients, dietary restrictions, and cuisine type, using a public recipe API.",
            skills: ["Vue.js", "Axios", "REST API", "HTML/CSS"],
            duration: "1-2 weeks",
            difficulty: "Easy",
            mentor: "Frank Miller"
          },
          {
            id: 7,
            title: "Real-time Chat Application",
            description: "Implement a real-time chat application with user authentication, private messaging, and group chat functionalities using WebSockets.",
            skills: ["Socket.IO", "Express.js", "React", "WebSockets"],
            duration: "2-4 weeks",
            difficulty: "Medium",
            mentor: "Grace Hopper"
          },
          {
            id: 8,
            title: "Data Visualization Dashboard",
            description: "Create an interactive dashboard to visualize complex datasets using D3.js or Chart.js, with dynamic filtering and drill-down capabilities.",
            skills: ["D3.js", "Chart.js", "Data Analysis", "JavaScript"],
            duration: "1-2 months",
            difficulty: "Hard",
            mentor: "Harry Potter"
          }
      ];
      
      setProjects(mockProjects);
    };
    fetchProjects();
  }, []);

  // Memoize filtered projects to prevent unnecessary re-renders
  const filteredProjects = useMemo(() => {
    let result = projects;

    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (skillFilter) {
      result = result.filter(p => p.skills.includes(skillFilter));
    }

    if (durationFilter) {
      result = result.filter(p => p.duration === durationFilter);
    }

    if (difficultyFilter) {
      result = result.filter(p => p.difficulty === difficultyFilter);
    }

    return result;
  }, [searchTerm, skillFilter, durationFilter, difficultyFilter, projects]);

  // Memoize onApply callback for performance
  const handleApply = useCallback((projectId) => {
    alert(`Applied to project ${projectId}`);
  }, []);

  // Extract unique skills for filter dropdown, memoized
  const allSkills = useMemo(() => {
    return [...new Set(projects.flatMap(p => p.skills))];
  }, [projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br pt-15 from-purple-50 via-blue-50 to-indigo-100">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto p-4 pt-7 max-w-7xl">
        <PageHeader />
        
        <SearchInput onSearchChange={setSearchTerm} />
        
        <ProjectFilterBar
          skills={allSkills}
          onSkillChange={(e) => setSkillFilter(e.target.value)}
          onDurationChange={(e) => setDurationFilter(e.target.value)}
          onDifficultyChange={(e) => setDifficultyFilter(e.target.value)}
        />

        <ProjectCountDisplay count={filteredProjects.length} />

        <ProjectGrid projects={filteredProjects} onApply={handleApply} />
      </div>
    </div>
  );
};

export default Projects;