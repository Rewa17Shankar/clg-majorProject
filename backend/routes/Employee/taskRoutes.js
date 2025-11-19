import express from "express";
import {
  getEmployeeTasks,
  updateTaskStatus,
  submitTaskForReview,
} from "../../controllers/Employee/taskController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployeeTasks);
router.patch("/:id/status", authMiddleware, updateTaskStatus);
router.post("/:id/submit", authMiddleware, submitTaskForReview);

export default router;
