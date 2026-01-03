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


export const getArticlesBySlug = async (req, res) => {
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

//Auth guard routess!!!

export const deleteArticleBySlug = async (req, res) => {
  try{
    const {slug} = req.params;
    const article = await Article.findOneAndDelete({slug})

    if (!article){
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({
      message: "Article deleted successfully",
      deletedSlug: slug,
    });
    
  }
  catch(err){
    res.status(500).json({ message: "Failed to delete articles" });
  }
}



export default {
  createArticle,
  getAllArticles,
  getArticlesBySlug,
  deleteArticleBySlug
}