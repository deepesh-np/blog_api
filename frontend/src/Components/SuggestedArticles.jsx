import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import api from '../api/axios';

const SuggestedArticles = ({ currentSlug }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/article/published');
        const filtered = res.data
          .filter((a) => a.slug !== currentSlug)
          .slice(0, 5);
        setArticles(filtered);
      } catch (err) {
        console.error('Failed to fetch suggested articles', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentSlug]);

  if (loading) return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;
  if (articles.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
        Latest Articles
      </h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link 
            key={article.slug} 
            to={`/article/${article.slug}`}
            className="group block p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
          >
            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2 leading-snug">
              {article.title}
            </h4>
            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <User size={10} />
                </div>
                <span>{article.author?.username || 'Writer'}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <span>
                  {new Date(article.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedArticles;
