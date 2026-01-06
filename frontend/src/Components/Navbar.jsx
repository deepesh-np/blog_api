import { NavLink } from "react-router-dom";
import { Bell, User, LogOut, PenLine, Home } from "lucide-react";

const navLinkClasses =
  "text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left — Logo + Nav */}
          <div className="flex items-center gap-10">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                B
              </span>
              <span className="text-lg font-semibold">Blog App</span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
                  }`
                }
              >
                <div className="flex items-center gap-1">
                  <Home size={16} /> Home
                </div>
              </NavLink>

              <NavLink
                to="/publish"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
                  }`
                }
              >
                <div className="flex items-center gap-1">
                  <PenLine size={16} /> Publish
                </div>
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
                  }`
                }
              >
                Registration
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/logout"
                className={navLinkClasses}
              >
                <div className="flex items-center gap-1">
                  <LogOut size={16} /> Logout
                </div>
              </NavLink>
            </nav>
          </div>

          {/* Right — notifications + profile */}
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-gray-100 text-gray-500">
              <Bell size={18} />
            </button>

            <NavLink
              to="/profile"
              className="flex items-center gap-2 rounded-full bg-gray-200 p-1 pr-3"
            >
              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                <User className="text-white" size={18} />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Profile
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
