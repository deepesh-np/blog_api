import Article from '../models/article.model.js';
import { generateUniqueSlug } from "../services/slugService.js";

export const createArticle = async (req, res) => {
  const { title, bodyMarkdown } = req.body;

  const slug = await generateUniqueSlug(title);

  const article =  await Article.create({
    title,
    slug,
    bodyMarkdown,
    author: req.user.id,
  });

  res.status(201).json(article);
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 }) 

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};


export const getArticlesById = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug })

    if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};


export default {
  createArticle,
  getAllArticles,
  getArticlesById
}