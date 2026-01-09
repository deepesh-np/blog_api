/** @format */

import express from 'express';
import authorize from '../middlewares/authorizeMiddlewaare.js';
import auth from '../middlewares/authMiddleware.js';
import user from '../controllers/userController.js';

const router = express.Router();

router.get('/:user_id', user.getUser);

router.post('/:user_id/avatar', auth, authorize.isProfileOwner, user.updateAvatar);

router.get('/:user_id/avatar', user.getAvatar);

router.put('/:user_id', auth, authorize.isProfileOwner, user.updateProfile);

export default router;
