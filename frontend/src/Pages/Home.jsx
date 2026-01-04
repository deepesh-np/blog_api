import { useEffect, useState } from "react";
import api from "../api/axios";
import { Heart } from "lucide-react";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get("/article/published");

        // ensure always array
        setArticles(res.data || []);
      } catch (err) {
        console.error("Failed to fetch", err);
        setError("Could not load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p className="text-center text-gray-300 mt-10">Loading…</p>;
  if (error) return <p className="text-center text-red-400 mt-10">{error}</p>;

  return (
    <div className="bg-gray-900 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* heading */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Published Blogs
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            Latest posts from our writers.
          </p>
        </div>

        {/* grid */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 
                        border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 
                        lg:mx-0 lg:max-w-none lg:grid-cols-3">

          {articles.length === 0 && (
            <p className="text-gray-300">No published articles yet.</p>
          )}

          {articles.map((article) => (
            <article key={article.slug} className="flex max-w-xl flex-col">

              {/* date + tag */}
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-gray-400">
                  {article.createdAt
                    ? article.createdAt.slice(0, 10)
                    : "—"}
                </time>

                <span className="rounded-full bg-gray-800/60 px-3 py-1.5 text-gray-300">
                  Blog
                </span>
              </div>

              {/* title + desc */}
              <div className="group relative grow">
                <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-gray-300">
                  <a href={`/article/${article.slug}`}>
                    <span className="absolute inset-0" />
                    {article.title}
                  </a>
                </h3>

                <p className="mt-5 line-clamp-3 text-sm text-gray-400">
                  {(article.bodyMarkdown || "").slice(0, 150)}…
                </p>
              </div>

              {/* author + likes */}
              <div className="mt-8 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-800" />

                <div className="text-sm">
                  <p className="font-semibold text-white">
                    {article?.author?.name || "Unknown author"}
                  </p>

                  <p className="text-gray-400">
                    <Heart className="inline mr-1" /> {article.likesCount ?? 0} likes
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
