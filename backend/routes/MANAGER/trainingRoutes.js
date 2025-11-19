import express from "express";
import { getTrainings, createTraining, updateTrainingProgress  } from "../../controllers/MANAGER/trainingController.js";

const router = express.Router();

router.get("/", getTrainings);
router.post("/", createTraining);
router.patch("/:id/progress", updateTrainingProgress); 

export default router;
