import express from "express";
import { createGoal, getGoals, getGoalsByUser, updateGoal, deleteGoal } from "../controllers/MANAGER/goalController.js";

const router = express.Router();

router.post("/", createGoal);       // Add new goal
router.get("/", getGoals);          // Get all goals
router.get("/:user_id", getGoalsByUser); // Get goals of one employee
router.put("/:id", updateGoal);     // Update goal
router.delete("/:id", deleteGoal);  // Delete goal

export default router;
