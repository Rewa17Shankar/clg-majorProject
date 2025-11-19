import express from "express";
import { getMyTrainings } from "../../controllers/Employee/trainingController.js";
import { submitTrainingFeedback } from "../../controllers/Employee/trainingController.js";
import { getMyNotifications } from "../../controllers/Employee/notificationController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getMyTrainings);
router.post("/feedback", submitTrainingFeedback);
router.get("/notifications", getMyNotifications);

export default router;
