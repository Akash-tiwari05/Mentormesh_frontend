import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import Mentor from "./pages/MentorPage";
import userData from "./data/user.json";

import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import StudentDashboard from "./pages/StudentDashboard";



function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar username={userData.username} profilePhoto={userData.profilePhoto} />
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
