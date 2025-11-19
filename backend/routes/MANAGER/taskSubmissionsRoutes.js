import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  getSubmittedTasks,
  updateSubmissionStatus,
} from "../../controllers/MANAGER/taskSubmissionsController.js";

const router = express.Router();

router.get("/", authMiddleware, getSubmittedTasks);
router.patch("/:id", authMiddleware, updateSubmissionStatus);

export default router;
