/** @format */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, User, Sparkles } from "lucide-react";
import api from "../api/axios";
import MarkdownPreview from "../Components/MarkdownPreview";
import CommentSection from "../Components/CommentSection";
import SuggestedArticles from "../Components/SuggestedArticles";

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/article/slug/${slug}`);
        setArticle(res.data);
      } catch (err) {
        setError("Article not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleSummarize = async () => {
    try {
      setSummarizing(true);
      const res = await api.post(`/article/slug/${slug}/summarize`);
      setArticle((prev) => ({
        ...prev,
        summary: res.data.summary,
      }));
    } catch (err) {
      console.error("Failed to summarize", err);
      alert("Failed to generate summary. Ensure you're logged in.");
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-500 text-lg">
            {error || "Article not found"}
          </p>
          <a
            href="/"
            className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
          >
            Go back home
          </a>
        </div>
      </div>
    );
  }

  const publishDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8 transition-shadow hover:shadow-md">
              <header className="mb-10 pb-10 border-b border-gray-100">
                <div className="flex items-center gap-3 text-sm font-medium text-indigo-600 mb-4">
                  <span className="bg-indigo-50 px-3 py-1 rounded-full">
                    Article
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{publishDate}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                  {article.title}
                </h1>

                {article.subTitle && (
                  <p className="text-xl md:text-2xl text-gray-500 mb-8 leading-relaxed font-light">
                    {article.subTitle}
                  </p>
                )}

                {/* AI Summary */}
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
                      onClick={handleSummarize}
                      disabled={summarizing}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium hover:bg-indigo-200 transition-colors disabled:opacity-60"
                    >
                      <Sparkles size={16} />
                      {summarizing
                        ? "Generating Summary..."
                        : "Summarize with AI"}
                    </button>
                  )}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                    {article.author?.avatarUrl ? (
                      <img
                        src={article.author.avatarUrl}
                        alt={article.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} />
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {article.author?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
              </header>

              <div
                className="prose prose-lg md:prose-xl max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-gray-600 prose-p:leading-8
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-indigo-600 prose-code:font-medium
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic
                prose-img:rounded-xl prose-img:shadow-lg"
              >
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
