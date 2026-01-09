/** @format */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, User } from 'lucide-react';
import api from '../api/axios';
import MarkdownPreview from '../Components/MarkdownPreview';

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
    <div className='min-h-screen bg-white'>
      <article className='max-w-3xl mx-auto px-6 py-12'>
        <header className='mb-12 border-b pb-8'>
          <h1 className='text-5xl font-bold text-gray-900 mb-4'>
            {article.title}
          </h1>

          {article.bodyMarkdown.includes('###') && (
            <p className='text-xl text-gray-600 mb-6'>
              {article.bodyMarkdown.match(/### (.*)/)?.[1] || ''}
            </p>
          )}

          <div className='flex items-center gap-6 text-gray-600'>
            <div className='flex items-center gap-2'>
              <User size={16} />
              <span className='font-medium'>
                {article.author?.name || 'Anonymous'}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar size={16} />
              <span>{publishDate}</span>
            </div>
          </div>
        </header>

        <div
          className='prose prose-lg max-w-none
          prose-h2:text-4xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-lg prose-p:leading-8 prose-p:text-gray-700 prose-p:mb-6
          prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-blockquote:border-l-4 prose-blockquote:border-indigo-600 prose-blockquote:pl-6 prose-blockquote:italic
          prose-img:rounded-lg prose-img:shadow-lg'>
          <MarkdownPreview content={article.bodyMarkdown} />
        </div>
      </article>
    </div>
  );
};

export default Article;
