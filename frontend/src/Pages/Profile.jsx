/** @format */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Edit,
  Calendar,
  Mail,
  Eye,
  EyeOff,
  FileText,
  Loader2,
} from 'lucide-react';
import api from '../api/axios';

const DEFAULT_AVATAR =
  'https://pfpzone.com/wp-content/uploads/2025/08/default-pfp-3.webp';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    avatarUrl: '',
  });

  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('published');

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const meRes = await api.get('/auth/me');
        const id = meRes.data.user.id;
        setUserId(id);

        const userRes = await api.get(`/user/${id}`);
        setUser(userRes.data);
        setEditForm({
          name: userRes.data.name || '',
          bio: userRes.data.bio || '',
          avatarUrl: userRes.data.avatarUrl || '',
        });
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  /* ================= FETCH ARTICLES ================= */
  useEffect(() => {
    if (!userId) return;

    const fetchArticles = async () => {
      setArticlesLoading(true);
      try {
        const res = await api.get('/article/my-blogs');
        setArticles(res.data || []);
      } finally {
        setArticlesLoading(false);
      }
    };

    fetchArticles();
  }, [userId]);

  /* ================= HANDLERS ================= */
  const handleEditToggle = () => {
    if (isEditing && user) {
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
        avatarUrl: user.avatarUrl || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editForm.name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setSaving(true);
    try {
      const res = await api.put(`/user/${userId}`, editForm);
      setUser(res.data.user);
      setIsEditing(false);
      setError('');
    } catch {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  /* ================= DERIVED ================= */
  const publishedArticles = articles.filter((a) => a.isPublished);
  const draftArticles = articles.filter((a) => !a.isPublished);
  const displayedArticles =
    activeTab === 'published' ? publishedArticles : draftArticles;

  const joinDate = user
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    : '';

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {error && (
          <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* ================= PROFILE HEADER ================= */}
        <section className="flex gap-10">
          <img
            src={(isEditing ? editForm.avatarUrl : user.avatarUrl) || DEFAULT_AVATAR}
            onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
            className="w-28 h-28 rounded-full object-cover border"
            alt="profile"
          />

          <div className="flex-1 space-y-6">

            {/* ACTION BAR */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-500">@{user.username}</p>
              </div>

              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    onClick={handleEditToggle}
                    disabled={saving}
                    className="px-4 py-2 text-sm rounded-full border hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border bg-white hover:bg-gray-100"
                >
                  <Edit size={16} />
                  Edit profile
                </button>
              )}
            </div>

            {/* ================= EDIT FORM ================= */}
            {isEditing ? (
              <div className="space-y-6 max-w-xl">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display name
                  </label>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* BIO */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    placeholder="Tell people a little about yourself"
                    className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {editForm.bio.length}/500 characters
                  </p>
                </div>

                {/* AVATAR URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar image URL
                  </label>
                  <input
                    name="avatarUrl"
                    value={editForm.avatarUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste a publicly accessible image URL
                  </p>
                </div>
              </div>
            ) : (
              <>
                {user.bio && (
                  <p className="max-w-2xl text-gray-600 leading-relaxed">
                    {user.bio}
                  </p>
                )}

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Joined {joinDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {user.email}
                  </span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ================= ARTICLES ================= */}
        <section>
          <div className="flex gap-8 border-b mb-6">
            <button
              onClick={() => setActiveTab('published')}
              className={`pb-3 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'published'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye size={16} />
              Published
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`pb-3 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'drafts'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <EyeOff size={16} />
              Drafts
            </button>
          </div>

          {articlesLoading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-gray-400" size={28} />
            </div>
          ) : displayedArticles.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <FileText size={40} className="mx-auto mb-3 opacity-40" />
              No articles yet
            </div>
          ) : (
            <div className="divide-y">
              {displayedArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/article/${article.slug}`}
                  className="block py-6 hover:bg-gray-50 transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {article.title}
                  </h3>
                  {article.subTitle && (
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {article.subTitle}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
