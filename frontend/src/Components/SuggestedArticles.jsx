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
        // Filter out current article and limit to 5 suggestions
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
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Articles</h3>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link 
            key={article.slug} 
            to={`/article/slug/${article.slug}`}
            className="group block"
          >
            <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
              {article.title}
            </h4>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{article.author?.username || 'Writer'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
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
