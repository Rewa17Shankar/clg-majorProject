import express from "express";
import { fetchGrievances, addGrievance } from "../../controllers/MANAGER/feedbackGrievanceController.js";

const router = express.Router();

router.get("/", fetchGrievances);
router.post("/", addGrievance);

export default router;
