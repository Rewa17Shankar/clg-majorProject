import express from "express";
import { getAnnouncements, addAnnouncement, removeAnnouncement } from "../../controllers/MANAGER/announcementsController.js";

const router = express.Router();

router.get("/", getAnnouncements);       // GET /api/announcements
router.post("/", addAnnouncement);       // POST /api/announcements
router.delete("/:id", removeAnnouncement); // DELETE /api/announcements/:id

export default router;
