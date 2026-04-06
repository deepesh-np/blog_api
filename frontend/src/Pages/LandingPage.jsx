/** @format */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, Feather, TrendingUp, Sparkles, Send } from 'lucide-react';
import api from '../api/axios';

const LandingPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/article/published');
        setArticles(res.data || []);
      } catch (err) {
        console.error('Failed to fetch articles', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featuredArticles = articles.slice(0, 3);
  const latestArticles = articles.slice(0, 6);

  return (
    <div className="min-h-screen bg-surface">
      {/* ═══ HERO SECTION ═══ */}
      <section className="gradient-surface relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left — Headline (60%) */}
            <div className="lg:col-span-3 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-fixed/30 text-primary">
                <Sparkles size={14} />
                <span className="font-sans text-xs font-semibold uppercase tracking-editorial">
                  The Editorial Archive
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-on-surface tracking-display leading-[1.08]">
                Stories that
                <span className="block text-primary-container">shape thinking.</span>
              </h1>

              <p className="font-sans text-lg text-on-surface-variant max-w-xl leading-relaxed">
                A curated collection of ideas, perspectives, and narratives from
                thoughtful writers. No noise — just stories worth your time.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 gradient-editorial text-on-primary font-sans font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Explore Articles <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-lowest text-primary font-sans font-semibold text-sm rounded-md shadow-ambient hover:shadow-ambient-hover transition-shadow border-ghost"
                >
                  Start Writing <Feather size={16} />
                </Link>
              </div>
            </div>

            {/* Right — Decorative Editorial Card Stack (40%) */}
            <div className="lg:col-span-2 relative hidden lg:block">
              <div className="relative">
                {/* Background card */}
                <div className="absolute -top-4 -left-4 w-full h-80 bg-surface-container-low rounded-xl rotate-[-3deg]" />
                {/* Middle card */}
                <div className="absolute -top-2 -left-2 w-full h-80 bg-surface-container rounded-xl rotate-[-1.5deg]" />
                {/* Front card */}
                <div className="relative w-full bg-surface-container-lowest rounded-xl p-8 shadow-ambient">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full gradient-editorial flex items-center justify-center">
                        <BookOpen size={14} className="text-on-primary" />
                      </span>
                      <span className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-editorial">
                        Editor's Pick
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-on-surface leading-snug">
                      The Art of Intentional Writing in a Distracted World
                    </h3>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      How slowing down your creative process leads to deeper, more resonant storytelling...
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-6 h-6 rounded-full bg-secondary-container" />
                      <span className="font-sans text-xs text-on-surface-variant">
                        Editorial Team
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED ARTICLES ═══ */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-editorial text-primary">
                Featured
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface mt-2">
                Recent Stories
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary hover:text-primary-container transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            </div>
          ) : featuredArticles.length === 0 ? (
            <p className="font-sans text-on-surface-variant text-center py-20">
              No articles published yet. Be the first to{' '}
              <Link to="/publish" className="text-primary font-semibold hover:underline">write one</Link>.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/article/${article.slug}`}
                  className="group bg-surface-container-lowest rounded-xl p-6 shadow-ambient hover:shadow-ambient-hover transition-all duration-300"
                >
                  {/* Tag + Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-editorial px-3 py-1 rounded-md bg-tertiary/10 text-tertiary">
                      Blog
                    </span>
                    <time className="font-sans text-xs text-on-surface-variant">
                      {article.createdAt ? article.createdAt.slice(0, 10) : '—'}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
                    {article.subTitle || 'A thoughtful exploration of ideas and perspectives...'}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        article?.author?.avatarUrl ||
                        'https://pfpzone.com/wp-content/uploads/2025/08/default-pfp-3.webp'
                      }
                      alt={article?.author?.username || 'Author'}
                      className="w-8 h-8 rounded-full object-cover bg-surface-container"
                    />
                    <div>
                      <p className="font-sans text-sm font-semibold text-on-surface">
                        {article?.author?.username || 'Unknown author'}
                      </p>
                      <p className="font-sans text-xs text-on-surface-variant flex items-center gap-1">
                        <Heart size={10} className="text-tertiary" />
                        {article.likesCount ?? 0} likes
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 sm:hidden text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary"
            >
              View all articles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES / TOPICS ═══ */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="font-sans text-xs font-semibold uppercase tracking-editorial text-primary">
              Discover
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface mt-2">
              Explore by Topic
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Technology', icon: TrendingUp, count: articles.length },
              { name: 'Creativity', icon: Sparkles, count: Math.max(0, articles.length - 1) },
              { name: 'Writing', icon: Feather, count: Math.max(0, articles.length - 2) },
              { name: 'Stories', icon: BookOpen, count: Math.max(0, articles.length) },
            ].map((cat) => (
              <Link
                key={cat.name}
                to="/blog"
                className="group bg-surface-container-lowest rounded-xl p-6 text-center shadow-ambient hover:shadow-ambient-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-editorial flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <cat.icon size={20} className="text-on-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-on-surface mb-1">
                  {cat.name}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant">
                  {cat.count} {cat.count === 1 ? 'article' : 'articles'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER CTA ═══ */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-editorial text-primary">
            Stay Informed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface mt-2 mb-4">
            Get stories delivered to you
          </h2>
          <p className="font-sans text-on-surface-variant max-w-lg mx-auto mb-10 leading-relaxed">
            Join a community of curious readers. We send a weekly digest of our
            best stories — no spam, no noise, just great writing.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="input-editorial w-full px-4 py-3 rounded-md font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-editorial text-on-primary font-sans font-semibold text-sm rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe <Send size={14} />
            </button>
          </form>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-surface-container-high">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <span className="font-serif text-xl font-bold text-on-surface">
                The Editorial Archive
              </span>
              <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed max-w-xs">
                A curated space for stories, ideas, and the art of thoughtful writing.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-12">
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-editorial text-on-surface mb-3">
                  Navigate
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Blog', path: '/blog' },
                    { name: 'Publish', path: '/publish' },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-editorial text-on-surface mb-3">
                  Account
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: 'Login', path: '/login' },
                    { name: 'Register', path: '/register' },
                    { name: 'Profile', path: '/profile' },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tagline */}
            <div className="md:text-right">
              <p className="font-serif text-sm italic text-on-surface-variant">
                "Stories that shape thinking."
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
               style={{ borderTop: '1px solid rgba(193, 200, 193, 0.15)' }}>
            <p className="font-sans text-xs text-on-surface-variant">
              &copy; {new Date().getFullYear()} The Editorial Archive. All rights reserved.
            </p>
            <p className="font-sans text-xs text-on-surface-variant">
              Built with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
