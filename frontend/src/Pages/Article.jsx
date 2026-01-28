/** @format */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, User, Sparkles } from 'lucide-react';
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

                <div className="mb-8">
                  {article.summary ? (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
                      <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2">
                        <Sparkles size={20} />
                        <h3>AI Summary</h3>
                      </div>
                      <p className="text-indigo-900 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const btn = document.getElementById('summarize-btn');
                          if(btn) {
                             btn.disabled = true;
                             btn.innerText = 'Generating Summary...';
                          }
                          
                          const res = await api.post(`/article/slug/${slug}/summarize`);
                          setArticle({ ...article, summary: res.data.summary });
                        } catch (err) {
                          console.error("Failed to summarize", err);
                          alert("Failed to generate summary. Please ensure you are logged in.");
                          const btn = document.getElementById('summarize-btn');
                          if(btn) {
                             btn.disabled = false;
                             btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 5h4"/><path d="M3 9h4"/></svg> Summarize with AI';
                          }
                        }
                      }}
                      id="summarize-btn"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium hover:bg-indigo-200 transition-colors"
                    >
                      <Sparkles size={16} />
                      Summarize with AI
                    </button>
                  )}
                </div>

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
