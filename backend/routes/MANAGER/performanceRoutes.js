import express from "express";
import { addReview, getReviewsByUser, getAllReviews } from "../../controllers/MANAGER/performanceController.js";

const router = express.Router();

// Add a new performance review
router.post("/", addReview);

// Get all reviews
router.get("/", getAllReviews);

// Get reviews for a specific employee
router.get("/:userId", getReviewsByUser);

export default router;
