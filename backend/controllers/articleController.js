import authMiddleware from '../middlewares/authMiddleware.js';
import Article from '../models/article.model.js';
import { generateUniqueSlug } from "../services/slugService.js";

export const createArticle = async (req, res) => {
  const { title, bodyMarkdown } = req.body;

  const slug = await generateUniqueSlug(title);

  const article = authMiddleware, await Article.create({
    title,
    slug,
    bodyMarkdown,
    author: req.user.id,
  });

  res.status(201).json(article);
};
