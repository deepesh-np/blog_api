/** @format */

import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Heart, Loader2 } from 'lucide-react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/article/published');
        setArticles(res.data || []);
      } catch (err) {
        console.error('Failed to fetch', err);
        setError('Could not load articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return (
      <p className='text-center text-gray-500 mt-10'>
        <Loader2 className='animate-spin mx-auto' size={36} />
      </p>
    );

  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>;

  return (
    <div className='bg-bg py-20 min-h-screen'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {/* heading */}
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-4xl font-bold tracking-tight text-text sm:text-5xl'>
            Published Blogs
          </h2>

          <p className='mt-2 text-lg text-text/70'>
            Latest posts from our writers.
          </p>
        </div>

        {/* grid */}
        <div
          className='mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-14 
          border-t border-border pt-10 sm:mt-16 sm:pt-16 
          lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {articles.length === 0 && (
            <p className='text-text/60'>No published articles yet.</p>
          )}

          {articles.map((article) => (
            <article
              key={article.slug}
              className='flex max-w-xl flex-col rounded-2xl border border-border bg-surface shadow-sm hover:shadow-md transition p-6'>
              {/* date + tag */}
              <div className='flex items-center gap-x-4 text-xs'>
                <time className='text-text/60'>
                  {article.createdAt ? article.createdAt.slice(0, 10) : '—'}
                </time>

                <span className='rounded-full bg-primary/20 px-3 py-1.5 text-primary font-medium'>
                  Blog
                </span>
              </div>

              {/* title + desc */}
              <div className='group relative grow'>
                <h3 className='mt-3 text-lg font-semibold text-text group-hover:text-primary'>
                  <a href={`/article/${article.slug}`}>
                    <span className='absolute inset-0' />
                    {article.title}
                  </a>
                </h3>

                <p className='mt-4 line-clamp-3 text-sm text-text/60'>
                  {article.subTitle || ''}
                </p>
              </div>

              {/* author + likes */}
              <div className='mt-8 flex items-center gap-x-4'>
                <img
                  src={
                    article?.author?.avatarUrl ||
                    'https://pfpzone.com/wp-content/uploads/2025/08/default-pfp-3.webp'
                  }
                  alt={article?.author?.username || 'Author'}
                  className='h-10 w-10 rounded-full bg-border object-cover'
                />

                <div className='text-sm'>
                  <p className='font-semibold text-text'>
                    {article?.author?.username || 'Unknown author'}
                  </p>

                  <p className='text-text/60 flex items-center gap-1'>
                    <Heart className='h-4 w-4 text-pink-500' />
                    {article.likesCount ?? 0} likes
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
