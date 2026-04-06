/** @format */
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, User, PenLine, Home, Search, BookOpen } from 'lucide-react';
import { UserPlus, LogOut } from 'lucide-react';
import React from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const navLinkClasses =
  'font-sans text-sm font-medium text-on-surface-variant hover:text-primary px-3 py-2 tracking-editorial transition-colors';

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
    <header className='glass-nav sticky top-0 z-50'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left — Logo + Nav */}
          <div className='flex items-center gap-10'>
            {/* Logo */}
            <NavLink to='/'>
              <div className='flex items-center gap-2'>
                <span className='h-8 w-8 rounded-md gradient-editorial flex items-center justify-center'>
                  <BookOpen size={16} className='text-on-primary' />
                </span>
                <span className='font-serif text-lg font-bold text-on-surface'>
                  The Archive
                </span>
              </div>
            </NavLink>

            {/* Nav links */}
            <nav className='hidden md:flex items-center gap-1'>
              <NavLink
                to='/'
                end
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive
                      ? 'text-primary'
                      : ''
                  }`
                }>
                <div className='flex items-center gap-1.5'>
                  <Home size={14} /> Home
                </div>
              </NavLink>

              <NavLink
                to='/blog'
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive
                      ? 'text-primary'
                      : ''
                  }`
                }>
                <div className='flex items-center gap-1.5'>
                  <BookOpen size={14} /> Blog
                </div>
              </NavLink>

              {isAuth && (
                <NavLink
                  to='/publish'
                  className={({ isActive }) =>
                    `${navLinkClasses} ${
                      isActive
                        ? 'text-primary'
                        : ''
                    }`
                  }>
                  <div className='flex items-center gap-1.5'>
                    <PenLine size={14} /> Publish
                  </div>
                </NavLink>
              )}
            </nav>
          </div>

          {/* Right — search + notifications + profile */}
          <div className='flex items-center gap-3'>
            {/* SEARCH BAR */}
            <div className='relative w-56 hidden sm:block'>
              <div className='flex items-center gap-2 bg-surface-variant px-3 py-2 rounded-md border-b-2 border-outline-variant focus-within:border-primary transition-colors'>
                <Search size={14} className='text-on-surface-variant' />

                <input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='Search articles…'
                  className='w-full text-sm font-sans bg-transparent focus:outline-none text-on-surface placeholder:text-on-surface-variant/50'
                />
              </div>

              {query && results.length > 0 && (
                <div className='absolute z-50 mt-2 w-full rounded-xl bg-surface-container-lowest shadow-ambient overflow-hidden'>
                  {results.map((item) => (
                    <Link
                      key={item._id}
                      to={`/article/${item.slug}`}
                      className='block px-4 py-3 hover:bg-surface-container-low cursor-pointer transition-colors'
                      onClick={() => {
                        setResults([]);
                        setQuery('');
                      }}>
                      <p className='font-sans font-medium text-sm text-on-surface'>
                        {item.title}
                      </p>
                      <p className='font-sans text-xs text-on-surface-variant mt-0.5'>
                        {item.author?.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Notification */}
            <button className='rounded-md p-2 hover:bg-surface-container-low text-on-surface-variant transition-colors'>
              <Bell size={16} />
            </button>

            {/* Profile */}
            {isAuth ? (
              <NavLink
                to='/profile'
                className='flex items-center gap-2 rounded-md bg-surface-container-low p-1 pr-3 hover:bg-surface-container transition-colors'>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt='Profile'
                    className='h-7 w-7 rounded-md object-cover'
                  />
                ) : (
                  <div className='h-7 w-7 rounded-md gradient-editorial flex items-center justify-center'>
                    <User className='text-on-primary' size={14} />
                  </div>
                )}
                <span className='font-sans text-sm font-medium text-on-surface'>
                  Profile
                </span>
              </NavLink>
            ) : (
              ''
            )}

            {isAuth ? (
              <button
                onClick={handleLogout}
                className='flex items-center gap-1.5 font-sans text-sm text-tertiary hover:text-tertiary-container transition-colors'>
                <LogOut size={16} />
              </button>
            ) : (
              <NavLink
                to='/register'
                className={({ isActive }) =>
                  `flex items-center gap-1.5 font-sans text-sm font-medium ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface hover:text-primary'
                  } transition-colors`
                }>
                <UserPlus size={16} />
                Register
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
