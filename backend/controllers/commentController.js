import Comment from '../models/comment.model.js';
import Article from '../models/article.model.js';

// Get all comments for an article
export const getComments = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comments = await Comment.find({ article: article._id })
      .populate('author', 'username avatarUrl')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

// Create a new comment on an article
export const createComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;

    const article = await Article.findOne({ slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comment = await Comment.create({
      content,
      article: article._id,
      author: req.user.id,
    });

    await comment.populate('author', 'username avatarUrl');

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment" });
  }
};