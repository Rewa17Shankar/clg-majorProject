import express from "express";
import { getMeetings, addMeeting, removeMeeting } from "../../controllers/MANAGER/meetingsController.js";

const router = express.Router();

router.get("/", getMeetings);
router.post("/", addMeeting);
router.delete("/:id", removeMeeting);

export default router;
