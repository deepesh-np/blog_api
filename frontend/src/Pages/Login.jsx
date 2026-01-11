/** @format */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { checkAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
      );
      await checkAuth();
      navigate('/profile');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-gray-200'>
        {/* Logo + Title */}
        <div className='text-center'>
          <img
            alt='Logo'
            src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
            className='mx-auto h-10 w-auto'
          />

          <h2 className='mt-6 text-2xl font-semibold text-gray-900'>
            Sign in to your account
          </h2>

          <p className='mt-2 text-sm text-gray-500'>
            Welcome back — continue where you left off
          </p>
        </div>

        {/* Form */}
        <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email address
            </label>

            <div className='mt-2 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3'>
              <Mail size={16} className='text-gray-400' />
              <input
                id='email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@example.com'
                className='w-full py-2 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none'
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className='flex items-center justify-between'>
              <label className='block text-sm font-medium text-gray-700'>
                Password
              </label>

              <a
                href='#'
                className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                Forgot?
              </a>
            </div>

            <div className='mt-2 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3'>
              <Lock size={16} className='text-gray-400' />
              <input
                id='password'
                type='password'
                required
                value={password}
                placeholder='••••••••'
                onChange={(e) => setPassword(e.target.value)}
                className='w-full py-2 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none'
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className='text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2'>
              {error}
            </div>
          )}

          {/* Button */}
          <button
            disabled={loading}
            type='submit'
            className={`w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition
              ${
                loading
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-indigo-500 active:bg-indigo-700'
              }
            `}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className='mt-6 text-center text-sm text-gray-600'>
          Don’t have an account?{' '}
          <Link
            to='/register'
            className='font-semibold text-indigo-600 hover:text-indigo-500'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
