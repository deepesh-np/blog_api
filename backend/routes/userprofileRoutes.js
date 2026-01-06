import express from "express"
import articleController from "../controllers/articleController.js"
import authorize from "../middlewares/authorizeMiddlewaare.js"
import auth from '../middlewares/authMiddleware.js'
import user from '../controllers/userController.js'

const router = express.Router();

router.post(
    "/:user_id/avatar",
    auth,
    authorize.isOwner,
    user.updateAvatar
)

router.get("/:user_id/avatar", user.getAvatar);

export default router;