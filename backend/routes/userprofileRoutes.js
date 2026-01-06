import express from "express"
import articleController from "../controllers/articleController.js"
import authorize from "../middlewares/authorizeMiddlewaare.js"
import auth from '../middlewares/authMiddleware.js'
import user from '../controllers/userController.js'

const router = express.Router();

router.get(
  "/my-blogs",
  auth,
  authorize.isOwner,
  articleController.getMyArticles
);

router.post(
    "/:user_id/avatar",
    auth,
    authorize,
    
)

router.get("/:user_id/avatar", getAvatar);

export default router;