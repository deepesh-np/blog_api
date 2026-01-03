import { Link } from "react-router-dom";
import React from "react";
import { Home, User, LogIn, UserPlus, PenSquare } from "lucide-react";

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;