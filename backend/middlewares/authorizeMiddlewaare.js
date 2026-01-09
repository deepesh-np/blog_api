import Article from "../models/article.model.js";

export const isOwner = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.article = article;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authorization failed" });
  }
};

export const isProfileOwner = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    // Check if the authenticated user is trying to modify their own profile
    if (user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied: You can only edit your own profile" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authorization failed" });
  }
};

export default { isOwner, isProfileOwner };
