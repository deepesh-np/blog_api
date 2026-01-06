import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios"; 

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/article/slug/${slug}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p className="p-6">Loading…</p>;
  if (!article) return <p className="p-6">Article not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {article.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        By {article.author?.name}
      </p>

      <article className="prose">
        {article.bodyMarkdown}
      </article>
    </div>
  );
};

export default Article;
