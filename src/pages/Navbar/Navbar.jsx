import { useState } from "react";
import { FaBars, FaUser, FaChalkboardTeacher, FaTasks } from "react-icons/fa";
import { MdDashboard, MdClose } from "react-icons/md";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function Navbar({ username, profilePhoto }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white w-full fixed top-0 left-0 px-6 py-4 shadow-md z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <span className="text-blue-400 text-2xl font-bold">SkillConnect</span>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdClose /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full bg-black md:w-auto md:flex md:items-center gap-6 text-lg font-semibold shadow-md md:shadow-none ${
            isOpen ? "flex flex-col py-4" : "hidden md:flex"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 px-6 py-2 hover:text-blue-400">
            <MdDashboard /> Dashboard
          </Link>
          <Link to="/profile" className="flex items-center gap-2 px-6 py-2 hover:text-blue-400">
            <FaUser /> Profile
          </Link>
          <Link to="/mentor" className="flex items-center gap-2 px-6 py-2 hover:text-blue-400">
            <FaChalkboardTeacher /> Mentor
          </Link>
          <Link to="/projects" className="flex items-center gap-2 px-6 py-2 hover:text-blue-400">
            <FaTasks /> Projects
          </Link>
        </div>

        {/* User Profile */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm font-medium">{username}</span>
          <Avatar>
            <AvatarImage src={profilePhoto} />
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
