/** @format */

import express from 'express';
import authorize from '../middlewares/authorizeMiddlewaare.js';
import auth from '../middlewares/authMiddleware.js';
import user from '../controllers/userController.js';

const router = express.Router();

router.get('/:user_id', user.getUser);

router.post('/:user_id/avatar', auth, authorize.isOwner, user.updateAvatar);

router.get('/:user_id/avatar', user.getAvatar);

export default router;
