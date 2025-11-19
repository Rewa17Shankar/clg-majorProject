import express from "express";
import { getGoalsTasks, addGoal } from "../../controllers/MANAGER/goalsTasksController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Token required
router.get("/", authMiddleware, getGoalsTasks);
router.post("/", authMiddleware, addGoal);

export default router;
