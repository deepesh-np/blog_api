import express from "express"
import articleController from "../controllers/articleController.js"
// import authorize from "../middlewares/authorizeMiddlewaare.js"
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
  "/:slug",
  articleController.getArticlesById
)


//delete article by id 
//edit article by id 

export default router;