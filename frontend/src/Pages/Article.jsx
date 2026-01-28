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
      <div className='min-h-screen bg-gray-50 pt-12 pb-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Article Skeleton */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              {/* Sidebar Skeleton */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className='text-gray-500 text-lg'>{error || 'Article not found'}</p>
          <a href="/" className="mt-4 inline-block text-indigo-600 font-medium hover:underline">Go back home</a>
        </div>
      </div>
    );
  }

  const publishDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='min-h-screen bg-[#f9fafb]'>
      <article className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
<<<<<<< HEAD
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8 transition-shadow hover:shadow-md">
              <header className='mb-10 pb-10 border-b border-gray-100'>
                <div className="flex items-center gap-3 text-sm font-medium text-indigo-600 mb-4">
                  <span className="bg-indigo-50 px-3 py-1 rounded-full">Article</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{publishDate}</span>
                </div>
                
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight'>
=======
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <header className='mb-8 border-b pb-8'>

                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
>>>>>>> 2a9a7b5 (feat: implement AI-powered article summarization by adding a summary field, API endpoint, AI service integration, and frontend UI.)
                  {article.title}
                </h1>

                {article.subTitle && (
                   <p className="text-xl md:text-2xl text-gray-500 mb-8 leading-relaxed font-light">
                     {article.subTitle}
                   </p>
                )}

<<<<<<< HEAD
                <div className='flex items-center gap-4'>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                    {article.author?.avatarUrl ? (
                      <img src={article.author.avatarUrl} alt={article.author.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={24} />
                    )}
=======
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
>>>>>>> 2a9a7b5 (feat: implement AI-powered article summarization by adding a summary field, API endpoint, AI service integration, and frontend UI.)
                  </div>
                  <div>
                    <p className='font-bold text-gray-900 text-lg'>
                      {article.author?.name || 'Anonymous'}
                    </p>
                    <p className='text-sm text-gray-500'>Author</p>
                  </div>
                </div>
              </header>

              <div
                className='prose prose-lg md:prose-xl max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-gray-600 prose-p:leading-8
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-indigo-600 prose-code:font-medium
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic
                prose-img:rounded-xl prose-img:shadow-lg'>
                <MarkdownPreview content={article.bodyMarkdown} />
              </div>
            </div>

            <CommentSection slug={slug} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
               <SuggestedArticles currentSlug={slug} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Article;
