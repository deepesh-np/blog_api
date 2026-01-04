import { Link, useNavigate } from "react-router-dom";
import React from "react";
import api from "../api/axios";
import { Home, User, LogIn, UserPlus, PenSquare, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout failed, forcing redirect");
    } finally {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <Link to="/" className="flex gap-2">
        <Home size={18} /> Home
      </Link>

      <Link to="/profile" className="flex gap-2">
        <User size={18} /> Profile
      </Link>

      <Link to="/publish" className="flex gap-2">
        <PenSquare size={18} /> Publish
      </Link>

      <Link to="/login" className="flex gap-2">
        <LogIn size={18} /> Login
      </Link>

      <Link to="/register" className="flex gap-2">
        <UserPlus size={18} /> Register
      </Link>

      <button
        onClick={handleLogout}
        className="flex gap-2 text-red-400 hover:text-red-300"
      >
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
