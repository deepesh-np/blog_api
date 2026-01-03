import Article from '../models/article.model.js'

export const isOwner = async(req, res, next) => {
try {
    const {slug} = req.params;
    const article = await Article.findOne({slug})

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (req.user.id != article.author.toString() ){
         return res.status(403).json({ message: "Access denied" });
    }
     next();
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Authorization failed" });
  }
}

export default {
    isOwner
}