import express from "express"
import articleController from "../controllers/articleController.js"
import commentController from "../controllers/commentController.js"
import authorize from "../middlewares/authorizeMiddlewaare.js"
import auth from '../middlewares/authMiddleware.js'
import { cacheMiddleware } from "../middlewares/cache.js"

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
  cacheMiddleware({
    key: (req) => `article:${req.params.slug}`,
    ttl: 120,
  }),
  articleController.getArticlesBySlug

);
// router.get(
//   "/slug/:slug",
// )

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

router.get('/slug/:slug/comments', commentController.getComments);

router.post('/slug/:slug/comments', auth, commentController.createComment);

router.get(
  "/published",
  cacheMiddleware({
    key: "articles:published",
    ttl: 60,
  }),
  articleController.getPublishedArticles
);

router.get(
  "/my-blogs",
  // "/articles/me",
  auth,
  cacheMiddleware({
    key: (req) => `articles:user:${req.user.id}`,
    ttl: 60,
  }),
  articleController.getMyArticles
  // getMyArticles
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
