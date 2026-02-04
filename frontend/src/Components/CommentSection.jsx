import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { User, Send, MessageSquare, Clock } from 'lucide-react';

const CommentSection = ({ slug }) => {
  const { user, isAuth } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/article/slug/${slug}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to fetch comments', err);
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
      setComments([res.data, ...comments]);
      setNewComment('');
      setIsFocused(false);
    } catch (err) {
      console.error('Failed to post comment', err);
      setError('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 604800;
    if (interval > 1) return Math.floor(interval) + " weeks ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-bold text-gray-900">
          Comments
        </h3>
        <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-sm font-medium">
          {comments.length}
        </span>
      </div>

      <div className="mb-12">
        {isAuth ? (
          <form onSubmit={handleSubmit} className="flex gap-4">
             <div className="flex-shrink-0">
                {user?.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                    <span className="font-bold text-sm">{user.username?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-indigo-100 rounded-xl' : ''}`}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Add a responsive comment..."
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors min-h-[100px] text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white resize-y"
                  />
                  
                  {isFocused && (
                    <div className="flex justify-between items-center mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                      {error ? (
                        <p className="text-red-500 text-sm">{error}</p>
                      ) : <div></div>}
                      
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsFocused(false);
                            setNewComment('');
                          }}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium transition-colors text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting || !newComment.trim()}
                          className="px-5 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md hover:shadow-lg text-sm"
                        >
                          {submitting ? 'Posting...' : (
                            <>
                              Comment
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
          </form>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl flex items-center justify-between group hover:border-indigo-200 transition-colors">
            <div className='flex items-center gap-4'>
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <p className="text-gray-700 font-medium">Join the discussion</p>
            </div>
            <a 
              href="/login" 
              className="px-5 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm"
            >
              Log in now
            </a>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
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
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                    {comment.author?.username?.charAt(0).toUpperCase() || 'A'}
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-gray-900 text-sm">
                    {comment.author?.username || 'Anonymous'}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-wrap">
                  {comment.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                   {/* Placeholder for future like/reply features */}
                   <button className="text-xs text-gray-500 font-semibold hover:text-indigo-600 transition-colors">
                     Reply
                   </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
             <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
             <p className="text-gray-500 font-medium">No comments yet</p>
             <p className="text-sm text-gray-400">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
