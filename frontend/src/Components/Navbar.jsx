/** @format */
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Bell, User, PenLine, Home, Search } from 'lucide-react';
import { UserPlus, LogOut } from 'lucide-react';
import React from 'react';
import api from '../api/axios';

import { useAuth } from '../hooks/useAuth';

const navLinkClasses =
  'text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuth, checkAuth } = useAuth();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState(null);

  const debounceRef = React.useRef(null);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout failed, forcing redirect');
    } finally {
      await checkAuth();
      navigate('/logout');
    }
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
        console.log(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <header className='bg-white shadow-sm'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left — Logo + Nav */}
          <div className='flex items-center gap-10'>
            {/* Logo */}
            <NavLink to='/'>
              <div className='flex items-center gap-2'>
                <span className='h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold'>
                  B
                </span>
                <span className='text-lg font-semibold'>Blog App</span>
              </div>
            </NavLink>

            {/* Nav links */}
            <nav className='hidden md:flex items-center gap-2'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : ''
                  }`
                }>
                <div className='flex items-center gap-1'>
                  <Home size={16} /> Home
                </div>
              </NavLink>

              {isAuth && (
                <NavLink
                  to='/publish'
                  className={({ isActive }) =>
                    `${navLinkClasses} ${
                      isActive
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : ''
                    }`
                  }>
                  <div className='flex items-center gap-1'>
                    <PenLine size={16} /> Publish
                  </div>
                </NavLink>
              )}
            </nav>
          </div>

          {/* Right — search + notifications + profile */}
          <div className='flex items-center gap-4'>
            {/* SEARCH BAR */}
            <div className='relative w-64 hidden sm:block'>
              <div className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition'>
                <Search size={16} className='text-gray-400' />

                <input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='Search…'
                  className='w-full text-sm bg-transparent focus:outline-none'
                />
              </div>

              {/* Results dropdown */}
              {query && results.length > 0 && (
                <div className='absolute z-50 mt-2 w-full rounded-xl border bg-white shadow divide-y'>
                  {results.map((item) => (
                    <Link
                      key={item._id}
                      to={`/article/${item.slug}`}
                      className='block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer'
                      onClick={() => {
                        setResults([]);
                        setQuery('');
                      }}>
                      <p className='font-medium text-gray-900'>{item.title}</p>
                      <p className='text-xs text-gray-500'>
                        {item.author?.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Notification */}
            <button className='rounded-full p-2 hover:bg-gray-100 text-gray-500'>
              <Bell size={18} />
            </button>

            {/* Profile */}
            {isAuth? (<NavLink
              to='/profile'
              className='flex items-center gap-2 rounded-full bg-gray-200 p-1 pr-3'>
              <div className='h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center'>
                <User className='text-white' size={18} />
              </div>
              <span className='text-sm font-medium text-gray-700'>Profile</span>
            </NavLink>)
            :('') }
            
            {isAuth ? (
              <button
                onClick={handleLogout}
                className='flex gap-2 text-red-400 hover:text-red-300'>
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <NavLink
                to='/register'
                className={({ isActive }) =>
                  `flex gap-2 ${
                    isActive
                      ? 'text-indigo-500 font-semibold'
                      : 'text-gray-900 hover:text-gray-500'
                  }`
                }>
                <UserPlus size={18} />
                Register
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
