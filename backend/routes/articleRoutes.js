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

router.get(
  "/published",
  articleController.getPublishedArticles
);

router.get(
  "/my-blogs",
  auth,
  authorize.isOwner,
  articleController.getMyArticles
);


router.patch(
  "/slug/:slug/publish",
  auth,
  authorize.isOwner,
  articleController.togglePublish
);

router.post(
  "/slug/:slug/like",
  auth,
  articleController.likeArticle
);

router.post(
  "/slug/:slug/view",
  articleController.incrementViews
);

router.get(
  "/search",
  articleController.searchArticles
);


export default router;


// POST    /new-blog  -d
// GET     /all-blogs -d
// GET     /published -d
// GET     /my-blogs  -d

// GET     /slug/:slug -d
// PUT     /slug/:slug -d
// DELETE  /slug/:slug -d

// PATCH   /slug/:slug/publish -d
// POST    /slug/:slug/like    -d
// POST    /slug/:slug/view    -d
 
// GET     /search  -d
