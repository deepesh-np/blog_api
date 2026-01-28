import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { User, Send } from 'lucide-react';

const CommentSection = ({ slug }) => {
  const { user, isAuth } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/article/slug/${slug}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to fetch comments', err);
      // Don't show error for empty comments, just log it
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuth) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post(`/article/slug/${slug}/comments`, {
        content: newComment
      });
      // Add new comment to list immediately
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment', err);
      setError('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="mb-10">
        {isAuth ? (
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                {user?.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User size={20} />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a public comment..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none min-h-[100px]"
                />
                <div className="flex justify-between items-center mt-2">
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                    className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                  >
                    {submitting ? 'Posting...' : (
                      <>
                        Comment <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">
            Please <a href="/login" className="text-indigo-600 font-medium hover:underline">log in</a> to leave a comment.
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-4 group">
              <div className="flex-shrink-0">
                {comment.author?.avatarUrl ? (
                  <img 
                    src={comment.author.avatarUrl} 
                    alt={comment.author.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <User size={20} />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {comment.author?.username || 'Anonymous'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
