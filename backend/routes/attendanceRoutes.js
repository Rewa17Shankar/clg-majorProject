import express from "express";
import { clockIn, clockOut } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/clock-in", authMiddleware, clockIn);
router.post("/clock-out", authMiddleware, clockOut);

export default router;
