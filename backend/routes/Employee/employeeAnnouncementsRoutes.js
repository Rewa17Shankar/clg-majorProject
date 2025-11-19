import express from "express";
import { getEmployeeAnnouncements } from "../../controllers/Employee/announcementController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// protect this route
router.use(authMiddleware);

router.get("/", getEmployeeAnnouncements);

export default router;
