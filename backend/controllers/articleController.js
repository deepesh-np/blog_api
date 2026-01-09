import Article from '../models/article.model.js';
import { generateUniqueSlug } from "../services/slugService.js";

export const createArticle = async (req, res) => {
  const { title, bodyMarkdown, subTitle } = req.body;

  const slug = await generateUniqueSlug(title);

  const article =  await Article.create({
    title,
    subTitle,
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
    .populate('author')

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

export const editArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, bodyMarkdown, isPublished } = req.body;

    const article = await Article.findOne({ slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (title) article.title = title;
    if (bodyMarkdown) article.bodyMarkdown = bodyMarkdown;
    if (typeof isPublished === "boolean") {
      article.isPublished = isPublished;
    }

    // if (title) {
    //   article.slug = title
    //     .toLowerCase()
    //     .trim()
    //     .replace(/[^a-z0-9]+/g, "-");
    // }

    await article.save();

    res.status(200).json({
      message: "Article updated successfully",
      article,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update article" });
  }
};

export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isPublished: true })   
      .populate("author", "username avatarUrl")         
      .sort({ createdAt: -1 })
      .select("title subTitle slug author createdAt likesCount");

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch published articles" });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your articles" });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const article = req.article; 

    article.isPublished = !article.isPublished;
    await article.save();

    res.json({
      message: "Publish status updated",
      isPublished: article.isPublished,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update publish status" });
  }
};


export const likeArticle = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    const article = await Article.findOne({ slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const index = article.likes.indexOf(userId);

    if (index === -1) {
      article.likes.push(userId);
      article.likesCount++;
    } else {
      article.likes.splice(index, 1);
      article.likesCount--;
    }

    await article.save();

    res.json({
      likesCount: article.likesCount,
      liked: index === -1,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to like article" });
  }
};


export const incrementViews = async (req, res) => {
  try {
    const { slug } = req.params;

    await Article.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    );

    res.sendStatus(204); // no content, fire-and-forget
  } catch (err) {
    res.status(500).json({ message: "Failed to update views" });
  }
};
export const searchArticles = async (req, res) => {
  try {
    let { q, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: "Query too short" });
    }

    q = q.trim();

    const articles = await Article.find(
      {
        isPublished: true,
        $or: [
          { title: { $regex: q, $options: "i" } },
          { bodyMarkdown: { $regex: q, $options: "i" } },
        ],
      },
      "title slug author createdAt likesCount"
    )
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate("author", "name avatarUrl");

    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};



export default {
  createArticle,
  getAllArticles,
  getArticlesBySlug,
  deleteArticleBySlug,
  editArticleBySlug,
  getPublishedArticles,
  getMyArticles,
  togglePublish,
  likeArticle,
  incrementViews,
  searchArticles
}