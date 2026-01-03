import { useEffect, useState } from "react";
import api from "../api/axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get("/article/published");
        setArticles(res.data);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Published Blogs</h1>

      {articles.length === 0 && <p>No articles found</p>}

      {articles.map((article) => (
        <div key={article.slug}>
          <h2>{article.title}</h2>
          <p>Likes: {article.likesCount}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
