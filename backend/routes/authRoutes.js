import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Register new user (only SuperAdmin can do this later)
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

export default router;
