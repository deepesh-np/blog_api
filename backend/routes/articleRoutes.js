import express from "express"
import articleController from "../controllers/articleController.js"
import authorize from "../middlewares/authorizeMiddlewaare.js"
import auth from '../middlewares/authMiddleware.js'

const router = express.Router();

//create new article
router.post(
  "/new-blog",
  auth,
  articleController.createArticle
);

//get all article
router.get(
  "/all-blogs",
  articleController.getAllArticles
)


//get article by id
router.get(
  "/slug/:slug",
  articleController.getArticlesBySlug
)

//auth guards routess!!!!b  --ye sb me authorize lga hua h..
//delete article by id 
router.delete(
  "/slug/:slug",
  auth,
  authorize.isOwner,
  articleController.deleteArticleBySlug
)

//edit article by id 
router.put(
  "/slug/:slug",
  auth,
  authorize.isOwner,
  articleController.editArticleBySlug
)

export default router;


// POST    /new-blog
// GET     /all-blogs
// GET     /published
// GET     /my-blogs

// GET     /slug/:slug
// PUT     /slug/:slug
// DELETE  /slug/:slug

// PATCH   /slug/:slug/publish
// POST    /slug/:slug/like
// POST    /slug/:slug/view

// GET     /search
