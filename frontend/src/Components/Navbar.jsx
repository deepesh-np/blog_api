/** @format */
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, User, PenLine, Home, Search } from 'lucide-react';
import { UserPlus, LogOut } from 'lucide-react';
import React from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Button from './Theme.jsx';

const navLinkClasses =
  'text-sm font-medium text-text/70 hover:text-text px-3 py-2';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuth, logout, user } = useAuth();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const debounceRef = React.useRef(null);
  const userAvatar = user?.avatarUrl;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (value) => {
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const trimmed = value.trim();
      if (!trimmed) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(
          `/article/search?q=${encodeURIComponent(trimmed)}`
        );
        setResults(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <header className="bg-bg shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left — Logo + Nav */}
          <div className="flex items-center gap-10">
            <NavLink to="/">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  B
                </span>
                <span className="text-lg font-semibold text-text">
                  Blog App
                </span>
              </div>
            </NavLink>

            <nav className="hidden md:flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : ''
                  }`
                }
              >
                <div className="flex items-center gap-1">
                  <Home size={16} /> Home
                </div>
              </NavLink>

              {isAuth && (
                <NavLink
                  to="/publish"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${
                      isActive
                        ? 'text-primary border-b-2 border-primary'
                        : ''
                    }`
                  }
                >
                  <div className="flex items-center gap-1">
                    <PenLine size={16} /> Publish
                  </div>
                </NavLink>
              )}
            </nav>
          </div>

          {/* Right — search + notifications + profile */}
          <div className="flex items-center gap-4">
            {/* SEARCH BAR */}
            <div className="relative w-64 hidden sm:block">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 transition">
                <Search size={16} className="text-text/50" />

                <input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search…"
                  className="w-full text-sm bg-transparent text-text focus:outline-none"
                />
              </div>

              {query && results.length > 0 && (
                <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-surface shadow divide-y divide-border">
                  {results.map((item) => (
                    <Link
                      key={item._id}
                      to={`/article/${item.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-surface/80 cursor-pointer"
                      onClick={() => {
                        setResults([]);
                        setQuery('');
                      }}
                    >
                      <p className="font-medium text-text">{item.title}</p>
                      <p className="text-xs text-text/60">
                        {item.author?.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Notification */}
            <button className="rounded-full p-2 hover:bg-surface text-text/60">
              <Bell size={18} />
            </button>

            {/* Profile */}
            {isAuth ? (
              <NavLink
                to="/profile"
                className="flex items-center gap-2 rounded-full bg-surface p-1 pr-3 hover:bg-surface/80 transition"
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-border flex items-center justify-center">
                    <User className="text-text" size={18} />
                  </div>
                )}
                <span className="text-sm font-medium text-text">
                  Profile
                </span>
              </NavLink>
            ) : null}

            {isAuth ? (
              <button
                onClick={handleLogout}
                className="flex gap-2 text-red-400 hover:text-red-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `flex gap-2 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-text hover:text-text/70'
                  }`
                }
              >
                <UserPlus size={18} />
                Register
              </NavLink>
            )}

            <Button />
          </div>
        </div>
      </div>
    </header>
  );
}
