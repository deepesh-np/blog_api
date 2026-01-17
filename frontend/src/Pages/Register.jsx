/** @format */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name,
        username,
        email,
        password,
      });

      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
      }

      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-xl bg-surface p-8 shadow-lg border border-border">
        {/* Header */}
        <div className="text-center">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />

          <h2 className="mt-6 text-2xl font-bold text-text">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-text/60">
            Join us — it only takes a minute.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-text placeholder-text/40 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-text placeholder-text/40 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              placeholder="johndoe123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-text placeholder-text/40 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-text placeholder-text/40 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary py-2.5 font-semibold text-white hover:bg-primary/90 transition focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text/70">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
