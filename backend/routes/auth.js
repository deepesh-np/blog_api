import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Register
// Users send their name, email, and password to this endpoint
router.post("/register", authController.register);

// Login
// Users send email and password to receive JWT
router.post("/login", authController.login);

// Protected profile
// Only accessible to authenticated users with a valid JWT
router.get("/profile", authMiddleware, authController.profile);

export default router;
