/** @format */

import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Edit } from 'lucide-react';
import api from '../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const meResponse = await api.get('/auth/me');
        const userId = meResponse.data.user.id;

        const userResponse = await api.get(`/user/${userId}`);
        setUser(userResponse.data);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center'>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center'>
        <p className='text-red-400'>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center'>
        <p>User not found</p>
      </div>
    );
  }

  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-10">
  <div className="max-w-4xl mx-auto space-y-8">

    <div className="flex items-center gap-6">
      <img
        src={user.avatarUrl}
        alt="profile"
        className="w-28 h-28 rounded-full border border-gray-700 object-cover"
      />

      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-white">{user.name}</h1>
        <p className="text-gray-400">@{user.username}</p>
      </div>

      <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition">
        <Edit size={16} />
        Edit Profile
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-5 rounded-lg space-y-2 border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400">
          <User size={16} />
          Username
        </div>
        <p className="text-lg font-medium text-gray-100">{user.username}</p>
      </div>

      <div className="bg-gray-800 p-5 rounded-lg space-y-2 border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400">
          <Mail size={16} />
          Email
        </div>
        <p className="text-lg font-medium text-gray-100 break-all">
          {user.email}
        </p>
      </div>

      <div className="bg-gray-800 p-5 rounded-lg space-y-2 border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          Joined
        </div>
        <p className="text-lg font-medium text-gray-100">{joinDate}</p>
      </div>
    </div>

    {user.bio && (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-3 text-white">About</h2>
        <p className="text-gray-300 leading-relaxed">{user.bio}</p>
      </div>
    )}
  </div>
</div>
  );
};

export default Profile;
