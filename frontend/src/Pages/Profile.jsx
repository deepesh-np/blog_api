/** @format */

import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  FileText,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import api from '../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    avatarUrl: '',
  });

  // Articles state
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('published'); // 'published' or 'drafts'

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const meResponse = await api.get('/auth/me');
        const userId = meResponse.data.user.id;
        setUserId(userId);

        const userResponse = await api.get(`/user/${userId}`);
        setUser(userResponse.data);
        setEditForm({
          name: userResponse.data.name || '',
          bio: userResponse.data.bio || '',
          avatarUrl: userResponse.data.avatarUrl || '',
        });
      } catch (err) {
        setError('Failed to fetch profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchArticles();
    }
  }, [userId]);

  const fetchArticles = async () => {
    setArticlesLoading(true);
    try {
      const response = await api.get('/article/my-blogs');
      setArticles(response.data || []);
    } catch (err) {
      console.error('Failed to fetch articles', err);
    } finally {
      setArticlesLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form if canceling
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
        avatarUrl: user.avatarUrl || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put(`/user/${userId}`, editForm);
      setUser(response.data.user);
      setIsEditing(false);
      setError('');
    } catch (err) {
      console.error('Failed to update profile', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const publishedArticles = articles.filter((article) => article.isPublished);
  const draftArticles = articles.filter((article) => !article.isPublished);

  const displayedArticles =
    activeTab === 'published' ? publishedArticles : draftArticles;

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center'>
        <Loader2 className='animate-spin' size={36} />
      </div>
    );
  }

  if (error && !user) {
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
    <div className='min-h-screen bg-gray-900 text-gray-100 px-6 py-10'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Error message */}
        {error && user && (
          <div className='bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg'>
            {error}
          </div>
        )}

        {/* Profile Header */}
        <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
          <div className='flex items-start gap-6'>
            {/* Avatar */}
            <div className='flex-shrink-0'>
              {isEditing ? (
                <div className='space-y-2'>
                  <img
                    src={
                      editForm.avatarUrl ||
                      'https://pfpzone.com/wp-content/uploads/2025/08/default-pfp-3.webp'
                    }
                    alt='profile'
                    className='w-28 h-28 rounded-full border border-gray-700 object-cover'
                  />
                  <input
                    type='text'
                    name='avatarUrl'
                    value={editForm.avatarUrl}
                    onChange={handleInputChange}
                    placeholder='Avatar URL'
                    className='w-28 px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  />
                </div>
              ) : (
                <img
                  src={
                    user.avatarUrl ||
                    'https://pfpzone.com/wp-content/uploads/2025/08/default-pfp-3.webp'
                  }
                  alt='profile'
                  className='w-28 h-28 rounded-full border border-gray-700 object-cover'
                />
              )}
            </div>

            {/* User Info */}
            <div className='flex-1'>
              {isEditing ? (
                <div className='space-y-3'>
                  <input
                    type='text'
                    name='name'
                    value={editForm.name}
                    onChange={handleInputChange}
                    placeholder='Your name'
                    className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  />
                  <p className='text-gray-400'>@{user.username}</p>
                </div>
              ) : (
                <>
                  <h1 className='text-3xl font-semibold text-white'>
                    {user.name}
                  </h1>
                  <p className='text-gray-400'>@{user.username}</p>
                </>
              )}
            </div>

            {/* Edit/Save Buttons */}
            <div className='flex gap-2'>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 px-4 py-2 rounded-md transition'>
                    {saving ? (
                      <Loader2 className='animate-spin' size={16} />
                    ) : (
                      <Save size={16} />
                    )}
                    Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    disabled={saving}
                    className='flex items-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 px-4 py-2 rounded-md transition'>
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className='flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition'>
                  <Edit size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className='mt-6'>
            {isEditing ? (
              <div className='space-y-2'>
                <label className='text-sm text-gray-400'>Bio</label>
                <textarea
                  name='bio'
                  value={editForm.bio}
                  onChange={handleInputChange}
                  placeholder='Tell us about yourself...'
                  rows={4}
                  maxLength={500}
                  className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none'
                />
                <p className='text-xs text-gray-500'>
                  {editForm.bio.length}/500 characters
                </p>
              </div>
            ) : (
              user.bio && (
                <div>
                  <h2 className='text-sm text-gray-400 mb-2'>About</h2>
                  <p className='text-gray-300 leading-relaxed'>{user.bio}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* User Details Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-gray-800 p-5 rounded-lg space-y-2 border border-gray-700'>
            <div className='flex items-center gap-2 text-gray-400'>
              <User size={16} />
              Username
            </div>
            <p className='text-lg font-medium text-gray-100'>{user.username}</p>
          </div>

          <div className='bg-gray-800 p-5 rounded-lg space-y-2 border border-gray-700'>
            <div className='flex items-center gap-2 text-gray-400'>
              <Mail size={16} />
              Email
            </div>
            <p className='text-lg font-medium text-gray-100 break-all'>
              {user.email}
            </p>
          </div>

          <div className='bg-gray-800 p-5 rounded-lg space-y-2 border border-gray-700'>
            <div className='flex items-center gap-2 text-gray-400'>
              <Calendar size={16} />
              Joined
            </div>
            <p className='text-lg font-medium text-gray-100'>{joinDate}</p>
          </div>
        </div>

        {/* Articles Section */}
        <div className='bg-gray-800 rounded-lg border border-gray-700 overflow-hidden'>
          {/* Tabs */}
          <div className='flex border-b border-gray-700'>
            <button
              onClick={() => setActiveTab('published')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition ${
                activeTab === 'published'
                  ? 'bg-gray-700 text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-750'
              }`}>
              <Eye size={18} />
              Published ({publishedArticles.length})
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition ${
                activeTab === 'drafts'
                  ? 'bg-gray-700 text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-750'
              }`}>
              <EyeOff size={18} />
              Drafts ({draftArticles.length})
            </button>
          </div>

          {/* Articles List */}
          <div className='p-6'>
            {articlesLoading ? (
              <div className='flex justify-center py-8'>
                <Loader2 className='animate-spin text-gray-400' size={32} />
              </div>
            ) : displayedArticles.length === 0 ? (
              <div className='text-center py-12'>
                <FileText size={48} className='mx-auto text-gray-600 mb-3' />
                <p className='text-gray-400'>
                  No {activeTab === 'published' ? 'published' : 'draft'} articles
                  yet
                </p>
              </div>
            ) : (
              <div className='space-y-4'>
                {displayedArticles.map((article) => (
                  <a
                    key={article.slug}
                    href={`/article/${article.slug}`}
                    className='block p-4 bg-gray-750 hover:bg-gray-700 rounded-lg border border-gray-700 transition group'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-white group-hover:text-indigo-400 transition'>
                          {article.title}
                        </h3>
                        {article.subTitle && (
                          <p className='text-sm text-gray-400 mt-1 line-clamp-2'>
                            {article.subTitle}
                          </p>
                        )}
                        <div className='flex items-center gap-4 mt-3 text-xs text-gray-500'>
                          <span>
                            {new Date(article.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </span>
                          {article.isPublished && (
                            <span className='flex items-center gap-1'>
                              ❤️ {article.likesCount || 0} likes
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='ml-4'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.isPublished
                              ? 'bg-green-900/30 text-green-400 border border-green-700'
                              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                          }`}>
                          {article.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
