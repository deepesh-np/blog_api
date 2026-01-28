/** @format */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, User } from 'lucide-react';
import api from '../api/axios';
import MarkdownPreview from '../Components/MarkdownPreview';
import CommentSection from '../Components/CommentSection';
import SuggestedArticles from '../Components/SuggestedArticles';

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/article/slug/${slug}`);
        setArticle(res.data);
      } catch (err) {
        setError('Article not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <p className='text-gray-500'>Loading…</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <p className='text-red-500'>{error || 'Article not found'}</p>
      </div>
    );
  }

  const publishDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <article className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <header className='mb-8 border-b pb-8'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
                  {article.title}
                </h1>

                {article.subTitle && (
                   <p className="text-xl text-gray-600 mb-6 font-medium">
                     {article.subTitle}
                   </p>
                )}

                <div className='flex items-center gap-6 text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <User size={18} />
                    <span className='font-medium'>
                      {article.author?.name || 'Anonymous'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar size={18} />
                    <span>{publishDate}</span>
                  </div>
                </div>
              </header>

              <div
                className='prose prose-lg max-w-none
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-lg prose-p:leading-8 prose-p:text-gray-700 prose-p:mb-6
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-600 prose-blockquote:pl-6 prose-blockquote:italic
                prose-img:rounded-lg prose-img:shadow-lg'>
                <MarkdownPreview content={article.bodyMarkdown} />
              </div>
            </div>

            <CommentSection slug={slug} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SuggestedArticles currentSlug={slug} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Article;
