// /backend/routes/attendanceShiftRoutes.js
import express from "express";
import { getAttendanceShift } from "../controllers/attendanceShiftController.js";

const router = express.Router();

router.get("/", getAttendanceShift);

export default router;
